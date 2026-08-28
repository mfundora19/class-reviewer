window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 1: Introduction to Networking",
items: [
{
front: "What is the difference between a physical topology and a logical topology?",
back: "A physical topology describes the network's hardware, devices, cables, and radio signals and how they fit together. A logical topology describes how software controls access to network resources and how applications and databases are shared.",
tags: ["network-plus", "topology", "network-models"]
},
{
front: "What is a peer-to-peer (P2P) network model?",
back: "In a P2P model, each computer's operating system controls access to its own resources without centralized control. The computers act as peers and share resources directly.",
tags: ["network-plus", "p2p", "network-models"]
},
{
front: "What is a major advantage of a peer-to-peer network?",
back: "P2P networks are simple to configure and relatively inexpensive to set up and maintain, making them useful when time or technical expertise is limited.",
tags: ["network-plus", "p2p", "advantages"]
},
{
front: "What are three important disadvantages of traditional peer-to-peer networks?",
back: "They are not scalable, they are not necessarily secure, and they are impractical to manage when more than a few computers and shared resources are involved.",
tags: ["network-plus", "p2p", "limitations"]
},
{
front: "Why can peer-to-peer file sharing become difficult to manage as a network grows?",
back: "Each computer maintains its own users, rights, and shared resources. Keeping matching accounts, passwords, and permissions synchronized across many systems becomes time-consuming and error-prone.",
tags: ["network-plus", "p2p", "permissions"]
},
{
front: "What is a client-server network model?",
back: "A client-server model uses a network operating system to manage resources through centralized control, typically with a directory database maintained by one or more servers.",
tags: ["network-plus", "client-server", "network-models"]
},
{
front: "What is the role of a NOS in a client-server network?",
back: "A network operating system manages shared resources, authenticates and authorizes users, controls file access, restricts when and where users can connect, and can supply applications and data to clients.",
tags: ["network-plus", "nos", "client-server"]
},
{
front: "What is Active Directory (AD) in the Windows client-server model?",
back: "Active Directory is the centralized directory database that contains user account information and security information for a Windows domain.",
tags: ["network-plus", "active-directory", "client-server"]
},
{
front: "What does AD DS do?",
back: "Active Directory Domain Services manages the process by which users sign on to a Windows domain and obtain access to resources permitted by Active Directory.",
tags: ["network-plus", "ad-ds", "authentication"]
},
{
front: "What is a Windows domain?",
back: "A Windows domain is the logical group of computers controlled by Windows Server for centralized network access and resource management.",
tags: ["network-plus", "domain", "client-server"]
},
{
front: "How does scalability differ between P2P and client-server networks?",
back: "P2P networks are not scalable because managing users and resources becomes difficult as the network grows. Client-server networks are more scalable because accounts and access can be managed centrally.",
tags: ["network-plus", "scalability", "network-models"]
},
{
front: "Why are client-server networks generally more suitable for many users and devices?",
back: "They centralize account management, resource permissions, monitoring, diagnosis, and administration, making it easier to add and manage many users and devices.",
tags: ["network-plus", "client-server", "scalability"]
},
{
front: "What is a server?",
back: "A server is a computer or program that provides a service, such as data or another resource, to other devices.",
tags: ["network-plus", "server", "network-models"]
},
{
front: "What are Windows Server, Ubuntu Server, and Red Hat Enterprise Linux examples of?",
back: "They are examples of server operating systems used as network operating systems in client-server environments.",
tags: ["network-plus", "nos", "server-os"]
},
{
front: "What is a CLI?",
back: "CLI stands for command-line interface, an interface commonly used to manage networking devices such as routers and switches through typed commands.",
tags: ["network-plus", "cli", "network-management"]
},
{
front: "What are IOS and Junos OS in networking?",
back: "IOS is Cisco's Internetwork OS used on Cisco devices, while Junos OS is used on Juniper devices. Both are examples of networking software or NOSs typically managed through a CLI.",
tags: ["network-plus", "ios", "junos"]
},
{
front: "What is a network service?",
back: "A network service is a network-provided resource or function, such as an application, data access, or communication service involving endpoint devices.",
tags: ["network-plus", "network-services", "concepts"]
},
{
front: "What is a network protocol?",
back: "A protocol is a set of communication rules that devices agree to use so they can understand requests and responses exchanged across a network.",
tags: ["network-plus", "protocols", "network-services"]
},
{
front: "What is the TCP/IP suite?",
back: "The TCP/IP suite is the collection of protocols an operating system uses for network communication. TCP and IP are identified as the two primary network protocols.",
tags: ["network-plus", "tcp-ip", "protocols"]
},
{
front: "What protocol is primarily used by web servers and web browsers?",
back: "HTTP, the Hypertext Transfer Protocol, is the primary protocol used by web servers and browsers.",
tags: ["network-plus", "http", "web"]
},
{
front: "How does HTTPS secure HTTP traffic?",
back: "HTTPS is HTTP layered over an encryption protocol such as SSL or TLS, providing encrypted transmission between the client and web server.",
tags: ["network-plus", "https", "tls"]
},
{
front: "What is the role of SSL and TLS in this chapter?",
back: "SSL and TLS are encryption protocols that add a layer of security to data transmitted by other TCP/IP protocols. The chapter presents TLS as a successor-style protocol to SSL.",
tags: ["network-plus", "ssl", "tls"]
},
{
front: "What protocol is used to send email from a client to a mail server?",
back: "SMTP, the Simple Mail Transfer Protocol, is used to send an email message from the client to the sender's mail server and onward to the receiver's mail server.",
tags: ["network-plus", "smtp", "email"]
},
{
front: "How do POP3 and IMAP4 differ?",
back: "POP3 downloads email to the client and typically removes it from the server. IMAP4 keeps email stored on the server while the client manages it, making IMAP4 well suited to access from multiple devices.",
tags: ["network-plus", "pop3", "imap4"]
},
{
front: "What does DNS do?",
back: "DNS, the Domain Name System, helps clients find web servers and other resources by resolving names on a network.",
tags: ["network-plus", "dns", "name-resolution"]
},
{
front: "What is a DBMS?",
back: "A DBMS, or database management system, is software installed on a database server that makes requested data changes and organizes data for viewing, reporting, or exporting.",
tags: ["network-plus", "dbms", "databases"]
},
{
front: "What is SQL used for?",
back: "SQL, Structured Query Language, is used by many database management systems to configure and interact with database objects and data.",
tags: ["network-plus", "sql", "databases"]
},
{
front: "What is the security limitation of FTP?",
back: "FTP, the File Transfer Protocol, does not provide encryption and therefore is not secure by itself.",
tags: ["network-plus", "ftp", "file-transfer"]
},
{
front: "What is FTPS?",
back: "FTPS is FTP secured with SSL or TLS; the chapter describes it as FTP Secure or FTP over SSL.",
tags: ["network-plus", "ftps", "file-transfer"]
},
{
front: "What is SFTP based on?",
back: "SFTP, Secure File Transfer Protocol, is an encrypted file-transfer protocol based on SSH.",
tags: ["network-plus", "sftp", "ssh"]
},
{
front: "Why has Telnet largely been replaced for remote access?",
back: "Telnet transmissions are not encrypted. The chapter contrasts it with SSH, which creates an encrypted channel or tunnel.",
tags: ["network-plus", "telnet", "remote-access"]
},
{
front: "What does SSH provide for remote access?",
back: "SSH, Secure Shell, creates an encrypted channel or tunnel between two computers and provides security that Telnet lacks. The Linux ssh command uses SSH.",
tags: ["network-plus", "ssh", "remote-access"]
},
{
front: "What is RDP used for?",
back: "RDP, Remote Desktop Protocol, provides secure, encrypted remote-access transmissions in Windows environments.",
tags: ["network-plus", "rdp", "remote-access"]
},
{
front: "Why do remote access servers require strict security measures?",
back: "Because they can be accessed from outside the local network, remote access servers increase exposure to unauthorized access and therefore require strong security measures.",
tags: ["network-plus", "remote-access", "security"]
},
{
front: "What is a LAN?",
back: "A LAN, or local area network, is a network in which nodes can communicate directly with one another, usually within a relatively small area such as an office or building.",
tags: ["network-plus", "lan", "network-types"]
},
{
front: "What does a switch do?",
back: "A switch receives incoming data on one port and redirects it to the port or ports leading to the intended destination within the local network.",
tags: ["network-plus", "switch", "network-hardware"]
},
{
front: "Why is a network with one central switch and devices connected to it called a star topology?",
back: "Because all devices connect to one central device, the switch, creating a star-shaped physical arrangement.",
tags: ["network-plus", "star-topology", "switch"]
},
{
front: "How does a mesh topology differ from a star topology?",
back: "In a mesh topology, each device connects to multiple other devices. In a star topology, all devices connect to one central device.",
tags: ["network-plus", "mesh", "star-topology"]
},
{
front: "What is a hub and why is it considered legacy technology?",
back: "A hub repeats an incoming signal to all other connected devices. It is inefficient and outdated because switches can forward traffic only to the intended destination devices.",
tags: ["network-plus", "hub", "legacy"]
},
{
front: "What is a NIC?",
back: "NIC stands for network interface card. It is also called a network adapter and provides a network port for connecting a computer or other device to a network.",
tags: ["network-plus", "nic", "network-hardware"]
},
{
front: "What is the difference between an onboard network port and a modular NIC?",
back: "An onboard network port is embedded in the computer's motherboard. A modular NIC is installed in an expansion slot, although both are commonly called NICs in practice.",
tags: ["network-plus", "nic", "hardware"]
},
{
front: "What is a backbone in a network?",
back: "A backbone is a central conduit that connects network segments. It may use higher transmission speeds or different cabling because it carries heavier traffic and may span longer distances.",
tags: ["network-plus", "backbone", "network-hardware"]
},
{
front: "What is a hybrid topology?",
back: "A hybrid topology combines two or more topology types. The chapter example combines a bus topology between switches with star topologies from each switch to its computers.",
tags: ["network-plus", "hybrid-topology", "topology"]
},
{
front: "What is a hub-and-spoke topology?",
back: "A hub-and-spoke topology uses a central device called the hub to connect multiple peripheral devices called spokes.",
tags: ["network-plus", "hub-and-spoke", "topology"]
},
{
front: "What is the fundamental difference between a switch and a router?",
back: "A switch belongs to a single local network and forwards traffic within that network. A router belongs to two or more networks, manages traffic between them, and acts as a gateway.",
tags: ["network-plus", "switch", "router"]
},
{
front: "Why is a router called a gateway device?",
back: "A router provides the path between different networks. A node on one LAN cannot communicate with a node on another LAN without a router acting as the gateway between them.",
tags: ["network-plus", "router", "gateway"]
},
{
front: "What is a combination device in a home network?",
back: "It is a device that combines router and switch functions and may also include a wireless access point. The switch portion serves the local LAN ports while the router side connects the LAN to the ISP network.",
tags: ["network-plus", "router", "soho"]
},
{
front: "What is the key scope distinction between a switch and a router in a home combo device?",
back: "The switch belongs to the local LAN, while the router connects the home's LAN to the ISP's network and therefore participates in more than one network.",
tags: ["network-plus", "switch", "router"]
},
{
front: "What is a host?",
back: "A host is an endpoint device connected to a network that hosts or accesses a resource such as an application or data.",
tags: ["network-plus", "host", "network-devices"]
},
{
front: "What is a node?",
back: "A node is any device connected to a network that can be addressed on the local network or managed through a network connection.",
tags: ["network-plus", "node", "network-devices"]
},
{
front: "How are hosts and nodes related?",
back: "A host is an endpoint resource-oriented device, while a node is any addressable or manageable network device. A client or server can be both a host and a node; a router or switch is normally a node but not a host.",
tags: ["network-plus", "host", "node"]
},
{
front: "What do Cisco terms call hosts and networking devices?",
back: "Cisco calls hosts end devices or endpoint devices. Routers and switches are intermediary devices.",
tags: ["network-plus", "cisco", "network-devices"]
},
{
front: "What is SOHO?",
back: "SOHO stands for small office-home office. The chapter describes a typical SOHO network as having fewer than 10 computers and commonly using a consumer-grade router to connect the LAN to the Internet.",
tags: ["network-plus", "soho", "routers"]
},
{
front: "What is a WAN?",
back: "A WAN, or wide area network, is a group of LANs spread over a wide geographical area. The Internet is described as the largest and most varied WAN.",
tags: ["network-plus", "wan", "network-types"]
},
{
front: "What is a MAN or CAN?",
back: "A MAN is a metropolitan area network, while a CAN is a campus area network. The chapter describes both as groups of connected LANs in the same geographic area and notes that the terms may be used interchangeably.",
tags: ["network-plus", "man", "can"]
},
{
front: "What is a PAN?",
back: "A PAN, or personal area network, is a network of personal devices, such as a smartphone connected to a computer.",
tags: ["network-plus", "pan", "network-types"]
},
{
front: "What is a BAN?",
back: "A BAN, or body area network, is made up of personal fitness or wearable devices such as smartwatches, fitness trackers, augmented-reality headsets, or wearable hearing aids.",
tags: ["network-plus", "ban", "network-types"]
},
{
front: "What is a WLAN?",
back: "A WLAN, or wireless local area network, consists of two or more devices connected wirelessly.",
tags: ["network-plus", "wlan", "wireless"]
},
{
front: "What is a SAN?",
back: "A SAN, or storage area network, consists of high-capacity data storage devices in a distinctly defined network segment.",
tags: ["network-plus", "san", "storage"]
},
{
front: "What is the OSI reference model?",
back: "The OSI, or Open Systems Interconnection, reference model is a seven-layer framework for categorizing network communication. It is used to discuss networking technologies, map protocols, and troubleshoot network problems.",
tags: ["network-plus", "osi", "models"]
},
{
front: "Who developed the OSI model according to the chapter?",
back: "The OSI reference model was first developed by the International Organization for Standardization, also called ISO.",
tags: ["network-plus", "osi", "iso"]
},
{
front: "What is the correct top-to-bottom order of the seven OSI layers?",
back: "Application, Presentation, Session, Transport, Network, Data Link, Physical. The source mnemonic is \"All People Seem To Need Data Processing.\"",
tags: ["network-plus", "osi", "layers"]
},
{
front: "What is the correct bottom-to-top order of the seven OSI layers?",
back: "Physical, Data Link, Network, Transport, Session, Presentation, Application. The source mnemonic is \"Please Do Not Throw Sausage Pizza Away.\"",
tags: ["network-plus", "osi", "layers"]
},
{
front: "What is the responsibility of OSI Layer 7, the Application layer?",
back: "It describes the interface between two applications on separate computers. The chapter places protocols such as HTTP, SMTP, POP3, IMAP4, DNS, FTP, Telnet, SSH, and RDP here.",
tags: ["network-plus", "osi", "application-layer"]
},
{
front: "Does the OSI Application layer contain applications such as a web browser?",
back: "No. It describes the interface between applications on separate computers rather than containing the applications themselves.",
tags: ["network-plus", "osi", "application-layer"]
},
{
front: "What is the purpose of SNMP at the application layer?",
back: "SNMP, Simple Network Management Protocol, is used by utilities that monitor and gather information about network traffic and can alert administrators about adverse conditions.",
tags: ["network-plus", "snmp", "application-layer"]
},
{
front: "What is the responsibility of OSI Layer 6, the Presentation layer?",
back: "It reformats, compresses, and/or encrypts data so that the receiving application can read it.",
tags: ["network-plus", "osi", "presentation-layer"]
},
{
front: "What is the responsibility of OSI Layer 5, the Session layer?",
back: "It describes how data between applications is synchronized and recovered when messages do not arrive intact at the receiving application.",
tags: ["network-plus", "osi", "session-layer"]
},
{
front: "Why can the Application, Presentation, and Session layers be difficult to distinguish in practice?",
back: "Their functions are tightly intertwined, and tasks may be performed by either the operating system or the application, often through API calls.",
tags: ["network-plus", "osi", "upper-layers"]
},
{
front: "What is an API?",
back: "An API, or application programming interface, is an access point into software processes where a particular kind of request generates a particular kind of response.",
tags: ["network-plus", "api", "software"]
},
{
front: "What is the role of the Transport layer?",
back: "The Transport layer transports application-layer payloads from one application to another and adds a header that addresses the receiving application by port number.",
tags: ["network-plus", "osi", "transport-layer"]
},
{
front: "How does TCP differ from UDP?",
back: "TCP is connection-oriented and guarantees delivery by checking receipt and retransmitting when necessary. UDP is connectionless or best-effort and does not guarantee delivery, favoring faster transmission.",
tags: ["network-plus", "tcp", "udp"]
},
{
front: "When is TCP preferred over UDP?",
back: "TCP is preferred when reliable delivery is important and the extra time required to check and guarantee delivery is acceptable, such as in web browsing and email.",
tags: ["network-plus", "tcp", "transport-layer"]
},
{
front: "When is UDP useful according to the chapter?",
back: "UDP is useful where fast transmission is more important than guaranteed delivery, such as broadcasting, streaming audio or video, and monitoring network traffic.",
tags: ["network-plus", "udp", "transport-layer"]
},
{
front: "What is the TCP protocol data unit at the Transport layer?",
back: "A TCP Transport-layer message is called a segment.",
tags: ["network-plus", "tcp", "pdu"]
},
{
front: "What is the UDP protocol data unit at the Transport layer?",
back: "A UDP Transport-layer message is called a datagram.",
tags: ["network-plus", "udp", "pdu"]
},
{
front: "What is a port at the Transport layer?",
back: "A port is the number used in the Transport-layer header to address the receiving application on the destination computer.",
tags: ["network-plus", "port", "transport-layer"]
},
{
front: "What is encapsulation in the OSI model?",
back: "Encapsulation is the process of adding a header to data inherited from the layer above as it moves down the protocol stack.",
tags: ["network-plus", "encapsulation", "osi"]
},
{
front: "What is the responsibility of OSI Layer 3, the Network layer?",
back: "It moves messages from one node to another until they reach the destination host. Routers typically function at this layer.",
tags: ["network-plus", "osi", "network-layer"]
},
{
front: "Which protocol is the principal protocol of the OSI Network layer?",
back: "IP, the Internet Protocol, is the principal Network-layer protocol described in the chapter.",
tags: ["network-plus", "ip", "network-layer"]
},
{
front: "What type of address identifies the source and destination hosts at the Network layer?",
back: "IP addresses identify the sending and receiving hosts.",
tags: ["network-plus", "ip-address", "network-layer"]
},
{
front: "What is the PDU at the Network layer?",
back: "The Network-layer PDU is a packet.",
tags: ["network-plus", "packet", "pdu"]
},
{
front: "What supporting protocols does the chapter associate with the Network layer?",
back: "It identifies ICMP and ARP as supporting protocols used with IP.",
tags: ["network-plus", "icmp", "arp"]
},
{
front: "What is fragmentation?",
back: "Fragmentation is the process of dividing a network-layer packet into smaller packets when the packet is larger than the maximum size allowed for the network.",
tags: ["network-plus", "fragmentation", "network-layer"]
},
{
front: "What is the responsibility of OSI Layer 2, the Data Link layer?",
back: "It interfaces with the physical hardware on the local network and adds a header and trailer containing local hardware addressing information.",
tags: ["network-plus", "osi", "data-link"]
},
{
front: "Which protocols does the chapter use as examples of Data Link-layer protocols?",
back: "Ethernet and Wi-Fi are given as Data Link-layer examples.",
tags: ["network-plus", "ethernet", "wifi"]
},
{
front: "What address does the Data Link layer use for local hardware identification?",
back: "It uses a MAC address, or Media Access Control address, also called a physical, hardware, or Data Link-layer address.",
tags: ["network-plus", "mac", "data-link"]
},
{
front: "What is the PDU at the Data Link layer?",
back: "The Data Link-layer PDU is a frame.",
tags: ["network-plus", "frame", "pdu"]
},
{
front: "What is the significance of a Data Link-layer trailer?",
back: "The Data Link layer adds control information not only in a header at the beginning of the packet but also in a trailer at the end, producing the frame.",
tags: ["network-plus", "trailer", "data-link"]
},
{
front: "What is the scope of a MAC address in this chapter?",
back: "A MAC address is a short-range hardware address used to find nodes on the local network.",
tags: ["network-plus", "mac", "addressing"]
},
{
front: "What is the responsibility of OSI Layer 1, the Physical layer?",
back: "It sends bits through a wired or wireless transmission medium.",
tags: ["network-plus", "osi", "physical-layer"]
},
{
front: "How can bits be physically transmitted according to the chapter?",
back: "They can be transmitted as radio-frequency wavelengths in the air for Wi-Fi, as electrical voltage over copper cabling such as Ethernet twisted pair, or as light over fiber-optic cabling.",
tags: ["network-plus", "physical-layer", "transmission"]
},
{
front: "Which OSI layers must deal directly with wired versus wireless details?",
back: "The Data Link and Physical layers must handle the details of wired and wireless transmission in the NIC firmware and hardware.",
tags: ["network-plus", "osi", "wired-wireless"]
},
{
front: "What does PDU stand for?",
back: "PDU stands for protocol data unit, the technical name for the group of bits being handled at a particular layer.",
tags: ["network-plus", "pdu", "osi"]
},
{
front: "What are the Layer 4 through Layer 1 PDU names?",
back: "Layer 4 uses a segment for TCP or a datagram for UDP; Layer 3 uses a packet; Layer 2 uses a frame; Layer 1 uses bits or a transmission.",
tags: ["network-plus", "pdu", "osi"]
},
{
front: "What is decapsulation?",
back: "Decapsulation is the reverse of encapsulation: the receiving host removes headers and the trailer in reverse order as the message moves up the OSI stack.",
tags: ["network-plus", "decapsulation", "osi"]
},
{
front: "At what layer does a switch examine a destination MAC address?",
back: "A switch processes the frame at the Data Link layer and examines the destination MAC address to decide which port should receive the frame.",
tags: ["network-plus", "switch", "mac", "osi"]
},
{
front: "At what layer does a router examine the destination IP address?",
back: "A router examines the destination IP address at the Network layer to determine the next node or path for the packet.",
tags: ["network-plus", "router", "ip", "osi"]
},
{
front: "What happens to a frame when a router forwards it to a different LAN?",
back: "The router removes the incoming Data Link header and trailer, examines the packet at Layer 3, then creates a new Data Link header and trailer appropriate for the next LAN.",
tags: ["network-plus", "router", "encapsulation", "osi"]
},
{
front: "What is the TCP/IP model described in the chapter?",
back: "It is a four-layer model with Application, Transport, Internet, and Link layers. The Internet layer corresponds to the OSI Network layer, and the Link layer combines the OSI Data Link and Physical layers.",
tags: ["network-plus", "tcp-ip", "models"]
},
{
front: "Which model does the course and CompTIA Network+ exam use for reference and troubleshooting?",
back: "The course and Network+ exam use the seven-layer OSI model, while the TCP/IP model is more commonly used to refer to protocols by layer.",
tags: ["network-plus", "osi", "tcp-ip"]
},
{
front: "What should a technician check first when using the OSI model to troubleshoot a general hardware-related problem?",
back: "The chapter recommends bottom-to-top troubleshooting for many hardware-related problems, starting with the Physical layer and eliminating obvious hardware issues such as loose cables or a failed NIC.",
tags: ["network-plus", "troubleshooting", "osi"]
},
{
front: "When might troubleshooting begin top-to-bottom through the OSI model?",
back: "When the problem is clearly software or application related, such as an invalid-password logon failure, it can make more sense to start at the Application layer and move downward.",
tags: ["network-plus", "troubleshooting", "osi"]
},
{
front: "What are the three fire suppression levels described in the chapter?",
back: "Building level, room level, and rack level. Rack-level protection is the most targeted because it focuses detection and suppression inside the cabinet holding network equipment.",
tags: ["network-plus", "safety", "fire-suppression"]
},
{
front: "Why can data centers use gas or foaming fire suppression instead of water?",
back: "The source notes that these agents can suppress fires without damaging sensitive electronic equipment. Gas agents can reduce oxygen levels or absorb heat, while FM-200 is described as leaving no residue and generating no toxic fumes.",
tags: ["network-plus", "safety", "data-center"]
},
{
front: "What type of fire extinguisher is required for an electrical fire?",
back: "A Class C fire extinguisher is used for electrical fires.",
tags: ["network-plus", "safety", "fire-extinguisher"]
},
{
front: "What is the purpose of an emergency power-off switch?",
back: "It provides a way to rapidly remove power during an emergency. The source warns not to use it unless truly necessary because improper shutdowns can be hard on computers and their data.",
tags: ["network-plus", "safety", "power"]
},
{
front: "What is a fail-open or fail-safe policy?",
back: "It is a design in which a security system permits access when the system fails. The rationale is often safety or ensuring that people are not harmed during an emergency.",
tags: ["network-plus", "safety", "fail-open"]
},
{
front: "What is a fail-close or fail-secure policy?",
back: "It is a design in which a security system denies access when it fails, prioritizing protection of private data or other resources even if access is unavailable during the failure.",
tags: ["network-plus", "security", "fail-close"]
},
{
front: "How does the fail-open versus fail-close choice apply to fire and security scenarios?",
back: "A door may fail open during a power outage to allow safe egress and firefighter access, while a firewall protecting sensitive customer data may fail close to block access until the system is restored.",
tags: ["network-plus", "fail-open", "fail-close"]
},
{
front: "Why can the terms open and close be confusing with electrical circuits?",
back: "In electrical circuits, an open circuit means the circuit is broken. Thus a circuit breaker that opens the circuit to protect against uncontrolled electricity is described as a fail-close system in the source's security terminology.",
tags: ["network-plus", "safety", "electrical"]
},
{
front: "What is an SDS?",
back: "An SDS, or safety data sheet, explains how to safely handle substances such as chemical solvents, respond to exposure, fight related fires, manage accidental releases, and dispose of the material. It was formerly called an MSDS.",
tags: ["network-plus", "sds", "safety"]
},
{
front: "What does OSHA regulate in the context of this chapter?",
back: "OSHA, the Occupational Safety and Health Administration, is the main federal agency charged with workplace safety and health and regulates electrical and tool safety practices.",
tags: ["network-plus", "osha", "safety"]
},
{
front: "What electrical safety step does OSHA require before working near covered electrical devices?",
back: "Electrical devices should be turned off and the electrical supply locked out before employees work near them, including equipment in data-center cabinets, racks, or panels.",
tags: ["network-plus", "osha", "lockout"]
},
{
front: "What is PPE and why is it used?",
back: "PPE means personal protective equipment. It is worn to protect the technician from workplace hazards, such as eye protection where dust or fumes are generated by power tools.",
tags: ["network-plus", "ppe", "safety"]
},
{
front: "What are important tool-safety practices from the chapter?",
back: "Keep tools in good condition, inspect them before use, store unused tools properly, use the correct tool, follow the manufacturer's instructions, and work only with tools you are trained and authorized to use.",
tags: ["network-plus", "tool-safety", "osha"]
},
{
front: "What lifting technique should be used for a heavy object?",
back: "Stand close with feet apart, bend the knees while keeping the back straight, lift with the legs rather than the back, keep the load close to the body, avoid twisting, and lower it by bending the knees.",
tags: ["network-plus", "safety", "lifting"]
},
{
front: "What is grounding?",
back: "Grounding connects a device directly to the earth so that, during a short circuit, electricity flows into the earth instead of traveling out of control through the device and back toward the power source.",
tags: ["network-plus", "grounding", "electrical-safety"]
},
{
front: "What is ESD?",
back: "ESD stands for electrostatic discharge, commonly called static electricity. It is a discharge caused when objects with different static charges come into contact.",
tags: ["network-plus", "esd", "static-electricity"]
},
{
front: "How much static electricity can a person discharge without seeing or feeling it, and how little can damage some components?",
back: "The chapter states that a person can discharge up to 1,500 volts without a visible spark or detectable shock, while some sensitive components can be damaged by as little as 10 volts.",
tags: ["network-plus", "esd", "hardware-safety"]
},
{
front: "What is the difference between catastrophic ESD failure and upset failure?",
back: "A catastrophic failure destroys a component beyond use. An upset failure can shorten component life and/or cause intermittent errors.",
tags: ["network-plus", "esd", "troubleshooting"]
},
{
front: "What is the preferred way to ground yourself before handling sensitive components?",
back: "Wear an ESD strap around the wrist clipped to a metallic part of the computer chassis. This eliminates ESD between you and the chassis and its components.",
tags: ["network-plus", "esd", "safety"]
},
{
front: "How should a sensitive electronic component be stored when not in use?",
back: "Store it inside an antistatic bag and do not place the component on top of the bag.",
tags: ["network-plus", "esd", "hardware-safety"]
},
{
front: "What are the seven steps in the Network+ troubleshooting model?",
back: "1) Identify the problem and its symptoms; 2) Establish a theory of probable cause; 3) Test the theory to determine the cause; 4) Establish a plan for resolving the problem; 5) Implement the solution or escalate; 6) Verify functionality and implement preventive measures; 7) Document findings, actions, and outcomes.",
tags: ["network-plus", "troubleshooting", "methodology"]
},
{
front: "What should you determine during Step 1 of troubleshooting?",
back: "Identify symptoms, question the user, determine what recently changed, establish the scope of the problem, and duplicate the problem when possible. Handle multiple problems individually.",
tags: ["network-plus", "troubleshooting", "step-1"]
},
{
front: "What does Step 2 of troubleshooting require?",
back: "Establish a theory of probable cause by making a best guess about the source of the problem, questioning obvious causes, looking for symptom patterns, and potentially working through the OSI layers.",
tags: ["network-plus", "troubleshooting", "step-2"]
},
{
front: "What is the divide-and-conquer approach to troubleshooting?",
back: "It means eliminating parts of the whole problem until the source is isolated, often by dividing symptoms or system sections and narrowing the search.",
tags: ["network-plus", "troubleshooting", "divide-conquer"]
},
{
front: "What happens in Step 3 of the troubleshooting process?",
back: "You test the theory of probable cause to determine whether it explains the problem. If the theory is wrong, try another theory or escalate the issue.",
tags: ["network-plus", "troubleshooting", "step-3"]
},
{
front: "What should you do if a troubleshooting theory cannot be confirmed?",
back: "Move on to another possible cause or escalate the problem to the next support tier when appropriate.",
tags: ["network-plus", "troubleshooting", "escalation"]
},
{
front: "What is the purpose of Step 4, establishing a plan?",
back: "Before implementing a fix, determine the scope and potential impact on users, applications, and data and follow required change-management procedures.",
tags: ["network-plus", "troubleshooting", "step-4"]
},
{
front: "What is change management?",
back: "Change management is a defined process for evaluating the need and cost of a change, planning how to make it with minimal disruption, and preparing a backup plan if it does not work as expected.",
tags: ["network-plus", "change-management", "troubleshooting"]
},
{
front: "What principle should guide the choice of a troubleshooting solution?",
back: "Choose the least invasive solution for the network.",
tags: ["network-plus", "troubleshooting", "best-practice"]
},
{
front: "What should be done before implementing a network change in Step 5?",
back: "Alert affected users, make necessary backups, save or record current settings, and keep notes so the change can be reversed or reviewed if necessary.",
tags: ["network-plus", "troubleshooting", "step-5"]
},
{
front: "Why should you make only one troubleshooting change at a time?",
back: "Changing one thing at a time lets you determine whether that specific change resolved the problem and prevents multiple simultaneous changes from creating new problems or obscuring the cause.",
tags: ["network-plus", "troubleshooting", "step-5"]
},
{
front: "When might a major network change be rolled out in stages?",
back: "For major changes, staged rollout lets a technician validate the change with a small number of users before affecting many users.",
tags: ["network-plus", "change-management", "troubleshooting"]
},
{
front: "What is escalation in troubleshooting?",
back: "Escalation transfers a complex or unresolved problem to someone with greater technical resources, authority, or a higher support tier.",
tags: ["network-plus", "troubleshooting", "escalation"]
},
{
front: "What is verified in Step 6?",
back: "The technician verifies full system functionality and may also have the user test the system. Preventive measures are considered to reduce the chance of recurrence.",
tags: ["network-plus", "troubleshooting", "step-6"]
},
{
front: "What is the purpose of preventive measures after a fix?",
back: "Preventive measures are intended to keep the same problem from reappearing, such as adding preventive maintenance or network monitoring when appropriate.",
tags: ["network-plus", "troubleshooting", "preventive-measures"]
},
{
front: "What is documented in Step 7?",
back: "Technicians document findings, actions, outcomes, and often details such as the requester, time of the call, symptoms, resolution, technician, time spent, lessons learned, and unique solutions.",
tags: ["network-plus", "troubleshooting", "documentation"]
},
{
front: "What is a knowledge base in troubleshooting?",
back: "A knowledge base is a collection of accumulated insights and solutions to problems encountered on a network that technicians can use in the future.",
tags: ["network-plus", "knowledge-base", "troubleshooting"]
},
{
front: "What is a ticket tracking system used for?",
back: "It is used to document reported problems and their resolutions, typically including requester details, timing, symptoms, resolution, technician information, and related notes.",
tags: ["network-plus", "ticketing", "troubleshooting"]
},
{
front: "In the chapter's wrongly routed cable example, what was the root cause?",
back: "The cable from the second-floor workstation had been punched down in a downstairs wiring closet instead of the intended second-floor closet. Once connected to a switch there, the PC received network connectivity.",
tags: ["network-plus", "troubleshooting", "cabling"]
},
{
front: "What troubleshooting pattern did the wrongly routed cable example demonstrate?",
back: "The technician progressively eliminated likely causes—wall connection, physical connections, OS settings, switch ports, and cables—then used a wire toner to trace the cabling and locate the misrouted cable.",
tags: ["network-plus", "troubleshooting", "wire-toner"]
},
{
front: "What is the purpose of a wire toner in the chapter's troubleshooting example?",
back: "A wire toner was used to trace building cabling by identifying the cable's path and looking for the tone at the other end.",
tags: ["network-plus", "wire-toner", "troubleshooting"]
}
]
});
