window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 1: Introduction to Networking",
items: [
{
type: "mcq",
q: "A network diagram shows how software controls access to shared applications and databases. What type of topology is being described?",
options: ["Physical topology", "Logical topology", "Bus topology", "Star topology", "Hybrid topology"],
answer: 1,
explain: "Logical topology describes how software controls access to network resources and how those resources are shared.",
tags: ["network-plus", "topology", "network-models"]
},
{
type: "mcq",
q: "A small office has several computers that share files directly, with each computer controlling access to its own resources. Which model is in use?",
options: ["Client-server", "Hub-and-spoke", "Peer-to-peer", "Hybrid", "Domain-based"],
answer: 2,
explain: "In a P2P model, each computer's operating system controls access to its own resources without centralized control.",
tags: ["network-plus", "p2p", "network-models"]
},
{
type: "multi",
q: "Which two characteristics are advantages of a traditional peer-to-peer network?",
options: ["Simple to configure", "Centrally managed accounts", "Less expensive", "Highly scalable", "Centralized security"],
answer: [0, 2],
explain: "The chapter identifies simple configuration and lower setup and maintenance cost as P2P advantages.",
tags: ["network-plus", "p2p", "advantages"]
},
{
type: "multi",
q: "Which three characteristics describe traditional peer-to-peer networks in the chapter?",
options: ["Not scalable", "Not necessarily secure", "Practical for very large organizations", "Not practical for more than a few computers", "Centralized directory management"],
answer: [0, 1, 3],
explain: "Traditional P2P networks are not scalable, may lack strong security, and become impractical to manage as the number of computers grows.",
tags: ["network-plus", "p2p", "limitations"]
},
{
type: "mcq",
q: "Which network model normally requires a network operating system to control access to the entire network?",
options: ["Peer-to-peer", "Client-server", "Mesh", "Bus", "Star"],
answer: 1,
explain: "The client-server model typically requires a NOS that manages access to the network.",
tags: ["network-plus", "client-server", "nos"]
},
{
type: "mcq",
q: "Which technology provides centralized user account and security information for a Windows domain?",
options: ["RAID", "Active Directory", "SFTP", "SNMP", "DHCP"],
answer: 1,
explain: "Active Directory is the centralized directory database containing user account and security information for a Windows domain.",
tags: ["network-plus", "active-directory", "client-server"]
},

{
type: "mcq",
q: "A computer requests a resource from another computer. What is the requesting computer called?",
options: ["Server", "Gateway", "Client", "Node", "Backbone"],
answer: 2,
explain: "A computer making a request from another computer is called the client.",
tags: ["network-plus", "client-server", "terminology"]
},
{
type: "mcq",
q: "Which statement best describes resource access in a client-server network?",
options: ["Clients share resources directly with each other.", "Each client maintains the central directory.", "Access is controlled through centralized network resources.", "Only routers control access.", "No authentication is required."],
answer: 2,
explain: "Clients do not share resources directly; access is controlled through centralized directory information and servers.",
tags: ["network-plus", "client-server", "resource-access"]
},
{
type: "multi",
q: "Which two benefits are associated with client-server networks?",
options: ["Centralized account assignment", "No need for servers", "Centralized resource permissions", "Limited scalability", "Mandatory peer-to-peer sharing"],
answer: [0, 2],
explain: "Client-server networks centralize user accounts and allow shared resources to be centrally granted to users or groups.",
tags: ["network-plus", "client-server", "advantages"]
},
{
type: "mcq",
q: "An organization needs to add many users and devices while keeping account management centralized. Which model is more appropriate?",
options: ["Peer-to-peer", "Client-server", "Mesh-only", "Bus-only", "Ad hoc"],
answer: 1,
explain: "Client-server networks are more scalable because users, devices, and resources can be managed centrally.",
tags: ["network-plus", "scalability", "client-server"]
},

{
type: "mcq",
q: "Which interface is commonly used to manage routers and switches?",
options: ["GUI-only interface", "CLI", "POP3", "DBMS", "PDU"],
answer: 1,
explain: "Network devices such as routers and switches are typically managed through a CLI, or command-line interface.",
tags: ["network-plus", "cli", "network-management"]
},




{
type: "mcq",
q: "A browser requests a webpage from a server located on another network. What role does the browser's computer have?",
options: ["Router", "Server", "Client", "Backbone", "Gateway"],
answer: 2,
explain: "The computer making the request is the client, while the computer providing the webpage is the server.",
tags: ["network-plus", "client-server", "web"]
},

{
type: "mcq",
q: "A browser connection uses HTTP layered over TLS. What protocol name describes the resulting web service?",
options: ["FTPS", "SFTP", "HTTPS", "IMAP4", "Telnet"],
answer: 2,
explain: "HTTPS is HTTP layered over SSL or TLS encryption.",
tags: ["network-plus", "https", "tls"]
},





{
type: "mcq",
q: "Which software component is responsible for making requested database changes and organizing data for viewing, reporting, or exporting?",
options: ["DBMS", "NIC", "NOS", "DNS", "CLI"],
answer: 0,
explain: "A DBMS performs requested database changes and organizes data for viewing, reporting, or exporting.",
tags: ["network-plus", "dbms", "databases"]
},



{
type: "mcq",
q: "Which secure file-transfer option is based on SSH?",
options: ["FTPS", "SFTP", "POP3", "HTTPS", "SMTP"],
answer: 1,
explain: "SFTP is identified as an encrypted file-transfer protocol based on SSH.",
tags: ["network-plus", "sftp", "ssh"]
},
{
type: "mcq",
q: "A technician needs encrypted command-line remote access to a Linux system. Which protocol is the best match?",
options: ["Telnet", "SSH", "POP3", "FTP", "SMTP"],
answer: 1,
explain: "SSH creates an encrypted channel or tunnel and is used with the Linux ssh command.",
tags: ["network-plus", "ssh", "remote-access"]
},
{
type: "mcq",
q: "Why is Telnet considered less secure than SSH?",
options: ["Telnet uses only wireless links", "Telnet cannot access remote systems", "Telnet transmissions are not encrypted", "Telnet is limited to Windows", "Telnet requires SQL"],
answer: 2,
explain: "The chapter states that Telnet transmissions are not encrypted, which led to its replacement by more secure options such as SSH.",
tags: ["network-plus", "telnet", "ssh"]
},

{
type: "match",
q: "Match each network service protocol with its primary function.",
context: "Network service protocols",
pairs: [
{ item: "HTTP", match: "Web communication" },
{ item: "SMTP", match: "Sending email" },
{ item: "DNS", match: "Name resolution" },
{ item: "FTP", match: "File transfer" },
{ item: "SSH", match: "Encrypted remote access" }
],
explain: "The chapter associates HTTP with web services, SMTP with sending email, DNS with name resolution, FTP with file transfer, and SSH with encrypted remote access.",
tags: ["network-plus", "protocols", "services"]
},
{
type: "multi",
q: "Which two protocols are specifically identified as encryption protocols that can secure other TCP/IP traffic?",
options: ["SSL", "TLS", "SMTP", "POP3", "DNS"],
answer: [0, 1],
explain: "SSL and TLS are identified as encryption protocols that can add security to data transmitted by other TCP/IP protocols.",
tags: ["network-plus", "ssl", "tls"]
},

{
type: "mcq",
q: "Which web server application is embedded in Windows Server according to the chapter?",
options: ["Apache", "Nginx", "IIS", "MySQL", "Exchange"],
answer: 2,
explain: "IIS, or Internet Information Services, is embedded in the Windows Server operating system.",
tags: ["network-plus", "iis", "web"]
},

{
type: "mcq",
q: "Which topology connects each device to multiple other devices?",
options: ["Star", "Mesh", "Bus", "Hub-and-spoke", "Client-server"],
answer: 1,
explain: "A mesh topology connects each device to multiple other devices.",
tags: ["network-plus", "mesh", "topology"]
},
{
type: "mcq",
q: "What device replaced the traditional Ethernet hub as a more efficient central connection point?",
options: ["Router", "Switch", "NIC", "Firewall", "Server"],
answer: 1,
explain: "Switches replaced hubs because switches forward traffic only to its intended destination instead of broadcasting it to every connected device.",
tags: ["network-plus", "switch", "hub"]
},
{
type: "mcq",
q: "What does a traditional hub do with an incoming signal?",
options: ["Routes it between LANs", "Encrypts it", "Repeats it to all other connected devices", "Stores it in a database", "Sends it only to the destination port"],
answer: 2,
explain: "A hub repeats incoming signals to all other connected devices in a broadcast fashion.",
tags: ["network-plus", "hub", "legacy"]
},
{
type: "mcq",
q: "A network contains three switches linked in a line along a central conduit, with computers attached to each switch. How is the overall topology classified?",
options: ["Pure star", "Pure mesh", "Hybrid", "Pure ring", "Client-server"],
answer: 2,
explain: "The chapter's example combines a bus topology between switches with star topologies from each switch to its computers, making it hybrid.",
tags: ["network-plus", "hybrid-topology", "topology"]
},

{
type: "mcq",
q: "What is a backbone?",
options: ["A user account database", "A central conduit connecting network segments", "A type of email protocol", "A host-only device", "A physical layer PDU"],
answer: 1,
explain: "A backbone connects network segments and may use higher speeds or different cabling because of heavier traffic and longer distances.",
tags: ["network-plus", "backbone", "network-hardware"]
},
{
type: "mcq",
q: "A network port is embedded in a computer's motherboard. How is this port commonly described?",
options: ["Onboard network port", "WAN gateway", "Hub port", "SFTP port", "Domain port"],
answer: 0,
explain: "The chapter distinguishes onboard network ports embedded in the motherboard from modular NICs installed in expansion slots.",
tags: ["network-plus", "nic", "hardware"]
},
{
type: "mcq",
q: "What is another name for a network interface card?",
options: ["Backbone", "Network adapter", "Router", "Gateway", "Switch"],
answer: 1,
explain: "A NIC is also called a network adapter.",
tags: ["network-plus", "nic", "network-hardware"]
},
{
type: "mcq",
q: "A home network needs routing, local switching, and a Wi-Fi hotspot in one box. What type of device best matches the chapter's example?",
options: ["Combination device", "Hub only", "NIC only", "Layer 1 repeater", "Database server"],
answer: 0,
explain: "The source describes a home combination device that can include a router, switch, and wireless access point.",
tags: ["network-plus", "router", "soho"]
},
{
type: "mcq",
q: "Which statement correctly distinguishes a switch from a router?",
options: ["A switch belongs to multiple LANs; a router belongs to one.", "A switch routes between networks; a router only switches locally.", "A switch belongs to one LAN; a router belongs to two or more networks.", "Both always belong to exactly one LAN.", "Only switches can act as gateways."],
answer: 2,
explain: "The fundamental distinction in the chapter is that a switch belongs to a single LAN while a router belongs to two or more networks.",
tags: ["network-plus", "switch", "router"]
},
{
type: "mcq",
q: "A router connects three LANs. How many network addresses can the router have according to the chapter's example?",
options: ["One", "Two", "Three", "Four", "None"],
answer: 2,
explain: "The example states that the router has a network address belonging to each of the three networks it connects.",
tags: ["network-plus", "router", "addressing"]
},
{
type: "multi",
q: "Which two statements accurately describe a host?",
options: ["It is an endpoint device.", "It normally provides or accesses application or data resources.", "It must be a router.", "It cannot be a client.", "It is always an intermediary device."],
answer: [0, 1],
explain: "Hosts are endpoint devices that host or access resources such as applications or data.",
tags: ["network-plus", "host", "network-devices"]
},
{
type: "mcq",
q: "Which device is normally a node but not a host?",
options: ["File server", "Smartphone", "Network printer", "Router", "Client computer"],
answer: 3,
explain: "Routers and switches are nodes but normally do not host the application or data resources accessed by hosts.",
tags: ["network-plus", "host", "node"]
},
{
type: "mcq",
q: "What Cisco term corresponds to a host?",
options: ["Intermediary device", "End device", "Gateway device", "Backbone device", "Control plane"],
answer: 1,
explain: "Cisco calls hosts end devices or endpoint devices.",
tags: ["network-plus", "cisco", "host"]
},
{
type: "mcq",
q: "What Cisco term corresponds to a router or switch in the chapter's terminology?",
options: ["End device", "Intermediary device", "Application host", "Server OS", "Payload device"],
answer: 1,
explain: "Routers and switches are identified as Cisco intermediary devices.",
tags: ["network-plus", "cisco", "network-devices"]
},

{
type: "mcq",
q: "A small group of connected LANs is located around a single geographic area such as government offices near a state capital. Which network type fits the chapter?",
options: ["WAN", "PAN", "MAN or CAN", "BAN", "WLAN only"],
answer: 2,
explain: "The chapter describes a MAN or CAN as a group of connected LANs in the same geographic area.",
tags: ["network-plus", "man", "can"]
},

{
type: "mcq",
q: "A network consists of two or more devices connected wirelessly. What type is it?",
options: ["WLAN", "SAN", "WAN", "BAN", "MAN"],
answer: 0,
explain: "WLAN stands for wireless local area network and consists of two or more devices connected wirelessly.",
tags: ["network-plus", "wlan", "wireless"]
},
{
type: "mcq",
q: "Which network type is specifically associated with high-capacity data storage in a distinct network segment?",
options: ["PAN", "LAN", "SAN", "WAN", "BAN"],
answer: 2,
explain: "A SAN, or storage area network, consists of high-capacity storage devices in a distinctly defined network segment.",
tags: ["network-plus", "san", "storage"]
},
{
type: "mcq",
q: "Which network type is associated with wearable devices such as smartwatches and fitness trackers?",
options: ["BAN", "SAN", "WAN", "CAN", "LAN"],
answer: 0,
explain: "A BAN, or body area network, connects personal wearable and fitness devices.",
tags: ["network-plus", "ban", "wearables"]
},
{
type: "match",
q: "Match each network type with the characteristic emphasized in the chapter.",
context: "Network types by scope",
pairs: [
{ item: "PAN", match: "Personal devices" },
{ item: "BAN", match: "Wearable devices" },
{ item: "LAN", match: "Small local area" },
{ item: "MAN", match: "Connected LANs in one geographic area" },
{ item: "WAN", match: "LANs over a wide geographic area" }
],
explain: "The source distinguishes these network types primarily by scope and the type or geographic area of devices connected.",
tags: ["network-plus", "network-types", "topology"]
},
{
type: "mcq",
q: "Which mnemonic lists the OSI layers from Layer 7 down to Layer 1?",
options: ["Please Do Not Throw Sausage Pizza Away", "All People Seem To Need Data Processing", "TCP IP OSI NIC DNS", "Data Packets Need Proper Routing", "Servers Transfer Network Data Properly"],
answer: 1,
explain: "The chapter's top-to-bottom mnemonic is \"All People Seem To Need Data Processing.\"",
tags: ["network-plus", "osi", "mnemonics"]
},
{
type: "mcq",
q: "Which OSI layer describes the interface between two applications on separate computers?",
options: ["Session", "Network", "Application", "Presentation", "Transport"],
answer: 2,
explain: "The Application layer describes the interface between two applications on separate computers.",
tags: ["network-plus", "osi", "application-layer"]
},
{
type: "mcq",
q: "Which OSI layer is responsible for reformatting, compressing, and encrypting data?",
options: ["Physical", "Session", "Presentation", "Network", "Transport"],
answer: 2,
explain: "The Presentation layer reformats, compresses, and/or encrypts data so the receiving application can read it.",
tags: ["network-plus", "osi", "presentation-layer"]
},
{
type: "mcq",
q: "Which OSI layer handles synchronization and recovery when application messages do not arrive intact?",
options: ["Application", "Session", "Transport", "Data Link", "Physical"],
answer: 1,
explain: "The Session layer describes how application data is synchronized and recovered.",
tags: ["network-plus", "osi", "session-layer"]
},
{
type: "mcq",
q: "Which OSI layer addresses an application by a port number?",
options: ["Data Link", "Network", "Physical", "Transport", "Presentation"],
answer: 3,
explain: "The Transport-layer header identifies the receiving application by its port number.",
tags: ["network-plus", "osi", "transport-layer"]
},
{
type: "mcq",
q: "Which OSI layer uses IP addresses to identify sending and receiving hosts?",
options: ["Network", "Transport", "Data Link", "Application", "Physical"],
answer: 0,
explain: "The Network layer uses IP addresses to identify the sending and receiving hosts.",
tags: ["network-plus", "osi", "ip"]
},
{
type: "mcq",
q: "Which OSI layer uses MAC addresses and creates frames?",
options: ["Physical", "Network", "Data Link", "Transport", "Session"],
answer: 2,
explain: "The Data Link layer uses MAC addresses and creates frames by adding a header and trailer.",
tags: ["network-plus", "osi", "mac"]
},
{
type: "mcq",
q: "Which OSI layer sends bits through wired or wireless media?",
options: ["Application", "Presentation", "Physical", "Network", "Data Link"],
answer: 2,
explain: "The Physical layer sends bits through wired or wireless transmission.",
tags: ["network-plus", "osi", "physical-layer"]
},
{
type: "mcq",
q: "Which pair of protocols belongs to the Transport layer?",
options: ["HTTP and DNS", "TCP and UDP", "IP and ARP", "Ethernet and Wi-Fi", "SMTP and POP3"],
answer: 1,
explain: "TCP and UDP are the two main Transport-layer protocols described in the chapter.",
tags: ["network-plus", "tcp", "udp"]
},
{
type: "mcq",
q: "Which protocol is connection-oriented according to the chapter?",
options: ["UDP", "IP", "TCP", "ARP", "HTTP"],
answer: 2,
explain: "TCP is connection-oriented because it makes a connection, checks delivery, and retransmits when needed.",
tags: ["network-plus", "tcp", "transport-layer"]
},
{
type: "mcq",
q: "Which protocol is described as connectionless or best-effort?",
options: ["TCP", "UDP", "SMTP", "IP", "SSH"],
answer: 1,
explain: "UDP does not maintain a connection or guarantee delivery, so the chapter calls it connectionless or best-effort.",
tags: ["network-plus", "udp", "transport-layer"]
},
{
type: "mcq",
q: "A streaming application values fast transmission more than guaranteed delivery. Which transport protocol best matches the chapter's guidance?",
options: ["TCP", "UDP", "SMTP", "IMAP4", "FTP"],
answer: 1,
explain: "The chapter associates UDP with streaming and situations where speed is more important than guaranteed delivery.",
tags: ["network-plus", "udp", "streaming"]
},
{
type: "mcq",
q: "What is the TCP protocol data unit called at the Transport layer?",
options: ["Packet", "Frame", "Datagram", "Segment", "Bit"],
answer: 3,
explain: "TCP divides large messages into segments.",
tags: ["network-plus", "tcp", "pdu"]
},
{
type: "mcq",
q: "What is the UDP protocol data unit called at the Transport layer?",
options: ["Frame", "Segment", "Datagram", "Packet", "Payload"],
answer: 2,
explain: "UDP messages are called datagrams.",
tags: ["network-plus", "udp", "pdu"]
},
{
type: "mcq",
q: "What is the PDU at the Network layer?",
options: ["Frame", "Packet", "Segment", "Datagram", "Bit"],
answer: 1,
explain: "The Network-layer PDU is a packet.",
tags: ["network-plus", "network-layer", "pdu"]
},
{
type: "mcq",
q: "What is the PDU at the Data Link layer?",
options: ["Packet", "Segment", "Frame", "Payload", "Bit"],
answer: 2,
explain: "The Data Link-layer PDU is a frame.",
tags: ["network-plus", "data-link", "pdu"]
},
{
type: "mcq",
q: "Which OSI layer adds both a header and a trailer?",
options: ["Transport", "Network", "Data Link", "Physical", "Application"],
answer: 2,
explain: "The Data Link layer adds a header and also attaches a trailer, producing a frame.",
tags: ["network-plus", "data-link", "framing"]
},
{
type: "mcq",
q: "What is encapsulation?",
options: ["Removing all network headers", "Adding a header to data inherited from a higher layer", "Assigning a DNS name", "Switching frames between ports", "Encrypting only physical bits"],
answer: 1,
explain: "Encapsulation is the process of adding headers to data as it moves down through the layers.",
tags: ["network-plus", "encapsulation", "osi"]
},
{
type: "mcq",
q: "What is decapsulation?",
options: ["Adding a new MAC address", "Removing lower-layer headers and trailers as data moves upward", "Breaking a packet into fragments", "Creating a topology", "Assigning a port number"],
answer: 1,
explain: "Decapsulation removes headers and trailers in reverse order as the destination host moves the data up the stack.",
tags: ["network-plus", "decapsulation", "osi"]
},
{
type: "mcq",
q: "A switch receives a frame and must decide where to forward it. Which address does it examine in the chapter's example?",
options: ["Destination port", "Destination IP address", "Destination MAC address", "DNS name", "SMTP address"],
answer: 2,
explain: "The switch examines the destination MAC address at the Data Link layer.",
tags: ["network-plus", "switch", "mac"]
},
{
type: "mcq",
q: "A router receives a frame and needs to decide the next network path for the packet. Which address does it examine?",
options: ["Destination MAC only", "Destination IP address", "SMTP address", "Port name", "DNS server name"],
answer: 1,
explain: "The router passes the packet to IP at the Network layer and examines the destination IP address to determine the next node.",
tags: ["network-plus", "router", "ip"]
},
{
type: "mcq",
q: "When a router forwards a packet onto another LAN, what happens at the Data Link layer?",
options: ["The original frame is always reused unchanged.", "A new frame header and trailer are created for the next LAN.", "The packet becomes a segment.", "The router removes the IP header permanently.", "The payload is converted into SQL."],
answer: 1,
explain: "The router removes the incoming frame information and re-encapsulates the packet with a new Data Link header and trailer appropriate for the next LAN.",
tags: ["network-plus", "router", "encapsulation"]
},
{
type: "mcq",
q: "Which protocol is identified as supporting IP at the Network layer?",
options: ["ICMP", "SMTP", "POP3", "RDP", "HTTP"],
answer: 0,
explain: "ICMP and ARP are identified as supporting protocols used with IP at the Network layer.",
tags: ["network-plus", "icmp", "network-layer"]
},
{
type: "mcq",
q: "Which protocol is also identified as supporting IP at the Network layer?",
options: ["ARP", "IMAP4", "FTP", "SSH", "SNMP"],
answer: 0,
explain: "ARP is listed with ICMP as a supporting Network-layer protocol associated with IP.",
tags: ["network-plus", "arp", "network-layer"]
},

{
type: "mcq",
q: "What is firmware?",
options: ["Software hosted only in the cloud", "Programming embedded into hardware devices", "A type of WAN", "A user account database", "A routing protocol"],
answer: 1,
explain: "Firmware is programming embedded into hardware and does not normally change unless a firmware upgrade is performed.",
tags: ["network-plus", "firmware", "hardware"]
},
{
type: "mcq",
q: "Which model combines the OSI Data Link and Physical layers into a Link layer?",
options: ["Client-server model", "TCP/IP model", "P2P model", "Domain model", "Hub-and-spoke model"],
answer: 1,
explain: "The TCP/IP model combines the OSI Data Link and Physical layers into the Link layer.",
tags: ["network-plus", "tcp-ip", "osi"]
},
{
type: "tf",
q: "The chapter uses the OSI model as the preferred model for theoretical concepts and troubleshooting.",
answer: true,
explain: "The source says the OSI model is typically preferred for theoretical concepts and troubleshooting, while TCP/IP is often used to refer to protocols by layer.",
tags: ["network-plus", "osi", "troubleshooting"]
},
{
type: "mcq",
q: "Which fire suppression level provides the most targeted protection for network equipment?",
options: ["Building level", "Room level", "Rack level", "Floor level", "Desk level"],
answer: 2,
explain: "Rack-level protection targets the cabinet holding network devices and can neutralize a fire quickly with less impact on surrounding equipment.",
tags: ["network-plus", "safety", "fire-suppression"]
},

{
type: "mcq",
q: "A security-controlled door should unlock during a power failure so people can safely exit and firefighters can enter. Which failure policy is being used?",
options: ["Fail-close", "Fail-secure", "Fail-open", "Fail-stop", "Fail-locked"],
answer: 2,
explain: "Fail-open, also called fail-safe in the chapter, permits access during a failure and is often chosen for safety.",
tags: ["network-plus", "fail-open", "safety"]
},
{
type: "mcq",
q: "A firewall protecting sensitive customer credit-card data should deny access while the firewall is offline. Which policy fits the chapter's example?",
options: ["Fail-open", "Fail-safe", "Fail-close", "Peer-to-peer", "Best-effort"],
answer: 2,
explain: "Fail-close, or fail-secure, denies access during failure to protect private data and resources.",
tags: ["network-plus", "fail-close", "firewall"]
},
{
type: "mcq",
q: "What does an SDS provide for a workplace chemical?",
options: ["Routing information", "Chemical handling and emergency information", "User account permissions", "MAC addresses", "Web-server configuration"],
answer: 1,
explain: "An SDS explains proper handling, first aid, fire-fighting measures, accidental release measures, and disposal information for chemicals.",
tags: ["network-plus", "sds", "safety"]
},

{
type: "mcq",
q: "Before working near electrical devices in a data-center rack, what does the chapter say OSHA safety rules require?",
options: ["Leave the equipment powered on", "Disable only network access", "Turn devices off and lock out the electrical supply", "Remove the NIC", "Switch to UDP"],
answer: 2,
explain: "The chapter states that electrical devices should be turned off and the electrical supply locked out before employees work near them.",
tags: ["network-plus", "osha", "lockout"]
},
{
type: "mcq",
q: "A technician is using a power tool that creates dust. Which safety action is specifically appropriate?",
options: ["Wear eye protection", "Remove the grounding prong", "Leave cords underfoot", "Work without training", "Disable the emergency system"],
answer: 0,
explain: "The chapter gives eye protection as an example of PPE when dust or fumes are generated by power tools.",
tags: ["network-plus", "ppe", "tool-safety"]
},



{
type: "mcq",
q: "A technician experiences no spark or noticeable shock but has damaged a motherboard. Which chapter concept best explains this?",
options: ["Logical topology", "ESD", "DNS", "TCP", "Change management"],
answer: 1,
explain: "A person can discharge up to 1,500 volts without seeing or feeling it, while some components can be damaged by only 10 volts.",
tags: ["network-plus", "esd", "hardware"]
},
{
type: "mcq",
q: "Which ESD failure type destroys a component beyond use?",
options: ["Upset failure", "Catastrophic failure", "Logical failure", "Protocol failure", "Transient routing"],
answer: 1,
explain: "A catastrophic failure destroys the component beyond use.",
tags: ["network-plus", "esd", "failure"]
},
{
type: "mcq",
q: "Which ESD failure can shorten a component's life or cause intermittent errors?",
options: ["Catastrophic failure", "Upset failure", "Fail-close", "Physical failure", "Network failure"],
answer: 1,
explain: "An upset failure can shorten component life and/or produce intermittent errors.",
tags: ["network-plus", "esd", "failure"]
},
{
type: "mcq",
q: "What is the preferred method in the chapter for grounding yourself before handling components?",
options: ["Touch a network cable", "Wear an ESD strap clipped to the chassis", "Stand on carpet", "Hold the power cable", "Place the component on an antistatic bag"],
answer: 1,
explain: "The recommended method is to wear an ESD strap connected to a metallic part of the computer chassis.",
tags: ["network-plus", "esd", "safety"]
},

{
type: "mcq",
q: "What is the correct first step in the seven-step troubleshooting model?",
options: ["Implement the solution", "Identify the problem and its symptoms", "Document the findings", "Verify functionality", "Establish a plan"],
answer: 1,
explain: "Step 1 is to identify the problem and its symptoms.",
tags: ["network-plus", "troubleshooting", "step-1"]
},
{
type: "mcq",
q: "Which action belongs to Step 1 of troubleshooting?",
options: ["Change multiple settings", "Question the user", "Roll out the fix to everyone", "Write the final report", "Replace the router immediately"],
answer: 1,
explain: "Step 1 includes questioning the user, finding what recently changed, determining scope, and identifying symptoms.",
tags: ["network-plus", "troubleshooting", "step-1"]
},
{
type: "mcq",
q: "What is the purpose of Step 2?",
options: ["Verify the final fix", "Establish a theory of probable cause", "Document lessons learned", "Back up all users", "Deploy the solution"],
answer: 1,
explain: "Step 2 establishes a theory of probable cause based on observed symptoms and likely sources.",
tags: ["network-plus", "troubleshooting", "step-2"]
},
{
type: "mcq",
q: "A user cannot log on and receives an invalid-password message. Which troubleshooting direction does the chapter suggest?",
options: ["Begin at the Physical layer", "Begin at the Data Link layer", "Use OSI top-to-bottom starting at the Application layer", "Ignore the OSI model", "Start by replacing the switch"],
answer: 2,
explain: "Because the symptom is clearly software or application related, the chapter suggests starting top-to-bottom at the Application layer.",
tags: ["network-plus", "troubleshooting", "osi"]
},
{
type: "mcq",
q: "A workstation has no link and may have a loose cable or failed NIC. Which troubleshooting direction does the chapter generally recommend first?",
options: ["Top-to-bottom from Application", "Bottom-to-top from Physical", "Start with SQL", "Start with DNS", "Start with email protocols"],
answer: 1,
explain: "For general problems, the chapter recommends bottom-to-top OSI troubleshooting, eliminating hardware causes before moving to software.",
tags: ["network-plus", "troubleshooting", "osi"]
},
{
type: "mcq",
q: "What should happen if a troubleshooting theory fails its test?",
options: ["Implement it anyway", "Ignore the result", "Try another theory or escalate", "Document success", "Restart every device immediately"],
answer: 2,
explain: "If testing disproves the theory, the technician should move to another guess or escalate to the next support tier.",
tags: ["network-plus", "troubleshooting", "step-3"]
},
{
type: "mcq",
q: "Which troubleshooting technique involves eliminating parts of the problem until the source is isolated?",
options: ["Broadcasting", "Divide and conquer", "Fail open", "Encapsulation", "Hub-and-spoke"],
answer: 1,
explain: "The divide-and-conquer approach narrows the problem by eliminating portions of the whole until the source is isolated.",
tags: ["network-plus", "troubleshooting", "divide-conquer"]
},
{
type: "mcq",
q: "A planned network change could disrupt hundreds of users. Which step should address its scope and impact before implementation?",
options: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 7"],
answer: 3,
explain: "Step 4 establishes the plan, including the scope and potential impact of the change.",
tags: ["network-plus", "troubleshooting", "change-management"]
},

{
type: "multi",
q: "Before implementing a network change, which three actions does the chapter recommend?",
options: ["Alert affected users", "Create backups as needed", "Save current settings", "Change multiple variables at once", "Disable documentation"],
answer: [0, 1, 2],
explain: "Technicians should notify affected users, create needed backups, and record current settings before making changes.",
tags: ["network-plus", "troubleshooting", "step-5"]
},
{
type: "mcq",
q: "Why should a technician normally make only one troubleshooting change at a time?",
options: ["To increase bandwidth", "To isolate the effect of each change", "To force a fail-open policy", "To avoid using the OSI model", "To eliminate documentation"],
answer: 1,
explain: "One change at a time makes it possible to determine whether that particular change resolved the problem.",
tags: ["network-plus", "troubleshooting", "step-5"]
},


{
type: "mcq",
q: "Why should the user sometimes test the system after a technician's fix?",
options: ["Users always have administrator privileges", "Users may have different privileges or configurations", "Users control the router", "Users replace the NOS", "Users provide DNS"],
answer: 1,
explain: "The chapter notes that users may have fewer privileges or different configurations that affect behavior.",
tags: ["network-plus", "troubleshooting", "verification"]
},
{
type: "mcq",
q: "Which action belongs to Step 7?",
options: ["Establish a theory", "Test a cable", "Document findings, actions, and outcomes", "Choose a port", "Create the first hypothesis"],
answer: 2,
explain: "Step 7 is documentation of findings, actions, outcomes, and related lessons.",
tags: ["network-plus", "troubleshooting", "step-7"]
},
{
type: "mcq",
q: "Where can technicians find accumulated insights and solutions from previous network problems?",
options: ["SDS", "Knowledge base", "Physical topology", "MAC table", "Fire suppression system"],
answer: 1,
explain: "A knowledge base stores accumulated insights and solutions from problems encountered on a network.",
tags: ["network-plus", "knowledge-base", "troubleshooting"]
},
{
type: "mcq",
q: "A support organization wants to document the caller, symptoms, resolution, technician, and time spent. What system is intended for this purpose?",
options: ["Ticket tracking system", "DNS server", "DBMS protocol", "Hub", "Firewall"],
answer: 0,
explain: "The chapter describes ticket tracking systems or help desk software as the place to document reported problems and their resolutions.",
tags: ["network-plus", "ticketing", "troubleshooting"]
},
{
type: "mcq",
q: "A technician finds that one workstation has no connectivity while all nearby workstations work normally. After testing the wall, PC connections, OS settings, switch ports, and cables, what tool from the chapter helps trace building cabling?",
options: ["Wire toner", "RAID controller", "DBMS", "SNMP manager", "RDP"],
answer: 0,
explain: "The technician used a wire toner to trace the building cabling and discovered the cable was routed to the wrong closet.",
tags: ["network-plus", "wire-toner", "troubleshooting"]
},
{
type: "mcq",
q: "What was the root cause in the chapter's wrongly routed cable scenario?",
options: ["Incorrect DNS record", "Failed router", "Wrongly routed cable", "Bad Active Directory account", "Faulty SMTP server"],
answer: 2,
explain: "The cable had been punched down in a downstairs closet rather than the intended second-floor closet.",
tags: ["network-plus", "troubleshooting", "cabling"]
},
{
type: "mcq",
q: "A workstation can access websites but cannot access email. Where should troubleshooting begin according to the chapter's scenario guidance?",
options: ["Physical layer", "Data Link layer", "Network layer", "Application layer", "Power subsystem"],
answer: 3,
explain: "The scenario points to an application-specific problem, so the chapter recommends beginning at the Application layer.",
tags: ["network-plus", "troubleshooting", "osi"]
},
{
type: "mcq",
q: "A computer's network-port LEDs are not lit. Which OSI layer should be investigated first?",
options: ["Application", "Presentation", "Transport", "Network", "Physical"],
answer: 4,
explain: "Unlit port LEDs indicate a likely physical connectivity issue, making the Physical layer the appropriate starting point.",
tags: ["network-plus", "troubleshooting", "physical-layer"]
},
{
type: "mcq",
q: "A troubleshooting issue is complex, affects many users, and requires resources beyond the current technician's authority. What should happen next?",
options: ["Ignore it", "Escalate it", "Switch to FTP", "Rebuild the topology", "Delete the ticket"],
answer: 1,
explain: "Complex problems may need escalation to someone with greater technical resources or authority.",
tags: ["network-plus", "troubleshooting", "escalation"]
},
{
type: "tf",
q: "During troubleshooting, a technician should normally change several variables at the same time to maximize the chance of success.",
answer: false,
explain: "The chapter recommends making only one change at a time so the effect of each change can be evaluated.",
tags: ["network-plus", "troubleshooting"]
},

{
type: "fill",
q: "The protocol data unit for TCP at the Transport layer is a ______.",
answer: "segment",
explain: "TCP divides large messages into segments.",
tags: ["network-plus", "tcp", "pdu"]
},
{
type: "fill",
q: "The protocol data unit for UDP at the Transport layer is a ______.",
answer: "datagram",
explain: "UDP messages are called datagrams.",
tags: ["network-plus", "udp", "pdu"]
},
{
type: "fill",
q: "The process of removing headers and trailers as data moves up the receiving host's protocol stack is called ______.",
answer: "decapsulation",
explain: "Decapsulation reverses encapsulation by removing lower-layer headers and trailers.",
tags: ["network-plus", "decapsulation", "osi"]
},

{
type: "multi",
q: "Which four actions are consistent with the chapter's final troubleshooting and change-management practices?",
options: ["Test the solution thoroughly", "Keep good notes", "Clean up after the change", "Escalate when needed", "Skip affected-user notifications"],
answer: [0, 1, 2, 3],
explain: "The chapter emphasizes thorough testing, good notes, cleanup, and escalation when appropriate.",
tags: ["network-plus", "troubleshooting", "change-management"]
}
]
});
