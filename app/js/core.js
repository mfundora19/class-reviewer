/* ═══════════════════════════════════════════════════════════
   ReviewApp · core.js
   Namespace, utils, hash router, toasts, modal
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (!window.ReviewApp) window.ReviewApp = {};

  var App = window.ReviewApp;

  function inlineContentHtml(value) {
    value = value == null ? '' : String(value);
    return App.markdown && App.markdown.renderInline
      ? App.markdown.renderInline(value)
      : utils.escapeHtml(value);
  }

  /* ── Utils ──────────────────────────────────────────────── */
  var utils = {
    $: function (sel, ctx) { return (ctx || document).querySelector(sel); },
    $$: function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); },

    el: function (tag, attrs, children) {
      var node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          if (k === 'className') node.className = attrs[k];
          else if (k === 'text') node.textContent = attrs[k];
          else if (k === 'html') node.innerHTML = attrs[k];
          else if (k === 'style' && typeof attrs[k] === 'object') {
            Object.keys(attrs[k]).forEach(function (s) { node.style[s] = attrs[k][s]; });
          } else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') {
            node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
          } else if (attrs[k] !== undefined && attrs[k] !== null) {
            node.setAttribute(k, attrs[k]);
          }
        });
      }
      if (children) {
        (Array.isArray(children) ? children : [children]).forEach(function (c) {
          if (c == null) return;
          if (typeof c === 'string') node.appendChild(document.createTextNode(c));
          else node.appendChild(c);
        });
      }
      return node;
    },

    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },

    uid: function () {
      return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    },

    clamp: function (n, min, max) { return Math.max(min, Math.min(max, n)); },

    formatTime: function (secs) {
      var m = Math.floor(secs / 60);
      var s = secs % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    },

    formatDate: function (ts) {
      var d = new Date(ts);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    },

    debounce: function (fn, ms) {
      var t;
      return function () {
        var ctx = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(ctx, args); }, ms);
      };
    },

    downloadBlob: function (blob, filename) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    },

    copyText: function (text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () {
          return utils._fallbackCopy(text);
        });
      }
      return Promise.resolve(utils._fallbackCopy(text));
    },

    _fallbackCopy: function (text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      return ok;
    },

    prefersReducedMotion: function () {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    countUp: function (el, target, duration) {
      if (!motionEnabled()) {
        el.textContent = String(target);
        return;
      }
      var start = 0;
      var startTime = null;
      duration = duration || 800;
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(start + (target - start) * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    },

    escapeHtml: function (str) {
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }
  };

  /* ── Toasts ─────────────────────────────────────────────── */
  var toastRoot = null;
  function toast(msg, type, ms) {
    type = type || 'info';
    ms = ms || 3200;
    if (!toastRoot) toastRoot = utils.$('#toast-root');
    var t = utils.el('div', { className: 'toast ' + type, role: 'status' }, [
      utils.el('span', { text: msg })
    ]);
    toastRoot.appendChild(t);
    setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      t.style.transition = 'opacity 0.25s, transform 0.25s';
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 280);
    }, ms);
  }

  /* ── Modal ──────────────────────────────────────────────── */
  var _modalCloseTimer = null;
  var _lastModalFocus = null;
  function openModal(content, opts) {
    opts = opts || {};
    var root = utils.$('#modal-root');
    if (_modalCloseTimer) { clearTimeout(_modalCloseTimer); _modalCloseTimer = null; }
    root.classList.remove('closing');
    root.innerHTML = '';
    root.hidden = false;
    _lastModalFocus = document.activeElement;
    var modal = utils.el('div', { className: 'modal', role: 'dialog', 'aria-modal': 'true' });
    if (opts.title) {
      // Name the dialog from its title so screen readers announce what opened.
      var titleId = 'modal-title-' + Date.now().toString(36);
      modal.setAttribute('aria-labelledby', titleId);
      var header = utils.el('div', { className: 'modal-header' }, [
        utils.el('h2', { id: titleId, text: opts.title }),
        utils.el('button', {
          className: 'modal-close',
          'aria-label': 'Close',
          onClick: closeModal
        }, [utils.el('span', { html: '&times;', style: { fontSize: '1.4rem' } })])
      ]);
      modal.appendChild(header);
    } else {
      modal.setAttribute('aria-label', opts.label || 'Dialog');
    }
    if (typeof content === 'string') {
      modal.appendChild(utils.el('div', { html: content }));
    } else {
      modal.appendChild(content);
    }
    root.appendChild(modal);
    document.addEventListener('keydown', _modalEsc);
    document.addEventListener('keydown', _modalTrap);
    root.addEventListener('click', _modalBackdrop);
    var focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal() {
    var root = utils.$('#modal-root');
    if (!root || root.hidden) return;
    root.classList.add('closing');
    if (_modalCloseTimer) clearTimeout(_modalCloseTimer);
    _modalCloseTimer = setTimeout(function () {
      _modalCloseTimer = null;
      root.hidden = true;
      root.classList.remove('closing');
      root.innerHTML = '';
      document.removeEventListener('keydown', _modalEsc);
      document.removeEventListener('keydown', _modalTrap);
      root.removeEventListener('click', _modalBackdrop);
      // Return focus to whatever opened the dialog.
      if (_lastModalFocus && _lastModalFocus.focus && document.contains(_lastModalFocus)) _lastModalFocus.focus();
      _lastModalFocus = null;
    }, 130);
  }

  function _modalEsc(e) { if (e.key === 'Escape') closeModal(); }
  function _modalBackdrop(e) { if (e.target === utils.$('#modal-root')) closeModal(); }
  // Keep Tab/Shift+Tab cycling inside the open dialog so background content
  // cannot be reached (or visually missed) while a modal is showing.
  function _modalTrap(e) {
    if (e.key !== 'Tab') return;
    var root = utils.$('#modal-root');
    if (!root || root.hidden) return;
    var modal = utils.$('.modal', root);
    if (!modal) return;
    var items = utils.$$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
      .filter(function (n) { return !n.disabled && n.offsetParent !== null; });
    if (!items.length) { e.preventDefault(); return; }
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === root)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ── Hash Router ────────────────────────────────────────── */
  var routes = {};
  var currentRoute = null;
  var currentParams = {};

  function registerRoute(path, handler) {
    routes[path] = handler;
  }

  function navigate(hash) {
    if (hash.charAt(0) !== '#') hash = '#' + hash;
    if (location.hash !== hash) location.hash = hash;
    else handleRoute();
  }

  function parseHash() {
    var h = (location.hash || '#/dashboard').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    return { path: parts[0] || 'dashboard', parts: parts, params: parts.slice(1) };
  }

  var ROUTE_TITLES = {
    dashboard: 'Dashboard', quiz: 'Quiz', exam: 'Exam Sim', flashcards: 'Flashcards',
    labs: 'Labs', stats: 'Stats', notes: 'Notes', tools: 'Tools', settings: 'Settings'
  };

  function handleRoute() {
    var parsed = parseHash();
    currentRoute = parsed.path;
    currentParams = parsed;
    // Keep the document title in sync with the active route so screen-reader
    // users and tab switchers always know where they are.
    document.title = (ROUTE_TITLES[currentRoute] || 'ReviewApp') + ' · ReviewApp';
    // Leaving any view pauses in-memory session timers (speed-run quizzes and
    // exams). Sessions themselves survive so they can be resumed later.
    pauseActiveSessionTimers();
    // Update nav active state
    utils.$$('.nav-item').forEach(function (a) {
      var r = a.getAttribute('data-route');
      a.classList.toggle('active', r === currentRoute);
      if (r === currentRoute) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var handler = routes[currentRoute] || routes['dashboard'];
    var root = utils.$('#view-root');
    root.innerHTML = '';
    if (handler) {
      try {
        handler(root, parsed);
      } catch (err) {
        console.error('Route error:', err);
        root.appendChild(utils.el('div', { className: 'empty-state' }, [
          utils.el('h3', { text: 'Something went wrong' }),
          utils.el('p', { text: String(err.message || err) })
        ]));
      }
    }
    // Animate progress indicators into their final values (visual only)
    if (motionEnabled()) {
      utils.$$('.progress-fill', root).forEach(function (fill) {
        var w = fill.style.width;
        if (w) {
          fill.style.width = '0%';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { fill.style.width = w; });
          });
        }
      });
      utils.$$('.progress-ring-fg', root).forEach(function (ring) {
        var dash = ring.getAttribute('stroke-dasharray');
        var off = ring.getAttribute('stroke-dashoffset');
        if (dash && off) {
          ring.setAttribute('stroke-dashoffset', dash);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { ring.setAttribute('stroke-dashoffset', off); });
          });
        }
      });
    }
  }

  /* ── Sidebar ────────────────────────────────────────────── */
  function initSidebar() {
    var sidebar = utils.$('#sidebar');
    var toggle = utils.$('#sidebar-toggle');
    var mobile = utils.$('#mobile-menu');
    var settings = (App.store && App.store.getSettings) ? App.store.getSettings() : {};
    var collapsed = settings.sidebarCollapsed === true;
    if (collapsed) sidebar.classList.add('collapsed');

    if (toggle) {
      toggle.setAttribute('aria-controls', 'sidebar');
      function setToggleLabel(isCollapsed) {
        toggle.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
        toggle.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
        toggle.setAttribute('title', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
      }
      setToggleLabel(collapsed);
      toggle.addEventListener('click', function () {
        var isCollapsed = sidebar.classList.toggle('collapsed');
        var currentSettings = (App.store && App.store.getSettings) ? App.store.getSettings() : {};
        currentSettings.sidebarCollapsed = isCollapsed;
        if (App.store && App.store.saveSettings) App.store.saveSettings(currentSettings);
        setToggleLabel(isCollapsed);
      });
    }
    if (mobile) {
      mobile.setAttribute('aria-controls', 'sidebar');
      function setMobileExpanded(open) {
        mobile.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobile.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobile.setAttribute('title', open ? 'Close menu' : 'Open menu');
      }
      setMobileExpanded(false);
      mobile.addEventListener('click', function () {
        var isOpen = sidebar.classList.toggle('open');
        setMobileExpanded(isOpen);
        if (isOpen) {
          var first = utils.$('.sidebar-nav .nav-item', sidebar);
          if (first) first.focus();
        }
      });
      // Escape closes the drawer and returns focus to the trigger.
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          setMobileExpanded(false);
          mobile.focus();
        }
      });
    }
    // Close mobile sidebar on nav click
    utils.$$('.nav-item').forEach(function (a) {
      a.addEventListener('click', function () {
        sidebar.classList.remove('open');
      });
    });
  }

  /* ── Global search ──────────────────────────────────────── */
  function initSearch() {
    var input = utils.$('#global-search');
    var results = utils.$('#search-results');
    if (!input || !results) return;
    // Wire the search field to its result list as a combobox so assistive
    // technology announces the expanded/active state of the suggestions.
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', 'search-results');
    input.setAttribute('aria-expanded', 'false');
    var activeIndex = -1;

    function resultButtons() {
      return utils.$$('.search-item:not(.text-muted)', results);
    }

    function setActive(index) {
      var buttons = resultButtons();
      if (!buttons.length) { activeIndex = -1; return; }
      activeIndex = (index + buttons.length) % buttons.length;
      buttons.forEach(function (btn, i) {
        btn.classList.toggle('active', i === activeIndex);
        btn.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
      });
      buttons[activeIndex].scrollIntoView({ block: 'nearest' });
    }

    function closeResults(clearInput) {
      results.hidden = true;
      results.innerHTML = '';
      activeIndex = -1;
      input.setAttribute('aria-expanded', 'false');
      if (clearInput) input.value = '';
    }

    var run = utils.debounce(function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        closeResults(false);
        return;
      }
      var hits = App.content.search(q);
      results.innerHTML = '';
      activeIndex = -1;
      if (!hits.length) {
        results.appendChild(utils.el('div', { className: 'search-group' }, [
          utils.el('div', { className: 'search-item text-muted', text: 'No results' })
        ]));
        results.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        return;
      }
      var groups = {};
      hits.forEach(function (h) {
        if (!groups[h.group]) groups[h.group] = [];
        groups[h.group].push(h);
      });
      Object.keys(groups).forEach(function (g) {
        var wrap = utils.el('div', { className: 'search-group' });
        wrap.appendChild(utils.el('div', { className: 'search-group-label', text: g }));
        groups[g].slice(0, 8).forEach(function (h) {
          var btn = utils.el('button', {
            className: 'search-item',
            role: 'option',
            'aria-selected': 'false',
            onClick: function () {
              closeResults(true);
              if (h.action) h.action();
            }
          }, [
            utils.el('div', { html: inlineContentHtml(h.title) }),
            h.meta ? utils.el('div', { className: 'meta', html: inlineContentHtml(h.meta) }) : null
          ]);
          btn.addEventListener('mouseenter', function () {
            var buttons = resultButtons();
            setActive(buttons.indexOf(btn));
          });
          wrap.appendChild(btn);
        });
        results.appendChild(wrap);
      });
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }, 180);

    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeResults(true);
        input.blur();
      } else if (!results.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        setActive(activeIndex + (e.key === 'ArrowDown' ? 1 : -1));
      } else if (!results.hidden && e.key === 'Enter' && activeIndex >= 0) {
        var buttons = resultButtons();
        if (buttons[activeIndex]) {
          e.preventDefault();
          buttons[activeIndex].click();
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        closeResults(false);
      }
    });
  }

  /* ── Theme ──────────────────────────────────────────────── */
  var THEME_IDS = [
    'monokai', 'dracula', 'one-dark', 'github-dark', 'nord', 'gruvbox-dark',
    'tokyo-night', 'catppuccin', 'tomorrow-night', 'xcode', 'light',
    // Legacy themes kept so existing saved preferences still resolve;
    // they are not offered in the Settings picker anymore.
    'purple-night', 'solarized-dark'
  ];

  function normalizeTheme(t) {
    return THEME_IDS.indexOf(t) >= 0 ? t : 'monokai';
  }

  function applyTheme(theme) {
    theme = normalizeTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    try {
      var s = App.store.getSettings();
      if (s.theme !== theme) {
        s.theme = theme;
        App.store.saveSettings(s);
      }
    } catch (e) {}
  }

  function initTheme() {
    // Legacy theme values are reconciled by store migration. The active
    // preference is now read from IndexedDB-backed settings.
    var s = (App.store && App.store.getSettings) ? App.store.getSettings() : {};
    var fromSettings = (s.theme && s.theme !== 'dark') ? s.theme : null;
    applyTheme(fromSettings || 'monokai');
  }

  function applyTextSize(size) {
    var allowed = { small: true, medium: true, large: true };
    document.documentElement.setAttribute('data-text-size', allowed[size] ? size : 'medium');
  }

  /* ── Motion ─────────────────────────────────────────────── */
  // Animations are on unless the user explicitly disables them in Settings,
  // or the OS/browser asks for reduced motion.
  function motionEnabled() {
    if (utils.prefersReducedMotion()) return false;
    return document.documentElement.getAttribute('data-motion') !== 'off';
  }

  function applyMotion() {
    var on = true;
    try {
      var s = App.store && App.store.getSettings ? App.store.getSettings() : {};
      on = s.animations !== false;
    } catch (e) { on = true; }
    document.documentElement.setAttribute('data-motion', on ? 'on' : 'off');
  }

  /* ── Current certification (global context) ─────────────── */
  // Single source of truth for the certification the user is studying.
  // Persisted through the existing store, restored at boot, and re-rendered
  // app-wide when it changes. Tools/Settings/Search stay global.
  var currentCertId = null;

  function restoreCurrentCert() {
    var certs = App.content.getCerts();
    if (!certs.length) { currentCertId = null; return; }
    var stored = App.store.getCurrentCert ? App.store.getCurrentCert() : null;
    var valid = stored && certs.some(function (c) { return c.id === stored; });
    currentCertId = valid ? stored : certs[0].id;
    if (!valid) App.store.setCurrentCert(currentCertId);
  }

  function getCurrentCertId() { return currentCertId; }

  function getCurrentCert() {
    return App.content.getCert(currentCertId);
  }

  // Find an in-progress session that belongs to a certification, so switching
  // certifications can warn the user instead of silently discarding progress.
  function activeSessionForCert() {
    var quiz = App.quiz && App.quiz.getQuizSession ? App.quiz.getQuizSession() : null;
    if (quiz && quiz.cert) return { cert: quiz.cert, label: 'quiz' };
    var exam = App.quiz && App.quiz.getExamSession ? App.quiz.getExamSession() : null;
    if (exam && exam.cert && !exam.submitted) return { cert: exam.cert, label: 'exam' };
    var fc = App.store && App.store.getFlashSession ? App.store.getFlashSession() : null;
    if (fc && fc.cert && !fc.finished) return { cert: fc.cert, label: 'flashcard session' };
    return null;
  }

  // Pause running session timers without destroying the session, so the
  // session can be resumed later under its own certification.
  function pauseActiveSessionTimers() {
    if (!App.quiz) return;
    var ex = App.quiz.getExamSession ? App.quiz.getExamSession() : null;
    if (ex && ex.timer) {
      clearInterval(ex.timer);
      ex.timer = null;
      if (App.store.saveExamSession) App.store.saveExamSession(ex);
    }
    var q = App.quiz.getQuizSession ? App.quiz.getQuizSession() : null;
    if (q && q.speedTimer) {
      clearInterval(q.speedTimer);
      q.speedTimer = null;
      if (App.store.saveQuizSession) App.store.saveQuizSession(q);
    }
  }

  function setCurrentCert(id, opts) {
    opts = opts || {};
    var certs = App.content.getCerts();
    var cert = null;
    certs.forEach(function (c) { if (c.id === id) cert = c; });
    if (!cert) return false;
    if (currentCertId === id) { updateCertSelector(); return true; }

    var active = activeSessionForCert();
    if (active) {
      var activeCert = App.content.getCert(active.cert);
      var msg = 'You have an active ' + active.label +
        (activeCert ? ' for ' + activeCert.name : '') +
        '. Switch to ' + cert.name +
        '? Your session will be preserved and can be resumed when you switch back.';
      if (!window.confirm(msg)) return false;
    }

    pauseActiveSessionTimers();
    currentCertId = id;
    App.store.setCurrentCert(id);
    updateCertSelector();
    if (!opts.silent) handleRoute();
    return true;
  }

  var certMenuOpen = false;

  function initCertSelector() {
    updateCertSelector();
    document.addEventListener('click', function (e) {
      var root = utils.$('#cert-picker');
      if (root && certMenuOpen && !root.contains(e.target)) closeCertMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && certMenuOpen) closeCertMenu();
    });
  }

  function closeCertMenu() {
    var root = utils.$('#cert-picker');
    if (!root) return;
    certMenuOpen = false;
    var btn = utils.$('.cert-picker-btn', root);
    var menu = utils.$('.cert-picker-menu', root);
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (menu) menu.hidden = true;
  }

  function toggleCertMenu() {
    var root = utils.$('#cert-picker');
    if (!root) return;
    var menu = utils.$('.cert-picker-menu', root);
    if (certMenuOpen) { closeCertMenu(); return; }
    certMenuOpen = true;
    var btn = utils.$('.cert-picker-btn', root);
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (menu) menu.hidden = false;
  }

  function certItemMeta(id) {
    if (!App.content || !App.content.getByCert) return '';
    var q = App.content.getByCert('questions', id).length;
    var c = App.content.getByCert('flashcards', id).length;
    var l = App.content.getByCert('labs', id).length;
    return q + ' Q · ' + c + ' cards · ' + l + ' labs';
  }

  function updateCertSelector() {
    var root = utils.$('#cert-picker');
    if (!root) return;
    var certs = App.content.getCerts();
    var cur = currentCertId;
    var valid = cur && certs.some(function (c) { return c.id === cur; });
    if (!valid && certs.length) {
      cur = certs[0].id;
      currentCertId = cur;
      App.store.setCurrentCert(cur);
    }

    root.innerHTML = '';
    if (!certs.length) {
      var empty = utils.el('button', { className: 'cert-picker-btn is-empty', disabled: 'true', text: 'No certifications' });
      root.appendChild(empty);
      return;
    }

    var active = App.content.getCert(cur) || certs[0];
    var color = active.color || 'var(--accent-cyan)';
    var btn = utils.el('button', {
      className: 'cert-picker-btn',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
      onClick: function () { toggleCertMenu(); }
    }, [
      utils.el('span', { className: 'cert-picker-label', text: 'Current' }),
      utils.el('span', { className: 'cert-dot', style: { background: color } }),
      utils.el('span', { className: 'cert-picker-name', text: active.name }),
      utils.el('span', {
        className: 'cert-picker-chevron',
        html: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      })
    ]);
    root.appendChild(btn);

    var menu = utils.el('div', { className: 'cert-picker-menu', role: 'listbox', 'aria-label': 'Certifications', hidden: 'true' });
    menu.appendChild(utils.el('div', { className: 'cert-picker-heading', text: 'Switch certification' }));
    var items = [];
    certs.forEach(function (c) {
      var isActive = c.id === cur;
      var item = utils.el('button', {
        className: 'cert-picker-item' + (isActive ? ' active' : ''),
        role: 'option',
        'aria-selected': isActive ? 'true' : 'false',
        onClick: function () { closeCertMenu(); setCurrentCert(c.id); }
      }, [
        utils.el('span', { className: 'cert-dot', style: { background: c.color || 'var(--accent-cyan)' } }),
        utils.el('span', { className: 'cert-picker-item-body' }, [
          utils.el('span', { className: 'cert-picker-item-name', text: c.name }),
          utils.el('span', { className: 'cert-picker-item-meta', text: certItemMeta(c.id) })
        ]),
        isActive ? utils.el('span', { className: 'cert-picker-check', html: '&#10003;' }) : null
      ]);
      items.push({ id: c.id, node: item });
      menu.appendChild(item);
    });
    root.appendChild(menu);

    // Keyboard navigation within the open menu
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!certMenuOpen) toggleCertMenu();
        if (certMenuOpen && items.length) {
          var idx = items.findIndex(function (i) { return i.id === currentCertId; });
          if (idx < 0) idx = 0;
          if (e.key === 'ArrowDown') idx = (idx + 1) % items.length;
          if (e.key === 'ArrowUp') idx = (idx - 1 + items.length) % items.length;
          if (e.key === 'Enter' || e.key === ' ') { closeCertMenu(); setCurrentCert(items[idx].id); return; }
          items[idx].node.focus();
        }
      }
    });
  }

  /* ── Boot ───────────────────────────────────────────────── */
  function init() {
    initTheme();
    var settings = App.store && App.store.getSettings ? App.store.getSettings() : {};
    applyTextSize(settings.textSize || 'medium');
    applyMotion();
    initSidebar();
    initSearch();

    // Reload button
    var reloadBtn = utils.$('#reload-content');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', function () {
        if (App.content && App.content.reload) App.content.reload();
      });
    }

    // Register routes (views will fill them)
    window.addEventListener('hashchange', handleRoute);

    // Load content then restore the certification context and route
    if (App.content && App.content.load) {
      App.content.load(function () {
        restoreCurrentCert();
        initCertSelector();
        handleRoute();
      });
    } else {
      restoreCurrentCert();
      initCertSelector();
      handleRoute();
    }
  }

  App.core = {
    utils: utils,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    registerRoute: registerRoute,
    navigate: navigate,
    handleRoute: handleRoute,
    getRoute: function () { return currentRoute; },
    getParams: function () { return currentParams; },
    getCurrentCertId: getCurrentCertId,
    getCurrentCert: getCurrentCert,
    setCurrentCert: setCurrentCert,
    restoreCurrentCert: restoreCurrentCert,
    updateCertSelector: updateCertSelector,
    applyTheme: applyTheme,
    applyTextSize: applyTextSize,
    themeIds: THEME_IDS.slice(),
    normalizeTheme: normalizeTheme,
    applyMotion: applyMotion,
    motionEnabled: motionEnabled,
    init: init
  };

  // Shorthand
  App.$ = utils.$;
  App.$$ = utils.$$;
  App.el = utils.el;
  App.toast = toast;
})();
