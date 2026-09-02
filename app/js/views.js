/* ═══════════════════════════════════════════════════════════
   ReviewApp · views.js
   All view renderers + route registration
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;
  var $ = utils.$;

  function inlineHtml(value) {
    return App.markdown.renderInline(value == null ? '' : String(value));
  }

  function choiceHtml(value) {
    return App.quiz && App.quiz.renderChoiceHtml
      ? App.quiz.renderChoiceHtml(value)
      : inlineHtml(value);
  }

  function isMatchQuestion(q) {
    return App.quiz && App.quiz.isMatchQuestion ? App.quiz.isMatchQuestion(q) : !!q && (q.type === 'match' || q.type === 'command_match');
  }

  function matchItem(pair) {
    return pair && pair.item != null ? pair.item : (pair && pair.option != null ? pair.option : '');
  }

  function matchCounterpart(pair) {
    return pair && pair.match != null ? pair.match : (pair && pair.description != null ? pair.description : '');
  }

  function emptyState(title, msg) {
    return el('div', { className: 'empty-state' }, [
      el('h3', { text: title }),
      el('p', { text: msg })
    ]);
  }

  // Keep large counts readable while preserving ordinary values as-is.
  function compactNumber(value) {
    var number = Number(value);
    if (!isFinite(number)) return '—';
    var sign = number < 0 ? '-' : '';
    var absolute = Math.abs(number);
    var units = ['', 'K', 'M', 'B', 'T'];
    var unit = 0;
    while (absolute >= 1000 && unit < units.length - 1) {
      absolute /= 1000;
      unit++;
    }
    var decimals = unit === 0 ? (absolute % 1 ? 1 : 0) : absolute >= 100 ? 0 : absolute >= 10 ? 1 : 2;
    var rounded = Number(absolute.toFixed(decimals));
    if (rounded >= 1000 && unit < units.length - 1) {
      rounded = Number((rounded / 1000).toFixed(2));
      unit++;
    }
    return sign + String(rounded).replace(/\.0+$|(\.\d*?)0+$/, '') + units[unit];
  }

  // Compact contextual header showing what the user is currently studying.
  // certId/chapter come from live data (never hardcoded); activity/meta are
  // optional labels such as the activity type or a progress indicator.
  function makeContextHeader(certId, chapter, activity, meta) {
    var wrap = el('div', { className: 'activity-context' });
    var cert = certId ? App.content.getCert(certId) : null;
    if (activity) wrap.appendChild(el('div', { className: 'ctx-activity', html: inlineHtml(activity) }));
    if (cert) wrap.appendChild(el('div', { className: 'ctx-cert', text: cert.name }));
    if (chapter) wrap.appendChild(el('div', { className: 'ctx-chapter', html: inlineHtml(chapter) }));
    if (meta) wrap.appendChild(el('div', { className: 'ctx-meta', html: inlineHtml(meta) }));
    return wrap;
  }

  function practiceBack(root, route, label, before) {
    root.appendChild(el('button', {
      className: 'btn btn-ghost btn-sm practice-back',
      type: 'button',
      text: label || '← Back',
      onClick: function () {
        if (before) before();
        App.core.navigate(route);
      }
    }));
  }

  // Number input wrapped with themed − / + buttons (replaces native spinners).
  // Returns { el, input }; attrs are forwarded to the inner input element.
  function stepperField(attrs) {
    attrs = attrs || {};
    var input = el('input', Object.assign({ className: 'form-control', type: 'number' }, attrs));
    function stepBtn(dir, label, glyph) {
      return el('button', {
        className: 'stepper-btn', type: 'button', 'aria-label': label, text: glyph,
        onClick: function () {
          var min = input.getAttribute('min');
          var max = input.getAttribute('max');
          var cur = parseInt(input.value, 10);
          if (isNaN(cur)) cur = dir > 0 ? -1 : 1;
          var next = cur + dir;
          if (min != null && min !== '' && next < Number(min)) next = Number(min);
          if (max != null && max !== '' && next > Number(max)) next = Number(max);
          input.value = String(next);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
    var wrap = el('div', { className: 'stepper' });
    wrap.appendChild(stepBtn(-1, 'Decrease', '−'));
    wrap.appendChild(input);
    wrap.appendChild(stepBtn(1, 'Increase', '+'));
    return { el: wrap, input: input };
  }

  function progressRing(pct, size, color) {
    size = size || 72;
    var viewSize = 100;
    // Stroke thickness in viewBox units. The previous ring used a 6px stroke;
    // 9.3/100 ≈ 6.3px at the 68px dashboard size (≈5% thicker) and it scales
    // proportionally whenever the ring is resized via CSS.
    var sw = 9.3;
    var center = viewSize / 2;
    var r = (viewSize - sw) / 2 - 0.5; // small margin keeps the stroke inside the viewBox
    var c = 2 * Math.PI * r;
    var p = Math.max(0, Math.min(100, Number(pct) || 0));
    var offset = c - (p / 100) * c;
    var strokeColor = color || 'var(--accent-primary)';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 ' + viewSize + ' ' + viewSize);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('class', 'progress-ring');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', Math.round(p) + '% complete');
    svg.innerHTML =
      '<circle class="progress-ring-bg" cx="' + center + '" cy="' + center + '" r="' + r + '" fill="none" stroke-width="' + sw + '"/>' +
      '<circle class="progress-ring-fg" cx="' + center + '" cy="' + center + '" r="' + r + '" fill="none" stroke-width="' + sw + '" ' +
      'style="stroke: ' + strokeColor + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '"/>';
    return svg;
  }

  function weekdayOf(ts) {
    return new Date(ts).toLocaleDateString(undefined, { weekday: 'short' });
  }

  var COMMANDS_OF_DAY = [
    { cmd: 'chmod 755 script.sh', tip: 'Owner rwx, group/other rx — classic executable perms.' },
    { cmd: 'ss -tulpn', tip: 'Show listening TCP/UDP sockets with process names.' },
    { cmd: 'find / -name "*.conf" 2>/dev/null', tip: 'Locate config files, suppress permission errors.' },
    { cmd: 'journalctl -u ssh -f', tip: 'Follow SSH service logs in real time.' },
    { cmd: 'ip addr show', tip: 'Modern replacement for ifconfig — list interfaces and IPs.' },
    { cmd: 'sudo systemctl status nginx', tip: 'Check whether a systemd unit is active and recent logs.' },
    { cmd: 'grep -rn "PermitRootLogin" /etc/ssh', tip: 'Search recursively with line numbers.' },
    { cmd: 'df -h && free -h', tip: 'Quick disk and memory health check.' },
    { cmd: 'tar -czvf backup.tar.gz /etc', tip: 'Create a compressed archive of /etc.' },
    { cmd: 'useradd -m -s /bin/bash alice', tip: 'Create user with home dir and bash shell.' }
  ];

  function viewDashboard(root) {
    var certId = App.core.getCurrentCertId();
    var certs = App.content.getCerts();
    if (!certs.length) {
      root.appendChild(emptyState('No certifications available', 'Add certifications to the certifications/ directory or use Settings → Deep-scan, then reload.'));
      return;
    }
    var cert = App.content.getCert(certId);
    var counts = cert ? {
      questions: App.content.getByCert('questions', certId).length,
      flashcards: App.content.getByCert('flashcards', certId).length,
      labs: App.content.getByCert('labs', certId).length
    } : App.content.counts();
    var stats = App.store.getDashboardStats(certId);

    var termText = 'reviewapp v1.3.5 — ' + (cert ? cert.name + ' · ' : '') + compactNumber(counts.questions) + ' questions · ' +
      compactNumber(counts.flashcards) + ' cards · ' + compactNumber(counts.labs) + ' labs — SYSTEM READY';
    var strip = el('div', { className: 'terminal-strip', 'aria-label': 'System status' });
    root.appendChild(strip);
    if (!App.core.motionEnabled()) {
      strip.textContent = termText;
    } else {
      var i = 0;
      function type() {
        if (i <= termText.length) {
          strip.innerHTML = utils.escapeHtml(termText.slice(0, i)) + '<span class="terminal-cursor"></span>';
          i++;
          setTimeout(type, 18 + Math.random() * 20);
        } else {
          strip.textContent = termText;
        }
      }
      type();
    }

    var grid = el('div', { className: 'stat-grid' });
    var tiles = [
      { label: 'Accuracy', value: stats.accuracy, suffix: '%' },
      { label: 'Streak', value: stats.streakDays, suffix: 'd' },
      { label: 'Cards Due', value: stats.cardsDue, suffix: '' },
      { label: 'Labs Done', value: stats.labsDone, suffix: '' },
      { label: 'Answered', value: stats.totalAnswered, suffix: '' }
    ];
    tiles.forEach(function (t) {
      var tile = el('div', { className: 'stat-tile' });
      var val = el('div', { className: 'stat-value' });
      tile.appendChild(val);
      tile.appendChild(el('div', { className: 'stat-label', text: t.label }));
      grid.appendChild(tile);
      utils.countUp(val, t.value, 700);
      setTimeout(function () { val.textContent = compactNumber(t.value) + t.suffix; }, 750);
    });
    root.appendChild(grid);

    var nextStep = el('div', { className: 'panel mt-3 dashboard-next-step' });
    nextStep.appendChild(el('div', { className: 'label-upper mb-1', text: 'Recommended next step' }));
    var weekly = App.store.weeklyReviewRecommendations(1, certId);
    if (weekly.length) {
      var top = weekly[0];
      nextStep.appendChild(el('h3', { text: 'Review: ' + (top.chapter || top.cert || 'flashcards') + ' — ' + top.tag }));
      nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: 'You struggled with ' + compactNumber(top.cards) + ' card' + (top.cards === 1 ? '' : 's') + ' (' + compactNumber(top.agains) + ' again-mark' + (top.agains === 1 ? '' : 's') + ') this week.' }));
      nextStep.appendChild(el('button', {
        className: 'btn btn-primary btn-sm', text: 'Review flashcards',
        onClick: function () {
          sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: top.cert, chapter: top.chapter }));
          App.core.navigate('#/flashcards');
        }
      }));
    } else if (stats.cardsDue) {
      nextStep.appendChild(el('h3', { text: compactNumber(stats.cardsDue) + ' flashcard' + (stats.cardsDue === 1 ? '' : 's') + ' due for review' }));
      nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: 'A short review now keeps older material fresh.' }));
      nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Review flashcards', onClick: function () { App.core.navigate('#/flashcards'); } }));
    } else {
      var weak = App.store.weakQuestions(60, certId);
      if (weak.length) {
        nextStep.appendChild(el('h3', { text: 'Practice your weak spots' }));
        nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: weak.length + ' question' + (weak.length === 1 ? '' : 's') + ' need more practice.' }));
        nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Start weak-spots quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      } else {
        nextStep.appendChild(el('h3', { text: 'Keep building momentum' }));
        nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: 'Start a chapter quiz to grow your question coverage.' }));
        nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Start a quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      }
    }
    root.appendChild(nextStep);

    if (cert) {
      root.appendChild(el('h2', { className: 'mb-2', text: 'Chapter Progress' }));
      var chapters = App.content.getChapters(certId, 'questions');
      var chapterKeys = Object.keys(chapters);
      var allAns = App.store.getAnswers({ cert: certId });
      var seenAll = {};
      allAns.forEach(function (a) { seenAll[a.qId] = true; });
      var completedChapters = 0;
      var rows = [];

      chapterKeys.forEach(function (ch) {
        var items = chapters[ch];
        var chapterSeen = 0;
        items.forEach(function (q) { if (seenAll[q.qId]) chapterSeen++; });
        var pct = items.length ? Math.round((chapterSeen / items.length) * 100) : 0;
        if (items.length && chapterSeen >= items.length) completedChapters++;

        var acc = App.store.accuracyFor({ cert: certId, chapter: ch });
        var cardCh = App.content.findChapter ? App.content.findChapter(certId, 'flashcards', ch) : null;
        var labCh = App.content.findChapter ? App.content.findChapter(certId, 'labs', ch) : null;
        var cards = cardCh ? (App.content.getChapters(certId, 'flashcards')[cardCh] || []).length : 0;
        var labs = labCh ? (App.content.getChapters(certId, 'labs')[labCh] || []).length : 0;

        var row = el('div', { className: 'panel mb-2 chapter-row' });
        var head = el('div', { className: 'flex-between mb-1', style: { flexWrap: 'wrap', gap: '0.4rem', alignItems: 'baseline' } });
        head.appendChild(el('h3', { className: 'chapter-row-title', text: ch }));
        head.appendChild(el('span', { className: 'chip chip-muted', text: pct + '% seen' }));
        row.appendChild(head);

        var bar = el('div', { className: 'progress-bar mb-1' });
        bar.appendChild(el('div', { className: 'progress-fill', style: { width: pct + '%', background: cert.color } }));
        row.appendChild(bar);

        row.appendChild(el('div', { className: 'text-muted mb-2', style: { fontSize: '0.82rem' },
          text: items.length + ' Q · ' + cards + ' cards · ' + labs + ' labs · ' + (acc != null ? acc + '% accuracy' : 'no quiz data yet') }));

        var btns = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
        btns.appendChild(el('button', {
          className: 'btn btn-primary btn-sm', text: 'Quiz',
          onClick: function () {
            sessionStorage.setItem('reviewapp.quizSetup', JSON.stringify({ mode: 'chapter', cert: certId, chapter: ch }));
            App.core.navigate('#/quiz');
          }
        }));
        if (cardCh) {
          btns.appendChild(el('button', {
            className: 'btn btn-secondary btn-sm', text: 'Flashcards',
            onClick: function () {
              sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: cardCh }));
              App.core.navigate('#/flashcards');
            }
          }));
        }
        if (labCh) {
          btns.appendChild(el('button', {
            className: 'btn btn-secondary btn-sm', text: 'Labs',
            onClick: function () {
              sessionStorage.setItem('reviewapp.labsSetup', JSON.stringify({ cert: certId, chapter: labCh }));
              App.core.navigate('#/labs');
            }
          }));
        }
        row.appendChild(btns);
        rows.push(row);
      });

      var headRow = el('div', { className: 'flex-between mb-2', style: { flexWrap: 'wrap', gap: '0.4rem', alignItems: 'baseline' } });
      headRow.appendChild(el('p', { className: 'text-muted mb-0', style: { fontSize: '0.88rem' }, text: 'Chapter-by-chapter coverage for ' + cert.name }));
      headRow.appendChild(el('span', { className: 'chip chip-green', text: completedChapters + ' / ' + chapterKeys.length + ' chapters complete' }));
      root.appendChild(headRow);

      if (!rows.length) {
        root.appendChild(el('p', { className: 'text-muted', text: 'No chapters available yet — add question content and reload.' }));
      } else {
        rows.forEach(function (r) { root.appendChild(r); });
      }
    }

    var last = App.store.getSettings().lastStudy;
    var cont = el('div', { className: 'panel mt-3' });
    cont.appendChild(el('div', { className: 'label-upper mb-1', text: 'Continue studying' }));
    if (last && (!last.cert || last.cert === certId)) {
      cont.appendChild(el('p', { className: 'mb-1', text: 'Last session: ' + last.type + (last.mode ? ' · ' + last.mode : '') + ' — ' + utils.formatDate(last.ts) }));
      var btnRow = el('div', { className: 'flex gap-sm' });
      btnRow.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Resume Quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      btnRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Flashcards', onClick: function () { App.core.navigate('#/flashcards'); } }));
      cont.appendChild(btnRow);
    } else {
      cont.appendChild(el('p', { className: 'text-muted', text: 'Start a quiz or flashcard session to track progress here.' }));
    }
    root.appendChild(cont);

    var activity = App.store.getActivity(14, certId);
    var totals = activity.reduce(function (acc, d) {
      acc.count += d.count;
      acc.correct += d.correct || 0;
      return acc;
    }, { count: 0, correct: 0 });
    var best = activity.reduce(function (b, d) { return d.count > b.count ? d : b; }, activity[0] || { date: Date.now(), count: 0 });
    var maxC = Math.max.apply(null, activity.map(function (d) { return d.count; }).concat([1]));
    var nowDay = new Date(); nowDay.setHours(0, 0, 0, 0);
    var todayTs = nowDay.getTime();
    var today = activity.filter(function (d) { return d.date === todayTs; })[0];

    var sparkWrap = el('div', { className: 'panel mt-3' });
    var actHead = el('div', { className: 'flex-between mb-1', style: { flexWrap: 'wrap', alignItems: 'baseline' } });
    actHead.appendChild(el('div', { className: 'label-upper', text: '14-day activity' }));
    if (totals.count) {
      actHead.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.78rem' },
        text: totals.count + ' answers · ' + Math.round((totals.correct / totals.count) * 100) + '% correct · best ' +
          weekdayOf(best.date) + ' (' + best.count + ')' + (today && today.count ? ' · today ' + today.count : '') }));
    } else {
      actHead.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.78rem' }, text: 'No answers logged in the last 14 days' }));
    }
    sparkWrap.appendChild(actHead);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'activity-chart dashboard-activity');
    svg.setAttribute('viewBox', '0 0 280 58');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Answers per day over the last 14 days');
    var w = 280 / activity.length;
    activity.forEach(function (d, i) {
      var h = Math.max(2, (d.count / maxC) * 50);
      var isToday = d.date === todayTs;
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * w + 2);
      rect.setAttribute('y', 54 - h);
      rect.setAttribute('width', Math.max(3, w - 4));
      rect.setAttribute('height', h);
      rect.setAttribute('rx', '2');
      rect.setAttribute('fill', d.count ? (isToday ? 'var(--accent-green)' : 'var(--accent-cyan)') : 'var(--border)');
      if (d.count) {
        var tip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tip.textContent = utils.formatDate(d.date) + ' — ' + d.count + ' answer' + (d.count === 1 ? '' : 's') +
          (d.correct ? ' (' + d.correct + ' correct)' : '');
        rect.appendChild(tip);
      }
      svg.appendChild(rect);
    });
    sparkWrap.appendChild(svg);
    var labels = el('div', { className: 'activity-labels' });
    activity.forEach(function (d) {
      labels.appendChild(el('span', {
        className: 'activity-label' + (d.date === todayTs ? ' today' : ''),
        title: utils.formatDate(d.date),
        text: weekdayOf(d.date).slice(0, 2)
      }));
    });
    sparkWrap.appendChild(labels);
    root.appendChild(sparkWrap);

    var dayIdx = Math.floor(Date.now() / 86400000) % COMMANDS_OF_DAY.length;
    var cotd = COMMANDS_OF_DAY[dayIdx];
    var daily = el('div', { className: 'daily-grid mt-3' });
    var cmdCard = el('div', { className: 'panel' });
    cmdCard.appendChild(el('div', { className: 'label-upper mb-1', text: 'Command of the day' }));
    cmdCard.appendChild(el('div', { className: 'code-block', text: cotd.cmd }));
    cmdCard.appendChild(el('p', { className: 'text-muted mt-1', style: { fontSize: '0.88rem' }, html: inlineHtml(cotd.tip) }));
    daily.appendChild(cmdCard);
    var ports = App.tools && App.tools.getPorts ? App.tools.getPorts() : [];
    if (ports.length) {
      var potd = ports[Math.floor(Date.now() / 86400000) % ports.length];
      var portCard = el('div', { className: 'panel' });
      portCard.appendChild(el('div', { className: 'label-upper mb-1', text: 'Port of the day' }));
      portCard.appendChild(el('div', { className: 'code-block port-block' }, [
        el('span', { className: 'port-num', text: potd.port }),
        el('span', { className: 'port-name', text: potd.name })
      ]));
      portCard.appendChild(el('p', { className: 'text-muted mt-1', style: { fontSize: '0.88rem' }, html: inlineHtml(potd.desc) }));
      portCard.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm mt-1', text: 'Open Port Reference',
        onClick: function () {
          if (App.tools.highlightPort) App.tools.highlightPort(potd.port);
          App.core.navigate('#/tools');
        }
      }));
      daily.appendChild(portCard);
    }
    root.appendChild(daily);
  }

  /* ── Dashboard command center ───────────────────────────── */
  // The Dashboard intentionally consumes the existing store/content selectors;
  // it does not maintain a second progress or analytics model.
  function viewDashboardCommand(root) {
    var certId = App.core.getCurrentCertId();
    var certs = App.content.getCerts();
    if (!certs.length) {
      root.appendChild(emptyState('No certifications available', 'Add certifications to the certifications/ directory or use Settings → Deep-scan, then reload.'));
      return;
    }
    var cert = App.content.getCert(certId);
    if (!cert) {
      root.appendChild(emptyState('No certification selected', 'Choose a certification from the Current certification picker.'));
      return;
    }

    var questions = App.content.getByCert('questions', certId);
    var cards = App.content.getByCert('flashcards', certId);
    var labs = App.content.getByCert('labs', certId);
    var questionChapters = App.content.getChapters(certId, 'questions');
    var flashChapters = App.content.getChapters(certId, 'flashcards');
    var labChapters = App.content.getChapters(certId, 'labs');
    var answers = App.store.getAnswers({ cert: certId });
    var reviews = App.store.getCardReviews({ cert: certId });
    var stats = App.store.getDashboardStats(certId);
    var certColor = cert.color || 'var(--accent-cyan)';
    var seenQuestions = {};
    answers.forEach(function (a) { if (a.qId) seenQuestions[a.qId] = true; });

    var reviewedCards = {};
    reviews.forEach(function (r) { if (r.cardId) reviewedCards[r.cardId] = true; });
    var reviewedCardCount = Object.keys(reviewedCards).length;
    var completedLabs = Math.min(labs.length, stats.labsDone || 0);
    var overallProgress = questions.length
      ? Math.round((Object.keys(seenQuestions).length / questions.length) * 100)
      : (cards.length ? Math.round((reviewedCardCount / cards.length) * 100) : 0);

    function chapterNumber(name, fallback) {
      var n = App.content.chapterNumber ? App.content.chapterNumber(name) : null;
      return n == null ? String(fallback + 1).padStart(2, '0') : String(n).padStart(2, '0');
    }

    function chapterTitle(name) {
      var value = String(name || 'General');
      return value.replace(/^Ch\s*\d+\s*[·:-]?\s*/i, '') || value;
    }

    function resolveChapter(type, chapter) {
      if (!chapter) return null;
      return App.content.findChapter ? App.content.findChapter(certId, type, chapter) : chapter;
    }

    function launchChapter(type, chapter) {
      if (type === 'quiz') {
        sessionStorage.setItem('reviewapp.quizSetup', JSON.stringify({ mode: 'chapter', cert: certId, chapter: chapter }));
        App.core.navigate('#/quiz');
      } else if (type === 'flashcards') {
        var flashChapter = resolveChapter('flashcards', chapter);
        if (!flashChapter) { App.toast('No flashcards in this chapter', 'error'); return; }
        sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: flashChapter }));
        App.core.navigate('#/flashcards');
      } else if (type === 'labs') {
        var labChapter = resolveChapter('labs', chapter);
        if (!labChapter) { App.toast('No labs in this chapter', 'error'); return; }
        sessionStorage.setItem('reviewapp.labsSetup', JSON.stringify({ cert: certId, chapter: labChapter }));
        App.core.navigate('#/labs');
      }
    }

    function activityLabel(type) {
      return type === 'flashcards' ? 'Flashcards' : type === 'labs' ? 'Lab' : 'Quiz';
    }

    function relativeDate(ts) {
      if (!ts) return 'Earlier';
      var diff = Math.max(0, Date.now() - ts);
      if (diff < 86400000) return 'Today';
      if (diff < 172800000) return 'Yesterday';
      return utils.formatDate(ts);
    }

    // Build a compact, real activity feed from the existing answer/review/lab logs.
    var activityEvents = [];
    answers.forEach(function (a) {
      activityEvents.push({
        ts: a.ts || 0,
        type: 'quiz',
        chapter: a.chapter,
        detail: a.correct ? 'Correct answer' : 'Needs another look'
      });
    });
    reviews.forEach(function (r) {
      activityEvents.push({
        ts: r.ts || r.sessionTs || 0,
        type: 'flashcards',
        chapter: r.chapter,
        detail: r.outcome === 'again' ? 'Marked Again' : 'Marked Next'
      });
    });
    var doneLabs = App.store.get('labsDone', {});
    labs.forEach(function (lab) {
      if (doneLabs[lab._id]) {
        activityEvents.push({ ts: doneLabs[lab._id], type: 'labs', chapter: lab._chapter, detail: lab.title });
      }
    });
    activityEvents.sort(function (a, b) { return b.ts - a.ts; });

    // The legacy streak record is global. For the certification workspace,
    // derive a small cert-scoped streak from the actual activity events.
    var activeDays = {};
    activityEvents.forEach(function (event) {
      if (!event.ts) return;
      var day = new Date(event.ts);
      day.setHours(0, 0, 0, 0);
      activeDays[day.getTime()] = true;
    });
    var streakCursor = new Date();
    streakCursor.setHours(0, 0, 0, 0);
    if (!activeDays[streakCursor.getTime()]) streakCursor.setTime(streakCursor.getTime() - 86400000);
    var activeStreak = 0;
    while (activeDays[streakCursor.getTime()]) {
      activeStreak++;
      streakCursor.setTime(streakCursor.getTime() - 86400000);
    }

    function addChapterGroup(groups, chapter, type) {
      if (!chapter) return;
      var number = App.content.chapterNumber ? App.content.chapterNumber(chapter) : null;
      var group = groups.find(function (item) {
        return (number != null && item.number === number) || (number == null && item.chapter === chapter);
      });
      if (!group) {
        group = { chapter: chapter, number: number, types: {} };
        groups.push(group);
      }
      // Question chapter names are preferred as the display label when a
      // certification uses slightly different labels across content types.
      group.types[type] = chapter;
      if (type === 'questions') group.chapter = chapter;
    }

    // Build a single ordered chapter list from all three learning modes. The
    // next-action workflow must not disappear when a chapter has only cards or
    // labs and no question file.
    var chapterGroups = [];
    Object.keys(questionChapters).forEach(function (chapter) { addChapterGroup(chapterGroups, chapter, 'questions'); });
    Object.keys(flashChapters).forEach(function (chapter) { addChapterGroup(chapterGroups, chapter, 'flashcards'); });
    Object.keys(labChapters).forEach(function (chapter) { addChapterGroup(chapterGroups, chapter, 'labs'); });
    chapterGroups.sort(function (a, b) {
      if (a.number != null && b.number != null) return a.number - b.number;
      if (a.number != null) return -1;
      if (b.number != null) return 1;
      return a.chapter.localeCompare(b.chapter);
    });

    var chapterRows = chapterGroups.map(function (group, index) {
      var chapter = group.chapter;
      var questionChapter = group.types.questions || resolveChapter('questions', chapter);
      var flashChapter = group.types.flashcards || resolveChapter('flashcards', chapter);
      var labChapter = group.types.labs || resolveChapter('labs', chapter);
      var qItems = questionChapter ? (questionChapters[questionChapter] || []) : [];
      var cardItems = flashChapter ? (flashChapters[flashChapter] || []) : [];
      var labItems = labChapter ? (labChapters[labChapter] || []) : [];
      var performance = App.store.chapterPerformance(certId).find(function (item) {
        return item.chapter === chapter || (App.content.chapterNumber(item.chapter) != null && App.content.chapterNumber(item.chapter) === App.content.chapterNumber(chapter));
      }) || { questionsSeen: 0, flashcardsReviewed: 0 };
      var seen = performance.questionsSeen;
      var chapterReviews = flashChapter ? reviews.filter(function (r) {
        return resolveChapter('flashcards', r.chapter) === flashChapter;
      }) : [];
      var cardIds = {};
      cardItems.forEach(function (card) { cardIds[card._key || card._id] = true; });
      var cardSeen = {};
      chapterReviews.forEach(function (r) {
        if (r.cardId && cardIds[r.cardId]) cardSeen[r.cardId] = true;
      });
      var cardSeenCount = performance.flashcardsReviewed;
      var doneLabCount = labItems.filter(function (lab) { return !!doneLabs[lab._id]; }).length;
      var pct = performance.coverage || 0;
      return {
        chapter: chapter,
        number: chapterNumber(chapter, index),
        title: chapterTitle(chapter),
        questions: qItems.length,
        cards: cardItems.length,
        labs: labItems.length,
        // Stats is authoritative for per-chapter coverage. Use its counts so
        // Chapter 1 and other chapters cannot drift between views.
        pct: Math.min(100, pct),
        accuracy: App.store.accuracyFor({ cert: certId, chapter: questionChapter || chapter }),
        questionChapter: questionChapter,
        flashChapter: flashChapter,
        labChapter: labChapter,
        quizSeen: seen,
        cardSeen: cardSeenCount,
        labDoneCount: doneLabCount,
        flashComplete: !cardItems.length || cardSeenCount >= cardItems.length,
        quizComplete: !qItems.length || seen >= qItems.length,
        labsComplete: !labItems.length || doneLabCount >= labItems.length
      };
    });

    function pendingPhase(row) {
      // Use the same reviewed/seen counts as Stats for the next-action
      // decision, so a fully covered chapter is never offered again.
      if (row.cards && !row.flashComplete) return { type: 'flashcards', completed: row.cardSeen, total: row.cards };
      if (row.questions && !row.quizComplete) return { type: 'quiz', completed: row.quizSeen, total: row.questions };
      if (row.labs && !row.labsComplete) return { type: 'labs', completed: row.labDoneCount, total: row.labs };
      return null;
    }

    function findChapterRow(type, chapter) {
      var resolved = resolveChapter(type, chapter);
      if (!resolved) return null;
      var field = type === 'questions' ? 'questionChapter' : type === 'flashcards' ? 'flashChapter' : 'labChapter';
      return chapterRows.find(function (row) { return row[field] === resolved; }) || null;
    }

    var orderedAction = null;
    for (var rowIndex = 0; rowIndex < chapterRows.length; rowIndex++) {
      var phase = pendingPhase(chapterRows[rowIndex]);
      if (phase) {
        orderedAction = { row: chapterRows[rowIndex], phase: phase, resume: false };
        break;
      }
    }

    var activeFlash = App.store.getFlashSession();
    if (activeFlash && (activeFlash.cert || certId) !== certId) activeFlash = null;
    var activeQuiz = App.quiz && App.quiz.getQuizSession ? App.quiz.getQuizSession() : null;
    if (activeQuiz && activeQuiz.cert !== certId) activeQuiz = null;
    var activeLab = activeLabSession(certId);
    var activeAction = null;
    if (activeFlash && !activeFlash.finished) {
      var flashRow = findChapterRow('flashcards', activeFlash.chapter);
      if (flashRow) activeAction = { row: flashRow, phase: { type: 'flashcards', completed: activeFlash.completed || 0, total: activeFlash.totalCards || flashRow.cards }, resume: true };
    } else if (activeQuiz && activeQuiz.questions && activeQuiz.questions[activeQuiz.index]) {
      var quizRow = findChapterRow('questions', activeQuiz.questions[activeQuiz.index]._chapter);
      if (quizRow) activeAction = { row: quizRow, phase: { type: 'quiz', completed: activeQuiz.index, total: activeQuiz.questions.length }, resume: true };
    } else if (activeLab) {
      var labRow = findChapterRow('labs', activeLab.lab._chapter);
      if (labRow) activeAction = { row: labRow, phase: { type: 'labs', completed: activeLab.doneCount, total: activeLab.total }, resume: true };
    }

    // A live session is the most useful thing to resume. Without one, always
    // choose the first unfinished phase in chapter order: Flashcards → Quiz → Labs.
    var selectedAction = activeAction || orderedAction;
    var continueRow = selectedAction ? selectedAction.row : null;
    var continueType = selectedAction ? selectedAction.phase.type : null;
    var continueChapter = continueRow ? continueRow.chapter : null;
    var continueMode = 'All chapters complete';
    var continueMeta = 'All flashcards, quizzes, and labs are complete.';
    if (selectedAction) {
      var phaseName = continueType === 'flashcards' ? 'Flashcards' : continueType === 'quiz' ? 'Quiz' : 'Labs';
      if (selectedAction.resume) {
        continueMode = 'Resume ' + (continueType === 'labs' ? 'Lab' : phaseName);
        if (continueType === 'flashcards') {
          continueMeta = compactNumber(Math.max(0, selectedAction.phase.total - selectedAction.phase.completed)) + ' cards remaining in this session';
        } else if (continueType === 'quiz') {
          continueMeta = 'Question ' + compactNumber(selectedAction.phase.completed + 1) + ' of ' + compactNumber(selectedAction.phase.total);
        } else {
          continueMeta = activeLab.lab.title + ' · ' + activeLab.doneCount + ' of ' + activeLab.total + ' steps done';
        }
      } else {
        var hasProgress = selectedAction.phase.completed > 0;
        continueMode = (hasProgress ? 'Continue ' : 'Start ') + phaseName;
        var compactProgressLabel = compactNumber(selectedAction.phase.completed) + ' / ' + compactNumber(selectedAction.phase.total);
        continueMeta = phaseName + ' · ' + compactProgressLabel + (continueType === 'flashcards' ? ' cards reviewed' : continueType === 'quiz' ? ' questions explored' : ' labs completed');
      }
    }

    function continueAction() {
      if (!selectedAction) {
        App.toast('All chapters complete', 'success', 2200);
        return;
      }
      if (selectedAction.resume) {
        if (continueType === 'labs') App.core.navigate('#/labs/' + encodeURIComponent(activeLab.lab._id));
        else App.core.navigate('#/' + continueType);
        return;
      }
      launchChapter(continueType, continueChapter);
    }

    var page = el('div', { className: 'dashboard-page' });
    page.style.setProperty('--cert-accent', certColor);

    // Hero: identity, real content counts, and one meaningful progress measure.
    var hero = el('section', { className: 'dashboard-hero' });
    var heroCopy = el('div', { className: 'dashboard-hero-copy' });
    heroCopy.appendChild(el('div', { className: 'dashboard-kicker', text: 'Current certification · Study workspace' }));
    heroCopy.appendChild(el('h1', { className: 'dashboard-hero-title', style: { color: certColor }, text: cert.name }));
    heroCopy.appendChild(el('p', { className: 'dashboard-hero-subtitle', text: answers.length ? 'Keep building your certification readiness.' : 'Ready to start your certification journey?' }));
    heroCopy.appendChild(el('p', { className: 'dashboard-hero-counts', text: compactNumber(chapterRows.length) + ' chapters · ' + compactNumber(questions.length) + ' questions · ' + compactNumber(cards.length) + ' flashcards · ' + compactNumber(labs.length) + ' labs' }));
    var heroActions = el('div', { className: 'dashboard-hero-actions' });
    heroActions.appendChild(el('button', { className: 'btn btn-primary', text: continueMode, onClick: continueAction }));
    heroActions.appendChild(el('button', { className: 'btn btn-ghost', text: 'View stats', onClick: function () { App.core.navigate('#/stats'); } }));
    heroCopy.appendChild(heroActions);
    hero.appendChild(heroCopy);

    var progressVisual = el('div', { className: 'dashboard-progress-visual' });
    var ring = el('div', { className: 'dashboard-progress-ring' });
    ring.appendChild(progressRing(overallProgress, 140, certColor));
    ring.appendChild(el('div', { className: 'dashboard-progress-value' }, [
      el('strong', { text: overallProgress + '%' }),
      el('span', { text: 'Certification progress' })
    ]));
    progressVisual.appendChild(ring);
    progressVisual.appendChild(el('div', { className: 'dashboard-progress-detail', text: questions.length ? compactNumber(Object.keys(seenQuestions).length) + ' of ' + compactNumber(questions.length) + ' questions explored' : 'Start studying to track progress' }));
    hero.appendChild(progressVisual);
    page.appendChild(hero);

    // High-value snapshot metrics. Empty values stay meaningful instead of showing a wall of zeroes.
    var metrics = el('section', { className: 'dashboard-metrics', 'aria-label': 'Study overview' });
    function metric(label, value, detail, route) {
      var node = el(route ? 'button' : 'div', {
        className: 'dashboard-metric' + (route ? ' dashboard-metric-action' : ''),
        type: route ? 'button' : undefined,
        onClick: route ? function () { App.core.navigate(route); } : undefined
      });
      node.appendChild(el('strong', { text: value }));
      node.appendChild(el('span', { className: 'dashboard-metric-label', text: label }));
      node.appendChild(el('small', { text: detail }));
      return node;
    }
    metrics.appendChild(metric('Quiz accuracy', answers.length ? stats.accuracy + '%' : '—', answers.length ? compactNumber(answers.length) + ' answers' : 'Not started', '#/stats'));
    metrics.appendChild(metric('Questions practiced', answers.length ? compactNumber(answers.length) : '—', answers.length ? compactNumber(Object.keys(seenQuestions).length) + ' unique explored' : 'Start a quiz', '#/quiz'));
    metrics.appendChild(metric('Flashcards reviewed', reviewedCardCount ? compactNumber(reviewedCardCount) : '—', reviews.length ? compactNumber(reviews.length) + ' review events' : 'No reviews yet', '#/flashcards'));
    metrics.appendChild(metric('Labs completed', labs.length ? compactNumber(completedLabs) + ' / ' + compactNumber(labs.length) : '—', labs.length ? 'Hands-on progress' : 'No labs loaded', '#/labs'));
    metrics.appendChild(metric('Study streak', activeStreak ? activeStreak + 'd' : '—', activeStreak ? 'Keep it going' : 'No streak yet', '#/stats'));
    page.appendChild(metrics);

    // Continue studying: the primary action remains visible as a dedicated command panel.
    var continuePanel = el('section', { className: 'dashboard-continue' });
    var continueHeader = el('div', { className: 'dashboard-section-header' });
    continueHeader.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'Next action' }), el('h2', { text: 'Continue studying' })]));
    continueHeader.appendChild(el('span', { className: 'dashboard-section-hint', text: continueRow ? continueRow.pct + '% chapter progress' : 'All chapters complete' }));
    continuePanel.appendChild(continueHeader);
    var continueBody = el('div', { className: 'dashboard-continue-body' });
    var continueText = el('div', { className: 'dashboard-continue-copy' });
    if (continueRow) {
      continueText.appendChild(el('div', { className: 'dashboard-chapter-number', style: { color: certColor }, text: continueRow.number }));
      continueText.appendChild(el('div', { className: 'dashboard-continue-title', html: inlineHtml(continueRow.title) }));
      continueText.appendChild(el('p', { className: 'text-muted', text: continueMeta }));
    } else {
      continueText.appendChild(el('div', { className: 'dashboard-continue-title', text: continueMode }));
      continueText.appendChild(el('p', { className: 'text-muted', text: continueMeta }));
    }
    continueBody.appendChild(continueText);
    var continueButtons = el('div', { className: 'dashboard-action-group' });
    continueButtons.appendChild(el('button', { className: 'btn btn-primary', text: continueMode, onClick: continueAction }));
    // Keep the Next action focused on the current ordered phase. The chapter
    // row below still offers direct reference buttons when a learner needs them.

    continueBody.appendChild(continueButtons);
    continuePanel.appendChild(continueBody);
    page.appendChild(continuePanel);

    // Chapter progress and weak areas form the main planning workspace. Show
    // the active chapter first, then two nearby chapters so the dashboard gives
    // useful context without turning into the full Stats chapter table.
    function coverageRows(limit) {
      var rows = [];
      if (continueRow) {
        rows.push(continueRow);
        var currentIndex = chapterRows.indexOf(continueRow);
        for (var next = currentIndex + 1; next < chapterRows.length && rows.length < limit; next++) rows.push(chapterRows[next]);
        for (var wrap = 0; wrap < chapterRows.length && rows.length < limit; wrap++) {
          if (chapterRows[wrap] !== continueRow && rows.indexOf(chapterRows[wrap]) < 0) rows.push(chapterRows[wrap]);
        }
      } else {
        rows = chapterRows.slice(0, limit);
      }
      return rows;
    }

    var visibleChapterRows = coverageRows(3);
    var coverageHint = visibleChapterRows.length
      ? (continueRow ? 'Current' + (visibleChapterRows.length > 1 ? ' + ' + (visibleChapterRows.length - 1) + ' more' : '') : 'Top ' + visibleChapterRows.length)
      : 'No chapters available';
    var planning = el('div', { className: 'dashboard-planning-grid' });
    var chapterSection = el('section', { className: 'dashboard-section dashboard-chapters' });
    var chapterHead = el('div', { className: 'dashboard-section-header' });
    chapterHead.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'Coverage' }), el('h2', { text: 'Chapter progress' })]));
    chapterHead.appendChild(el('span', { className: 'dashboard-section-hint', text: coverageHint }));
    chapterSection.appendChild(chapterHead);
    var chapterList = el('div', { className: 'dashboard-chapter-list' });
    visibleChapterRows.forEach(function (row) {
      var isCurrent = row === continueRow;
      var rowEl = el('article', { className: 'dashboard-chapter-row' + (isCurrent ? ' is-current' : '') });
      var titleWrap = el('div', { className: 'dashboard-chapter-heading' });
      titleWrap.appendChild(el('span', { className: 'dashboard-chapter-number', style: { color: certColor }, text: row.number }));
      titleWrap.appendChild(el('div', { className: 'dashboard-chapter-name' }, [el('strong', { html: inlineHtml(row.title) }), el('small', { text: (isCurrent ? 'Current · ' : '') + compactNumber(row.questions) + ' questions · ' + compactNumber(row.cards) + ' cards · ' + compactNumber(row.labs) + ' labs' })]));
      titleWrap.appendChild(el('span', { className: 'dashboard-chapter-percent', text: row.pct + '%' }));
      rowEl.appendChild(titleWrap);
      var track = el('div', { className: 'dashboard-chapter-track', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(row.pct), 'aria-label': row.title + ' progress' });
      track.appendChild(el('span', { style: { width: row.pct + '%', background: certColor } }));
      rowEl.appendChild(track);
      var rowActions = el('div', { className: 'dashboard-chapter-actions' });
      if (row.cards) rowActions.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'Flashcards', onClick: function () { launchChapter('flashcards', row.chapter); } }));
      if (row.questions) rowActions.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'Quiz', onClick: function () { launchChapter('quiz', row.chapter); } }));
      if (row.labs) rowActions.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'Labs', onClick: function () { launchChapter('labs', row.chapter); } }));
      rowEl.appendChild(rowActions);
      chapterList.appendChild(rowEl);
    });
    if (!visibleChapterRows.length) chapterList.appendChild(el('p', { className: 'text-muted', text: 'No chapters available yet. Add content and reload.' }));
    chapterSection.appendChild(chapterList);
    planning.appendChild(chapterSection);

    var focusSection = el('section', { className: 'dashboard-section dashboard-focus' });
    var focusHead = el('div', { className: 'dashboard-section-header' });
    focusHead.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'Personalized' }), el('h2', { text: 'Focus areas' })]));
    focusHead.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'Open stats', onClick: function () { App.core.navigate('#/stats'); } }));
    focusSection.appendChild(focusHead);
    var weakAreas = App.store.flashcardWeakAreas({ days: 7, cert: certId }).slice(0, 4);
    if (weakAreas.length) {
      weakAreas.forEach(function (area) {
        var item = el('div', { className: 'dashboard-focus-item' });
        item.appendChild(el('span', { className: 'dashboard-focus-dot', style: { background: certColor } }));
        var copy = el('div', { className: 'dashboard-focus-copy' });
        copy.appendChild(el('strong', { html: inlineHtml(area.tag) }));
        copy.appendChild(el('small', { text: (area.chapter || 'Certification-wide') + ' · ' + area.cards + ' card' + (area.cards === 1 ? '' : 's') + ' · ' + area.agains + ' Again' + (area.agains === 1 ? '' : 's') }));
        item.appendChild(copy);
        item.appendChild(el('button', { className: 'btn btn-secondary btn-xs', text: 'Review', onClick: function () {
          sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: resolveChapter('flashcards', area.chapter) || null }));
          App.core.navigate('#/flashcards');
        } }));
        focusSection.appendChild(item);
      });
    } else {
      focusSection.appendChild(el('div', { className: 'dashboard-empty-note' }, [
        el('strong', { text: answers.length ? 'No urgent weak areas' : 'Your focus areas will appear here' }),
        el('p', { className: 'text-muted', text: answers.length ? 'Keep practicing and ReviewApp will surface recent, repeated difficulties.' : 'Complete a quiz or review some cards to personalize your recommendations.' })
      ]));
    }
    planning.appendChild(focusSection);
    page.appendChild(planning);

    // Weekly recommendation and recent activity are deliberately compact: Dashboard is action-first, Stats is detail-first.
    var lower = el('div', { className: 'dashboard-lower-grid' });
    var recommendation = el('section', { className: 'dashboard-section dashboard-recommendation' });
    var recommendationHead = el('div', { className: 'dashboard-section-header' });
    recommendationHead.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'This week' }), el('h2', { text: 'Recommended for you' })]));
    recommendation.appendChild(recommendationHead);
    var weekly = App.store.weeklyReviewRecommendations(1, certId);
    if (weekly.length) {
      var top = weekly[0];
      recommendation.appendChild(el('h3', { text: 'Review ' + (top.chapter || 'your weak areas') }));
      recommendation.appendChild(el('p', { className: 'text-muted', text: 'You struggled with ' + top.tag + ' recently: ' + top.cards + ' card' + (top.cards === 1 ? '' : 's') + ', ' + top.agains + ' Again mark' + (top.agains === 1 ? '' : 's') + '.' }));
      recommendation.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Review now', onClick: function () {
        sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: resolveChapter('flashcards', top.chapter) || null }));
        App.core.navigate('#/flashcards');
      } }));
    } else {
      recommendation.appendChild(el('h3', { text: answers.length ? 'Keep building momentum' : 'Start your certification journey' }));
      recommendation.appendChild(el('p', { className: 'text-muted', text: answers.length ? 'Recent and repeated difficulties will become recommendations as you study.' : 'Begin with the first available chapter and your dashboard will learn what to recommend next.' }));
      recommendation.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: continueMode, onClick: continueAction }));
    }
    lower.appendChild(recommendation);

    var recentSection = el('section', { className: 'dashboard-section dashboard-recent' });
    var recentHead = el('div', { className: 'dashboard-section-header' });
    recentHead.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'History' }), el('h2', { text: 'Recent activity' })]));
    recentHead.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'View stats', onClick: function () { App.core.navigate('#/stats'); } }));
    recentSection.appendChild(recentHead);
    if (activityEvents.length) {
      activityEvents.slice(0, 6).forEach(function (event) {
        var eventRow = el('div', { className: 'dashboard-activity-item' });
        eventRow.appendChild(el('span', { className: 'dashboard-activity-type', text: activityLabel(event.type) }));
        eventRow.appendChild(el('span', { className: 'dashboard-activity-chapter', html: inlineHtml(event.chapter || 'Certification activity') }));
        eventRow.appendChild(el('span', { className: 'dashboard-activity-detail', html: inlineHtml(event.detail + ' · ' + relativeDate(event.ts)) }));
        recentSection.appendChild(eventRow);
      });
    } else {
      recentSection.appendChild(el('div', { className: 'dashboard-empty-note' }, [el('strong', { text: 'No activity yet' }), el('p', { className: 'text-muted', text: 'Your quizzes, card reviews, and completed labs will appear here.' })]));
    }
    lower.appendChild(recentSection);
    page.appendChild(lower);

    // Activity remains a compact consistency check, using quiz + card + lab events for this certification.
    var activitySection = el('section', { className: 'dashboard-section dashboard-activity-section' });
    var activityHead = el('div', { className: 'dashboard-section-header' });
    activityHead.appendChild(el('div', {}, [el('div', { className: 'dashboard-kicker', text: 'Consistency' }), el('h2', { text: 'Study activity' })]));
    activityHead.appendChild(el('span', { className: 'dashboard-section-hint', text: 'Last 14 days · ' + (activityEvents.length ? compactNumber(activityEvents.length) + ' logged events' : 'No activity yet') }));
    activitySection.appendChild(activityHead);
    var activity = App.store.getActivity(14, certId);
    activity.forEach(function (day) { day.study = day.count; day.cards = 0; day.labs = 0; });
    function dayEntry(ts) {
      var day = new Date(ts); day.setHours(0, 0, 0, 0);
      return activity.find(function (d) { return d.date === day.getTime(); });
    }
    reviews.forEach(function (r) { var d = dayEntry(r.ts || r.sessionTs); if (d) { d.cards++; d.study++; } });
    labs.forEach(function (lab) { if (doneLabs[lab._id]) { var d = dayEntry(doneLabs[lab._id]); if (d) { d.labs++; d.study++; } } });
    var maxStudy = Math.max.apply(null, activity.map(function (d) { return d.study; }).concat([1]));
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var activitySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    activitySvg.setAttribute('class', 'activity-chart dashboard-activity');
    activitySvg.setAttribute('viewBox', '0 0 560 74');
    activitySvg.setAttribute('preserveAspectRatio', 'none');
    activitySvg.setAttribute('role', 'img');
    activitySvg.setAttribute('aria-label', 'Study activity over the last 14 days');
    var barWidth = 560 / Math.max(1, activity.length);
    activity.forEach(function (day, i) {
      var height = day.study ? Math.max(4, (day.study / maxStudy) * 58) : 3;
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * barWidth + 4);
      rect.setAttribute('y', 66 - height);
      rect.setAttribute('width', Math.max(5, barWidth - 7));
      rect.setAttribute('height', height);
      rect.setAttribute('rx', '3');
      rect.setAttribute('fill', day.study ? (day.date === today.getTime() ? 'var(--accent-green)' : 'var(--accent-cyan)') : 'var(--border)');
      var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = utils.formatDate(day.date) + ' — ' + compactNumber(day.study) + ' activities (' + compactNumber(day.count) + ' quiz, ' + compactNumber(day.cards) + ' cards, ' + compactNumber(day.labs) + ' labs)';
      rect.appendChild(title);
      activitySvg.appendChild(rect);
    });
    activitySection.appendChild(activitySvg);
    var activityLabels = el('div', { className: 'activity-labels' });
    activity.forEach(function (day) { activityLabels.appendChild(el('span', { className: 'activity-label' + (day.date === today.getTime() ? ' today' : ''), text: weekdayOf(day.date).slice(0, 2), title: utils.formatDate(day.date) })); });
    activitySection.appendChild(activityLabels);
    page.appendChild(activitySection);

    var references = el('section', { className: 'dashboard-reference-grid' });
    var dayIdx = Math.floor(Date.now() / 86400000) % COMMANDS_OF_DAY.length;
    var command = COMMANDS_OF_DAY[dayIdx];
    references.appendChild(el('div', { className: 'dashboard-reference' }, [
      el('div', { className: 'dashboard-kicker', text: 'Global reference' }),
      el('strong', { text: 'Command of the day' }),
      el('code', { text: command.cmd }),
      el('small', { className: 'text-muted', html: inlineHtml(command.tip) })
    ]));
    var ports = App.tools && App.tools.getPorts ? App.tools.getPorts() : [];
    if (ports.length) {
      var port = ports[Math.floor(Date.now() / 86400000) % ports.length];
      references.appendChild(el('div', { className: 'dashboard-reference' }, [
        el('div', { className: 'dashboard-kicker', text: 'Global reference' }),
        el('strong', { text: 'Port of the day' }),
        el('code', { text: port.port + ' · ' + port.name }),
        el('small', { className: 'text-muted', html: inlineHtml(port.desc) })
      ]));
    }
    page.appendChild(references);
    root.appendChild(page);
  }

  function viewQuiz(root) {
    var cur = App.core.getCurrentCertId();

    // Direct launch from a certification chapter (Certifications → Chapter → Quiz).
    // An in-progress quiz is never resumed implicitly — the setup page shows a
    // Resume / Cancel panel for it, mirroring the flashcard flow.
    var pre = null;
    try { pre = JSON.parse(sessionStorage.getItem('reviewapp.quizSetup') || 'null'); } catch (e) {}
    if (pre && pre.mode === 'chapter' && pre.cert && pre.chapter) {
      sessionStorage.removeItem('reviewapp.quizSetup');
      if (pre.cert !== cur && !App.core.setCurrentCert(pre.cert, { silent: true })) { renderQuizSetup(root); return; }
      cur = App.core.getCurrentCertId();
      var pool = App.quiz.buildPool('chapter', { cert: pre.cert, chapter: pre.chapter });
      if (pool.length) {
        App.quiz.startQuiz({ mode: 'chapter', cert: pre.cert, questions: pool });
        renderQuizPlayer(root);
        return;
      }
      App.toast('No questions in this chapter', 'error');
    }
    renderQuizSetup(root);
  }

  function quizModeLabel(mode) {
    return { chapter: 'Chapter Focus', random: 'Random Mix', theme: 'Theme Attack', weak: 'Weak Spots', speed: 'Speed Run' }[mode] || mode;
  }

  function quizQuestionTypeLabel(type) {
    return {
      mcq: 'Single choice',
      multi: 'Multiple select',
      tf: 'True / false',
      fill: 'Fill in',
      match: 'Matching',
      command_match: 'Matching'
    }[type] || 'Question';
  }

  // Keyboard-shortcut reference panel, opened with ? from any question.
  function showShortcutsModal(mode) {
    var rows = mode === 'exam'
      ? [
        { keys: ['1–5'], desc: 'Select or deselect an option' },
        { keys: ['Enter', 'Space'], desc: 'Move to the next question (Space works outside text fields)' },
        { keys: ['Enter'], desc: 'Advance from a fill-in answer box' }
      ]
      : [
        { keys: ['1–5'], desc: 'Select or deselect an option (single-answer questions move the selection)' },
        { keys: ['Enter', 'Space'], desc: 'Submit your answer, then advance to the next question' },
        { keys: ['Enter'], desc: 'Submit the answer typed in a fill-in field' },
        { keys: ['Enter'], desc: 'Submit a matching question once every row is matched' }
      ];
    rows.push({ keys: ['?'], desc: 'Show this reference' });
    var body = el('div', { className: 'shortcuts-list' });
    rows.forEach(function (r) {
      body.appendChild(el('div', { className: 'shortcut-row' }, [
        el('span', { className: 'shortcut-desc', text: r.desc }),
        el('span', { className: 'shortcut-keys' }, r.keys.map(function (k) {
          return el('kbd', { className: 'shortcut-key', text: k });
        }))
      ]));
    });
    body.appendChild(el('p', { className: 'text-muted mt-2', style: { fontSize: '0.8rem' }, text: 'Press Escape to close.' }));
    App.core.openModal(body, { title: 'Keyboard shortcuts' });
  }

  function renderQuizSetup(root) {
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to start practicing.')); return; }
    root.appendChild(el('h1', { text: 'Quiz' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Five focused practice modes inside ' + cert.name + '. Pick one and start.' }));
    var activeSession = App.quiz.getQuizSession();
    if (activeSession && (!activeSession.cert || activeSession.cert === certId)) {
      var resumePanel = el('div', { className: 'quiz-resume-panel mb-3' });
      resumePanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Saved session' }));
      resumePanel.appendChild(el('p', { className: 'text-muted', text: quizModeLabel(activeSession.mode) + ' · ' + Math.max(0, activeSession.questions.length - activeSession.index) + ' questions remaining' }));
      var resumeRow = el('div', { className: 'flex gap-sm' });
      resumeRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Resume quiz', onClick: function () { root.innerHTML = ''; renderQuizPlayer(root); } }));
      resumeRow.appendChild(el('button', {
        className: 'btn btn-danger btn-sm', text: 'Cancel quiz',
        title: 'Discard this quiz — its progress will not count toward your statistics',
        onClick: function () {
          if (!confirm('Cancel this quiz? Its progress will not count toward your statistics.')) return;
          App.quiz.discardQuiz();
          root.innerHTML = '';
          renderQuizSetup(root);
        }
      }));
      resumePanel.appendChild(resumeRow);
      root.appendChild(resumePanel);
    }
    var modes = [
      { id: 'chapter', name: 'Chapter focus', desc: 'All questions from one chapter' },
      { id: 'random', name: 'Random mix', desc: 'N random questions from this certification' },
      { id: 'theme', name: 'Theme attack', desc: 'Filter by one or more tags' },
      { id: 'weak', name: 'Weak spots', desc: 'Accuracy < 60% or never seen' },
      { id: 'speed', name: 'Speed run', desc: '10 questions · 20s each' }
    ];
    var selectedMode = 'chapter';
    var modeRow = el('div', { className: 'tools-tabs mb-3' });
    modes.forEach(function (m) {
      var tab = el('button', {
        className: 'tool-tab' + (m.id === selectedMode ? ' active' : ''),
        text: m.name,
        onClick: function () {
          selectedMode = m.id;
          modeRow.querySelectorAll('.tool-tab').forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          renderOptions();
        }
      });
      modeRow.appendChild(tab);
    });
    root.appendChild(modeRow);
    var optsPanel = el('div', { className: 'panel mb-3' });
    root.appendChild(optsPanel);
    function renderOptions() {
      optsPanel.innerHTML = '';
      var mode = modes.find(function (m) { return m.id === selectedMode; });
      optsPanel.appendChild(el('p', { className: 'text-muted mb-2', text: mode.desc }));
      if (selectedMode === 'chapter') {
        var chSel = el('select', { className: 'form-control', id: 'qz-chapter' });
        var chs = App.content.getChapters(certId, 'questions');
        Object.keys(chs).sort().forEach(function (ch) {
          chSel.appendChild(el('option', { value: ch, text: ch + ' (' + chs[ch].length + ')' }));
        });
        optsPanel.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Chapter' }), chSel]));
      } else if (selectedMode === 'random') {
        var available = App.content.getByCert('questions', certId).length;
        optsPanel.appendChild(el('div', { className: 'form-group' }, [
          el('label', { text: 'Question count (max ' + available + ')' }),
          stepperField({ id: 'qz-count', value: String(Math.min(10, available || 10)), min: '1', max: String(available || 10) }).el
        ]));
      } else if (selectedMode === 'theme') {
        var tags = App.content.getTags('questions', certId);
        var tagWrap = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
        tags.forEach(function (t) {
          var lab = el('label', { className: 'chip chip-muted', style: { cursor: 'pointer' } });
          var cb = el('input', { type: 'checkbox', value: t, style: { marginRight: '4px' } });
          lab.appendChild(cb);
          lab.appendChild(document.createTextNode(t));
          tagWrap.appendChild(lab);
        });
        optsPanel.appendChild(el('div', { className: 'form-group' }, [
          el('label', { text: 'Tags' }), tagWrap.childNodes.length ? tagWrap : el('span', { className: 'text-muted', text: 'No tags found' })
        ]));
      } else if (selectedMode === 'speed') {
        optsPanel.appendChild(el('p', { text: '10 random questions from ' + cert.name + '. 20 seconds each. Streak counter on correct answers.' }));
      } else if (selectedMode === 'weak') {
        var weak = App.store.weakQuestions(60, certId);
        optsPanel.appendChild(el('p', { text: weak.length + ' weak or unseen questions available in ' + cert.name + '.' }));
      }
    }
    renderOptions();
    root.appendChild(el('button', {
      className: 'btn btn-primary btn-lg', text: 'Start Quiz',
      onClick: function () {
        var active = App.quiz.getQuizSession();
        if (active && !confirm('You have a quiz in progress. Starting a new quiz will discard it (it will not count toward your statistics). Continue?')) return;
        var opts = { cert: certId };
        if (selectedMode === 'chapter') {
          opts.chapter = ($('#qz-chapter') || {}).value;
        } else if (selectedMode === 'random') {
          opts.count = parseInt(($('#qz-count') || {}).value, 10) || 10;
        } else if (selectedMode === 'theme') {
          opts.tags = [];
          optsPanel.querySelectorAll('input[type=checkbox]:checked').forEach(function (cb) { opts.tags.push(cb.value); });
        }
        var pool = App.quiz.buildPool(selectedMode, opts);
        var cfg = { mode: selectedMode, cert: certId, questions: pool, count: opts.count };
        if (selectedMode === 'speed') { cfg.count = 10; cfg.speedLimit = 20; }
        if (!App.quiz.startQuiz(cfg)) return;
        root.innerHTML = '';
        renderQuizPlayer(root);
      }
    }));
  }

  function appendQuestionReview(parent, q) {
    parent.appendChild(el('div', { style: { fontWeight: '600' }, html: App.markdown.renderInline(q.q || '') }));
    if (isMatchQuestion(q) && Array.isArray(q.pairs)) {
      var list = el('div', { className: 'match-answer mt-1' });
      q.pairs.forEach(function (p) {
        list.appendChild(el('div', { className: 'match-answer-row' }, [
          el('span', { className: 'match-item', html: inlineHtml(matchItem(p)) }),
          el('span', { className: 'text-muted', html: inlineHtml('→ ' + matchCounterpart(p)) })
        ]));
      });
      parent.appendChild(list);
    }
    parent.appendChild(el('div', { className: 'explain-panel mt-1', html: App.markdown.renderInline(q.explain || '') }));
  }

  function renderQuizPlayer(root) {
    var sess = App.quiz.getQuizSession();
    if (!sess) { renderQuizSetup(root); return; }
    // Back preserves the in-progress quiz (answers are not logged until the
    // quiz is completed) so it can be resumed or cancelled from the setup page.
    practiceBack(root, '#/quiz', 'Back');
    var q = App.quiz.currentQ();
    var answered = false;
    var modeLabel = quizModeLabel(sess.mode);
    if (q._cert || q._chapter) {
      root.appendChild(makeContextHeader(q._cert, q._chapter, 'Quiz · ' + modeLabel));
    }
    var total = Number.isInteger(sess.originalTotal) ? sess.originalTotal : sess.questions.length;
    var retrying = sess.index >= total;
    var retryCount = sess.questions.length - total;
    var header = el('div', { className: 'quiz-progress' });
    header.appendChild(el('span', { className: 'mono text-muted', text: retrying
      ? 'Review · ' + (sess.index - total + 1) + ' / ' + retryCount
      : (sess.index + 1) + ' / ' + total }));
    var bar = el('div', { className: 'progress-bar' });
    bar.appendChild(el('div', { className: 'progress-fill', style: { width: (retrying ? 100 : ((sess.index) / total * 100)) + '%' } }));
    header.appendChild(bar);
    if (retrying) {
      header.appendChild(el('span', { className: 'chip chip-amber', text: 'Missed · review' }));
    } else if (retryCount > 0) {
      header.appendChild(el('span', { className: 'chip chip-amber', text: retryCount + ' to retry' }));
    }
    var timerEl = null;
    if (sess.speedLimit) {
      timerEl = el('span', { className: 'exam-timer', text: sess.speedLimit + 's' });
      header.appendChild(timerEl);
    }
    root.appendChild(header);
    var card = el('div', { className: 'question-card' });
    card.appendChild(el('div', { className: 'question-title-row' }, [
      el('div', { className: 'question-text', html: App.markdown.renderInline(q.q || '') }),
      el('span', {
        className: 'chip chip-muted question-type-chip',
        text: quizQuestionTypeLabel(q.type),
        'aria-label': 'Question type: ' + quizQuestionTypeLabel(q.type)
      })
    ]));
    var optsWrap = el('div', { className: 'options-list' });
    var selectedMulti = {};
    var selectedIdx = null; // single-answer selection (mcq / tf)
    var matchUI = null;
    var fillInput = null; // the fill-in answer box, focused on entry
    function focusFillInput() {
      if (fillInput) fillInput.focus();
    }
    function doSubmit(ua) {
      if (answered) return;
      answered = true;
      if (sess.speedTimer) { clearInterval(sess.speedTimer); sess.speedTimer = null; }
      var result = App.quiz.submitAnswer(ua);
      optsWrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; b.classList.remove('selected'); });
      if (q.type === 'mcq') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
          if (i === q._correctShuffled) b.classList.add('correct');
          else if (i === ua && !result.correct) b.classList.add('wrong');
        });
      } else if (q.type === 'tf') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b) {
          var isTrue = b.getAttribute('data-val') === 'true';
          if (isTrue === q.answer) b.classList.add('correct');
          else if (((ua === true && isTrue) || (ua === false && !isTrue)) && !result.correct) b.classList.add('wrong');
        });
      } else if (q.type === 'multi') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
          var isCorrectOption = (q._correctShuffled || []).indexOf(i) >= 0;
          var isSelected = !!selectedMulti[i];
          // Green = correct choices the learner made, amber = correct choices
          // they missed, red = wrong choices they selected.
          if (isCorrectOption && isSelected) b.classList.add('correct');
          else if (isCorrectOption) b.classList.add('missed');
          else if (isSelected) b.classList.add('wrong');
        });
      } else if (isMatchQuestion(q) && matchUI) {
        matchUI.lock();
      }
      // role=status announces the verdict and explanation to screen readers
      // as soon as the answer is submitted.
      card.appendChild(el('div', { className: 'explain-panel', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' }, [
        el('span', { className: 'feedback-status ' + (result.correct ? 'feedback-correct' : 'feedback-incorrect') }, [
          el('span', { className: 'feedback-icon', text: result.correct ? '✓' : '✗' }),
          el('span', { className: 'feedback-label', text: result.correct ? 'Correct' : 'Incorrect' })
        ]),
        el('span', { html: App.markdown.renderInline(q.explain || '') })
      ]));
      actions.innerHTML = '';
      actions.appendChild(el('button', {
        className: 'btn btn-primary', id: 'qz-next',
        text: sess.index < sess.questions.length - 1 ? 'Next →' : 'See Results',
        onClick: goNext
      }));
    }
    function goNext() {
      if (App.quiz.nextQuestion()) { root.innerHTML = ''; renderQuizPlayer(root); }
      else { var result = App.quiz.endQuiz(); root.innerHTML = ''; renderQuizResults(root, result); }
    }
    // Keyboard interaction: 1-5 toggles option selection, Enter/Space submits
    // the current answer and advances to the next question (see onKey).
    function toggleOption(i) {
      if (answered) return;
      if (q.type === 'multi') selectedMulti[i] = !selectedMulti[i];
      else selectedIdx = (selectedIdx === i) ? null : i;
      applyOptionVisuals();
    }
    function applyOptionVisuals() {
      optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
        var sel = q.type === 'multi' ? !!selectedMulti[i] : selectedIdx === i;
        b.classList.toggle('selected', sel);
      });
    }
    function isTypingTarget(e) {
      var t = e.target;
      return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
    }
    function submitCurrent() {
      if (answered || q._invalid) return;
      if (q.type === 'mcq' || q.type === 'tf') {
        if (selectedIdx == null) { App.toast('Select an answer first', 'error'); return; }
        doSubmit(q.type === 'tf' ? selectedIdx === 0 : selectedIdx);
      } else if (q.type === 'multi') {
        var ua = Object.keys(selectedMulti).filter(function (k) { return selectedMulti[k]; }).map(Number);
        if (!ua.length) { App.toast('Select at least one answer', 'error'); return; }
        doSubmit(ua);
      } else if (q.type === 'fill') {
        doSubmit(($('#qz-fill') || {}).value);
      } else if (isMatchQuestion(q) && matchUI) {
        var arr = matchUI.read();
        if (arr.some(function (v) { return v == null; })) { App.toast('Match every item before submitting', 'error'); return; }
        doSubmit(arr);
      }
    }
    if (q._invalid) {
      optsWrap.appendChild(emptyState('Question unavailable', q._invalidReason || 'This question has invalid answer data and was not shown.'));
    } else if (q.type === 'mcq') {
      // Click submits immediately (single-answer). The keyboard still
      // selects/toggles with 1-5 and submits with Enter/Space.
      q._shuffledOptions.forEach(function (opt, i) {
        optsWrap.appendChild(el('button', { className: 'option-btn', onClick: function () { doSubmit(i); } }, [
          el('span', { className: 'option-key', text: String(i + 1) }),
          el('span', { html: choiceHtml(opt.text) })
        ]));
      });
    } else if (q.type === 'tf') {
      [true, false].forEach(function (v, i) {
        optsWrap.appendChild(el('button', {
          className: 'option-btn', 'data-val': String(v), onClick: function () { doSubmit(v); }
        }, [
          el('span', { className: 'option-key', text: String(i + 1) }),
          el('span', { text: v ? 'True' : 'False' })
        ]));
      });
    } else if (q.type === 'multi') {
      q._shuffledOptions.forEach(function (opt, i) {
        optsWrap.appendChild(el('button', {
          className: 'option-btn',
          onClick: function () { toggleOption(i); }
        }, [
          el('span', { className: 'option-key', text: String(i + 1) }),
          el('span', { html: choiceHtml(opt.text) })
        ]));
      });
    } else if (q.type === 'fill') {
      fillInput = el('input', {
        className: 'form-control', type: 'text', id: 'qz-fill', placeholder: 'Type answer…', 'aria-label': 'Your answer', autocomplete: 'off',
        onKeydown: function (e) {
          if (e.key !== 'Enter') return;
          // Consume the event: the input handler shares `answered` with the
          // document-level onKey, so without stopping propagation a single
          // Enter would both submit and advance in one keystroke.
          e.preventDefault();
          e.stopPropagation();
          if (answered) goNext();
          else submitCurrent();
        }
      });
      optsWrap.appendChild(fillInput);
    } else if (isMatchQuestion(q)) {
      if (q._invalid) {
        optsWrap.appendChild(emptyState('Question unavailable', 'This matching question is missing required data (pairs or a valid counterpart on each side).'));
      } else {
        matchUI = App.quiz.renderMatchUI(optsWrap, q, {
          submitLabel: 'Submit',
          onSubmit: function (arr) { doSubmit(arr); }
        });
      }
    }
    card.appendChild(optsWrap);
    root.appendChild(card);
    // Fill-in questions focus the answer box on entry so the user can type
    // directly without clicking. Focus happens after the card is in the DOM
    // (a pre-attachment focus() is a silent no-op in most browsers).
    focusFillInput();
    var actions = el('div', { className: 'flex gap-sm mt-2' });
    if (!q._invalid && (q.type === 'mcq' || q.type === 'tf' || q.type === 'multi' || q.type === 'fill')) {
      actions.appendChild(el('button', { className: 'btn btn-primary', text: 'Submit', onClick: submitCurrent }));
    }
    actions.appendChild(el('button', {
      className: 'btn btn-ghost', text: 'Skip',
      onClick: function () {
        if (answered) return;
        answered = true;
        if (sess.speedTimer) clearInterval(sess.speedTimer);
        App.quiz.skipQuestion();
        root.innerHTML = '';
        if (App.quiz.getQuizSession()) renderQuizPlayer(root);
        else renderQuizResults(root, App.quiz.endQuiz());
      }
    }));
    root.appendChild(actions);
    function onKey(e) {
      // Self-cleaning guard: if this listener belongs to a render whose card
      // has left the DOM (e.g. a double-pressed Enter raced a re-render), drop
      // it instead of acting on a question that is no longer visible.
      if (!root.contains(card)) { document.removeEventListener('keydown', onKey); return; }
      var modalRoot = document.getElementById('modal-root');
      if (modalRoot && !modalRoot.hidden) return; // shortcuts panel is open
      var key = e.key;
      if (key === '?' || (key === '/' && e.shiftKey)) {
        if (isTypingTarget(e)) return; // let ? type normally in answer fields
        e.preventDefault();
        showShortcutsModal('quiz');
        return;
      }
      if (answered) {
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') { e.preventDefault(); goNext(); }
        return;
      }
      var num = parseInt(key, 10);
      if (num >= 1 && num <= 5) {
        var idx = num - 1;
        if (q.type === 'mcq' || q.type === 'multi') {
          if (idx < q._shuffledOptions.length) toggleOption(idx);
        } else if (q.type === 'tf' && idx < 2) {
          toggleOption(idx);
        }
        return;
      }
      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        if (isTypingTarget(e)) return; // let inputs/selects handle their own keys
        e.preventDefault();
        submitCurrent();
      }
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () {
      var obs = new MutationObserver(function () {
        if (!root.contains(card)) { document.removeEventListener('keydown', onKey); obs.disconnect(); }
      });
      obs.observe(root, { childList: true });
    }, 50);
    if (sess.speedLimit) {
      if (sess.speedRemaining == null || sess.speedRemaining <= 0) sess.speedRemaining = sess.speedLimit;
      sess.speedTimer = setInterval(function () {
        sess.speedRemaining--;
        if (App.store.saveQuizSession) App.store.saveQuizSession(sess);
        if (timerEl) timerEl.textContent = sess.speedRemaining + 's';
        if (sess.speedRemaining <= 0) {
          clearInterval(sess.speedTimer);
          if (!answered) {
            answered = true;
            App.quiz.skipQuestion();
            root.innerHTML = '';
            if (App.quiz.getQuizSession()) renderQuizPlayer(root);
            else renderQuizResults(root, App.quiz.endQuiz());
          }
        }
      }, 1000);
    }
  }

  function renderQuizResults(root, result) {
    if (!result) { renderQuizSetup(root); return; }
    practiceBack(root, '#/quiz', 'Back');
    root.appendChild(el('h1', { text: 'Quiz Results' }));
    var scoreColor = result.score >= 70 ? 'text-green' : result.score >= 50 ? 'text-amber' : 'text-red';
    root.appendChild(el('div', { className: 'stat-grid' }, [
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value ' + scoreColor, text: result.score + '%' }), el('div', { className: 'stat-label', text: 'Score' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: result.correct + '/' + result.total }), el('div', { className: 'stat-label', text: 'Correct' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: utils.formatTime(Math.round(result.timeMs / 1000)) }), el('div', { className: 'stat-label', text: 'Time' })])
    ]));
    if (result.tagBreakdown && result.tagBreakdown.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'By tag' }));
      result.tagBreakdown.forEach(function (t) {
        var row = el('div', { className: 'bar-row' });
        row.appendChild(el('div', { className: 'bar-label', text: t.tag }));
        var track = el('div', { className: 'bar-track' });
        track.appendChild(el('div', { className: 'bar-fill', style: { width: t.pct + '%' } }));
        row.appendChild(track);
        row.appendChild(el('div', { className: 'bar-value', text: t.pct + '%' }));
        root.appendChild(row);
      });
    }
    var missed = result.answers.filter(function (a) { return !a.correct; });
    if (missed.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Review missed' }));
      missed.forEach(function (a) {
        var p = el('div', { className: 'panel mb-1' });
        appendQuestionReview(p, a.question);
        root.appendChild(p);
      });
    }
    root.appendChild(el('div', { className: 'flex gap-sm mt-3' }, [
      el('button', { className: 'btn btn-primary', text: 'New Quiz', onClick: function () { App.core.navigate('#/quiz'); } }),
      el('button', { className: 'btn btn-secondary', text: 'Quiz menu', onClick: function () { App.core.navigate('#/quiz'); } })
    ]));
  }

  function viewExam(root) {
    var cur = App.core.getCurrentCertId();
    var sess = App.quiz.getExamSession();
    // Resume only exams that belong to the active certification.
    if (sess && !sess.submitted && (!sess.cert || sess.cert === cur)) { renderExamPlayer(root); return; }
    renderExamSetup(root);
  }

  function renderExamSetup(root) {
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to start an exam.')); return; }
    root.appendChild(el('h1', { text: 'Exam Simulation' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'CompTIA-style timed exam for ' + cert.name + '. No feedback until you submit.' }));
    var available = App.content.getByCert('questions', certId).length;
    if (!available) { root.appendChild(emptyState('No questions', 'This certification has no exam questions yet.')); return; }
    var panel = el('div', { className: 'panel' });
    panel.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap', alignItems: 'center' } }, [
      el('span', { className: 'chip chip-muted', style: { color: cert.color, borderColor: 'currentColor' }, text: cert.name }),
      el('span', { className: 'text-muted', text: available + ' questions available' })
    ]));
    var countField = stepperField({ id: 'ex-count', min: '1' });
    var countInput = countField.input;
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [
      el('label', { for: 'ex-count', text: 'Question count' }),
      countField.el
    ]));
    function applyExamMax() {
      countInput.setAttribute('max', String(available));
      countInput.setAttribute('min', String(Math.min(5, available)));
      countInput.value = String(available); // default to the cert's maximum
    }
    applyExamMax();
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [
      el('label', { for: 'ex-time', text: 'Time limit (minutes, blank = auto)' }),
      el('input', { className: 'form-control', type: 'number', id: 'ex-time', value: '', min: '5', placeholder: 'Auto (75s × count)' })
    ]));
    root.appendChild(panel);
    root.appendChild(el('button', {
      className: 'btn btn-primary btn-lg mt-2', text: 'Begin Exam',
      onClick: function () {
        var count = Math.min(parseInt(($('#ex-count') || {}).value, 10) || available, available);
        var timeMin = parseInt(($('#ex-time') || {}).value, 10);
        var timeLimit = timeMin ? timeMin * 60 : count * 75;
        if (!App.quiz.startExam({ cert: certId, count: count, timeLimit: timeLimit })) return;
        root.innerHTML = '';
        renderExamPlayer(root);
      }
    }));
  }

  function renderExamPlayer(root) {
    var sess = App.quiz.getExamSession();
    if (!sess) { renderExamSetup(root); return; }
    practiceBack(root, '#/exam', 'Back', function () {
      if (App.quiz.discardExam) App.quiz.discardExam();
    });
    var layout = el('div', { className: 'exam-layout' });
    var main = el('div');
    var side = el('div', { className: 'panel' });
    var timerEl = el('div', { className: 'exam-timer mb-2', text: utils.formatTime(sess.remaining) });
    side.appendChild(timerEl);
    side.appendChild(el('div', { className: 'label-upper mb-1', text: 'Question palette' }));
    var palette = el('div', { className: 'palette-grid mb-2' });
    sess.questions.forEach(function (_, i) {
      palette.appendChild(el('button', {
        className: 'palette-cell' + (i === sess.index ? ' current' : '') +
          (sess.answers[i] !== undefined ? ' answered' : '') + (sess.flagged[i] ? ' flagged' : ''),
        text: String(i + 1),
        onClick: function () { sess.index = i; root.innerHTML = ''; renderExamPlayer(root); }
      }));
    });
    side.appendChild(palette);
    side.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm mb-1', style: { width: '100%' },
      text: sess.flagged[sess.index] ? 'Unflag' : 'Flag for review',
      onClick: function () { App.quiz.examFlag(sess.index); root.innerHTML = ''; renderExamPlayer(root); }
    }));
    side.appendChild(el('button', {
      className: 'btn btn-danger btn-sm', style: { width: '100%' }, text: 'Submit Exam',
      onClick: function () {
        if (!confirm('Submit exam? You cannot change answers after.')) return;
        var full = App.quiz.submitExam();
        root.innerHTML = '';
        renderExamResults(root, full);
      }
    }));
    var q = sess.questions[sess.index];
    var card = el('div', { className: 'question-card' });
    card.appendChild(el('div', { className: 'label-upper mb-1', text: 'Question ' + (sess.index + 1) + ' of ' + sess.questions.length }));
    card.appendChild(el('div', { className: 'question-text', html: App.markdown.renderInline(q.q || '') }));
    var optsWrap = el('div', { className: 'options-list' });
    // Keyboard interaction mirrors the quiz player: 1-5 toggles option
    // selection; Enter/Space moves to the next question (see onKey).
    function selectOption(i) {
      if (q.type === 'mcq') {
        App.quiz.examAnswer(sess.index, sess.answers[sess.index] === i ? undefined : i);
      } else if (q.type === 'tf') {
        var v = i === 0;
        App.quiz.examAnswer(sess.index, sess.answers[sess.index] === v ? undefined : v);
      } else if (q.type === 'multi') {
        var arr = (sess.answers[sess.index] || []).slice();
        if (!Array.isArray(arr)) arr = [];
        var idx = arr.indexOf(i);
        if (idx >= 0) arr.splice(idx, 1); else arr.push(i);
        App.quiz.examAnswer(sess.index, arr);
      }
      root.innerHTML = '';
      renderExamPlayer(root);
    }
    if (q.type === 'mcq') {
      // Click selects the answer (no deselect on re-click); the keyboard
      // toggles with 1-5 and Enter/Space moves to the next question.
      q._shuffledOptions.forEach(function (opt, i) {
        var selected = sess.answers[sess.index] === i;
        optsWrap.appendChild(el('button', {
          className: 'option-btn' + (selected ? ' selected' : ''),
          onClick: function () { App.quiz.examAnswer(sess.index, i); root.innerHTML = ''; renderExamPlayer(root); }
        }, [el('span', { className: 'option-key', text: String(i + 1) }), el('span', { html: choiceHtml(opt.text) })]));
      });
    } else if (q.type === 'tf') {
      [true, false].forEach(function (v, i) {
        var selected = sess.answers[sess.index] === v;
        optsWrap.appendChild(el('button', {
          className: 'option-btn' + (selected ? ' selected' : ''),
          onClick: function () { App.quiz.examAnswer(sess.index, v); root.innerHTML = ''; renderExamPlayer(root); }
        }, [el('span', { className: 'option-key', text: String(i + 1) }), el('span', { text: v ? 'True' : 'False' })]));
      });
    } else if (q.type === 'fill') {
      optsWrap.appendChild(el('input', {
        className: 'form-control', type: 'text', value: sess.answers[sess.index] || '',
        placeholder: 'Type answer…', 'aria-label': 'Your answer',
        onInput: function (e) { App.quiz.examAnswer(sess.index, e.target.value); },
        onKeydown: function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (sess.index < sess.questions.length - 1) { sess.index++; root.innerHTML = ''; renderExamPlayer(root); }
          }
        }
      }));
    } else if (q.type === 'multi') {
      var cur = sess.answers[sess.index] || [];
      if (!Array.isArray(cur)) cur = [];
      q._shuffledOptions.forEach(function (opt, i) {
        var selected = cur.indexOf(i) >= 0;
        optsWrap.appendChild(el('button', {
          className: 'option-btn' + (selected ? ' selected' : ''),
          onClick: function () { selectOption(i); }
        }, [el('span', { className: 'option-key', text: String(i + 1) }), el('span', { html: choiceHtml(opt.text) })]));
      });
    } else if (isMatchQuestion(q)) {
      if (q._invalid) {
        optsWrap.appendChild(emptyState('Question unavailable', 'This matching question is missing required data (pairs or a valid counterpart on each side).'));
      } else {
        var curMatch = sess.answers[sess.index];
        if (!Array.isArray(curMatch)) curMatch = null;
        App.quiz.renderMatchUI(optsWrap, q, {
          initial: curMatch,
          onChange: function (arr) {
            App.quiz.examAnswer(sess.index, arr);
            var cell = palette.querySelectorAll('.palette-cell')[sess.index];
            if (cell) cell.classList.add('answered');
          }
        });
      }
    }
    card.appendChild(optsWrap);
    var nav = el('div', { className: 'flex-between mt-2' });
    nav.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: '← Prev',
      disabled: sess.index === 0 ? 'disabled' : null,
      onClick: function () { if (sess.index > 0) { sess.index--; root.innerHTML = ''; renderExamPlayer(root); } }
    }));
    nav.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'Next →',
      disabled: sess.index >= sess.questions.length - 1 ? 'disabled' : null,
      onClick: function () { if (sess.index < sess.questions.length - 1) { sess.index++; root.innerHTML = ''; renderExamPlayer(root); } }
    }));
    card.appendChild(nav);
    main.appendChild(card);
    layout.appendChild(main);
    layout.appendChild(side);
    root.appendChild(layout);
    function onKey(e) {
      // Self-cleaning guard: drop listeners whose render has left the DOM so a
      // rapid keypress can't act on (or advance) a question that is no longer
      // visible.
      if (!root.contains(card)) { document.removeEventListener('keydown', onKey); return; }
      var modalRoot = document.getElementById('modal-root');
      if (modalRoot && !modalRoot.hidden) return; // shortcuts panel is open
      var key = e.key;
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
      if (key === '?' || (key === '/' && e.shiftKey)) {
        if (typing) return; // let ? type normally in answer fields
        e.preventDefault();
        showShortcutsModal('exam');
        return;
      }
      var num = parseInt(key, 10);
      if (num >= 1 && num <= 5) {
        var idx = num - 1;
        if (q.type === 'mcq' || q.type === 'multi') {
          if (idx < q._shuffledOptions.length) selectOption(idx);
        } else if (q.type === 'tf' && idx < 2) {
          selectOption(idx);
        }
        return;
      }
      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        if (typing) return;
        e.preventDefault();
        if (sess.index < sess.questions.length - 1) { sess.index++; root.innerHTML = ''; renderExamPlayer(root); }
      }
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () {
      var obs = new MutationObserver(function () {
        if (!root.contains(card)) { document.removeEventListener('keydown', onKey); obs.disconnect(); }
      });
      obs.observe(root, { childList: true });
    }, 50);
    if (sess.timer) clearInterval(sess.timer);
    sess.timer = setInterval(function () {
      sess.remaining--;
      if (App.store.saveExamSession) App.store.saveExamSession(sess);
      if (timerEl) {
        timerEl.textContent = utils.formatTime(Math.max(0, sess.remaining));
        if (sess.remaining <= 300) timerEl.classList.add('warning');
      }
      if (sess.remaining <= 0) {
        clearInterval(sess.timer);
        App.toast('Time is up — submitting exam', 'info');
        var full = App.quiz.submitExam();
        root.innerHTML = '';
        renderExamResults(root, full);
      }
    }, 1000);
  }

  function renderExamResults(root, full) {
    if (!full) { renderExamSetup(root); return; }
    practiceBack(root, '#/exam', 'Back');
    var a = full.attempt;
    root.appendChild(el('h1', { text: 'Exam Results' }));
    root.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { alignItems: 'center' } }, [
      el('span', { className: 'stat-value', style: { fontSize: '2rem' }, text: a.score + '%' }),
      el('span', { className: 'chip ' + (a.passed ? 'chip-green' : 'chip-red'), text: a.passed ? 'PASS' : 'FAIL' }),
      el('span', { className: 'text-muted', text: '(threshold ' + a.threshold + '%)' })
    ]));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: a.correct + ' / ' + a.total + ' correct · ' + utils.formatTime(Math.round(a.timeMs / 1000)) }));
    if (full.tagBreakdown.length) {
      root.appendChild(el('h3', { className: 'mb-1', text: 'Tag breakdown' }));
      full.tagBreakdown.forEach(function (t) {
        var row = el('div', { className: 'bar-row' });
        row.appendChild(el('div', { className: 'bar-label', text: t.tag }));
        var track = el('div', { className: 'bar-track' });
        track.appendChild(el('div', { className: 'bar-fill', style: { width: t.pct + '%' } }));
        row.appendChild(track);
        row.appendChild(el('div', { className: 'bar-value', text: t.pct + '%' }));
        root.appendChild(row);
      });
    }
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Full review' }));
    full.results.forEach(function (r, i) {
      var p = el('div', { className: 'panel mb-1' });
      p.appendChild(el('div', { className: 'flex-between' }, [
        el('span', { className: 'label-upper', text: 'Q' + (i + 1) }),
        el('span', { className: 'chip ' + (r.correct ? 'chip-green' : 'chip-red'), text: r.correct ? 'Correct' : 'Wrong' })
      ]));
      appendQuestionReview(p, r.question);
      root.appendChild(p);
    });
  }

  function viewFlashcards(root) {
    var cur = App.core.getCurrentCertId();
    var pre = null;
    try { pre = JSON.parse(sessionStorage.getItem('reviewapp.fcSetup') || 'null'); } catch (e) {}

    // Direct chapter launches take priority over any saved session. This is
    // what prevents an old Chapter 2 session from swallowing a new chapter
    // launch from the Dashboard.
    if (pre && (pre.cert || pre.chapter)) {
      sessionStorage.removeItem('reviewapp.fcSetup');
      if (pre.cert && pre.cert !== cur && !App.core.setCurrentCert(pre.cert, { silent: true })) { renderFlashSetup(root); return; }
      cur = App.core.getCurrentCertId();
      var ch = pre.chapter
        ? (App.content.findChapter ? App.content.findChapter(cur, 'flashcards', pre.chapter) : pre.chapter)
        : null;
      var deck = App.flashcards.buildDeck({ cert: cur, chapter: ch });
      if (deck.length) {
        App.flashcards.startSession(deck, { chapter: ch });
        renderFlashPlayer(root);
        return;
      }
      App.toast('No cards in this chapter', 'error');
    }

    // Generic navigation always opens the menu. The saved session remains
    // available there through the explicit Resume saved session button.
    renderFlashSetup(root);
  }

  function renderFlashSetup(root) {
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    root.appendChild(el('h1', { text: 'Flashcards' }));
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to review cards.')); return; }
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Choose a chapter, then mark Again to retry a card later or Next to move on · spaced repetition' }));
    var savedSession = App.flashcards.getSession();
    if (savedSession && (!savedSession.cert || savedSession.cert === certId) && !savedSession.finished) {
      var resumePanel = el('div', { className: 'flash-resume-panel mb-3' });
      resumePanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Saved session' }));
      resumePanel.appendChild(el('p', { className: 'text-muted', html: inlineHtml((savedSession.scope === 'all' || !savedSession.chapter ? 'All content' : savedSession.chapter) + ' · ' + Math.max(0, savedSession.totalCards - savedSession.completed) + ' cards remaining') }));
      var resumeRow = el('div', { className: 'flex gap-sm' });
      resumeRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Resume saved session', onClick: function () { root.innerHTML = ''; renderFlashPlayer(root); } }));
      resumeRow.appendChild(el('button', {
        className: 'btn btn-danger btn-sm', text: 'Cancel session',
        title: 'Discard this session — its progress will not count toward your statistics',
        onClick: function () {
          if (!confirm('Cancel this session? Its progress will not count toward your statistics.')) return;
          App.flashcards.cancelSession();
          root.innerHTML = '';
          renderFlashSetup(root);
        }
      }));
      resumePanel.appendChild(resumeRow);
      root.appendChild(resumePanel);
    }
    var pending = App.flashcards.consumePendingCard();
    var chs = App.content.getChapters(certId, 'flashcards');
    var chKeys = Object.keys(chs);
    var totalCards = App.content.getByCert('flashcards', certId).length;

    var panel = el('div', { className: 'panel mb-3' });
    panel.appendChild(el('div', { className: 'label-upper mb-2', text: 'Select chapter' }));

    var picker = el('div', { className: 'fc-chapter-picker' });

    function startChapter(value) {
      var active = App.flashcards.getSession();
      if (active && !active.finished && !confirm('You have a saved session in progress. Starting a new session will discard it (it will not count toward your statistics). Continue?')) return;
      var chapter = value || null;
      var deck = App.flashcards.buildDeck({ cert: certId, chapter: chapter });
      if (!App.flashcards.startSession(deck, { startCard: pending, chapter: chapter })) return;
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function addOption(value, label, count) {
      var btn = el('button', {
        className: 'fc-chapter-option',
        type: 'button',
        'aria-label': 'Start ' + label + ' flashcards'
      }, [
        el('span', { className: 'fc-chapter-option-name', html: inlineHtml(label) }),
        el('span', { className: 'chip chip-muted', text: count + ' card' + (count === 1 ? '' : 's') })
      ]);
      btn.addEventListener('click', function () { startChapter(value); });
      picker.appendChild(btn);
    }
    addOption('', 'All content', totalCards);
    chKeys.forEach(function (ch) { addOption(ch, ch, chs[ch].length); });
    panel.appendChild(picker);
    root.appendChild(panel);

    root.appendChild(el('p', { className: 'mb-2', html: '<span class="chip chip-amber">' + App.store.cardsDueCount(certId) + ' cards due</span><span class="text-muted fc-start-hint"> Select a chapter to start immediately.</span>' }));
    if (pending) {
      setTimeout(function () {
        var card = pending;
        var chapter = card._chapter || null;
        var deck = App.flashcards.buildDeck({ cert: card._cert || certId, chapter: chapter });
        App.flashcards.startSession(deck, { startCard: card, chapter: chapter });
        root.innerHTML = '';
        renderFlashPlayer(root);
      }, 50);
    }
  }

  function renderFlashPlayer(root) {
    var sess = App.flashcards.getSession();
    if (!sess) { renderFlashSetup(root); return; }
    var card = App.flashcards.currentCard();
    if (!card) { renderFlashSummary(root); return; }
    practiceBack(root, '#/flashcards', 'Back');
    var st = App.store.getCardState(App.flashcards.cardKey(card));
    var donePct = sess.totalCards ? Math.round((sess.completed / sess.totalCards) * 100) : 0;
    var retryCount = sess.retry.length;

    // View-only peek: while a previous card is on screen the live session is
    // untouched (no grading, no scheduling). The peeked card shows its front
    // face first, like seeing the card again for real.
    var peek = App.flashcards.peekCard();
    var isPeeking = !!peek;
    var view = peek || card;
    var localFlip = false;

    if (sess.cert || sess.chapter) {
      var contextLabel = sess.scope === 'all' || !sess.chapter ? 'All content' : sess.chapter;
      root.appendChild(makeContextHeader(sess.cert, contextLabel, 'Flashcards'));
    }

    // Progress + Shuffle toolbar
    var bar = el('div', { className: 'flash-toolbar' });
    var faceToggle = el('button', {
      className: 'btn btn-ghost btn-sm flash-face-toggle',
      type: 'button',
      text: sess.defaultFace === 'back' ? 'Back' : 'Front',
      title: 'Choose which side new cards show first',
      'aria-label': 'Choose which side new cards show first. Currently ' + (sess.defaultFace === 'back' ? 'back' : 'front'),
      onClick: function (e) {
        e.stopPropagation();
        App.flashcards.setDefaultFace(sess.defaultFace === 'back' ? 'front' : 'back');
        root.innerHTML = '';
        renderFlashPlayer(root);
      }
    });
    bar.appendChild(el('div', { className: 'quiz-progress' }, [
      el('span', { className: 'mono text-muted', text: sess.completed + ' / ' + sess.totalCards + ' done' }),
      el('div', { className: 'progress-bar' }, [el('div', { className: 'progress-fill', style: { width: donePct + '%' } })]),
      el('span', { className: 'chip chip-muted', text: 'Box ' + (st.box || 1) })
    ]));
    bar.appendChild(el('button', {
      className: 'btn btn-ghost btn-sm flash-shuffle', text: 'Shuffle',
      title: 'Shuffle the remaining cards',
      onClick: function () { shuffleAndRefresh(); }
    }));
    bar.appendChild(el('button', {
      className: 'btn btn-ghost btn-sm flash-previous', text: 'Previous',
      title: 'See the previous card again — does not change your progress (P)',
      'aria-label': 'Show the previous card again without changing progress',
      disabled: App.flashcards.canGoPrevious() ? null : 'disabled',
      onClick: function () { peekPrevious(); }
    }));
    bar.appendChild(faceToggle);
    if (retryCount) {
      bar.appendChild(el('span', { className: 'chip chip-amber', text: retryCount + ' to retry' }));
    }
    root.appendChild(bar);

    var stage = el('div', { className: 'flashcard-stage' });
    var fc = el('div', {
      className: 'flashcard' + (isPeeking ? (localFlip ? ' flipped' : '') : (sess.flipped ? ' flipped' : '')),
      role: 'button', tabindex: '0',
      'aria-label': isPeeking ? 'Viewing a previous card, press space to flip' : 'Flashcard, press space to flip',
      onClick: function (e) {
        if (e.target && e.target.closest && e.target.closest('button, a, input, select, textarea')) return;
        if (isPeeking) localFlip = !localFlip;
        else App.flashcards.flip();
        syncFlip();
      },
      onKeydown: function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          if (isPeeking) localFlip = !localFlip;
          else App.flashcards.flip();
          syncFlip();
        }
      }
    });
    var peekLabel = isPeeking ? 'Previous · ' : '';
    fc.appendChild(el('div', { className: 'flashcard-face front' }, [
      el('div', { className: 'flashcard-label', text: peekLabel + 'Front' }),
      el('div', { className: 'flashcard-text', html: inlineHtml(view.front) })
    ]));
    fc.appendChild(el('div', { className: 'flashcard-face back' }, [
      el('div', { className: 'flashcard-label', text: peekLabel + 'Back' }),
      el('div', { className: 'flashcard-text', html: inlineHtml(view.back) })
    ]));
    stage.appendChild(fc);
    root.appendChild(stage);

    var footer;
    if (isPeeking) {
      // Peek mode is view-only: no grade controls, just a way back.
      footer = el('div', { className: 'flashcard-footer' });
      footer.appendChild(el('p', { className: 'text-muted flash-hint', style: { textAlign: 'center' }, text: 'Viewing a previous card — your progress is not affected' }));
      footer.appendChild(el('div', { className: 'peek-actions' }, [
        el('button', {
          className: 'btn btn-secondary btn-sm', text: 'Current card',
          title: 'Return to the current card (Esc)',
          onClick: function () { returnToCurrent(); }
        })
      ]));
    } else {
      footer = el('div', { className: 'flashcard-footer' + (sess.intentionallyFlipped ? ' flipped' : '') });
      var hint = el('p', { className: 'text-muted flash-hint', style: { textAlign: 'center' }, text: 'Click card or press Space to flip' });
      var grades = el('div', { className: 'grade-btns' });
      grades.appendChild(el('button', {
        className: 'btn btn-danger', text: '1 · Again',
        title: 'Review this card again later',
        onClick: function () { gradeAndRefresh('again'); }
      }));
      grades.appendChild(el('button', {
        className: 'btn btn-primary', text: '2 · Next',
        title: 'I know this card',
        onClick: function () { gradeAndRefresh('next'); }
      }));
      footer.appendChild(hint);
      footer.appendChild(grades);
    }
    root.appendChild(footer);

    function syncFlip() {
      fc.classList.toggle('flipped', isPeeking ? localFlip : sess.flipped);
      if (!isPeeking) footer.classList.toggle('flipped', sess.intentionallyFlipped);
    }
    syncFlip();

    function gradeAndRefresh(g) {
      App.flashcards.grade(g);
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function peekPrevious() {
      if (!App.flashcards.peekBack()) return;
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function returnToCurrent() {
      App.flashcards.peekReturn();
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function shuffleAndRefresh() {
      // Shuffling is a live-session action: leave peek mode first so the deck
      // change never happens under a card the learner is only viewing.
      App.flashcards.peekReturn();
      App.flashcards.shuffle();
      App.toast('Deck shuffled', 'info');
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function onKey(e) {
      var control = e.target && e.target.closest && e.target.closest('button, input, select, textarea, a, [contenteditable="true"]');
      if (control) return;
      if (isPeeking) {
        // Peek mode is view-only: flip the viewed card or step back/return,
        // but never shuffle or grade while a previous card is on screen.
        if (e.key === 'Escape') {
          e.preventDefault();
          returnToCurrent();
        } else if (e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          peekPrevious();
        } else if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          localFlip = !localFlip;
          syncFlip();
        }
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        peekPrevious();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        App.flashcards.flip();
        syncFlip();
      } else if (e.key === 's' || e.key === 'S') {
        shuffleAndRefresh();
      } else if (App.flashcards.canGrade()) {
        if (e.key === '1') gradeAndRefresh('again');
        else if (e.key === '2' || e.key === 'Enter') gradeAndRefresh('next');
      }
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () {
      var obs = new MutationObserver(function () {
        if (!root.contains(stage)) { document.removeEventListener('keydown', onKey); obs.disconnect(); }
      });
      obs.observe(root, { childList: true });
    }, 50);
  }

  function renderFlashSummary(root) {
    var result = App.flashcards.endSession();
    if (!result) { renderFlashSetup(root); return; }
    practiceBack(root, '#/flashcards', 'Back');
    root.appendChild(el('h1', { text: 'Session Complete' }));
    var panel = el('div', { className: 'panel mb-3' });
    var grid = el('div', { className: 'stat-grid' });
    [
      { label: 'Cards Reviewed', value: result.totalCards },
      { label: 'Completed Without Retry', value: result.withoutRetry },
      { label: 'Needed Review', value: result.neededReview },
      { label: 'Repeat Attempts', value: result.repeatAttempts }
    ].forEach(function (t) {
      grid.appendChild(el('div', { className: 'stat-tile' }, [
        el('div', { className: 'stat-value', text: String(t.value) }),
        el('div', { className: 'stat-label', text: t.label })
      ]));
    });
    panel.appendChild(grid);
    if (result.focusAreas && result.focusAreas.length) {
      var chips = result.focusAreas.map(function (t) { return el('span', { className: 'chip chip-amber', text: t }); });
      panel.appendChild(el('div', { className: 'mt-2 flex gap-sm', style: { flexWrap: 'wrap', alignItems: 'center' } },
        [el('span', { className: 'label-upper', text: 'Focus areas:' })].concat(chips)));
    }
    root.appendChild(panel);
    root.appendChild(el('button', {
      className: 'btn btn-primary mt-2', text: 'New session',
      onClick: function () { App.core.navigate('#/flashcards'); }
    }));
  }

  // A lab has an in-progress session when some (but not all) of its steps are
  // complete and the lab itself is not marked done. Returns the most recently
  // active one, mirroring the single saved-session behavior of quiz/flashcards.
  function activeLabSession(certId) {
    var labs = App.content.getByCert('labs', certId);
    var stepsDone = App.store.get('labStepsDone', {});
    var best = null;
    labs.forEach(function (lab) {
      if (!lab.steps || !lab.steps.length || App.store.isLabDone(lab._id)) return;
      var doneCount = 0, lastTs = 0;
      lab.steps.forEach(function (step, i) {
        var ts = stepsDone[lab._id + ':' + i];
        if (ts) { doneCount++; if (ts > lastTs) lastTs = ts; }
      });
      if (doneCount > 0 && doneCount < lab.steps.length && (!best || lastTs > best.lastTs)) {
        best = { lab: lab, doneCount: doneCount, total: lab.steps.length, lastTs: lastTs };
      }
    });
    return best;
  }

  function resetLabSession(labId) {
    var done = App.store.get('labStepsDone', {});
    var prefix = labId + ':';
    Object.keys(done).forEach(function (key) {
      if (key.indexOf(prefix) === 0) delete done[key];
    });
    App.store.set('labStepsDone', done);
  }

  // Normalize optional lab resources before rendering. String entries are valid
  // mock data, while metadata-only or blank entries are not usable resources
  // and must not create an empty Mock Data panel.
  function labMockItems(lab) {
    var raw = lab && Array.isArray(lab.mockData) ? lab.mockData : [];
    return raw.map(function (item) {
      if (typeof item === 'string') {
        return item.trim() ? { content: item } : null;
      }
      if (!item || typeof item !== 'object' || item.content == null) return null;
      var content = String(item.content);
      if (!content.trim()) return null;
      var normalized = { content: content };
      if (item.filename != null) normalized.filename = item.filename;
      if (item.name != null) normalized.name = item.name;
      if (item.description != null) normalized.description = item.description;
      return normalized;
    }).filter(function (item) { return item !== null; });
  }

  function labRow(lab, num) {
    var done = App.store.isLabDone(lab._id);
    var row = el('a', {
      className: 'lab-row',
      href: '#/labs/' + encodeURIComponent(lab._id)
    });
    row.appendChild(el('div', { className: 'lab-row-index', text: String(num) }));
    var body = el('div', { className: 'lab-row-body' });
    body.appendChild(el('div', { className: 'lab-row-title', html: inlineHtml(lab.title) }));
    var meta = el('div', { className: 'lab-row-meta' });
    meta.appendChild(el('span', { className: 'chip chip-amber', text: '★'.repeat(lab.difficulty || 1) }));
    meta.appendChild(el('span', { className: 'chip chip-muted', text: (lab.minutes || '?') + ' min' }));
    body.appendChild(meta);
    if (lab.scenario) {
      var desc = lab.scenario.length > 110 ? lab.scenario.slice(0, 110) + '…' : lab.scenario;
      body.appendChild(el('div', { className: 'lab-row-desc', html: inlineHtml(desc) }));
    }
    row.appendChild(body);
    if (done) row.appendChild(el('span', { className: 'chip chip-green', text: 'Completed' }));
    return row;
  }

  function labChapterSection(chapterName, chapterLabs, visibleLabs, open) {
    var doneCount = chapterLabs.filter(function (l) { return App.store.isLabDone(l._id); }).length;
    var allDone = chapterLabs.length > 0 && doneCount === chapterLabs.length;
    var section = el('div', { className: 'lab-chapter' + (open ? ' open' : '') });
    var header = el('button', {
      className: 'lab-chapter-header',
      'aria-expanded': open ? 'true' : 'false',
      onClick: function () {
        var isOpen = section.classList.toggle('open');
        header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
    header.appendChild(el('span', { className: 'lab-chapter-chevron', 'aria-hidden': 'true', html:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }));
    var titleWrap = el('div', { className: 'lab-chapter-title-wrap' });
    titleWrap.appendChild(el('div', { className: 'lab-chapter-title', html: inlineHtml(chapterName) }));
    titleWrap.appendChild(el('div', { className: 'lab-chapter-meta', text: doneCount + ' / ' + chapterLabs.length + ' labs completed' }));
    header.appendChild(titleWrap);
    header.appendChild(el('span', { className: 'chip chip-muted lab-chapter-count', text: chapterLabs.length + ' Labs' }));
    if (allDone) {
      header.appendChild(el('span', {
        className: 'lab-chapter-done',
        role: 'img',
        'aria-label': 'All labs completed',
        title: 'All labs completed',
        html: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.3l3 3 6-6.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      }));
    }
    section.appendChild(header);
    var body = el('div', { className: 'lab-chapter-body' });
    var inner = el('div', { className: 'lab-chapter-body-inner' });
    var rows = el('div', { className: 'lab-rows' });
    visibleLabs.forEach(function (lab, i) { rows.appendChild(labRow(lab, i + 1)); });
    inner.appendChild(rows);
    body.appendChild(inner);
    section.appendChild(body);
    return section;
  }

  function viewLabs(root, parsed) {
    var labId = parsed.params[0] ? decodeURIComponent(parsed.params[0]) : null;
    if (labId) return viewLabDetail(root, labId);
    root.appendChild(el('h1', { text: 'Labs' }));
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to view its labs.')); return; }
    var allLabs = App.content.getByCert('labs', certId);
    if (!allLabs.length) { root.appendChild(emptyState('No labs yet', 'Add lab content files for ' + cert.name + ' and reload.')); return; }

    var controls = el('div', { className: 'panel mb-3' });
    controls.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap', alignItems: 'center' } }, [
      el('span', { className: 'chip chip-muted', style: { color: cert.color, borderColor: 'currentColor' }, text: cert.name }),
      el('span', { className: 'text-muted', text: allLabs.length + ' labs' })
    ]));
    var filter = el('input', { className: 'form-control', type: 'search', placeholder: 'Search labs…' });
    controls.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Find a lab' }), filter]));
    root.appendChild(controls);

    // Leaving a lab keeps its step progress (like a saved quiz session); the
    // labs page offers Resume or Cancel so the user can pick it up or restart.
    var activeSession = activeLabSession(certId);
    if (activeSession) {
      var resumePanel = el('div', { className: 'quiz-resume-panel mb-3' });
      resumePanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Saved session' }));
      resumePanel.appendChild(el('p', { className: 'text-muted', html: inlineHtml(activeSession.lab.title + ' · ' + activeSession.doneCount + ' of ' + activeSession.total + ' steps done') }));
      var resumeRow = el('div', { className: 'flex gap-sm' });
      resumeRow.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm', text: 'Resume lab',
        onClick: function () { App.core.navigate('#/labs/' + encodeURIComponent(activeSession.lab._id)); }
      }));
      resumeRow.appendChild(el('button', {
        className: 'btn btn-danger btn-sm', text: 'Cancel session',
        title: 'Discard this lab\u2019s step progress and start it fresh',
        onClick: function () {
          if (!confirm('Cancel this lab session? Its step progress will be discarded.')) return;
          resetLabSession(activeSession.lab._id);
          App.core.handleRoute();
        }
      }));
      resumePanel.appendChild(resumeRow);
      root.appendChild(resumePanel);
    }

    var content = el('div', { id: 'labs-content' });
    root.appendChild(content);

    // Direct context from a certification chapter (Certifications → Chapter → Labs).
    var pre = null;
    try { pre = JSON.parse(sessionStorage.getItem('reviewapp.labsSetup') || 'null'); } catch (e) {}
    var autoExpandChapter = null;
    if (pre && pre.cert) {
      sessionStorage.removeItem('reviewapp.labsSetup');
      if (pre.cert !== certId && !App.core.setCurrentCert(pre.cert, { silent: true })) { /* stay on the current cert */ }
      certId = App.core.getCurrentCertId();
      cert = App.content.getCert(certId);
      if (pre.chapter) {
        var chNum = (String(pre.chapter).match(/Ch\s*(\d+)/i) || [])[1];
        Object.keys(App.content.getChapters(certId, 'labs')).forEach(function (name) {
          if (autoExpandChapter) return;
          if (name === pre.chapter) { autoExpandChapter = name; return; }
          var n = (String(name).match(/Ch\s*(\d+)/i) || [])[1];
          if (chNum && n && parseInt(n, 10) === parseInt(chNum, 10)) autoExpandChapter = name;
        });
      }
    }

    function renderContent() {
      content.innerHTML = '';
      var chapters = App.content.getChapters(certId, 'labs');
      var chapterNames = Object.keys(chapters); // preserve defined (manifest) order
      if (!chapterNames.length) { content.appendChild(emptyState('No labs', cert.name + ' has no labs yet.')); return; }
      var query = filter.value.trim().toLowerCase();
      var shown = 0;
      chapterNames.forEach(function (ch) {
        var chapterLabs = chapters[ch];
        var visibleLabs = query
          ? chapterLabs.filter(function (l) {
            return (l.title + ' ' + (l.tags || []).join(' ') + ' ' + (l.scenario || '')).toLowerCase().indexOf(query) >= 0;
          })
          : chapterLabs;
        if (query && !visibleLabs.length) return; // hide chapters with no matches while filtering
        var open = !!(autoExpandChapter && autoExpandChapter === ch);
        content.appendChild(labChapterSection(ch, chapterLabs, visibleLabs, open));
        shown++;
      });
      if (!shown) content.appendChild(emptyState('No labs found', 'Try a different search.'));
    }

    renderContent();
    filter.addEventListener('input', renderContent);
  }

  function viewLabDetail(root, labId) {
    var labs = App.content.getAll('labs');
    var lab = labs.find(function (l) { return l._id === labId; });
    if (!lab) { root.appendChild(emptyState('Lab not found', labId)); return; }
    practiceBack(root, '#/labs', 'Back');
    var chapterLabs = labs.filter(function (l) { return l._cert === lab._cert && l._chapter === lab._chapter; });
    var labIdx = chapterLabs.findIndex(function (l) { return l._id === lab._id; });
    var labMeta = labIdx >= 0 ? 'Lab ' + (labIdx + 1) + ' of ' + chapterLabs.length : null;
    root.appendChild(makeContextHeader(lab._cert, lab._chapter, 'Lab', labMeta));
    root.appendChild(el('h1', { html: inlineHtml(lab.title) }));
    root.appendChild(el('div', { className: 'flex gap-sm mb-2' }, [
      el('span', { className: 'chip chip-amber', text: 'Difficulty ' + (lab.difficulty || 1) }),
      el('span', { className: 'chip chip-muted', text: (lab.minutes || '?') + ' min' })
    ]));
    var scen = el('div', { className: 'panel mb-3' });
    scen.appendChild(el('div', { className: 'label-upper mb-1', text: 'Scenario' }));
    scen.appendChild(el('div', { html: App.markdown.render(lab.scenario || '') }));
    root.appendChild(scen);
    // Per-step completion helpers. The Done button, the Redo button, and the
    // objective checkboxes all route through completeStep()/redoStep(), so
    // manual and automatic completion share one idempotent flow.
    var stepWraps = [], stepChips = [], stepDoneBtns = [], btnActions = [], objectiveCbs = [];

    // Explicit objective→steps mapping (optional). Without lab.objectiveSteps
    // we fall back to the 1:1 convention: objective i satisfies step i.
    function objectiveStepList(i) {
      if (lab.objectiveSteps && lab.objectiveSteps[i] != null) {
        var raw = lab.objectiveSteps[i];
        return Array.isArray(raw) ? raw.slice() : [raw];
      }
      return [i];
    }

    // Objectives that list step `j` among the steps satisfying them.
    function objectivesForStep(j) {
      var out = [];
      (lab.objectives || []).forEach(function (o, i) {
        if (objectiveStepList(i).indexOf(j) >= 0) out.push(i);
      });
      return out;
    }

    // True when every step of objective i is complete.
    function objectiveSatisfied(i) {
      return objectiveStepList(i).every(function (k) {
        return k >= 0 && k < lab.steps.length && App.store.isStepDone(lab._id, k);
      });
    }

    // Keep an objective's checkbox in sync with its steps' completion state.
    // Setting .checked directly never fires change events, so this cannot
    // create a feedback loop with the checkbox listener.
    function syncObjectiveCheckbox(i) {
      var cb = objectiveCbs[i];
      if (!cb) return;
      cb.checked = objectiveSatisfied(i);
    }

    function markStepUI(i) {
      var wrap = stepWraps[i];
      if (!wrap) return;
      wrap.classList.add('is-complete');
      var chip = stepChips[i];
      if (chip) {
        chip.className = 'chip chip-green';
        chip.textContent = '✓';
        chip.setAttribute('aria-label', 'Step ' + (i + 1) + ' complete');
        chip.title = 'Step complete';
      }
      var btn = stepDoneBtns[i];
      if (btn) {
        btn.className = 'btn btn-secondary btn-sm lab-step-done-btn';
        btn.disabled = false;
        btn.textContent = '↺ Redo';
        btn.setAttribute('aria-label', 'Redo step ' + (i + 1));
        btn.title = 'Un-complete this step and work through it again';
        btnActions[i] = function () { redoStep(i); };
      }
    }

    function unmarkStepUI(i) {
      var wrap = stepWraps[i];
      if (!wrap) return;
      wrap.classList.remove('is-complete');
      var chip = stepChips[i];
      if (chip) {
        chip.className = 'chip chip-muted';
        chip.textContent = String(i + 1);
        chip.removeAttribute('aria-label');
        chip.title = '';
      }
      var btn = stepDoneBtns[i];
      if (btn) {
        btn.className = 'btn btn-primary btn-sm lab-step-done-btn';
        btn.disabled = false;
        btn.textContent = 'Done';
        btn.setAttribute('aria-label', 'Mark step ' + (i + 1) + ' done');
        btn.title = '';
        btnActions[i] = function () { completeStep(i); };
      }
    }

    // First incomplete step at or after `from`; falls back to the earliest
    // incomplete step so out-of-order completion still lands on a current step.
    function nextActiveStep(from) {
      var n = lab.steps.length;
      for (var k = from; k < n; k++) if (!App.store.isStepDone(lab._id, k)) return k;
      for (var j = 0; j < from && j < n; j++) if (!App.store.isStepDone(lab._id, j)) return j;
      return null;
    }

    function openStepOnly(k) {
      stepWraps.forEach(function (w, j) { w.classList.toggle('open', j === k); });
    }

    // Expected output is kept out of the step body. The Verify row provides
    // one compact entry point to the full output modal, so multiline output
    // never creates a second inline section.

    function expectedOutputInfo(step) {
      if (step.expectedOutput == null) return null;
      var value = step.expectedOutput;
      var dynamic = !!step.expectedOutputDynamic;
      if (typeof value === 'object') {
        dynamic = dynamic || !!value.dynamic;
        value = value.text != null ? value.text : (value.value != null ? value.value : '');
      }
      var text = String(value);
      return { text: text === '' ? '(no output)' : text, dynamic: dynamic };
    }

    function appendExpectedOutputButton(parent, step) {
      var info = expectedOutputInfo(step);
      if (!info || info.text === '(no output)') return false;
      parent.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm lab-output-view-btn',
        type: 'button',
        text: 'View output',
        title: info.dynamic ? 'View expected output (may vary by system or run)' : 'View expected output',
        'aria-label': info.dynamic ? 'View expected output; values may vary by system or run' : 'View expected output',
        onClick: function (e) {
          e.stopPropagation();
          App.core.openModal(el('div', {
            className: 'code-block lab-expected-output-modal',
            role: 'document',
            text: info.text
          }), { title: 'Expected Output' });
          var modal = document.querySelector('#modal-root .modal');
          var title = modal && modal.querySelector('.modal-header h2');
          if (modal && title) {
            var titleId = utils.uid();
            title.id = titleId;
            modal.setAttribute('aria-labelledby', titleId);
          }
        }
      }));
      return true;
    }

    // Idempotent: completing an already-completed step is a no-op and never
    // re-advances, so the Done button, Redo, and objective checks cannot
    // double-fire or skip ahead. The final step never advances past the end.
    // Returns true when the step was actually (newly) completed.
    function completeStep(i) {
      if (i < 0 || i >= lab.steps.length) return false;
      if (App.store.isStepDone(lab._id, i)) return false;
      App.store.markStepDone(lab._id, i);
      markStepUI(i);
      // Auto-check any objective that is now fully satisfied by its steps.
      objectivesForStep(i).forEach(function (oi) {
        if (objectiveSatisfied(oi)) syncObjectiveCheckbox(oi);
      });
      var next = nextActiveStep(i + 1);
      if (next == null) {
        App.toast('All steps complete — mark the lab done below', 'success', 2600);
        return true;
      }
      openStepOnly(next);
      stepWraps[next].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return true;
    }

    // Redo a completed step: un-complete it, reopen it as the current step,
    // and un-check any objective that depended on it. Idempotent like
    // completeStep — redoing a pending step is a no-op.
    function redoStep(i) {
      if (i < 0 || i >= lab.steps.length) return;
      if (!App.store.isStepDone(lab._id, i)) return;
      App.store.unmarkStepDone(lab._id, i);
      unmarkStepUI(i);
      objectivesForStep(i).forEach(function (oi) { syncObjectiveCheckbox(oi); });
      openStepOnly(i);
      stepWraps[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (lab.objectives && lab.objectives.length) {
      var obj = el('div', { className: 'panel mb-3' });
      obj.appendChild(el('div', { className: 'label-upper mb-1', text: 'Objectives' }));
      lab.objectives.forEach(function (o, i) {
        var labEl = el('label', { style: { display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', cursor: 'pointer' } });
        var cb = el('input', { type: 'checkbox', id: 'obj-' + i });
        cb.addEventListener('change', function () {
          if (!cb.checked) return; // unchecking never reverts completed steps; use Redo instead
          var list = objectiveStepList(i);
          var changed = false;
          list.forEach(function (k) { if (completeStep(k)) changed = true; });
          if (changed) {
            App.toast('Objective met — ' + (list.length > 1 ? list.length + ' steps complete' : 'step ' + (list[0] + 1) + ' complete'), 'success', 2200);
          }
        });
        labEl.appendChild(cb);
        labEl.appendChild(el('span', { html: inlineHtml(o) }));
        obj.appendChild(labEl);
        objectiveCbs.push(cb);
      });
      root.appendChild(obj);
    }
    // Optional lab resources. Each item is rendered independently with its own
    // copy action; labs without usable mock data get no resource section at all.
    var mockItems = labMockItems(lab);
    if (mockItems.length) {
      var mdPanel = el('div', { className: 'panel mb-3 lab-mock-data' });
      mdPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Mock Data' }));
      mdPanel.appendChild(el('p', { className: 'text-muted mb-2', style: { fontSize: '0.88rem' },
        text: 'Sample data for this lab. Copy each item, then use it in the steps below.' }));
      mockItems.forEach(function (item, i) {
        var label = item.filename || item.name || ('Item ' + (i + 1));
        var itemEl = el('div', { className: 'lab-mock-item' });
        var head = el('div', { className: 'lab-mock-item-head' });
        if (item.filename) head.appendChild(el('code', { className: 'lab-mock-filename', text: item.filename }));
        if (item.name && item.name !== item.filename) head.appendChild(el('strong', { text: item.name }));
        if (item.description) head.appendChild(el('span', { className: 'text-muted', text: item.description }));
        itemEl.appendChild(head);
        var block = el('div', { className: 'code-block' });
        block.textContent = String(item.content == null ? '' : item.content);
        block.appendChild(el('button', {
          className: 'btn btn-ghost btn-sm copy-btn',
          type: 'button',
          text: 'Copy',
          'aria-label': 'Copy ' + label + ' content',
          title: 'Copy ' + label + ' content',
          onClick: function (e) {
            e.stopPropagation();
            utils.copyText(item.content == null ? '' : String(item.content)).then(function (ok) {
              if (ok) App.toast('Copied', 'success', 1500);
              else App.toast('Copy failed — select the text manually', 'error', 2200);
            });
          }
        }));
        itemEl.appendChild(block);
        mdPanel.appendChild(itemEl);
      });
      root.appendChild(mdPanel);
    }
    if (lab.steps && lab.steps.length) {
      root.appendChild(el('h3', { className: 'mb-1', text: 'Steps' }));
      lab.steps.forEach(function (step, i) {
        var wrap = el('div', { className: 'lab-step' });
        var chip = el('span', { className: 'chip chip-muted', text: String(i + 1) });
        wrap.appendChild(el('div', {
          className: 'lab-step-header',
          onClick: function () { wrap.classList.toggle('open'); }
        }, [
          chip,
          el('span', { html: inlineHtml(step.do || 'Step ' + (i + 1)) })
        ]));
        var body = el('div', { className: 'lab-step-body' });
        var actions = el('div', { className: 'lab-step-actions' });
        var group = el('div', { className: 'lab-step-action-group' });
        var reveals = [];
        if (step.hint) {
          var hintBtn = el('button', { className: 'btn btn-ghost btn-sm', text: 'Show hint' });
          var hintEl = el('div', { className: 'text-muted mb-1', style: { display: 'none' }, html: inlineHtml(step.hint) });
          hintBtn.addEventListener('click', function (e) { e.stopPropagation(); hintEl.style.display = hintEl.style.display === 'none' ? 'block' : 'none'; });
          group.appendChild(hintBtn);
          reveals.push(hintEl);
        }
        if (step.solution) {
          var solBtn = el('button', { className: 'btn btn-secondary btn-sm', text: 'Reveal solution' });
          var solEl = el('div', { style: { display: 'none' } });
          var code = el('div', { className: 'code-block' });
          code.textContent = step.solution;
          code.appendChild(el('button', {
            className: 'btn btn-ghost btn-sm copy-btn', text: 'Copy',
            onClick: function (e) {
              e.stopPropagation();
              utils.copyText(step.solution).then(function () { App.toast('Copied', 'success', 1500); });
            }
          }));
          solEl.appendChild(code);
          solBtn.addEventListener('click', function (e) { e.stopPropagation(); solEl.style.display = solEl.style.display === 'none' ? 'block' : 'none'; });
          group.appendChild(solBtn);
          reveals.push(solEl);
        }
        var doneBtn = el('button', {
          className: 'btn btn-primary btn-sm lab-step-done-btn', type: 'button', text: 'Done',
          'aria-label': 'Mark step ' + (i + 1) + ' done'
        });
        // One listener whose behavior is swapped by markStepUI/unmarkStepUI.
        doneBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var act = btnActions[i];
          if (act) act();
        });
        actions.appendChild(group);
        actions.appendChild(doneBtn);
        body.appendChild(actions);
        reveals.forEach(function (r) { body.appendChild(r); });
        // Keep one Verify block at the bottom of the step. The structured
        // command metadata is intentionally not rendered here: the exact
        // command remains available only through Reveal solution.
        var verify = el('div', { className: 'lab-step-verify' });
        var verifyRow = el('div', { className: 'lab-step-verify-row' });
        verifyRow.appendChild(el('div', { className: 'lab-step-check' }, [
          el('strong', { text: 'Verify: ' }), el('span', { html: inlineHtml(step.check || 'Review the expected result for this step.') })
        ]));
        appendExpectedOutputButton(verifyRow, step);
        verify.appendChild(verifyRow);
        if (step.expectedOutput != null || step.check) body.appendChild(verify);
        wrap.appendChild(body);
        root.appendChild(wrap);
        stepWraps.push(wrap);
        stepChips.push(chip);
        stepDoneBtns.push(doneBtn);
        btnActions.push(function () { completeStep(i); });
        if (App.store.isStepDone(lab._id, i)) markStepUI(i);
      });
      // The current step is the first incomplete one; show it on load.
      var current = nextActiveStep(0);
      if (current != null) openStepOnly(current);
      // Reflect any previously completed steps in the objective checkboxes.
      (lab.objectives || []).forEach(function (o, i) { syncObjectiveCheckbox(i); });
    }
    var done = App.store.isLabDone(lab._id);
    root.appendChild(el('button', {
      className: 'btn ' + (done ? 'btn-secondary' : 'btn-primary') + ' mt-3',
      text: done ? 'Completed ✓' : 'Mark Complete',
      onClick: function () {
        App.store.markLabComplete(lab._id);
        App.toast('Lab marked complete', 'success');
        // All steps are done and the lab is marked complete, so leave the
        // detail view automatically and return to the lab select menu.
        App.core.navigate('#/labs');
      }
    }));
  }

  /* ── Markdown progress report ────────────────────────────── */
  // Self-contained builder: recomputes everything from the store/content so it
  // is reusable by any view. Produces a rich, readable Markdown snapshot.
  function escMd(str) {
    return String(str == null ? '' : str).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
  }

  function buildMarkdownReport(certId) {
    var cert = App.content.getCert(certId);
    var certName = cert ? cert.name : (certId || 'General');
    var questions = App.content.getByCert('questions', certId);
    var cards = App.content.getByCert('flashcards', certId);
    var labs = App.content.getByCert('labs', certId);
    var answers = App.store.getAnswers({ cert: certId });
    var reviews = App.store.getCardReviews({ cert: certId });
    var exams = App.store.getExams(certId);
    var labsDone = App.store.get('labsDone', {});
    var settings = App.store.getSettings();
    var threshold = (settings.passThreshold && settings.passThreshold[certId]) || 70;

    function pct(correct, total) { return total ? Math.round((correct / total) * 100) : null; }
    function dayStart(ts) { var d = new Date(ts || Date.now()); d.setHours(0, 0, 0, 0); return d.getTime(); }
    function chapterKeyFor(type, chapter) { return App.content.findChapter ? App.content.findChapter(certId, type, chapter) : chapter; }
    function chapterNumber(name, fallback) {
      var n = App.content.chapterNumber ? App.content.chapterNumber(name) : null;
      return n == null ? String(fallback + 1).padStart(2, '0') : String(n).padStart(2, '0');
    }
    function chapterTitle(name) {
      var value = String(name || 'General');
      return value.replace(/^Ch\s*\d+\s*[·:-]?\s*/i, '') || value;
    }

    var regular = answers.filter(function (a) { return a.mode !== 'exam'; });
    var totalAccuracy = pct(regular.filter(function (a) { return a.correct; }).length, regular.length);
    var seenQ = {}; answers.forEach(function (a) { if (a.qId) seenQ[a.qId] = true; });
    var reviewed = {}; reviews.forEach(function (r) { if (r.cardId) reviewed[r.cardId] = true; });
    var coverage = questions.length ? pct(Object.keys(seenQ).length, questions.length)
      : (cards.length ? pct(Object.keys(reviewed).length, cards.length) : null);
    var labsDoneCount = labs.filter(function (l) { return labsDone[l._id]; }).length;

    // Streak derived from all activity (answers, reviews, labs).
    var activeDays = {};
    answers.forEach(function (a) { if (a.ts) activeDays[dayStart(a.ts)] = true; });
    reviews.forEach(function (r) { if (r.ts || r.sessionTs) activeDays[dayStart(r.ts || r.sessionTs)] = true; });
    labs.forEach(function (l) { if (labsDone[l._id]) activeDays[dayStart(labsDone[l._id])] = true; });
    var dayKeys = Object.keys(activeDays).map(Number).sort(function (a, b) { return a - b; });
    var longest = 0, run = 0, prev = null;
    dayKeys.forEach(function (k) {
      if (prev != null && k === prev + 86400000) run++; else run = 1;
      if (run > longest) longest = run;
      prev = k;
    });
    var cursor = dayStart(Date.now());
    if (!activeDays[cursor]) cursor -= 86400000;
    var current = 0;
    while (activeDays[cursor]) { current++; cursor -= 86400000; }

    // Chapter rows, mirroring the Stats view's aggregation.
    var qMap = App.content.getChapters(certId, 'questions');
    var fMap = App.content.getChapters(certId, 'flashcards');
    var lMap = App.content.getChapters(certId, 'labs');
    var rowKeys = [];
    function addKeys(map) {
      Object.keys(map).forEach(function (k) {
        var number = App.content.chapterNumber ? App.content.chapterNumber(k) : null;
        var existing = rowKeys.find(function (item) { return (number != null && item.number === number) || item.key === k; });
        if (!existing) rowKeys.push({ key: k, number: number });
      });
    }
    addKeys(qMap); addKeys(fMap); addKeys(lMap);
    rowKeys.sort(function (a, b) {
      if (a.number != null && b.number != null) return a.number - b.number;
      if (a.number != null) return -1;
      if (b.number != null) return 1;
      return a.key.localeCompare(b.key);
    });

    var chapterRows = rowKeys.map(function (entry, index) {
      var qKey = chapterKeyFor('questions', entry.key) || entry.key;
      var fKey = chapterKeyFor('flashcards', entry.key);
      var lKey = chapterKeyFor('labs', entry.key);
      var qItems = qMap[qKey] || [];
      var fItems = fKey ? (fMap[fKey] || []) : [];
      var lItems = lKey ? (lMap[lKey] || []) : [];
      var qAnswers = answers.filter(function (a) { return chapterKeyFor('questions', a.chapter) === qKey; });
      var qSeen = {}; qAnswers.forEach(function (a) { if (a.qId) qSeen[a.qId] = true; });
      var fReviews = reviews.filter(function (r) {
        return chapterKeyFor('flashcards', r.chapter) === fKey || (!fKey && chapterKeyFor('questions', r.chapter) === qKey);
      });
      var fSeen = {}; fReviews.forEach(function (r) { if (r.cardId) fSeen[r.cardId] = true; });
      var lDone = lItems.filter(function (l) { return labsDone[l._id]; }).length;
      var comps = [];
      if (qItems.length) comps.push(Object.keys(qSeen).length / qItems.length);
      if (fItems.length) comps.push(Object.keys(fSeen).length / fItems.length);
      if (lItems.length) comps.push(lDone / lItems.length);
      var cov = comps.length ? Math.round((comps.reduce(function (a, b) { return a + b; }, 0) / comps.length) * 100) : 0;
      var acc = pct(qAnswers.filter(function (a) { return a.correct; }).length, qAnswers.length);
      var status = cov >= 90 && (acc == null || acc >= 80) ? 'Strong' : cov > 0 ? 'In progress' : 'Not started';
      if (acc != null && acc < 60 && qAnswers.length >= 3) status = 'Needs review';
      return {
        number: chapterNumber(entry.key, index),
        title: chapterTitle(entry.key),
        questions: qItems.length,
        seen: Object.keys(qSeen).length,
        coverage: Math.min(100, cov),
        accuracy: acc,
        attempts: qAnswers.length,
        cards: fItems.length,
        reviewedCards: Object.keys(fSeen).length,
        labs: lItems.length,
        labsDone: lDone,
        status: status
      };
    });

    var weak = App.store.flashcardWeakAreas({ days: 3650, cert: certId }).slice(0, 5);
    var weakQ = App.store.weakQuestions(60, certId).slice(0, 5);

    // Insights / next steps.
    var insights = [];
    var weakest = chapterRows.filter(function (r) { return r.accuracy != null && r.attempts >= 3; }).sort(function (a, b) { return a.accuracy - b.accuracy; })[0];
    var best = chapterRows.filter(function (r) { return r.accuracy != null && r.attempts >= 3; }).sort(function (a, b) { return b.accuracy - a.accuracy; })[0];
    if (weakest) insights.push('**Needs attention:** Ch ' + weakest.number + ' · ' + escMd(weakest.title) + ' — ' + weakest.accuracy + '% accuracy across ' + weakest.attempts + ' attempts.');
    if (best) insights.push('**Strength:** Ch ' + best.number + ' · ' + escMd(best.title) + ' — ' + best.accuracy + '% accuracy across ' + best.attempts + ' attempts.');
    var now = Date.now();
    var recentSince = now - 7 * 86400000;
    var earlierSince = now - 14 * 86400000;
    var recentReg = regular.filter(function (a) { return a.ts >= recentSince; });
    var earlierReg = regular.filter(function (a) { return a.ts >= earlierSince && a.ts < recentSince; });
    if (recentReg.length >= 3 && earlierReg.length >= 3) {
      var delta = pct(recentReg.filter(function (a) { return a.correct; }).length, recentReg.length) - pct(earlierReg.filter(function (a) { return a.correct; }).length, earlierReg.length);
      if (Math.abs(delta) >= 2) insights.push('**Accuracy trend:** ' + (delta > 0 ? '+' : '') + delta + ' percentage points vs. the previous 7 days (last 7d: ' + pct(recentReg.filter(function (a) { return a.correct; }).length, recentReg.length) + '%).');
    }
    var recentReviews = reviews.filter(function (r) { return (r.ts || r.sessionTs) >= recentSince; });
    var earlierReviews = reviews.filter(function (r) { var ts = r.ts || r.sessionTs; return ts >= earlierSince && ts < recentSince; });
    if (recentReviews.length >= 3 && earlierReviews.length >= 3) {
      var againNow = Math.round(recentReviews.filter(function (r) { return r.outcome === 'again'; }).length / recentReviews.length * 100);
      var againPrev = Math.round(earlierReviews.filter(function (r) { return r.outcome === 'again'; }).length / earlierReviews.length * 100);
      if (Math.abs(againNow - againPrev) >= 3) {
        insights.push('**Flashcards:** Again rate changed from ' + againPrev + '% to ' + againNow + '% over the last 7 days' + (againNow < againPrev ? ' — retention improving.' : ' — needs reinforcement.'));
      }
    }
    if (exams.length) {
      var avgScore = Math.round(exams.reduce(function (s, e) { return s + (e.score || 0); }, 0) / exams.length);
      var passed = exams.filter(function (e) { return e.passed; }).length;
      var readiness = avgScore >= threshold && passed >= Math.min(3, exams.length) ? 'Strong' : avgScore >= threshold ? 'On track' : 'Not ready yet';
      insights.push('**Exam readiness:** ' + readiness + ' — ' + passed + ' / ' + exams.length + ' simulations passed, ' + avgScore + '% average vs. a ' + threshold + '% threshold.');
    }
    if (weak.length) insights.push('**Top weak area:** ' + escMd(weak[0].tag) + ' (' + weak[0].agains + ' Again mark' + (weak[0].agains === 1 ? '' : 's') + ' in ' + weak[0].attempts + ' attempt' + (weak[0].attempts === 1 ? '' : 's') + ').');

    var L = [];
    L.push('# ReviewApp Progress Report');
    L.push('');
    L.push('**Certification:** ' + escMd(certName));
    L.push('');
    L.push('**Generated:** ' + new Date().toLocaleString());
    L.push('');
    L.push('---');
    L.push('');
    L.push('## Overview');
    L.push('');
    L.push('| Metric | Value |');
    L.push('| --- | --- |');
    L.push('| Overall accuracy | ' + (totalAccuracy == null ? '—' : totalAccuracy + '%') + ' |');
    L.push('| Certification coverage | ' + (coverage == null ? '—' : coverage + '%') + ' |');
    L.push('| Questions answered | ' + answers.length + ' (' + Object.keys(seenQ).length + ' unique) |');
    L.push('| Flashcard reviews | ' + reviews.length + ' (' + Object.keys(reviewed).length + ' unique cards) |');
    L.push('| Labs completed | ' + labsDoneCount + ' / ' + labs.length + ' |');
    L.push('| Current streak | ' + current + ' day' + (current === 1 ? '' : 's') + ' |');
    L.push('| Longest streak | ' + longest + ' day' + (longest === 1 ? '' : 's') + ' |');
    L.push('| Cards due for review | ' + App.store.cardsDueCount(certId) + ' |');
    L.push('');

    L.push('## Chapter performance');
    L.push('');
    if (!chapterRows.length) {
      L.push('No chapter content loaded for this certification.');
    } else {
      L.push('| Ch | Chapter | Questions | Seen | Coverage | Accuracy | Cards | Labs | Status |');
      L.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
      chapterRows.forEach(function (r) {
        L.push('| ' + r.number + ' | ' + escMd(r.title) + ' | ' + r.questions + ' | ' + r.seen + ' | ' + r.coverage + '% | ' + (r.accuracy == null ? '—' : r.accuracy + '%') + ' | ' + (r.cards ? r.reviewedCards + '/' + r.cards : '—') + ' | ' + (r.labs ? r.labsDone + '/' + r.labs : '—') + ' | ' + r.status + ' |');
      });
    }
    L.push('');

    L.push('## Insights & next steps');
    L.push('');
    if (!insights.length) L.push('Complete a few quizzes or card reviews to surface meaningful insights.');
    else insights.forEach(function (i) { L.push('- ' + i); });
    L.push('');

    if (weak.length) {
      L.push('## Weak areas (flashcards)');
      L.push('');
      L.push('| Topic | Chapter | Attempts | Again | Again rate | Last seen |');
      L.push('| --- | --- | --- | --- | --- | --- |');
      weak.forEach(function (w) {
        L.push('| ' + escMd(w.tag) + ' | ' + escMd(w.chapter || 'Certification-wide') + ' | ' + w.attempts + ' | ' + w.agains + ' | ' + w.ratio + '% | ' + w.daysSince + 'd ago |');
      });
      L.push('');
    }

    if (weakQ.length) {
      L.push('## Weakest questions');
      L.push('');
      L.push('| Chapter | Accuracy | Attempts |');
      L.push('| --- | --- | --- |');
      weakQ.forEach(function (w) {
        L.push('| ' + escMd(w.chapter || 'General') + ' | ' + w.accuracy + '% | ' + w.total + ' |');
      });
      L.push('');
    }

    if (exams.length) {
      L.push('## Exam history');
      L.push('');
      L.push('| Date | Score | Correct | Threshold | Result |');
      L.push('| --- | --- | --- | --- | --- |');
      exams.slice(0, 20).forEach(function (e) {
        L.push('| ' + utils.formatDate(e.ts) + ' | ' + (e.score == null ? '—' : e.score + '%') + ' | ' + (e.correct != null ? e.correct + ' / ' + e.total : '—') + ' | ' + (e.threshold != null ? e.threshold + '%' : '—') + ' | ' + (e.passed ? 'Pass' : 'Fail') + ' |');
      });
      L.push('');
    }

    L.push('## Flashcard summary');
    L.push('');
    var againCount = reviews.filter(function (r) { return r.outcome === 'again'; }).length;
    var nextCount = reviews.length - againCount;
    var firstTry = reviews.filter(function (r) { return r.outcome === 'next' && Number(r.attempt) === 1; }).length;
    L.push('| Metric | Value |');
    L.push('| --- | --- |');
    L.push('| Review events | ' + reviews.length + ' |');
    L.push('| Unique cards reviewed | ' + Object.keys(reviewed).length + ' |');
    L.push('| Next / Again | ' + nextCount + ' / ' + againCount + ' |');
    L.push('| Again rate | ' + (reviews.length ? Math.round(againCount / reviews.length * 100) + '%' : '—') + ' |');
    L.push('| First-try Next | ' + (Object.keys(reviewed).length ? Math.round(firstTry / Object.keys(reviewed).length * 100) + '%' : '—') + ' |');
    L.push('| Cards currently due | ' + App.store.cardsDueCount(certId) + ' |');
    L.push('');

    if (labs.length) {
      L.push('## Labs progress');
      L.push('');
      L.push('| Chapter | Progress |');
      L.push('| --- | --- |');
      chapterRows.filter(function (r) { return r.labs; }).forEach(function (r) {
        L.push('| Ch ' + r.number + ' · ' + escMd(r.title) + ' | ' + r.labsDone + ' / ' + r.labs + ' |');
      });
      L.push('');
    }

    var activity = App.store.getActivity(14, certId);
    var activeDays14 = activity.filter(function (d) { return d.count; });
    L.push('## Recent activity (last 14 days)');
    L.push('');
    if (!activeDays14.length) {
      L.push('No answers logged in the last 14 days.');
    } else {
      L.push('| Day | Answers | Accuracy |');
      L.push('| --- | --- | --- |');
      activeDays14.forEach(function (d) {
        L.push('| ' + utils.formatDate(d.date) + ' | ' + d.count + ' | ' + Math.round(d.correct / d.count * 100) + '% |');
      });
    }
    L.push('');
    L.push('---');
    L.push('');
    L.push('_Generated by ReviewApp v1.3.5 — offline study analytics._');
    L.push('');

    return L.join('\n');
  }

  function viewStatsLegacy(root) {
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    root.appendChild(el('h1', { text: 'Stats' }));
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to see stats.')); return; }
    root.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap', alignItems: 'center' } }, [
      el('span', { className: 'chip chip-muted', style: { color: cert.color, borderColor: 'currentColor' }, text: cert.name }),
      el('span', { className: 'text-muted', style: { fontSize: '0.85rem' }, text: 'Stats are scoped to the active certification' })
    ]));
    var stats = App.store.getDashboardStats(certId);
    var questionTotal = App.content.getByCert('questions', certId).length;
    var seenQuestions = {};
    App.store.getAnswers({ cert: certId }).forEach(function (answer) { seenQuestions[answer.qId] = true; });
    var coverage = questionTotal ? Math.round((Object.keys(seenQuestions).length / questionTotal) * 100) : 0;
    root.appendChild(el('div', { className: 'stat-grid' }, [
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: compactNumber(stats.totalAnswered) }), el('div', { className: 'stat-label', text: 'Answered' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: stats.accuracy + '%' }), el('div', { className: 'stat-label', text: 'Accuracy' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: coverage + '%' }), el('div', { className: 'stat-label', text: 'Question coverage' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: compactNumber(stats.streakDays) }), el('div', { className: 'stat-label', text: 'Streak' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: utils.formatTime(Math.round(stats.timeOnTask / 1000)) }), el('div', { className: 'stat-label', text: 'Time on task' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: compactNumber(stats.labsDone) }), el('div', { className: 'stat-label', text: 'Labs done' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: compactNumber(stats.cardsDue) }), el('div', { className: 'stat-label', text: 'Cards due' })])
    ]));
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Accuracy by chapter' }));
    var chMap = App.content.getChapters(certId, 'questions');
    var chKeys = Object.keys(chMap);
    if (!chKeys.length) root.appendChild(el('p', { className: 'text-muted', text: 'No question chapters loaded for this certification.' }));
    else chKeys.sort().forEach(function (ch) {
      var acc = App.store.accuracyFor({ cert: certId, chapter: ch });
      var row = el('div', { className: 'bar-row' });
      row.appendChild(el('div', { className: 'bar-label', text: ch }));
      var track = el('div', { className: 'bar-track' });
      track.appendChild(el('div', { className: 'bar-fill', style: { width: (acc || 0) + '%', background: cert.color } }));
      row.appendChild(track);
      row.appendChild(el('div', { className: 'bar-value', text: acc != null ? acc + '%' : '—' }));
      root.appendChild(row);
    });
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Progress by chapter' }));
    var chapterTable = el('table', { className: 'ref-table' });
    chapterTable.appendChild(el('thead', {}, [el('tr', {}, [
      el('th', { text: 'Chapter' }), el('th', { text: 'Seen' }), el('th', { text: 'Accuracy' })
    ])]));
    var chapterBody = el('tbody');
    var hasChapters = false;
    var chaptersMap = App.content.getChapters(certId, 'questions');
    Object.keys(chaptersMap).sort().forEach(function (chapter) {
      hasChapters = true;
      var questions = chaptersMap[chapter];
      var seen = {};
      App.store.getAnswers({ cert: certId, chapter: chapter }).forEach(function (answer) { seen[answer.qId] = true; });
      var acc = App.store.accuracyFor({ cert: certId, chapter: chapter });
      chapterBody.appendChild(el('tr', {}, [
        el('td', { text: chapter }),
        el('td', { text: Object.keys(seen).length + ' / ' + questions.length }),
        el('td', { text: acc != null ? acc + '%' : '—' })
      ]));
    });
    if (hasChapters) {
      chapterTable.appendChild(chapterBody);
      root.appendChild(chapterTable);
    } else root.appendChild(el('p', { className: 'text-muted', text: 'No question chapters are loaded yet.' }));
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: '14-day activity' }));
    var activity = App.store.getActivity(14, certId);
    var maxC = Math.max.apply(null, activity.map(function (d) { return d.count; }).concat([1]));
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'activity-chart');
    svg.setAttribute('viewBox', '0 0 420 80');
    var w = 420 / activity.length;
    activity.forEach(function (d, i) {
      var h = Math.max(2, (d.count / maxC) * 65);
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * w + 3);
      rect.setAttribute('y', 70 - h);
      rect.setAttribute('width', w - 6);
      rect.setAttribute('height', h);
      rect.setAttribute('rx', '3');
      rect.setAttribute('fill', d.count ? 'var(--accent-cyan)' : 'var(--border)');
      svg.appendChild(rect);
    });
    root.appendChild(svg);
    var weak = App.store.weakQuestions(60, certId);
    if (weak.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Weakest areas' }));
      var tagWeak = {};
      weak.forEach(function (w) {
        (w.tags || []).forEach(function (t) {
          if (!tagWeak[t]) tagWeak[t] = [];
          tagWeak[t].push(w.accuracy);
        });
      });
      Object.keys(tagWeak).slice(0, 8).forEach(function (t) {
        var avg = Math.round(tagWeak[t].reduce(function (a, b) { return a + b; }, 0) / tagWeak[t].length);
        root.appendChild(el('div', { className: 'flex-between mb-1' }, [
          el('span', { className: 'chip chip-red', text: t }),
          el('span', { className: 'text-muted mono', text: avg + '% avg' })
        ]));
      });
    }
    var weeklyFc = App.store.weeklyReviewRecommendations(8, certId);
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Flashcard review — this week' }));
    if (!weeklyFc.length) {
      root.appendChild(el('p', { className: 'text-muted', text: 'No flashcard difficulties recorded this week.' }));
    } else {
      weeklyFc.forEach(function (w) {
        var row = el('div', { className: 'flex-between mb-1' });
        var label = el('div', { className: 'flex gap-sm', style: { alignItems: 'center', flexWrap: 'wrap' } });
        label.appendChild(el('span', { className: 'chip chip-red', text: w.tag }));
        label.appendChild(el('span', { className: 'text-muted', style: { fontSize: '0.82rem' },
          text: (w.cert || '') + (w.chapter ? ' → ' + w.chapter : '') }));
        row.appendChild(label);
        row.appendChild(el('span', { className: 'text-muted mono', text: compactNumber(w.agains) + ' again · ' + compactNumber(w.cards) + ' cards' }));
        root.appendChild(row);
      });
    }
    var exams = App.store.getExams(certId);
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Exam history' }));
    if (!exams.length) root.appendChild(el('p', { className: 'text-muted', text: 'No exam attempts yet.' }));
    else {
      var table = el('table', { className: 'ref-table' });
      table.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Date' }), el('th', { text: 'Cert' }), el('th', { text: 'Score' }), el('th', { text: 'Result' })])]));
      var tbody = el('tbody');
      exams.slice(0, 20).forEach(function (ex) {
        tbody.appendChild(el('tr', {}, [
          el('td', { text: utils.formatDate(ex.ts) }),
          el('td', { text: ex.cert }),
          el('td', { text: ex.score + '%' }),
          el('td', {}, [el('span', { className: 'chip ' + (ex.passed ? 'chip-green' : 'chip-red'), text: ex.passed ? 'Pass' : 'Fail' })])
        ]));
      });
      table.appendChild(tbody);
      root.appendChild(table);
    }
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Export' }));
    var expRow = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'CSV answer log',
      onClick: function () {
        utils.downloadBlob(new Blob([App.store.exportAnswersCSV(certId)], { type: 'text/csv' }), 'reviewapp-answers.csv');
      }
    }));
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'JSON full backup',
      onClick: function () {
        utils.downloadBlob(new Blob([JSON.stringify(App.store.exportFullBackup(), null, 2)], { type: 'application/json' }), 'reviewapp-backup.json');
      }
    }));
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'Markdown report',
      onClick: function () {
        utils.downloadBlob(new Blob([buildMarkdownReport(certId)], { type: 'text/markdown' }), 'reviewapp-report.md');
      }
    }));
    root.appendChild(expRow);
  }

  function viewStats(root) {
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    if (!cert) {
      root.appendChild(el('h1', { text: 'Statistics' }));
      root.appendChild(emptyState('No certification selected', 'Pick a certification from the Current certification picker to see analytics.'));
      return;
    }

    var questions = App.content.getByCert('questions', certId);
    var cards = App.content.getByCert('flashcards', certId);
    var labs = App.content.getByCert('labs', certId);
    var allAnswers = App.store.getAnswers({ cert: certId });
    var allReviews = App.store.getCardReviews({ cert: certId });
    var exams = App.store.getExams(certId);
    var labsDone = App.store.get('labsDone', {});
    var certColor = cert.color || 'var(--accent-cyan)';
    var selectedDays = 14;

    function chapterNumber(name, fallback) {
      var n = App.content.chapterNumber ? App.content.chapterNumber(name) : null;
      return n == null ? String(fallback + 1).padStart(2, '0') : String(n).padStart(2, '0');
    }

    function chapterTitle(name) {
      var value = String(name || 'General');
      return value.replace(/^Ch\s*\d+\s*[·:-]?\s*/i, '') || value;
    }

    function chapterKeyFor(type, chapter) {
      if (!chapter) return null;
      return App.content.findChapter ? App.content.findChapter(certId, type, chapter) : chapter;
    }

    function dayStart(ts) {
      var d = new Date(ts || Date.now());
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }

    function sinceFor(days) {
      if (days == null) return 0;
      return dayStart(Date.now()) - (days - 1) * 86400000;
    }

    function inRange(ts, days) {
      return !!ts && ts >= sinceFor(days);
    }

    function uniqueCount(items, key) {
      var seen = {};
      items.forEach(function (item) { if (item && item[key]) seen[item[key]] = true; });
      return Object.keys(seen).length;
    }

    function percent(correct, total) {
      return total ? Math.round((correct / total) * 100) : null;
    }

    function accuracy(items) {
      return percent(items.filter(function (a) { return !!a.correct; }).length, items.length);
    }

    function relativeChange(current, previous) {
      if (current == null || previous == null || !previous || current < 0) return null;
      return Math.round(current - previous);
    }

    function svgNode(tag, attrs) {
      var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
      return node;
    }

    function animateMetric(node, value, suffix) {
      if (value == null) { node.textContent = '—'; return; }
      suffix = suffix || '';
      if (!App.core.motionEnabled()) { node.textContent = compactNumber(value) + suffix; return; }
      var start = null;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / 700);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = compactNumber(value * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function animatedRing(pct, label) {
      var wrap = el('div', { className: 'stats-ring-wrap' });
      var svg = progressRing(0, 154, certColor);
      svg.classList.add('stats-ring-svg');
      svg.setAttribute('aria-label', (pct == null ? 'No coverage data' : pct + '%') + ' ' + label);
      var fg = svg.querySelector('.progress-ring-fg');
      var circumference = Number(fg.getAttribute('stroke-dasharray')) || 1;
      var target = pct == null ? circumference : circumference - (Math.max(0, Math.min(100, pct)) / 100) * circumference;
      fg.style.strokeDashoffset = String(circumference);
      wrap.appendChild(svg);
      var strong = el('strong', { text: pct == null ? '—' : '0%' });
      wrap.appendChild(el('div', { className: 'stats-ring-center' }, [strong, el('span', { text: label })]));
      function finish() { fg.style.strokeDashoffset = String(target); }
      if (App.core.motionEnabled()) requestAnimationFrame(function () { requestAnimationFrame(finish); });
      else finish();
      if (pct != null) animateMetric(strong, pct, '%');
      return wrap;
    }

    function section(kicker, title, hint, className) {
      var panel = el('section', { className: 'stats-section' + (className ? ' ' + className : '') });
      var head = el('div', { className: 'stats-section-head' });
      head.appendChild(el('div', {}, [el('div', { className: 'stats-kicker', text: kicker || 'Analytics' }), el('h2', { text: title })]));
      if (hint) head.appendChild(el('span', { className: 'stats-section-hint', text: hint }));
      panel.appendChild(head);
      return panel;
    }

    function metricTile(label, value, detail, tone) {
      var tile = el('article', { className: 'stats-metric' + (tone ? ' ' + tone : '') });
      var valueEl = el('strong', { className: 'stats-metric-value' });
      tile.appendChild(valueEl);
      tile.appendChild(el('span', { className: 'stats-metric-label', text: label }));
      if (detail) tile.appendChild(el('small', { className: 'stats-metric-detail', text: detail }));
      if (typeof value === 'number') animateMetric(valueEl, value, '');
      else valueEl.textContent = value == null ? '—' : String(value);
      return tile;
    }

    function emptyPanel(title, message) {
      return el('div', { className: 'stats-empty' }, [el('strong', { text: title }), el('p', { text: message })]);
    }

    function filtered(items, days) {
      return items.filter(function (item) { return !days || inRange(item.ts, days); });
    }

    function activityEvents() {
      var events = [];
      allAnswers.forEach(function (a) { events.push({ ts: a.ts, kind: 'quiz', chapter: a.chapter, value: a.correct ? 1 : 0 }); });
      allReviews.forEach(function (r) { events.push({ ts: r.ts || r.sessionTs, kind: 'flashcards', chapter: r.chapter, value: r.outcome === 'next' ? 1 : 0 }); });
      labs.forEach(function (lab) { if (labsDone[lab._id]) events.push({ ts: labsDone[lab._id], kind: 'labs', chapter: lab._chapter, value: 1 }); });
      return events.filter(function (e) { return e.ts; }).sort(function (a, b) { return a.ts - b.ts; });
    }

    function streaks(events) {
      var days = {};
      events.forEach(function (event) { days[dayStart(event.ts)] = true; });
      var keys = Object.keys(days).map(Number).sort(function (a, b) { return a - b; });
      var longest = 0, run = 0, previous = null;
      keys.forEach(function (key) {
        if (previous != null && key === previous + 86400000) run++;
        else run = 1;
        if (run > longest) longest = run;
        previous = key;
      });
      var cursor = dayStart(Date.now());
      if (!days[cursor]) cursor -= 86400000;
      var current = 0;
      while (days[cursor]) { current++; cursor -= 86400000; }
      return { current: current, longest: longest, activeDays: keys.length };
    }

    function buildChapterRows() {
      var canonical = App.store.chapterPerformance(certId);
      return canonical.map(function (item, index) {
        var chapter = item.chapter;
        var qMap = App.content.getChapters(certId, 'questions');
        var fMap = App.content.getChapters(certId, 'flashcards');
        var lMap = App.content.getChapters(certId, 'labs');
        var qKey = Object.keys(qMap).find(function (key) { return key === chapter || (App.content.chapterNumber(key) != null && App.content.chapterNumber(key) === App.content.chapterNumber(chapter)); });
        var fKey = Object.keys(fMap).find(function (key) { return key === chapter || (App.content.chapterNumber(key) != null && App.content.chapterNumber(key) === App.content.chapterNumber(chapter)); });
        var lKey = Object.keys(lMap).find(function (key) { return key === chapter || (App.content.chapterNumber(key) != null && App.content.chapterNumber(key) === App.content.chapterNumber(chapter)); });
        var qItems = qKey ? qMap[qKey] : [];
        var fItems = fKey ? fMap[fKey] : [];
        var lItems = lKey ? lMap[lKey] : [];
        var qAnswers = App.store.getAnswers({ cert: certId }).filter(function (a) { return a.chapter === qKey || (App.content.chapterNumber(a.chapter) != null && App.content.chapterNumber(a.chapter) === App.content.chapterNumber(chapter)); });
        var fReviews = App.store.getCardReviews({ cert: certId }).filter(function (r) { return r.chapter === fKey || (App.content.chapterNumber(r.chapter) != null && App.content.chapterNumber(r.chapter) === App.content.chapterNumber(chapter)); });
        var qSeen = {}; qAnswers.forEach(function (a) { if (a.qId) qSeen[a.qId] = true; });
        var fSeen = {}; fReviews.forEach(function (r) { if (r.cardId) fSeen[r.cardId] = true; });
        var labsDoneCount = lItems.filter(function (lab) { return !!labsDone[lab._id]; }).length;
        return {
          key: chapter, number: chapterNumber(chapter, index), title: chapterTitle(chapter),
          qKey: qKey || chapter, fKey: fKey, lKey: lKey, questions: qItems, cards: fItems, labs: lItems,
          qAnswers: qAnswers, fReviews: fReviews, seenQuestions: item.questionsSeen, reviewedCards: item.flashcardsReviewed,
          labsDone: labsDoneCount, coverage: item.coverage, accuracy: item.questionAccuracy,
          // Keep the dashboard's chapter numbers tied to the same canonical
          // performance record used by Stats, including cards and quizzes.
          questionTotal: item.questions, cardTotal: item.flashcards, labTotal: item.labs,
          status: item.coverage >= 90 && (item.questionAccuracy == null || item.questionAccuracy >= 80) ? 'Strong' : item.questionAccuracy != null && item.questionAccuracy < 60 && qAnswers.length >= 3 ? 'Needs review' : item.coverage > 0 ? 'In progress' : 'Not started',
          lastTs: Math.max.apply(null, qAnswers.concat(fReviews).map(function (x) { return x.ts || x.sessionTs || 0; }).concat(lItems.map(function (x) { return labsDone[x._id] || 0; })).concat([0]))
        };
      });
    }

    /* Legacy chapter-row implementation removed; the store is the canonical
       source for every chapter metric shown in Stats. */
    /*
      function addKeys(map) {
        Object.keys(map).forEach(function (key) {
          var number = App.content.chapterNumber ? App.content.chapterNumber(key) : null;
          var existing = keys.find(function (item) {
            return (number != null && item.number === number) || item.key === key;
          });
          if (!existing) keys.push({ key: key, number: number });
        });
      }
      addKeys(qMap); addKeys(fMap); addKeys(lMap);
      keys.sort(function (a, b) {
        if (a.number != null && b.number != null) return a.number - b.number;
        if (a.number != null) return -1;
        if (b.number != null) return 1;
        return a.key.localeCompare(b.key);
      });

      return keys.map(function (entry, index) {
        var chapter = entry.key;
        var qKey = chapterKeyFor('questions', chapter) || chapter;
        var fKey = chapterKeyFor('flashcards', chapter);
        var lKey = chapterKeyFor('labs', chapter);
        var qItems = qMap[qKey] || [];
        var fItems = fKey ? (fMap[fKey] || []) : [];
        var lItems = lKey ? (lMap[lKey] || []) : [];
        var qAnswers = allAnswers.filter(function (a) { return chapterKeyFor('questions', a.chapter) === qKey; });
        var qSeen = {}; qAnswers.forEach(function (a) { if (a.qId) qSeen[a.qId] = true; });
        var fReviews = allReviews.filter(function (r) {
          return chapterKeyFor('flashcards', r.chapter) === fKey || (!fKey && chapterKeyFor('questions', r.chapter) === qKey);
        });
        var fSeen = {}; fReviews.forEach(function (r) { if (r.cardId) fSeen[r.cardId] = true; });
        var labsDoneCount = lItems.filter(function (lab) { return !!labsDone[lab._id]; }).length;
        var components = [];
        if (qItems.length) components.push(qItems.length ? Object.keys(qSeen).length / qItems.length : 0);
        if (fItems.length) components.push(fItems.length ? Object.keys(fSeen).length / fItems.length : 0);
        if (lItems.length) components.push(labsDoneCount / lItems.length);
        var coverage = components.length ? Math.round((components.reduce(function (a, b) { return a + b; }, 0) / components.length) * 100) : 0;
        var qAccuracy = accuracy(qAnswers);
        var status = coverage >= 90 && (qAccuracy == null || qAccuracy >= 80) ? 'Strong' : coverage > 0 ? 'In progress' : 'Not started';
        if (qAccuracy != null && qAccuracy < 60 && qAnswers.length >= 3) status = 'Needs review';
        return {
          key: chapter,
          number: chapterNumber(chapter, index),
          title: chapterTitle(chapter),
          qKey: qKey,
          fKey: fKey,
          lKey: lKey,
          questions: qItems,
          cards: fItems,
          labs: lItems,
          qAnswers: qAnswers,
          fReviews: fReviews,
          seenQuestions: Object.keys(qSeen).length,
          reviewedCards: Object.keys(fSeen).length,
          labsDone: labsDoneCount,
          coverage: Math.min(100, coverage),
          accuracy: qAccuracy,
          status: status,
          lastTs: Math.max.apply(null, qAnswers.concat(fReviews).map(function (x) { return x.ts || x.sessionTs || 0; }).concat(lItems.map(function (x) { return labsDone[x._id] || 0; })).concat([0]))
        };
      });
    */

    function renderLineChart(points, color, label) {
      var usable = points.filter(function (p) { return p.value != null; });
      if (!usable.length) return emptyPanel('Performance trends will appear here', 'Complete a few study sessions to build a meaningful trend.');
      var svg = svgNode('svg', { class: 'stats-line-chart', viewBox: '0 0 760 240', role: 'img', 'aria-label': label });
      var left = 42, top = 18, width = 690, height = 172;
      [0, 25, 50, 75, 100].forEach(function (tick) {
        var y = top + height - (tick / 100) * height;
        svg.appendChild(svgNode('line', { x1: left, x2: left + width, y1: y, y2: y, class: 'stats-gridline' }));
        var text = svgNode('text', { x: 4, y: y + 4, class: 'stats-axis-label' });
        text.textContent = tick + '%'; svg.appendChild(text);
      });
      var pathPoints = [];
      points.forEach(function (p, i) {
        if (p.value == null) return;
        var x = left + (points.length === 1 ? width / 2 : (i / (points.length - 1)) * width);
        var y = top + height - (p.value / 100) * height;
        pathPoints.push({ x: x, y: y, p: p });
      });
      if (pathPoints.length > 1) {
        var baseline = top + height;
        var gradId = 'stats-area-' + Math.random().toString(36).slice(2, 9);
        var defs = svgNode('defs', {});
        var grad = svgNode('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' });
        grad.appendChild(svgNode('stop', { offset: '0%', 'stop-color': color, 'stop-opacity': '0.22' }));
        grad.appendChild(svgNode('stop', { offset: '100%', 'stop-color': color, 'stop-opacity': '0' }));
        defs.appendChild(grad);
        svg.appendChild(defs);
        var areaD = 'M' + pathPoints[0].x + ' ' + baseline;
        pathPoints.forEach(function (point) { areaD += ' L' + point.x + ' ' + point.y; });
        areaD += ' L' + pathPoints[pathPoints.length - 1].x + ' ' + baseline + ' Z';
        svg.appendChild(svgNode('path', { d: areaD, class: 'stats-area', fill: 'url(#' + gradId + ')' }));
        var path = svgNode('path', { d: pathPoints.map(function (point, i) { return (i ? 'L' : 'M') + point.x + ' ' + point.y; }).join(' '), class: 'stats-line', stroke: color });
        svg.appendChild(path);
        var length = 1000;
        try { length = path.getTotalLength(); } catch (e) {}
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = App.core.motionEnabled() ? length : 0;
        if (App.core.motionEnabled()) requestAnimationFrame(function () { path.style.strokeDashoffset = '0'; });
      }
      pathPoints.forEach(function (point) {
        var circle = svgNode('circle', { cx: point.x, cy: point.y, r: 4, class: 'stats-point', fill: color, tabindex: '0' });
        circle.setAttribute('aria-label', point.p.label + ': ' + point.p.value + '%');
        var title = svgNode('title', {});
        title.textContent = point.p.label + ' · ' + point.p.value + '% · ' + compactNumber(point.p.total) + ' responses';
        circle.appendChild(title); svg.appendChild(circle);
      });
      points.forEach(function (p, i) {
        if (i % Math.max(1, Math.ceil(points.length / 7)) !== 0 && i !== points.length - 1) return;
        var x = left + (points.length === 1 ? width / 2 : (i / (points.length - 1)) * width);
        var text = svgNode('text', { x: x, y: 220, class: 'stats-axis-label stats-axis-date', 'text-anchor': 'middle' });
        text.textContent = p.label; svg.appendChild(text);
      });
      return svg;
    }

    function renderHorizontalBars(items, color) {
      var wrap = el('div', { className: 'stats-bars' });
      if (!items.length) { wrap.appendChild(emptyPanel('No comparison data yet', 'Use more than one quiz mode to compare performance.')); return wrap; }
      items.forEach(function (item) {
        var row = el('div', { className: 'stats-bar-item' });
        row.appendChild(el('div', { className: 'stats-bar-meta' }, [el('span', { text: item.label }), el('strong', { text: item.value == null ? '—' : item.value + '%' })]));
        var track = el('div', { className: 'stats-bar-track' });
        var fill = el('span', { className: 'stats-bar-fill', style: { width: '0%', backgroundColor: item.color || color } });
        track.appendChild(fill); row.appendChild(track); wrap.appendChild(row);
        if (item.value != null) {
          if (App.core.motionEnabled()) requestAnimationFrame(function () { fill.style.width = item.value + '%'; });
          else fill.style.width = item.value + '%';
        }
      });
      return wrap;
    }

    function renderDonut(correct, total, color, title) {
      if (!total) return emptyPanel('No answer history yet', 'Complete a quiz or exam to see the answer distribution.');
      var pct = Math.round((correct / total) * 100);
      var svg = svgNode('svg', { class: 'stats-donut', viewBox: '0 0 100 100', role: 'img', 'aria-label': title + ': ' + compactNumber(correct) + ' correct of ' + compactNumber(total) });
      var r = 37, c = 2 * Math.PI * r;
      svg.appendChild(svgNode('circle', { cx: 50, cy: 50, r: r, class: 'stats-donut-bg', fill: 'none', 'stroke-width': 10 }));
      var fg = svgNode('circle', { cx: 50, cy: 50, r: r, class: 'stats-donut-fg', fill: 'none', 'stroke-width': 10, stroke: color, 'stroke-dasharray': c, 'stroke-dashoffset': c, transform: 'rotate(-90 50 50)' });
      svg.appendChild(fg);
      var text = svgNode('text', { x: 50, y: 48, class: 'stats-donut-value', 'text-anchor': 'middle' }); text.textContent = '0%'; svg.appendChild(text);
      var sub = svgNode('text', { x: 50, y: 60, class: 'stats-donut-label', 'text-anchor': 'middle' }); sub.textContent = title; svg.appendChild(sub);
      var target = c - (correct / total) * c;
      if (App.core.motionEnabled()) requestAnimationFrame(function () { fg.style.strokeDashoffset = target; }); else fg.style.strokeDashoffset = target;
      animateMetric(text, pct, '%');
      return svg;
    }

    function renderOutcomeTrend(reviews, days) {
      var points = makeBuckets(days, reviews, function (r) { return r.outcome === 'next' ? 1 : 0; });
      points.forEach(function (p) { p.value = p.total ? Math.round((p.success / p.total) * 100) : null; });
      return renderLineChart(points, certColor, 'Flashcard Next rate over time');
    }

    function makeBuckets(days, items, successFn) {
      var events = items.filter(function (x) { return x.ts || x.sessionTs; });
      var today = dayStart(Date.now());
      var count = days == null ? 12 : Math.min(Math.max(days, 7), 30);
      var oldest = events.length ? Math.min.apply(null, events.map(function (x) { return dayStart(x.ts || x.sessionTs); })) : today - (count - 1) * 86400000;
      var span = days == null ? Math.max(1, Math.ceil((today - oldest) / 86400000) + 1) : days;
      var bucketDays = days == null ? Math.max(1, Math.ceil(span / count)) : 1;
      var start = days == null ? today - (count * bucketDays - 1) * 86400000 : today - (count - 1) * 86400000;
      var points = [];
      for (var i = 0; i < count; i++) {
        var begin = start + i * bucketDays * 86400000;
        points.push({ begin: begin, end: begin + bucketDays * 86400000, total: 0, success: 0, value: null, label: bucketDays > 1 ? utils.formatDate(begin).slice(0, 6) : new Date(begin).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) });
      }
      events.forEach(function (event) {
        var ts = dayStart(event.ts || event.sessionTs);
        var idx = Math.floor((ts - start) / (bucketDays * 86400000));
        if (idx < 0 || idx >= points.length) return;
        points[idx].total++;
        if (successFn(event)) points[idx].success++;
      });
      points.forEach(function (p) { p.value = p.total ? Math.round((p.success / p.total) * 100) : null; });
      return points;
    }

    function launchChapter(type, row) {
      if (type === 'quiz' && row.questions.length) {
        sessionStorage.setItem('reviewapp.quizSetup', JSON.stringify({ mode: 'chapter', cert: certId, chapter: row.qKey }));
        App.core.navigate('#/quiz');
      } else if (type === 'flashcards' && row.fKey) {
        sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: row.fKey }));
        App.core.navigate('#/flashcards');
      } else if (type === 'labs' && row.lKey) {
        sessionStorage.setItem('reviewapp.labsSetup', JSON.stringify({ cert: certId, chapter: row.lKey }));
        App.core.navigate('#/labs');
      }
    }

    var rootPage = el('div', { className: 'stats-page' });
    rootPage.style.setProperty('--stats-accent', certColor);
    var header = el('header', { className: 'stats-header' });
    var headerCopy = el('div', { className: 'stats-header-copy' });
    headerCopy.appendChild(el('div', { className: 'stats-kicker', text: 'Active certification · Analysis center' }));
    headerCopy.appendChild(el('h1', { text: 'Statistics' }));
    headerCopy.appendChild(el('p', { text: cert.name + ' · Detailed performance, progress, and study analytics' }));
    header.appendChild(headerCopy);
    header.appendChild(el('div', { className: 'stats-cert-badge', style: { borderColor: certColor, color: certColor } }, [el('span', { className: 'stats-cert-dot', style: { background: certColor } }), el('span', { text: cert.name })]));
    rootPage.appendChild(header);

    var toolbar = el('div', { className: 'stats-toolbar', 'aria-label': 'Statistics controls' });
    toolbar.appendChild(el('span', { className: 'stats-toolbar-label', text: 'Analysis range' }));
    var rangeSelect = el('select', { className: 'form-control stats-range-select', 'aria-label': 'Analysis range' });
    [[7, '7 days'], [14, '14 days'], [30, '30 days'], [90, '90 days'], [null, 'All time']].forEach(function (option) {
      rangeSelect.appendChild(el('option', { value: option[0] == null ? 'all' : String(option[0]), text: option[1] }));
    });
    rangeSelect.value = '14';
    toolbar.appendChild(rangeSelect);
    var rangeLabel = el('span', { className: 'stats-toolbar-range' });
    toolbar.appendChild(rangeLabel);
    toolbar.appendChild(el('span', { className: 'stats-toolbar-note', text: 'All metrics are scoped to ' + cert.name }));
    rootPage.appendChild(toolbar);

    function updateRangeLabel() {
      var endTs = Date.now();
      var text;
      if (selectedDays == null) {
        var evts = activityEvents();
        var first = evts.length ? evts[0].ts : null;
        text = first ? utils.formatDate(first) + ' → ' + utils.formatDate(endTs) : 'All recorded activity';
      } else {
        text = utils.formatDate(sinceFor(selectedDays)) + ' → ' + utils.formatDate(endTs);
      }
      rangeLabel.textContent = text;
    }
    updateRangeLabel();

    var body = el('div', { className: 'stats-body' });
    rootPage.appendChild(body);
    root.appendChild(rootPage);

    function renderBody() {
      body.innerHTML = '';
      var rangeAnswers = filtered(allAnswers, selectedDays);
      var rangeReviews = filtered(allReviews, selectedDays);
      var regularAnswers = allAnswers.filter(function (a) { return a.mode !== 'exam'; });
      var rangeRegularAnswers = rangeAnswers.filter(function (a) { return a.mode !== 'exam'; });
      var currentAccuracy = accuracy(regularAnswers);
      var totalAccuracy = accuracy(allAnswers);
      var seenQuestions = {}; allAnswers.forEach(function (a) { if (a.qId) seenQuestions[a.qId] = true; });
      var reviewedCards = {}; allReviews.forEach(function (r) { if (r.cardId) reviewedCards[r.cardId] = true; });
      var coverage = questions.length ? Math.round((Object.keys(seenQuestions).length / questions.length) * 100) : (cards.length ? Math.round((Object.keys(reviewedCards).length / cards.length) * 100) : null);
      var rows = buildChapterRows();
      var completedChapters = rows.filter(function (r) { return r.coverage >= 100; }).length;
      var inProgressChapters = rows.filter(function (r) { return r.coverage > 0 && r.coverage < 100; }).length;
      var streak = streaks(activityEvents());
      var studyDays = streak.activeDays;
      var prevStart = selectedDays == null ? 0 : sinceFor(selectedDays) - selectedDays * 86400000;
      var prevAnswers = selectedDays == null ? [] : regularAnswers.filter(function (a) { return a.ts >= prevStart && a.ts < sinceFor(selectedDays); });
      var delta = selectedDays == null || prevAnswers.length < 3 ? null : relativeChange(accuracy(rangeRegularAnswers), accuracy(prevAnswers));

      var snapshot = section('Overview', 'Performance snapshot', selectedDays == null ? 'All recorded activity' : 'Current certification · selected period', 'stats-snapshot-section');
      var snapshotGrid = el('div', { className: 'stats-metric-grid' });
      snapshotGrid.appendChild(metricTile('Overall accuracy', totalAccuracy == null ? '—' : totalAccuracy + '%', delta == null ? (allAnswers.length ? 'Based on ' + compactNumber(allAnswers.length) + ' answers' : 'No quiz history yet') : (delta >= 0 ? '+' : '') + delta + ' pts vs previous ' + selectedDays + ' days', delta != null && delta >= 0 ? 'positive' : delta != null ? 'negative' : ''));
      snapshotGrid.appendChild(metricTile('Certification coverage', coverage == null ? '—' : coverage + '%', questions.length ? compactNumber(Object.keys(seenQuestions).length) + ' / ' + compactNumber(questions.length) + ' questions explored' : 'No question content loaded', 'accent'));
      snapshotGrid.appendChild(metricTile('Questions answered', allAnswers.length ? allAnswers.length : '—', allAnswers.length ? compactNumber(uniqueCount(allAnswers, 'qId')) + ' unique questions' : 'Complete a quiz to begin'));
      snapshotGrid.appendChild(metricTile('Flashcards reviewed', allReviews.length ? allReviews.length : '—', allReviews.length ? compactNumber(Object.keys(reviewedCards).length) + ' unique cards' : 'No card reviews yet'));
      snapshotGrid.appendChild(metricTile('Study streak', streak.current ? streak.current + ' days' : '—', streak.longest ? 'Best: ' + streak.longest + ' days' : 'No active streak yet'));
      snapshotGrid.appendChild(metricTile('Active study days', studyDays ? studyDays : '—', studyDays ? 'Across all recorded activity' : 'No activity yet'));
      snapshot.appendChild(snapshotGrid);
      body.appendChild(snapshot);

      var insights = section('Interpretation', 'Insights', 'The clearest signals from your current data', 'stats-insights-section');
      var insightGrid = el('div', { className: 'stats-insight-grid' });
      var weakest = rows.filter(function (r) { return r.accuracy != null && r.qAnswers.length >= 3; }).sort(function (a, b) { return a.accuracy - b.accuracy; })[0];
      var best = rows.filter(function (r) { return r.accuracy != null && r.qAnswers.length >= 3; }).sort(function (a, b) { return b.accuracy - a.accuracy; })[0];
      var flashNow = rangeReviews.length ? Math.round((rangeReviews.filter(function (r) { return r.outcome === 'again'; }).length / rangeReviews.length) * 100) : null;
      var flashPrevious = prevStart ? allReviews.filter(function (r) { return r.ts >= prevStart && r.ts < sinceFor(selectedDays); }) : [];
      var flashOldRate = flashPrevious.length ? Math.round((flashPrevious.filter(function (r) { return r.outcome === 'again'; }).length / flashPrevious.length) * 100) : null;
      var insightsData = [];
      if (weakest) insightsData.push({ tone: 'warn', icon: '!', title: weakest.title + ' needs attention', text: weakest.accuracy + '% accuracy across ' + weakest.qAnswers.length + ' question attempts.', action: 'Practice quiz', fn: function () { launchChapter('quiz', weakest); } });
      if (delta != null && Math.abs(delta) >= 2) insightsData.push({ tone: delta > 0 ? 'good' : 'warn', icon: delta > 0 ? '↑' : '↓', title: delta > 0 ? 'Accuracy is improving' : 'Accuracy is slipping', text: (delta > 0 ? '+' : '') + delta + ' percentage points compared with the previous period.', action: 'View trend', fn: function () { var target = rootPage.querySelector('.stats-trend-section'); if (target) target.scrollIntoView({ behavior: App.core.motionEnabled() ? 'smooth' : 'auto' }); } });
      if (flashNow != null && flashOldRate != null && Math.abs(flashNow - flashOldRate) >= 3) insightsData.push({ tone: flashNow < flashOldRate ? 'good' : 'warn', icon: flashNow < flashOldRate ? '↓' : '↑', title: flashNow < flashOldRate ? 'Flashcard retention is improving' : 'Flashcards need reinforcement', text: 'Again rate moved from ' + flashOldRate + '% to ' + flashNow + '% in the selected period.', action: 'Open Flashcards', fn: function () { App.core.navigate('#/flashcards'); } });
      if (!insightsData.length && best) insightsData.push({ tone: 'good', icon: '✓', title: best.title + ' is a strength', text: best.accuracy + '% accuracy across ' + best.qAnswers.length + ' question attempts.', action: 'Keep practicing', fn: function () { launchChapter('quiz', best); } });
      if (exams.length) {
        var threshold = (App.store.getSettings().passThreshold && App.store.getSettings().passThreshold[certId]) || 70;
        var recentExams = exams.slice(0, 3);
        var passedRecent = recentExams.filter(function (e) { return e.passed; }).length;
        insightsData.push({ tone: passedRecent === recentExams.length ? 'good' : 'neutral', icon: passedRecent === recentExams.length ? '✓' : 'i', title: passedRecent === recentExams.length ? 'Exam trend is on target' : 'Exam practice still has room', text: compactNumber(passedRecent) + ' of ' + compactNumber(recentExams.length) + ' recent simulations passed the ' + threshold + '% threshold.', action: 'View exam analysis', fn: function () { var target = rootPage.querySelector('.stats-exam-section'); if (target) target.scrollIntoView({ behavior: App.core.motionEnabled() ? 'smooth' : 'auto' }); } });
      }
      insightsData.slice(0, 4).forEach(function (item) {
        var card = el('article', { className: 'stats-insight ' + item.tone });
        card.appendChild(el('span', { className: 'stats-insight-icon', text: item.icon, 'aria-hidden': 'true' }));
        card.appendChild(el('div', { className: 'stats-insight-copy' }, [el('strong', { html: inlineHtml(item.title) }), el('p', { html: inlineHtml(item.text) })]));
        card.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: item.action, onClick: item.fn }));
        insightGrid.appendChild(card);
      });
      if (!insightsData.length) insightGrid.appendChild(emptyPanel('Insights will appear as you study', 'Complete a few quizzes or card reviews to reveal meaningful patterns.'));
      insights.appendChild(insightGrid); body.appendChild(insights);

      var trend = section('Performance', 'Performance over time', 'How your accuracy or retention is changing', 'stats-trend-section');
      var trendSelect = el('select', { className: 'form-control stats-inline-select', 'aria-label': 'Performance trend metric' });
      [['quiz', 'Quiz accuracy'], ['flashcards', 'Flashcard Next rate'], ['combined', 'Combined success']].forEach(function (option) { trendSelect.appendChild(el('option', { value: option[0], text: option[1] })); });
      var trendHead = trend.querySelector('.stats-section-head');
      trendHead.appendChild(trendSelect);
      var trendMode = 'quiz';
      var trendChart = el('div', { className: 'stats-chart-wrap' });
      function updateTrend() {
        var trendItems = trendMode === 'quiz' ? rangeAnswers.filter(function (a) { return a.mode !== 'exam'; }) : trendMode === 'flashcards' ? rangeReviews : rangeAnswers.concat(rangeReviews);
        var trendPoints = makeBuckets(selectedDays, trendItems, function (item) { return trendMode === 'flashcards' ? item.outcome === 'next' : trendMode === 'combined' ? (item.outcome ? item.outcome === 'next' : !!item.correct) : !!item.correct; });
        trendChart.innerHTML = '';
        trendChart.appendChild(renderLineChart(trendPoints, certColor, trendMode === 'flashcards' ? 'Flashcard Next rate over time' : 'Accuracy over time'));
      }
      trendSelect.addEventListener('change', function () { trendMode = trendSelect.value; updateTrend(); });
      updateTrend(); trend.appendChild(trendChart); body.appendChild(trend);

      var coverageSection = section('Progress', 'Certification progress & coverage', 'Coverage is how much content you have explored', 'stats-coverage-section');
      var coverageGrid = el('div', { className: 'stats-coverage-grid' });
      var coverageVisual = el('div', { className: 'stats-coverage-visual' });
      coverageVisual.appendChild(animatedRing(coverage, 'Coverage'));
      coverageVisual.appendChild(el('p', { className: 'stats-visual-caption', text: questions.length ? 'Question coverage · ' + compactNumber(Object.keys(seenQuestions).length) + ' of ' + compactNumber(questions.length) : 'Study content to build coverage' }));
      coverageGrid.appendChild(coverageVisual);
      var coverageDetails = el('div', { className: 'stats-coverage-details' });
      function coverageRow(label, done, total, tone) {
        var row = el('div', { className: 'stats-coverage-row' });
        var pct = total ? Math.round(done / total * 100) : null;
        row.appendChild(el('div', { className: 'stats-coverage-meta' }, [el('span', { text: label }), el('strong', { text: total ? compactNumber(done) + ' / ' + compactNumber(total) : '—' })]));
        var track = el('div', { className: 'stats-bar-track' });
        track.appendChild(el('span', { className: 'stats-bar-fill', style: { width: '0%', backgroundColor: tone || certColor } }));
        row.appendChild(track);
        row.appendChild(el('span', { className: 'stats-coverage-percent', text: pct == null ? 'No data' : pct + '%' }));
        var fill = track.firstChild;
        if (pct != null) { if (App.core.motionEnabled()) requestAnimationFrame(function () { fill.style.width = pct + '%'; }); else fill.style.width = pct + '%'; }
        coverageDetails.appendChild(row);
      }
      coverageRow('Questions explored', Object.keys(seenQuestions).length, questions.length, certColor);
      coverageRow('Flashcards reviewed', Object.keys(reviewedCards).length, cards.length, 'var(--accent-cyan)');
      coverageRow('Labs completed', labs.filter(function (lab) { return !!labsDone[lab._id]; }).length, labs.length, 'var(--accent-green)');
      coverageRow('Chapters completed', completedChapters, rows.length, 'var(--accent-amber)');
      coverageDetails.appendChild(el('div', { className: 'stats-coverage-summary' }, [el('span', { text: inProgressChapters + ' chapters in progress' }), el('span', { text: Math.max(0, rows.length - completedChapters - inProgressChapters) + ' not started' })]));
      coverageGrid.appendChild(coverageDetails); coverageSection.appendChild(coverageGrid); body.appendChild(coverageSection);

      var chapterSection = section('Structure', 'Chapter performance', rows.length ? compactNumber(rows.length) + ' chapters · click a row for detail' : 'No chapter content loaded', 'stats-chapters-section');
      if (!rows.length) chapterSection.appendChild(emptyPanel('No chapters available', 'Add certification content and reload the app.'));
      else {
        var chapterTable = el('div', { className: 'stats-chapter-table', role: 'table', 'aria-label': 'Chapter performance' });
        var tableHead = el('div', { className: 'stats-chapter-head', role: 'row' });
        ['Chapter', 'Coverage', 'Accuracy', 'Questions', 'Cards', 'Labs', 'Status'].forEach(function (label) { tableHead.appendChild(el('span', { role: 'columnheader', text: label })); });
        chapterTable.appendChild(tableHead);
        rows.forEach(function (row) {
          var details = el('details', { className: 'stats-chapter-details' });
          var summary = el('summary', { className: 'stats-chapter-row', role: 'row' });
          summary.appendChild(el('span', { className: 'stats-chapter-name' }, [el('b', { style: { color: certColor }, text: row.number }), el('span', { html: inlineHtml(row.title) })]));
          summary.appendChild(el('span', { className: 'stats-chapter-coverage' }, [el('i', { style: { width: row.coverage + '%', background: certColor } }), el('em', { text: row.coverage + '%' })]));
          summary.appendChild(el('span', { text: row.accuracy == null ? '—' : row.accuracy + '%' }));
          summary.appendChild(el('span', { text: row.questions.length ? row.seenQuestions + ' / ' + row.questions.length : '—' }));
          summary.appendChild(el('span', { text: row.cards.length ? row.reviewedCards + ' / ' + row.cards.length : '—' }));
          summary.appendChild(el('span', { text: row.labs.length ? row.labsDone + ' / ' + row.labs.length : '—' }));
          summary.appendChild(el('span', { className: 'stats-status ' + row.status.toLowerCase().replace(/\s/g, '-'), text: row.status }));
          details.appendChild(summary);
          var detail = el('div', { className: 'stats-chapter-detail' });
          detail.appendChild(el('div', { className: 'stats-chapter-detail-copy' }, [el('strong', { html: inlineHtml(row.title) }), el('p', { className: 'text-muted', text: (row.qAnswers.length ? compactNumber(row.qAnswers.length) + ' question attempts' : 'No quiz attempts') + (row.fReviews.length ? ' · ' + compactNumber(row.fReviews.length) + ' flashcard reviews' : '') + (row.lastTs ? ' · Last studied ' + utils.formatDate(row.lastTs) : '') })]));
          var actions = el('div', { className: 'stats-action-row' });
          if (row.questions.length) actions.appendChild(el('button', { className: 'btn btn-primary btn-xs', text: 'Quiz', onClick: function (e) { e.preventDefault(); launchChapter('quiz', row); } }));
          if (row.cards.length) actions.appendChild(el('button', { className: 'btn btn-secondary btn-xs', text: 'Flashcards', onClick: function (e) { e.preventDefault(); launchChapter('flashcards', row); } }));
          if (row.labs.length) actions.appendChild(el('button', { className: 'btn btn-secondary btn-xs', text: 'Labs', onClick: function (e) { e.preventDefault(); launchChapter('labs', row); } }));
          var note = App.content.getChapterNotes(certId).find(function (n) { return n._chapter === row.qKey || (App.content.chapterNumber(n._chapter) != null && App.content.chapterNumber(n._chapter) === App.content.chapterNumber(row.qKey)); });
          if (note) actions.appendChild(el('button', { className: 'btn btn-ghost btn-xs', text: 'Notes', onClick: function (e) { e.preventDefault(); App.core.navigate('#/notes/' + encodeURIComponent(note._id)); } }));
          detail.appendChild(actions); details.appendChild(detail); chapterTable.appendChild(details);
        });
        chapterSection.appendChild(chapterTable);
      }
      body.appendChild(chapterSection);

      var areasSection = section('Priorities', 'Weak areas & strengths', 'Use the evidence to focus your next review', 'stats-areas-section');
      var areasGrid = el('div', { className: 'stats-two-column' });
      var weakPanel = el('div', { className: 'stats-subpanel' });
      weakPanel.appendChild(el('h3', { text: 'Focus areas' }));
      var weakAreas = App.store.flashcardWeakAreas({ days: selectedDays == null ? 3650 : selectedDays, cert: certId }).slice(0, 6);
      if (!weakAreas.length) weakPanel.appendChild(emptyPanel('No weak card areas yet', 'Again marks and repeated difficulty will appear here as you review.'));
      else weakAreas.forEach(function (area) {
        var item = el('div', { className: 'stats-area-item' });
        item.appendChild(el('div', { className: 'stats-area-copy' }, [el('strong', { text: area.tag }), el('small', { text: (area.chapter || 'Certification-wide') + ' · ' + compactNumber(area.attempts) + ' attempts · ' + compactNumber(area.agains) + ' Again' + (area.agains === 1 ? '' : 's') + ' · ' + area.daysSince + 'd ago' })]));
        item.appendChild(el('span', { className: 'stats-area-score ' + (area.improving ? 'improving' : ''), text: area.ratio + '% Again' }));
        item.appendChild(el('button', { className: 'btn btn-secondary btn-xs', text: 'Review', onClick: function () { sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: chapterKeyFor('flashcards', area.chapter) || null })); App.core.navigate('#/flashcards'); } }));
        weakPanel.appendChild(item);
      });
      areasGrid.appendChild(weakPanel);
      var tagMap = {};
      regularAnswers.forEach(function (a) { (a.tags || []).forEach(function (tag) { if (!tagMap[tag]) tagMap[tag] = { total: 0, correct: 0 }; tagMap[tag].total++; if (a.correct) tagMap[tag].correct++; }); });
      var tagList = Object.keys(tagMap).map(function (tag) { return { tag: tag, total: tagMap[tag].total, accuracy: percent(tagMap[tag].correct, tagMap[tag].total) }; }).filter(function (x) { return x.total >= 2 && x.accuracy != null; });
      var strongPanel = el('div', { className: 'stats-subpanel' });
      strongPanel.appendChild(el('h3', { text: 'Strong areas' }));
      tagList.sort(function (a, b) { return b.accuracy - a.accuracy; });
      var strengths = tagList.slice(0, 6);
      if (!strengths.length) strongPanel.appendChild(emptyPanel('Strengths will appear here', 'Answer tagged questions to reveal your strongest topics.'));
      else strengths.forEach(function (area) {
        strongPanel.appendChild(el('div', { className: 'stats-area-item strength' }, [el('div', { className: 'stats-area-copy' }, [el('strong', { text: area.tag }), el('small', { text: compactNumber(area.total) + ' attempts' })]), el('span', { className: 'stats-area-score', text: area.accuracy + '%' })]));
      });
      areasGrid.appendChild(strongPanel); areasSection.appendChild(areasGrid); body.appendChild(areasSection);

      var quizSection = section('Quiz analytics', 'Quiz performance', 'Question-level accuracy across the active certification', 'stats-quiz-section');
      var quizAnswers = regularAnswers;
      var quizGrid = el('div', { className: 'stats-deep-grid' });
      var quizSummary = el('div', { className: 'stats-subpanel' });
      quizSummary.appendChild(el('h3', { text: 'Answer distribution' }));
      var quizTotal = quizAnswers.length, quizCorrect = quizAnswers.filter(function (a) { return a.correct; }).length;
      quizSummary.appendChild(el('div', { className: 'stats-donut-layout' }, [renderDonut(quizCorrect, quizTotal, certColor, 'Correct'), el('div', { className: 'stats-legend' }, [el('div', {}, [el('span', { className: 'stats-legend-dot good' }), el('span', { text: 'Correct · ' + (quizTotal ? compactNumber(quizCorrect) + ' (' + Math.round(quizCorrect / quizTotal * 100) + '%)' : '—') })]), el('div', {}, [el('span', { className: 'stats-legend-dot bad' }), el('span', { text: 'Incorrect · ' + (quizTotal ? compactNumber(quizTotal - quizCorrect) + ' (' + Math.round((quizTotal - quizCorrect) / quizTotal * 100) + '%)' : '—') })])])]));
      quizSummary.appendChild(el('div', { className: 'stats-mini-metrics' }, [metricTile('Quiz sessions', '—', 'Session IDs are not stored for quiz history'), metricTile('Average score', quizTotal ? accuracy(quizAnswers) + '%' : '—', quizTotal ? compactNumber(quizTotal) + ' answers' : 'No quiz history')]));
      quizGrid.appendChild(quizSummary);
      var modeMap = {};
      quizAnswers.forEach(function (a) { var mode = (a.mode || 'random').replace(':skip', ''); if (!modeMap[mode]) modeMap[mode] = []; modeMap[mode].push(a); });
      var modeLabels = { chapter: 'Chapter Focus', random: 'Random Mix', theme: 'Theme Attack', weak: 'Weak Spots', speed: 'Speed Run', practice: 'Practice' };
      var modeItems = Object.keys(modeMap).map(function (mode) { return { label: modeLabels[mode] || mode, value: accuracy(modeMap[mode]) }; }).sort(function (a, b) { return (b.value || 0) - (a.value || 0); });
      var modePanel = el('div', { className: 'stats-subpanel' }); modePanel.appendChild(el('h3', { text: 'Performance by mode' })); modePanel.appendChild(renderHorizontalBars(modeItems, certColor)); quizGrid.appendChild(modePanel);
      quizSection.appendChild(quizGrid); body.appendChild(quizSection);

      var flashSection = section('Flashcards analytics', 'Flashcard review performance', 'Again versus Next across your saved review history', 'stats-flash-section');
      var flashGrid = el('div', { className: 'stats-deep-grid' });
      var fcSummary = el('div', { className: 'stats-subpanel' }); fcSummary.appendChild(el('h3', { text: 'Review effort' }));
      var nextCount = allReviews.filter(function (r) { return r.outcome === 'next'; }).length;
      var againCount = allReviews.filter(function (r) { return r.outcome === 'again'; }).length;
      var uniqueCards = Object.keys(reviewedCards).length;
      var retryCards = {}; allReviews.forEach(function (r) { if (r.outcome === 'again') retryCards[r.cardId] = true; });
      var firstTry = allReviews.filter(function (r) { return r.outcome === 'next' && Number(r.attempt) === 1; }).length;
      var due = App.store.cardsDueCount(certId);
      var fcMetrics = el('div', { className: 'stats-mini-metrics stats-mini-metrics-4' });
      [[allReviews.length, 'Review events'], [uniqueCards, 'Unique cards'], [againCount, 'Again marks'], [uniqueCards ? Math.round(allReviews.length / uniqueCards * 10) / 10 : null, 'Avg attempts']].forEach(function (m) { fcMetrics.appendChild(metricTile(m[1], m[0] == null ? '—' : m[0], '')); });
      fcSummary.appendChild(fcMetrics);
      fcSummary.appendChild(el('div', { className: 'stats-effort-list' }, [el('div', {}, [el('span', { text: 'First-try Next' }), el('strong', { text: uniqueCards ? Math.round(firstTry / uniqueCards * 100) + '%' : '—' })]), el('div', {}, [el('span', { text: 'Cards needing retry' }), el('strong', { text: uniqueCards ? Object.keys(retryCards).length : '—' })]), el('div', {}, [el('span', { text: 'Currently due' }), el('strong', { text: due })])]));
      flashGrid.appendChild(fcSummary);
      var fcTrend = el('div', { className: 'stats-subpanel' }); fcTrend.appendChild(el('h3', { text: 'Next rate over time' })); fcTrend.appendChild(renderOutcomeTrend(rangeReviews, selectedDays)); flashGrid.appendChild(fcTrend);
      flashSection.appendChild(flashGrid);
      var fcFooter = el('div', { className: 'stats-section-footer' }, [el('span', { className: 'text-muted', text: compactNumber(nextCount) + ' Next · ' + compactNumber(againCount) + ' Again · ' + (allReviews.length ? Math.round(againCount / allReviews.length * 100) : 0) + '% Again rate' }), el('button', { className: 'btn btn-secondary btn-sm', text: 'Open Flashcards', onClick: function () { App.core.navigate('#/flashcards'); } })]);
      flashSection.appendChild(fcFooter); body.appendChild(flashSection);

      var examSection = section('Exam Simulation', 'Exam performance', exams.length ? compactNumber(exams.length) + ' recorded simulations' : 'No simulations recorded yet', 'stats-exam-section');
      if (!exams.length) examSection.appendChild(emptyPanel('No exam history yet', 'Complete an Exam Simulation to see score trend, pass rate, and readiness.'));
      else {
        var threshold = (App.store.getSettings().passThreshold && App.store.getSettings().passThreshold[certId]) || 70;
        var avgScore = Math.round(exams.reduce(function (sum, e) { return sum + (e.score || 0); }, 0) / exams.length);
        var bestScore = Math.max.apply(null, exams.map(function (e) { return e.score || 0; }));
        var passed = exams.filter(function (e) { return e.passed; }).length;
        var examMetrics = el('div', { className: 'stats-metric-grid stats-exam-metrics' });
        examMetrics.appendChild(metricTile('Average score', avgScore + '%', 'Across ' + compactNumber(exams.length) + ' exams'));
        examMetrics.appendChild(metricTile('Best score', bestScore + '%', 'Personal best'));
        examMetrics.appendChild(metricTile('Pass rate', Math.round(passed / exams.length * 100) + '%', compactNumber(passed) + ' of ' + compactNumber(exams.length) + ' passed'));
        examMetrics.appendChild(metricTile('Pass threshold', threshold + '%', 'From Settings'));
        examSection.appendChild(examMetrics);
        var examChart = el('div', { className: 'stats-exam-chart' });
        var examPoints = exams.slice().reverse().map(function (e, i) { return { value: e.score, total: e.total, label: 'Exam ' + (i + 1) }; });
        examChart.appendChild(renderLineChart(examPoints, certColor, 'Exam score trend'));
        examSection.appendChild(examChart);
        var readiness = avgScore >= threshold && passed >= Math.min(3, exams.length) ? 'Strong' : avgScore >= threshold ? 'On track' : 'Not ready yet';
        examSection.appendChild(el('div', { className: 'stats-readiness ' + readiness.toLowerCase().replace(/\s/g, '-'), }, [el('strong', { text: 'Exam readiness · ' + readiness }), el('span', { text: compactNumber(passed) + ' passing simulations · ' + avgScore + '% average against a ' + threshold + '% threshold' })]));
        var readinessTrack = el('div', { className: 'stats-readiness-track', 'aria-label': 'Average score vs pass threshold' });
        var readinessFill = el('span', { style: { width: '0%', backgroundColor: avgScore >= threshold ? 'var(--accent-green)' : 'var(--accent-amber)' } });
        readinessTrack.appendChild(readinessFill);
        examSection.appendChild(readinessTrack);
        if (App.core.motionEnabled()) requestAnimationFrame(function () { readinessFill.style.width = Math.min(100, avgScore) + '%'; });
        else readinessFill.style.width = Math.min(100, avgScore) + '%';
      }
      body.appendChild(examSection);

      var labsSection = section('Hands-on practice', 'Labs progress', labs.length ? compactNumber(labs.filter(function (l) { return labsDone[l._id]; }).length) + ' / ' + compactNumber(labs.length) + ' completed' : 'No labs loaded', 'stats-labs-section');
      if (!labs.length) labsSection.appendChild(emptyPanel('No labs available', 'This certification does not currently provide lab content.'));
      else {
        var labRows = rows.filter(function (r) { return r.labs.length; }).map(function (r) { return { label: r.number + ' · ' + r.title, value: Math.round(r.labsDone / r.labs.length * 100) }; });
        labsSection.appendChild(renderHorizontalBars(labRows, 'var(--accent-green)'));
        labsSection.appendChild(el('div', { className: 'stats-section-footer' }, [el('span', { className: 'text-muted', text: compactNumber(labs.filter(function (l) { return labsDone[l._id]; }).length) + ' completed · ' + compactNumber(labs.filter(function (l) { return !labsDone[l._id]; }).length) + ' remaining' }), el('button', { className: 'btn btn-secondary btn-sm', text: 'Open Labs', onClick: function () { App.core.navigate('#/labs'); } })]));
      }
      body.appendChild(labsSection);

      var consistency = section('Consistency', 'Study activity & consistency', selectedDays == null ? 'All recorded activity' : 'Last ' + selectedDays + ' days', 'stats-consistency-section');
      var events = activityEvents().filter(function (event) { return !selectedDays || inRange(event.ts, selectedDays); });
      var activityGrid = el('div', { className: 'stats-activity-layout' });
      var heat = el('div', { className: 'stats-heatmap-wrap' });
      heat.appendChild(el('div', { className: 'stats-heatmap-legend' }, [el('span', { text: 'Less' }), el('i', { className: 'level-0' }), el('i', { className: 'level-1' }), el('i', { className: 'level-2' }), el('i', { className: 'level-3' }), el('i', { className: 'level-4' }), el('span', { text: 'More' })]));
      var heatDays = selectedDays == null ? 84 : selectedDays;
      var heatEnd = dayStart(Date.now());
      var rawHeatStart = heatEnd - (heatDays - 1) * 86400000;
      // Align the first column to Sunday, like GitHub, so month labels sit over
      // consistent week columns instead of drifting with the selected range.
      var leadingDays = new Date(rawHeatStart).getDay();
      var heatStart = rawHeatStart - leadingDays * 86400000;
      var heatCellCount = Math.ceil((heatDays + leadingDays) / 7) * 7;
      var heatWeeks = heatCellCount / 7;
      var heatShell = el('div', { className: 'stats-heatmap-shell' });
      var monthLabels = el('div', { className: 'stats-heatmap-months', 'aria-hidden': 'true' });
      monthLabels.style.gridTemplateColumns = 'repeat(' + heatWeeks + ', 0.75rem)';
      var seenMonths = {};
      for (var wi = 0; wi < heatWeeks; wi++) {
        var weekStart = heatStart + wi * 7 * 86400000;
        var labelDate = null;
        for (var wd = 0; wd < 7; wd++) {
          var monthDate = new Date(weekStart + wd * 86400000);
          if (monthDate.getDate() === 1) { labelDate = monthDate; break; }
        }
        if (wi === 0 && !labelDate) labelDate = new Date(weekStart);
        if (labelDate) {
          var monthKey = labelDate.getFullYear() + '-' + labelDate.getMonth();
          if (!seenMonths[monthKey]) {
            seenMonths[monthKey] = true;
            monthLabels.appendChild(el('span', { className: 'stats-heatmap-month', style: { gridColumn: String(wi + 1) }, text: labelDate.toLocaleDateString(undefined, { month: 'short' }) }));
          }
        }
      }
      heatShell.appendChild(monthLabels);
      var heatmap = el('div', { className: 'stats-heatmap', role: 'img', 'aria-label': 'Study activity heatmap' });
      var byDay = {}; events.forEach(function (event) { var key = dayStart(event.ts); byDay[key] = (byDay[key] || 0) + 1; });
      var maxActivity = Math.max.apply(null, Object.keys(byDay).map(function (key) { return byDay[key]; }).concat([1]));
      for (var hi = 0; hi < heatCellCount; hi++) {
        var hts = heatStart + hi * 86400000;
        var padded = hts < rawHeatStart || hts > heatEnd;
        var count = padded ? 0 : (byDay[hts] || 0);
        var level = count ? Math.min(4, Math.ceil(count / maxActivity * 4)) : 0;
        var cell = el('span', { className: 'stats-heat-cell level-' + level + (padded ? ' is-padding' : '') });
        if (padded) {
          cell.setAttribute('aria-hidden', 'true');
        } else {
          cell.setAttribute('title', utils.formatDate(hts) + ' · ' + compactNumber(count) + ' activities');
          cell.setAttribute('aria-label', utils.formatDate(hts) + ': ' + compactNumber(count) + ' activities');
          cell.setAttribute('tabindex', '0');
        }
        if (App.core.motionEnabled()) cell.style.animationDelay = Math.min(hi, 64) * 6 + 'ms';
        heatmap.appendChild(cell);
      }
      heatShell.appendChild(heatmap);
      heat.appendChild(heatShell); activityGrid.appendChild(heat);
      var consistencyMetrics = el('div', { className: 'stats-consistency-metrics' });
      consistencyMetrics.appendChild(metricTile('Current streak', streak.current ? streak.current + ' days' : '—', streak.current ? 'Active now' : 'Study today to start'));
      consistencyMetrics.appendChild(metricTile('Longest streak', streak.longest ? streak.longest + ' days' : '—', streak.longest ? 'All-time best' : 'No streak yet'));
      consistencyMetrics.appendChild(metricTile('Activity events', events.length ? events.length : '—', selectedDays == null ? 'All time' : 'Selected period'));
      consistencyMetrics.appendChild(metricTile('Active days', events.length ? Object.keys(events.reduce(function (map, event) { map[dayStart(event.ts)] = true; return map; }, {})).length : '—', 'Days with study activity'));
      activityGrid.appendChild(consistencyMetrics); consistency.appendChild(activityGrid); body.appendChild(consistency);

      var exportSection = section('Data', 'Export analytics', 'Take a snapshot of this certification\'s progress', 'stats-export-section');
      var exportRow = el('div', { className: 'stats-export-row' });
      exportRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'CSV answer log', onClick: function () { utils.downloadBlob(new Blob([App.store.exportAnswersCSV(certId)], { type: 'text/csv' }), 'reviewapp-' + certId + '-answers.csv'); } }));
      exportRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'JSON full backup', onClick: function () { utils.downloadBlob(new Blob([JSON.stringify(App.store.exportFullBackup(), null, 2)], { type: 'application/json' }), 'reviewapp-backup.json'); } }));
      exportRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Markdown report', onClick: function () {
        utils.downloadBlob(new Blob([buildMarkdownReport(certId)], { type: 'text/markdown' }), 'reviewapp-' + certId + '-statistics.md');
      } }));
      exportSection.appendChild(exportRow); body.appendChild(exportSection);
    }

    rangeSelect.addEventListener('change', function () { selectedDays = rangeSelect.value === 'all' ? null : Number(rangeSelect.value); updateRangeLabel(); renderBody(); });
    renderBody();
  }

  function viewNotes(root, parsed) {
    var noteId = parsed.params[0] ? decodeURIComponent(parsed.params[0]) : null;
    if (noteId) {
      var sectionIdx = -1;
      var searchQuery = '';
      var qm = noteId.indexOf('?');
      if (qm >= 0) {
        var params = noteId.slice(qm + 1).split('&');
        params.forEach(function (p) {
          var kv = p.split('=');
          if (kv[0] === 'section') sectionIdx = parseInt(kv[1], 10);
          if (kv[0] === 'q') searchQuery = decodeURIComponent(kv[1] || '');
        });
        noteId = noteId.slice(0, qm);
      }
      return viewNoteDetail(root, noteId, sectionIdx, searchQuery);
    }
    var certId = App.core.getCurrentCertId();
    var cert = App.content.getCert(certId);
    root.appendChild(el('h1', { text: 'Notes' }));
    if (!cert) { root.appendChild(emptyState('No certification selected', 'Pick a certification from the top bar to view its notes.')); return; }
    var bundled = App.content.getChapterNotes(certId);
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Notes for ' + cert.name + ' — one complete note per chapter.' }));
    if (!bundled.length) root.appendChild(el('p', { className: 'text-muted mb-3', text: 'No bundled notes loaded for this certification.' }));
    else {
      var controls = el('div', { className: 'panel mb-3' });
      var chapterSel = el('select', { className: 'form-control', id: 'note-chapter' });
      controls.appendChild(el('div', { className: 'form-group' }, [el('label', { for: 'note-chapter', text: 'Chapter' }), chapterSel]));
      root.appendChild(controls);
      var bundledList = el('div');
      root.appendChild(bundledList);
      function fillChapters() {
        chapterSel.innerHTML = '';
        chapterSel.appendChild(el('option', { value: '', text: 'All chapters' }));
        var chapters = App.content.getChapters(certId, 'notes');
        Object.keys(chapters).sort().forEach(function (chapter) {
          chapterSel.appendChild(el('option', { value: chapter, text: chapter + ' (' + chapters[chapter].length + ')' }));
        });
      }
      function renderBundled() {
        bundledList.innerHTML = '';
        var visible = bundled.filter(function (n) {
          return n._cert === certId && (!chapterSel.value || n._chapter === chapterSel.value);
        });
        if (!visible.length) {
          bundledList.appendChild(emptyState('No notes found', 'Choose another chapter.'));
          return;
        }
        visible.forEach(function (n) {
          var p = el('a', { className: 'card mb-2 notes-card', href: '#/notes/' + encodeURIComponent(n._id) });
          p.appendChild(el('h3', { html: inlineHtml(n.title) }));
          var certName = cert ? cert.name : (n._cert || 'General');
          var meta = certName + (n.sections.length > 1 ? ' · ' + n.sections.length + ' sections' : '');
          p.appendChild(el('div', { className: 'text-muted mt-1', text: meta }));
          bundledList.appendChild(p);
        });
      }
      fillChapters();
      renderBundled();
      chapterSel.addEventListener('change', renderBundled);
    }
    root.appendChild(el('h2', { className: 'mt-3 mb-1', text: 'Personal notes' }));
    var list = el('div', { id: 'personal-notes-list' });
    root.appendChild(list);
    function refreshPersonal() {
      list.innerHTML = '';
      var personal = App.store.getPersonalNotes();
      if (!personal.length) list.appendChild(el('p', { className: 'text-muted', text: 'No personal notes yet.' }));
      personal.forEach(function (n) {
        var p = el('div', { className: 'panel mb-2' });
        p.appendChild(el('div', { className: 'flex-between' }, [
          el('h3', { html: inlineHtml(n.title) }),
          el('div', { className: 'flex gap-sm' }, [
            el('button', { className: 'btn btn-ghost btn-sm', text: 'Edit', onClick: function () { openEditor(n); } }),
            el('button', {
              className: 'btn btn-danger btn-sm', text: 'Delete',
              onClick: function () { if (confirm('Delete this note?')) { App.store.deletePersonalNote(n.id); refreshPersonal(); } }
            })
          ])
        ]));
        p.appendChild(el('div', { className: 'notes-preview', html: App.markdown.render(n.body || '') }));
        list.appendChild(p);
      });
    }
    refreshPersonal();
    root.appendChild(el('button', { className: 'btn btn-primary mt-2', text: '+ New note', onClick: function () { openEditor(null); } }));
    function openEditor(note) {
      var body = el('div');
      body.appendChild(el('label', { className: 'sr-only', for: 'note-title', text: 'Note title' }));
      var titleInp = el('input', { className: 'form-control mb-2', type: 'text', placeholder: 'Title', id: 'note-title', value: note ? note.title : '' });
      var layout = el('div', { className: 'notes-layout' });
      body.appendChild(el('label', { className: 'sr-only', for: 'note-body', text: 'Note body (Markdown)' }));
      var ta = el('textarea', { className: 'form-control', placeholder: 'Markdown body…', id: 'note-body', style: { minHeight: '280px' } });
      ta.value = note ? (note.body || '') : '';
      var preview = el('div', { className: 'notes-preview' });
      function upd() { preview.innerHTML = App.markdown.render(ta.value); }
      ta.addEventListener('input', upd);
      upd();
      layout.appendChild(ta);
      layout.appendChild(preview);
      body.appendChild(titleInp);
      body.appendChild(layout);
      body.appendChild(el('button', {
        className: 'btn btn-primary mt-2', text: 'Save',
        onClick: function () {
          App.store.savePersonalNote({ id: note ? note.id : null, title: titleInp.value || 'Untitled', body: ta.value });
          App.core.closeModal();
          refreshPersonal();
          App.toast('Note saved', 'success');
        }
      }));
      App.core.openModal(body, { title: note ? 'Edit note' : 'New note' });
    }
  }

  function viewNoteDetail(root, noteId, sectionIdx, searchQuery) {
    // Consolidated chapter note for the active certification first; fall back
    // to the full registry so cross-certification deep links still resolve.
    var note = App.content.getChapterNotes(App.core.getCurrentCertId()).find(function (n) { return n._id === noteId; });
    if (!note) note = App.content.getChapterNotes().find(function (n) { return n._id === noteId; });
    if (!note) {
      var legacy = App.content.getAll('notes').find(function (n) { return n._id === noteId; });
      if (legacy) {
        note = {
          _id: legacy._id,
          _cert: legacy._cert,
          _chapter: legacy._chapter,
          title: legacy._chapter || legacy.title,
          sections: [{ _id: legacy._id, title: legacy.title, body: legacy.body, tags: legacy.tags || [] }]
        };
      }
    }
    if (!note) { root.appendChild(emptyState('Note not found', noteId)); return; }
    root.appendChild(el('button', { className: 'btn btn-ghost btn-sm mb-2', text: '← All notes', onClick: function () { App.core.navigate('#/notes'); } }));
    var cert = App.content.getCert(note._cert);
    root.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap' } }, [
      cert ? el('span', { className: 'chip chip-muted', text: cert.name }) : null,
      el('span', { className: 'chip chip-muted', text: note._chapter || 'General' })
    ]));
    root.appendChild(el('h1', { html: inlineHtml(note.title) }));
    note.sections.forEach(function (s, i) {
      root.appendChild(el('h2', { className: 'note-section-title', html: inlineHtml(s.title) }));
      root.appendChild(el('div', { className: 'notes-preview mb-3', html: App.markdown.render(s.body || '') }));
    });
    // Scroll to matching section if navigated from search
    if (typeof sectionIdx === 'number' && sectionIdx >= 0 && sectionIdx < note.sections.length) {
      setTimeout(function () {
        var h2s = root.querySelectorAll('h2.note-section-title');
        if (h2s[sectionIdx]) {
          h2s[sectionIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
    // If navigated from search with a query, scroll to first text occurrence
    if (searchQuery && searchQuery.length >= 2) {
      setTimeout(function () {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while ((node = walker.nextNode())) {
          var idx = node.textContent.toLowerCase().indexOf(searchQuery.toLowerCase());
          if (idx >= 0) {
            var range = document.createRange();
            range.setStart(node, idx);
            range.setEnd(node, idx + searchQuery.length);
            // Briefly highlight the match then scroll to it
            var mark = document.createElement('mark');
            mark.style.cssText = 'background:var(--accent-cyan-dim);color:var(--text-primary);border-radius:3px;padding:0 2px;';
            range.surroundContents(mark);
            mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
          }
        }
      }, 350);
    }
    // Back-to-top button
    var btt = el('button', {
      className: 'back-to-top',
      title: 'Back to top',
      'aria-label': 'Scroll to top of note',
      html: '<svg viewBox="0 0 16 16" fill="none"><path d="M4.5 10l3.5-3.5L11.5 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onClick: function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
    root.appendChild(btt);

    var bttTicking = false;
    function updateBtt() {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
      bttTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!bttTicking) {
        requestAnimationFrame(updateBtt);
        bttTicking = true;
      }
    }, { passive: true });
  }

  function buildPermsPanel() {
    var panel = el('div', { className: 'tool-panel' });
    panel.appendChild(el('p', { className: 'text-muted mb-2', style: { fontSize: '0.85rem' },
      text: 'Toggle permissions or type an octal mode — the chmod command updates live. Special bits render as s (setuid/setgid) and t (sticky).' }));

    var state = {
      special: { suid: false, sgid: false, sticky: false },
      user: { r: true, w: true, x: true },
      group: { r: true, w: false, x: true },
      other: { r: true, w: false, x: true }
    };
    var bindings = [];

    var outputPanel = el('div', { className: 'panel perms-output' });
    var octalEl = el('div', { className: 'octal-display' });
    var symEl = el('div', { className: 'symbolic-display' });
    var cmdEl = el('div', { className: 'command-display' });
    var flagRow = el('div', { className: 'flex gap-sm mt-1', style: { flexWrap: 'wrap', alignItems: 'center' } });
    outputPanel.appendChild(octalEl);
    outputPanel.appendChild(symEl);
    outputPanel.appendChild(cmdEl);
    outputPanel.appendChild(flagRow);

    function render() {
      var r = App.tools.permsFromMode(state.special, state.user, state.group, state.other);
      octalEl.textContent = r.octal;
      symEl.textContent = r.symbolic;
      cmdEl.textContent = r.command;
      flagRow.innerHTML = '';
      if (state.special.suid) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod u+s · setuid' }));
      if (state.special.sgid) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod g+s · setgid' }));
      if (state.special.sticky) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod +t · sticky' }));
      if (!state.special.suid && !state.special.sgid && !state.special.sticky) {
        flagRow.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.75rem' }, text: 'No special bits' }));
      }
    }

    function syncChecks() {
      bindings.forEach(function (b) { b.cb.checked = !!state[b.key][b.bit]; });
    }

    var grid = el('div', { className: 'perms-grid' });

    function permCol(label, key) {
      var c = el('div', { className: 'perm-col' });
      c.appendChild(el('div', { className: 'perm-col-label', text: label }));
      var wrap = el('div', { className: 'perm-bits' });
      ['r', 'w', 'x'].forEach(function (b) {
        var lab = el('label', { className: 'perm-bit' });
        // The visible letter is shorthand, so give the checkbox a full name.
        var cb = el('input', { type: 'checkbox', 'aria-label': label + ' · ' + b + ' permission' });
        bindings.push({ cb: cb, key: key, bit: b });
        cb.addEventListener('change', function () { state[key][b] = cb.checked; render(); });
        lab.appendChild(cb);
        lab.appendChild(el('span', { text: b }));
        wrap.appendChild(lab);
      });
      c.appendChild(wrap);
      return c;
    }

    var specialCol = el('div', { className: 'perm-col perm-col-special' });
    specialCol.appendChild(el('div', { className: 'perm-col-label', text: 'Special bits' }));
    var spWrap = el('div', { className: 'perm-bits perm-bits-stack' });
    [['setuid', 'suid', 's'], ['setgid', 'sgid', 's'], ['sticky', 'sticky', 't']].forEach(function (t) {
      var lab = el('label', { className: 'perm-bit perm-bit-wide' });
      var cb = el('input', { type: 'checkbox' });
      bindings.push({ cb: cb, key: 'special', bit: t[1] });
      cb.addEventListener('change', function () { state.special[t[1]] = cb.checked; render(); });
      lab.appendChild(cb);
      lab.appendChild(el('span', { text: t[0] + ' (' + t[2] + ')' }));
      spWrap.appendChild(lab);
    });
    specialCol.appendChild(spWrap);

    grid.appendChild(specialCol);
    grid.appendChild(permCol('User (u)', 'user'));
    grid.appendChild(permCol('Group (g)', 'group'));
    grid.appendChild(permCol('Other (o)', 'other'));
    panel.appendChild(grid);

    var inputRow = el('div', { className: 'flex gap-sm mt-2', style: { alignItems: 'center', flexWrap: 'wrap' } });
    inputRow.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.8rem' }, text: 'Or type a mode:' }));
    var modeInp = el('input', { className: 'form-control mono', type: 'text', placeholder: 'e.g. 0644 or 4755', 'aria-label': 'Octal permission mode', style: { maxWidth: '180px' } });
    modeInp.addEventListener('input', function () {
      var parsed = App.tools.parseMode(modeInp.value);
      if (!parsed) return;
      state.special = parsed.special;
      state.user = parsed.user;
      state.group = parsed.group;
      state.other = parsed.other;
      syncChecks();
      render();
    });
    inputRow.appendChild(modeInp);
    panel.appendChild(inputRow);
    panel.appendChild(outputPanel);

    panel.appendChild(el('div', { className: 'label-upper mb-1 mt-3', text: 'Common modes' }));
    var presetRow = el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap' } });
    App.tools.getCommonModes().forEach(function (p) {
      presetRow.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm', text: p.mode, title: p.name + ' — ' + p.note,
        onClick: function () {
          var parsed = App.tools.parseMode(p.mode);
          if (!parsed) return;
          state.special = parsed.special;
          state.user = parsed.user;
          state.group = parsed.group;
          state.other = parsed.other;
          modeInp.value = p.mode;
          syncChecks();
          render();
        }
      }));
    });
    panel.appendChild(presetRow);

    var tbl = el('table', { className: 'ref-table' });
    tbl.appendChild(el('thead', {}, [el('tr', {}, [
      el('th', { text: 'Mode' }), el('th', { text: 'Use case' }), el('th', { text: 'Meaning' })
    ])]));
    var tb = el('tbody');
    App.tools.getCommonModes().forEach(function (p) {
      tb.appendChild(el('tr', {}, [
        el('td', { className: 'mono', style: { fontWeight: '600', color: 'var(--accent-green)' }, text: p.mode }),
        el('td', { text: p.name }),
        el('td', { className: 'text-muted', html: inlineHtml(p.note) })
      ]));
    });
    tbl.appendChild(tb);
    panel.appendChild(tbl);

    panel.appendChild(el('div', { className: 'panel-raised mt-2' }, [
      el('div', { className: 'label-upper mb-1', text: 'Exam tip' }),
      el('p', { className: 'text-muted', style: { fontSize: '0.85rem' },
        text: 'To read a file you need r on the file itself and x on every directory in its path. setuid (4755) runs a program with the owner’s privileges — e.g. /usr/bin/passwd. Directories need x to be traversed.' })
    ]));

    panel.appendChild(buildPermExerciseSection());

    syncChecks();
    render();
    return panel;
  }


/* ── Permissions exercise UI ───────────────────────────── */
  // Session lengths for practice sessions; 0 = endless.
  var EX_LENGTHS = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 0, label: 'Endless' }
  ];
  var EX_DIFF_LABELS = { all: 'All levels', easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  var EX_BIT_NAMES = { r: 'read', w: 'write', x: 'execute' };

  function buildPermExerciseSection() {
    var section = el('div', { className: 'perm-exercise' });
    var header = el('div', { className: 'perm-ex-head' });
    var titleRow = el('div', { className: 'flex-between mb-1', style: { alignItems: 'center' } });
    titleRow.appendChild(el('div', { className: 'label-upper', text: 'Practice' }));
    var statsRow = el('div', { className: 'flex gap-sm perm-ex-stats', style: { flexWrap: 'wrap' }, 'aria-live': 'polite' });
    titleRow.appendChild(statsRow);
    header.appendChild(titleRow);
    header.appendChild(el('p', { className: 'text-muted mb-2', style: { fontSize: '0.85rem' },
      text: 'Procedurally generated permission exercises — conversions, chmod commands, permission matrices, special bits, and directory scenarios. No question bank: every exercise is generated on the fly.' }));
    var stage = el('div', { className: 'perm-ex-stage' });
    section.appendChild(header);
    section.appendChild(stage);

    var session = null; // { config, stats:{n,correct,incorrect}, focus:{}, weak:[], exercise, submitted }
    var lastConfig = null;
    var currentSubmit = null;

    // Keyboard interaction while an exercise is on screen: 1-4 picks an MCQ
    // option, Enter submits. Buttons and text inputs handle their own keys.
    stage.addEventListener('keydown', function (e) {
      if (!session || session.submitted || !session.exercise) return;
      var ex = session.exercise;
      if (e.key === 'Enter') {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT')) return;
        e.preventDefault();
        if (ex.accepts === 'mcq') {
          if (stage.querySelector('.option-btn.selected')) submitCurrent();
        } else if (ex.accepts === 'matrix') {
          submitCurrent();
        }
        return;
      }
      if (ex.accepts === 'mcq' && /^[1-9]$/.test(e.key)) {
        var idx = Number(e.key) - 1;
        if (idx < ex.detail.options.length) {
          e.preventDefault();
          stage.querySelectorAll('.option-btn').forEach(function (b, j) { b.classList.toggle('selected', j === idx); });
        }
      }
    });

    function submitCurrent() {
      if (currentSubmit) currentSubmit();
    }

    function setStats() {
      statsRow.innerHTML = '';
      if (!session) return;
      var total = session.stats.correct + session.stats.incorrect;
      statsRow.appendChild(el('span', { className: 'chip chip-muted', text: 'Question ' + session.stats.n }));
      if (session.config.length) {
        var bar = el('div', { className: 'progress-bar perm-ex-minibar', 'aria-hidden': 'true' });
        var done = Math.max(0, session.stats.n - 1);
        bar.appendChild(el('div', { className: 'progress-fill', style: { width: Math.min(100, Math.round(done / session.config.length * 100)) + '%' } }));
        statsRow.appendChild(bar);
      }
      if (session.stats.correct) statsRow.appendChild(el('span', { className: 'chip chip-green', text: session.stats.correct + ' correct' }));
      if (session.stats.incorrect) statsRow.appendChild(el('span', { className: 'chip chip-red', text: session.stats.incorrect + ' incorrect' }));
      if (total) statsRow.appendChild(el('span', { className: 'chip chip-cyan', text: Math.round(session.stats.correct / total * 100) + '% accuracy' }));
    }

    // Replace the stage content with a small exit/enter transition. With
    // prefers-reduced-motion or animations off, the durations collapse to
    // ~0ms so the swap is instant.
    function swapStage(build) {
      var prev = stage.firstElementChild;
      if (prev) {
        prev.classList.add('perm-ex-leaving');
        setTimeout(function () {
          stage.innerHTML = '';
          stage.appendChild(build());
        }, 150);
      } else {
        stage.appendChild(build());
      }
    }

    function renderIdle() {
      session = null;
      currentSubmit = null;
      setStats();
      stage.innerHTML = '';
      var wrap = el('div', { className: 'perm-ex-idle' });
      wrap.appendChild(el('p', { className: 'text-muted', style: { fontSize: '0.85rem' },
        text: 'Choose a configuration to focus on the concepts you want to practice, or jump straight in with your last settings.' }));
      var row = el('div', { className: 'flex gap-sm mt-2', style: { flexWrap: 'wrap' } });
      row.appendChild(el('button', { className: 'btn btn-primary', text: 'Start practice', onClick: function () { swapStage(renderConfig); } }));
      if (lastConfig) {
        row.appendChild(el('button', {
          className: 'btn btn-secondary', text: 'Quick start', title: 'Start a session with your previous settings',
          onClick: function () { startSession(JSON.parse(JSON.stringify(lastConfig))); }
        }));
      }
      wrap.appendChild(row);
      stage.appendChild(wrap);
    }

    function toggleChip(text, on, onChange, opts) {
      opts = opts || {};
      var btn = el('button', {
        className: 'chip chip-toggle' + (on ? ' on' : '') + (opts.special ? ' special' : ''),
        'aria-pressed': on ? 'true' : 'false',
        text: text,
        title: opts.title,
        onClick: function () {
          var next = btn.getAttribute('aria-pressed') !== 'true';
          btn.setAttribute('aria-pressed', next ? 'true' : 'false');
          btn.classList.toggle('on', next);
          onChange(next);
        }
      });
      return btn;
    }

    function renderConfig() {
      var cfg = lastConfig || { difficulty: 'all', types: null, includeSetuid: false, includeSetgid: false, includeSticky: false, length: 10 };
      var difficulty = cfg.difficulty;
      var length = cfg.length || 10;
      var specials = { includeSetuid: !!cfg.includeSetuid, includeSetgid: !!cfg.includeSetgid, includeSticky: !!cfg.includeSticky };
      var typesOn = {};
      var wrap = el('div', { className: 'perm-ex-config' });

      function visibleTypes() {
        var ids = [];
        Object.keys(App.permExercise.TYPE_META).forEach(function (id) {
          if (difficulty !== 'all' && App.permExercise.TYPE_META[id].difficulty !== difficulty) return;
          ids.push(id);
        });
        return ids;
      }

      // Difficulty segmented control
      wrap.appendChild(el('div', { className: 'label-upper mb-1', text: 'Difficulty' }));
      var diffRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Difficulty', style: { flexWrap: 'wrap' } });
      var diffBtns = {};
      App.permExercise.DIFFICULTY_IDS.forEach(function (lv) {
        var btn = el('button', {
          className: 'btn ' + (difficulty === lv ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
          'aria-pressed': difficulty === lv ? 'true' : 'false',
          text: EX_DIFF_LABELS[lv] || lv
        });
        btn.addEventListener('click', function () {
          if (lv === difficulty) return;
          difficulty = lv;
          Object.keys(diffBtns).forEach(function (k) {
            var b = diffBtns[k];
            var on = k === lv;
            b.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary') + ' btn-sm';
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          refreshTypes();
          diffHint.textContent = App.permExercise.DIFFICULTY_DESC[lv] || '';
        });
        diffBtns[lv] = btn;
        diffRow.appendChild(btn);
      });
      wrap.appendChild(diffRow);
      var diffHint = el('p', { className: 'text-muted perm-ex-config-hint mt-1', text: App.permExercise.DIFFICULTY_DESC[difficulty] || '' });
      wrap.appendChild(diffHint);

      // Exercise type toggles
      wrap.appendChild(el('div', { className: 'label-upper mb-1 mt-3', text: 'Exercise types' }));
      var typeWrap = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Exercise types', style: { flexWrap: 'wrap' } });
      wrap.appendChild(typeWrap);
      function refreshTypes() {
        typeWrap.innerHTML = '';
        visibleTypes().forEach(function (id) {
          if (typesOn[id] === undefined) typesOn[id] = true;
          typeWrap.appendChild(toggleChip(App.permExercise.TYPE_META[id].label, typesOn[id], function (on) { typesOn[id] = on; }, {
            title: App.permExercise.TYPE_META[id].hint
          }));
        });
      }
      refreshTypes();

      // Special bits
      wrap.appendChild(el('div', { className: 'label-upper mb-1 mt-3', text: 'Special bits' }));
      var spRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Special bits', style: { flexWrap: 'wrap' } });
      [['includeSetuid', 'setuid'], ['includeSetgid', 'setgid'], ['includeSticky', 'sticky']].forEach(function (t) {
        spRow.appendChild(toggleChip(t[1], specials[t[0]], function (on) { specials[t[0]] = on; }, {
          special: true,
          title: t[1] === 'setuid' ? 'Runs with the file owner\u2019s privileges (e.g. 4755, /usr/bin/passwd).' : t[1] === 'setgid' ? 'New files inherit the directory\u2019s group (e.g. 2755).' : 'Only the owner can delete files in the directory (e.g. 1777, /tmp).'
        }));
      });
      wrap.appendChild(spRow);
      wrap.appendChild(el('p', { className: 'text-muted perm-ex-config-hint mt-1',
        text: 'Special-bit questions only appear when at least one bit is enabled — setuid (4), setgid (2), sticky (1) — and at Medium or Hard difficulty.' }));

      // Session length
      wrap.appendChild(el('div', { className: 'label-upper mb-1 mt-3', text: 'Session length' }));
      var lenRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Session length', style: { flexWrap: 'wrap' } });
      var lenBtns = {};
      EX_LENGTHS.forEach(function (opt) {
        var btn = el('button', {
          className: 'btn ' + (length === opt.value ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
          'aria-pressed': length === opt.value ? 'true' : 'false',
          text: opt.label,
          title: opt.value ? opt.value + ' questions per session' : 'Keep going until you stop'
        });
        btn.addEventListener('click', function () {
          length = opt.value;
          Object.keys(lenBtns).forEach(function (k) {
            var b = lenBtns[k];
            var on = Number(k) === length;
            b.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary') + ' btn-sm';
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
        });
        lenBtns[opt.value] = btn;
        lenRow.appendChild(btn);
      });
      wrap.appendChild(lenRow);

      var row = el('div', { className: 'flex gap-sm mt-3', style: { flexWrap: 'wrap' } });
      row.appendChild(el('button', {
        className: 'btn btn-primary', text: 'Start session',
        onClick: function () {
          var types = [];
          visibleTypes().forEach(function (id) { if (typesOn[id]) types.push(id); });
          if (!types.length) { App.toast('Pick at least one exercise type', 'error'); return; }
          var newCfg = {
            difficulty: difficulty,
            types: types,
            includeSetuid: specials.includeSetuid,
            includeSetgid: specials.includeSetgid,
            includeSticky: specials.includeSticky,
            length: length
          };
          lastConfig = newCfg;
          startSession(newCfg);
        }
      }));
      row.appendChild(el('button', { className: 'btn btn-ghost', text: 'Back', onClick: renderIdle }));
      wrap.appendChild(row);
      return wrap;
    }

    function startSession(cfg) {
      session = {
        config: cfg,
        stats: { n: 0, correct: 0, incorrect: 0 },
        focus: {},
        weak: [],
        exercise: null,
        submitted: false
      };
      nextExercise();
    }

    function nextExercise() {
      var genCfg = {
        difficulty: session.config.difficulty,
        types: session.config.types,
        includeSetuid: session.config.includeSetuid,
        includeSetgid: session.config.includeSetgid,
        includeSticky: session.config.includeSticky,
        biasBits: session.weak.length ? session.weak.slice(0, 2).map(function (w) { return w.split('-'); }) : null,
        typeWeights: Object.keys(session.focus).length ? session.focus : null
      };
      var ex = App.permExercise.generateExercise(genCfg, App.permExercise.makeRng());
      if (ex.error) {
        session = null;
        renderIdle();
        App.toast(ex.error, 'error');
        return;
      }
      session.exercise = ex;
      session.submitted = false;
      session.stats.n++;
      setStats();
      swapStage(function () { return renderQuestion(); });
    }

    function emptyPermState() {
      return {
        special: { suid: false, sgid: false, sticky: false },
        user: { r: false, w: false, x: false },
        group: { r: false, w: false, x: false },
        other: { r: false, w: false, x: false }
      };
    }

    function hasSpecialBit(state) {
      return !!(state.special && (state.special.suid || state.special.sgid || state.special.sticky));
    }

    function matrixCol(label, key, state, cells) {
      var col = el('div', { className: 'perm-col' });
      col.appendChild(el('div', { className: 'perm-col-label', text: label }));
      var wrap = el('div', { className: 'perm-bits' });
      ['r', 'w', 'x'].forEach(function (b) {
        var lab = el('label', { className: 'perm-bit' });
        var cb = el('input', { type: 'checkbox', 'aria-label': label + ' ' + EX_BIT_NAMES[b] + ' permission' });
        cb.addEventListener('change', function () { state[key][b] = cb.checked; });
        lab.appendChild(cb);
        var span = el('span', { text: b });
        lab.appendChild(span);
        if (cells) cells[key + '-' + b] = span;
        wrap.appendChild(lab);
      });
      col.appendChild(wrap);
      return col;
    }

    function matrixSpecialCol(state, cells) {
      var col = el('div', { className: 'perm-col perm-col-special' });
      col.appendChild(el('div', { className: 'perm-col-label', text: 'Special bits' }));
      var wrap = el('div', { className: 'perm-bits perm-bits-stack' });
      [['setuid', 'suid'], ['setgid', 'sgid'], ['sticky', 'sticky']].forEach(function (t) {
        var lab = el('label', { className: 'perm-bit perm-bit-wide' });
        var cb = el('input', { type: 'checkbox', 'aria-label': t[0] + ' bit' });
        cb.addEventListener('change', function () { state.special[t[1]] = cb.checked; });
        lab.appendChild(cb);
        var span = el('span', { text: t[0] });
        lab.appendChild(span);
        if (cells) cells['special-' + t[1]] = span;
        wrap.appendChild(lab);
      });
      col.appendChild(wrap);
      return col;
    }

    function renderQuestion() {
      var ex = session.exercise;
      var meta = App.permExercise.TYPE_META[ex.type] || {};
      var wrap = el('div', { className: 'perm-ex-question-wrap' });
      var card = el('div', { className: 'question-card perm-ex-card' });
      card.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap', alignItems: 'center' } }, [
        el('span', { className: 'chip chip-cyan', text: meta.label || ex.type }),
        el('span', { className: 'chip chip-muted', text: EX_DIFF_LABELS[meta.difficulty] || 'Difficulty: ' + (meta.difficulty || '?') })
      ]));
      card.appendChild(el('div', { className: 'question-text', text: ex.prompt }));
      if (ex.detail && ex.detail.requirements && ex.detail.requirements.length) {
        var ul = el('ul', { className: 'perm-ex-reqs' });
        ex.detail.requirements.forEach(function (r) { ul.appendChild(el('li', { text: r })); });
        card.appendChild(ul);
      }
      wrap.appendChild(card);

      var answerBox = el('div', { className: 'perm-ex-answer mt-2' });
      var answer = { get: function () { return null; }, ready: function () { return false; }, focus: function () {} };
      var submitted = false;
      var cells = {};
      var optsWrap = null;

      function submit() {
        if (submitted || session.submitted) return;
        if (!answer.ready()) { App.toast('Enter an answer first', 'error'); return; }
        doSubmit(answer.get(), false);
      }
      currentSubmit = submit;

      function doSubmit(value, skipped) {
        if (submitted) return;
        submitted = true;
        session.submitted = true;
        var result = App.permExercise.validateExerciseAnswer(ex, value);
        if (skipped) {
          result.correct = false;
          result.actualText = 'Skipped';
          if (result.detail && result.detail.comparison) result.detail.comparison.actual = 'Skipped';
          if (!result.detail) result.detail = { title: 'Not quite', comparison: { expected: result.expectedText, actual: 'Skipped' }, points: [], perClass: null, remember: [] };
        }
        updateStats(ex, result);
        markResult(result);
        lockControls();
        actionRow.style.display = 'none';
        renderFeedback(result);
      }

      function updateStats(ex, result) {
        if (result.correct) session.stats.correct++; else session.stats.incorrect++;
        setStats();
        if (result.correct) {
          if (session.focus[ex.type]) session.focus[ex.type] = Math.max(0, session.focus[ex.type] - 1);
          return;
        }
        session.focus[ex.type] = Math.min(3, (session.focus[ex.type] || 0) + 1);
        var diff = result.diff || [];
        diff.forEach(function (d) {
          if (d.cls === 'special') return;
          var key = d.cls + '-' + d.bit;
          if (session.weak.indexOf(key) === -1) session.weak.push(key);
        });
        session.weak = session.weak.slice(-3);
      }

      function markResult(result) {
        if (ex.accepts === 'mcq' && optsWrap) {
          var picked = typeof answer.get() === 'number' ? answer.get() : null;
          var btns = optsWrap.querySelectorAll('.option-btn');
          for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove('selected');
            if (i === ex.detail.answerIndex) btns[i].classList.add('correct');
            else if (i === picked) btns[i].classList.add('wrong');
          }
        } else if (ex.accepts === 'matrix') {
          (result.diff || []).forEach(function (d) {
            var span = cells[d.cls + '-' + d.bit];
            if (span) span.classList.add(d.expected ? 'ex-miss' : 'ex-extra');
          });
        }
        if (!result.correct && ex.accepts !== 'mcq') {
          answerBox.classList.remove('shake');
          void answerBox.offsetWidth;
          answerBox.classList.add('shake');
        }
      }

      function lockControls() {
        wrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; });
        wrap.querySelectorAll('.perms-grid input[type=checkbox]').forEach(function (cb) { cb.disabled = true; });
        wrap.querySelectorAll('.perm-ex-answer input[type=text]').forEach(function (inp) { inp.disabled = true; });
      }

      if (ex.accepts === 'mcq') {
        optsWrap = el('div', { className: 'options-list' });
        ex.detail.options.forEach(function (opt, i) {
          optsWrap.appendChild(el('button', {
            className: 'option-btn',
            onClick: function () {
              if (submitted || session.submitted) return;
              optsWrap.querySelectorAll('.option-btn').forEach(function (b, j) { b.classList.toggle('selected', j === i); });
              doSubmit(i, false);
            }
          }, [
            el('span', { className: 'option-key', text: String(i + 1) }),
            el('span', { html: inlineHtml(opt) })
          ]));
        });
        answerBox.appendChild(optsWrap);
        answer.get = function () {
          var sel = optsWrap.querySelector('.option-btn.selected');
          return sel ? Array.prototype.indexOf.call(optsWrap.children, sel) : null;
        };
        answer.ready = function () { return answer.get() != null; };
      } else if (ex.accepts === 'matrix') {
        var mstate = emptyPermState();
        var grid = el('div', { className: 'perms-grid perm-ex-grid' });
        if (hasSpecialBit(ex.answer)) grid.appendChild(matrixSpecialCol(mstate, cells));
        grid.appendChild(matrixCol('User (u)', 'user', mstate, cells));
        grid.appendChild(matrixCol('Group (g)', 'group', mstate, cells));
        grid.appendChild(matrixCol('Other (o)', 'other', mstate, cells));
        answerBox.appendChild(grid);
        // Live readout: toggling bits updates the symbolic and octal forms so
        // the relationship between the matrix, rwx, and digits stays visible.
        var readout = el('div', { className: 'perm-ex-readout', 'aria-hidden': 'true' });
        function renderReadout() {
          var r = App.tools.permsFromMode(mstate.special, mstate.user, mstate.group, mstate.other);
          readout.innerHTML = '';
          readout.appendChild(el('span', { className: 'mono perm-ex-readout-sym', text: r.symbolic }));
          readout.appendChild(el('span', { className: 'perm-ex-readout-sep', 'aria-hidden': 'true', text: '=' }));
          readout.appendChild(el('span', { className: 'mono perm-ex-readout-oct', text: r.octal }));
          if (hasSpecialBit(mstate)) readout.appendChild(el('span', { className: 'perm-ex-readout-cmd', text: r.command }));
          readout.classList.remove('flash');
          void readout.offsetWidth;
          readout.classList.add('flash');
        }
        grid.querySelectorAll('input[type=checkbox]').forEach(function (cb) {
          cb.addEventListener('change', renderReadout);
        });
        renderReadout();
        answerBox.appendChild(readout);
        answer.get = function () { return mstate; };
        answer.ready = function () { return true; };
      } else {
        var ph = ex.accepts === 'octal' ? 'e.g. 755 or 4755' : ex.accepts === 'symbolic' ? 'e.g. rwxr-xr--' : ex.accepts === 'chmod' ? 'e.g. chmod 755 script.sh' : 'e.g. chmod g+x script.sh';
        var input = el('input', {
          className: 'form-control mono', type: 'text', placeholder: ph,
          'aria-label': 'Your answer', autocomplete: 'off', spellcheck: 'false',
          style: { maxWidth: '360px' }
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });
        answerBox.appendChild(input);
        answer.get = function () { return input.value; };
        answer.ready = function () { return input.value.trim() !== ''; };
        answer.focus = function () { input.focus(); };
        setTimeout(function () { input.focus(); }, 0);
      }
      wrap.appendChild(answerBox);

      var actionRow = el('div', { className: 'perm-ex-actions mt-2' });
      actionRow.appendChild(el('button', { className: 'btn btn-primary', text: 'Submit', onClick: submit }));
      actionRow.appendChild(el('button', {
        className: 'btn btn-ghost', text: 'Skip',
        onClick: function () { if (!submitted && !session.submitted) doSubmit(null, true); }
      }));
      actionRow.appendChild(el('button', {
        className: 'btn btn-ghost', text: 'Exit',
        onClick: function () { session = null; currentSubmit = null; setStats(); renderIdle(); }
      }));
      wrap.appendChild(actionRow);

      function renderFeedback(result) {
        var detail = result.detail || {};
        var fb = el('div', { className: 'perm-ex-feedback' + (result.correct ? ' ok' : ' bad'), role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
        fb.appendChild(el('div', { className: 'feedback-status ' + (result.correct ? 'feedback-correct' : 'feedback-incorrect') }, [
          el('span', { className: 'feedback-icon', text: result.correct ? '✓' : '✗' }),
          el('span', { className: 'feedback-label', text: detail.title || (result.correct ? 'Correct' : 'Not quite') })
        ]));
        if (detail.comparison) {
          fb.appendChild(el('div', { className: 'perm-ex-compare' }, [
            el('div', { className: 'perm-ex-compare-item' }, [
              el('span', { className: 'perm-ex-compare-label', text: 'Your answer' }),
              el('span', { className: 'mono perm-ex-compare-bad', text: detail.comparison.actual })
            ]),
            el('div', { className: 'perm-ex-compare-item' }, [
              el('span', { className: 'perm-ex-compare-label', text: 'Expected' }),
              el('span', { className: 'mono perm-ex-compare-good', text: detail.comparison.expected })
            ])
          ]));
        } else if (result.correct && result.expectedText) {
          fb.appendChild(el('div', { className: 'flex gap-sm mb-1', style: { flexWrap: 'wrap' } }, [
            el('span', { className: 'text-muted', text: 'Answer:' }),
            el('span', { className: 'mono', style: { color: 'var(--accent-green)' }, text: result.expectedText })
          ]));
        }
        if (detail.perClass && detail.perClass.length) {
          var clsWrap = el('div', { className: 'perm-ex-classes', role: 'group', 'aria-label': 'Permission comparison' });
          detail.perClass.forEach(function (row) {
            clsWrap.appendChild(el('div', { className: 'perm-ex-class' + (row.ok ? ' ok' : ' bad') }, [
              el('span', { className: 'perm-ex-class-label', text: row.label }),
              el('span', { className: 'mono perm-ex-class-sym', text: row.expected, 'aria-label': row.label + ' expected ' + row.expected }),
              el('span', { className: 'perm-ex-class-arrow', 'aria-hidden': 'true', text: '→' }),
              el('span', { className: 'mono perm-ex-class-sym', text: row.actual, 'aria-label': row.label + ' yours ' + row.actual }),
              el('span', { className: 'perm-ex-class-status', 'aria-hidden': 'true', text: row.ok ? '✓' : '✕' })
            ]));
          });
          fb.appendChild(clsWrap);
        }
        if (detail.points && detail.points.length) {
          var pl = el('ul', { className: 'perm-ex-points' });
          detail.points.forEach(function (p) {
            pl.appendChild(el('li', { className: 'perm-ex-point ' + (p.tone || 'info') }, [
              el('span', { className: 'perm-ex-point-icon', 'aria-hidden': 'true', text: p.tone === 'ok' ? '✓' : p.tone === 'warn' ? '✕' : '•' }),
              el('span', { text: p.text })
            ]));
          });
          fb.appendChild(pl);
        }
        if (detail.remember && detail.remember.length) {
          fb.appendChild(el('div', { className: 'perm-ex-remember' }, [
            el('span', { className: 'perm-ex-remember-label', text: 'Remember' }),
            el('span', { text: detail.remember.join(' ') })
          ]));
        }
        var row = el('div', { className: 'perm-ex-actions mt-2' });
        var done = !!(session.config.length && session.stats.n >= session.config.length);
        row.appendChild(el('button', {
          className: 'btn btn-primary', text: done ? 'See results' : 'Next exercise',
          onClick: function () { if (done) swapStage(renderSummary); else nextExercise(); }
        }));
        row.appendChild(el('button', {
          className: 'btn btn-ghost', text: 'Exit',
          onClick: function () { session = null; currentSubmit = null; setStats(); renderIdle(); }
        }));
        fb.appendChild(row);
        wrap.appendChild(fb);
        var nextBtn = row.querySelector('.btn-primary');
        if (nextBtn) nextBtn.focus();
      }

      return wrap;
    }

    function renderSummary() {
      var s = session.stats;
      var total = s.correct + s.incorrect;
      var pct = total ? Math.round(s.correct / total * 100) : 0;
      var wrap = el('div', { className: 'perm-ex-summary' });
      wrap.appendChild(el('div', { className: 'feedback-status ' + (pct >= 70 ? 'feedback-correct' : 'feedback-incorrect') }, [
        el('span', { className: 'feedback-icon', text: pct >= 70 ? '✓' : '✗' }),
        el('span', { className: 'feedback-label', text: 'Session complete' })
      ]));
      wrap.appendChild(el('p', { className: 'text-muted mt-1', style: { fontSize: '0.85rem' },
        text: total ? 'You answered ' + total + ' questions. Practicing again generates a fresh set — the engine adapts to the concepts you missed.' : 'No questions were answered in this session.' }));
      if (total) {
        var grid = el('div', { className: 'perm-ex-summary-grid' });
        [['Correct', String(s.correct), 'var(--accent-green)'], ['Incorrect', String(s.incorrect), 'var(--accent-red)'], ['Accuracy', pct + '%', 'var(--accent-cyan)']].forEach(function (cell) {
          grid.appendChild(el('div', { className: 'perm-ex-summary-cell' }, [
            el('div', { className: 'perm-ex-summary-num', style: { color: cell[2] }, text: cell[1] }),
            el('div', { className: 'perm-ex-summary-label', text: cell[0] })
          ]));
        });
        wrap.appendChild(grid);
      }
      var row = el('div', { className: 'perm-ex-actions mt-2' });
      row.appendChild(el('button', { className: 'btn btn-primary', text: 'Practice again', onClick: function () { startSession(JSON.parse(JSON.stringify(session.config))); } }));
      row.appendChild(el('button', { className: 'btn btn-secondary', text: 'Change settings', onClick: function () { swapStage(renderConfig); } }));
      row.appendChild(el('button', { className: 'btn btn-ghost', text: 'Done', onClick: renderIdle }));
      wrap.appendChild(row);
      return wrap;
    }

    renderIdle();
    return section;
  }
  function viewTools(root) {
    root.appendChild(el('h1', { text: 'Tools' }));
    var tabs = [
      { id: 'subnet', name: 'Subnet Calc' },
      { id: 'convert', name: 'Number Convert' },
      { id: 'ports', name: 'Port Reference' },
      { id: 'cmds', name: 'Linux Commands' },
      { id: 'perms', name: 'Permissions' }
    ];
    var active = 'subnet';
    var tabRow = el('div', { className: 'tools-tabs', role: 'tablist', 'aria-label': 'Tools' });
    var panels = {};
    function activateTab(id) {
      active = id;
      tabRow.querySelectorAll('.tool-tab').forEach(function (b, i) {
        var isActive = tabs[i].id === id;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('active', k === id); });
    }
    tabs.forEach(function (t) {
      var btn = el('button', {
        className: 'tool-tab' + (t.id === active ? ' active' : ''),
        role: 'tab',
        id: 'tool-tab-' + t.id,
        'aria-selected': t.id === active ? 'true' : 'false',
        'aria-controls': 'tool-panel-' + t.id,
        text: t.name,
        onClick: function () { activateTab(t.id); },
        onKeydown: function (e) {
          var idx = tabs.findIndex(function (x) { return x.id === t.id; });
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
          else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
          else if (e.key === 'Home') next = tabs[0];
          else if (e.key === 'End') next = tabs[tabs.length - 1];
          if (next) {
            e.preventDefault();
            activateTab(next.id);
            var nb = document.getElementById('tool-tab-' + next.id);
            if (nb) nb.focus();
          }
        }
      });
      tabRow.appendChild(btn);
    });
    root.appendChild(tabRow);

    var subnetPanel = el('div', { className: 'tool-panel active', role: 'tabpanel', id: 'tool-panel-subnet', 'aria-labelledby': 'tool-tab-subnet' });
    panels.subnet = subnetPanel;
    var ipInp = el('input', { className: 'form-control', type: 'text', value: '192.168.1.0', placeholder: 'IP address', id: 'subnet-ip' });
    var cidrInp = el('input', { className: 'form-control', type: 'number', value: '24', min: '0', max: '32', id: 'subnet-cidr' });
    var resultBox = el('div', { className: 'panel mt-2' });
    var splitBox = el('div', { className: 'mt-2' });
    function runSubnet() {
      var r = App.tools.calcSubnet(ipInp.value.trim(), cidrInp.value);
      resultBox.innerHTML = '';
      if (r.error) { resultBox.appendChild(el('p', { className: 'text-red', text: r.error })); return; }
      [['Network', r.network + '/' + r.cidr], ['Broadcast', r.broadcast], ['First usable', r.firstUsable],
       ['Last usable', r.lastUsable], ['Usable hosts', String(r.usableHosts)], ['Subnet mask', r.mask],
       ['Wildcard', r.wildcard], ['Class', r.class], ['Scope', r.scope]].forEach(function (f) {
        resultBox.appendChild(el('div', { className: 'flex-between mb-1' }, [
          el('span', { className: 'text-muted', text: f[0] }), el('span', { className: 'mono', text: f[1] })
        ]));
      });
      splitBox.innerHTML = '';
      splitBox.appendChild(el('div', { className: 'label-upper mb-1', text: 'Split subnets' }));
      var newCidr = el('input', { className: 'form-control', type: 'number', value: String(Number(cidrInp.value) + 1), min: String(Number(cidrInp.value) + 1), max: '32', 'aria-label': 'New prefix', style: { maxWidth: '100px' } });
      splitBox.appendChild(el('div', { className: 'flex gap-sm mb-1', style: { alignItems: 'center' } }, [
        el('span', { text: 'New prefix:' }), newCidr,
        el('button', {
          className: 'btn btn-secondary btn-sm', text: 'Generate',
          onClick: function () {
            var list = App.tools.splitSubnets(r.networkInt, r.cidr, Number(newCidr.value));
            var tbl = el('table', { className: 'ref-table mt-1' });
            tbl.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Network' }), el('th', { text: 'Broadcast' }), el('th', { text: 'Hosts' })])]));
            var tb = el('tbody');
            list.slice(0, 64).forEach(function (s) {
              tb.appendChild(el('tr', {}, [
                el('td', { className: 'mono', text: s.network }),
                el('td', { className: 'mono', text: s.broadcast }),
                el('td', { text: String(s.hosts) })
              ]));
            });
            tbl.appendChild(tb);
            var existing = splitBox.querySelector('table');
            if (existing) existing.remove();
            splitBox.appendChild(tbl);
          }
        })
      ]));
    }
    subnetPanel.appendChild(el('div', { className: 'form-row' }, [
      el('div', { className: 'form-group' }, [el('label', { for: 'subnet-ip', text: 'IP Address' }), ipInp]),
      el('div', { className: 'form-group' }, [el('label', { for: 'subnet-cidr', text: 'CIDR' }), cidrInp])
    ]));
    subnetPanel.appendChild(el('button', { className: 'btn btn-primary', text: 'Calculate', onClick: runSubnet }));
    subnetPanel.appendChild(resultBox);
    subnetPanel.appendChild(splitBox);
    runSubnet();
    root.appendChild(subnetPanel);

    var convPanel = el('div', { className: 'tool-panel', role: 'tabpanel', id: 'tool-panel-convert', 'aria-labelledby': 'tool-tab-convert' });
    panels.convert = convPanel;
    var bases = [{ id: 'decimal', base: 10, label: 'Decimal' }, { id: 'hex', base: 16, label: 'Hex' }, { id: 'octal', base: 8, label: 'Octal' }, { id: 'binary', base: 2, label: 'Binary' }];
    var inputs = {};
    bases.forEach(function (b) {
      var inp = el('input', { className: 'form-control mono', type: 'text', id: 'num-' + b.id });
      inputs[b.id] = inp;
      convPanel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { for: 'num-' + b.id, text: b.label }), inp]));
      inp.addEventListener('input', function () {
        var r = App.tools.convertNumber(inp.value, b.base);
        if (!r) return;
        bases.forEach(function (ob) { if (ob.id !== b.id) inputs[ob.id].value = r[ob.id]; });
      });
    });
    inputs.decimal.value = '255';
    inputs.decimal.dispatchEvent(new Event('input'));
    root.appendChild(convPanel);

    var portPanel = el('div', { className: 'tool-panel', role: 'tabpanel', id: 'tool-panel-ports', 'aria-labelledby': 'tool-tab-ports' });
    panels.ports = portPanel;
    var portSearch = el('input', { className: 'form-control mb-2', type: 'search', placeholder: 'Search ports…', 'aria-label': 'Search ports', style: { maxWidth: '280px' } });
    portPanel.appendChild(portSearch);
    var portTable = el('table', { className: 'ref-table' });
    portTable.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Port' }), el('th', { text: 'Service' }), el('th', { text: 'Description' })])]));
    var portBody = el('tbody');
    portTable.appendChild(portBody);
    portPanel.appendChild(portTable);
    function renderPorts(q) {
      portBody.innerHTML = '';
      q = (q || '').toLowerCase();
      var hl = App.tools.getHighlightPort();
      App.tools.getPorts().filter(function (p) {
        if (!q) return true;
        return (p.port + ' ' + p.name + ' ' + p.desc).toLowerCase().indexOf(q) >= 0;
      }).forEach(function (p) {
        var tr = el('tr', { className: (hl && String(p.port).indexOf(String(hl)) >= 0) ? 'highlight' : '' });
        tr.appendChild(el('td', { className: 'mono', text: p.port }));
        tr.appendChild(el('td', { text: p.name }));
        tr.appendChild(el('td', { html: inlineHtml(p.desc) }));
        portBody.appendChild(tr);
      });
    }
    renderPorts();
    portSearch.addEventListener('input', function () { renderPorts(portSearch.value); });
    if (App.tools.getHighlightPort()) activateTab('ports');
    root.appendChild(portPanel);

    var cmdPanel = el('div', { className: 'tool-panel', role: 'tabpanel', id: 'tool-panel-cmds', 'aria-labelledby': 'tool-tab-cmds' });
    panels.cmds = cmdPanel;
    var cmdSearch = el('input', { className: 'form-control mb-2', type: 'search', placeholder: 'Search commands…', 'aria-label': 'Search commands', style: { maxWidth: '280px' } });
    cmdPanel.appendChild(cmdSearch);
    var cmdTable = el('table', { className: 'ref-table' });
    cmdTable.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Command' }), el('th', { text: 'Description' }), el('th', { text: 'Example' })])]));
    var cmdBody = el('tbody');
    cmdTable.appendChild(cmdBody);
    cmdPanel.appendChild(cmdTable);
    function renderCmds(q) {
      cmdBody.innerHTML = '';
      q = (q || '').toLowerCase();
      var hl = App.tools.getHighlightCommand();
      App.tools.getCommands().filter(function (c) {
        if (!q) return true;
        return (c.cmd + ' ' + c.desc + ' ' + c.example).toLowerCase().indexOf(q) >= 0;
      }).forEach(function (c) {
        var tr = el('tr', { className: (hl && c.cmd === hl) ? 'highlight' : '' });
        tr.appendChild(el('td', { className: 'mono', text: c.cmd }));
        tr.appendChild(el('td', { html: inlineHtml(c.desc) }));
        var exTd = el('td');
        var exampleBox = el('div', { className: 'terminal-command' });
        exampleBox.appendChild(el('code', { className: 'mono terminal-command-text', text: c.example }));
        exampleBox.appendChild(el('button', {
          className: 'btn btn-ghost btn-sm terminal-command-copy',
          text: 'Copy',
          'aria-label': 'Copy example command',
          title: 'Copy example command',
          onClick: function () { utils.copyText(c.example).then(function () { App.toast('Copied', 'success', 1200); }); }
        }));
        exTd.appendChild(exampleBox);
        tr.appendChild(exTd);
        cmdBody.appendChild(tr);
      });
    }
    renderCmds();
    cmdSearch.addEventListener('input', function () { renderCmds(cmdSearch.value); });
    if (App.tools.getHighlightCommand()) activateTab('cmds');
    root.appendChild(cmdPanel);

    var permsPanel = buildPermsPanel();
    panels.perms = permsPanel;
    permsPanel.setAttribute('role', 'tabpanel');
    permsPanel.setAttribute('id', 'tool-panel-perms');
    permsPanel.setAttribute('aria-labelledby', 'tool-tab-perms');
    root.appendChild(permsPanel);
    if (App.tools.getHighlightTool && App.tools.getHighlightTool() === 'perms') activateTab('perms');
  }

  var THEME_META = [
    { id: 'monokai', name: 'Monokai', desc: 'Classic editor palette', colors: ['#272822', '#a6e22e', '#66d9ef', '#f92672'] },
    { id: 'dracula', name: 'Dracula', desc: 'Purple · pink · cyan', colors: ['#282a36', '#bd93f9', '#50fa7b', '#8be9fd'] },
    { id: 'one-dark', name: 'One Dark', desc: 'Restrained & professional', colors: ['#282c34', '#61afef', '#98c379', '#d19a66'] },
    { id: 'github-dark', name: 'GitHub Dark', desc: 'Crisp GitHub palette', colors: ['#0d1117', '#58a6ff', '#3fb950', '#bc8cff'] },
    { id: 'nord', name: 'Nord', desc: 'Calm arctic frost', colors: ['#2e3440', '#88c0d0', '#a3be8c', '#bf616a'] },
    { id: 'gruvbox-dark', name: 'Gruvbox Dark', desc: 'Warm retro earthy', colors: ['#282828', '#fabd2f', '#b8bb26', '#83a598'] },
    { id: 'tokyo-night', name: 'Tokyo Night', desc: 'Luminous indigo', colors: ['#1a1b26', '#7aa2f7', '#9ece6a', '#bb9af7'] },
    { id: 'catppuccin', name: 'Catppuccin', desc: 'Soft pastel mocha', colors: ['#1e1e2e', '#cba6f7', '#a6e3a1', '#89dceb'] },
    { id: 'tomorrow-night', name: 'Tomorrow Night', desc: 'Timeless classic', colors: ['#1d1f21', '#81a2be', '#8abeb7', '#cc6666'] },
    { id: 'xcode', name: 'Xcode', desc: 'Clean developer blue', colors: ['#232329', '#4da3ff', '#7ac943', '#ff9f0a'] },
    { id: 'light', name: 'Light', desc: 'Classic light', colors: ['#ffffff', '#6c5ce7', '#1f9d61', '#0891b2'] },
    // Legacy — still resolved for existing saved preferences, but not selectable.
    { id: 'purple-night', name: 'Purple Night', desc: 'Deep purple technical', colors: ['#0d0b24', '#a78bfa', '#3dd68c', '#5ad1e6'], legacy: true },
    { id: 'solarized-dark', name: 'Solarized Dark', desc: 'Muted earthy tones', colors: ['#073642', '#268bd2', '#859900', '#b58900'], legacy: true }
  ];
  var themePickerOpen = false;

  function themeMeta(id) {
    for (var i = 0; i < THEME_META.length; i++) if (THEME_META[i].id === id) return THEME_META[i];
    return THEME_META[0];
  }

  function buildThemePicker(settings, root) {
    var current = App.core.normalizeTheme(settings.theme || 'monokai');
    var meta = themeMeta(current);
    var panel = el('div', { className: 'panel theme-panel mb-3' + (themePickerOpen ? ' open' : '') });
    var head = el('button', {
      className: 'theme-picker-head',
      'aria-expanded': themePickerOpen ? 'true' : 'false',
      'aria-controls': 'theme-picker-body',
      onClick: function () {
        themePickerOpen = !themePickerOpen;
        panel.classList.toggle('open', themePickerOpen);
        head.setAttribute('aria-expanded', themePickerOpen ? 'true' : 'false');
      }
    });
    head.appendChild(el('span', { className: 'label-upper', text: 'Theme' }));
    head.appendChild(el('span', { className: 'theme-summary' }, [
      el('span', { className: 'theme-swatches' }, meta.colors.map(function (c) { return el('i', { style: { background: c } }); })),
      el('span', { text: meta.name })
    ]));
    head.appendChild(el('span', { className: 'theme-chevron', 'aria-hidden': 'true', text: '▾' }));
    panel.appendChild(head);
    var body = el('div', { className: 'theme-picker-body', id: 'theme-picker-body' });
    var inner = el('div', { className: 'theme-picker-body-inner' });
    var wrap = el('div');
    var grid = el('div', { className: 'theme-grid' });
    THEME_META.forEach(function (t) {
      if (t.legacy) return; // retired themes are not selectable
      var isSel = t.id === current;
      grid.appendChild(el('button', {
        className: 'theme-card' + (isSel ? ' selected' : ''),
        'aria-pressed': isSel ? 'true' : 'false',
        onClick: function () {
          settings.theme = t.id;
          App.store.saveSettings(settings);
          App.core.applyTheme(t.id);
          root.innerHTML = '';
          viewSettings(root);
        }
      }, [
        el('span', { className: 'theme-card-swatches' }, t.colors.map(function (c) { return el('i', { style: { background: c } }); })),
        el('span', { className: 'theme-card-name', text: t.name }),
        el('span', { className: 'theme-card-desc', text: t.desc }),
        isSel ? el('span', { className: 'theme-card-check', text: '✓' }) : null
      ]));
    });
    wrap.appendChild(grid);
    inner.appendChild(wrap);
    body.appendChild(inner);
    panel.appendChild(body);
    return panel;
  }

  var BACKUP_TYPE_META = [
    { id: 'everything', title: 'Everything', desc: 'Study data + certification material' },
    { id: 'user', title: 'Statistics & Study Data', desc: 'Progress, answers, flashcard history, exams, labs, notes, and study activity.' },
    { id: 'material', title: 'Study Material', desc: 'Questions, flashcards, labs, notes, and certification metadata.' }
  ];

  function backupIcon(kind) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');
    if (kind === 'export') {
      svg.innerHTML = '<path d="M8 2v7M5.5 6.5L8 9l2.5-2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11v1.5A1.5 1.5 0 004.5 14h7a1.5 1.5 0 001.5-1.5V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
    } else {
      svg.innerHTML = '<path d="M8 14V7M5.5 9.5L8 7l2.5 2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11v1.5A1.5 1.5 0 004.5 14h7a1.5 1.5 0 001.5-1.5V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
    }
    return svg;
  }

  // Shared, compact export-configuration controls used inside the export modal.
  function buildBackupExportControls() {
    var selectedType = 'everything';
    var wrap = el('div');
    var typeRow = el('div', { className: 'backup-type-grid', role: 'radiogroup', 'aria-label': 'Backup export type' });
    var certPicker = el('div', { className: 'backup-cert-picker' });
    certPicker.appendChild(el('div', { className: 'backup-picker-title', text: 'Certifications to include' }));
    var certs = App.backup.getCertificationOptions();
    var allInput = el('input', { type: 'checkbox', checked: true });
    certPicker.appendChild(el('label', { className: 'backup-cert-all' }, [allInput, el('span', { text: 'All certifications' })]));
    var certRows = el('div', { className: 'backup-cert-list' });
    var certInputs = [];
    certs.forEach(function (cert) {
      var input = el('input', { type: 'checkbox', checked: true });
      input.dataset.certId = cert.id;
      certRows.appendChild(el('label', { className: 'backup-cert-option' }, [input, el('span', { text: cert.name })]));
      certInputs.push({ cert: cert, input: input });
      input.addEventListener('change', function () {
        var every = certInputs.length > 0 && certInputs.every(function (item) { return item.input.checked; });
        allInput.checked = every;
        allInput.indeterminate = !every && certInputs.some(function (item) { return item.input.checked; });
      });
    });
    allInput.addEventListener('change', function () {
      if (allInput.checked) certInputs.forEach(function (item) { item.input.checked = true; });
      allInput.indeterminate = false;
      certInputs.forEach(function (item) { item.input.disabled = allInput.checked; });
    });
    certPicker.appendChild(certRows);

    BACKUP_TYPE_META.forEach(function (option) {
      var input = el('input', { type: 'radio', name: 'reviewapp-backup-type', value: option.id });
      input.checked = option.id === selectedType;
      var card = el('label', { className: 'backup-type-option' }, [
        input,
        el('span', { className: 'backup-type-copy' }, [
          el('strong', { text: option.title }),
          el('span', { className: 'text-muted', text: option.desc })
        ])
      ]);
      input.addEventListener('change', function () {
        if (!input.checked) return;
        selectedType = option.id;
        certPicker.hidden = selectedType === 'user';
      });
      typeRow.appendChild(card);
    });
    wrap.appendChild(typeRow);
    wrap.appendChild(certPicker);

    return {
      wrap: wrap,
      getType: function () { return selectedType; },
      getCertIds: function () {
        if (selectedType === 'user') return [];
        return certInputs.filter(function (item) { return item.input.checked; }).map(function (item) { return item.cert.id; });
      },
      summary: function () {
        if (selectedType === 'user') return 'Statistics & Study Data · —';
        var names = certInputs.filter(function (item) { return item.input.checked; }).map(function (item) { return item.cert.name.replace(/^CompTIA\s+/, ''); });
        var certLabel = allInput.checked ? 'All certifications' : (names.length ? names.join(', ') : '—');
        return (selectedType === 'everything' ? 'Everything' : 'Study Material') + ' · ' + certLabel;
      }
    };
  }

  function buildBackupPanel() {
    var lastBackupLabel = el('span', { className: 'text-muted', text: 'No backup created yet' });

    var panel = el('div', { className: 'panel mb-3 backup-panel' });
    panel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Backup & data' }));
    panel.appendChild(el('p', { className: 'text-muted mb-2', text: 'Manage your study data and certification material.' }));

    var summary = el('span', { className: 'backup-summary mono', text: 'Everything · All certifications' });
    var tiles = el('div', { className: 'backup-tiles' });

    var exportTile = el('button', { className: 'backup-tile', type: 'button' }, [
      el('span', { className: 'backup-tile-icon' }, [backupIcon('export')]),
      el('span', { className: 'backup-tile-copy' }, [
        el('strong', { text: 'Export Backup' }),
        el('span', { className: 'text-muted', text: 'Create a portable ZIP backup' })
      ])
    ]);
    var importTile = el('button', { className: 'backup-tile', type: 'button' }, [
      el('span', { className: 'backup-tile-icon' }, [backupIcon('import')]),
      el('span', { className: 'backup-tile-copy' }, [
        el('strong', { text: 'Import Backup' }),
        el('span', { className: 'text-muted', text: 'Restore from a ReviewApp ZIP' })
      ])
    ]);
    tiles.appendChild(exportTile);
    tiles.appendChild(importTile);
    panel.appendChild(tiles);

    var meta = el('div', { className: 'backup-meta' }, [
      el('span', { text: 'Current export: ' }),
      summary,
      el('span', { className: 'backup-meta-sep', text: '·' }),
      el('span', { text: 'Last backup: ' }),
      lastBackupLabel
    ]);
    panel.appendChild(meta);

    // ── Export modal ────────────────────────────────────────
    exportTile.addEventListener('click', function () {
      var controls = buildBackupExportControls();
      var status = el('div', { className: 'backup-status text-muted', role: 'status', 'aria-live': 'polite' });
      var exportButton = el('button', { className: 'btn btn-primary', text: 'Export ZIP' });
      var cancelButton = el('button', { className: 'btn btn-secondary', text: 'Cancel' });
      var body = el('div', { className: 'backup-modal-body' }, [
        el('p', { className: 'text-muted mb-2', text: 'Create one dated ZIP to move your ReviewApp progress, certification material, or both.' }),
        controls.wrap,
        status,
        el('div', { className: 'backup-modal-actions' }, [cancelButton, exportButton])
      ]);
      App.core.openModal(body, { title: 'Export Backup' });

      function markSuccess(filename) {
        summary.textContent = controls.summary();
        lastBackupLabel.textContent = 'Just now · ' + filename;
      }

      exportButton.addEventListener('click', function () {
        var ids = controls.getCertIds();
        if (controls.getType() !== 'user' && !ids.length) {
          status.textContent = 'Select at least one certification.';
          status.className = 'backup-status backup-error';
          return;
        }
        exportButton.disabled = true;
        cancelButton.disabled = true;
        status.className = 'backup-status text-muted';
        status.textContent = 'Preparing backup…';
        App.backup.exportZip(controls.getType(), ids, function (message) { status.textContent = message; }).then(function (result) {
          utils.downloadBlob(result.blob, result.filename);
          markSuccess(result.filename);
          App.toast('Backup created successfully', 'success', 3500);
          App.core.closeModal();
        }).catch(function (err) {
          exportButton.disabled = false;
          cancelButton.disabled = false;
          status.className = 'backup-status backup-error';
          status.textContent = 'Export failed: ' + err.message;
          App.toast('Backup export failed', 'error');
        });
      });
      cancelButton.addEventListener('click', function () { App.core.closeModal(); });
    });

    // ── Import modal ────────────────────────────────────────
    importTile.addEventListener('click', function () {
      var fileInput = el('input', { type: 'file', accept: '.zip,application/zip', hidden: true });
      var chooseButton = el('button', { className: 'btn btn-secondary', text: 'Choose ZIP' });
      var chosenName = el('span', { className: 'text-muted backup-file-name', text: 'Select a ReviewApp ZIP backup.' });
      var status = el('div', { className: 'backup-status text-muted', role: 'status', 'aria-live': 'polite' });
      var importButton = el('button', { className: 'btn btn-primary', text: 'Import Backup', disabled: true });
      var cancelButton = el('button', { className: 'btn btn-secondary', text: 'Cancel' });
      var preview = el('div', { className: 'backup-preview', hidden: true });
      var pending = null;
      var conflictSelects = {};

      var body = el('div', { className: 'backup-modal-body' }, [
        el('p', { className: 'text-muted mb-2', text: 'Restore from a ReviewApp backup ZIP. The archive is inspected before anything changes.' }),
        fileInput,
        el('div', { className: 'backup-action-row mb-2' }, [chooseButton, chosenName]),
        preview,
        status,
        el('div', { className: 'backup-modal-actions' }, [cancelButton, importButton])
      ]);
      App.core.openModal(body, { title: 'Import Backup' });

      function renderPreview(pkg) {
        pending = pkg;
        conflictSelects = {};
        preview.innerHTML = '';
        preview.appendChild(el('div', { className: 'backup-preview-title', text: 'Backup detected' }));
        preview.appendChild(el('div', { className: 'backup-preview-meta' }, [
          el('span', { text: 'Created: ' + utils.formatDate(new Date(pkg.manifest.createdAt).getTime()) }),
          el('span', { text: 'Type: ' + App.backup.typeLabel(pkg.manifest.exportType) })
        ]));
        if (pkg.manifest.includesUserData) {
          preview.appendChild(el('div', { className: 'backup-preview-block' }, [
            el('strong', { text: 'User data' }),
            el('p', { className: 'text-muted mb-0', text: '✓ Quiz statistics · ✓ Flashcard history · ✓ Exam history · ✓ Lab progress · ✓ Personal notes · ✓ Study activity' })
          ]));
        }
        if (pkg.manifest.includesStudyMaterial) {
          var materialList = el('ul', { className: 'backup-preview-list' });
          pkg.certifications.forEach(function (cert) { materialList.appendChild(el('li', { text: '✓ ' + cert.name })); });
          preview.appendChild(el('div', { className: 'backup-preview-block' }, [el('strong', { text: 'Study material included' }), materialList]));

          var currentIds = App.content.getCerts().map(function (cert) { return cert.id; });
          var conflicts = pkg.certifications.filter(function (cert) { return currentIds.indexOf(cert.id) >= 0; });
          if (conflicts.length) {
            var conflictBox = el('div', { className: 'backup-conflicts' });
            conflictBox.appendChild(el('strong', { text: 'Existing certification detected' }));
            conflictBox.appendChild(el('p', { className: 'text-muted mb-1', text: 'Choose how to handle each certification already installed. Keep is the safe default; Replace updates its material from this backup.' }));
            conflicts.forEach(function (cert) {
              var select = el('select', { className: 'form-control backup-conflict-select' }, [
                el('option', { value: 'keep', text: cert.name + ' — Keep existing material' }),
                el('option', { value: 'replace', text: cert.name + ' — Replace with backup material' })
              ]);
              conflictSelects[cert.id] = select;
              conflictBox.appendChild(select);
            });
            preview.appendChild(conflictBox);
          }
        }
        importButton.disabled = false;
        preview.hidden = false;
      }

      chooseButton.addEventListener('click', function () { fileInput.click(); });
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        pending = null;
        importButton.disabled = true;
        chosenName.textContent = file.name;
        preview.hidden = true;
        status.className = 'backup-status text-muted';
        status.textContent = 'Reading backup…';
        App.backup.inspect(file, function (message) { status.textContent = message; }).then(function (pkg) {
          renderPreview(pkg);
          status.textContent = 'Review the contents, then choose Import Backup.';
        }).catch(function (err) {
          status.className = 'backup-status backup-error';
          status.textContent = 'Unable to import backup: ' + err.message;
          App.toast('Backup validation failed', 'error');
        });
      });

      importButton.addEventListener('click', function () {
        if (!pending) return;
        var choices = {};
        Object.keys(conflictSelects).forEach(function (id) { choices[id] = conflictSelects[id].value; });
        var replacements = Object.keys(choices).filter(function (id) { return choices[id] === 'replace'; });
        var message = 'Import this ReviewApp backup?';
        if (replacements.length) message += '\n\nThis will replace material for ' + replacements.length + ' existing certification' + (replacements.length === 1 ? '' : 's') + '. Other certifications remain untouched.';
        else if (pending.manifest.includesStudyMaterial) message += '\n\nExisting certifications will be kept; new certifications will be added.';
        if (!confirm(message)) return;
        importButton.disabled = true;
        cancelButton.disabled = true;
        status.className = 'backup-status text-muted';
        status.textContent = 'Restoring backup…';
        App.backup.importPackage(pending, choices, function (update) { status.textContent = update; }).then(function (result) {
          var count = result.material.imported;
          var summaryText = 'Backup imported successfully';
          if (count) summaryText += ' · ' + count + ' certification' + (count === 1 ? '' : 's') + ' restored';
          App.toast(summaryText, 'success', 4000);
          lastBackupLabel.textContent = 'Just now';
          App.core.closeModal();
          App.core.handleRoute();
        }).catch(function (err) {
          importButton.disabled = false;
          cancelButton.disabled = false;
          status.className = 'backup-status backup-error';
          status.textContent = 'Import failed: ' + err.message;
          App.toast('Backup import failed', 'error');
        });
      });
      cancelButton.addEventListener('click', function () { App.core.closeModal(); });
    });

    // Wipe progress stays as its own independent destructive action.
    panel.appendChild(el('div', { className: 'backup-divider' }));
    panel.appendChild(el('button', {
      className: 'btn btn-danger btn-sm', text: 'Wipe progress',
      onClick: function () {
        if (confirm('Delete all answers, streaks, exams, and card progress? This cannot be undone.')) {
          App.store.wipeProgress();
          App.toast('Progress wiped', 'info');
          App.core.handleRoute();
        }
      }
    }));
    return panel;
  }

  function viewSettings(root) {
    root.appendChild(el('h1', { text: 'Settings' }));
    var settings = App.store.getSettings();

    // ── Appearance ──
    root.appendChild(el('div', { className: 'settings-section', text: 'Appearance' }));
    root.appendChild(buildThemePicker(settings, root));

    var accessPanel = el('div', { className: 'panel mb-3' });
    accessPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Text size' }));
    accessPanel.appendChild(el('p', { className: 'text-muted mb-2', text: 'Choose a comfortable reading size. This setting applies across the app and is saved on this device.' }));
    var sizeRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Text size' });
    ['small', 'medium', 'large'].forEach(function (size) {
      var isCurrent = (settings.textSize || 'medium') === size;
      sizeRow.appendChild(el('button', {
        className: 'btn ' + (isCurrent ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
        text: size.charAt(0).toUpperCase() + size.slice(1),
        'aria-pressed': isCurrent ? 'true' : 'false',
        onClick: function () {
          settings.textSize = size;
          App.store.saveSettings(settings);
          App.core.applyTextSize(size);
          root.innerHTML = '';
          viewSettings(root);
        }
      }));
    });
    accessPanel.appendChild(sizeRow);
    root.appendChild(accessPanel);

    var motionPanel = el('div', { className: 'panel mb-3' });
    motionPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Animations' }));
    motionPanel.appendChild(el('p', { className: 'text-muted mb-2', text: 'Smooth transitions and micro-interactions across the app. Turn off for an instantly static interface.' }));
    var motionRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Animations' });
    var motionOn = settings.animations !== false;
    [['On', true], ['Off', false]].forEach(function (opt) {
      var isCurrent = motionOn === opt[1];
      motionRow.appendChild(el('button', {
        className: 'btn ' + (isCurrent ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
        text: opt[0],
        'aria-pressed': isCurrent ? 'true' : 'false',
        onClick: function () {
          settings.animations = opt[1];
          App.store.saveSettings(settings);
          App.core.applyMotion();
          root.innerHTML = '';
          viewSettings(root);
        }
      }));
    });
    motionPanel.appendChild(motionRow);
    root.appendChild(motionPanel);

    // ── Study ──
    root.appendChild(el('div', { className: 'settings-section', text: 'Study' }));
    var threshPanel = el('div', { className: 'panel mb-3' });
    threshPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Exam pass threshold' }));
    if (!settings.passThreshold) settings.passThreshold = {};
    App.content.getCerts().forEach(function (c) {
      var row = el('div', { className: 'form-group mb-1' });
      var thresh = stepperField({ id: 'thresh-' + c.id, min: '1', max: '100', value: String(settings.passThreshold[c.id] || 70) });
      thresh.el.style.maxWidth = '180px';
      thresh.input.addEventListener('change', function () {
        settings.passThreshold[c.id] = parseInt(thresh.input.value, 10) || 70;
        App.store.saveSettings(settings);
        App.toast('Threshold saved', 'success', 1500);
      });
      row.appendChild(el('label', { for: 'thresh-' + c.id, text: c.name }));
      row.appendChild(thresh.el);
      threshPanel.appendChild(row);
    });
    root.appendChild(threshPanel);

    // ── Data ──
    root.appendChild(el('div', { className: 'settings-section', text: 'Data' }));
    var contentPanel = el('div', { className: 'panel mb-3' });
    contentPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Content' }));
    contentPanel.appendChild(el('button', { className: 'btn btn-secondary btn-sm mb-2', text: 'Reload from certifications/', onClick: function () { App.content.reload(); } }));
    contentPanel.appendChild(el('p', { className: 'text-muted mb-1', style: { fontSize: '0.85rem' }, text: 'Deep scan: pick the certifications folder to load content without a web server.' }));
    var fileInp = el('input', { type: 'file', webkitdirectory: 'true', multiple: 'true', style: { display: 'none' }, id: 'deep-scan-input' });
    var saveSnap = el('input', { type: 'checkbox', id: 'save-snap' });
    contentPanel.appendChild(el('label', { style: { display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.88rem' } }, [
      saveSnap, document.createTextNode('Save snapshot to IndexedDB (survives refresh)')
    ]));
    contentPanel.appendChild(fileInp);
    contentPanel.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Deep-scan folder…', onClick: function () { fileInp.click(); } }));
    fileInp.addEventListener('change', function () {
      if (!fileInp.files || !fileInp.files.length) return;
      App.content.deepScan(fileInp.files, saveSnap.checked, function (found) {
        App.toast('Deep-scan: ' + found.questions + ' Q · ' + found.flashcards + ' cards · ' + found.labs + ' labs · ' + found.notes + ' notes from ' + found.files + ' files', 'success', 4500);
        App.core.handleRoute();
      });
    });
    root.appendChild(contentPanel);

    root.appendChild(buildBackupPanel());

    // ── About ──
    root.appendChild(el('div', { className: 'settings-section', text: 'About' }));
    var about = el('div', { className: 'panel' });
    about.appendChild(el('div', { className: 'label-upper mb-1', text: 'About' }));
    about.appendChild(el('p', { text: 'ReviewApp v1.3.5 — offline study hub for CompTIA Linux+ and Network+.' }));
    about.appendChild(el('p', { className: 'text-muted', style: { fontSize: '0.85rem' }, text: 'Vanilla HTML/CSS/JS. No network required. All data stays in your browser.' }));
    var c = App.content.counts();
    about.appendChild(el('p', { className: 'mono text-muted mt-1', style: { fontSize: '0.8rem' }, text: 'Loaded: ' + c.questions + 'Q · ' + c.flashcards + 'C · ' + c.labs + 'L · ' + c.notes + 'N' }));
    var attribution = el('div', { className: 'about-attribution' });
    var codeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    codeIcon.setAttribute('width', '13');
    codeIcon.setAttribute('height', '13');
    codeIcon.setAttribute('viewBox', '0 0 14 14');
    codeIcon.setAttribute('fill', 'none');
    codeIcon.setAttribute('aria-hidden', 'true');
    codeIcon.innerHTML = '<path d="M5 4L2 7l3 3M9 4l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
    attribution.appendChild(codeIcon);
    attribution.appendChild(document.createTextNode(' Created by mfundora19'));
    about.appendChild(attribution);
    root.appendChild(about);
  }

  App.views = App.views || {};
  App.views.labMockItems = labMockItems;

  App.core.registerRoute('dashboard', viewDashboardCommand);
  App.core.registerRoute('quiz', viewQuiz);
  App.core.registerRoute('exam', viewExam);
  App.core.registerRoute('flashcards', viewFlashcards);
  App.core.registerRoute('labs', viewLabs);
  App.core.registerRoute('stats', viewStats);
  App.core.registerRoute('notes', viewNotes);
  App.core.registerRoute('tools', viewTools);
  App.core.registerRoute('settings', viewSettings);
})();
