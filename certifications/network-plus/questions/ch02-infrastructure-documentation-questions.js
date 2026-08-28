window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 2: Infrastructure and Documentation",
items: [
{
type: "mcq",
q: "In the structured-cabling hierarchy, which component marks where the ISP network ends and the customer network begins?",
options: ["Entrance facility", "Demarcation point", "Main distribution frame", "Intermediate distribution frame", "Work area"],
answer: 1,
explain: "The demarcation point, or demarc, is the responsibility boundary between the ISP network and the customer's network.",
tags: ["structured-cabling", "demarc"]
},
{
type: "mcq",
q: "Which component is the centralized point of interconnection for an organization's LAN, CAN, or WAN?",
options: ["Entrance facility", "Work area", "Main distribution frame", "Intermediate distribution frame", "Patch panel"],
answer: 2,
explain: "The MDF is the centralized point of interconnection and commonly connects to IDFs, nearby work areas, and the service-provider connection.",
tags: ["structured-cabling", "mdf"]
},
{
type: "mcq",
q: "Which sequence correctly represents the physical path described by the source?",
options: ["ISP -> MDF -> EF -> IDF -> Demarc -> Work Area", "ISP -> Demarc -> EF -> MDF -> IDF -> Work Area", "ISP -> EF -> Demarc -> MDF -> IDF -> Work Area", "ISP -> EF -> MDF -> Demarc -> IDF -> Work Area", "ISP -> EF -> IDF -> Demarc -> MDF -> Work Area"],
answer: 2,
explain: "The source's hierarchy is ISP -> EF -> Demarc -> MDF -> IDF -> Work Area.",
tags: ["structured-cabling", "hierarchy"]
},
{
type: "mcq",
q: "What is the primary function of an EF (entrance facility)?",
options: ["Connect end devices to wall jacks", "Provide a central rack console", "Connect an incoming network to the organization's network", "Terminate workstation patch cables", "Provide a logical network map"],
answer: 2,
explain: "The entrance facility is where an incoming network, such as the Internet, connects to the organization's network.",
tags: ["structured-cabling", "ef"]
},
{
type: "mcq",
q: "A technician is troubleshooting an ISP connection. Which location is most important for determining whether the ISP or the organization is responsible?",
options: ["KVM switch", "Patch panel", "Demarc", "Wall jack", "Rack diagram"],
answer: 2,
explain: "The demarc separates the ISP's responsibility from the customer's responsibility.",
tags: ["troubleshooting", "demarc"]
},
{
type: "mcq",
q: "What role does an IDF serve in a structured-cabling design?",
options: ["It terminates the ISP's external network", "It connects the MDF to end-user equipment", "It replaces the need for an MDF", "It provides logical IP addressing", "It acts as the environmental-monitoring system"],
answer: 1,
explain: "The IDF provides an intermediate connection between the MDF and end-user equipment on floors and in buildings.",
tags: ["structured-cabling", "idf"]
},
{
type: "mcq",
q: "When an MDF connects to multiple IDFs and those IDFs connect to workstations, what topology results?",
options: ["Bus topology", "Ring topology", "Mesh topology", "Extended star topology", "Point-to-point topology"],
answer: 3,
explain: "Multiple IDFs branching from an MDF and then serving work areas form an extended star.",
tags: ["topology", "idf", "mdf"]
},
{
type: "mcq",
q: "According to the source, what is the minimum number of IDFs specified per floor by ANSI/TIA standards?",
options: ["Zero", "At least one", "At least two", "Exactly two", "One per work area"],
answer: 1,
explain: "The source states that ANSI/TIA standards specify at least one IDF per floor.",
tags: ["structured-cabling", "idf"]
},
{
type: "mcq",
q: "Which of the following is included in a typical work area?",
options: ["ISP backbone equipment only", "Workstations, printers, wall jacks, and patch cables", "Only routers and switches", "Only patch panels and racks", "Only wireless controllers"],
answer: 1,
explain: "A work area includes workstations, printers, other networked devices, patch cables, wall jacks, and connecting cabling.",
tags: ["structured-cabling", "work-area"]
},
{
type: "mcq",
q: "What is a KVM switch primarily used for in a rack environment?",
options: ["Connecting multiple ISPs", "Providing environmental monitoring", "Connecting one console to multiple devices", "Converting fiber to copper", "Mapping IP addresses"],
answer: 2,
explain: "A KVM switch allows one keyboard, video, and mouse console to access multiple devices.",
tags: ["rack", "kvm"]
},
{
type: "mcq",
q: "Which protocol does the source identify as a common application-layer signaling protocol used by voice gateways?",
options: ["SNMP", "SIP", "Nmap", "SCADA", "EULA"],
answer: 1,
explain: "SIP, or Session Initiation Protocol, is identified as a common application-layer signaling protocol for voice gateways.",
tags: ["voip", "sip"]
},
{
type: "mcq",
q: "What does a voice gateway do in the described VoIP environment?",
options: ["Maps IP addresses to rack positions", "Converts between analog telephone signals and IP data", "Provides cable-management hardware", "Maintains software baselines", "Creates a logical network diagram"],
answer: 1,
explain: "A voice gateway converts campus analog telephone signals into IP data and can also convert VoIP data back toward analog telephone lines.",
tags: ["voip", "voice-gateway"]
},
{
type: "mcq",
q: "What is the purpose of a VoIP PBX?",
options: ["Monitor humidity in the data room", "Manage private organizational calls and calls leaving through a VoIP gateway", "Measure cable continuity", "Provide network mapping", "Store configuration backups"],
answer: 1,
explain: "A VoIP PBX connects and manages calls inside the organization and manages calls that leave through a VoIP gateway.",
tags: ["voip", "pbx"]
},
{
type: "mcq",
q: "Which rack dimension is expressed in rack units (RU or U)?",
options: ["Width", "Depth", "Height", "Cable length", "Power capacity"],
answer: 2,
explain: "Rack height is measured in rack units, with 1 RU equal to 1.75 inches.",
tags: ["rack", "dimensions"]
},
{
type: "mcq",
q: "How much vertical space does one rack unit represent according to the source?",
options: ["1 inch", "1.25 inches", "1.5 inches", "1.75 inches", "2 inches"],
answer: 3,
explain: "The source gives 1 RU as 1.75 inches.",
tags: ["rack", "dimensions"]
},
{
type: "mcq",
q: "What is the industry-standard rack height identified in the source?",
options: ["18U", "22U", "32U", "42U", "48U"],
answer: 3,
explain: "The source identifies 42U as the industry-standard rack height discussed.",
tags: ["rack", "dimensions"]
},
{
type: "mcq",
q: "What is the standard equipment rack frame width described by the source?",
options: ["15 inches", "17 inches", "19 inches", "21 inches", "23 inches only"],
answer: 2,
explain: "The source identifies 19 inches as the standard equipment rack frame width, while 23-inch racks are also encountered.",
tags: ["rack", "dimensions"]
},
{
type: "mcq",
q: "What is the main purpose of a hot aisle/cold aisle arrangement?",
options: ["Reduce cable-labeling requirements", "Reduce heat buildup and maintain suitable equipment temperatures", "Increase wireless signal strength", "Replace rack fans", "Eliminate the need for HVAC"],
answer: 1,
explain: "Hot aisle/cold aisle arrangements direct cool air to rack fronts and hot exhaust away from equipment.",
tags: ["rack", "cooling"]
},
{
type: "mcq",
q: "In a typical port-side intake switch installation, where do the ports face?",
options: ["The hot aisle", "The cold aisle", "The ceiling", "The floor", "The MDF"],
answer: 1,
explain: "For port-side intake switches, the ports face the cold aisle and draw in cooler air.",
tags: ["rack", "airflow"]
},
{
type: "mcq",
q: "What is the typical length range of a patch cable given in the source?",
options: ["1 to 5 feet", "3 to 25 feet", "10 to 50 feet", "25 to 75 feet", "50 to 100 feet"],
answer: 1,
explain: "The source describes a patch cable as usually 3 to 25 feet long.",
tags: ["cabling", "patch-cable"]
},
{
type: "mcq",
q: "What is the maximum horizontal-cabling distance described by the source?",
options: ["50 m", "75 m", "90 m", "100 m", "125 m"],
answer: 3,
explain: "The source gives a 100 m maximum, consisting of 90 m of fixed horizontal cabling and 10 m of connection to the workstation.",
tags: ["cabling", "distance"]
},
{
type: "mcq",
q: "Which combination makes up the 100 m horizontal-cabling maximum in the source?",
options: ["80 m + 20 m", "85 m + 15 m", "90 m + 10 m", "95 m + 5 m", "75 m + 25 m"],
answer: 2,
explain: "The source explicitly describes the limit as 90 m fixed horizontal cabling plus 10 m of patch connection.",
tags: ["cabling", "distance"]
},
{
type: "mcq",
q: "What does backbone cabling interconnect?",
options: ["Only workstations and printers", "Only wireless clients", "The EF, MDF, IDFs, floors, and buildings", "Only patch panels", "Only user applications"],
answer: 2,
explain: "Backbone cabling interconnects the entrance facility and MDF, the MDF and IDFs, and floors or buildings.",
tags: ["cabling", "backbone"]
},
{
type: "mcq",
q: "Which medium does the source say is often used for large modern backbones?",
options: ["UTP", "STP", "Fiber-optic cable", "Coaxial cable", "Patch cable"],
answer: 2,
explain: "The source states that large modern backbones are often composed of fiber-optic cable.",
tags: ["cabling", "backbone", "fiber"]
},
{
type: "mcq",
q: "Which cable type is copper-based and transmits using electrical signals without metallic shielding?",
options: ["UTP", "STP", "SMF", "MMF", "Plenum fiber"],
answer: 0,
explain: "UTP is unshielded twisted pair and is a copper-based medium using electrical signals.",
tags: ["cabling", "utp"]
},
{
type: "mcq",
q: "What distinguishes STP from UTP in the source?",
options: ["STP uses glass fibers", "STP uses metallic shielding around pairs and/or all pairs", "STP uses only wireless transmission", "STP is always longer than UTP", "STP uses light pulses"],
answer: 1,
explain: "STP is copper twisted-pair cable with metallic shielding around individual pairs and/or all pairs.",
tags: ["cabling", "stp"]
},
{
type: "mcq",
q: "Which statement about fiber-optic cable matches the source?",
options: ["It uses electrical signals through copper pairs", "It uses light pulses and may be SMF or MMF", "It always uses metallic shielding", "It is limited to horizontal cabling", "It contains only plastic conductors"],
answer: 1,
explain: "Fiber-optic cable contains glass or plastic fibers and transmits data through pulses of light; it is available as SMF or MMF.",
tags: ["cabling", "fiber"]
},
{
type: "mcq",
q: "What problem can excessive exposed twisted-pair conductor near a termination increase?",
options: ["Latency", "Crosstalk", "Routing loops", "Address exhaustion", "Packet fragmentation"],
answer: 1,
explain: "The source states that excessive exposed cable increases the possibility of crosstalk between wires.",
tags: ["cabling", "crosstalk"]
},
{
type: "mcq",
q: "What maximum amount of exposed or stripped twisted-pair cable does the source recommend before termination?",
options: ["0.25 inch", "0.5 inch", "1 inch", "2 inches", "3 inches"],
answer: 2,
explain: "The source says not to leave more than 1 inch of exposed or stripped cable before termination.",
tags: ["cabling", "termination"]
},
{
type: "mcq",
q: "What general bend-radius guideline does the source give for twisted-pair cable?",
options: ["At least 2 times the cable diameter", "At least 3 times the cable diameter", "At least 4 times the cable diameter", "At least 6 times the cable diameter", "At least 10 times the cable diameter"],
answer: 2,
explain: "The source gives a general guideline of a bend radius equal to or greater than four times the cable diameter.",
tags: ["cabling", "bend-radius"]
},
{
type: "mcq",
q: "How far should cable be installed from fluorescent lights or other listed EMI sources according to the source?",
options: ["At least 1 foot", "At least 2 feet", "At least 3 feet", "At least 5 feet", "At least 10 feet"],
answer: 2,
explain: "The source recommends keeping cable at least 3 feet away from fluorescent lights and other listed EMI sources.",
tags: ["cabling", "emi"]
},
{
type: "mcq",
q: "Why is plenum-rated cable required in a plenum space according to the source?",
options: ["It carries more electrical power", "It reduces smoke and uses a flame-resistant jacket", "It provides wireless connectivity", "It eliminates crosstalk entirely", "It doubles the cable length"],
answer: 1,
explain: "Plenum-rated cable uses a flame-resistant jacket that produces less smoke than regular PVC cable.",
tags: ["cabling", "plenum"]
},
{
type: "mcq",
q: "What is the primary function of a patch panel?",
options: ["Encrypt traffic", "Provide a central termination and organization point", "Convert copper to fiber", "Assign IP addresses", "Monitor temperature"],
answer: 1,
explain: "A patch panel provides a central termination point and makes connections easier to organize and change.",
tags: ["cabling", "patch-panel"]
},
{
type: "mcq",
q: "What does a patch panel do to the data transmitted on the line?",
options: ["Encrypts it", "Compresses it", "Converts it to fiber", "Passes it through without changing it", "Routes it between subnets"],
answer: 3,
explain: "The source states that a patch panel passes the connection through without changing the data transmitted.",
tags: ["cabling", "patch-panel"]
},
{
type: "mcq",
q: "Which environmental condition was monitored through SNMP in the chapter's converted wiring-closet scenario?",
options: ["Network bandwidth", "Temperature and humidity", "MAC-address changes", "Cable length", "Software licensing"],
answer: 1,
explain: "Climate monitors measured temperature and humidity and reported conditions to a monitoring system through SNMP.",
tags: ["monitoring", "snmp", "environment"]
},
{
type: "mcq",
q: "What was the root cause of repeated temperature alarms in the converted server room?",
options: ["A failed switch fan", "Incorrect rack labeling", "Shared temperature control with nearby offices", "A damaged fiber link", "An incorrect IP address"],
answer: 2,
explain: "The server room shared temperature control with nearby offices, so office heating caused the room to warm.",
tags: ["troubleshooting", "environment"]
},
{
type: "mcq",
q: "Which technology does the source describe as acquiring real-time data from a physical system and managing or presenting it for monitoring?",
options: ["ICS", "Nmap", "KVM", "EULA", "SIP"],
answer: 0,
explain: "An ICS acquires real-time physical-system data and manages the system or presents the data to humans.",
tags: ["ics", "monitoring"]
},
{
type: "mcq",
q: "Which relationship is given for SCADA, ICS, and OT?",
options: ["OT ⊂ ICS ⊂ SCADA", "SCADA ⊂ OT ⊂ ICS", "SCADA ⊂ ICS ⊂ OT", "ICS ⊂ SCADA ⊂ OT", "ICS = SCADA = OT"],
answer: 2,
explain: "The source explicitly presents the relationship as SCADA ⊂ ICS ⊂ OT.",
tags: ["scada", "ics", "ot"]
},
{
type: "mcq",
q: "Why are SCADA and other OT systems often placed on separate network segments?",
options: ["To increase cable length", "To isolate them from sensitive data resources or Internet access", "To eliminate the need for monitoring", "To simplify software licensing", "To replace physical security"],
answer: 1,
explain: "The source says SCADA and other OT systems are often isolated from sensitive data resources or Internet access for security reasons.",
tags: ["scada", "ot", "security"]
},
{
type: "mcq",
q: "What is network mapping?",
options: ["The physical installation of cable trays", "The discovery and identification of devices on a network", "The assignment of software licenses", "The replacement of failed components", "The scheduling of maintenance windows"],
answer: 1,
explain: "Network mapping is the process of discovering and identifying devices on a network.",
tags: ["network-mapping", "documentation"]
},
{
type: "mcq",
q: "Which command invokes Nmap from a Windows Command Prompt or PowerShell session?",
options: ["zenmap", "scan", "nmap", "networkmap", "nm"],
answer: 2,
explain: "The source identifies `nmap` as the command-line executable for Nmap.",
tags: ["nmap", "network-mapping"]
},
{
type: "mcq",
q: "What is Zenmap?",
options: ["A replacement for SNMP", "A graphical interface for Nmap", "A cable-testing tool", "A rack-management protocol", "A VoIP gateway"],
answer: 1,
explain: "Zenmap is described as a graphical interface for Nmap.",
tags: ["nmap", "zenmap"]
},
{
type: "mcq",
q: "Which type of network diagram emphasizes IP address spaces, routing between networks, and subnets?",
options: ["Layer 1 diagram", "Layer 2 diagram", "Layer 3 diagram", "Rack diagram", "Floor plan"],
answer: 2,
explain: "The source associates Layer 3 diagrams with IP address spaces, routing, and subnets.",
tags: ["network-diagrams", "osi"]
},
{
type: "mcq",
q: "What is a rack diagram primarily used to represent?",
options: ["Software licenses", "Devices stacked in a rack", "WAN routing policies", "Application dependencies", "Environmental trends"],
answer: 1,
explain: "A rack diagram shows devices stacked in a rack and is typically drawn to scale.",
tags: ["rack-diagram", "documentation"]
},
{
type: "mcq",
q: "Why might a network diagram intentionally omit a firewall?",
options: ["Firewalls cannot be documented", "The firewall is always wireless", "It may not be relevant to the aspect being illustrated", "Firewalls cannot be part of a network", "Only Cisco devices can be shown"],
answer: 2,
explain: "The source states that diagrams may omit devices that are not relevant to the specific aspect being illustrated.",
tags: ["network-diagrams", "documentation"]
},
{
type: "mcq",
q: "What is the main purpose of an SOP?",
options: ["Request a vendor proposal", "Ensure recurring complex tasks are performed consistently", "Define measurable ISP uptime", "Document future contracts", "Map network devices"],
answer: 1,
explain: "SOPs help employees perform the same complex tasks consistently.",
tags: ["sop", "documentation"]
},
{
type: "mcq",
q: "Which record can define how many users may install or access a software application?",
options: ["SLA", "EULA", "RFP", "SOW", "Rack diagram"],
answer: 1,
explain: "An EULA can define user counts, installation rights, access, and other software-use restrictions.",
tags: ["eula", "licensing"]
},
{
type: "mcq",
q: "What is a baseline configuration?",
options: ["A list of vendor contacts", "The stable state of network devices and software before future changes", "An environmental alarm threshold", "A physical rack drawing", "A software sales proposal"],
answer: 1,
explain: "A baseline configuration is the stable state maintained as a known reference for future changes.",
tags: ["configuration-management", "baseline"]
},
{
type: "mcq",
q: "What is a wiki in the context of network documentation?",
options: ["A cable-testing protocol", "A website users can edit", "A routing protocol", "A hardware inventory scanner", "A rack enclosure"],
answer: 1,
explain: "The source describes a wiki as a website users can edit, with support for files, links, grouping, and access privileges.",
tags: ["documentation", "wiki"]
},
{
type: "mcq",
q: "Why should digital network documentation have secure off-site backups?",
options: ["To improve rack airflow", "Because digital documentation may become inaccessible during a catastrophic network failure", "Because printed documents cannot be secured", "To reduce IP addressing errors", "To eliminate inventory management"],
answer: 1,
explain: "The source notes that digital documentation may be inaccessible during a catastrophic network failure.",
tags: ["documentation", "backup"]
},
{
type: "mcq",
q: "Which item is most directly associated with inventory management?",
options: ["Tracking model and serial numbers", "Choosing a hot aisle", "Selecting a VoIP signaling protocol", "Creating a rack topology", "Calculating bend radius"],
answer: 0,
explain: "Inventory records commonly include device identification, model number, serial number, location, warranty, software version, vendor, and licensing information.",
tags: ["inventory", "documentation"]
},
{
type: "mcq",
q: "Which naming approach is recommended by the source?",
options: ["Use random names to improve security", "Use the most detailed information first", "Use large-scale information toward smaller details", "Include sensitive data in every hostname", "Change naming conventions for every device"],
answer: 2,
explain: "The source recommends a top-down or outside-in naming approach, such as building -> floor -> data room -> rack.",
tags: ["naming", "documentation"]
},
{
type: "mcq",
q: "What security concern should influence device naming?",
options: ["Names should reveal all sensitive systems", "Names should advertise protected information", "Names should avoid unnecessarily revealing sensitive targets", "Names should contain user passwords", "Names should include every application installed"],
answer: 2,
explain: "The source warns against names that unnecessarily reveal the location of highly sensitive information.",
tags: ["naming", "security"]
},
{
type: "mcq",
q: "What is the primary purpose of an RFP?",
options: ["Define future contract terms", "Request vendors to submit proposals", "Define detailed project work", "Define measurable service levels", "Document software licensing rights"],
answer: 1,
explain: "An RFP is a request to vendors to submit a proposal for a product or service.",
tags: ["business-documents", "rfp"]
},
{
type: "mcq",
q: "Which document defines detailed tasks, deliverables, standards, payment schedule, and work timeline for a project?",
options: ["RFP", "MOU", "MSA", "SOW", "SLA"],
answer: 3,
explain: "An SOW documents the detailed work required for a particular project.",
tags: ["business-documents", "sow"]
},
{
type: "mcq",
q: "Which document defines measurable service expectations such as guaranteed uptime and compensation for excessive outages?",
options: ["MOU", "RFP", "SLA", "SOW", "EULA"],
answer: 2,
explain: "An SLA defines measurable service expectations and can specify uptime guarantees and remedies.",
tags: ["business-documents", "sla"]
},
{
type: "mcq",
q: "What is the primary purpose of an MSA?",
options: ["Define terms for future contracts between parties", "Request proposals from vendors", "Describe one project's tasks", "Define software licensing restrictions", "Map network devices"],
answer: 0,
explain: "An MSA is a contract defining the terms of future contracts between parties.",
tags: ["business-documents", "msa"]
},
{
type: "mcq",
q: "What does MTBF measure?",
options: ["Average repair time", "Expected time between failures", "Number of redundant components", "Time to complete a change request", "Time required to decommission a system"],
answer: 1,
explain: "MTBF is the average amount of time expected to pass before the next failure for devices of a particular type.",
tags: ["reliability", "mtbf"]
},
{
type: "mcq",
q: "What does MTTR measure?",
options: ["Average time to repair a failed device", "Average time between failures", "Time to approve a change", "Time to complete an upgrade", "Time to restore a documentation backup"],
answer: 0,
explain: "MTTR is the average amount of time required to repair a failed device.",
tags: ["reliability", "mttr"]
},
{
type: "mcq",
q: "What is the primary goal of redundancy?",
options: ["Reduce cable length", "Eliminate single points of failure", "Increase naming complexity", "Replace documentation", "Avoid all maintenance windows"],
answer: 1,
explain: "Redundancy provides multiple components, services, or connections so a failure does not create a single point of failure.",
tags: ["reliability", "redundancy"]
},
{
type: "mcq",
q: "What distinguishes automatic failover from simple redundancy?",
options: ["Automatic failover uses no backup component", "Automatic failover requires manual intervention", "Automatic failover allows a redundant component to assume duties without manual intervention", "Automatic failover applies only to documentation", "Automatic failover reduces hardware count"],
answer: 2,
explain: "Automatic failover means a redundant component immediately assumes the duties of the failed component without manual intervention.",
tags: ["reliability", "failover"]
},
{
type: "mcq",
q: "What is a hot-swappable component?",
options: ["A component that can be changed while the machine continues running", "A component that must remain powered off", "A component used only for cooling", "A duplicate stored off-site", "A component that cannot be replaced"],
answer: 0,
explain: "A hot-swappable component can be replaced while the machine continues operating.",
tags: ["reliability", "hot-swap"]
},
{
type: "mcq",
q: "Which statement correctly distinguishes a hot spare from a cold spare?",
options: ["A hot spare is not installed; a cold spare is installed", "A hot spare is already installed; a cold spare is not installed", "Both require service interruption", "Both are software configurations", "A hot spare is always off-site"],
answer: 1,
explain: "The source defines a hot spare as already installed and ready to assume the failed component's functions, while a cold spare is not installed.",
tags: ["reliability", "spares"]
},
{
type: "mcq",
q: "Which phase of the system life cycle identifies network requirements and business needs?",
options: ["Requirements analysis", "Implementation", "Documentation and maintenance", "Evaluation", "Decommissioning"],
answer: 0,
explain: "Requirements analysis identifies the network requirements and business needs before detailed design.",
tags: ["lifecycle", "requirements"]
},
{
type: "mcq",
q: "Which life-cycle phase includes purchasing equipment and testing before deployment?",
options: ["Requirements analysis", "Design planning", "Development and testing", "Documentation and maintenance", "Evaluation"],
answer: 2,
explain: "Development and testing includes purchasing equipment and testing before deployment.",
tags: ["lifecycle", "testing"]
},
{
type: "mcq",
q: "What is configuration drift?",
options: ["A planned move to a golden configuration", "The gradual movement away from an intended configuration", "A scheduled maintenance window", "A backup of a baseline", "A change request approval"],
answer: 1,
explain: "Configuration drift is the gradual movement away from an intended configuration as changes accumulate.",
tags: ["configuration-management", "drift"]
},
{
type: "mcq",
q: "What is an SSOT in configuration management?",
options: ["A single source of truth for configuration information", "A software patch repository only", "A security camera network", "A rack airflow standard", "A service-level agreement"],
answer: 0,
explain: "SSOT stands for single source of truth and refers to the central repository for configuration information.",
tags: ["configuration-management", "ssot"]
},
{
type: "mcq",
q: "What is the main purpose of version control for configurations?",
options: ["Eliminate all backups", "Track changes and support history and rollback", "Increase cable bandwidth", "Replace environmental sensors", "Measure MTBF"],
answer: 1,
explain: "Version control preserves historical configurations, supports newer releases, enables rollback, and allows auditing.",
tags: ["configuration-management", "version-control"]
},
{
type: "mcq",
q: "What is a golden configuration?",
options: ["The newest configuration regardless of quality", "A configuration optimized for compliance and performance", "A temporary test configuration", "An inventory spreadsheet", "A vendor contract"],
answer: 1,
explain: "A golden configuration is optimized for compliance and performance and can serve as the standard for similar systems.",
tags: ["configuration-management", "golden-configuration"]
},
{
type: "mcq",
q: "What does auditing review in configuration management?",
options: ["Only cable lengths", "Historic changes, approvals, effectiveness, compliance, and documentation", "Only current passwords", "Only rack dimensions", "Only vendor pricing"],
answer: 1,
explain: "Auditing reviews historic configuration changes and checks approval, effectiveness, compliance, documentation, and backups.",
tags: ["configuration-management", "auditing"]
},
{
type: "mcq",
q: "What happens at EOS according to the source?",
options: ["The product receives additional security updates", "Support for the product is withdrawn", "The product must be newly purchased", "All existing configurations are automatically deleted", "The device becomes redundant"],
answer: 1,
explain: "EOS, or end-of-support, is the date when support is withdrawn, generally ending security updates and bug fixes.",
tags: ["lifecycle", "eos"]
},
{
type: "mcq",
q: "Which statement about EOL best matches the source?",
options: ["It always means support has already ended", "It can refer to a point when a product is no longer sold or produced while support continues", "It is identical across all vendors", "It always occurs after EOS", "It refers only to software licenses"],
answer: 1,
explain: "The source notes that EOL may refer to the same point as EOS or an earlier point when sales or production end while support continues.",
tags: ["lifecycle", "eol"]
},
{
type: "mcq",
q: "What should be assessed before decommissioning a system?",
options: ["Only its purchase price", "Whether users or business processes depend on it", "Only its hostname", "Only its rack height", "Only its color label"],
answer: 1,
explain: "Dependency analysis is essential because apparently unimportant systems may still support users or business processes.",
tags: ["decommissioning", "dependencies"]
},
{
type: "mcq",
q: "Which action is part of the source's decommissioning process?",
options: ["Skip backups if the device seems unimportant", "Test required backups before removal", "Remove the system immediately after EOS", "Avoid notifying users", "Ignore business dependencies"],
answer: 1,
explain: "The source requires backing up required data, testing the backups, and documenting them before decommissioning.",
tags: ["decommissioning", "backup"]
},
{
type: "mcq",
q: "Which software change is primarily described as a minor correction, improvement, or enhancement?",
options: ["Installation", "Patch", "Upgrade", "Rollback", "Decommission"],
answer: 1,
explain: "A patch corrects bugs, closes vulnerabilities, or adds minor enhancements while most code remains unchanged.",
tags: ["change-management", "patch"]
},
{
type: "mcq",
q: "Which software change is described as a major change that enhances functionality and features?",
options: ["Patch", "Installation", "Upgrade", "Rollback", "Baseline"],
answer: 2,
explain: "An upgrade is a major software change that enhances functionality and features while also addressing bugs and vulnerabilities.",
tags: ["change-management", "upgrade"]
},
{
type: "mcq",
q: "What does rollback do?",
options: ["Moves a system to a new version", "Reverts software to a previous version after an unsuccessful patch or upgrade", "Deletes all configuration backups", "Adds redundancy", "Creates an RFP"],
answer: 1,
explain: "Rollback returns software to a previous version when an attempted patch or upgrade fails.",
tags: ["change-management", "rollback"]
},
{
type: "mcq",
q: "Where should firmware updates be obtained according to the source?",
options: ["Any third-party file-sharing site", "Directly from the manufacturer", "From an unrelated device", "From a printed rack diagram", "From the change-management database only"],
answer: 1,
explain: "The source recommends obtaining firmware updates directly from the manufacturer.",
tags: ["firmware", "change-management"]
},
{
type: "mcq",
q: "Why should a firmware update be tested before deployment?",
options: ["To determine if the rack is large enough", "To identify compatibility or other effects before production deployment", "To avoid documenting changes", "To eliminate rollback planning", "To change the device hostname"],
answer: 1,
explain: "The source requires testing firmware updates before deployment and again afterward to identify compatibility and operational effects.",
tags: ["firmware", "testing"]
},
{
type: "mcq",
q: "What is the purpose of a maintenance window?",
options: ["Provide an agreed period for scheduled changes", "Replace all documentation backups", "Define software licensing limits", "Measure MTBF", "Identify the demarc"],
answer: 0,
explain: "The maintenance window is the scheduled period for a change, normally during off-hours unless it is an emergency.",
tags: ["change-management", "maintenance-window"]
},
{
type: "mcq",
q: "During the change process, what should normally happen before the implementation?",
options: ["Ignore vendor documentation", "Test the change in a segmented test environment", "Delete the rollback plan", "Disable all backups", "Close the change"],
answer: 1,
explain: "The source calls for testing in a test environment that is segmented from production before implementation.",
tags: ["change-management", "testing"]
},
{
type: "mcq",
q: "What should happen if a change is likely to extend beyond the maintenance window?",
options: ["Say nothing until the next day", "Inform technical staff and users about the anticipated delay", "Immediately delete the system", "Ignore the rollback plan", "Change the SLA"],
answer: 1,
explain: "The source says to inform technical staff and users about the anticipated delay and what they should expect.",
tags: ["change-management", "maintenance-window"]
},
{
type: "mcq",
q: "Which change-management step records the completed change in the formal change-management system?",
options: ["Determine scope", "Schedule the maintenance window", "Record the change", "Restrict access", "Notify users of completion"],
answer: 2,
explain: "The 14-step process ends with recording the change in the change-management system.",
tags: ["change-management", "documentation"]
},
{
type: "multi",
q: "Which components may commonly be found in an MDF according to the source? Select all that apply.",
options: ["Routers", "Switches", "Network servers", "Fiber-optic transmission media", "Only desktop workstations"],
answer: [0, 1, 2, 3],
explain: "The MDF may contain switches, routers, servers, fiber-optic transmission media, the demarc or extension, and other central equipment.",
tags: ["mdf", "structured-cabling"]
},
{
type: "multi",
q: "Which cable types does the source recognize as possible horizontal cabling media? Select all that apply.",
options: ["UTP", "STP", "Fiber-optic cable", "Only coaxial cable", "Only wireless"],
answer: [0, 1, 2],
explain: "The source lists UTP, STP, and fiber-optic cable as possible horizontal cabling types.",
tags: ["cabling", "horizontal"]
},
{
type: "multi",
q: "Which items can environmental monitoring systems detect according to the source? Select all that apply.",
options: ["Temperature", "Humidity", "Airflow", "Secure-door status", "Routing protocol preference"],
answer: [0, 1, 2, 3],
explain: "The source lists temperature, humidity, airflow, secure-door status, power-supply problems, light conditions, and sound conditions.",
tags: ["monitoring", "environment"]
},
{
type: "multi",
q: "Which items should useful inventory records contain? Select all that apply.",
options: ["Device identification", "Model number", "Serial number", "Location", "Favorite vendor color"],
answer: [0, 1, 2, 3],
explain: "The source lists device identification, model number, serial number, location, warranty information, support contacts, software version, vendor, and licensing information.",
tags: ["inventory", "documentation"]
},
{
type: "multi",
q: "Which factors can increase the complexity of change approval? Select all that apply.",
options: ["Cost", "Time involved", "Number of users affected", "Difficulty of rollback", "Cable color alone"],
answer: [0, 1, 2, 3],
explain: "Approval complexity generally depends on cost, time, number of affected users, productivity risk, and rollback difficulty.",
tags: ["change-management", "approval"]
},
{
type: "multi",
q: "Which actions are part of the source's firmware-management process? Select all that apply.",
options: ["Obtain the update from the manufacturer", "Confirm the update is exactly correct", "Test before deployment", "Test after deployment", "Skip documentation"],
answer: [0, 1, 2, 3],
explain: "The source calls for obtaining the correct manufacturer update, testing before and after deployment, documenting effects, and balancing risks and benefits.",
tags: ["firmware", "change-management"]
},
{
type: "multi",
q: "Which benefits are associated with good network documentation? Select all that apply.",
options: ["Preserving knowledge when a technician is unavailable", "Improving coworker communication", "Speeding troubleshooting", "Making similar problems easier to investigate", "Eliminating all network failures"],
answer: [0, 1, 2, 3],
explain: "Documentation preserves organizational knowledge, improves communication, speeds troubleshooting, and makes information easier to find.",
tags: ["documentation"]
},
{
type: "multi",
q: "Which tasks are specifically part of the decommissioning process in the source? Select all that apply.",
options: ["Identify dependencies", "Back up required data", "Test the backups", "Notify potentially affected people", "Ignore the system's configuration"],
answer: [0, 1, 2, 3],
explain: "The source calls for dependency analysis, documentation, backups and backup testing, scheduling, notification, and staged decommissioning when appropriate.",
tags: ["decommissioning"]
},
{
type: "multi",
q: "Which activities are supported by version control? Select all that apply.",
options: ["Maintaining historical configurations", "Releasing newer configurations", "Rolling back to prior configurations", "Auditing changes", "Measuring humidity"],
answer: [0, 1, 2, 3],
explain: "Version control tracks configuration versions, allowing history, newer releases, rollback, and auditing.",
tags: ["version-control", "configuration-management"]
},
{
type: "multi",
q: "Which are examples of network documentation categories identified by the source? Select all that apply.",
options: ["Hardware", "Software", "Network configuration", "Procedures", "Entertainment preferences"],
answer: [0, 1, 2, 3],
explain: "The source categorizes documentation into hardware, software, network configuration, procedures, contacts, and emergency or regulatory information.",
tags: ["documentation"]
},
{
type: "tf",
q: "Structured cabling is based on a hierarchical design and assumes a star topology.",
answer: true,
explain: "The source explicitly states that structured cabling is hierarchical and assumes a star topology.",
tags: ["structured-cabling", "topology"]
},
{
type: "tf",
q: "The organization is generally responsible for the ISP side of the demarc.",
answer: false,
explain: "The ISP is generally responsible for its network up to the demarc; the organization is responsible for the customer side.",
tags: ["demarc", "responsibility"]
},
{
type: "tf",
q: "A patch panel changes the data transmitted on a network connection.",
answer: false,
explain: "The source states that a patch panel passes the connection through without changing the data.",
tags: ["patch-panel"]
},
{
type: "tf",
q: "Fiber-optic cable transmits data using pulses of light.",
answer: true,
explain: "The source distinguishes copper electrical signaling from fiber transmission using pulses of light from a laser or LED.",
tags: ["fiber", "cabling"]
},
{
type: "tf",
q: "A network diagram must include every device on the network.",
answer: false,
explain: "The source says diagrams may intentionally omit devices that are not relevant to the aspect being illustrated.",
tags: ["network-diagrams"]
},
{
type: "tf",
q: "Configuration drift is the gradual movement away from an intended configuration.",
answer: true,
explain: "That is the source's definition of configuration drift.",
tags: ["configuration-management", "drift"]
},
{
type: "tf",
q: "EOS generally marks the point when a product stops receiving vendor support, including security updates and bug fixes.",
answer: true,
explain: "The source defines EOS as the withdrawal of support and notes that security updates and bug fixes generally stop afterward.",
tags: ["eos", "lifecycle"]
},
{
type: "tf",
q: "The source recommends allowing patches to install automatically without first understanding their impact.",
answer: false,
explain: "The 14-step process says not to generally allow patches to be installed automatically and to understand the impact first.",
tags: ["patch-management", "change-management"]
},
{
type: "fill",
q: "What is the name of the responsibility boundary where the ISP network ends and the customer's network begins?",
answer: "demarc",
accepts: ["demarcation point"],
explain: "The demarcation point, or demarc, separates ISP responsibility from customer responsibility.",
tags: ["demarc", "structured-cabling"]
},
{
type: "fill",
q: "What is the abbreviation for main distribution frame?",
answer: "MDF",
explain: "MDF stands for main distribution frame.",
tags: ["mdf", "acronyms"]
},
{
type: "fill",
q: "What is the maximum horizontal-cabling distance given by the source, in meters?",
answer: "100",
accepts: ["100 m", "100m"],
explain: "The source specifies a 100 m maximum composed of 90 m fixed horizontal cabling and 10 m of connection to the workstation.",
tags: ["cabling", "distance"]
},
{
type: "fill",
q: "What is the abbreviation for mean time between failures?",
answer: "MTBF",
explain: "MTBF means mean time between failures.",
tags: ["reliability", "mtbf"]
},
{
type: "fill",
q: "What is the abbreviation for mean time to repair?",
answer: "MTTR",
explain: "MTTR means mean time to repair.",
tags: ["reliability", "mttr"]
},
{
type: "fill",
q: "What is the central configuration repository called the single source of truth?",
answer: "SSOT",
accepts: ["single source of truth"],
explain: "SSOT stands for single source of truth and stores centralized configuration information.",
tags: ["configuration-management", "ssot"]
},
{
type: "fill",
q: "What term describes the period scheduled for a planned network change?",
answer: "maintenance window",
explain: "The source calls the scheduled period for a change the maintenance window.",
tags: ["change-management", "maintenance-window"]
},
{
type: "match",
q: "Match each business document with its primary purpose.",
context: "Business documents",
pairs: [
{ item: "RFP", match: "Request vendor proposals for a product or service" },
{ item: "SOW", match: "Define detailed work, deliverables, standards, payment, and schedule for a project" },
{ item: "SLA", match: "Define measurable service expectations and remedies or terms" },
{ item: "MSA", match: "Define terms governing future contracts between parties" },
{ item: "EULA", match: "Define software-use rights and licensing restrictions" }
],
explain: "The source distinguishes these documents by their specific business and contractual purposes.",
tags: ["business-documents", "matching"]
},
{
type: "match",
q: "Match each infrastructure component with its role.",
context: "Structured cabling",
pairs: [
{ item: "EF", match: "Entrance point where an incoming network connects to the organization" },
{ item: "Demarc", match: "Boundary between ISP and customer responsibility" },
{ item: "MDF", match: "Centralized interconnection point for the organization" },
{ item: "IDF", match: "Intermediate connection between the MDF and end-user equipment" },
{ item: "Work area", match: "Area containing end devices, wall jacks, and patch cabling" }
],
explain: "These components form the hierarchical path from the external network to users.",
tags: ["structured-cabling", "matching"]
},
{
type: "match",
q: "Match each reliability term with its meaning.",
context: "Reliability",
pairs: [
{ item: "MTBF", match: "Average expected time between failures" },
{ item: "MTTR", match: "Average time required to repair a failed device" },
{ item: "Automatic failover", match: "Redundant component assumes duties without manual intervention" },
{ item: "Hot spare", match: "Duplicate component already installed and ready to take over" },
{ item: "Cold spare", match: "Duplicate component not installed and requiring an interruption to replace" }
],
explain: "The source uses these terms to describe expected failure intervals, repair time, and redundancy behavior.",
tags: ["reliability", "matching"]
},
{
type: "match",
q: "Match each configuration-management term with its meaning.",
context: "Configuration management",
pairs: [
{ item: "Baseline configuration", match: "Stable production state used as a known reference" },
{ item: "SSOT", match: "Central source for stored configuration information" },
{ item: "Version control", match: "Tracks configuration versions and supports rollback" },
{ item: "Configuration drift", match: "Gradual movement away from the intended configuration" },
{ item: "Golden configuration", match: "Configuration optimized for compliance and performance" }
],
explain: "These terms describe the reference state, central repository, change history, drift detection, and standard configuration.",
tags: ["configuration-management", "matching"]
},
{
type: "match",
q: "Match each software change type with its description.",
context: "Software changes",
pairs: [
{ item: "Installation", match: "Introduces new software and integrates it with network resources" },
{ item: "Patch", match: "Corrects bugs, closes vulnerabilities, or adds minor enhancements" },
{ item: "Upgrade", match: "Major change that enhances functionality and features" },
{ item: "Rollback", match: "Reverts software to a previous version after an unsuccessful change" }
],
explain: "The source distinguishes installation, patching, upgrades, and rollback by their scope and purpose.",
tags: ["change-management", "matching"]
}
]
});

/* Source:    */
