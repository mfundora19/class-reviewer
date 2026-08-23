window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Servers, Services & Security",
  items: [
    {
      title: "Server Service Exposure Baseline",
      difficulty: 2,
      minutes: 25,
      scenario: "You are assisting with a read-only security review of a Linux server. Build a service baseline from live process, systemd, socket, and local port-database output before anyone changes the host.",
      objectives: [
        "Identify daemon processes in a live process listing",
        "Inspect active systemd service units",
        "Identify listening TCP and UDP sockets with owning processes",
        "Map observed ports to service names",
        "Inspect the SSH service unit without modifying it"
      ],
      objectiveSteps: [[0], [1], [2], [3], [4, 5]],
      steps: [
        {
          do: "List running processes and identify background service names that follow the chapter's daemon naming pattern.",
          command: "ps ax | grep '[d]$'",
          hint: "Filter the process listing for names ending in the traditional daemon suffix while avoiding a match on the filtering command itself.",
          solution: "ps ax | grep '[d]$'",
          expectedOutput: "  742 ?        Ss     0:00 /usr/lib/systemd/systemd\n  901 ?        Ss     0:00 sshd\n 1044 ?        Ssl    0:00 /usr/sbin/rsyslogd",
          expectedOutputDynamic: true,
          check: "The baseline contains one or more background services with daemon-style names."
        },
        {
          do: "Display active systemd service units and note which service states are currently running.",
          command: "systemctl list-units --type=service --state=active",
          hint: "Ask systemd for service units and restrict the listing to active units so the review focuses on current exposure.",
          solution: "systemctl list-units --type=service --state=active",
          expectedOutput: "  UNIT                     LOAD   ACTIVE SUB     DESCRIPTION\n  ssh.service              loaded active running OpenBSD Secure Shell server\n  systemd-journald.service loaded active running Journal Service",
          expectedOutputDynamic: true,
          check: "The listing shows loaded active service units and their active/running state."
        },
        {
          do: "Inspect listening TCP and UDP sockets with numeric addresses and owning process information.",
          command: "ss -tlnp\nss -ulnp",
          hint: "Use one socket view for TCP listeners and one for UDP listeners; retain the process column so a port can be tied to a daemon.",
          solution: "ss -tlnp\nss -ulnp",
          expectedOutput: "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22    0.0.0.0:*    users:((\"sshd\",pid=901,fd=3))\nudp   UNCONN 0      0      127.0.0.53:53 0.0.0.0:*    users:((\"systemd-resolved\",pid=612,fd=13))",
          expectedOutputDynamic: true,
          check: "The socket review records listening TCP or UDP ports together with owning process names when available."
        },
        {
          do: "Look up the standard HTTP, HTTPS, SSH, and DNS assignments in the local services database.",
          command: "grep -E '^(http|https|ssh|domain)[[:space:]]' /etc/services",
          hint: "Search only service-database lines beginning with the protocol names so the port mapping can be compared with the live socket review.",
          solution: "grep -E '^(http|https|ssh|domain)[[:space:]]' /etc/services",
          expectedOutput: "ssh             22/tcp\nhttp            80/tcp\nhttps           443/tcp\ndomain          53/tcp",
          expectedOutputDynamic: true,
          check: "The local database supplies standard names and port/protocol assignments for the selected services."
        },
        {
          do: "Inspect the SSH unit definition for its lifecycle sections and start directive without editing it.",
          command: "systemctl cat ssh.service\n# If the distribution uses sshd.service instead:\nsystemctl cat sshd.service",
          hint: "Use the service-unit name provided by the distribution and inspect the rendered unit for Unit, Service, Install, and ExecStart information.",
          solution: "systemctl cat ssh.service\n# If the distribution uses sshd.service instead:\nsystemctl cat sshd.service",
          expectedOutput: "# /usr/lib/systemd/system/sshd.service\n[Unit]\nDescription=OpenSSH server daemon\n[Service]\nExecStart=/usr/sbin/sshd -D\n[Install]\nWantedBy=multi-user.target",
          expectedOutputDynamic: true,
          check: "The SSH unit output contains lifecycle sections and an ExecStart entry, with no configuration change made."
        },
        {
          do: "Compare the process, service-unit, socket, and port-database results and mark which observed network services deserve follow-up.",
          command: "ss -tlnp\nss -ulnp",
          hint: "Use the live socket result as the final evidence and connect each listening port to its process and local service name where possible.",
          solution: "ss -tlnp\nss -ulnp",
          expectedOutput: "Exposure handoff\nObserved listener: port and protocol recorded\nOwning process: recorded when available\nService name: compared with /etc/services\nFollow-up: unexpected listener flagged for review",
          expectedOutputDynamic: true,
          check: "The handoff is based on live listeners and identifies any unexpected service for follow-up."
        }
      ],
      tags: ["daemons", "systemd", "ports", "services", "ss", "ps", "ssh", "incident-triage"]
    },
    {
      title: "Web and Database Exposure Triage",
      difficulty: 2,
      minutes: 25,
      scenario: "A host may expose a web service or database after a troubleshooting change. Use live process, systemd, and socket output to identify what is running, then compare the evidence with the chapter's web-server and database roles.",
      objectives: [
        "Find web-server and database processes in the live process table",
        "Inspect active service units for application services",
        "Identify HTTP and database listeners",
        "Compare live evidence with documented configuration locations",
        "Record a read-only exposure conclusion"
      ],
      steps: [
        {
          do: "Search the running process table for Apache/httpd, Nginx, lighttpd, PostgreSQL, MySQL, or MongoDB process names.",
          command: "ps ax | grep -E '[a]pache2|[h]ttpd|[n]ginx|[l]ighttpd|[p]ostgres|[m]ysqld|[m]ongod'",
          hint: "Search the live process list for the server families named in the chapter; the bracketed first letter prevents the filter from matching itself.",
          solution: "ps ax | grep -E '[a]pache2|[h]ttpd|[n]ginx|[l]ighttpd|[p]ostgres|[m]ysqld|[m]ongod'",
          expectedOutput: " 1842 ?        Ssl    0:00 nginx: master process /usr/sbin/nginx\n 2110 ?        Ssl    0:00 postgres: checkpointer process",
          expectedOutputDynamic: true,
          check: "The process evidence shows which supported web or database components are present, if any."
        },
        {
          do: "Display active service units and search the output for supported web or database service names.",
          command: "systemctl list-units --type=service --state=active | grep -E 'apache|httpd|nginx|lighttpd|postgres|mysql|mongo'",
          hint: "Use the active service listing as a second source of evidence and compare its unit names with the process results.",
          solution: "systemctl list-units --type=service --state=active | grep -E 'apache|httpd|nginx|lighttpd|postgres|mysql|mongo'",
          expectedOutput: "nginx.service   loaded active running A high performance web server and a reverse proxy server\npostgresql.service loaded active running PostgreSQL RDBMS",
          expectedOutputDynamic: true,
          check: "The service-unit evidence either confirms a supported application service or shows that none matched."
        },
        {
          do: "Inspect listening TCP sockets and search for the standard web and database ports.",
          command: "ss -tlnp | grep -E ':(80|443|3306|5432|27017)[[:space:]]'",
          hint: "Filter numeric listening sockets for the documented HTTP/HTTPS and common database ports, then note the owning process.",
          solution: "ss -tlnp | grep -E ':(80|443|3306|5432|27017)[[:space:]]'",
          expectedOutput: "LISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"nginx\",pid=1842,fd=6))\nLISTEN 0      244    127.0.0.1:5432 0.0.0.0:*    users:((\"postgres\",pid=2110,fd=7))",
          expectedOutputDynamic: true,
          check: "The socket evidence records whether a web or database port is listening and which process owns it."
        },
        {
          do: "Inspect the documented web-server configuration paths that are relevant to the process family found on this host.",
          command: "cat /etc/nginx/nginx.conf\n# If the host uses Apache instead, inspect /etc/httpd/httpd.conf",
          hint: "Use the configuration path associated with the observed server family; keep the inspection read-only and stop if that service is not installed.",
          solution: "cat /etc/nginx/nginx.conf\n# If the host uses Apache instead, inspect /etc/httpd/httpd.conf",
          expectedOutput: "user nginx;\nworker_processes auto;\nhttp {\n    include       /etc/nginx/mime.types;\n    include       /etc/nginx/conf.d/*.conf;\n}",
          expectedOutputDynamic: true,
          check: "The review connects a locally inspected configuration file with the observed web-service family."
        },
        {
          do: "Write the exposure result from the live process, service, socket, and configuration evidence without starting, stopping, or installing a service.",
          command: "ss -tlnp | grep -E ':(80|443|3306|5432|27017)[[:space:]]'",
          hint: "Use the final listener evidence to state whether exposure is absent, local-only, or bound to a broader address; do not infer exposure from a package name alone.",
          solution: "ss -tlnp | grep -E ':(80|443|3306|5432|27017)[[:space:]]'",
          expectedOutput: "Exposure result\nWeb listener: recorded if present\nDatabase listener: recorded if present\nProcess owner: compared with service listing\nConfiguration: inspected read-only",
          expectedOutputDynamic: true,
          check: "The conclusion cites observed listeners and processes rather than a theory-only classification."
        }
      ],
      tags: ["web-server", "apache", "nginx", "lighttpd", "database", "postgresql", "mysql", "mongodb", "exposure"]
    },
    {
      title: "Mail Service Path Inspection",
      difficulty: 2,
      minutes: 25,
      scenario: "A mail host is being reviewed after a delivery complaint. Use local service, process, port, and configuration evidence to trace which mail components may be active without sending or deleting any messages.",
      objectives: [
        "Inspect active mail-related service units",
        "Find mail transfer and mailbox processes",
        "Map SMTP, POP, and IMAP ports locally",
        "Inspect an available mail service unit read-only",
        "Produce a concrete mail-service review record"
      ],
      steps: [
        {
          do: "Search active systemd service units for mail transfer, delivery, and mailbox services named in the chapter.",
          command: "systemctl list-units --type=service --state=active | grep -E 'sendmail|postfix|exim|dovecot|procmail'",
          hint: "Use the active-unit listing and filter for the MTA, MDA, and IMAP service names; an empty result is still an observable host state.",
          solution: "systemctl list-units --type=service --state=active | grep -E 'sendmail|postfix|exim|dovecot|procmail'",
          expectedOutput: "postfix.service loaded active running Postfix Mail Transport Agent\ndovecot.service loaded active running Dovecot IMAP/POP3 email server",
          expectedOutputDynamic: true,
          check: "The review records which supported mail service units are active, if any."
        },
        {
          do: "Search running processes for the mail transfer, delivery, and mailbox programs.",
          command: "ps ax | grep -E '[s]endmail|[p]ostfix|[e]xim|[d]ovecot|[p]rocmail|[b]inmail'",
          hint: "Compare process evidence with the active-unit result so a service name and a running process are not treated as the same observation.",
          solution: "ps ax | grep -E '[s]endmail|[p]ostfix|[e]xim|[d]ovecot|[p]rocmail|[b]inmail'",
          expectedOutput: " 2490 ?        Ss     0:00 /usr/lib/postfix/sbin/master -w\n 2512 ?        S      0:00 dovecot/anvil",
          expectedOutputDynamic: true,
          check: "The process listing records any active mail programs and separates process evidence from unit evidence."
        },
        {
          do: "Look up SMTP, POP, and IMAP assignments in the local services database.",
          command: "grep -E '^(smtp|pop|pop3|imap)[[:space:]]' /etc/services",
          hint: "Search the local database for the mail protocol names so the port mapping can be compared with live listeners.",
          solution: "grep -E '^(smtp|pop|pop3|imap)[[:space:]]' /etc/services",
          expectedOutput: "smtp            25/tcp\npop-3           110/tcp\nimap2           143/tcp",
          expectedOutputDynamic: true,
          check: "The local database supplies the documented mail-protocol port assignments."
        },
        {
          do: "Inspect the unit file for the mail service identified by the previous checks without changing it.",
          command: "systemctl cat postfix.service\n# If Dovecot is the available service instead:\nsystemctl cat dovecot.service",
          hint: "Select the unit name that exists on the host and inspect its start command and service description read-only.",
          solution: "systemctl cat postfix.service\n# If Dovecot is the available service instead:\nsystemctl cat dovecot.service",
          expectedOutput: "[Unit]\nDescription=Postfix Mail Transport Agent\n[Service]\nExecStart=/usr/lib/postfix/sbin/master -w",
          expectedOutputDynamic: true,
          check: "A locally available mail unit exposes its service description and start directive."
        },
        {
          do: "Inspect live mail listeners and record whether SMTP, POP, or IMAP is exposed on this host.",
          command: "ss -tlnp | grep -E ':(25|110|143)[[:space:]]'",
          hint: "Use the local port assignments from the earlier step and compare them with the live listening table and owning process.",
          solution: "ss -tlnp | grep -E ':(25|110|143)[[:space:]]'",
          expectedOutput: "LISTEN 0      100    0.0.0.0:25    0.0.0.0:*    users:((\"master\",pid=2490,fd=13))",
          expectedOutputDynamic: true,
          check: "The mail review records which standard mail listeners are active and their owning process when visible."
        }
      ],
      tags: ["mail", "mua", "mta", "mda", "postfix", "sendmail", "dovecot", "ports"]
    },
    {
      title: "Core Network Service Exposure Review",
      difficulty: 2,
      minutes: 25,
      scenario: "You are preparing a basic exposure record for a Linux network host. Inspect live service and socket evidence for file sharing, address assignment, name resolution, time, monitoring, printing, and logging services covered by the chapter.",
      objectives: [
        "Map core service names to their local port assignments",
        "Inspect active units for infrastructure services",
        "Find infrastructure daemons in the process table",
        "Inspect live TCP and UDP exposure",
        "Produce a read-only infrastructure handoff"
      ],
      steps: [
        {
          do: "Look up the chapter's core service assignments for DNS, DHCP, NTP, SNMP, NFS, and IPP in the local services database.",
          command: "grep -E '^(domain|bootps|ntp|snmp|nfs|ipp)[[:space:]]' /etc/services",
          hint: "Use the local database to build a port reference before comparing it with live listeners; retain the protocol column as well as the number.",
          solution: "grep -E '^(domain|bootps|ntp|snmp|nfs|ipp)[[:space:]]' /etc/services",
          expectedOutput: "domain          53/tcp\nbootps          67/udp\nntp             123/udp\nsnmp            161/udp\nnfs             2049/tcp\nipp             631/tcp",
          expectedOutputDynamic: true,
          check: "The local service database provides the expected protocol and port references."
        },
        {
          do: "Inspect active service units for DNS, DHCP, NTP, NFS, printing, logging, or monitoring services.",
          command: "systemctl list-units --type=service --state=active | grep -E 'resolved|named|dhcp|ntp|chrony|nfs|cups|rsyslog|journal|snmp'",
          hint: "Filter the active-unit listing for the infrastructure service names and record only services actually shown by the host.",
          solution: "systemctl list-units --type=service --state=active | grep -E 'resolved|named|dhcp|ntp|chrony|nfs|cups|rsyslog|journal|snmp'",
          expectedOutput: "systemd-resolved.service loaded active running Network Name Resolution\nchronyd.service loaded active running NTP client/server\n cups.service loaded active running CUPS Scheduler",
          expectedOutputDynamic: true,
          check: "The handoff records which infrastructure service units are active on this host."
        },
        {
          do: "Search the process table for the corresponding infrastructure daemons.",
          command: "ps ax | grep -E '[n]amed|[s]ystemd-resolved|[d]hcpd|[n]tpd|[c]hronyd|[r]pcbind|[c]upsd|[r]syslogd|[s]nmpd'",
          hint: "Use process names to corroborate or question the service-unit observations; an infrastructure service may use a different implementation than another host.",
          solution: "ps ax | grep -E '[n]amed|[s]ystemd-resolved|[d]hcpd|[n]tpd|[c]hronyd|[r]pcbind|[c]upsd|[r]syslogd|[s]nmpd'",
          expectedOutput: " 612 ?        Ssl    0:00 /usr/lib/systemd/systemd-resolved\n 819 ?        Ssl    0:00 /usr/sbin/chronyd -F 1\n1024 ?        Ssl    0:00 /usr/sbin/cupsd -l",
          expectedOutputDynamic: true,
          check: "The process review records implementation names for any matching infrastructure daemons."
        },
        {
          do: "Inspect TCP and UDP listeners for the service ports identified in the local database.",
          command: "ss -tlnp\nss -ulnp",
          hint: "Compare both transport tables with the service reference and note whether a listener is local-only or bound to a broader address.",
          solution: "ss -tlnp\nss -ulnp",
          expectedOutput: "tcp   LISTEN 0      4096   127.0.0.53:53  0.0.0.0:*    users:((\"systemd-resolved\",pid=612,fd=13))\nudp   UNCONN 0      0      0.0.0.0:123   0.0.0.0:*    users:((\"chronyd\",pid=819,fd=5))",
          expectedOutputDynamic: true,
          check: "The exposure record distinguishes observed TCP/UDP listeners and their bind addresses."
        },
        {
          do: "Record the final infrastructure handoff from the live service, process, and socket evidence.",
          command: "ss -tlnp\nss -ulnp",
          hint: "Use the live socket results as the final state and avoid claiming that a service is exposed merely because its name appears in the chapter table.",
          solution: "Record each observed infrastructure listener with its protocol, port, bind address, and owning process when available; mark unobserved services as not seen in this snapshot.",
          expectedOutput: "Infrastructure handoff\nObserved service: recorded with port and process\nBind scope: local-only or broader address recorded\nUnobserved service: not claimed active",
          expectedOutputDynamic: true,
          check: "The handoff is limited to services and listeners actually observed on the host."
        }
      ],
      tags: ["nfs", "cups", "dhcp", "dns", "ntp", "snmp", "logging", "ports", "exposure"]
    },
    {
      title: "Authentication and Secure Access Host Review",
      difficulty: 2,
      minutes: 25,
      scenario: "A Linux host is being reviewed after an account-access alert. Use read-only local credential, service, process, socket, and port evidence to identify the host's authentication and remote-access surface.",
      objectives: [
        "Inspect local account and password-hash file permissions",
        "Identify authentication and remote-access processes",
        "Inspect active SSH-related service units",
        "Compare secure-access ports with live listeners",
        "Record a bounded authentication review"
      ],
      steps: [
        {
          do: "Read the local account file and inspect the password-hash file's access response without modifying either file.",
          command: "cat /etc/passwd\ncat /etc/shadow",
          hint: "The first file contains account records; the second is intentionally more restricted, so record either its contents or the permission-denied result without attempting to bypass it.",
          solution: "cat /etc/passwd\ncat /etc/shadow",
          expectedOutput: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\ncat: /etc/shadow: Permission denied",
          expectedOutputDynamic: true,
          check: "The review distinguishes readable account information from restricted password-hash storage."
        },
        {
          do: "Search running processes for OpenSSH, OpenVPN, Kerberos, LDAP, and NIS-related programs.",
          command: "ps ax | grep -E '[s]shd|[o]penvpn|[k]rb5|[l]dap|[n]is'",
          hint: "Use the live process table to identify implementations actually running; do not infer that every technology is configured just because it is in the chapter.",
          solution: "ps ax | grep -E '[s]shd|[o]penvpn|[k]rb5|[l]dap|[n]is'",
          expectedOutput: " 901 ?        Ss     0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups",
          expectedOutputDynamic: true,
          check: "The process evidence records any observed secure-access or directory-authentication programs."
        },
        {
          do: "Display active service units and filter for SSH, VPN, Kerberos, LDAP, or NIS services.",
          command: "systemctl list-units --type=service --state=active | grep -E 'ssh|openvpn|krb|ldap|nis'",
          hint: "Use active unit evidence as a separate check from process names and record an empty match as a valid result.",
          solution: "systemctl list-units --type=service --state=active | grep -E 'ssh|openvpn|krb|ldap|nis'",
          expectedOutput: "ssh.service loaded active running OpenBSD Secure Shell server",
          expectedOutputDynamic: true,
          check: "The active-unit review records which supported authentication or remote-access services are running."
        },
        {
          do: "Look up LDAP and SSH assignments in the local services database.",
          command: "grep -E '^(ldap|ssh)[[:space:]]' /etc/services",
          hint: "Use the local port database to connect the secure-access technologies with their documented service ports before checking live sockets.",
          solution: "grep -E '^(ldap|ssh)[[:space:]]' /etc/services",
          expectedOutput: "ssh             22/tcp\nldap            389/tcp",
          expectedOutputDynamic: true,
          check: "The local database provides the port references used for the secure-access comparison."
        },
        {
          do: "Inspect live listeners for SSH, LDAP, and OpenVPN-related ports and record their bind addresses.",
          command: "ss -tlnp | grep -E ':(22|389)[[:space:]]'\nss -ulnp | grep -E ':(1194)[[:space:]]'",
          hint: "Compare the live socket state with the local port reference and distinguish a loopback listener from a listener bound to all interfaces.",
          solution: "ss -tlnp | grep -E ':(22|389)[[:space:]]'\nss -ulnp | grep -E ':(1194)[[:space:]]'",
          expectedOutput: "LISTEN 0      128    0.0.0.0:22    0.0.0.0:*    users:((\"sshd\",pid=901,fd=3))",
          expectedOutputDynamic: true,
          check: "The review records which secure-access ports are listening and whether their bind scope warrants attention."
        }
      ],
      tags: ["security", "authentication", "passwd", "shadow", "ssh", "vpn", "ldap", "kerberos", "ports"]
    },
    {
      title: "Scalability and Container Service Evidence Review",
      difficulty: 3,
      minutes: 25,
      scenario: "A security operations team is reviewing a host that may support a web workload, a cluster component, or a container runtime. Use live process, systemd, and socket evidence to identify what is actually present before making an architecture recommendation.",
      objectives: [
        "Find cluster, load-balancer, and container-related processes",
        "Inspect matching systemd service units",
        "Identify listeners associated with the observed workload",
        "Compare web and database evidence for a scaling review",
        "Produce a recommendation based on observed host state"
      ],
      steps: [
        {
          do: "Search the process table for Nginx, HAProxy, LVS-related, Docker, Kubernetes, Hadoop, and container-runtime names.",
          command: "ps ax | grep -E '[n]ginx|[h]aproxy|[i]vs|[d]ocker|[c]ontainerd|[k]ube|[h]adoop'",
          hint: "Use the live process table to see which scaling or container technologies are present instead of assuming the planned architecture is deployed.",
          solution: "ps ax | grep -E '[n]ginx|[h]aproxy|[i]vs|[d]ocker|[c]ontainerd|[k]ube|[h]adoop'",
          expectedOutput: " 1842 ?        Ssl    0:00 nginx: master process /usr/sbin/nginx\n 1940 ?        Ssl    0:00 /usr/bin/containerd",
          expectedOutputDynamic: true,
          check: "The process evidence records any observed web, load-balancer, cluster, or container components."
        },
        {
          do: "Display active service units and filter for the same scaling and container technologies.",
          command: "systemctl list-units --type=service --state=active | grep -E 'nginx|haproxy|docker|containerd|kube|hadoop'",
          hint: "Compare service-manager evidence with process evidence and note when a process appears without a matching active unit.",
          solution: "systemctl list-units --type=service --state=active | grep -E 'nginx|haproxy|docker|containerd|kube|hadoop'",
          expectedOutput: "nginx.service      loaded active running A high performance web server and a reverse proxy server\ncontainerd.service loaded active running containerd container runtime",
          expectedOutputDynamic: true,
          check: "The service-unit evidence identifies active scaling or container services, if any."
        },
        {
          do: "Inspect listening sockets and record listeners owned by a web server, load balancer, or container-related process.",
          command: "ss -tlnp | grep -E ':(80|443|6443|2375|2376)[[:space:]]'",
          hint: "Use documented service ports as search targets, then verify the owning process and bind scope from the live table.",
          solution: "ss -tlnp | grep -E ':(80|443|6443|2375|2376)[[:space:]]'",
          expectedOutput: "LISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"nginx\",pid=1842,fd=6))",
          expectedOutputDynamic: true,
          check: "The socket evidence shows whether a scaling-related network endpoint is actually listening."
        },
        {
          do: "Compare the observed web and database process names to decide whether the host evidence suggests a stateless front end or a coordination-sensitive database workload.",
          command: "ps ax | grep -E '[n]ginx|[h]aproxy|[p]ostgres|[m]ysqld|[m]ongod'",
          hint: "Use the process table as evidence for the workload type, then apply the chapter's distinction between request distribution and database coordination overhead.",
          solution: "ps ax | grep -E '[n]ginx|[h]aproxy|[p]ostgres|[m]ysqld|[m]ongod'",
          expectedOutput: " 1842 ?        Ssl    0:00 nginx: master process /usr/sbin/nginx\n 2110 ?        Ssl    0:00 postgres: checkpointer process",
          expectedOutputDynamic: true,
          check: "The review identifies the observed front-end and database roles before making a scaling recommendation."
        },
        {
          do: "Record a deployment recommendation based on the observed process, service, and socket evidence, using only chapter technologies such as load balancing, clustering, Docker, or Kubernetes.",
          command: "ss -tlnp\nps ax | grep -E '[n]ginx|[h]aproxy|[p]ostgres|[m]ysqld|[m]ongod|[d]ocker|[c]ontainerd|[k]ube'",
          hint: "Tie the recommendation to what the host actually exposes; do not claim that a cluster or container platform exists without live evidence.",
          solution: "Record the observed workload, listener, and process. Recommend load balancing for a request-distribution front end, evaluate clustering carefully for a database, and identify Docker/Kubernetes only when their processes or units are observed.",
          expectedOutput: "Scaling review\nObserved workload: recorded from process and socket evidence\nRecommendation: matched to observed service role\nUnsupported deployment claims: none",
          expectedOutputDynamic: true,
          check: "The architecture handoff is based on live host evidence and uses chapter-supported distinctions."
        }
      ],
      tags: ["clustering", "load-balancing", "haproxy", "nginx", "containers", "docker", "kubernetes", "evidence"]
    }
  ]
});
