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
front: "What should a technician check when determining who is responsible for an ISP connection problem?",
back: "Determine which side of the demarc the affected equipment or connection is located on.",
tags: ["network-plus", "demarc", "troubleshooting"]
},
{
front: "What is an MDF?",
back: "The main distribution frame: the centralized interconnection point for an organization's LAN, CAN, or WAN. It may also be called an equipment room or main cross-connect.",
tags: ["network-plus", "mdf", "structured-cabling"]
},
{
front: "What connections commonly branch from an MDF?",
back: "Ethernet connections to nearby work areas, large cable bundles to IDFs, and the incoming service-provider connection.",
tags: ["network-plus", "mdf", "backbone"]
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
back: "An enclosed space that holds network equipment, also called a telecommunications room or data closet.",
tags: ["network-plus", "data-room", "physical-security"]
},
{
front: "What physical considerations apply to a data room?",
back: "Size, equipment clearance, wall materials, physical security, cooling, ventilation, and maintaining a constant temperature.",
tags: ["network-plus", "data-room", "physical-installation"]
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
front: "What are common ways racks can be mounted?",
back: "Wall-mounted, ceiling-mounted, freestanding on the floor, or bolted to the floor.",
tags: ["network-plus", "rack", "physical-installation"]
},



{
front: "What standard rack width is given in the source?",
back: "19 inches, although 23-inch racks are also encountered.",
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
front: "What is cable management?",
back: "Organizing cables to support the highest potential performance of the cables and connected hardware while minimizing damage, injury, and troubleshooting difficulty.",
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
back: "Electromagnetic interference: noise from electrical activity that can interfere with network signals.",
tags: ["network-plus", "emi", "cabling"]
},
{
front: "What are examples of EMI sources?",
back: "Motors, power lines, televisions, copiers, fluorescent lights, and other sources of electrical activity.",
tags: ["network-plus", "emi", "cabling"]
},
{
front: "How far should cable be kept from fluorescent lights or other listed EMI sources?",
back: "At least 3 feet.",
tags: ["network-plus", "emi", "numbers"]
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
front: "What is Nmap?",
back: "Network Mapper, a network-mapping tool that can discover hosts, open ports, services, and MAC addresses.",
tags: ["network-plus", "nmap", "network-mapping"]
},


{
front: "What network tools can be used to create diagrams according to the source?",
back: "Examples include Edraw, SmartDraw, Gliffy, Microsoft Visio, and Network Notepad.",
tags: ["network-plus", "diagramming", "tools"]
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
front: "How should documentation be kept current and usable?",
back: "Store it in an easily updated and searchable central system, have others review it, have new technicians use it, collect feedback, and update it regularly.",
tags: ["network-plus", "documentation", "processes"]
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
front: "What is an MOU?",
back: "A memorandum of understanding documenting the intentions of two or more parties to enter a binding agreement or contract. It is generally less formal than the final agreement and usually is not legally binding.",
tags: ["network-plus", "mou", "business-documents"]
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
front: "How does redundancy improve network availability?",
back: "It provides multiple components, services, or connections in the same role so another can take over if one fails, reducing single points of failure.",
tags: ["network-plus", "redundancy", "availability"]
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
front: "What is EOS?",
back: "End-of-support, the date when support for an older application, operating system, firmware, or hardware system is withdrawn.",
tags: ["network-plus", "eos", "lifecycle"]
},

{
front: "What is EOL?",
back: "End-of-life, which may mean the same point as EOS or an earlier point when a product is no longer sold or produced while support continues.",
tags: ["network-plus", "eol", "lifecycle"]
},
{
front: "Why should decommissioning be planned before EOS?",
back: "After support ends, security updates and bug fixes generally stop, increasing the risk of continued production use.",
tags: ["network-plus", "eos", "decommissioning"]
},
{
front: "What is decommissioning?",
back: "The process of removing a system from production, which can apply to a hard drive, network segment, or entire data center.",
tags: ["network-plus", "decommissioning", "lifecycle"]
},




{
front: "Why should users receive advance notice of planned changes?",
back: "So they can plan around periods when network resources or services will be unavailable.",
tags: ["network-plus", "change-management", "notification"]
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
front: "What should happen if a change is unsuccessful?",
back: "Revert according to the rollback plan and notify affected personnel of the completion and reason for the rollback.",
tags: ["network-plus", "change-management", "rollback"]
},

{
front: "What are the four rollback approaches summarized for different software upgrade types?",
back: "Use the patch uninstall utility for an OS patch; uninstall or reinstall the previous client version for a client upgrade; uninstall or reinstall the previous shared application for a shared upgrade; restore a full system backup for an OS upgrade, with OS uninstall as a last resort.",
tags: ["network-plus", "rollback", "software"]
},
{
front: "What general principles apply to hardware, software, network, environmental, and documentation changes?",
back: "Use proper channels, minimize business impact, plan thoroughly, and document each change throughout the process.",
tags: ["network-plus", "change-management", "processes"]
},
{
front: "What should a change request identify about authorization?",
back: "The person submitting the request and the person authorizing it, which may be different depending on the system.",
tags: ["network-plus", "change-management", "change-request"]
},
{
front: "What is the key relationship among baseline, SSOT, version control, monitoring, and auditing?",
back: "The baseline provides the known stable state, SSOT stores configuration information centrally, version control tracks changes, monitoring checks the current state, and auditing reviews historical changes and compliance.",
tags: ["network-plus", "configuration-management", "workflow"]
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
