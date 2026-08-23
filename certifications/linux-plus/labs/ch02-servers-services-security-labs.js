window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Servers, Services & Security",
  items: [
    {
      title: "Inspecting Daemons, Ports, and Systemd Services",
      difficulty: 2,
      minutes: 25,
      scenario: "You have joined a basic server review for a Linux host that may support internal security services. Before anyone changes configuration, build a read-only baseline of running daemons, active systemd services, listening ports, and the SSH service definition.",
      objectives: [
        "Identify running daemon processes with ps",
        "Distinguish a daemon from a super-server such as inetd or xinetd",
        "Recognize systemd unit files as the modern super-server replacement",
        "Discover listening TCP and UDP ports with owning processes",
        "Map well-known ports to service names",
        "Inspect an SSH systemd unit definition"
      ],
      objectiveSteps: [[0], [1], [1, 2], [3], [4, 5], [6]],
      steps: [
        {
          do: "List running processes and identify entries whose names follow the chapter's common daemon naming pattern.",
          command: "ps ax",
          hint: "Inspect the process names in the complete listing; a daemon is a background service and its name often ends in the letter d.",
          solution: "ps ax",
          expectedOutput: "  PID TTY      STAT   TIME COMMAND\n  742 ?        Ss     0:00 /usr/lib/systemd/systemd\n  901 ?        Ss     0:00 sshd\n 1044 ?        Ssl    0:00 /usr/sbin/rsyslogd",
          expectedOutputDynamic: true,
          check: "The process listing contains background services with daemon-style names such as systemd, sshd, or rsyslogd."
        },
        {
          do: "Classify the service-management clues for the handoff: a daemon runs in the background for a service, inetd/xinetd listens for multiple services, and modern systemd systems use unit files.",
          hint: "Compare a process that continuously provides one service with a listener that starts different services on demand, then identify the current model.",
          solution: "Daemon: a background service such as sshd. Super-server: inetd or xinetd listens on behalf of multiple services. Modern systemd systems use systemd unit files instead of inetd/xinetd.",
          expectedOutput: "Daemon — background service such as sshd\nSuper-server — inetd or xinetd listens for multiple services\nModern replacement — systemd unit files",
          check: "The handoff distinguishes a daemon, the legacy super-server model, and systemd's unit-file model."
        },
        {
          do: "Display active service units managed by systemd.",
          command: "systemctl list-units --type=service --state=active",
          hint: "Ask the service manager for the service unit type and restrict the result to the active state.",
          solution: "systemctl list-units --type=service --state=active",
          expectedOutput: "  UNIT                     LOAD   ACTIVE SUB     DESCRIPTION\n  cron.service             loaded active running Regular background program processing daemon\n  ssh.service              loaded active running OpenBSD Secure Shell server\n  systemd-journald.service loaded active running Journal Service",
          expectedOutputDynamic: true,
          check: "The listing shows loaded active service units and their running state."
        },
        {
          do: "Inspect listening TCP and UDP sockets and include the process that owns each listener.",
          command: "ss -tlnp\nss -ulnp",
          hint: "Use socket inspection with listening, numeric, and process information for both transport families.",
          solution: "ss -tlnp\nss -ulnp",
          expectedOutput: "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22    0.0.0.0:*    users:((\"sshd\",pid=901,fd=3))\ntcp   LISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"httpd\",pid=1842,fd=4))\n\nNetid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\nudp   UNCONN 0      0      127.0.0.53:53 0.0.0.0:*    users:((\"systemd-resolved\",pid=612,fd=13))",
          expectedOutputDynamic: true,
          check: "Listening TCP and UDP entries show ports and owning process names."
        },
        {
          do: "Use the chapter's well-known-port table to map HTTP, HTTPS, and SSH in the exposure handoff.",
          hint: "Match each protocol name to its assigned port and transport from the service table; preserve the distinction between HTTP and HTTPS.",
          solution: "HTTP → 80/tcp. HTTPS → 443/tcp. SSH → 22/tcp.",
          expectedOutput: "HTTP — 80/tcp\nHTTPS — 443/tcp\nSSH — 22/tcp",
          check: "The handoff maps HTTP to 80/tcp, HTTPS to 443/tcp, and SSH to 22/tcp.",
        },
        {
          do: "Complete the port-reference section for the remaining services from the chapter: FTP, Telnet, SMTP, DNS, DHCP, POP, SMB, IMAP, and NFS.",
          hint: "Use the chapter's well-known-port table to connect each protocol with its number or number range, keeping service names separate from daemon names.",
          solution: "FTP → 20/21. Telnet → 23. SMTP → 25. DNS → 53. DHCP → 67. POP → 109/110. SMB → 137–139. IMAP → 143 and 220. NFS → 2049.",
          expectedOutput: "FTP — 20/21\nTelnet — 23\nSMTP — 25\nDNS — 53\nDHCP — 67\nPOP — 109/110\nSMB — 137–139\nIMAP — 143, 220\nNFS — 2049",
          check: "The port reference covers each remaining protocol with the chapter's assigned port or range."
        },
        {
          do: "Inspect the SSH service unit definition without changing it.",
          command: "# Debian/Ubuntu:\nsystemctl cat ssh.service\n\n# RHEL/Fedora/Rocky:\nsystemctl cat sshd.service",
          hint: "Use the service name used by the distribution, then inspect the lifecycle sections and start directive rendered by systemd.",
          solution: "# Debian/Ubuntu:\nsystemctl cat ssh.service\n\n# RHEL/Fedora/Rocky:\nsystemctl cat sshd.service",
          expectedOutput: "# /usr/lib/systemd/system/sshd.service\n[Unit]\nDescription=OpenSSH server daemon\n[Service]\nExecStart=/usr/sbin/sshd -D\n[Install]\nWantedBy=multi-user.target",
          expectedOutputDynamic: true,
          check: "The SSH unit contains Unit, Service, and Install sections with an ExecStart entry."
        }
      ],
      tags: ["daemons", "systemd", "ports", "services", "ss", "ps", "ssh"]
    },
    {
      title: "Web and Database Service Exposure Review",
      difficulty: 2,
      minutes: 25,
      scenario: "A host may be serving a temporary status page and storing application data. Perform a read-only review so the security team can tell which web or database components are present, where their configuration is expected, and whether a web listener is exposed.",
      objectives: [
        "Distinguish Apache, Nginx, and lighttpd by architecture and intended use",
        "Identify web configuration and document-root locations from the chapter",
        "Distinguish relational databases from MongoDB",
        "Use service and socket observations to describe exposure"
      ],
      objectiveSteps: [[0], [1], [4], [2, 3]],
      steps: [
        {
          do: "Classify Apache, Nginx, and lighttpd by their chapter descriptions.",
          hint: "Compare modularity, event-driven behavior, and resource usage; do not classify them by brand familiarity.",
          solution: "Apache: modular web server. Nginx: event-driven server with proxy, caching, and load-balancing features. lighttpd: lightweight server suited to embedded or IoT systems.",
          expectedOutput: "Apache — modular architecture\nNginx — event-driven architecture with proxy/caching/load balancing\nlighttpd — low-resource embedded or IoT use",
          check: "Each web server is paired with its distinguishing architecture or use case."
        },
        {
          do: "Record the Apache and Nginx configuration locations and default document roots from the chapter reference.",
          hint: "Keep the main configuration file, extra configuration directory, and served-content directory separate for each server.",
          solution: "Apache: /etc/httpd/httpd.conf; /etc/httpd/conf.d/; /var/www/html. Nginx: /etc/nginx/nginx.conf; /etc/nginx/conf.d/; /usr/share/nginx/html.",
          expectedOutput: "Apache config: /etc/httpd/httpd.conf\nApache extra config: /etc/httpd/conf.d/\nApache document root: /var/www/html\nNginx config: /etc/nginx/nginx.conf\nNginx extra config: /etc/nginx/conf.d/\nNginx document root: /usr/share/nginx/html",
          check: "The handoff records the documented configuration and document-root paths for both servers."
        },
        {
          do: "Display active service units and record whether Apache, Nginx, or lighttpd is running on this host.",
          command: "systemctl list-units --type=service --state=active",
          hint: "Review the active-service listing and look for a supported web-service name before drawing an exposure conclusion.",
          solution: "systemctl list-units --type=service --state=active",
          expectedOutput: "  UNIT            LOAD   ACTIVE SUB     DESCRIPTION\n  nginx.service   loaded active running A high performance web server and a reverse proxy server",
          expectedOutputDynamic: true,
          check: "The review records a supported web service and its observed state, or records that none was found."
        },
        {
          do: "Inspect all listening TCP entries and record whether the standard HTTP listener is present and which process owns it.",
          command: "ss -tlnp",
          hint: "Review the numeric listening-socket table and locate the standard HTTP port, then compare its owning process with the active web service.",
          solution: "ss -tlnp",
          expectedOutput: "State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\nLISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"nginx\",pid=1842,fd=6))",
          expectedOutputDynamic: true,
          check: "The socket table identifies whether port 80 is listening and names its owning process when present."
        },
        {
          do: "Classify PostgreSQL, MySQL, and MongoDB for the service handoff.",
          hint: "Separate relational systems from the document-oriented NoSQL system and preserve the database traits named in the chapter.",
          solution: "PostgreSQL: relational ORDBMS with ACID transactions and stored procedures. MySQL: relational RDBMS associated with the LAMP stack. MongoDB: document-oriented NoSQL database using JSON-like BSON documents.",
          expectedOutput: "PostgreSQL — relational ORDBMS; ACID and stored procedures\nMySQL — relational RDBMS; LAMP stack\nMongoDB — document-oriented NoSQL; JSON-like BSON documents",
          check: "The handoff distinguishes both relational databases from MongoDB's document model."
        }
      ],
      tags: ["web-server", "apache", "nginx", "lighttpd", "database", "mongodb", "exposure"]
    },
    {
      title: "Mail Delivery Path and Configuration Map",
      difficulty: 2,
      minutes: 25,
      scenario: "An internal mail host is being reviewed after a suspicious delivery report. Map the message path from user client to transfer service to local delivery, then identify which configuration files and packages belong to each stage.",
      objectives: [
        "Distinguish MUA, MTA, and MDA responsibilities",
        "Identify sendmail, Postfix, Exim, Binmail, Procmail, and Dovecot roles",
        "Map important mail configuration files",
        "Produce a clear mail-flow evidence map"
      ],
      objectiveSteps: [[0], [1], [2, 3], [4]],
      steps: [
        {
          do: "Arrange the three mail components in delivery order for a message written by a user and delivered to a local mailbox.",
          hint: "Start with the component the user interacts with, then follow the component that routes mail, and finish with the component that places it in a mailbox.",
          solution: "MUA → MTA → MDA.",
          expectedOutput: "1. MUA — user writes or reads mail\n2. MTA — routes mail using SMTP\n3. MDA — delivers mail to the local mailbox",
          check: "The message path is ordered MUA, then MTA, then MDA."
        },
        {
          do: "Classify Evolution, Thunderbird, KMail, sendmail, Postfix, Exim, Binmail, Procmail, and Dovecot by role.",
          hint: "Client applications, transfer agents, delivery agents, and IMAP service do different work; use the component definitions before naming a package.",
          solution: "Evolution, Thunderbird, KMail: MUAs. sendmail, Postfix, Exim: MTAs. Binmail and Procmail: MDAs. Dovecot: IMAP4 server used by remote MUAs.",
          expectedOutput: "MUA — Evolution, Thunderbird, KMail\nMTA — sendmail, Postfix, Exim\nMDA — Binmail, Procmail\nRemote mailbox service — Dovecot / IMAP4",
          check: "Every listed mail program is assigned to its documented role."
        },
        {
          do: "Map each MTA to its configuration files and configuration behavior.",
          hint: "The chapter distinguishes sendmail's generated configuration from Postfix's two plain-text files and Exim's single configuration path.",
          solution: "sendmail: edit /etc/mail/sendmail.mc; sendmail.cf is generated. Postfix: /etc/postfix/main.cf and /etc/postfix/master.cf. Exim: /etc/exim.conf.",
          expectedOutput: "sendmail — source config /etc/mail/sendmail.mc; generated sendmail.cf\nPostfix — /etc/postfix/main.cf and /etc/postfix/master.cf\nExim — /etc/exim.conf",
          check: "The map records the correct configuration path and behavior for each MTA."
        },
        {
          do: "Record the MDA storage and filtering paths relevant to a local-delivery review.",
          hint: "One path is the default local mailbox spool; the other is a per-user filtering file in the home directory.",
          solution: "Binmail uses /var/spool/mail by default. Procmail uses a user's ~/.procmailrc recipes for filtering and routing.",
          expectedOutput: "Binmail mailbox spool: /var/spool/mail\nProcmail user rules: ~/.procmailrc",
          check: "The evidence map separates mailbox storage from per-user filtering rules."
        },
        {
          do: "Prepare a short incident handoff describing where to inspect first when a user reports that a message was routed incorrectly.",
          hint: "Follow the path in order and name the role or configuration location that could have made the decision at each stage.",
          solution: "Inspect the MUA for the user's action, the MTA configuration for routing, and the MDA or ~/.procmailrc for local delivery and filtering; use Dovecot when the concern is remote mailbox access.",
          expectedOutput: "First review: MUA action\nRouting review: MTA configuration\nLocal delivery review: MDA and ~/.procmailrc\nRemote mailbox review: Dovecot / IMAP4",
          check: "The handoff follows the mail path and names a chapter-supported review point for each stage."
        }
      ],
      tags: ["mail", "mua", "mta", "mda", "postfix", "sendmail", "dovecot"]
    },
    {
      title: "Core Network Service Exposure Review",
      difficulty: 2,
      minutes: 30,
      scenario: "You are preparing a basic service-exposure report for a small Linux network. The host may provide file sharing, printing, address assignment, name resolution, time synchronization, logging, or monitoring. Use the chapter's service map to identify what each service would expose and which port or daemon is relevant.",
      objectives: [
        "Distinguish NFS, Samba, and CUPS roles",
        "Map DHCP, DNS, NTP, SNMP, and logging services to their purposes",
        "Identify service ports and daemon names from the chapter",
        "Build a concise exposure report"
      ],
      objectiveSteps: [[0], [1], [2], [3, 4]],
      steps: [
        {
          do: "Classify NFS, Samba, and CUPS by the resource they provide.",
          hint: "Separate Linux/Unix file sharing, Windows interoperability, and printing rather than treating all three as generic network storage services.",
          solution: "NFS: Linux/Unix folder sharing on port 2049. Samba: SMB file and print sharing with Windows. CUPS: Linux printing using IPP.",
          expectedOutput: "NFS — Linux/Unix file sharing — port 2049\nSamba — Windows SMB file and print sharing\nCUPS — Linux printing — IPP",
          check: "The report assigns each local-network service its correct resource and interoperability role."
        },
        {
          do: "Map DHCP, DNS, NTP, SNMP, and logging to their service purposes.",
          hint: "Use the service purpose table: address assignment, name resolution, time, monitoring, and event recording are different responsibilities.",
          solution: "DHCP: automatic IP assignment. DNS: hostname-to-IP resolution. NTP: time synchronization. SNMP: remote monitoring. Logging: rsyslogd or journald records and can forward events.",
          expectedOutput: "DHCP — automatic IP assignment\nDNS — hostname-to-IP resolution\nNTP — time synchronization\nSNMP — remote monitoring\nLogging — local or remote event recording",
          check: "All five services are paired with distinct chapter-supported purposes."
        },
        {
          do: "Record the relevant daemon, configuration file, or port for each service where the chapter supplies one.",
          hint: "Some services are identified by a daemon name, some by a configuration path, and some by a well-known port; preserve the kind of evidence provided.",
          solution: "DHCP: dhcpd and /etc/dhcp/dhcpd.conf. DNS: named and named.conf, or systemd-resolved. NTP: ntpd or chronyd with /etc/ntpd.conf or /etc/chrony.conf. SNMP: UDP 161–162 and net-snmp. NFS: port 2049.",
          expectedOutput: "DHCP — dhcpd — /etc/dhcp/dhcpd.conf\nDNS — named or systemd-resolved — named.conf when BIND is used\nNTP — ntpd or chronyd — /etc/ntpd.conf or /etc/chrony.conf\nSNMP — net-snmp — UDP 161–162\nNFS — port 2049",
          check: "The report records the chapter's supplied identifying evidence without inventing a command or path."
        },
        {
          do: "Choose the two entries that deserve the strongest initial security review: an exposed monitoring service and a remote file-sharing service.",
          hint: "Prioritize services that accept remote requests or expose shared system data, then name the relevant service from the report.",
          solution: "Review SNMP first because it supports remote monitoring and NFS or Samba because it provides remote file sharing; record the protocol and port or package involved.",
          expectedOutput: "Priority 1 — SNMP / net-snmp — UDP 161–162\nPriority 2 — NFS or Samba — remote file-sharing service",
          check: "The priority list names remote monitoring and file sharing as the first exposure-review targets."
        },
        {
          do: "Write the final exposure report with one line per service, including purpose and the identifying port, daemon, package, or path when available.",
          hint: "Keep the report descriptive rather than prescriptive; this chapter identifies services and security layers, not firewall rule syntax.",
          solution: "Create a table with the service, purpose, and supplied identifier from the previous steps.",
          expectedOutput: "Service exposure report\nNFS — Unix file sharing — 2049\nSamba — Windows SMB file and print sharing\nCUPS — printing — IPP\nDHCP — address assignment — dhcpd\nDNS — name resolution — named or systemd-resolved\nNTP — time sync — ntpd or chronyd\nSNMP — remote monitoring — UDP 161–162\nLogging — event recording — rsyslogd or journald",
          check: "The final report covers every service group and includes its documented identifier where one exists."
        }
      ],
      tags: ["nfs", "samba", "cups", "dhcp", "dns", "ntp", "snmp", "logging"]
    },
    {
      title: "Authentication and Secure Remote Access Decision Lab",
      difficulty: 2,
      minutes: 25,
      scenario: "A small organization is reviewing how Linux hosts authenticate users and provide remote access. Choose the chapter-supported technology for each requirement and record the evidence a junior administrator should look for before escalating the review.",
      objectives: [
        "Distinguish local credential files from shared directory services",
        "Differentiate NIS, Kerberos, LDAP, and certificate-based authentication",
        "Identify OpenSSL, OpenSSH, and OpenVPN purposes",
        "Select a chapter-supported technology for each security requirement"
      ],
      objectiveSteps: [[0], [1], [2, 3], [4]],
      steps: [
        {
          do: "Record the local credential files and distinguish their security roles.",
          hint: "The chapter contrasts the older account-information location with the more secure location for password hashes.",
          solution: "/etc/passwd contains basic account information; /etc/shadow stores password hashes in the more secure modern approach.",
          expectedOutput: "/etc/passwd — basic account information\n/etc/shadow — password hashes / secure credential storage",
          check: "The report distinguishes account information from the secure password-hash location."
        },
        {
          do: "Choose the appropriate technology for each requirement: shared user-account and hostname naming, symmetric-key authentication, and hierarchical directory authentication.",
          hint: "Shared naming, symmetric-key authentication, and hierarchical directory authentication are separate needs in the chapter.",
          solution: "Shared naming: NIS. Symmetric-key encrypted authentication: Kerberos. Hierarchical directory authentication: LDAP/OpenLDAP.",
          expectedOutput: "Shared naming directory — NIS\nSymmetric-key encrypted authentication — Kerberos\nHierarchical directory authentication — LDAP / OpenLDAP",
          check: "Each shared-authentication requirement is matched with the correct technology."
        },
        {
          do: "Choose the certificate-based authentication components for a server that validates a certificate protected by a PIN.",
          hint: "Identify what the user possesses, what the user knows, who the server trusts, and which Linux software provides certificate functions.",
          solution: "The user possesses a certificate and knows a PIN. The server trusts a Certificate Authority (CA). OpenSSL provides standard certificate functions.",
          expectedOutput: "Possesses — certificate file\nKnows — PIN\nTrust anchor — Certificate Authority (CA)\nCertificate software — OpenSSL",
          check: "The decision record contains both authentication factors, the trust authority, and OpenSSL."
        },
        {
          do: "Select the correct secure-access technology for encrypted remote shell access, tunneling another transaction, and a point-to-point remote-network tunnel.",
          hint: "Use the distinct roles of OpenSSH and OpenVPN; tunneling is a feature of the remote-shell solution in this chapter.",
          solution: "Encrypted remote shell: OpenSSH. Tunnel another transaction: OpenSSH tunneling. Point-to-point remote-network tunnel: OpenVPN.",
          expectedOutput: "Encrypted remote shell — OpenSSH\nEncrypted tunnel for another transaction — OpenSSH tunneling\nPoint-to-point remote access — OpenVPN",
          check: "Each secure-access requirement is mapped to OpenSSH, its tunneling feature, or OpenVPN."
        },
        {
          do: "Prepare a final escalation note naming the selected technology and chapter-supported evidence for each requirement.",
          hint: "Keep the note at the identification level: technology, purpose, and named file or trust component. Do not add firewall or policy commands from outside this chapter.",
          solution: "Record the selected technology, its purpose, and supplied evidence such as /etc/passwd, /etc/shadow, a CA, OpenSSL, OpenSSH, or OpenVPN.",
          expectedOutput: "Authentication review\nLocal credentials — /etc/passwd and /etc/shadow\nShared naming — NIS\nDirectory authentication — LDAP/OpenLDAP\nEncrypted authentication — Kerberos\nCertificate trust — CA and OpenSSL\nRemote access — OpenSSH or OpenVPN",
          check: "The escalation note stays within the chapter's authentication and secure-access material."
        }
      ],
      tags: ["security", "authentication", "nis", "kerberos", "ldap", "openssl", "ssh", "vpn"]
    },
    {
      title: "Scaling and Container Placement Review",
      difficulty: 3,
      minutes: 30,
      scenario: "A security operations team is deciding how to handle growing demand for a web service, a batch workload, and a portable application bundle. Compare clustering, load balancing, and containers, then select the approach that matches each workload without treating them as interchangeable.",
      objectives: [
        "Explain the purpose of clustering",
        "Distinguish load balancing from general clustering",
        "Recognize when database coordination can reduce performance",
        "Select Docker or Kubernetes for container management",
        "Create a reasoned architecture handoff"
      ],
      steps: [
        {
          do: "Describe what a Linux cluster provides for a workload that can be divided among multiple identically configured servers, and list one chapter example.",
          hint: "Focus on shared workload and multiple nodes, then choose an example from the chapter rather than treating a cluster as one larger standalone server.",
          solution: "A cluster uses multiple identically configured servers that divide application functions among themselves under cluster software. Chapter examples include Beowulf with PVM, Apache Hadoop, and Linux Virtual Server (LVS).",
          expectedOutput: "Cluster result: multiple Linux nodes divide application functions under cluster software.\nExamples: Beowulf/PVM, Apache Hadoop, Linux Virtual Server (LVS)",
          check: "The description explains coordinated multi-node work and names a chapter-supported cluster example."
        },
        {
          do: "Choose the best architecture for a busy web service that should distribute each client request across several servers.",
          hint: "The chapter defines one performance technique as a special application of clustering that redirects complete client requests.",
          solution: "Choose load balancing and name HAProxy, LVS, or Nginx as a chapter-supported package or technology.",
          expectedOutput: "Workload: busy web service\nArchitecture: load balancing\nCandidate technology: HAProxy, LVS, or Nginx",
          check: "The web workload is assigned to load balancing rather than generic clustering alone."
        },
        {
          do: "Explain why clustering may reduce performance for a database application.",
          hint: "Consider what concurrent database instances must coordinate when they work on shared data.",
          solution: "Concurrent database instances require coordination and locking calls, which can add overhead and reduce throughput or increase response time.",
          expectedOutput: "Database risk: coordination and locking overhead can reduce throughput and increase response time.",
          check: "The explanation identifies coordination or locking overhead as the performance tradeoff."
        },
        {
          do: "Choose the chapter-supported container technologies for an application that must behave consistently across development, testing, and production.",
          hint: "Containers package application files, libraries, and dependencies; select the two platforms named in the chapter.",
          solution: "Choose Docker and Kubernetes as the two popular Linux container platforms named in the chapter.",
          expectedOutput: "Portability need: bundle application files, libraries, and dependencies\nPlatforms: Docker and Kubernetes",
          check: "The container recommendation names Docker and Kubernetes and connects them to portability."
        },
        {
          do: "Write an architecture handoff for a busy web service, a coordination-heavy database, and a portable application bundle.",
          hint: "Give each workload its own recommendation and include the tradeoff that makes the choice meaningful.",
          solution: "Busy web service: load balancing with HAProxy, LVS, or Nginx. Coordination-heavy database: evaluate clustering carefully because locking may reduce performance. Portable application bundle: Docker or Kubernetes containers.",
          expectedOutput: "Busy web service — load balancing\nCoordination-heavy database — evaluate clustering and locking overhead\nPortable application bundle — Docker or Kubernetes containers",
          check: "The final handoff gives distinct, chapter-supported recommendations for all three workloads."
        }
      ],
      tags: ["clustering", "load-balancing", "haproxy", "lvs", "containers", "docker", "kubernetes"]
    }
  ]
});
