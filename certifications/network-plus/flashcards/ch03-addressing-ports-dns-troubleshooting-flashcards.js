window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
front: "Which OSI layer uses MAC addresses?",
back: "The Data Link layer, Layer 2, uses MAC addresses to identify NICs and devices on the local network.",
tags: ["network-plus", "mac", "osi"]
},
{
front: "What does an IP address identify?",
back: "An IP address is a logical Layer 3 address used to identify a node or interface and support communication across networks.",
tags: ["network-plus", "ip", "osi"]
},
{
front: "What does a port identify?",
back: "A port identifies a process or application/service running on a host at the Transport layer.",
tags: ["network-plus", "ports", "transport"]
},
{
front: "What does an FQDN provide?",
back: "An FQDN provides a human-readable way to identify a host or domain at the Application layer.",
tags: ["network-plus", "dns", "fqdn"]
},
{
front: "What is the mental model for MAC, IP, port, and FQDN?",
back: "MAC identifies the local interface, IP identifies the host or network location, the port identifies the process, and the FQDN identifies the host by name.",
tags: ["network-plus", "addressing", "osi"]
},
{
front: "How long is a MAC address?",
back: "A MAC address is 48 bits long.",
tags: ["network-plus", "mac", "addressing"]
},
{
front: "How is a MAC address normally written?",
back: "It is normally written as 12 hexadecimal characters, usually displayed as six hexadecimal groups separated by colons.",
tags: ["network-plus", "mac", "hexadecimal"]
},
{
front: "What is the purpose of the OUI in a MAC address?",
back: "The OUI, or Organizationally Unique Identifier, is the first 24 bits and identifies the NIC manufacturer.",
tags: ["network-plus", "mac", "oui"]
},
{
front: "What does the second 24-bit portion of a MAC address identify?",
back: "The extension identifier or device ID identifies the individual device or NIC.",
tags: ["network-plus", "mac", "oui"]
},
{
front: "What numbering system is used to write MAC addresses?",
back: "MAC addresses are written in hexadecimal, which is base 16.",
tags: ["network-plus", "mac", "hexadecimal"]
},
{
front: "How does a Layer 2 switch learn a MAC address?",
back: "It learns the source MAC address of an arriving frame and associates that MAC address with the switch port where the frame was received.",
tags: ["network-plus", "switching", "mac"]
},
{
front: "How does a switch use its MAC address table?",
back: "It checks the destination MAC address against the table and forwards the frame toward the port associated with that address.",
tags: ["network-plus", "switching", "mac-table"]
},
{
front: "What does `show mac-address-table` display on a Cisco switch?",
back: "It displays the switch's MAC address table, including VLAN, MAC address, type, and associated switch port.",
tags: ["network-plus", "cisco", "mac-table"]
},
{
front: "Which Windows command displays a computer's MAC address?",
back: "`ipconfig /all` displays the MAC address along with detailed TCP/IP configuration information.",
tags: ["network-plus", "windows", "ipconfig"]
},
{
front: "How can Wireshark help identify a NIC manufacturer?",
back: "Capture traffic, inspect a relevant MAC address, examine its first three bytes, and use an OUI lookup to identify the manufacturer.",
tags: ["network-plus", "wireshark", "oui"]
},
{
front: "What is the primary purpose of a subnet mask?",
back: "A subnet mask determines which portion of an IPv4 address represents the network and which portion represents the host.",
tags: ["network-plus", "ipv4", "subnetting"]
},
{
front: "What are the four TCP/IP settings emphasized for a host?",
back: "IP address, subnet mask, default gateway, and DNS server address.",
tags: ["network-plus", "tcp-ip", "configuration"]
},
{
front: "What does the default gateway provide?",
back: "It provides a path to resources outside the local network when no more specific route is available.",
tags: ["network-plus", "routing", "gateway"]
},
{
front: "What is the role of a DNS server address in host configuration?",
back: "It identifies the server the host uses for name resolution.",
tags: ["network-plus", "dns", "configuration"]
},
{
front: "How can Windows and Linux display detailed network configuration?",
back: "Windows uses `ipconfig /all`; the chapter lists Linux `nmcli device show` for detailed device information.",
tags: ["network-plus", "windows", "linux"]
},
{
front: "How many bits are in an IPv4 address?",
back: "IPv4 addresses are 32 bits long.",
tags: ["network-plus", "ipv4", "addressing"]
},
{
front: "How many octets does an IPv4 address contain?",
back: "An IPv4 address contains four 8-bit octets.",
tags: ["network-plus", "ipv4", "addressing"]
},
{
front: "What is the decimal range of an IPv4 octet?",
back: "Each octet ranges from 0 through 255 because it contains 8 bits.",
tags: ["network-plus", "ipv4", "binary"]
},
{
front: "What decimal value is binary `11111111`?",
back: "It is 255.",
tags: ["network-plus", "ipv4", "binary"]
},
{
front: "What is the largest possible IPv4 address?",
back: "The largest possible dotted-decimal IPv4 address is `255.255.255.255`.",
tags: ["network-plus", "ipv4", "addressing"]
},
{
front: "Approximately how many IPv4 addresses are possible?",
back: "There are approximately 4.3 billion possible IPv4 addresses, although some are reserved for special purposes.",
tags: ["network-plus", "ipv4", "address-space"]
},
{
front: "What is classless addressing?",
back: "Classless addressing allows the network/host boundary to be placed anywhere within the 32 bits of an IPv4 address, enabling different network sizes through subnetting.",
tags: ["network-plus", "cidr", "ipv4"]
},
{
front: "What is CIDR notation?",
back: "CIDR, or Classless Inter-Domain Routing, uses a slash followed by the number of network bits to identify the network portion of an IP address.",
tags: ["network-plus", "cidr", "ipv4"]
},
{
front: "What does `/24` mean in IPv4 CIDR notation?",
back: "The first 24 bits are the network portion and the remaining 8 bits are the host portion.",
tags: ["network-plus", "cidr", "subnetting"]
},
{
front: "Why can you not determine the network and host portions from an IPv4 address alone in classless addressing?",
back: "You must know the subnet mask or CIDR prefix because the network/host boundary is not implied by the address class.",
tags: ["network-plus", "cidr", "subnetting"]
},
{
front: "What is the private IPv4 range for Class A?",
back: "`10.0.0.0` through `10.255.255.255` is a private IPv4 range defined by RFC 1918.",
tags: ["network-plus", "ipv4", "private-addressing"]
},
{
front: "What is the private IPv4 range for Class B?",
back: "`172.16.0.0` through `172.31.255.255` is the private Class B range.",
tags: ["network-plus", "ipv4", "private-addressing"]
},
{
front: "What is the private IPv4 range for Class C?",
back: "`192.168.0.0` through `192.168.255.255` is the private Class C range.",
tags: ["network-plus", "ipv4", "private-addressing"]
},
{
front: "Which RFC defined the private IPv4 address ranges discussed in the chapter?",
back: "RFC 1918 defined the private IPv4 ranges `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`.",
tags: ["network-plus", "rfc1918", "ipv4"]
},
{
front: "What does `255.255.255.255` represent?",
back: "It is the IPv4 limited broadcast address used to send a message to every device on the local broadcast domain.",
tags: ["network-plus", "ipv4", "broadcast"]
},
{
front: "Do routers forward IPv4 broadcasts?",
back: "No. Routers do not forward broadcasts, creating logical boundaries between broadcast domains.",
tags: ["network-plus", "routing", "broadcast"]
},
{
front: "What does `0.0.0.0` represent?",
back: "It represents an unspecified or unassigned IPv4 address.",
tags: ["network-plus", "ipv4", "reserved"]
},
{
front: "What is the IPv4 loopback range?",
back: "The chapter identifies `127.0.0.1` through `127.255.255.254` as loopback addresses.",
tags: ["network-plus", "ipv4", "loopback"]
},
{
front: "What is `127.0.0.1` commonly called?",
back: "`127.0.0.1` is the commonly used IPv4 localhost address and tests the computer's own TCP/IP stack.",
tags: ["network-plus", "loopback", "troubleshooting"]
},
{
front: "What does an APIPA address indicate?",
back: "An address in the `169.254.x.x` range usually indicates that a DHCP client failed to obtain an address from a DHCP server.",
tags: ["network-plus", "apipa", "dhcp"]
},
{
front: "What is the APIPA address range emphasized by the chapter?",
back: "`169.254.0.1` through `169.254.255.254` is the APIPA range given in the chapter.",
tags: ["network-plus", "apipa", "ipv4"]
},
{
front: "What is the difference between a static and dynamic IP address?",
back: "A static IP address is manually assigned and remains until changed; a dynamic IP address is obtained from DHCP.",
tags: ["network-plus", "ipv4", "dhcp"]
},
{
front: "What does a DHCP scope or pool define?",
back: "It defines the range of IP addresses available for assignment to DHCP clients.",
tags: ["network-plus", "dhcp", "scope"]
},
{
front: "What does a DHCP lease time control?",
back: "It controls how long a client can use its assigned IP address before it must renew the lease.",
tags: ["network-plus", "dhcp", "lease"]
},
{
front: "What can happen if a DHCP lease is too long?",
back: "Addresses can remain leased to inactive clients longer than necessary, contributing to DHCP scope exhaustion.",
tags: ["network-plus", "dhcp", "lease"]
},
{
front: "What can happen if a DHCP lease is too short?",
back: "Clients must renew more frequently, increasing DHCP traffic and potentially causing disruptions.",
tags: ["network-plus", "dhcp", "lease"]
},
{
front: "What is DHCP scope exhaustion?",
back: "It occurs when all addresses in the DHCP scope are leased, preventing new clients from obtaining an IP address.",
tags: ["network-plus", "dhcp", "troubleshooting"]
},
{
front: "How does a DHCP reservation identify the client?",
back: "The DHCP server uses the client's MAC address to associate the device with a reserved IP address.",
tags: ["network-plus", "dhcp", "mac"]
},
{
front: "Where is a DHCP reservation configured?",
back: "It is configured on the DHCP server, which then assigns the reserved address to the matching device.",
tags: ["network-plus", "dhcp", "reservation"]
},
{
front: "Where is a static IP address configured?",
back: "A static IP address is manually configured directly on the client device.",
tags: ["network-plus", "ipv4", "static"]
},
{
front: "Why should static IP addresses be excluded from the DHCP pool?",
back: "Excluding them prevents the DHCP server from assigning the same address to another device and causing an IP conflict.",
tags: ["network-plus", "dhcp", "ip-conflict"]
},
{
front: "Why are DHCP reservations often preferred over static addresses?",
back: "They provide a consistent IP address while keeping address management centralized through DHCP.",
tags: ["network-plus", "dhcp", "reservation"]
},
{
front: "What is IPAM used for?",
back: "IP address management, or IPAM, is used to manage the allocation and organization of IP addresses across a network.",
tags: ["network-plus", "ipam", "addressing"]
},
{
front: "What does NAT do?",
back: "NAT allows a gateway device to translate private addressing to a public-facing address when private hosts communicate externally.",
tags: ["network-plus", "nat", "ipv4"]
},
{
front: "What two functions of NAT are emphasized in the chapter?",
back: "NAT reduces the number of public IPv4 addresses required and hides the private network behind the public-facing gateway address.",
tags: ["network-plus", "nat", "ipv4"]
},
{
front: "What does PAT add to NAT?",
back: "PAT uses transport-layer ports so multiple internal hosts can share one public IP address while remaining distinguishable through port mappings.",
tags: ["network-plus", "pat", "nat"]
},
{
front: "What does SNAT change?",
back: "SNAT changes the source IP address of outgoing traffic, commonly replacing a private source address with a public address.",
tags: ["network-plus", "snat", "nat"]
},
{
front: "What does DNAT change?",
back: "DNAT changes the destination IP address of incoming traffic, allowing external traffic to be directed to a specific internal host.",
tags: ["network-plus", "dnat", "nat"]
},
{
front: "What is a common use of DNAT?",
back: "DNAT is commonly used for port forwarding to internal web servers, email servers, and other services.",
tags: ["network-plus", "dnat", "port-forwarding"]
},
{
front: "What is the key distinction between SNAT and DNAT?",
back: "SNAT changes the source address for outgoing traffic; DNAT changes the destination address for incoming traffic.",
tags: ["network-plus", "nat", "address-translation"]
},
{
front: "How many bits are in an IPv6 address?",
back: "IPv6 addresses are 128 bits long.",
tags: ["network-plus", "ipv6", "addressing"]
},
{
front: "How is an IPv6 address written?",
back: "It is written as eight blocks of four hexadecimal digits separated by colons.",
tags: ["network-plus", "ipv6", "hexadecimal"]
},
{
front: "What is the size of each IPv6 block?",
back: "Each block is 16 bits long, represented by four hexadecimal digits.",
tags: ["network-plus", "ipv6", "addressing"]
},
{
front: "What are the two IPv6 shorthand rules?",
back: "Leading zeroes within a block can be omitted, and one contiguous run of zero-valued blocks can be compressed using `::`.",
tags: ["network-plus", "ipv6", "notation"]
},
{
front: "How many times may `::` be used in one IPv6 address?",
back: "The `::` compression shorthand should be used no more than once in a single IPv6 address.",
tags: ["network-plus", "ipv6", "notation"]
},
{
front: "What is the IPv6 interface ID?",
back: "The interface ID is the last 64 bits, or four blocks, of an IPv6 address and identifies the interface on the local link.",
tags: ["network-plus", "ipv6", "interface-id"]
},
{
front: "What is the IPv6 global unicast prefix emphasized by the chapter?",
back: "`2000::/3` is the global unicast prefix identified by the chapter and is routable on the Internet.",
tags: ["network-plus", "ipv6", "global-unicast"]
},
{
front: "What is the IPv6 link-local prefix?",
back: "`FE80::/10` is the link-local IPv6 space emphasized in the chapter.",
tags: ["network-plus", "ipv6", "link-local"]
},
{
front: "What is the IPv6 unique local prefix?",
back: "`FC00::/7` is used for private or internal IPv6 addressing.",
tags: ["network-plus", "ipv6", "unique-local"]
},
{
front: "What is the IPv6 loopback address?",
back: "`::1/128` is the IPv6 loopback address used for a host to communicate with and test itself.",
tags: ["network-plus", "ipv6", "loopback"]
},
{
front: "What is the IPv6 multicast prefix?",
back: "`FF00::/8` identifies IPv6 multicast addresses.",
tags: ["network-plus", "ipv6", "multicast"]
},
{
front: "What is IPv6 anycast?",
back: "Anycast allows multiple devices to share an address, with traffic routed to the closest destination according to routing.",
tags: ["network-plus", "ipv6", "anycast"]
},
{
front: "What is the difference between unicast and multicast?",
back: "Unicast sends from one sender to one destination; multicast sends from one sender to members of a targeted multicast group.",
tags: ["network-plus", "ipv6", "addressing"]
},
{
front: "How does IPv6 differ from IPv4 regarding broadcast?",
back: "IPv6 reduces reliance on IPv4-style broadcasting and uses multicast for many functions.",
tags: ["network-plus", "ipv6", "multicast"]
},
{
front: "What is SLAAC?",
back: "SLAAC, or Stateless Address Autoconfiguration, allows a computer to configure an IPv6 address without assistance from a DHCPv6 server.",
tags: ["network-plus", "ipv6", "slaac"]
},
{
front: "What prefix does SLAAC use to create a link-local IPv6 address?",
back: "The link-local prefix is `FE80::/64` in the SLAAC procedure described by the chapter.",
tags: ["network-plus", "slaac", "ipv6"]
},
{
front: "How can an IPv6 interface ID be generated during SLAAC?",
back: "The chapter identifies EUI-64, derived from the MAC address, and random or temporary identifiers used for better privacy.",
tags: ["network-plus", "slaac", "ipv6"]
},
{
front: "What does DAD do in IPv6 autoconfiguration?",
back: "Duplicate Address Detection checks whether the proposed IPv6 address is already in use before the address is accepted.",
tags: ["network-plus", "ipv6", "dad"]
},
{
front: "What happens if DAD receives a response?",
back: "If another device responds, the proposed address is considered duplicated and the device generates a different address.",
tags: ["network-plus", "ipv6", "dad"]
},
{
front: "What is the role of Router Solicitation in SLAAC?",
back: "The device sends an RS message to ask the router for network configuration information.",
tags: ["network-plus", "ipv6", "slaac"]
},
{
front: "What is the role of Router Advertisement in SLAAC?",
back: "The router sends an RA that can provide the network prefix, DNS server information, and other network configuration details.",
tags: ["network-plus", "ipv6", "slaac"]
},
{
front: "What are the three IPv4/IPv6 coexistence approaches in the chapter?",
back: "Dual stack, tunneling, and NAT64.",
tags: ["network-plus", "ipv6", "transition"]
},
{
front: "What is dual stack?",
back: "Dual stack means devices and networks support IPv4 and IPv6 simultaneously.",
tags: ["network-plus", "ipv6", "dual-stack"]
},
{
front: "What is IPv6 tunneling?",
back: "Tunneling encapsulates one IP version so it can travel across a network using another IP version, such as IPv6 across IPv4.",
tags: ["network-plus", "ipv6", "tunneling"]
},
{
front: "What does NAT64 provide?",
back: "NAT64 allows IPv4-only and IPv6-only devices to communicate by translating between IPv4 and IPv6 and maintaining translation records.",
tags: ["network-plus", "nat64", "ipv6"]
},
{
front: "What is the difference between a port and a socket?",
back: "A port identifies a process or service; a socket combines a host IP address with a TCP or UDP port.",
tags: ["network-plus", "ports", "socket"]
},
{
front: "How is a socket written?",
back: "A socket combines an IP address and TCP or UDP port separated by a colon, such as `208.85.40.44:443`.",
tags: ["network-plus", "socket", "ports"]
},
{
front: "What are the three port ranges?",
back: "0-1023 are well-known ports, 1024-49151 are registered ports, and 49152-65535 are dynamic/private ports.",
tags: ["network-plus", "ports", "ranges"]
},
{
front: "What is port 20 used for?",
back: "Port 20/TCP is used for FTP data transfer.",
tags: ["network-plus", "ports", "ftp"]
},
{
front: "What is port 21 used for?",
back: "Port 21/TCP is used for FTP control.",
tags: ["network-plus", "ports", "ftp"]
},
{
front: "What is port 22 used for?",
back: "Port 22/TCP is used by SSH and SFTP in the chapter's table.",
tags: ["network-plus", "ports", "ssh"]
},
{
front: "What protocol uses port 23?",
back: "Telnet uses port 23/TCP for unencrypted remote computer control.",
tags: ["network-plus", "ports", "telnet"]
},
{
front: "What protocol uses port 25?",
back: "SMTP uses port 25/TCP for outgoing email.",
tags: ["network-plus", "ports", "smtp"]
},
{
front: "What port and transports are associated with DNS?",
back: "DNS uses port 53 and the chapter lists both TCP and UDP; DNS communication is described as typically using UDP 53.",
tags: ["network-plus", "ports", "dns"]
},
{
front: "What are DHCP's client/server ports in the chapter?",
back: "DHCP uses UDP 67 for client-to-server messages and UDP 68 for server-to-client messages.",
tags: ["network-plus", "ports", "dhcp"]
},
{
front: "What is port 69 used for?",
back: "TFTP uses UDP port 69 for simple or trivial file transfer.",
tags: ["network-plus", "ports", "tftp"]
},
{
front: "What are the HTTP and HTTPS ports?",
back: "HTTP uses port 80; HTTPS uses port 443.",
tags: ["network-plus", "ports", "web"]
},
{
front: "What is the difference between HTTP 80 and HTTPS 443?",
back: "HTTP uses port 80, while HTTPS uses port 443 and secures HTTP with SSL/TLS.",
tags: ["network-plus", "ports", "https"]
},
{
front: "What ports are associated with POP3 and IMAP4?",
back: "POP3 uses 110/TCP and IMAP4 uses 143/TCP; their SSL variants are listed as 995 and 993 respectively.",
tags: ["network-plus", "ports", "email"]
},
{
front: "What is port 123 used for?",
back: "NTP uses UDP port 123 for network time synchronization.",
tags: ["network-plus", "ports", "ntp"]
},
{
front: "What ports are associated with SNMP in the chapter?",
back: "SNMP uses port 161 for manager-to-device messages and port 162 for responses or unsolicited information from the device to the manager.",
tags: ["network-plus", "ports", "snmp"]
},
{
front: "What ports are associated with LDAP and LDAPS?",
back: "LDAP uses 389; LDAPS uses 636.",
tags: ["network-plus", "ports", "ldap"]
},
{
front: "What port does SMB use?",
back: "SMB uses TCP port 445 for network file sharing.",
tags: ["network-plus", "ports", "smb"]
},
{
front: "What port does Syslog use in the chapter?",
back: "Syslog uses UDP port 514 for system event messages.",
tags: ["network-plus", "ports", "syslog"]
},
{
front: "What port is shown for Microsoft SQL Server?",
back: "Microsoft SQL Server connections are shown on TCP port 1433.",
tags: ["network-plus", "ports", "sql-server"]
},
{
front: "What port does RDP use?",
back: "RDP uses TCP port 3389 for encrypted remote Windows control.",
tags: ["network-plus", "ports", "rdp"]
},
{
front: "What ports does SIP use in the chapter?",
back: "SIP uses UDP 5060 for unencrypted multimedia-session connections and UDP 5061 for encrypted multimedia-session connections.",
tags: ["network-plus", "ports", "sip"]
},
{
front: "What is the difference between NTP and PTP?",
back: "NTP provides general network time synchronization with lower cost and complexity; PTP provides much greater accuracy using hardware-based timekeeping and specialized hardware.",
tags: ["network-plus", "time-sync", "ntp"]
},
{
front: "What is NTP stratum 1?",
back: "Stratum 1 servers communicate directly with a primary time source such as GPS or Galileo.",
tags: ["network-plus", "ntp", "time-sync"]
},
{
front: "What happens to the NTP stratum number at each hop?",
back: "Each hop increases the stratum number by 1, up to 16.",
tags: ["network-plus", "ntp", "time-sync"]
},
{
front: "What is DNS's primary function?",
back: "DNS performs name resolution by converting human-readable domain names or FQDNs into IP addresses so hosts can be located.",
tags: ["network-plus", "dns", "name-resolution"]
},
{
front: "What is an FQDN?",
back: "An FQDN, or Fully Qualified Domain Name, is the complete, properly formatted host/domain name.",
tags: ["network-plus", "dns", "fqdn"]
},
{
front: "What are the conceptual parts of `www.cengage.com`?",
back: "`www` is the host name, `cengage` is the domain name, and `.com` is the top-level domain.",
tags: ["network-plus", "dns", "fqdn"]
},
{
front: "What is the difference between an FQDN and a URL?",
back: "An FQDN identifies a host or domain, while a URL locates a specific resource and usually includes a protocol and may include a path.",
tags: ["network-plus", "dns", "url"]
},
{
front: "What is a TLD?",
back: "A TLD, or Top-Level Domain, is the last part of a domain name, such as `.com`, `.edu`, or `.org`.",
tags: ["network-plus", "dns", "tld"]
},
{
front: "Which TLDs are described as generally open for registration?",
back: "The chapter identifies `.com`, `.org`, and `.net` as generally having no restrictions on who can register them.",
tags: ["network-plus", "dns", "tld"]
},
{
front: "What is the hosts file used for name resolution?",
back: "It is a local text file containing manually configured mappings between hostnames or FQDNs and IP addresses.",
tags: ["network-plus", "dns", "hosts-file"]
},
{
front: "What are the three main DNS roles defined in the resolver/server model?",
back: "The namespace is the collection of DNS information, the DNS server stores records and provides resolution information, and the resolver is the client that sends DNS requests.",
tags: ["network-plus", "dns", "resolver"]
},
{
front: "What does a primary DNS server do?",
back: "It is the authoritative name server that stores the authoritative DNS database for an organization's zones and handles queries for those domains.",
tags: ["network-plus", "dns", "authoritative"]
},
{
front: "What does a secondary DNS server do?",
back: "It acts as a backup authoritative server and updates its DNS database from the primary through a zone transfer.",
tags: ["network-plus", "dns", "secondary"]
},
{
front: "What is a caching DNS server?",
back: "It caches DNS information it obtains, answers local client queries from cache when possible, and otherwise resolves them through other DNS servers.",
tags: ["network-plus", "dns", "caching"]
},
{
front: "What is a forwarding DNS server?",
back: "It receives queries from local clients and forwards unresolved requests to another DNS server, while maintaining a cache.",
tags: ["network-plus", "dns", "forwarding"]
},
{
front: "Are client-configured primary and secondary DNS servers the same as an organization's primary and secondary authoritative servers?",
back: "No. On a client, those settings typically refer to the network's caching or forwarding DNS servers, not the organization's authoritative primary and secondary servers.",
tags: ["network-plus", "dns", "authoritative"]
},
{
front: "What is the DNS hierarchy described in the chapter?",
back: "The hierarchy is root DNS servers, then TLD DNS servers, then authoritative DNS servers.",
tags: ["network-plus", "dns", "hierarchy"]
},
{
front: "What do root DNS servers provide?",
back: "They provide information used to locate the appropriate Top-Level Domain servers.",
tags: ["network-plus", "dns", "root"]
},
{
front: "What do TLD DNS servers provide?",
back: "They provide information about how to locate the authoritative name servers for organizations under the relevant TLD.",
tags: ["network-plus", "dns", "tld"]
},
{
front: "What does an authoritative DNS server store?",
back: "It stores authoritative DNS records for an organization's domains and zones.",
tags: ["network-plus", "dns", "authoritative"]
},
{
front: "What is the normal high-level DNS lookup sequence?",
back: "A resolver may query the root, then the relevant TLD server, then the authoritative server to obtain the requested address information.",
tags: ["network-plus", "dns", "resolution"]
},
{
front: "What is a recursive DNS lookup?",
back: "In a recursive lookup, the requesting client expects the DNS server to return a final answer or indicate that the name cannot be resolved; the server performs additional queries as needed.",
tags: ["network-plus", "dns", "recursive"]
},
{
front: "What is an iterative DNS lookup?",
back: "In an iterative lookup, the receiving DNS server does not have to find the complete answer; it returns what it knows, such as a referral, and the requesting server continues the search.",
tags: ["network-plus", "dns", "iterative"]
},
{
front: "What is the key difference between recursive and iterative DNS lookups?",
back: "Recursive resolution requires the receiving server to obtain the final answer; iterative resolution allows the receiving server to return information or a referral without completing the search.",
tags: ["network-plus", "dns", "recursive"]
},
{
front: "What is a DNS zone file?",
back: "A zone file is a text file containing DNS resource records for a zone.",
tags: ["network-plus", "dns", "zone"]
},
{
front: "What four fields are identified in a DNS resource record?",
back: "Name, class, type, and data.",
tags: ["network-plus", "dns", "records"]
},
{
front: "What does an A record do?",
back: "An A record maps a hostname or FQDN to an IPv4 address.",
tags: ["network-plus", "dns", "a-record"]
},
{
front: "What does an AAAA record do?",
back: "An AAAA record maps a hostname or FQDN to an IPv6 address.",
tags: ["network-plus", "dns", "aaaa-record"]
},
{
front: "What does a CNAME record do?",
back: "A CNAME maps an alias to a canonical hostname, allowing multiple names to point to the same host.",
tags: ["network-plus", "dns", "cname"]
},
{
front: "What does an MX record identify?",
back: "An MX record identifies the mail server or servers responsible for email for a domain.",
tags: ["network-plus", "dns", "mx"]
},
{
front: "How are multiple MX records prioritized?",
back: "Lower preference numbers indicate higher priority for mail delivery.",
tags: ["network-plus", "dns", "mx"]
},
{
front: "What does an NS record identify?",
back: "An NS record identifies the authoritative name servers for a domain or zone and supports delegation.",
tags: ["network-plus", "dns", "ns"]
},
{
front: "What does a PTR record do?",
back: "A PTR record supports reverse DNS by mapping an IP address to a hostname.",
tags: ["network-plus", "dns", "ptr"]
},
{
front: "How is an IPv4 reverse DNS name constructed?",
back: "The IPv4 address is written in reverse order and appended with `.in-addr.arpa`, such as `1.2.3.4` becoming `4.3.2.1.in-addr.arpa`.",
tags: ["network-plus", "dns", "reverse-dns"]
},
{
front: "What does an SOA record contain?",
back: "An SOA, or Start of Authority, record contains important zone and administrative information such as contact information, serial number, refresh timing, and zone-transfer information.",
tags: ["network-plus", "dns", "soa"]
},
{
front: "What is a TXT record commonly used for?",
back: "A TXT record stores free-form text and is commonly used for SPF, DKIM, DMARC, and other domain verification or email security information.",
tags: ["network-plus", "dns", "txt"]
},
{
front: "What does SPF specify?",
back: "SPF specifies which mail servers are authorized to send email for a domain.",
tags: ["network-plus", "dns", "spf"]
},
{
front: "What does DKIM provide?",
back: "DKIM helps verify that an email was authorized by the domain and was not altered by using a digital signature on outgoing mail.",
tags: ["network-plus", "dns", "dkim"]
},
{
front: "What does DMARC do?",
back: "DMARC tells receiving mail servers how to handle messages that fail SPF or DKIM checks and can provide reporting.",
tags: ["network-plus", "dns", "dmarc"]
},
{
front: "What does TTL control in DNS?",
back: "TTL controls how long DNS information remains valid in caches before it must be requested again.",
tags: ["network-plus", "dns", "ttl"]
},
{
front: "What protocol does `ping` use?",
back: "`ping` uses ICMP for IPv4 connectivity tests.",
tags: ["network-plus", "troubleshooting", "icmp"]
},
{
front: "What does `ping 127.0.0.1` test?",
back: "It tests the local TCP/IP stack using the loopback address.",
tags: ["network-plus", "ping", "loopback"]
},
{
front: "What does `ping` to the default gateway test?",
back: "It tests connectivity from the local host to the default gateway and helps evaluate local network reachability.",
tags: ["network-plus", "ping", "gateway"]
},
{
front: "What does `ping 8.8.8.8` test that `ping google.com` does not?",
back: "`ping 8.8.8.8` tests Internet connectivity without requiring DNS name resolution; pinging `google.com` also tests name resolution.",
tags: ["network-plus", "ping", "dns"]
},
{
front: "What does `ping -a 8.8.8.8` attempt to do on Windows?",
back: "It attempts reverse name resolution and displays the hostname associated with the IP address.",
tags: ["network-plus", "ping", "reverse-dns"]
},
{
front: "What does `ping -t` do on Windows?",
back: "It continuously sends echo requests until interrupted.",
tags: ["network-plus", "ping", "windows"]
},
{
front: "How do you stop a continuous ping?",
back: "Press `Ctrl + C`.",
tags: ["network-plus", "ping", "troubleshooting"]
},
{
front: "What does `ping -n 2` do on Windows?",
back: "It sends two ICMP echo requests.",
tags: ["network-plus", "ping", "windows"]
},
{
front: "What does `ping -c 2` do on Linux?",
back: "It sends two echo requests.",
tags: ["network-plus", "ping", "linux"]
},
{
front: "What protocol does IPv6 ping use?",
back: "IPv6 ping uses ICMPv6.",
tags: ["network-plus", "ipv6", "icmpv6"]
},
{
front: "How do you ping an IPv6 address on Linux?",
back: "The chapter shows `ping6 <IPv6 address>`.",
tags: ["network-plus", "ipv6", "linux"]
},
{
front: "How do you ping an IPv6 address on Windows?",
back: "The chapter shows `ping -6 <IPv6 address>`.",
tags: ["network-plus", "ipv6", "windows"]
},
{
front: "What does `ipconfig /all` display?",
back: "It displays detailed Windows TCP/IP configuration, including IP addressing, DHCP information, DNS servers, and the NIC's MAC address.",
tags: ["network-plus", "windows", "ipconfig"]
},
{
front: "What does `route print` show on Windows?",
back: "It displays the routing table and shows how traffic is routed to different networks.",
tags: ["network-plus", "routing", "windows"]
},
{
front: "What does `ip route` show on Linux?",
back: "It displays the Linux routing table.",
tags: ["network-plus", "routing", "linux"]
},
{
front: "What does `ipconfig /release` do?",
back: "It releases the active DHCP lease for the Windows interface.",
tags: ["network-plus", "dhcp", "windows"]
},
{
front: "What does `ipconfig /renew` do?",
back: "It requests renewed network configuration from DHCP.",
tags: ["network-plus", "dhcp", "windows"]
},
{
front: "What does `ipconfig /displaydns` do?",
back: "It displays the local DNS resolver cache.",
tags: ["network-plus", "dns", "windows"]
},
{
front: "What does `ipconfig /flushdns` do?",
back: "It clears the local DNS resolver cache.",
tags: ["network-plus", "dns", "windows"]
},
{
front: "What is the modern Linux/UNIX interface-management utility emphasized in the chapter?",
back: "The `ip` utility is emphasized as the modern interface and IP configuration tool.",
tags: ["network-plus", "linux", "ip"]
},
{
front: "What is the status of `ifconfig` on many Linux distributions?",
back: "`ifconfig` is deprecated in many Linux distributions, including Ubuntu.",
tags: ["network-plus", "linux", "ifconfig"]
},
{
front: "What does the `hostname` command provide?",
back: "It provides basic host-name information; on UNIX/Linux it can also offer options for changing the computer's name.",
tags: ["network-plus", "hostname", "troubleshooting"]
},
{
front: "What is `nslookup` used for?",
back: "`nslookup` queries DNS information, including forward lookups, reverse lookups, specific record types, and queries against a specified DNS server.",
tags: ["network-plus", "dns", "nslookup"]
},
{
front: "What is the difference between interactive and noninteractive `nslookup`?",
back: "Noninteractive mode performs a single DNS query; interactive mode supports multiple queries and testing different DNS servers.",
tags: ["network-plus", "dns", "nslookup"]
},
{
front: "What is `dig` especially useful for?",
back: "`dig` performs DNS queries and provides more detailed DNS information, making it especially useful for troubleshooting and analyzing DNS responses.",
tags: ["network-plus", "dns", "dig"]
},
{
front: "How do you query MX records with `nslookup`?",
back: "Use `nslookup -type=MX example.com` to query the domain's MX records.",
tags: ["network-plus", "dns", "nslookup"]
},
{
front: "How do you query MX records with `dig`?",
back: "Use `dig example.com MX`.",
tags: ["network-plus", "dns", "dig"]
},
{
front: "How do you perform a reverse DNS lookup with `nslookup`?",
back: "Query the IP address directly, such as `nslookup 8.8.8.8`.",
tags: ["network-plus", "dns", "nslookup"]
},
{
front: "How do you perform a reverse DNS lookup with `dig`?",
back: "Use `dig -x 8.8.8.8`.",
tags: ["network-plus", "dns", "dig"]
},
{
front: "How do you query a specific DNS server with `nslookup`?",
back: "Use a command such as `nslookup example.com 8.8.8.8` to send the query to the specified DNS server.",
tags: ["network-plus", "dns", "nslookup"]
},
{
front: "How do you query a specific DNS server with `dig`?",
back: "Use a command such as `dig @8.8.8.8 example.com`.",
tags: ["network-plus", "dns", "dig"]
},
{
front: "What is Event Viewer used for in Windows troubleshooting?",
back: "Event Viewer displays detailed system and application events, helping identify what went wrong and when; it can also expose automated responses and time-synchronization errors.",
tags: ["network-plus", "windows", "event-viewer"]
},
{
front: "How do you open Event Viewer from Run?",
back: "Press `Win + R`, enter `eventvwr.msc`, and press Enter.",
tags: ["network-plus", "windows", "event-viewer"]
},
{
front: "What does one computer with incorrect time after power-on suggest?",
back: "A consistently wrong time on a single computer suggests a dead CMOS battery.",
tags: ["network-plus", "ntp", "troubleshooting"]
},
{
front: "What should you suspect when multiple domain devices have the wrong time?",
back: "Check the NTP time source and synchronization configuration.",
tags: ["network-plus", "ntp", "troubleshooting"]
},
{
front: "Which UDP port must be allowed for NTP?",
back: "UDP port 123 must be allowed through relevant firewalls.",
tags: ["network-plus", "ntp", "ports"]
},
{
front: "What command shows the current Windows NTP source?",
back: "`w32tm /query /source` shows the NTP or time source currently being used.",
tags: ["network-plus", "ntp", "windows"]
},
{
front: "What are the key steps when troubleshooting a wrong NTP time source?",
back: "Verify UDP 123 is allowed, confirm a valid NTP server is configured, and try a different NTP server if the current one is slow or unreachable.",
tags: ["network-plus", "ntp", "troubleshooting"]
},
{
front: "What is the recommended troubleshooting order for addressing problems?",
back: "Work from IP configuration to subnet mask, then default gateway, then DNS, moving from lower-level connectivity toward name resolution and application details.",
tags: ["network-plus", "troubleshooting", "workflow"]
},
{
front: "What does it suggest when a host can ping an IP address but not a hostname?",
back: "It points toward a DNS or name-resolution problem.",
tags: ["network-plus", "troubleshooting", "dns"]
},
{
front: "What does a missing default route cause in a DNS troubleshooting scenario?",
back: "The host may be unable to reach external DNS infrastructure even though the local DNS configuration appears correct.",
tags: ["network-plus", "routing", "dns"]
},
{
front: "What should you check when local devices are reachable but the Internet is not?",
back: "Check the subnet configuration and then the default gateway or route before blaming DNS or the application.",
tags: ["network-plus", "routing", "troubleshooting"]
},
{
front: "What can an incorrect subnet mask cause?",
back: "It can cause limited or failed communication because the device may incorrectly determine which hosts are local and which are on another network.",
tags: ["network-plus", "subnetting", "troubleshooting"]
},
{
front: "What can an incorrect default gateway cause?",
back: "Local communication may still work, but access to other networks or the Internet can fail.",
tags: ["network-plus", "gateway", "troubleshooting"]
},
{
front: "What can an incorrect DNS configuration cause?",
back: "A device may be able to ping an IP address but fail to reach a hostname or website because names cannot be resolved.",
tags: ["network-plus", "dns", "troubleshooting"]
},
{
front: "What is the diagnostic value of `ping 8.8.8.8` succeeding while `ping google.com` fails?",
back: "IP connectivity works, but DNS name resolution is likely failing.",
tags: ["network-plus", "ping", "dns"]
},
{
front: "What should you do when static IP configuration is suspected to be wrong?",
back: "Verify the IP address, subnet mask, gateway, and DNS settings, or temporarily switch the client to DHCP for comparison.",
tags: ["network-plus", "troubleshooting", "ipv4"]
},
{
front: "What should you do when DHCP configuration is suspected to be the problem?",
back: "Temporarily try static settings to determine whether DHCP is responsible for the connectivity issue.",
tags: ["network-plus", "dhcp", "troubleshooting"]
},
{
front: "What is the significance of `208.85.40.44:443`?",
back: "The IP address identifies the host and port 443 identifies the HTTPS service endpoint on that host.",
tags: ["network-plus", "socket", "https"]
},
{
front: "Which DNS record should you use for a hostname-to-IPv4 lookup?",
back: "Use an A record.",
tags: ["network-plus", "dns", "a-record"]
},
{
front: "Which DNS record should you use for a hostname-to-IPv6 lookup?",
back: "Use an AAAA record.",
tags: ["network-plus", "dns", "aaaa-record"]
},
{
front: "Which DNS record should you use for an IP-to-hostname lookup?",
back: "Use a PTR record through reverse DNS.",
tags: ["network-plus", "dns", "ptr"]
},
{
front: "Which DNS record identifies a domain's mail server?",
back: "Use an MX record.",
tags: ["network-plus", "dns", "mx"]
},
{
front: "Which DNS record maps an alias to a canonical hostname?",
back: "Use a CNAME record.",
tags: ["network-plus", "dns", "cname"]
},
{
front: "Which DNS record identifies authoritative name servers?",
back: "Use an NS record.",
tags: ["network-plus", "dns", "ns"]
},
{
front: "Which DNS record contains zone-authority and administrative information?",
back: "Use the SOA record.",
tags: ["network-plus", "dns", "soa"]
},
{
front: "Which DNS record commonly carries SPF, DKIM, and DMARC information?",
back: "TXT records commonly carry this email authentication and policy information.",
tags: ["network-plus", "dns", "txt"]
},
{
front: "Which secure email submission port is emphasized for SMTPS in the source?",
back: "The source lists SMTPS on TCP port 587.",
tags: ["network-plus", "ports", "smtp"]
},
{
front: "Which secure alternatives should you remember for Network+ from this chapter?",
back: "SSH/SFTP 22 versus Telnet 23, HTTPS 443 versus HTTP 80, LDAPS 636 versus LDAP 389, IMAP4 over SSL 993 versus IMAP4 143, POP3 over SSL 995 versus POP3 110, and SMTPS 587 versus SMTP 25.",
tags: ["network-plus", "ports", "secure-protocols"]
},
{
front: "What is the overall addressing troubleshooting flow taught by the chapter?",
back: "Start with local TCP/IP and interface configuration, test the gateway, test remote IP connectivity, test DNS name resolution, and finally inspect the application, port, and service.",
tags: ["network-plus", "troubleshooting", "workflow"]
},
{
front: "Why should an application-layer symptom not automatically be blamed on the application?",
back: "A higher-layer symptom can be caused by a lower-layer problem, such as a missing route, incorrect addressing, or failed DNS resolution.",
tags: ["network-plus", "troubleshooting", "osi"]
}
]
});
