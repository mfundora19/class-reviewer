window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
type: "mcq",
q: "Which OSI layer uses MAC addresses to identify NICs on the local network?",
options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 7"],
answer: 1,
explain: "MAC addressing operates at Layer 2, the Data Link layer.",
tags: ["addressing", "osi", "mac"]
},
{
type: "mcq",
q: "Which identifier is used by routers to locate a host across networks?",
options: ["MAC address", "Port number", "IP address", "FQDN", "OUI"],
answer: 2,
explain: "IP addresses provide logical Layer 3 addressing across networks.",
tags: ["addressing", "routing", "ip"]
},
{
type: "mcq",
q: "Which addressing method identifies a process or service on a host?",
options: ["MAC address", "IP address", "Port", "FQDN", "Subnet mask"],
answer: 2,
explain: "A port identifies the process or service receiving data on a host.",
tags: ["ports", "transport", "addressing"]
},
{
type: "match",
q: "Match each addressing concept to what it identifies.",
pairs: [
{ item: "MAC address", match: "NIC or device on the local network" },
{ item: "IP address", match: "Host or interface across networks" },
{ item: "Port", match: "Process or service on a host" },
{ item: "FQDN", match: "Host by human-readable name" }
],
explain: "The chapter's mental model is MAC = local interface, IP = host/network location, port = process, and FQDN = human-readable host identity.",
tags: ["addressing", "osi"]
},
{
type: "fill",
q: "How many bits long is a MAC address?",
answer: "48",
accepts: ["48 bits"],
explain: "A MAC address is 48 bits long.",
tags: ["mac", "addressing"]
},
{
type: "mcq",
q: "How are MAC addresses normally displayed?",
options: ["Four decimal octets", "Six hexadecimal groups", "Eight decimal groups", "Four hexadecimal blocks", "Two binary halves"],
answer: 1,
explain: "The source shows MAC addresses as 12 hexadecimal characters, usually six groups separated by colons.",
tags: ["mac", "hexadecimal"]
},
{
type: "mcq",
q: "What does the first 24 bits of a MAC address represent?",
options: ["Host identifier", "Subnet identifier", "OUI", "TCP port", "IPv4 prefix"],
answer: 2,
explain: "The first 24 bits are the Organizationally Unique Identifier, which identifies the NIC manufacturer.",
tags: ["mac", "oui"]
},
{
type: "tf",
q: "A switch learns a MAC address by examining the source MAC address of an arriving frame.",
answer: true,
explain: "A Layer 2 switch learns the source MAC and associates it with the ingress port.",
tags: ["switching", "mac"]
},
{
type: "mcq",
q: "A switch receives a frame for a destination MAC already in its MAC table. What does it do?",
options: ["Changes the destination IP", "Broadcasts the frame to every port", "Forwards it toward the learned port", "Sends it to the default gateway", "Drops the frame automatically"],
answer: 2,
explain: "The switch checks the destination MAC in its table and forwards the frame toward the associated port.",
tags: ["switching", "mac-table"]
},
{
type: "fill",
q: "Which Cisco command displays the MAC address table?",
answer: "show mac-address-table",
explain: "The chapter shows `show mac-address-table` for displaying learned MAC addresses and associated ports.",
tags: ["cisco", "mac-table"]
},
{
type: "mcq",
q: "Which Windows command reveals a computer's MAC address and detailed TCP/IP information?",
options: ["ping /all", "route print", "ipconfig /all", "hostname /all", "nslookup /all"],
answer: 2,
explain: "Windows `ipconfig /all` displays detailed interface and TCP/IP configuration, including the physical MAC address.",
tags: ["windows", "ipconfig"]
},
{
type: "multi",
q: "Which host settings are emphasized as the four core TCP/IP configuration values?",
options: ["IP address", "Subnet mask", "Default gateway", "DNS server address", "MAC address"],
answer: [0, 1, 2, 3],
explain: "The chapter emphasizes IP address, subnet mask, default gateway, and DNS server address for host configuration.",
tags: ["tcp-ip", "configuration"]
},
{
type: "mcq",
q: "What is the primary purpose of a subnet mask?",
options: ["Identify the NIC manufacturer", "Identify the DNS server", "Separate network and host portions", "Select the application port", "Translate private addresses"],
answer: 2,
explain: "A subnet mask determines which portion of an IPv4 address is the network portion and which is the host portion.",
tags: ["ipv4", "subnetting"]
},
{
type: "mcq",
q: "What does the default gateway provide to a host?",
options: ["A local MAC address", "A path to other networks", "A DHCP lease time", "A DNS zone file", "A process identifier"],
answer: 1,
explain: "The default gateway provides a path to resources outside the local network when no more specific route exists.",
tags: ["routing", "gateway"]
},
{
type: "fill",
q: "How many bits are in an IPv4 address?",
answer: "32",
accepts: ["32 bits"],
explain: "IPv4 addresses are 32 bits long.",
tags: ["ipv4", "addressing"]
},
{
type: "mcq",
q: "How many octets are in an IPv4 address?",
options: ["2", "4", "6", "8", "16"],
answer: 1,
explain: "IPv4 has four octets, each containing 8 bits.",
tags: ["ipv4", "addressing"]
},
{
type: "mcq",
q: "What is the maximum decimal value of an IPv4 octet?",
options: ["127", "128", "255", "256", "511"],
answer: 2,
explain: "An 8-bit octet ranges from 0 through 255.",
tags: ["ipv4", "binary"]
},
{
type: "fill",
q: "What decimal value corresponds to binary 11111111?",
answer: "255",
explain: "Eight binary 1s represent decimal 255.",
tags: ["ipv4", "binary"]
},
{
type: "mcq",
q: "What does CIDR notation specify?",
options: ["The MAC manufacturer", "The number of network bits", "The DHCP lease duration", "The transport protocol", "The DNS record type"],
answer: 1,
explain: "CIDR uses a slash followed by the number of bits belonging to the network portion.",
tags: ["cidr", "ipv4"]
},
{
type: "mcq",
q: "In `192.168.89.127/24`, how many bits are in the network portion?",
options: ["8", "16", "24", "32", "64"],
answer: 2,
explain: "A `/24` prefix means the first 24 bits are the network portion.",
tags: ["cidr", "subnetting"]
},
{
type: "tf",
q: "In classless addressing, the network and host portions can be determined from the IP address alone.",
answer: false,
explain: "The subnet mask or CIDR prefix is required because the boundary can occur anywhere within the 32 bits.",
tags: ["cidr", "subnetting"]
},
{
type: "match",
q: "Match each private IPv4 range to its address block.",
pairs: [
{ item: "Class A private range", match: "10.0.0.0 – 10.255.255.255" },
{ item: "Class B private range", match: "172.16.0.0 – 172.31.255.255" },
{ item: "Class C private range", match: "192.168.0.0 – 192.168.255.255" }
],
explain: "These are the three private IPv4 ranges identified in the chapter.",
tags: ["ipv4", "private-addressing"]
},
{
type: "mcq",
q: "Which 172.x.x.x address is in the private IPv4 range?",
options: ["172.0.10.5", "172.15.10.5", "172.16.10.5", "172.32.10.5", "172.40.10.5"],
answer: 2,
explain: "The private Class B range begins at 172.16.0.0 and ends at 172.31.255.255.",
tags: ["ipv4", "private-addressing"]
},
{
type: "mcq",
q: "Which reserved IPv4 address represents an unspecified or unassigned address?",
options: ["127.0.0.1", "169.254.1.1", "192.168.1.1", "0.0.0.0", "255.255.255.255"],
answer: 3,
explain: "The chapter defines `0.0.0.0` as an unspecified or unassigned IPv4 address.",
tags: ["ipv4", "reserved"]
},
{
type: "mcq",
q: "Which address is the commonly used IPv4 localhost address?",
options: ["0.0.0.0", "127.0.0.1", "169.254.0.1", "192.168.0.1", "255.255.255.255"],
answer: 1,
explain: "`127.0.0.1` is the commonly used loopback or localhost address.",
tags: ["ipv4", "loopback"]
},
{
type: "mcq",
q: "A Windows client has a `169.254.x.x` address after DHCP was enabled. What is the most likely explanation?",
options: ["DNS is overloaded", "DHCP failed", "The gateway is public", "The MAC is duplicated", "NAT is disabled"],
answer: 1,
explain: "APIPA addresses in the `169.254.x.x` range are commonly assigned when DHCP cannot provide an address.",
tags: ["apipa", "dhcp", "troubleshooting"]
},
{
type: "mcq",
q: "What does a DHCP scope define?",
options: ["Allowed DNS records", "Available IP address range", "MAC address format", "Router interface speed", "Application port range"],
answer: 1,
explain: "A DHCP scope or pool defines the range of IP addresses available for assignment.",
tags: ["dhcp", "scope"]
},
{
type: "tf",
q: "A DHCP reservation is configured on the client device itself.",
answer: false,
explain: "A DHCP reservation is configured on the DHCP server, which assigns the same IP based on the client's MAC address.",
tags: ["dhcp", "reservation"]
},
{
type: "mcq",
q: "What identifies a device for a DHCP reservation in the chapter?",
options: ["Port number", "MAC address", "DNS suffix", "Subnet mask", "Default gateway"],
answer: 1,
explain: "The DHCP server uses the client's MAC address when assigning the reserved IP.",
tags: ["dhcp", "mac", "reservation"]
},
{
type: "mcq",
q: "What is the main management advantage of a DHCP reservation over a client-side static IP?",
options: ["It removes DNS", "It centralizes address management", "It disables DHCP", "It avoids all routing", "It eliminates MAC addresses"],
answer: 1,
explain: "A reservation provides a consistent address while keeping configuration centralized on the DHCP server.",
tags: ["dhcp", "reservation"]
},
{
type: "tf",
q: "Static IP addresses should generally be excluded from the DHCP pool.",
answer: true,
explain: "Excluding static addresses prevents DHCP from assigning the same address to another device and creating a conflict.",
tags: ["dhcp", "static-ip"]
},
{
type: "mcq",
q: "What is DHCP scope exhaustion?",
options: ["No DNS records exist", "All scope addresses are leased", "A router loses its MAC table", "A port becomes blocked", "A subnet mask changes"],
answer: 1,
explain: "Scope exhaustion occurs when all available IP addresses are leased and new clients cannot obtain one.",
tags: ["dhcp", "troubleshooting"]
},
{
type: "mcq",
q: "What is a likely downside of an excessively long DHCP lease?",
options: ["Too many DNS zones", "Scope exhaustion", "MAC address truncation", "Broken loopback", "Lower port numbers"],
answer: 1,
explain: "Inactive clients can retain leases longer, reducing address availability and contributing to scope exhaustion.",
tags: ["dhcp", "lease"]
},
{
type: "mcq",
q: "What is a likely downside of an excessively short DHCP lease?",
options: ["More DHCP traffic", "Fewer DNS records", "Longer MAC addresses", "More public IPs", "Fewer routes"],
answer: 0,
explain: "Short leases require clients to renew more frequently, increasing DHCP traffic and potentially causing disruptions.",
tags: ["dhcp", "lease"]
},
{
type: "fill",
q: "What technology translates private IPv4 addressing to a public-facing address at a gateway?",
answer: "NAT",
accepts: ["Network Address Translation", "Network Address Translation (NAT)"],
explain: "NAT translates private and public addressing at a gateway.",
tags: ["nat", "ipv4"]
},
{
type: "mcq",
q: "What does PAT use to distinguish multiple internal connections sharing one public IP?",
options: ["MAC addresses", "DNS names", "Transport ports", "Subnet classes", "OUI values"],
answer: 2,
explain: "PAT extends NAT by using transport-layer ports to distinguish connections.",
tags: ["pat", "nat"]
},
{
type: "mcq",
q: "Which translation changes the source IP address of outgoing traffic?",
options: ["DNAT", "SNAT", "PAT only", "SLAAC", "DAD"],
answer: 1,
explain: "SNAT changes the source IP address, commonly replacing a private address with a public one for outbound traffic.",
tags: ["snat", "nat"]
},
{
type: "mcq",
q: "Which translation changes the destination IP address of incoming traffic?",
options: ["SNAT", "DHCP", "DNAT", "SLAAC", "APIPA"],
answer: 2,
explain: "DNAT changes the destination IP and is commonly used to direct incoming traffic to an internal host.",
tags: ["dnat", "nat"]
},
{
type: "mcq",
q: "Which feature is commonly associated with DNAT in the chapter?",
options: ["Port forwarding", "DHCP renewal", "MAC learning", "Loopback testing", "Zone transfer"],
answer: 0,
explain: "DNAT is commonly used for port forwarding to internal web servers, email servers, and similar services.",
tags: ["dnat", "port-forwarding"]
},
{
type: "mcq",
q: "How many bits long is an IPv6 address?",
options: ["32", "48", "64", "96", "128"],
answer: 4,
explain: "IPv6 uses 128-bit addresses.",
tags: ["ipv6", "addressing"]
},
{
type: "mcq",
q: "How many hexadecimal blocks are normally written in an IPv6 address?",
options: ["4", "6", "8", "16", "32"],
answer: 2,
explain: "IPv6 is written as eight blocks of four hexadecimal digits.",
tags: ["ipv6", "hexadecimal"]
},
{
type: "fill",
q: "How many bits are represented by each IPv6 block?",
answer: "16",
accepts: ["16 bits"],
explain: "Each IPv6 block contains four hexadecimal digits, representing 16 bits.",
tags: ["ipv6", "hexadecimal"]
},
{
type: "mcq",
q: "Which IPv6 shorthand rule removes leading zeroes within a block?",
options: ["Replace all zeros with one colon", "Omit leading zeroes", "Reverse each block", "Convert blocks to decimal", "Duplicate compressed blocks"],
answer: 1,
explain: "Leading zeroes within an IPv6 block can be omitted.",
tags: ["ipv6", "notation"]
},
{
type: "mcq",
q: "Which IPv6 notation compresses a contiguous run of zero-valued blocks?",
options: ["//", "::", "..", "00", "/0"],
answer: 1,
explain: "`::` represents one or more omitted groups of zeroes.",
tags: ["ipv6", "notation"]
},
{
type: "tf",
q: "The `::` IPv6 compression shorthand should be used more than once when possible.",
answer: false,
explain: "The chapter states that `::` should not be used more than once in a single IPv6 address.",
tags: ["ipv6", "notation"]
},
{
type: "mcq",
q: "Which IPv6 prefix is used for global unicast addressing in the chapter?",
options: ["FC00::/7", "FE80::/10", "FF00::/8", "2000::/3", "::1/128"],
answer: 3,
explain: "`2000::/3` is the global unicast prefix emphasized in the chapter.",
tags: ["ipv6", "global-unicast"]
},
{
type: "mcq",
q: "Which IPv6 prefix is associated with link-local unicast?",
options: ["2000::/3", "FE80::/10", "FC00::/7", "FF00::/8", "::1/128"],
answer: 1,
explain: "`FE80::/10` is the link-local IPv6 range emphasized in the chapter.",
tags: ["ipv6", "link-local"]
},
{
type: "mcq",
q: "Which IPv6 prefix is used for unique local addressing?",
options: ["2000::/3", "FE80::/10", "FC00::/7", "FF00::/8", "::1/128"],
answer: 2,
explain: "`FC00::/7` is used for private or internal IPv6 addressing.",
tags: ["ipv6", "unique-local"]
},
{
type: "mcq",
q: "Which IPv6 address is the loopback address?",
options: ["::0", "::1", "FE80::1", "FC00::1", "FF00::1"],
answer: 1,
explain: "`::1/128` is the IPv6 loopback address.",
tags: ["ipv6", "loopback"]
},
{
type: "mcq",
q: "Which IPv6 prefix identifies multicast addresses?",
options: ["2000::/3", "FE80::/10", "FC00::/7", "FF00::/8", "::1/128"],
answer: 3,
explain: "`FF00::/8` is the IPv6 multicast range.",
tags: ["ipv6", "multicast"]
},
{
type: "multi",
q: "Which statements correctly describe IPv6 addressing types?",
options: [
"Unicast sends to one destination",
"Multicast sends to members of a targeted group",
"Anycast sends to the closest destination according to routing",
"IPv6 relies on IPv4-style broadcasting for most functions",
"Anycast requires every device to use a unique address"
],
answer: [0, 1, 2],
explain: "The chapter describes unicast as one-to-one, multicast as one-to-group, and anycast as reaching the closest destination among devices sharing an address.",
tags: ["ipv6", "addressing"]
},
{
type: "mcq",
q: "What does the IPv6 interface ID represent in the chapter's model?",
options: ["First 16 bits", "First 32 bits", "Last 32 bits", "Last 64 bits", "Entire address"],
answer: 3,
explain: "The interface ID is the last 64 bits, or four blocks, of the IPv6 address.",
tags: ["ipv6", "interface-id"]
},
{
type: "mcq",
q: "What does SLAAC allow an IPv6 host to do?",
options: ["Translate IPv4 addresses", "Configure IPv6 automatically", "Assign DHCP scopes", "Resolve all DNS records", "Create MAC addresses"],
answer: 1,
explain: "SLAAC enables stateless IPv6 address autoconfiguration without assistance from a DHCPv6 server.",
tags: ["ipv6", "slaac"]
},
{
type: "match",
q: "Match each SLAAC step or message to its purpose.",
pairs: [
{ item: "DAD", match: "Checks whether the proposed address is already in use" },
{ item: "RS", match: "Asks the router for configuration information" },
{ item: "RA", match: "Provides network configuration from the router" },
{ item: "Interface ID", match: "Identifies the interface portion of the IPv6 address" }
],
explain: "The chapter presents SLAAC as generating an address, checking uniqueness with DAD, sending RS, and receiving RA.",
tags: ["ipv6", "slaac", "dad"]
},
{
type: "mcq",
q: "What happens if Duplicate Address Detection receives a response?",
options: ["The router disables IPv6", "The host keeps the duplicate address", "The host generates a different address", "The host switches to IPv4 only", "The DHCP server assigns a MAC"],
answer: 2,
explain: "A response indicates the address is already in use, so the device generates a different address.",
tags: ["ipv6", "dad"]
},
{
type: "mcq",
q: "What is the purpose of an IPv6 Router Solicitation message?",
options: ["Request network configuration", "Request a DHCP lease renewal", "Query an MX record", "Test a TCP socket", "Forward a DNS response"],
answer: 0,
explain: "RS asks a router for network configuration information.",
tags: ["ipv6", "slaac"]
},
{
type: "mcq",
q: "What can an IPv6 Router Advertisement provide?",
options: ["Only a MAC address", "Only a TCP port", "Network prefix and DNS information", "Only an IPv4 address", "Only a DHCP lease"],
answer: 2,
explain: "An RA can provide the network prefix, DNS server information, and other configuration details.",
tags: ["ipv6", "slaac"]
},
{
type: "mcq",
q: "Which IPv4/IPv6 coexistence method runs both protocols simultaneously?",
options: ["NAT64", "Tunneling", "Dual stack", "PAT", "SLAAC"],
answer: 2,
explain: "Dual stack configures devices and networks to use IPv4 and IPv6 simultaneously.",
tags: ["ipv6", "dual-stack"]
},
{
type: "mcq",
q: "Which transition method encapsulates one IP version inside another network?",
options: ["PAT", "Tunneling", "Dual stack", "DHCP", "DAD"],
answer: 1,
explain: "Tunneling carries one IP protocol through a network using another protocol.",
tags: ["ipv6", "tunneling"]
},
{
type: "mcq",
q: "Which technology translates communication between IPv4-only and IPv6-only devices?",
options: ["SLAAC", "PAT", "NAT64", "DAD", "APIPA"],
answer: 2,
explain: "NAT64 translates addresses and traffic between IPv4 and IPv6 environments.",
tags: ["ipv6", "nat64"]
},
{
type: "mcq",
q: "Which port range is classified as well-known?",
options: ["0-1023", "1024-49151", "49152-65535", "1-4095", "32768-65535"],
answer: 0,
explain: "Ports 0 through 1023 are the well-known range described in the chapter.",
tags: ["ports", "ranges"]
},
{
type: "mcq",
q: "Which port range is classified as registered?",
options: ["0-255", "256-1023", "1024-49151", "49152-65535", "60000-65535"],
answer: 2,
explain: "Ports 1024 through 49151 are the registered range in the source.",
tags: ["ports", "ranges"]
},
{
type: "fill",
q: "Which port range is classified as dynamic/private?",
answer: "49152-65535",
accepts: ["49152 through 65535"],
explain: "The chapter lists 49152 through 65535 as dynamic/private ports.",
tags: ["ports", "ranges"]
},
{
type: "match",
q: "Match each protocol to its port.",
pairs: [
{ item: "FTP data", match: "20" },
{ item: "FTP control", match: "21" },
{ item: "SSH", match: "22" },
{ item: "Telnet", match: "23" },
{ item: "SMTP", match: "25" }
],
explain: "These well-known ports are listed in the chapter's port table.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each network service to its port.",
pairs: [
{ item: "DNS", match: "53" },
{ item: "DHCP client-to-server", match: "67" },
{ item: "DHCP server-to-client", match: "68" },
{ item: "TFTP", match: "69" },
{ item: "HTTP", match: "80" }
],
explain: "The chapter associates DNS with 53, DHCP with 67/68, TFTP with 69, and HTTP with 80.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each protocol to its port.",
pairs: [
{ item: "POP3", match: "110" },
{ item: "NTP", match: "123" },
{ item: "IMAP4", match: "143" },
{ item: "SNMP manager messages", match: "161" },
{ item: "SNMP responses or unsolicited messages", match: "162" }
],
explain: "These port assignments appear in the chapter's protocol table.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each service to its port.",
pairs: [
{ item: "LDAP", match: "389" },
{ item: "HTTPS", match: "443" },
{ item: "SMB", match: "445" },
{ item: "Syslog", match: "514" },
{ item: "SMTPS", match: "587" }
],
explain: "These values are explicitly listed in the chapter.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each service to its port.",
pairs: [
{ item: "LDAPS", match: "636" },
{ item: "IMAP4 over SSL", match: "993" },
{ item: "POP3 over SSL", match: "995" },
{ item: "SQL Server", match: "1433" },
{ item: "RDP", match: "3389" }
],
explain: "These service-to-port mappings are listed in the chapter.",
tags: ["ports", "protocols"]
},
{
type: "mcq",
q: "Which port is used by encrypted remote communication with SSH?",
options: ["21", "22", "23", "80", "443"],
answer: 1,
explain: "SSH uses TCP port 22.",
tags: ["ports", "ssh"]
},
{
type: "mcq",
q: "Which protocol provides unencrypted remote computer control?",
options: ["SSH", "SFTP", "Telnet", "RDP", "HTTPS"],
answer: 2,
explain: "Telnet uses port 23 and provides remote control without encryption.",
tags: ["ports", "telnet"]
},
{
type: "mcq",
q: "Which protocol is described as encrypted file transfer through SSH?",
options: ["TFTP", "SFTP", "FTP", "SMB", "SIP"],
answer: 1,
explain: "SFTP provides encrypted file transfer through SSH and uses port 22 in the source table.",
tags: ["ports", "sftp"]
},
{
type: "mcq",
q: "Which secure web protocol uses port 443?",
options: ["HTTP", "FTP", "HTTPS", "LDAP", "SMTP"],
answer: 2,
explain: "HTTPS uses port 443 and secures HTTP with SSL/TLS.",
tags: ["ports", "https"]
},
{
type: "multi",
q: "Which protocol-port pairs are secure variants emphasized by the chapter?",
options: [
"HTTPS — 443",
"LDAPS — 636",
"POP3 over SSL — 995",
"IMAP4 over SSL — 993",
"Telnet — 22"
],
answer: [0, 1, 2, 3],
explain: "The chapter highlights secure alternatives including HTTPS 443, LDAPS 636, POP3 over SSL 995, and IMAP4 over SSL 993.",
tags: ["ports", "secure-protocols"]
},
{
type: "mcq",
q: "Which protocol uses UDP port 123 for time synchronization?",
options: ["NTP", "SNMP", "DNS", "SIP", "TFTP"],
answer: 0,
explain: "NTP synchronizes network clocks using UDP port 123.",
tags: ["ports", "ntp"]
},
{
type: "mcq",
q: "Which protocol uses TCP port 445 for network file sharing?",
options: ["LDAP", "SMB", "SMTP", "RDP", "NTP"],
answer: 1,
explain: "SMB uses TCP port 445 for network file sharing.",
tags: ["ports", "smb"]
},
{
type: "mcq",
q: "Which protocol uses UDP port 514 for system event messages?",
options: ["Syslog", "SNMP", "TFTP", "NTP", "SIP"],
answer: 0,
explain: "The chapter lists Syslog on UDP 514 for system event messages.",
tags: ["ports", "syslog"]
},
{
type: "mcq",
q: "Which protocol uses TCP port 1433 in the chapter?",
options: ["RDP", "SQL Server", "SMB", "LDAP", "HTTPS"],
answer: 1,
explain: "Port 1433/TCP is listed for Microsoft SQL Server connections.",
tags: ["ports", "sql-server"]
},
{
type: "mcq",
q: "What does DNS primarily provide?",
options: ["MAC learning", "Name resolution", "Port translation", "DHCP leasing", "Clock synchronization"],
answer: 1,
explain: "DNS performs name resolution, converting human-readable names into IP addresses.",
tags: ["dns", "name-resolution"]
},
{
type: "mcq",
q: "What is an FQDN?",
options: ["A transport protocol", "A complete host/domain name", "A MAC vendor code", "A subnet mask", "A DNS cache entry"],
answer: 1,
explain: "FQDN means Fully Qualified Domain Name and identifies a complete host/domain name.",
tags: ["dns", "fqdn"]
},
{
type: "mcq",
q: "In `www.example.com`, what is `.com`?",
options: ["Host name", "Domain name", "TLD", "Subnet", "Protocol"],
answer: 2,
explain: "`.com` is the Top-Level Domain.",
tags: ["dns", "tld"]
},
{
type: "mcq",
q: "What is the key difference between an FQDN and a URL?",
options: ["FQDN uses ports only", "URL cannot include a protocol", "FQDN identifies a host; URL locates a resource", "URL is always shorter", "FQDN must include a path"],
answer: 2,
explain: "An FQDN identifies a host/domain, while a URL locates a specific resource and can include a protocol and path.",
tags: ["dns", "fqdn", "url"]
},
{
type: "mcq",
q: "Which method uses a local file containing manually configured hostname-to-IP mappings?",
options: ["Hosts file", "Zone transfer", "PAT table", "MAC table", "DHCP scope"],
answer: 0,
explain: "The hosts file contains manually configured hostname or FQDN mappings to IP addresses.",
tags: ["dns", "hosts-file"]
},
{
type: "match",
q: "Match each DNS role to its function.",
pairs: [
{ item: "Resolver", match: "DNS client that sends requests" },
{ item: "Primary DNS server", match: "Authoritative database for the organization's zone" },
{ item: "Secondary DNS server", match: "Backup authoritative server" },
{ item: "Caching DNS server", match: "Caches answers for local clients" },
{ item: "Forwarding DNS server", match: "Forwards unresolved queries to another DNS server" }
],
explain: "The chapter distinguishes the resolver, authoritative servers, caching servers, and forwarding servers by how they participate in DNS resolution.",
tags: ["dns", "servers"]
},
{
type: "mcq",
q: "What does a secondary DNS server use to synchronize authoritative zone data?",
options: ["PAT", "Zone transfer", "DHCP renewal", "Reverse lookup", "SLAAC"],
answer: 1,
explain: "The source states that a secondary server updates from the primary using a zone transfer.",
tags: ["dns", "zone-transfer"]
},
{
type: "mcq",
q: "What does a caching DNS server primarily store?",
options: ["MAC addresses", "Cached DNS information", "DHCP scopes", "Routing tables", "Port mappings"],
answer: 1,
explain: "A caching server stores DNS information it has collected and can use cached data to answer clients.",
tags: ["dns", "caching"]
},
{
type: "mcq",
q: "What is a key behavior of a forwarding DNS server?",
options: ["It never caches", "It always acts as authoritative", "It forwards unresolved queries", "It assigns IP addresses", "It learns MAC addresses"],
answer: 2,
explain: "A forwarding server forwards queries it cannot answer from its cache to another DNS server.",
tags: ["dns", "forwarding"]
},
{
type: "mcq",
q: "Which DNS server level is queried to locate the authoritative server for a domain?",
options: ["Root", "TLD", "Caching", "Forwarding", "Resolver"],
answer: 1,
explain: "The TLD server provides information about the authoritative DNS server for the organization.",
tags: ["dns", "hierarchy"]
},
{
type: "mcq",
q: "What is the expected result of a recursive DNS lookup?",
options: ["Only a referral", "A final answer or failure", "A MAC address", "A DHCP lease", "A routing table"],
answer: 1,
explain: "A recursive request expects the receiving DNS server to return the final answer or report that the name cannot be resolved.",
tags: ["dns", "recursive"]
},
{
type: "mcq",
q: "What does an iterative DNS response commonly provide?",
options: ["A final answer only", "A referral or information already known", "A new MAC address", "A DHCP scope", "An IP reservation"],
answer: 1,
explain: "In iterative resolution, the receiving server can return what it knows, such as a referral, and the requester continues the search.",
tags: ["dns", "iterative"]
},
{
type: "mcq",
q: "Which DNS record maps a hostname to an IPv4 address?",
options: ["AAAA", "A", "PTR", "MX", "CNAME"],
answer: 1,
explain: "An A record provides a hostname-to-IPv4 mapping.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "Which DNS record maps a hostname to an IPv6 address?",
options: ["A", "AAAA", "PTR", "NS", "SOA"],
answer: 1,
explain: "An AAAA record maps a hostname to an IPv6 address.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "Which DNS record maps an alias to a canonical hostname?",
options: ["CNAME", "PTR", "MX", "SOA", "NS"],
answer: 0,
explain: "CNAME maps an alias to a canonical hostname.",
tags: ["dns", "cname"]
},
{
type: "mcq",
q: "Which DNS record identifies mail servers for a domain?",
options: ["A", "CNAME", "MX", "PTR", "TXT"],
answer: 2,
explain: "MX identifies the mail server or servers responsible for email for a domain.",
tags: ["dns", "mx"]
},
{
type: "mcq",
q: "Which DNS record is used for reverse DNS?",
options: ["A", "AAAA", "PTR", "MX", "CNAME"],
answer: 2,
explain: "PTR maps an IP address to a hostname for reverse DNS.",
tags: ["dns", "ptr"]
},
{
type: "mcq",
q: "Which DNS record identifies authoritative name servers?",
options: ["NS", "TXT", "SOA", "A", "MX"],
answer: 0,
explain: "NS identifies authoritative name servers for a domain or zone and supports delegation.",
tags: ["dns", "ns"]
},
{
type: "mcq",
q: "Which DNS record contains zone-authority and administrative information?",
options: ["SOA", "MX", "PTR", "AAAA", "CNAME"],
answer: 0,
explain: "SOA contains administrative information such as contact, serial number, timing, and zone-transfer information.",
tags: ["dns", "soa"]
},
{
type: "mcq",
q: "Which DNS record commonly stores SPF, DKIM, and DMARC information?",
options: ["A", "NS", "TXT", "PTR", "CNAME"],
answer: 2,
explain: "TXT records store free-form text and are commonly used for SPF, DKIM, and DMARC information.",
tags: ["dns", "txt", "email"]
},
{
type: "mcq",
q: "What does a forward DNS lookup start with?",
options: ["An IP address", "A MAC address", "A hostname", "A port", "A subnet mask"],
answer: 2,
explain: "A forward lookup starts with a host name and returns an IP address.",
tags: ["dns", "forward-lookup"]
},
{
type: "mcq",
q: "What does a reverse DNS lookup start with?",
options: ["A hostname", "A domain suffix", "An IP address", "A port", "An OUI"],
answer: 2,
explain: "A reverse lookup starts with an IP address and attempts to return the associated hostname.",
tags: ["dns", "reverse-dns"]
},
{
type: "mcq",
q: "What does DNS TTL control?",
options: ["TCP session length", "DNS cache validity", "DHCP scope size", "MAC address size", "Port allocation"],
answer: 1,
explain: "TTL controls how long DNS information remains valid in caches before another request is needed.",
tags: ["dns", "ttl"]
},
{
type: "fill",
q: "What protocol does `ping` use for IPv4?",
answer: "ICMP",
accepts: ["Internet Control Message Protocol", "Internet Control Message Protocol (ICMP)"],
explain: "Ping uses ICMP echo requests and replies for IPv4 connectivity testing.",
tags: ["ping", "icmp"]
},
{
type: "mcq",
q: "What does `ping 127.0.0.1` test?",
options: ["Internet DNS", "The local TCP/IP stack", "The default route", "The remote host", "The DHCP server"],
answer: 1,
explain: "The loopback test checks the local TCP/IP stack.",
tags: ["ping", "loopback"]
},
{
type: "mcq",
q: "What does `ping 8.8.8.8` test without involving DNS name resolution?",
options: ["Only the MAC table", "Internet IP connectivity", "Only DHCP scope size", "Only the local loopback", "Only an application port"],
answer: 1,
explain: "Pinging a known IP tests Internet connectivity without first resolving a hostname.",
tags: ["ping", "dns", "troubleshooting"]
},
{
type: "mcq",
q: "A host can ping `8.8.8.8` but cannot ping `google.com`. What should you suspect first?",
options: ["MAC learning", "DNS resolution", "Loopback failure", "Subnet broadcast", "PAT exhaustion"],
answer: 1,
explain: "The IP address works, so basic IP connectivity is present; failure by hostname points toward DNS.",
tags: ["troubleshooting", "dns"]
},
{
type: "mcq",
q: "What does `ping -a 8.8.8.8` attempt on Windows?",
options: ["DHCP renewal", "Reverse name resolution", "Route deletion", "DNS cache clearing", "Port scanning"],
answer: 1,
explain: "The `-a` option attempts reverse name resolution and displays the hostname.",
tags: ["ping", "reverse-dns"]
},
{
type: "mcq",
q: "What does `ping -t 192.168.1.1` do on Windows?",
options: ["Sends one request", "Continuously pings until interrupted", "Changes the gateway", "Displays DNS records", "Releases DHCP"],
answer: 1,
explain: "`-t` makes ping continue until the user interrupts it.",
tags: ["ping", "windows"]
},
{
type: "mcq",
q: "Which Windows command displays the routing table?",
options: ["route print", "ipconfig /release", "hostname", "nslookup", "ipconfig /flushdns"],
answer: 0,
explain: "`route print` displays the Windows routing table.",
tags: ["routing", "windows"]
},
{
type: "mcq",
q: "Which Windows command releases the current DHCP lease?",
options: ["ipconfig /renew", "ipconfig /release", "ipconfig /displaydns", "ipconfig /all", "route print"],
answer: 1,
explain: "`ipconfig /release` releases the active DHCP lease.",
tags: ["dhcp", "windows"]
},
{
type: "mcq",
q: "Which Windows command requests new DHCP configuration?",
options: ["ipconfig /renew", "ipconfig /release", "ipconfig /flushdns", "route print", "hostname"],
answer: 0,
explain: "`ipconfig /renew` obtains renewed network configuration through DHCP.",
tags: ["dhcp", "windows"]
},
{
type: "mcq",
q: "Which Windows command displays the local DNS cache?",
options: ["ipconfig /all", "ipconfig /displaydns", "ipconfig /renew", "route print", "hostname"],
answer: 1,
explain: "`ipconfig /displaydns` displays DNS resolver cache information.",
tags: ["dns", "windows"]
},
{
type: "mcq",
q: "Which Windows command clears the local DNS cache?",
options: ["ipconfig /release", "ipconfig /renew", "ipconfig /flushdns", "ipconfig /displaydns", "route print"],
answer: 2,
explain: "`ipconfig /flushdns` clears the local DNS resolver cache.",
tags: ["dns", "windows"]
},
{
type: "mcq",
q: "Which utility is described as deprecated on many Linux distributions, including Ubuntu?",
options: ["ip", "ifconfig", "hostname", "dig", "nslookup"],
answer: 1,
explain: "The chapter notes that `ifconfig` is deprecated in many Linux distributions.",
tags: ["linux", "ifconfig"]
},
{
type: "mcq",
q: "Which utility is emphasized as the modern Linux/UNIX interface and IP management tool?",
options: ["ifconfig", "ip", "ping6", "nslookup", "hostname"],
answer: 1,
explain: "The chapter emphasizes the `ip` utility for Linux/UNIX interface and IP configuration.",
tags: ["linux", "ip"]
},
{
type: "mcq",
q: "Which utility is primarily used to query DNS information interactively or noninteractively?",
options: ["route", "hostname", "nslookup", "ipconfig", "ifconfig"],
answer: 2,
explain: "`nslookup` performs DNS queries and supports both interactive and noninteractive modes.",
tags: ["dns", "nslookup"]
},
{
type: "mcq",
q: "Which DNS tool generally provides more detailed response information on Linux and macOS?",
options: ["hostname", "ping", "dig", "route", "ipconfig"],
answer: 2,
explain: "The chapter describes `dig` as providing more detailed DNS information than `nslookup`.",
tags: ["dns", "dig"]
},
{
type: "mcq",
q: "Which command queries MX records with `nslookup`?",
options: ["nslookup -type=MX example.com", "nslookup -mx example.com", "nslookup example.com MX", "nslookup --mail example.com", "nslookup /mx example.com"],
answer: 0,
explain: "The chapter shows `nslookup -type=MX example.com` for querying MX records.",
tags: ["dns", "nslookup", "mx"]
},
{
type: "mcq",
q: "Which command performs a reverse DNS lookup with `dig`?",
options: ["dig example.com PTR", "dig -x 8.8.8.8", "dig @8.8.8.8", "dig reverse 8.8.8.8", "dig -r 8.8.8.8"],
answer: 1,
explain: "The chapter shows `dig -x 8.8.8.8` for reverse lookup.",
tags: ["dns", "dig", "reverse-dns"]
},
{
type: "mcq",
q: "Which command sends a DNS query to a specified server with `dig`?",
options: ["dig 8.8.8.8 example.com", "dig @8.8.8.8 example.com", "dig -server 8.8.8.8 example.com", "dig example.com 8.8.8.8", "dig --dns 8.8.8.8 example.com"],
answer: 1,
explain: "The `@server` syntax selects the DNS server for the query.",
tags: ["dns", "dig"]
},
{
type: "mcq",
q: "Which Windows tool is one of the first places to look for detailed system and application events?",
options: ["Task Scheduler", "Event Viewer", "Resource Monitor", "Device Manager", "Services"],
answer: 1,
explain: "Event Viewer shows detailed system and application events and can help identify what happened and when.",
tags: ["windows", "event-viewer"]
},
{
type: "fill",
q: "What command opens Event Viewer through the Windows Run dialog?",
answer: "eventvwr.msc",
explain: "Entering `eventvwr.msc` in Run opens Event Viewer.",
tags: ["windows", "event-viewer"]
},
{
type: "mcq",
q: "One computer consistently loses the correct time after power-on. What should you suspect first?",
options: ["DNS cache", "Dead CMOS battery", "DHCP scope exhaustion", "Incorrect PTR record", "Broken MAC table"],
answer: 1,
explain: "The chapter associates a single computer with persistent incorrect time after power-on with a dead CMOS battery.",
tags: ["troubleshooting", "time"]
},
{
type: "mcq",
q: "Multiple computers in a domain consistently show the wrong time. What should be checked?",
options: ["OUI assignment", "NTP time source", "MAC table", "SMTP port", "APIPA range"],
answer: 1,
explain: "Multiple devices having the wrong time points toward the NTP time source or synchronization configuration.",
tags: ["ntp", "troubleshooting"]
},
{
type: "mcq",
q: "Which UDP port must be allowed for normal NTP synchronization?",
options: ["53", "67", "80", "123", "443"],
answer: 3,
explain: "NTP uses UDP port 123.",
tags: ["ntp", "ports"]
},
{
type: "mcq",
q: "Which Windows command shows the current NTP/time source?",
options: ["w32tm /query /source", "time /query /source", "ntp /show /source", "w32tm /source", "clock /query /ntp"],
answer: 0,
explain: "The chapter gives `w32tm /query /source` to identify the current NTP/time source.",
tags: ["ntp", "windows"]
},
{
type: "mcq",
q: "How does PTP differ most significantly from NTP in the chapter?",
options: ["PTP uses only DNS", "PTP provides greater accuracy with hardware-based timekeeping", "PTP uses DHCP for clocks", "PTP cannot synchronize networks", "PTP always costs less"],
answer: 1,
explain: "PTP can reach nanosecond accuracy and commonly uses specialized hardware, while NTP provides general synchronization at lower cost and complexity.",
tags: ["ntp", "ptp", "time-sync"]
},
{
type: "mcq",
q: "What does a DHCP lease determine?",
options: ["How long an address may be used", "Which DNS record is authoritative", "Which MAC is forwarded", "Which port is open", "Which route is default"],
answer: 0,
explain: "A DHCP lease determines how long a client can use its assigned IP address before renewal.",
tags: ["dhcp", "lease"]
},
{
type: "multi",
q: "A static host can reach nearby systems but not remote networks. Which settings should be checked?",
options: ["Default gateway", "Subnet mask", "IP address", "DNS only", "OUI"],
answer: [0, 1, 2],
explain: "The chapter's troubleshooting sequence emphasizes checking IP configuration, subnetting, and the default gateway before focusing on DNS.",
tags: ["troubleshooting", "ipv4"]
},
{
type: "mcq",
q: "A client can ping its gateway but cannot reach a remote IP. Which area should be investigated next?",
options: ["Routing or remote host", "DNS only", "MAC manufacturer", "Email configuration", "Hosts file only"],
answer: 0,
explain: "Failure to reach a remote IP after gateway connectivity points toward routing or the remote host.",
tags: ["troubleshooting", "routing"]
},
{
type: "mcq",
q: "A client can reach an IP but cannot reach its hostname. Which layer of troubleshooting should follow?",
options: ["MAC learning", "DNS resolution", "DHCP scope creation", "Loopback addressing", "NTP stratum"],
answer: 1,
explain: "Working IP connectivity with failed hostname resolution points toward DNS.",
tags: ["troubleshooting", "dns"]
},
{
type: "mcq",
q: "What is the recommended high-level troubleshooting progression in the chapter?",
options: ["Application, DNS, gateway, IP", "IP, subnet, gateway, DNS, application", "DNS, MAC, DHCP, port", "Port, application, IP, DNS", "MAC, DNS, DHCP, application"],
answer: 1,
explain: "The chapter teaches moving from local addressing and routing toward DNS and finally the application or service.",
tags: ["troubleshooting", "workflow"]
},
{
type: "mcq",
q: "A DNS migration appears broken, but host DNS settings are correct and an external test reports \"Network is unreachable.\" What is the likely root cause described?",
options: ["Missing default route", "Bad MX record", "Wrong MAC OUI", "Expired DHCP lease", "Incorrect CNAME"],
answer: 0,
explain: "The chapter's case study found that the host had no default route, preventing access to external DNS servers.",
tags: ["troubleshooting", "routing", "dns"]
},
{
type: "mcq",
q: "Which command is appropriate for finding a hostname from a known IP address?",
options: ["nslookup 8.8.8.8", "ipconfig /renew", "route print 8.8.8.8", "hostname 8.8.8.8", "ping /reverse 8.8.8.8"],
answer: 0,
explain: "The chapter uses `nslookup` with an IP address for reverse DNS lookup.",
tags: ["dns", "reverse-dns", "nslookup"]
},
{
type: "mcq",
q: "Which pair correctly identifies the service and process in `208.85.40.44:443`?",
options: ["IP identifies process; port identifies host", "IP identifies host; port identifies process", "IP identifies DNS; port identifies router", "IP identifies user; port identifies MAC", "IP identifies subnet; port identifies OUI"],
answer: 1,
explain: "The IP address identifies the host and port 443 identifies the HTTPS service endpoint on that host.",
tags: ["socket", "ports", "https"]
},
{
type: "multi",
q: "Which statements correctly describe a troubleshooting case where local devices work but the Internet does not?",
options: [
"Check the subnet configuration",
"Check the default gateway or route",
"Immediately blame DNS",
"Check local and remote reachability separately",
"Assume the application is the root cause"
],
answer: [0, 1, 3],
explain: "The chapter recommends verifying subnetting, gateway/routing, and reachability before assuming an application or DNS problem.",
tags: ["troubleshooting", "routing"]
},
{
type: "mcq",
q: "Which command verifies the Linux routing table in the chapter?",
options: ["ip route", "ipconfig /all", "route showdns", "nmcli route dns", "hostname -r"],
answer: 0,
explain: "The source lists `ip route` for displaying Linux routing information.",
tags: ["linux", "routing"]
},
{
type: "match",
q: "Match each common problem to its most likely interpretation.",
pairs: [
{ item: "Wrong subnet mask", match: "Limited or failed communication" },
{ item: "Wrong default gateway", match: "Remote networks may be unreachable" },
{ item: "Wrong DNS", match: "Names may fail while IPs work" },
{ item: "Duplicate IP", match: "IP conflict and unstable communication" }
],
explain: "These are the chapter's listed effects of common IP configuration errors.",
tags: ["troubleshooting", "ipv4"]
},
{
type: "mcq",
q: "A network printer must keep the same address, but administrators want centralized management. Which option best fits the chapter?",
options: ["APIPA", "DHCP reservation", "Random IPv6 ID", "Loopback address", "Dynamic private port"],
answer: 1,
explain: "A DHCP reservation gives a device a consistent IP while keeping configuration centralized on the DHCP server.",
tags: ["dhcp", "reservation", "scenario"]
},
{
type: "mcq",
q: "Five private clients share one public IPv4 address for Internet access. Which technology best describes this?",
options: ["DNS", "PAT", "SLAAC", "PTR", "DAD"],
answer: 1,
explain: "PAT allows multiple internal hosts to share one public IP by distinguishing flows with transport ports.",
tags: ["pat", "nat", "scenario"]
},
{
type: "mcq",
q: "Which DNS record would you inspect to determine the mail server for a domain?",
options: ["A", "PTR", "MX", "SOA", "CNAME"],
answer: 2,
explain: "MX records identify the mail server or servers responsible for a domain.",
tags: ["dns", "mx", "scenario"]
},
{
type: "mcq",
q: "Which DNS record would you inspect to find the hostname associated with a known IPv4 address?",
options: ["AAAA", "PTR", "MX", "NS", "TXT"],
answer: 1,
explain: "PTR records are used for reverse DNS, mapping IP addresses to hostnames.",
tags: ["dns", "ptr", "scenario"]
},
{
type: "mcq",
q: "Which protocol uses port 53 and may use either UDP or TCP according to the chapter?",
options: ["DNS", "DHCP", "NTP", "SMTP", "SNMP"],
answer: 0,
explain: "The port table lists DNS as 53/TCP or UDP, while the text notes UDP 53 is typical.",
tags: ["dns", "ports"]
},
{
type: "mcq",
q: "Which service uses port 636 for secure directory access?",
options: ["LDAPS", "LDAP", "SMB", "HTTPS", "SNMP"],
answer: 0,
explain: "LDAPS uses port 636 for secure directory access.",
tags: ["ports", "ldap"]
},
{
type: "mcq",
q: "Which service uses port 587 in the source table?",
options: ["SMTP", "SMTPS", "POP3", "IMAP4", "HTTPS"],
answer: 1,
explain: "The source lists SMTPS on TCP port 587.",
tags: ["ports", "smtp"]
},
{
type: "mcq",
q: "Which port is associated with HTTPS in the chapter?",
options: ["25", "53", "80", "443", "587"],
answer: 3,
explain: "HTTPS uses TCP port 443 in the chapter's port table.",
tags: ["ports", "https"]
},
{
type: "multi",
q: "Which items are associated with DNS troubleshooting in the chapter?",
options: ["nslookup", "dig", "ipconfig /displaydns", "ipconfig /flushdns", "show mac-address-table"],
answer: [0, 1, 2, 3],
explain: "The chapter uses nslookup and dig for DNS queries and the ipconfig DNS options for cache inspection and clearing.",
tags: ["dns", "troubleshooting"]
},
{
type: "mcq",
q: "Which command compares directly with `dig example.com` for a basic DNS lookup?",
options: ["nslookup example.com", "nslookup -type=MX example.com", "nslookup 8.8.8.8", "nslookup -type=NS example.com", "nslookup example.com 8.8.8.8"],
answer: 0,
explain: "The source pairs `nslookup example.com` with `dig example.com` for a basic hostname lookup.",
tags: ["dns", "nslookup", "dig"]
},
{
type: "mcq",
q: "Which command queries NS records with `dig`?",
options: ["dig example.com A", "dig example.com NS", "dig example.com MX", "dig -x example.com", "dig @NS example.com"],
answer: 1,
explain: "The chapter shows `dig example.com NS` for querying NS records.",
tags: ["dns", "dig", "ns"]
},
{
type: "mcq",
q: "Which statement best describes the role of a resolver?",
options: ["It stores all authoritative zones", "It sends DNS requests", "It learns switch MACs", "It assigns DHCP leases", "It translates PAT mappings"],
answer: 1,
explain: "The resolver is the DNS client that asks DNS servers to resolve names.",
tags: ["dns", "resolver"]
},
{
type: "tf",
q: "The primary and secondary DNS servers configured on a client necessarily refer to the organization's primary and secondary authoritative servers.",
answer: false,
explain: "The chapter warns that client DNS settings typically point to caching or forwarding servers rather than authoritative primary and secondary servers.",
tags: ["dns", "authoritative"]
},
{
type: "mcq",
q: "What does an MX preference number tell a sending mail system?",
options: ["Higher numbers are preferred", "Lower numbers are preferred", "Numbers identify IP versions", "Numbers identify DNS classes", "Numbers identify TTL values"],
answer: 1,
explain: "For MX records in the chapter, lower preference numbers indicate higher priority.",
tags: ["dns", "mx"]
},
{
type: "mcq",
q: "Which command would you use first to inspect complete Windows IP and DNS configuration?",
options: ["ping", "ipconfig /all", "hostname", "nslookup", "route print"],
answer: 1,
explain: "`ipconfig /all` provides detailed Windows TCP/IP configuration including IP, DHCP, DNS, and MAC information.",
tags: ["windows", "ipconfig", "troubleshooting"]
},
{
type: "multi",
q: "Which symptoms point toward DNS rather than basic IP connectivity?",
options: [
"An IP address can be pinged",
"A hostname cannot be resolved",
"The default gateway cannot be pinged",
"A website name fails while its known IP works",
"The loopback address fails"
],
answer: [0, 1, 3],
explain: "Working IP connectivity combined with hostname or website-name failure points toward DNS/name resolution.",
tags: ["dns", "troubleshooting"]
},
{
type: "mcq",
q: "What is the best first interpretation of an APIPA address on a DHCP client?",
options: ["IPv6 routing succeeded", "DHCP address acquisition failed", "DNS is authoritative", "PAT is working", "The host has a static address"],
answer: 1,
explain: "An APIPA address commonly indicates the DHCP client could not obtain an address from a DHCP server.",
tags: ["apipa", "dhcp", "scenario"]
},
{
type: "mcq",
q: "Which technology should you consider when an internal web server must receive traffic sent to a public address?",
options: ["SNAT", "DNAT", "SLAAC", "PTR", "DAD"],
answer: 1,
explain: "DNAT changes the destination address of incoming traffic and is commonly used for port forwarding to internal servers.",
tags: ["dnat", "nat", "scenario"]
},
{
type: "mcq",
q: "Which technology should you consider when private clients initiate Internet connections through a public gateway address?",
options: ["DNAT", "SNAT", "PTR", "CNAME", "DAD"],
answer: 1,
explain: "SNAT changes the source IP of outgoing traffic, commonly replacing a private source with a public one.",
tags: ["snat", "nat", "scenario"]
},
{
type: "mcq",
q: "A connection is shown as `208.85.40.44:443`. Which service is indicated by the port?",
options: ["HTTP", "HTTPS", "SSH", "DNS", "RDP"],
answer: 1,
explain: "Port 443 identifies HTTPS in the chapter's port table.",
tags: ["socket", "https"]
},
{
type: "mcq",
q: "Which tool provides more detailed DNS response information than `nslookup` according to the notes?",
options: ["ping", "dig", "route", "hostname", "ipconfig"],
answer: 1,
explain: "The chapter describes `dig` as especially useful for detailed DNS troubleshooting and analysis.",
tags: ["dns", "dig"]
},
{
type: "mcq",
q: "Which IPv6 approach is appropriate when a device must support IPv4 and IPv6 at the same time?",
options: ["Tunneling", "NAT64", "Dual stack", "PAT", "PTR"],
answer: 2,
explain: "Dual stack configures both IPv4 and IPv6 on the device or network.",
tags: ["ipv6", "dual-stack", "scenario"]
},
{
type: "mcq",
q: "Which IPv6 method is used when IPv6 traffic must cross an IPv4 network?",
options: ["Dual stack", "Tunneling", "NAT64", "PAT", "SLAAC"],
answer: 1,
explain: "Tunneling can encapsulate IPv6 traffic so it can travel across an IPv4 network.",
tags: ["ipv6", "tunneling", "scenario"]
},
{
type: "mcq",
q: "Which IPv6 mechanism can provide an address without a DHCPv6 server?",
options: ["SLAAC", "PAT", "NAT64", "PTR", "SMB"],
answer: 0,
explain: "SLAAC provides stateless IPv6 autoconfiguration without assistance from DHCPv6.",
tags: ["ipv6", "slaac"]
},
{
type: "mcq",
q: "A host has the correct IP but still cannot reach remote networks. Which setting is most directly associated with reaching other networks?",
options: ["MAC address", "Default gateway", "Hostname", "OUI", "Local port"],
answer: 1,
explain: "The default gateway provides the path to resources outside the local network.",
tags: ["gateway", "routing", "scenario"]
},
{
type: "tf",
q: "A switch learns destination MAC addresses from the destination field of every arriving frame.",
answer: false,
explain: "The chapter states that switches learn source MAC addresses as frames arrive and use destination MACs for forwarding decisions.",
tags: ["switching", "mac"]
},
{
type: "mcq",
q: "Which statement best summarizes the distinction between a switch and a router in this chapter?",
options: ["Switches use IP; routers use MAC", "Switches use MAC locally; routers use IP across networks", "Both use only ports", "Routers use DNS; switches use DHCP", "Both use only FQDNs"],
answer: 1,
explain: "Switches use MAC addresses to identify devices within the LAN, while routers use IP addresses to locate devices across networks.",
tags: ["switching", "routing", "addressing"]
},
{
type: "match",
q: "Match each command to its primary troubleshooting purpose.",
pairs: [
{ item: "`ipconfig /all`", match: "Display detailed Windows TCP/IP configuration" },
{ item: "`ipconfig /release`", match: "Release a DHCP address" },
{ item: "`ipconfig /renew`", match: "Request renewed DHCP configuration" },
{ item: "`ipconfig /displaydns`", match: "Display the DNS cache" },
{ item: "`ipconfig /flushdns`", match: "Clear the DNS cache" }
],
explain: "These Windows commands are explicitly tied to the listed troubleshooting functions.",
tags: ["windows", "ipconfig", "troubleshooting"]
},
{
type: "multi",
q: "Which statements are correct about DNS record directionality and purpose?",
options: [
"A maps hostname to IPv4",
"AAAA maps hostname to IPv6",
"PTR maps IP to hostname",
"MX identifies mail servers",
"CNAME maps an IP directly to a hostname"
],
answer: [0, 1, 2, 3],
explain: "The chapter defines A, AAAA, PTR, and MX with these purposes; CNAME maps an alias to a canonical hostname instead.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "Which statement best describes the chapter's end-to-end troubleshooting philosophy?",
options: ["Assume the visible application symptom is the cause", "Start with lower-level connectivity and progress upward", "Start with DNS for every failure", "Start with application ports only", "Ignore routing until the end"],
answer: 1,
explain: "The chapter stresses moving from local addressing and routing to DNS and then application/service details rather than assuming the symptom identifies the cause.",
tags: ["troubleshooting", "workflow"]
}
]
});
