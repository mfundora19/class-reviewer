window.ReviewApp.content.register({
  type: "flashcards",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Servers, Services & Security",
  items: [
    {
      front: "What is the main difference between a Linux desktop and a Linux server?",
      back: "They share the same kernel and shell, but a desktop is designed for interactive human use (GUI, apps), while a server provides services to other systems over a network with little or no direct human interaction.",
      tags: ["overview", "desktop", "server"]
    },
    {
      front: "What is a daemon?",
      back: "A service program that runs continually in the background listening for client requests; daemon names often end in the letter 'd' (e.g., mysqld).",
      tags: ["daemon", "services"]
    },
    {
      front: "What command lists running processes to find a daemon like mysqld?",
      back: "ps ax | grep mysql",
      tags: ["daemon", "ps", "commands"]
    },
    {
      front: "Where does the word 'daemon' come from?",
      back: "Greek mythology — supernatural beings that provided help to humans when needed (not 'demon').",
      tags: ["daemon", "trivia"]
    },
    {
      front: "What is a super-server?",
      back: "A program that listens for network connection requests on behalf of multiple services, launching the appropriate service program when a request arrives.",
      tags: ["super-server", "inetd"]
    },
    {
      front: "What was the original Linux super-server program?",
      back: "inetd (Internet daemon), configured via /etc/inetd.conf.",
      tags: ["inetd", "super-server"]
    },
    {
      front: "What is xinetd and how does it improve on inetd?",
      back: "Extended Internet daemon; adds access control lists (ACLs), advanced logging, service scheduling, and improved security/configuration options.",
      tags: ["xinetd", "super-server"]
    },
    {
      front: "What replaces inetd/xinetd on Systemd-based Linux systems?",
      back: "systemd unit files.",
      tags: ["systemd", "super-server"]
    },
    {
      front: "What file lists all defined ports on a Linux server?",
      back: "/etc/services",
      tags: ["ports", "files"]
    },
    {
      front: "What organization publishes standardized service protocols as RFCs?",
      back: "The Internet Engineering Task Force (IETF), via Request for Comments (RFC) documents.",
      tags: ["ietf", "rfc", "protocols"]
    },
    {
      front: "Port 22",
      back: "SSH (Secure Shell) — sends encrypted data to a server.",
      tags: ["ports", "ssh"]
    },
    {
      front: "Port 23",
      back: "Telnet — unsecure protocol providing an interactive shell interface.",
      tags: ["ports", "telnet"]
    },
    {
      front: "Port 25",
      back: "SMTP (Simple Mail Transport Protocol) — sends email between servers.",
      tags: ["ports", "smtp", "email"]
    },
    {
      front: "Port 53",
      back: "DNS (Domain Name System) — matches IP addresses to computer names.",
      tags: ["ports", "dns"]
    },
    {
      front: "Port 67",
      back: "DHCP (Dynamic Host Configuration Protocol) — enables clients to auto-obtain a valid IP address.",
      tags: ["ports", "dhcp"]
    },
    {
      front: "Port 80",
      back: "HTTP — allows clients to request web pages from servers.",
      tags: ["ports", "http"]
    },
    {
      front: "Ports 109/110",
      back: "POP — allows clients to read messages in their mailbox.",
      tags: ["ports", "pop", "email"]
    },
    {
      front: "Ports 137-139",
      back: "SMB — Microsoft's protocol for file and print sharing.",
      tags: ["ports", "smb"]
    },
    {
      front: "Ports 143, 220",
      back: "IMAP — provides advanced mailbox services for clients.",
      tags: ["ports", "imap", "email"]
    },
    {
      front: "Port 389",
      back: "LDAP — provides access to directory services for authentication.",
      tags: ["ports", "ldap"]
    },
    {
      front: "Port 443",
      back: "HTTPS — secure, encrypted version of HTTP.",
      tags: ["ports", "https"]
    },
    {
      front: "Port 2049",
      back: "NFS — provides file sharing between Unix and Linux systems.",
      tags: ["ports", "nfs"]
    },
    {
      front: "Ports 20/21",
      back: "FTP — used for sending files to and from a server.",
      tags: ["ports", "ftp"]
    },
    {
      front: "What 3 basic Internet services are Linux servers known for?",
      back: "Web services, database services, and email services.",
      tags: ["overview", "services"]
    },
    {
      front: "What makes Apache HTTP Server distinctive?",
      back: "Its modular architecture — advanced features are loadable modules, reducing resource usage and simplifying customization.",
      tags: ["apache", "web-server"]
    },
    {
      front: "Apache primary configuration file",
      back: "/etc/httpd/httpd.conf",
      tags: ["apache", "config-files"]
    },
    {
      front: "Apache additional config directory",
      back: "/etc/httpd/conf.d/",
      tags: ["apache", "config-files"]
    },
    {
      front: "Default Apache DocumentRoot",
      back: "/var/www/html",
      tags: ["apache", "documentroot"]
    },
    {
      front: "What year was Nginx first released, and what is its focus?",
      back: "2004; designed for speed, scalability, and efficient resource usage as a modern alternative to Apache.",
      tags: ["nginx", "web-server"]
    },
    {
      front: "What features does Nginx include natively (unlike Apache's module approach)?",
      back: "Reverse proxy, web proxy, mail proxy, web content caching, and load balancing.",
      tags: ["nginx", "features"]
    },
    {
      front: "Why can Nginx handle 10,000+ concurrent connections efficiently?",
      back: "It uses an event-driven architecture with a smaller memory footprint than Apache.",
      tags: ["nginx", "performance"]
    },
    {
      front: "Common deployment pattern combining Nginx and Apache",
      back: "Nginx sits in front as a reverse proxy/load balancer handling client connections, while Apache servers behind it process dynamic content.",
      tags: ["nginx", "apache", "architecture"]
    },
    {
      front: "Nginx primary configuration file",
      back: "/etc/nginx/nginx.conf",
      tags: ["nginx", "config-files"]
    },
    {
      front: "Nginx additional config directory",
      back: "/etc/nginx/conf.d/",
      tags: ["nginx", "config-files"]
    },
    {
      front: "Common default Nginx DocumentRoot",
      back: "/usr/share/nginx/html (some distros use /var/www/nginx-default or another path).",
      tags: ["nginx", "documentroot"]
    },
    {
      front: "What is lighttpd best suited for?",
      back: "Lightweight environments with limited resources — embedded systems, IoT devices, small web apps — due to low memory and CPU usage.",
      tags: ["lighttpd", "web-server"]
    },
    {
      front: "Does lighttpd include a built-in database?",
      back: "No — it integrates with external databases (SQLite, MySQL, PostgreSQL) via PHP, FastCGI, or CGI.",
      tags: ["lighttpd", "database"]
    },
    {
      front: "What language do clients use to communicate with a relational database server?",
      back: "SQL (Structured Query Language).",
      tags: ["database", "sql"]
    },
    {
      front: "When was PostgreSQL released and what is it?",
      back: "1996; an open-source object-relational database management system (ORDBMS) that began as a university research project.",
      tags: ["postgresql", "database"]
    },
    {
      front: "What ACID stands for in database context",
      back: "Atomicity, Consistency, Isolation, and Durability — principles ensuring data integrity and reliable transactions (PostgreSQL fully adheres to ACID).",
      tags: ["postgresql", "acid"]
    },
    {
      front: "What stack does MySQL belong to, and what does it stand for?",
      back: "LAMP stack — Linux, Apache, MySQL, PHP.",
      tags: ["mysql", "lamp"]
    },
    {
      front: "What was MySQL's original design focus?",
      back: "Lightweight, high-performance RDBMS emphasizing speed, simplicity, and ease of use.",
      tags: ["mysql", "database"]
    },
    {
      front: "What type of database is MongoDB?",
      back: "A document-oriented NoSQL database that stores data as JSON-like documents (BSON — Binary JSON) instead of tables.",
      tags: ["mongodb", "nosql"]
    },
    {
      front: "When was MongoDB first released?",
      back: "2009",
      tags: ["mongodb", "history"]
    },
    {
      front: "What security caution applies to older MongoDB versions?",
      back: "Older versions installed with authentication disabled by default; admins should enable authentication, configure roles, and restrict network access.",
      tags: ["mongodb", "security"]
    },
    {
      front: "What does NoSQL stand for?",
      back: "\"Not Only SQL\" — databases that store data in flexible, non-tabular formats.",
      tags: ["nosql", "database"]
    },
    {
      front: "What are the three primary components of a Linux modular email system?",
      back: "Mail User Agent (MUA), Mail Transfer Agent (MTA), and Mail Delivery Agent (MDA).",
      tags: ["email", "mua", "mta", "mda"]
    },
    {
      front: "What does the MTA do?",
      back: "Handles sending, receiving, and routing email between mail servers using SMTP; determines destination host and transfers messages to remote MTAs.",
      tags: ["mta", "email"]
    },
    {
      front: "What does the MDA do?",
      back: "Accepts mail from the MTA and delivers it to the appropriate user's mailbox or mail database.",
      tags: ["mda", "email"]
    },
    {
      front: "What does the MUA do, and where does it run?",
      back: "The email client used by end users to compose/read/organize mail; runs on the client machine, not the server. Examples: Evolution, KMail, Thunderbird.",
      tags: ["mua", "email"]
    },
    {
      front: "Name the three MTA packages emphasized for the Linux+ exam.",
      back: "sendmail, Postfix, and Exim.",
      tags: ["mta", "exam"]
    },
    {
      front: "Describe sendmail's architecture and config approach.",
      back: "A single large, versatile program; config is complex and normally edited via /etc/mail/sendmail.mc (then regenerated into sendmail.cf on restart), not edited directly.",
      tags: ["sendmail", "config-files"]
    },
    {
      front: "Describe Postfix's architecture and config files.",
      back: "Modular app made of several small programs; uses two plaintext config files in /etc/postfix/ — main.cf (basic parameters) and master.cf (daemon behavior).",
      tags: ["postfix", "config-files"]
    },
    {
      front: "Describe Exim's design philosophy and config file.",
      back: "A single large program (like sendmail) that favors immediate delivery over queuing; default config is /etc/exim.conf.",
      tags: ["exim", "config-files"]
    },
    {
      front: "What are the two common MDA programs?",
      back: "Binmail (/bin/mail, stores in /var/spool/mail) and Procmail (supports user .procmailrc recipes for filtering/routing mail).",
      tags: ["mda", "binmail", "procmail"]
    },
    {
      front: "What can a user's .procmailrc file do?",
      back: "Direct messages based on regex matches, route to separate mailboxes, forward to other addresses, or discard unwanted mail to /dev/null.",
      tags: ["procmail", "email"]
    },
    {
      front: "What protocol do most remote MUAs use, and what is the most popular Linux server for it?",
      back: "IMAP4; the most popular IMAP4 server program is Dovecot.",
      tags: ["imap4", "dovecot"]
    },
    {
      front: "Dovecot main configuration file",
      back: "/etc/dovecot/dovecot.conf (additional configs in /etc/dovecot/conf.d/).",
      tags: ["dovecot", "config-files"]
    },
    {
      front: "What two file-sharing server packages are common on Linux local networks?",
      back: "NFS (Network File System) and Samba.",
      tags: ["file-server", "nfs", "samba"]
    },
    {
      front: "What package implements NFS on Linux?",
      back: "nfs-utils — provides both drivers and client/server software.",
      tags: ["nfs", "nfs-utils"]
    },
    {
      front: "What does Samba implement, and why?",
      back: "Microsoft's SMB (Server Message Block) protocol, letting Linux systems interoperate with Windows file/print sharing.",
      tags: ["samba", "smb"]
    },
    {
      front: "What is CUPS and what protocol does it use?",
      back: "Common Unix Printing System — the standard Linux print-sharing package; uses IPP (Internet Printing Protocol) to connect to network printers.",
      tags: ["cups", "printing", "ipp"]
    },
    {
      front: "What is DHCP and what is the most popular Linux DHCP package?",
      back: "Dynamic Host Configuration Protocol, which centrally assigns IP addresses to clients; the most popular package is DHCPd (maintained by ISC).",
      tags: ["dhcp", "dhcpd"]
    },
    {
      front: "Name three common Linux DHCP client packages.",
      back: "dhclient, dhcpcd, and pump.",
      tags: ["dhcp", "dhcp-client"]
    },
    {
      front: "DHCPd configuration file",
      back: "/etc/dhcp/dhcp.conf — defines IP subnets and parameters like default router, subnet mask, and DNS servers.",
      tags: ["dhcp", "config-files"]
    },
    {
      front: "What two logging daemons does Linux use, and when is each used?",
      back: "rsyslogd (used with SysVinit/Upstart systems) and journald (used with Systemd systems, handles local and remote logging).",
      tags: ["logging", "rsyslogd", "journald"]
    },
    {
      front: "Where are Linux log files normally stored locally?",
      back: "/var/log",
      tags: ["logging", "var-log"]
    },
    {
      front: "What package implements DNS on Linux, and what is its daemon called?",
      back: "BIND (Berkeley Internet Name Domain); its server daemon is named 'named'.",
      tags: ["dns", "bind", "named"]
    },
    {
      front: "What replaces named on Systemd-based distros?",
      back: "systemd-resolved",
      tags: ["dns", "systemd-resolved"]
    },
    {
      front: "What secures DNS against hostname spoofing attacks?",
      back: "DNSSEC — adds an encryption layer around standard DNS packets.",
      tags: ["dns", "dnssec", "security"]
    },
    {
      front: "DNS main configuration file",
      back: "named.conf — defines whether the server is the main DNS server for a domain or a cached replica.",
      tags: ["dns", "config-files"]
    },
    {
      front: "What port(s) does SNMP use?",
      back: "UDP 161-162",
      tags: ["snmp", "ports"]
    },
    {
      front: "What does SNMP do?",
      back: "Simple Network Management Protocol — lets admins query remote devices/servers for configuration, status, and performance data via client-server model.",
      tags: ["snmp"]
    },
    {
      front: "Differentiate SNMPv1, v2, and v3.",
      back: "v1: plaintext password auth only; v2: adds basic security + bulk data transmission; v3: strong authentication and data encryption.",
      tags: ["snmp", "versions"]
    },
    {
      front: "Most popular Linux SNMP package",
      back: "net-snmp — open source and SNMPv3-compatible.",
      tags: ["snmp", "net-snmp"]
    },
    {
      front: "What protocol synchronizes clocks across servers, and what daemons implement it on Linux?",
      back: "NTP (Network Time Protocol); implemented via ntpd or chronyd.",
      tags: ["ntp", "ntpd", "chronyd"]
    },
    {
      front: "NTP configuration files for ntpd and chrony",
      back: "ntpd uses /etc/ntpd.conf; chrony uses /etc/chrony.conf.",
      tags: ["ntp", "config-files"]
    },
    {
      front: "Where are basic Linux user credentials stored?",
      back: "/etc/passwd (legacy, non-secure) or /etc/shadow (secure).",
      tags: ["authentication", "passwd", "shadow"]
    },
    {
      front: "What is NIS and what was it originally called?",
      back: "Network Information System — a directory service sharing user accounts, hostnames, and email info across servers; originally called Yellow Pages (YP) by Sun Microsystems, renamed due to trademark issues.",
      tags: ["nis", "authentication", "history"]
    },
    {
      front: "What package implements NIS on Linux?",
      back: "nis-utils",
      tags: ["nis", "nis-utils"]
    },
    {
      front: "What is Kerberos and where was it developed?",
      back: "A secure authentication protocol using symmetric-key cryptography, developed at MIT, authenticating users against a centralized encrypted server database.",
      tags: ["kerberos", "authentication"]
    },
    {
      front: "What is LDAP and its most popular Linux implementation?",
      back: "Lightweight Directory Access Protocol, created at the University of Michigan; most popular implementation is OpenLDAP, which uses a hierarchical (treelike) database.",
      tags: ["ldap", "openldap"]
    },
    {
      front: "What two things does certificate-based login require (two-factor)?",
      back: "Something you possess (the certificate file) and something you know (a PIN).",
      tags: ["certificates", "authentication", "2fa"]
    },
    {
      front: "What is needed for a server to trust a certificate?",
      back: "A Certificate Authority (CA).",
      tags: ["certificates", "ca"]
    },
    {
      front: "What software provides standard certificate functions on Linux?",
      back: "OpenSSL",
      tags: ["openssl", "certificates"]
    },
    {
      front: "What is the most popular Linux SSH implementation?",
      back: "OpenSSH — provides secure Telnet, FTP, and remote-copy features over SSH, plus tunneling support.",
      tags: ["ssh", "openssh"]
    },
    {
      front: "What is a VPN and the most popular Linux VPN solution?",
      back: "A Virtual Private Network creates a secure point-to-point tunnel to a local network; the most popular Linux solution is OpenVPN.",
      tags: ["vpn", "openvpn"]
    },
    {
      front: "What is a cluster in performance terms?",
      back: "Multiple identically configured servers dividing application functions among themselves, managed by cluster software, allowing use of less-powerful individual servers.",
      tags: ["clustering", "performance"]
    },
    {
      front: "Name a historical clustering example and its supporting library.",
      back: "The Beowulf cluster, which used PVM (Parallel Virtual Machine) to distribute application library calls across servers.",
      tags: ["clustering", "beowulf", "pvm"]
    },
    {
      front: "Name two newer clustering technologies covered in this chapter.",
      back: "Apache Hadoop and Linux Virtual Server (LVS).",
      tags: ["clustering", "hadoop", "lvs"]
    },
    {
      front: "Why might clustering hurt database performance?",
      back: "Concurrent database instances require special locking/coordination calls, which can slow response and throughput compared to a single instance.",
      tags: ["clustering", "database", "performance"]
    },
    {
      front: "What is load balancing?",
      back: "A special application of clustering where a load balancer redirects entire client requests to one server in a cluster, distributing load automatically.",
      tags: ["load-balancing", "performance"]
    },
    {
      front: "Name common Linux load-balancing packages.",
      back: "HAProxy, LVS (Linux Virtual Server), and Nginx.",
      tags: ["load-balancing", "haproxy", "lvs", "nginx"]
    },
    {
      front: "What problem do Linux containers solve?",
      back: "They package an app's files, libraries, and OS dependencies into a self-contained, portable bundle so it runs consistently across dev, test, and production environments.",
      tags: ["containers", "performance"]
    },
    {
      front: "Name the two most popular Linux container platforms.",
      back: "Docker and Kubernetes.",
      tags: ["containers", "docker", "kubernetes"]
    },
    {
      front: "What analogy describes the relationship between IP addresses and ports?",
      back: "A business phone number (IP address) plus an extension (port number) to reach a specific service.",
      tags: ["ports", "analogy"]
    }
  ]
});
