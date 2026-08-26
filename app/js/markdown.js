/* ═══════════════════════════════════════════════════════════
   ReviewApp · markdown.js
   Tiny safe markdown renderer (no HTML injection)
   Supports: headings, bold, italic, code, code blocks, tables,
   lists, links (http only), paragraphs, horizontal rules
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;

  function escape(s) {
    return utils.escapeHtml(String(s));
  }

  // Render inline Markdown without allowing source text to become HTML.
  // Protected tokens let us escape ordinary text before adding the small set
  // of markup elements supported by this renderer.
  function inline(text) {
    var tokens = [];
    text = String(text);
    // Pick markers that cannot collide with literal user text. The protected
    // markup is restored after escaping, so even unusual question text stays
    // visible and cannot accidentally become HTML.
    var markerStart = '\uE000';
    var markerEnd = '\uE001';
    while (text.indexOf(markerStart) >= 0 || text.indexOf(markerEnd) >= 0) {
      markerStart += '\uE000';
      markerEnd += '\uE001';
    }

    function protect(value) {
      var index = tokens.length;
      tokens.push(value);
      return markerStart + index + markerEnd;
    }

    // Code and links are protected before escaping so their generated markup
    // is preserved while their user-provided contents remain escaped.
    text = text.replace(/`([^`]+)`/g, function (_, c) {
      return protect('<code>' + escape(c) + '</code>');
    });
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function (_, label, url) {
      return protect('<a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + escape(label) + '</a>');
    });

    text = escape(text);
    // bold
    text = text.replace(/\*\*([^*]+)\*\*/g, function (_, c) {
      return '<strong>' + c + '</strong>';
    });
    // italic
    text = text.replace(/\*([^*]+)\*/g, function (_, c) {
      return '<em>' + c + '</em>';
    });

    var tokenPattern = new RegExp(markerStart + '(\\d+)' + markerEnd, 'g');
    return text.replace(tokenPattern, function (_, index) {
      return tokens[Number(index)] || '';
    });
  }

  function renderInline(src) {
    return inline(src == null ? '' : String(src));
  }

  function render(src) {
    if (!src) return '';
    var lines = String(src).replace(/\r\n/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var inCode = false;
    var inSingleFence = false;
    var codeBuf = [];
    var inList = false;
    var listType = null;

    function closeList() {
      if (inList) {
        html.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = null;
      }
    }

    while (i < lines.length) {
      var line = lines[i];

      // fenced code (triple backtick)
      if (!inSingleFence && line.trim().indexOf('```') === 0) {
        if (inCode) {
          html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
          codeBuf = [];
          inCode = false;
        } else {
          closeList();
          inCode = true;
        }
        i++;
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        i++;
        continue;
      }

      // single-backtick fenced code (used in notes: ~`bash\n...\n`~)
      var sfm = line.match(/^`(\w*)$/);
      if (sfm) {
        if (inSingleFence) {
          html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
          codeBuf = [];
          inSingleFence = false;
        } else {
          closeList();
          inSingleFence = true;
        }
        i++;
        continue;
      }
      if (inSingleFence) {
        codeBuf.push(line);
        i++;
        continue;
      }

      // horizontal rule
      if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
        closeList();
        html.push('<hr/>');
        i++;
        continue;
      }

      // headings
      var hm = line.match(/^(#{1,6})\s+(.+)$/);
      if (hm) {
        closeList();
        var level = hm[1].length;
        html.push('<h' + level + '>' + inline(hm[2]) + '</h' + level + '>');
        i++;
        continue;
      }

      // table — pipe-delimited rows with a separator line
      var tblm = line.match(/^\s*\|.+\|\s*$/);
      if (tblm) {
        // peek: the next line must be a separator row (only | - : and whitespace)
        if (i + 1 < lines.length && /^\s*\|[-:\s|]+\|\s*$/.test(lines[i + 1])) {
          closeList();
          var headerCells = line.split('|').slice(1, -1).map(function (c) { return c.trim(); });
          i += 2; // skip separator row
          var dataRows = [];
          while (i < lines.length) {
            var drm = lines[i].match(/^\s*\|.+\|\s*$/);
            if (!drm) break;
            dataRows.push(lines[i].split('|').slice(1, -1).map(function (c) { return c.trim(); }));
            i++;
          }
          // build <table>
          var tbl = ['<table><thead><tr>'];
          for (var hi = 0; hi < headerCells.length; hi++) {
            tbl.push('<th>' + inline(headerCells[hi]) + '</th>');
          }
          tbl.push('</tr></thead><tbody>');
          for (var ri = 0; ri < dataRows.length; ri++) {
            tbl.push('<tr>');
            var row = dataRows[ri];
            for (var ci = 0; ci < row.length; ci++) {
              tbl.push('<td>' + inline(row[ci]) + '</td>');
            }
            tbl.push('</tr>');
          }
          tbl.push('</tbody></table>');
          html.push(tbl.join(''));
          continue;
        }
        // no separator — fall through to paragraph
      }

      // unordered list
      var ulm = line.match(/^[\*\-\+]\s+(.+)$/);
      if (ulm) {
        if (!inList || listType !== 'ul') {
          closeList();
          html.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        html.push('<li>' + inline(ulm[1]) + '</li>');
        i++;
        continue;
      }

      // ordered list
      var olm = line.match(/^\d+\.\s+(.+)$/);
      if (olm) {
        if (!inList || listType !== 'ol') {
          closeList();
          html.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        html.push('<li>' + inline(olm[1]) + '</li>');
        i++;
        continue;
      }

      // blank
      if (!line.trim()) {
        closeList();
        i++;
        continue;
      }

      // paragraph
      closeList();
      html.push('<p>' + inline(line) + '</p>');
      i++;
    }
    closeList();
    if (inCode) {
      html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
    }
    if (inSingleFence) {
      html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
    }
    return html.join('\n');
  }

  App.markdown = { render: render, renderInline: renderInline };
})();
