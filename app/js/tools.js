/* ═══════════════════════════════════════════════════════════
   ReviewApp · tools.js
   Subnet calculator, number converter, port ref, Linux cmds
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;

  /* ── Subnet calculator ──────────────────────────────────── */
  function ipToInt(ip) {
    var parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(function (p) { return isNaN(p) || p < 0 || p > 255; })) return null;
    return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
  }

  function intToIp(n) {
    return [
      (n >>> 24) & 255,
      (n >>> 16) & 255,
      (n >>> 8) & 255,
      n & 255
    ].join('.');
  }

  function cidrToMask(cidr) {
    if (cidr < 0 || cidr > 32) return null;
    if (cidr === 0) return 0;
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
  }

  function calcSubnet(ipStr, cidr) {
    var ip = ipToInt(ipStr);
    if (ip == null) return { error: 'Invalid IP address' };
    cidr = Number(cidr);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) return { error: 'Invalid CIDR (0-32)' };

    var mask = cidrToMask(cidr);
    var network = (ip & mask) >>> 0;
    var wildcard = (~mask) >>> 0;
    var broadcast = (network | wildcard) >>> 0;
    var hosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2;
    var first = cidr >= 31 ? network : (network + 1) >>> 0;
    var last = cidr >= 31 ? broadcast : (broadcast - 1) >>> 0;

    var firstOctet = (network >>> 24) & 255;
    var cls = firstOctet < 128 ? 'A' : firstOctet < 192 ? 'B' : firstOctet < 224 ? 'C' : firstOctet < 240 ? 'D' : 'E';
    var isPrivate =
      (firstOctet === 10) ||
      (firstOctet === 172 && ((network >>> 16) & 255) >= 16 && ((network >>> 16) & 255) <= 31) ||
      (firstOctet === 192 && ((network >>> 16) & 255) === 168);

    return {
      ip: ipStr,
      cidr: cidr,
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      firstUsable: intToIp(first),
      lastUsable: intToIp(last),
      usableHosts: hosts,
      mask: intToIp(mask),
      wildcard: intToIp(wildcard),
      class: cls,
      scope: isPrivate ? 'Private' : 'Public',
      networkInt: network,
      maskInt: mask
    };
  }

  function splitSubnets(networkInt, currentCidr, newCidr) {
    if (newCidr <= currentCidr || newCidr > 32) return [];
    var count = Math.pow(2, newCidr - currentCidr);
    var size = Math.pow(2, 32 - newCidr);
    var list = [];
    for (var i = 0; i < count; i++) {
      var net = (networkInt + i * size) >>> 0;
      var bcast = (net + size - 1) >>> 0;
      list.push({
        network: intToIp(net) + '/' + newCidr,
        broadcast: intToIp(bcast),
        first: intToIp(newCidr >= 31 ? net : (net + 1) >>> 0),
        last: intToIp(newCidr >= 31 ? bcast : (bcast - 1) >>> 0),
        hosts: newCidr >= 31 ? (newCidr === 32 ? 1 : 2) : size - 2
      });
    }
    return list;
  }

  /* ── Number converter ───────────────────────────────────── */
  function convertNumber(value, fromBase) {
    var n = parseInt(String(value).replace(/\s/g, ''), fromBase);
    if (isNaN(n)) return null;
    return {
      decimal: String(n),
      hex: n.toString(16).toUpperCase(),
      octal: n.toString(8),
      binary: n.toString(2)
    };
  }

  /* ── Port reference ─────────────────────────────────────── */
  var PORTS = [
    { port: '20-21', name: 'FTP', desc: 'File Transfer Protocol (data/control)' },
    { port: '22', name: 'SSH', desc: 'Secure Shell' },
    { port: '23', name: 'Telnet', desc: 'Unencrypted remote login' },
    { port: '25', name: 'SMTP', desc: 'Simple Mail Transfer Protocol' },
    { port: '53', name: 'DNS', desc: 'Domain Name System' },
    { port: '67/68', name: 'DHCP', desc: 'Dynamic Host Configuration Protocol' },
    { port: '69', name: 'TFTP', desc: 'Trivial File Transfer Protocol' },
    { port: '80', name: 'HTTP', desc: 'Hypertext Transfer Protocol' },
    { port: '110', name: 'POP3', desc: 'Post Office Protocol v3' },
    { port: '123', name: 'NTP', desc: 'Network Time Protocol' },
    { port: '143', name: 'IMAP', desc: 'Internet Message Access Protocol' },
    { port: '161/162', name: 'SNMP', desc: 'Simple Network Management Protocol' },
    { port: '389', name: 'LDAP', desc: 'Lightweight Directory Access Protocol' },
    { port: '443', name: 'HTTPS', desc: 'HTTP Secure (TLS)' },
    { port: '445', name: 'SMB', desc: 'Server Message Block' },
    { port: '514', name: 'Syslog', desc: 'System logging' },
    { port: '587', name: 'SMTP Sub', desc: 'SMTP message submission' },
    { port: '636', name: 'LDAPS', desc: 'LDAP over TLS' },
    { port: '993', name: 'IMAPS', desc: 'IMAP over TLS' },
    { port: '995', name: 'POP3S', desc: 'POP3 over TLS' },
    { port: '1433', name: 'MSSQL', desc: 'Microsoft SQL Server' },
    { port: '1521', name: 'Oracle', desc: 'Oracle database' },
    { port: '3306', name: 'MySQL', desc: 'MySQL / MariaDB' },
    { port: '3389', name: 'RDP', desc: 'Remote Desktop Protocol' },
    { port: '5060', name: 'SIP', desc: 'Session Initiation Protocol' },
    { port: '5432', name: 'PostgreSQL', desc: 'PostgreSQL database' },
    { port: '5900', name: 'VNC', desc: 'Virtual Network Computing' },
    { port: '6379', name: 'Redis', desc: 'Redis key-value store' },
    { port: '8080', name: 'HTTP-Alt', desc: 'Alternative HTTP / proxies' },
    { port: '8443', name: 'HTTPS-Alt', desc: 'Alternative HTTPS' },
    { port: '27017', name: 'MongoDB', desc: 'MongoDB database' },
    { port: '11211', name: 'Memcached', desc: 'Memcached cache' },
    { port: '2049', name: 'NFS', desc: 'Network File System' },
    { port: '88', name: 'Kerberos', desc: 'Kerberos authentication' },
    { port: '119', name: 'NNTP', desc: 'Network News Transfer Protocol' },
    { port: '179', name: 'BGP', desc: 'Border Gateway Protocol' },
    { port: '500', name: 'ISAKMP', desc: 'IPsec key exchange' },
    { port: '1701', name: 'L2TP', desc: 'Layer 2 Tunneling Protocol' },
    { port: '1723', name: 'PPTP', desc: 'Point-to-Point Tunneling Protocol' },
    { port: '1812/1813', name: 'RADIUS', desc: 'Remote Authentication Dial-In User Service' }
  ];

  /* ── Linux command reference ────────────────────────────── */
  var COMMANDS = [
    { cmd: 'ls', desc: 'List directory contents', example: 'ls -la /etc' },
    { cmd: 'cd', desc: 'Change directory', example: 'cd /var/log' },
    { cmd: 'pwd', desc: 'Print working directory', example: 'pwd' },
    { cmd: 'cp', desc: 'Copy files/directories', example: 'cp -r src/ dest/' },
    { cmd: 'mv', desc: 'Move or rename', example: 'mv old.txt new.txt' },
    { cmd: 'rm', desc: 'Remove files/directories', example: 'rm -rf temp/' },
    { cmd: 'mkdir', desc: 'Create directory', example: 'mkdir -p a/b/c' },
    { cmd: 'rmdir', desc: 'Remove empty directory', example: 'rmdir empty_dir' },
    { cmd: 'touch', desc: 'Create empty file or update timestamp', example: 'touch file.txt' },
    { cmd: 'cat', desc: 'Concatenate and display file', example: 'cat /etc/passwd' },
    { cmd: 'less', desc: 'Page through a file', example: 'less /var/log/syslog' },
    { cmd: 'head', desc: 'Show first lines of file', example: 'head -n 20 file.log' },
    { cmd: 'tail', desc: 'Show last lines of file', example: 'tail -f /var/log/syslog' },
    { cmd: 'grep', desc: 'Search text with patterns', example: 'grep -rn "error" /var/log' },
    { cmd: 'find', desc: 'Search for files', example: 'find / -name "*.conf" 2>/dev/null' },
    { cmd: 'chmod', desc: 'Change file permissions', example: 'chmod 755 script.sh' },
    { cmd: 'chown', desc: 'Change file owner/group', example: 'chown user:group file' },
    { cmd: 'chgrp', desc: 'Change group ownership', example: 'chgrp developers file' },
    { cmd: 'ps', desc: 'List processes', example: 'ps aux | grep nginx' },
    { cmd: 'top', desc: 'Interactive process viewer', example: 'top' },
    { cmd: 'htop', desc: 'Enhanced process viewer', example: 'htop' },
    { cmd: 'kill', desc: 'Send signal to process', example: 'kill -9 1234' },
    { cmd: 'killall', desc: 'Kill processes by name', example: 'killall firefox' },
    { cmd: 'df', desc: 'Disk free space', example: 'df -h' },
    { cmd: 'du', desc: 'Disk usage', example: 'du -sh /var/*' },
    { cmd: 'free', desc: 'Memory usage', example: 'free -h' },
    { cmd: 'uname', desc: 'System information', example: 'uname -a' },
    { cmd: 'uptime', desc: 'System uptime and load', example: 'uptime' },
    { cmd: 'whoami', desc: 'Current username', example: 'whoami' },
    { cmd: 'id', desc: 'User and group IDs', example: 'id' },
    { cmd: 'su', desc: 'Switch user', example: 'su - root' },
    { cmd: 'sudo', desc: 'Run as another user (usually root)', example: 'sudo systemctl restart ssh' },
    { cmd: 'passwd', desc: 'Change password', example: 'passwd username' },
    { cmd: 'useradd', desc: 'Create a user', example: 'useradd -m -s /bin/bash alice' },
    { cmd: 'userdel', desc: 'Delete a user', example: 'userdel -r alice' },
    { cmd: 'groupadd', desc: 'Create a group', example: 'groupadd developers' },
    { cmd: 'systemctl', desc: 'Control systemd services', example: 'systemctl status nginx' },
    { cmd: 'journalctl', desc: 'Query systemd journal', example: 'journalctl -u ssh -f' },
    { cmd: 'ip', desc: 'Network interface configuration', example: 'ip addr show' },
    { cmd: 'ss', desc: 'Socket statistics', example: 'ss -tulpn' },
    { cmd: 'ping', desc: 'Test network connectivity', example: 'ping -c 4 8.8.8.8' },
    { cmd: 'traceroute', desc: 'Trace packet route', example: 'traceroute example.com' },
    { cmd: 'curl', desc: 'Transfer data from URLs', example: 'curl -I https://example.com' },
    { cmd: 'wget', desc: 'Download files', example: 'wget https://example.com/file.tar.gz' },
    { cmd: 'scp', desc: 'Secure copy over SSH', example: 'scp file.txt user@host:/path/' },
    { cmd: 'rsync', desc: 'Fast file synchronization', example: 'rsync -avz src/ user@host:dest/' },
    { cmd: 'tar', desc: 'Archive files', example: 'tar -czvf archive.tar.gz dir/' },
    { cmd: 'gzip', desc: 'Compress files', example: 'gzip large.log' },
    { cmd: 'gunzip', desc: 'Decompress gzip files', example: 'gunzip large.log.gz' },
    { cmd: 'ln', desc: 'Create links', example: 'ln -s /path/to/target linkname' },
    { cmd: 'mount', desc: 'Mount filesystems', example: 'mount /dev/sdb1 /mnt' },
    { cmd: 'umount', desc: 'Unmount filesystems', example: 'umount /mnt' },
    { cmd: 'fdisk', desc: 'Partition table manipulator', example: 'sudo fdisk -l' },
    { cmd: 'lsblk', desc: 'List block devices', example: 'lsblk -f' },
    { cmd: 'apt', desc: 'Package manager (Debian/Ubuntu)', example: 'sudo apt update && sudo apt upgrade' },
    { cmd: 'yum', desc: 'Package manager (RHEL/CentOS)', example: 'sudo yum install vim' },
    { cmd: 'dnf', desc: 'Modern package manager (Fedora)', example: 'sudo dnf install htop' },
    { cmd: 'systemctl', desc: 'Manage services', example: 'sudo systemctl enable --now nginx' },
    { cmd: 'crontab', desc: 'Edit scheduled tasks', example: 'crontab -e' },
    { cmd: 'history', desc: 'Command history', example: 'history | tail -20' },
    { cmd: 'man', desc: 'Manual pages', example: 'man ls' },
    { cmd: 'which', desc: 'Locate a command', example: 'which python3' },
    { cmd: 'echo', desc: 'Display a line of text', example: 'echo $PATH' },
    { cmd: 'export', desc: 'Set environment variable', example: 'export PATH=$PATH:/opt/bin' },
    { cmd: 'env', desc: 'Show environment', example: 'env | grep PATH' },
    { cmd: 'tee', desc: 'Read stdin, write to stdout and files', example: 'echo hi | tee -a log.txt' },
    { cmd: 'awk', desc: 'Pattern scanning and processing', example: "awk '{print $1}' file.txt" },
    { cmd: 'sed', desc: 'Stream editor', example: "sed -i 's/old/new/g' file.txt" },
    { cmd: 'cut', desc: 'Remove sections from lines', example: 'cut -d: -f1 /etc/passwd' },
    { cmd: 'sort', desc: 'Sort lines', example: 'sort -n numbers.txt' },
    { cmd: 'uniq', desc: 'Report or omit repeated lines', example: 'sort file | uniq -c' },
    { cmd: 'wc', desc: 'Word, line, character count', example: 'wc -l file.txt' },
    { cmd: 'diff', desc: 'Compare files', example: 'diff -u old.txt new.txt' },
    { cmd: 'chmod', desc: 'Change mode (permissions)', example: 'chmod u+x script.sh' },
    { cmd: 'getfacl', desc: 'Get file ACL', example: 'getfacl /shared' },
    { cmd: 'setfacl', desc: 'Set file ACL', example: 'setfacl -m u:alice:rwx /shared' }
  ];

  /* ── Linux permissions calculator ──────────────────────── */
  var COMMON_MODES = [
    { mode: '644', name: 'Regular files', note: 'Owner rw · group/other read-only. Typical default.' },
    { mode: '755', name: 'Scripts & directories', note: 'Owner rwx · group/other rx. Classic executable.' },
    { mode: '700', name: 'Private directory', note: 'Only the owner has any access.' },
    { mode: '600', name: 'Private file', note: 'Owner rw only — SSH keys, configs with secrets.' },
    { mode: '666', name: 'World-writable file', note: 'Everyone can read/write. Restricted by umask.' },
    { mode: '777', name: 'World-writable everything', note: 'Security risk — avoid on shared systems.' },
    { mode: '4755', name: 'setuid', note: 'Runs with the file owner’s privileges (e.g. /usr/bin/passwd).' },
    { mode: '2755', name: 'setgid', note: 'New files in a directory inherit the directory’s group.' },
    { mode: '1777', name: 'Sticky (e.g. /tmp)', note: 'Only a file’s owner can delete it, even with write on the dir.' }
  ];

  // special: { suid, sgid, sticky } · user/group/other: { r, w, x } — all booleans
  function permsFromMode(special, user, group, other) {
    function num(p) { return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0); }
    function sym(p, extra) {
      var s = (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');
      if (extra) s = s.slice(0, 2) + (p.x ? extra : extra.toUpperCase());
      return s;
    }
    var u = num(user), g = num(group), o = num(other);
    var sp = (special.suid ? 4 : 0) + (special.sgid ? 2 : 0) + (special.sticky ? 1 : 0);
    var octal = (sp ? String(sp) : '') + u + g + o;
    return {
      octal: octal,
      symbolic: sym(user, special.suid ? 's' : null) + sym(group, special.sgid ? 's' : null) + sym(other, special.sticky ? 't' : null),
      user: u, group: g, other: o, special: sp,
      command: 'chmod ' + octal + ' <file>'
    };
  }

  function parseMode(octal) {
    var m = String(octal || '').trim();
    if (!/^[0-7]{3,4}$/.test(m)) return null;
    var special = m.length === 4 ? Number(m.charAt(0)) : 0;
    function bits(n) { return { r: !!(n & 4), w: !!(n & 2), x: !!(n & 1) }; }
    return {
      special: { suid: !!(special & 4), sgid: !!(special & 2), sticky: !!(special & 1) },
      user: bits(Number(m.charAt(m.length - 3))),
      group: bits(Number(m.charAt(m.length - 2))),
      other: bits(Number(m.charAt(m.length - 1)))
    };
  }

  // Parse a symbolic permission string into the same shape as parseMode.
  // Accepts the 9-char form (rwxr-xr--) with an optional leading type char
  // (-, d, l, ...), special bits rendered as s/S/t/T in the execute slots,
  // and the chmod-style comma form u=rwx,g=rx,o=rx.
  function permsFromSymbolic(sym) {
    var s = String(sym == null ? '' : sym).trim().replace(/\s+/g, '');
    if (!s) return null;

    // chmod-style comma form: u=rwx,g=rx,o=rx (multiple clauses per class are
    // allowed, e.g. u=rwx,u=s — rwx bits accumulate and special bits set flags)
    if (s.indexOf('=') !== -1) {
      var classes = { u: 'user', g: 'group', o: 'other' };
      var out = { special: { suid: false, sgid: false, sticky: false }, user: null, group: null, other: null };
      var parts = s.split(',');
      if (parts.length < 1 || parts.length > 6) return null;
      for (var i = 0; i < parts.length; i++) {
        var m = /^([ugo])=(.*)$/.exec(parts[i].trim());
        if (!m) return null;
        var cls = m[1];
        var cur = out[classes[cls]];
        if (!cur) { cur = { r: false, w: false, x: false }; out[classes[cls]] = cur; }
        var chars = m[2].split('');
        for (var j = 0; j < chars.length; j++) {
          var ch = chars[j];
          if (ch === 'r') cur.r = true;
          else if (ch === 'w') cur.w = true;
          else if (ch === 'x') cur.x = true;
          else if (ch === 's' || ch === 'S') {
            if (cls === 'u') out.special.suid = true;
            else if (cls === 'g') out.special.sgid = true;
            else return null;
          } else if (ch === 't' || ch === 'T') {
            if (cls !== 'o') return null;
            out.special.sticky = true;
          } else return null;
        }
      }
      if (!out.user || !out.group || !out.other) return null;
      return out;
    }

    // 9-char body, optionally prefixed by a single file-type character
    var body = null;
    if (/^[rwxsStT-]{9}$/.test(s)) body = s;
    else if (s.length === 10 && /^[dlbcps-]/.test(s.charAt(0)) && /^[rwxsStT-]{9}$/.test(s.slice(1))) body = s.slice(1);
    if (!body) return null;

    var special = { suid: false, sgid: false, sticky: false };
    function slot(seg, isUser, isGroup) {
      var ch = seg.charAt(2);
      var x = ch === 'x';
      if (ch === 's' || ch === 'S') {
        x = ch === 's';
        if (isUser) special.suid = true;
        else if (isGroup) special.sgid = true;
        else return null;
      } else if (ch === 't' || ch === 'T') {
        x = ch === 't';
        if (isUser || isGroup) return null;
        special.sticky = true;
      }
      return { r: seg.charAt(0) === 'r', w: seg.charAt(1) === 'w', x: x };
    }
    var u = slot(body.slice(0, 3), true, false);
    var g = slot(body.slice(3, 6), false, true);
    var o = slot(body.slice(6, 9), false, false);
    if (!u || !g || !o) return null;
    return { special: special, user: u, group: g, other: o };
  }

  // Trim and normalize an octal mode: strips redundant leading zeros while
  // keeping at least three digits (0644 -> 644, 000 -> 000). Returns null
  // for anything that is not 3-4 octal digits.
  function normalizeMode(mode) {
    var m = String(mode == null ? '' : mode).trim().replace(/\s+/g, '');
    if (!/^[0-7]+$/.test(m) || m.length < 3 || m.length > 4) return null;
    var stripped = m.replace(/^0+/, '');
    return stripped.length >= 3 ? stripped : m.slice(-3);
  }

  function getCommonModes() { return COMMON_MODES; }

  var highlightPort = null;
  var highlightCmd = null;
  var highlightTool = null;

  function getPorts() { return PORTS; }
  function getCommands() { return COMMANDS; }

  function setHighlightPort(p) { highlightPort = p; }
  function setHighlightCommand(c) { highlightCmd = c; }
  function setHighlightTool(t) { highlightTool = t; }

  App.tools = {
    calcSubnet: calcSubnet,
    splitSubnets: splitSubnets,
    convertNumber: convertNumber,
    getPorts: getPorts,
    getCommands: getCommands,
    permsFromMode: permsFromMode,
    parseMode: parseMode,
    permsFromSymbolic: permsFromSymbolic,
    normalizeMode: normalizeMode,
    getCommonModes: getCommonModes,
    highlightPort: setHighlightPort,
    highlightCommand: setHighlightCommand,
    highlightTool: setHighlightTool,
    getHighlightPort: function () { return highlightPort; },
    getHighlightCommand: function () { return highlightCmd; },
    getHighlightTool: function () { return highlightTool; },
    ipToInt: ipToInt,
    intToIp: intToIp
  };
})();
