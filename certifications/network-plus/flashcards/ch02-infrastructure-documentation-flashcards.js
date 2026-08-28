window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 2: Infrastructure and Documentation",
items: [
{
front: "What is ANSI/TIA-568?",
back: "A family of structured cabling standards associated with TIA, EIA, and ANSI that describes ways to install networking media to maximize performance and minimize upkeep.",
tags: ["network-plus", "structured-cabling", "standards"]
},
{
front: "What topology does structured cabling assume?",
back: "A hierarchical design based on a star topology.",
tags: ["network-plus", "topology", "structured-cabling"]
},
{
front: "What is the relationship among TIA/EIA, EIA/TIA, and ANSI/TIA in the source?",
back: "They refer to the same family of structured cabling standards, with ANSI/TIA reflecting ANSI's role in accrediting the standards.",
tags: ["network-plus", "standards", "acronyms"]
},
{
front: "What is the physical hierarchy from an ISP connection to a workstation?",
back: "ISP -> EF -> Demarc -> MDF -> IDF -> Work Area.",
tags: ["network-plus", "structured-cabling", "hierarchy"]
},
{
front: "What is an EF (entrance facility)?",
back: "The location where an incoming network, such as the Internet, connects to the organization's network. It contains components that transition between an ISP-managed WAN or MAN and the customer's LAN or CAN.",
tags: ["network-plus", "ef", "structured-cabling"]
},
{
front: "What is a demarc?",
back: "The demarcation point where the ISP's network ends and the customer's network begins, dividing responsibility between the provider and organization.",
tags: ["network-plus", "demarc", "troubleshooting"]
},
{
front: "How is responsibility generally divided at the demarc?",
back: "The ISP is generally responsible for its network up to the demarc, while the organization is generally responsible for the customer side.",
tags: ["network-plus", "demarc", "responsibility"]
},
{
front: "What should a technician check when determining who is responsible for an ISP connection problem?",
back: "Determine which side of the demarc the affected equipment or connection is located on.",
tags: ["network-plus", "demarc", "troubleshooting"]
},
{
front: "What is an MDF?",
back: "The main distribution frame, the centralized point of interconnection for an organization's LAN, CAN, or WAN. It may also be called an equipment room or main cross connect.",
tags: ["network-plus", "mdf", "structured-cabling"]
},
{
front: "What can the term MDF refer to in practice?",
back: "Either the racks holding the network equipment or the room containing those racks and equipment.",
tags: ["network-plus", "mdf", "documentation"]
},
{
front: "What kinds of connections commonly branch from an MDF?",
back: "Ethernet connections to nearby work areas, large cable bundles to IDFs, and the incoming service-provider connection.",
tags: ["network-plus", "mdf", "backbone"]
},
{
front: "What equipment might be found in an MDF?",
back: "The demarc or an extension from it, a transceiver for the ISP signal, switches, routers, servers, fiber-optic media, and other main network equipment.",
tags: ["network-plus", "mdf", "equipment"]
},
{
front: "What is a data room?",
back: "An enclosed space that holds network equipment. It may also be called a telecommunications room or data closet.",
tags: ["network-plus", "data-room", "physical-security"]
},
{
front: "What physical considerations apply to a data room?",
back: "Size, equipment clearance, wall materials, physical security, cooling, ventilation, and maintaining a constant temperature.",
tags: ["network-plus", "data-room", "physical-installation"]
},
{
front: "Why do data rooms require cooling and ventilation?",
back: "Network equipment is sensitive to heat, so appropriate cooling and ventilation help maintain suitable operating temperatures.",
tags: ["network-plus", "cooling", "data-room"]
},
{
front: "What is a rack used for?",
back: "A rack holds network equipment such as servers, routers, switches, firewalls, patch panels, audiovisual equipment, and telephony equipment.",
tags: ["network-plus", "rack", "physical-installation"]
},
{
front: "What are common rack forms?",
back: "Two-post, four-post, six-post, open-frame, and enclosed racks.",
tags: ["network-plus", "rack"]
},
{
front: "What are rack ears?",
back: "Mounting hardware attached to equipment that helps secure the device to rack posts.",
tags: ["network-plus", "rack", "hardware"]
},
{
front: "What rack mounting-hole types are mentioned in the source?",
back: "Round or square holes, which may be threaded or nonthreaded. Square-hole racks are described as a newer approach that can allow bolt-free mounting.",
tags: ["network-plus", "rack", "mounting"]
},
{
front: "What are common ways racks can be mounted?",
back: "Wall-mounted, ceiling-mounted, freestanding on the floor, or bolted to the floor.",
tags: ["network-plus", "rack", "physical-installation"]
},
{
front: "What is the standard rack height given in the source?",
back: "42U, or about 6 feet.",
tags: ["network-plus", "rack", "dimensions"]
},
{
front: "How much vertical space is 1 RU?",
back: "1.75 inches.",
tags: ["network-plus", "rack", "dimensions"]
},
{
front: "How tall is a typical half-rack according to the source?",
back: "Usually 18U to 22U.",
tags: ["network-plus", "rack", "dimensions"]
},
{
front: "What standard rack width is given in the source?",
back: "19 inches, although 23-inch racks are also encountered.",
tags: ["network-plus", "rack", "dimensions"]
},
{
front: "How is rack depth treated in the source?",
back: "Rack depth varies considerably by manufacturer.",
tags: ["network-plus", "rack", "dimensions"]
},
{
front: "Why are KVM switches useful in racks?",
back: "They allow a single keyboard, video, and mouse console to access and configure multiple devices instead of requiring a separate console for each device.",
tags: ["network-plus", "kvm", "rack"]
},
{
front: "What is VoIP?",
back: "Voice over IP, or IP telephony, which uses a public or private network to carry voice signals using TCP/IP protocols.",
tags: ["network-plus", "voip", "telephony"]
},
{
front: "What does a voice gateway do?",
back: "It converts analog telephone signals into IP data and can convert VoIP data from an internal IP network into signals that can travel over analog telephone lines.",
tags: ["network-plus", "voip", "voice-gateway"]
},
{
front: "Which application-layer signaling protocol is identified for voice gateways?",
back: "SIP, or Session Initiation Protocol, used to initiate and maintain connections.",
tags: ["network-plus", "sip", "voip"]
},
{
front: "What is a VoIP PBX?",
back: "A dedicated telephone switch or virtual switching device that manages private organizational calls and call connections leaving the network through a VoIP gateway.",
tags: ["network-plus", "voip", "pbx"]
},
{
front: "What is an IDF?",
back: "The intermediate distribution frame, which provides an intermediate connection between the MDF and end-user equipment on each floor and in each building.",
tags: ["network-plus", "idf", "structured-cabling"]
},
{
front: "How many IDFs per floor does the source say ANSI/TIA standards specify at minimum?",
back: "At least one IDF per floor, although large organizations may use several.",
tags: ["network-plus", "idf", "standards"]
},
{
front: "What topology results when an MDF connects to multiple IDFs and those IDFs connect to workstations?",
back: "An extended star topology.",
tags: ["network-plus", "idf", "topology"]
},
{
front: "What does a work area include?",
back: "Workstations, printers, other networked devices, patch cables, wall jacks, and cabling connecting those devices to a data room.",
tags: ["network-plus", "work-area", "structured-cabling"]
},
{
front: "What does the source say about wall-jack outlets?",
back: "ANSI/TIA standards call for each wall jack to contain at least one voice and one data outlet, although actual environments can vary.",
tags: ["network-plus", "wall-jack", "standards"]
},
{
front: "What factors should be considered when selecting and installing a rack?",
back: "Physical structure, dimensions, equipment mounting, access, airflow, power distribution, cooling, cable management, and the number and type of devices.",
tags: ["network-plus", "rack", "physical-installation"]
},
{
front: "What is a hot aisle/cold aisle arrangement?",
back: "A data-room layout that directs cool air toward rack fronts and carries heated exhaust away through hot aisles to reduce heat buildup.",
tags: ["network-plus", "cooling", "hot-aisle"]
},
{
front: "What is a port-side intake switch?",
back: "A switch whose ports face the cold aisle, typically the front of the rack, and that draws in cooler air.",
tags: ["network-plus", "airflow", "switches"]
},
{
front: "What is a port-side exhaust switch?",
back: "A switch whose ports face the hot aisle, typically the back of the rack, and that exhausts warm air through the port side.",
tags: ["network-plus", "airflow", "switches"]
},
{
front: "What is a patch cable?",
back: "A relatively short cable, usually 3 to 25 feet, with connectors at both ends, commonly used to connect a networked device to a wall jack.",
tags: ["network-plus", "patch-cable", "cabling"]
},
{
front: "What is horizontal cabling?",
back: "Cabling that connects workstations to the closest data room and switches located there.",
tags: ["network-plus", "horizontal-cabling", "cabling"]
},
{
front: "What is the maximum horizontal-cabling distance in the source?",
back: "100 meters total.",
tags: ["network-plus", "horizontal-cabling", "numbers"]
},
{
front: "How is the 100 m horizontal-cabling limit divided?",
back: "Up to 90 m between network equipment in the data room and the wall jack, plus up to 10 m between the wall jack and the workstation.",
tags: ["network-plus", "horizontal-cabling", "numbers"]
},
{
front: "What is backbone cabling?",
back: "Cabling or wireless links that interconnect the EF and MDF, MDF and IDFs, and floors or buildings through vertical or other cross-connect paths.",
tags: ["network-plus", "backbone", "cabling"]
},
{
front: "What is a vertical cross connect?",
back: "A connection that runs between floors, such as between an MDF and IDF or between two IDFs.",
tags: ["network-plus", "backbone", "cross-connect"]
},
{
front: "What cable is often used for large modern backbones?",
back: "Fiber-optic cable.",
tags: ["network-plus", "backbone", "fiber"]
},
{
front: "Which three cabling types does the source recognize for horizontal cabling?",
back: "UTP, STP, and fiber-optic cable.",
tags: ["network-plus", "cabling", "horizontal-cabling"]
},
{
front: "What is UTP?",
back: "Unshielded twisted pair, a copper-based cable containing insulated twisted-pair wires inside a plastic sheath and transmitting electrical signals.",
tags: ["network-plus", "utp", "cabling"]
},
{
front: "What is STP?",
back: "Shielded twisted pair, a copper-based twisted-pair cable with metallic shielding around individual pairs and/or around all pairs.",
tags: ["network-plus", "stp", "cabling"]
},
{
front: "What are the two fiber types identified in the source?",
back: "SMF (single-mode fiber) and MMF (multimode fiber).",
tags: ["network-plus", "fiber", "smf", "mmf"]
},
{
front: "How does copper cabling transmit data according to the source?",
back: "Using electrical signals.",
tags: ["network-plus", "cabling", "copper"]
},
{
front: "How does fiber-optic cabling transmit data?",
back: "Using pulses of light from a laser or LED through glass or plastic fibers.",
tags: ["network-plus", "fiber", "transmission"]
},
{
front: "What is cable management?",
back: "Organizing cables to support the highest potential performance of the cables and connected hardware while minimizing damage, injury, and troubleshooting difficulty.",
tags: ["network-plus", "cable-management"]
},
{
front: "How does good cable management help technicians?",
back: "It helps identify cable purpose, prevent damage and accidents, avoid tripping hazards, troubleshoot problems, and maintain an organized installation.",
tags: ["network-plus", "cable-management"]
},
{
front: "How much exposed twisted-pair cable should remain before termination?",
back: "No more than 1 inch.",
tags: ["network-plus", "termination", "numbers"]
},
{
front: "Why should excessive exposed conductor be avoided at twisted-pair terminations?",
back: "It increases the possibility of crosstalk, or interference between wires.",
tags: ["network-plus", "crosstalk", "termination"]
},
{
front: "What is bend radius?",
back: "The radius of the maximum safe curve or loop for a cable without impairing data transmission.",
tags: ["network-plus", "bend-radius", "cabling"]
},
{
front: "What bend-radius guideline does the source give for twisted-pair cable?",
back: "A bend radius equal to or greater than four times the cable diameter.",
tags: ["network-plus", "bend-radius", "numbers"]
},
{
front: "Why should continuity be verified for each installed cable segment?",
back: "Testing individual segments confirms reliable transmission and makes troubleshooting easier than diagnosing faults across multiple long cable runs.",
tags: ["network-plus", "cabling", "testing"]
},
{
front: "Why should cable ties not be cinched too tightly?",
back: "Excessive cinching can squeeze the cable jacket and contribute to difficult-to-diagnose data errors.",
tags: ["network-plus", "cable-management", "troubleshooting"]
},
{
front: "How can exposed cabling be protected from rolling chairs and foot traffic?",
back: "Use a cable protector or cord cover, and where possible route cable through conduit.",
tags: ["network-plus", "cable-management", "physical-security"]
},
{
front: "What is EMI?",
back: "Electromagnetic interference, which can introduce noise that interferes with network signals.",
tags: ["network-plus", "emi", "cabling"]
},
{
front: "How far should cable be kept from fluorescent lights or other listed EMI sources?",
back: "At least 3 feet.",
tags: ["network-plus", "emi", "numbers"]
},
{
front: "What are examples of EMI sources listed in the source?",
back: "Motors, power lines, televisions, copiers, fluorescent lights, and other sources of electrical activity.",
tags: ["network-plus", "emi", "cabling"]
},
{
front: "What is a plenum?",
back: "The area above a ceiling tile or below subflooring where air can circulate.",
tags: ["network-plus", "plenum", "cabling"]
},
{
front: "What kind of cable should be used in a plenum?",
back: "Plenum-rated cable installed according to applicable local electrical codes.",
tags: ["network-plus", "plenum", "cabling"]
},
{
front: "What distinguishes plenum-rated cable from regular PVC cable?",
back: "Plenum-rated cable uses a flame-resistant jacket that produces less smoke than regular PVC cable.",
tags: ["network-plus", "plenum", "safety"]
},
{
front: "What should technicians do with cable runs that are installed too tightly?",
back: "Leave some slack because overly tight runs can create connectivity and transmission problems.",
tags: ["network-plus", "cabling", "best-practices"]
},
{
front: "What is a patch panel?",
back: "A wall- or rack-mounted panel of network connections that provides a central termination point and organization point for converging patch cables.",
tags: ["network-plus", "patch-panel", "cabling"]
},
{
front: "Why is a patch panel valuable if it does not change the transmitted data?",
back: "It organizes lines and makes patch cables easy to swap when devices are moved or changed.",
tags: ["network-plus", "patch-panel", "cable-management"]
},
{
front: "What should cabling documentation include?",
back: "Cable locations, installation dates, cable lengths, and cable grades, updated whenever the network changes.",
tags: ["network-plus", "documentation", "cabling"]
},
{
front: "What should be explicitly labeled in a cable plant?",
back: "Data jacks, ports, patch panels, switches, connectors, and circuits.",
tags: ["network-plus", "labeling", "cabling"]
},
{
front: "Why should cable color not replace explicit labeling?",
back: "Color can represent cable purpose, but the color scheme must be documented and technicians should not rely on color alone.",
tags: ["network-plus", "labeling", "documentation"]
},
{
front: "What can environmental monitoring systems detect in a data room?",
back: "Temperature, humidity, airflow, secure-door status, power-supply problems, light conditions, and sound conditions.",
tags: ["network-plus", "environment", "monitoring"]
},
{
front: "How can environmental sensors notify technicians?",
back: "They can send alerts by text or email.",
tags: ["network-plus", "environment", "monitoring"]
},
{
front: "What is an ICS?",
back: "An industrial control system that acquires real-time data from a physical system and manages that system or presents data to humans for monitoring and management.",
tags: ["network-plus", "ics", "ot"]
},
{
front: "What systems can an ICS control or monitor according to the source?",
back: "HVAC, lighting, power supply, water treatment, and other environmental or physical systems.",
tags: ["network-plus", "ics", "physical-systems"]
},
{
front: "What is SCADA?",
back: "Supervisory control and data acquisition, described as a more complex type of ICS that serves as an interface for a widespread control system.",
tags: ["network-plus", "scada", "ics"]
},
{
front: "What is OT?",
back: "Operational technology: hardware and software that directly interacts with physical infrastructure and devices through monitoring and control.",
tags: ["network-plus", "ot", "ics"]
},
{
front: "What is the source's relationship among SCADA, ICS, and OT?",
back: "SCADA ⊂ ICS ⊂ OT.",
tags: ["network-plus", "scada", "ics", "ot"]
},
{
front: "Why are SCADA and other OT systems often isolated on separate network segments?",
back: "For security, they are often isolated from sensitive data resources or Internet access.",
tags: ["network-plus", "scada", "ot", "security"]
},
{
front: "How can environmental alarms be configured?",
back: "They can escalate as the severity of a condition increases.",
tags: ["network-plus", "monitoring", "environment"]
},
{
front: "Why are environmental trends useful?",
back: "Recorded environmental data lets technicians review recent conditions and identify patterns of fluctuation.",
tags: ["network-plus", "monitoring", "trends"]
},
{
front: "How should data rooms be physically secured?",
back: "They should be behind locked doors with access limited to appropriate IT personnel.",
tags: ["network-plus", "physical-security", "data-room"]
},
{
front: "Why are security cameras used near data-room entrances?",
back: "They can deter tampering and provide evidence or information after a break-in.",
tags: ["network-plus", "physical-security", "cameras"]
},
{
front: "How are security cameras typically treated as network devices?",
back: "They are networked devices but are typically isolated in a secure network segment.",
tags: ["network-plus", "security", "network-segmentation"]
},
{
front: "What is network documentation intended to protect?",
back: "The information and knowledge a network technician accumulates while working on a network.",
tags: ["network-plus", "documentation"]
},
{
front: "What are major benefits of good network documentation?",
back: "It preserves knowledge, improves communication, speeds troubleshooting, and makes information easier to find when similar problems occur.",
tags: ["network-plus", "documentation"]
},
{
front: "What is a network diagram?",
back: "A graphical representation of network devices and their connections.",
tags: ["network-plus", "network-diagrams"]
},
{
front: "What information can a network diagram show?",
back: "Logical topology, IP address pools and reservations, device names, transmission media, physical layout, floor plans, and rack layouts.",
tags: ["network-plus", "network-diagrams", "documentation"]
},
{
front: "What does a Layer 1 network diagram emphasize?",
back: "Physical or electrical specifications and transmission media, such as STP cable or wireless transmission.",
tags: ["network-plus", "osi", "layer1"]
},
{
front: "What does a Layer 2 network diagram emphasize?",
back: "Devices that communicate within a LAN, potentially including MAC addresses and Layer 2 connectivity through devices such as switches.",
tags: ["network-plus", "osi", "layer2"]
},
{
front: "What does a Layer 3 network diagram emphasize?",
back: "IP address spaces, routing between networks, and subnets within LANs.",
tags: ["network-plus", "osi", "layer3"]
},
{
front: "What is network mapping?",
back: "The process of discovering and identifying devices on a network; a network map shows logical connections and addressing information.",
tags: ["network-plus", "network-mapping"]
},
{
front: "What is Nmap?",
back: "Network Mapper, a network-mapping tool that can discover hosts, open ports, services, and MAC addresses.",
tags: ["network-plus", "nmap", "network-mapping"]
},
{
front: "What command invokes Nmap?",
back: "The `nmap` command-line executable.",
tags: ["network-plus", "nmap", "commands"]
},
{
front: "What is Zenmap?",
back: "A graphical interface for Nmap.",
tags: ["network-plus", "nmap", "zenmap"]
},
{
front: "What network tools can be used to create diagrams according to the source?",
back: "Examples include Edraw, SmartDraw, Gliffy, Microsoft Visio, and Network Notepad.",
tags: ["network-plus", "diagramming", "tools"]
},
{
front: "What is a rack diagram?",
back: "A diagram showing devices stacked in a rack system, typically drawn to scale.",
tags: ["network-plus", "rack-diagram", "documentation"]
},
{
front: "What are rack diagrams useful for?",
back: "Planning rack installations, tracking equipment installed in a rack, and troubleshooting rack equipment.",
tags: ["network-plus", "rack-diagram", "troubleshooting"]
},
{
front: "What is an SOP?",
back: "A standard operating procedure used so employees perform recurring complex tasks consistently.",
tags: ["network-plus", "sop", "processes"]
},
{
front: "What factors should determine the format of network documentation?",
back: "Company needs, network complexity, available resources, intended audience, and technician experience and training.",
tags: ["network-plus", "documentation", "processes"]
},
{
front: "What software information should be included in network documentation?",
back: "Operating systems, configurations, applications, Active Directory information, product keys, licenses, leases, licensing restrictions, storage and run locations, departments using the software, and dependent client/server systems.",
tags: ["network-plus", "software", "documentation"]
},
{
front: "What can an EULA define?",
back: "Who may use an application, how long it may be used, how many users may install or access it, whether it may be provided over a network or Internet, and how many backup copies may be stored.",
tags: ["network-plus", "eula", "licensing"]
},
{
front: "Why should password documentation be highly secure but accessible to more than one appropriate person?",
back: "It must be protected from unauthorized access while ensuring the organization is not locked out if one network administrator becomes unavailable.",
tags: ["network-plus", "passwords", "documentation"]
},
{
front: "What tools does the source mention for securely storing credentials?",
back: "Password managers such as KeePass or Bitwarden.",
tags: ["network-plus", "password-management", "security"]
},
{
front: "How should documentation be kept current and usable?",
back: "Store it in an easily updated and searchable central system, have others review it, have new technicians use it, collect feedback, and update it regularly.",
tags: ["network-plus", "documentation", "processes"]
},
{
front: "What is inventory management?",
back: "The monitoring and maintenance of network assets, including additions, maintenance, removal, and disposal of outdated assets.",
tags: ["network-plus", "inventory", "asset-management"]
},
{
front: "Why is inventory management valuable during a security flaw?",
back: "It helps determine how many affected devices exist and where those devices are located.",
tags: ["network-plus", "inventory", "security"]
},
{
front: "What information should an inventory record include?",
back: "Device identification, model number, serial number, location, warranty information, technical support contact information, software version, vendor, and licensing information.",
tags: ["network-plus", "inventory", "documentation"]
},
{
front: "What is the recommended general direction for systematic device naming?",
back: "Top-down or outside-in, moving from large-scale information toward details such as building -> floor -> data room -> rack.",
tags: ["network-plus", "naming", "documentation"]
},
{
front: "What security problem can overly descriptive device names create?",
back: "They can reveal unnecessary information about the location of especially sensitive systems or data and therefore provide useful information to attackers.",
tags: ["network-plus", "naming", "security"]
},
{
front: "What is an RFP?",
back: "A request for proposal sent to vendors asking them to submit a proposal for a product or service.",
tags: ["network-plus", "rfp", "business-documents"]
},
{
front: "What is an MOU?",
back: "A memorandum of understanding documenting the intentions of two or more parties to enter a binding agreement or contract. It is generally less formal than the final agreement and usually is not legally binding.",
tags: ["network-plus", "mou", "business-documents"]
},
{
front: "What is an MSA?",
back: "A master service agreement, a contract defining the terms of future contracts between parties.",
tags: ["network-plus", "msa", "business-documents"]
},
{
front: "What is an SOW?",
back: "A statement of work that documents the detailed work required for a particular project, including tasks, deliverables, standards, payment schedule, and timeline.",
tags: ["network-plus", "sow", "business-documents"]
},
{
front: "What is an SLA?",
back: "A service-level agreement that defines measurable service expectations and related terms, such as uptime guarantees and compensation for excessive outages.",
tags: ["network-plus", "sla", "business-documents"]
},
{
front: "What does MTBF represent in reliability planning?",
back: "Mean time between failures, the average amount of time expected to pass before the next failure for a device type.",
tags: ["network-plus", "mtbf", "reliability"]
},
{
front: "What does MTTR represent in reliability planning?",
back: "Mean time to repair, the average amount of time required to repair a failed device.",
tags: ["network-plus", "mttr", "reliability"]
},
{
front: "What is a SPoF?",
back: "A single point of failure: a component, service, or connection whose failure can disrupt the system because no redundant alternative is available.",
tags: ["network-plus", "spof", "reliability"]
},
{
front: "How does redundancy improve network availability?",
back: "It provides multiple components, services, or connections in the same role so another can take over if one fails, reducing single points of failure.",
tags: ["network-plus", "redundancy", "availability"]
},
{
front: "What trade-off does redundancy introduce?",
back: "It improves availability but increases cost.",
tags: ["network-plus", "redundancy", "availability"]
},
{
front: "What is automatic failover?",
back: "A redundant component immediately assumes the duties of a failed component without manual intervention.",
tags: ["network-plus", "failover", "redundancy"]
},
{
front: "What is a hot spare?",
back: "A duplicate component that is already installed and can immediately assume the failed component's functions.",
tags: ["network-plus", "hot-spare", "redundancy"]
},
{
front: "What is a cold spare?",
back: "A duplicate component that is not installed; replacing the failed component requires an interruption of service.",
tags: ["network-plus", "cold-spare", "redundancy"]
},
{
front: "What is the system life cycle?",
back: "The process of designing, implementing, and maintaining systems through a sequence of phases used to continuously improve the network.",
tags: ["network-plus", "lifecycle", "asset-management"]
},
{
front: "What are the six system life-cycle phases in the source?",
back: "Requirements analysis, design planning, development and testing, implementation, documentation and maintenance, and evaluation.",
tags: ["network-plus", "lifecycle", "processes"]
},
{
front: "What happens during requirements analysis?",
back: "Network requirements and business needs are identified.",
tags: ["network-plus", "lifecycle", "requirements"]
},
{
front: "What happens during design planning?",
back: "Broad goals are developed into detailed design decisions.",
tags: ["network-plus", "lifecycle", "design"]
},
{
front: "What happens during development and testing?",
back: "Equipment is purchased and tested before deployment.",
tags: ["network-plus", "lifecycle", "testing"]
},
{
front: "What happens during implementation?",
back: "Equipment is deployed or replaced and testing continues until a new stable baseline is achieved.",
tags: ["network-plus", "lifecycle", "implementation"]
},
{
front: "What happens during documentation and maintenance?",
back: "The network is monitored, problems are detected and addressed, and documentation is kept updated.",
tags: ["network-plus", "lifecycle", "maintenance"]
},
{
front: "What happens during evaluation?",
back: "Cost-benefit analysis is performed, equipment approaching end of life is identified, and decisions are made about discarding, replacing, or upgrading it.",
tags: ["network-plus", "lifecycle", "evaluation"]
},
{
front: "What is configuration management?",
back: "The process of efficiently and effectively managing system configurations to maintain a desired state and track configuration changes over time.",
tags: ["network-plus", "configuration-management"]
},
{
front: "What can a system configuration contain?",
back: "Values that determine how the system operates, such as IP addresses, user accounts, firewall rules, access permissions, and user roles.",
tags: ["network-plus", "configuration-management", "configuration"]
},
{
front: "What are five goals of effective configuration management?",
back: "Keep systems functioning as intended, maintain compliance, monitor for unintended changes, limit configuration permissions, and track who made which changes and when.",
tags: ["network-plus", "configuration-management"]
},
{
front: "What is a baseline configuration in configuration management?",
back: "The beginning stable state in which a system functions effectively in production and the known reference used for later changes.",
tags: ["network-plus", "baseline", "configuration-management"]
},
{
front: "What does discovery mean in configuration management?",
back: "Taking inventory of existing systems and their current configurations before establishing and storing the baseline.",
tags: ["network-plus", "configuration-management", "discovery"]
},
{
front: "What does version control provide for network configurations?",
back: "Historical configurations, newer releases, rollback to prior versions, and an audit trail of changes.",
tags: ["network-plus", "version-control", "configuration-management"]
},
{
front: "What does configuration monitoring evaluate?",
back: "System performance and compliance with applicable standards and requirements.",
tags: ["network-plus", "configuration-monitoring"]
},
{
front: "What is configuration drift?",
back: "The gradual movement away from the intended configuration as small changes accumulate, potentially without proper approval or documentation.",
tags: ["network-plus", "configuration-drift", "configuration-management"]
},
{
front: "What is a golden configuration?",
back: "A configuration optimized for compliance and performance that can serve as the comparison standard for similar systems.",
tags: ["network-plus", "golden-configuration", "configuration-management"]
},
{
front: "How can automation help configuration management?",
back: "It can reduce repetitive human work and consistently identify configurations, monitor changes, apply patches or updates, adapt configurations, and perform remediation.",
tags: ["network-plus", "automation", "configuration-management"]
},
{
front: "What is configuration auditing?",
back: "A review of historical changes to determine whether changes were evaluated and approved, produced the desired effect, maintained compliance, and kept documentation and backups current.",
tags: ["network-plus", "auditing", "configuration-management"]
},
{
front: "What is EOS?",
back: "End-of-support, the date when support for an older application, operating system, firmware, or hardware system is withdrawn.",
tags: ["network-plus", "eos", "lifecycle"]
},
{
front: "What usually happens to security updates and bug fixes after EOS?",
back: "The product generally no longer receives them, making continued production use unsafe according to the source.",
tags: ["network-plus", "eos", "security"]
},
{
front: "What is EOL?",
back: "End-of-life, which may refer to the same point as EOS or an earlier point when a product is no longer sold or produced while support continues.",
tags: ["network-plus", "eol", "lifecycle"]
},
{
front: "Why should decommissioning be planned before EOS?",
back: "Because after support ends, security updates and bug fixes generally stop, increasing the risk of continued production use.",
tags: ["network-plus", "eos", "decommissioning"]
},
{
front: "What is decommissioning?",
back: "The process of removing a system from production, which can apply to a hard drive, network segment, or entire data center.",
tags: ["network-plus", "decommissioning", "lifecycle"]
},
{
front: "What is the first concern when decommissioning a system?",
back: "Identify dependencies and determine whether users or business processes still rely on the system.",
tags: ["network-plus", "decommissioning", "dependencies"]
},
{
front: "What backup-related steps are part of decommissioning?",
back: "Back up required data, test the backups, and document the backups before removing the system.",
tags: ["network-plus", "decommissioning", "backup"]
},
{
front: "Why might decommissioning be performed in stages?",
back: "To reduce unintended consequences when removing systems from production.",
tags: ["network-plus", "decommissioning", "risk-management"]
},
{
front: "What is change management intended to control?",
back: "Changes to network systems and resources so they are properly planned, approved, implemented, tested, documented, and reversible when necessary.",
tags: ["network-plus", "change-management"]
},
{
front: "Why can poorly managed changes be dangerous?",
back: "Even a simple change can cause lengthy downtime if it is poorly planned or implemented.",
tags: ["network-plus", "change-management", "downtime"]
},
{
front: "Why should users receive advance notice of planned changes?",
back: "So they can plan around periods when network resources or services will be unavailable.",
tags: ["network-plus", "change-management", "notification"]
},
{
front: "What is an installation as a software change?",
back: "Introducing new software and integrating it with relevant network resources.",
tags: ["network-plus", "software-changes", "installation"]
},
{
front: "What is a patch?",
back: "A correction, improvement, or enhancement that can fix bugs, close vulnerabilities, or add minor enhancements while most of the code remains unchanged.",
tags: ["network-plus", "patch", "software-changes"]
},
{
front: "What is patch management?",
back: "Monitoring new patches, testing them for networked devices, and installing them.",
tags: ["network-plus", "patch-management", "change-management"]
},
{
front: "What is an upgrade?",
back: "A major software change that enhances functionality and features while also correcting bugs and vulnerabilities.",
tags: ["network-plus", "upgrade", "software-changes"]
},
{
front: "What is a rollback?",
back: "Reverting software to a previous version after an attempted patch or upgrade fails.",
tags: ["network-plus", "rollback", "change-management"]
},
{
front: "What risks can firmware updates introduce?",
back: "They can remove existing features or create compatibility problems even when they improve functionality.",
tags: ["network-plus", "firmware", "change-management"]
},
{
front: "What are the core firmware-management practices from the source?",
back: "Obtain the update from the manufacturer, confirm the exact correct update, test before deployment, test afterward, document effects, and balance risks against benefits.",
tags: ["network-plus", "firmware", "best-practices"]
},
{
front: "What is a test environment for change management?",
back: "A small network segmented from production that can contain physical test beds, specialized hardware, or virtual/cloud devices for validating changes and reversal procedures.",
tags: ["network-plus", "change-management", "testing"]
},
{
front: "Why is a test environment separated from production?",
back: "To determine compatibility and reversal procedures without exposing the production network to the same change risk.",
tags: ["network-plus", "change-management", "testing"]
},
{
front: "What does determining scope mean during a change?",
back: "Deciding which users, segments, or devices are affected and whether distribution is centralized or performed machine by machine.",
tags: ["network-plus", "change-management", "scope"]
},
{
front: "When should a planned network change normally occur?",
back: "During an off-hours maintenance window unless the change is an emergency.",
tags: ["network-plus", "change-management", "maintenance-window"]
},
{
front: "Who should be notified before a maintenance window?",
back: "System administrators, help desk staff, and affected users, with reminders near the start of the window.",
tags: ["network-plus", "change-management", "notification"]
},
{
front: "What configuration should be backed up before a change?",
back: "The current configuration, including router, switch, and server operating-system or firmware configurations as applicable.",
tags: ["network-plus", "change-management", "backup"]
},
{
front: "What does a usability test evaluate after implementation?",
back: "It has a typical user exercise the system to verify usability and normal operation.",
tags: ["network-plus", "change-management", "testing"]
},
{
front: "What is a stress test?",
back: "A test that subjects a system to a higher load than normal.",
tags: ["network-plus", "change-management", "testing"]
},
{
front: "What decision should be made after testing a change in production?",
back: "Determine whether to keep the change or roll it back based on the results.",
tags: ["network-plus", "change-management", "rollback"]
},
{
front: "What should happen if a change is unsuccessful?",
back: "Revert according to the rollback plan and notify affected personnel of the completion and reason for the rollback.",
tags: ["network-plus", "change-management", "rollback"]
},
{
front: "What should happen after a successful change?",
back: "Reenable access as appropriate, notify affected personnel, and record the change in the change-management system.",
tags: ["network-plus", "change-management", "documentation"]
},
{
front: "What should happen if a maintenance-window overrun is expected?",
back: "Inform technical staff and users about the anticipated delay and what they should expect.",
tags: ["network-plus", "maintenance-window", "communication"]
},
{
front: "What are the four rollback approaches summarized for different software upgrade types?",
back: "Use the patch uninstall utility for an OS patch; uninstall or reinstall the previous client version for a client upgrade; uninstall or reinstall the previous shared application for a shared upgrade; restore a full system backup for an OS upgrade, with OS uninstall as a last resort.",
tags: ["network-plus", "rollback", "software"]
},
{
front: "Why should replaced components sometimes be retained temporarily?",
back: "An old component may need to be reinstalled or referenced later, especially when it is the organization's only example of that component.",
tags: ["network-plus", "change-management", "hardware"]
},
{
front: "What general principles apply to hardware, software, network, environmental, and documentation changes?",
back: "Use proper channels, minimize business impact, plan thoroughly, and document each change throughout the process.",
tags: ["network-plus", "change-management", "processes"]
},
{
front: "What is a project in the context of change management?",
back: "A technical effort with a defined beginning and ending.",
tags: ["network-plus", "project-management"]
},
{
front: "What does project management control?",
back: "A desired outcome within planned project scope, scheduled time, and budgeted cost.",
tags: ["network-plus", "project-management"]
},
{
front: "Why do larger organizations generally require more change documentation?",
back: "Formal processes protect the person making the change, users, managers, and the organization while reducing unnecessary disruption and individual blame.",
tags: ["network-plus", "change-management", "documentation"]
},
{
front: "What should a change request identify about authorization?",
back: "The person submitting the request and the person authorizing it, which may be different depending on the system.",
tags: ["network-plus", "change-management", "change-request"]
},
{
front: "What factors generally influence the complexity of change approval?",
back: "Cost, time involved, number of users affected, potential productivity risk, and difficulty of rollback.",
tags: ["network-plus", "change-management", "approval"]
},
{
front: "What is the role of a change coordinator?",
back: "Coordinating tasks such as user training, departments, notification timing, authorized downtime, management communication about problems, and budget.",
tags: ["network-plus", "change-management", "coordination"]
},
{
front: "What additional documentation may accompany a major change?",
back: "Testing documentation, test data and scenarios, test hardware or software, implementation procedures, vendor documentation and contacts, configuration-backup locations, and rollback-backup locations.",
tags: ["network-plus", "change-management", "documentation"]
},
{
front: "What network documentation should be updated after a major change?",
back: "Network configuration, IP address utilization, network additions, and physical location changes.",
tags: ["network-plus", "documentation", "change-management"]
},
{
front: "What happens when a formal change is closed?",
back: "After implementation and testing succeed and users have time to settle into the change, the change is formally closed, often followed by a debriefing and lessons learned.",
tags: ["network-plus", "change-management", "closure"]
},
{
front: "What is the key reliability distinction between MTBF and MTTR?",
back: "MTBF describes expected time between failures, while MTTR describes average time to repair after a failure.",
tags: ["network-plus", "mtbf", "mttr"]
},
{
front: "What is the key relationship among baseline, SSOT, version control, monitoring, and auditing?",
back: "The baseline provides the known stable state, SSOT stores configuration information centrally, version control tracks changes, monitoring checks the current state, and auditing reviews historical changes and compliance.",
tags: ["network-plus", "configuration-management", "workflow"]
},
{
front: "What is the key physical-installation relationship to memorize for horizontal cabling?",
back: "100 m maximum = 90 m fixed horizontal cabling + 10 m workstation connection.",
tags: ["network-plus", "cabling", "numbers"]
},
{
front: "What is the key infrastructure relationship to memorize for structured cabling?",
back: "ISP -> EF -> Demarc -> MDF -> IDF -> Work Area.",
tags: ["network-plus", "structured-cabling", "hierarchy"]
},
{
front: "What is the key lifecycle sequence for retiring a system?",
back: "Plan before EOS or EOL, assess dependencies, document the system, back up and test data, schedule the window, notify affected people, and decommission, using stages when appropriate.",
tags: ["network-plus", "decommissioning", "lifecycle"]
},
{
front: "What is the key change-management sequence in the source?",
back: "Request -> Approval -> Coordination -> Documentation -> Maintenance Window/Implementation -> Testing -> Rollback if necessary -> Notification -> Record -> Close.",
tags: ["network-plus", "change-management", "workflow"]
}
]
});
