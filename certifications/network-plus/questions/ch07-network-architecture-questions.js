window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 7: Network Architecture",
items: [
{
type: "mcq",
q: "What does a network's architecture describe?",
options: ["Only the cabling standard chosen for each floor", "The devices, their configuration, services, and interconnections", "Only the public IP addresses leased from an ISP", "The physical floor plan where racks are installed", "Only the applications installed on user devices"],
answer: 1,
explain: "Architecture is the overall design: which devices exist, how they are configured, which services support the network, and how everything connects.",
tags: ["architecture"]
},
{
type: "mcq",
q: "What does network abstraction separate?",
options: ["Copper cabling from fiber cabling", "Users from their authentication credentials", "Public addresses from private addresses", "Decision making from the hardware that forwards traffic", "Wireless channels from wired channels"],
answer: 3,
explain: "Abstraction moves prioritization, direction, filtering, and error correction off individual devices so controllers, VMs, or logical constructs can decide.",
tags: ["abstraction"]
},
{
type: "mcq",
q: "Which switch offers plug-and-play ports with no IP address and minimal options?",
options: ["An unmanaged switch", "A managed switch", "A layer 3 switch", "A layer 4 switch", "A multilayer core switch"],
answer: 0,
explain: "Unmanaged switches are inexpensive port expanders for SOHO networks; they cannot be configured or addressed for management.",
tags: ["switches", "unmanaged"]
},
{
type: "mcq",
q: "How is a managed switch typically configured?",
options: ["Only by moving physical jumper pins", "Only through a wireless controller", "Through a CLI or web GUI, sometimes in groups", "By swapping its firmware chip", "Through DHCP options alone"],
answer: 2,
explain: "Managed switches support a command-line interface or browser-based management GUI, can sometimes be configured in groups, and may hold an IP address for continued management.",
tags: ["switches", "managed"]
},
{
type: "mcq",
q: "Which capability defines a layer 3 switch?",
options: ["It forwards frames using only MAC addresses", "It inspects layer 7 application payloads", "It converts copper links to fiber links", "It assigns VLANs through DHCP", "It interprets layer 3 data and makes routing decisions"],
answer: 4,
explain: "A layer 3 switch supports routing protocols and makes routing decisions, but is optimized and priced for fast traffic management inside a large LAN.",
tags: ["switches", "layer-3"]
},
{
type: "mcq",
q: "Why is a layer 4 switch also called a content switch?",
options: ["It stores web content in cache memory for faster replies", "It interprets transport-to-application data for filtering and statistics", "It forwards only broadcast content to nearby hosts", "It encrypts content at the MAC layer before forwarding", "It converts content into VLAN tags for trunk links"],
answer: 1,
explain: "Layer 4 switches read data from layer 4 through layer 7, enabling advanced filtering, statistics, security functions, and application-aware handling.",
tags: ["switches", "layer-4"]
},
{
type: "mcq",
q: "What is stored in a switch's CAM?",
options: ["The routing table mapping networks to next hops", "The list of approved administrator accounts", "The firmware image used at boot", "The MAC address table mapping addresses to ports", "The log of power supply failures"],
answer: 3,
explain: "Content addressable memory provides high-speed comparison against the stored table, so the switch can match a destination MAC to a physical port quickly.",
tags: ["cam", "switching"]
},
{
type: "mcq",
q: "How does a MAC flooding attack succeed?",
options: ["It fills CAM with bogus MACs until the switch fails open", "It corrupts the switch's firmware image", "It exhausts the switch's power supply", "It spoofs the root bridge priority", "It tunnels frames through a VLAN"],
answer: 0,
explain: "Large numbers of frames with different MAC addresses consume the table. The switch cannot learn legitimate addresses and falls back to broadcasting every frame to every port.",
tags: ["mac-flooding", "security"]
},
{
type: "match",
q: "Match each disabled port status to its cause.",
pairs: [
{ item: "Administratively down", match: "Disabled by an administrator or that administrator's configuration" },
{ item: "Error disabled", match: "Automatically shut down by a fault or violation" },
{ item: "Suspended", match: "Configuration does not match the aggregation group" }
],
explain: "Admin action, automatic fault response, and incompatible group settings produce the three statuses; each stops the port from receiving or transmitting data.",
tags: ["port-status"]
},
{
type: "mcq",
q: "A port shuts itself down after a duplex mismatch. Which status is it in?",
options: ["Administratively down", "Suspended", "Forwarding", "Designated", "Error disabled"],
answer: 4,
explain: "Error disabled is the automatic shutdown for loopback errors, duplex mismatches, and some port security violations.",
tags: ["port-status", "error-disabled"]
},
{
type: "mcq",
q: "What does switchport port-security add to an access port?",
options: ["Routing between VLANs on that access port", "MAC filtering that also guards against flooding", "Wireless authentication for guest devices", "Power over Ethernet budgeting for devices", "Link aggregation for that access port"],
answer: 1,
explain: "Port security caps how many MAC addresses may be active, making it both a MAC filter and a flood guard against CAM table exhaustion.",
tags: ["port-security"]
},
{
type: "fill",
q: "How many MAC addresses does switchport port-security allow on a port by default?",
answer: "1",
accepts: ["one"],
explain: "The default limit is one address. Raise it for a phone and PC, a virtualization host, an uplink, or an access point.",
tags: ["port-security"]
},
{
type: "mcq",
q: "An access port serves an IP phone with a PC connected behind it. How many MAC addresses should it allow?",
options: ["2", "1", "3", "5", "Unlimited"],
answer: 0,
explain: "The phone contributes a voice MAC and the PC contributes a data MAC, so the port needs a limit of two.",
tags: ["port-security"]
},
{
type: "mcq",
q: "What happens by default when a port security violation occurs?",
options: ["The switch reboots and reloads its configuration", "The switch deletes the port's VLAN assignment", "The switch shuts the port down and notifies the administrator", "The switch ignores the violation and keeps learning", "The switch converts the port to a trunk"],
answer: 2,
explain: "The default reaction is to shut the port down. A configurable alternative restricts only the rogue device's data. Either way the administrator is notified.",
tags: ["port-security", "violation"]
},
{
type: "mcq",
q: "Why is port security only one layer of defense?",
options: ["It disables encryption on the port", "It stops working after a switch reboot", "It cannot be applied to access ports", "It blocks all legitimate traffic", "An attacker who learns the approved MAC can spoof it"],
answer: 4,
explain: "MAC spoofing is not difficult; the main obstacle is learning the approved address. Security must be layered, a strategy called defense in depth.",
tags: ["port-security", "defense-in-depth"]
},
{
type: "mcq",
q: "Why can redundant switch links produce a broadcast storm?",
options: ["Redundant links double the electrical voltage", "Broadcasts circulate around the loop and are reissued at every hop", "Backup switches block all multicast traffic", "Every redundant link creates a new VLAN", "Loops convert broadcasts into unicasts"],
answer: 1,
explain: "Each switch reissues a broadcast out every other port, so parallel paths keep multiplying copies until the flood severely impairs or disables the network.",
tags: ["loops", "broadcast-storm"]
},
{
type: "mcq",
q: "How does storm control react to excessive broadcast traffic?",
options: ["It permanently disables the offending switch", "It elects a new root bridge", "It converts broadcasts into multicasts", "It drops all traffic for the rest of each one-second interval", "It raises the port's priority value"],
answer: 3,
explain: "Storm control samples traffic each second and, once the threshold is exceeded, drops everything until that interval ends. It is a reactive flood guard.",
tags: ["storm-control"]
},
{
type: "mcq",
q: "What is STP designed to prevent?",
options: ["Switching loops by blocking redundant links", "Broadcast storms by dropping excess traffic", "MAC flooding by limiting learned addresses", "Routing loops by aging out routes", "Duplex mismatches by negotiating speed"],
answer: 0,
explain: "Spanning Tree Protocol calculates loop-free paths and artificially blocks the links that would complete a loop, adapting when the topology changes.",
tags: ["stp"]
},
{
type: "mcq",
q: "How does STP choose the root bridge?",
options: ["The highest IP address on the management VLAN wins", "The switch with the most ports wins", "The lowest bridge ID wins, combining priority and MAC address", "The newest switch in the topology wins", "A random election repeats every minute"],
answer: 2,
explain: "The BID is a 2-byte configurable priority plus the bridge MAC. With default priorities, the lowest MAC address becomes root.",
tags: ["stp", "root-bridge"]
},
{
type: "multi",
q: "Which statements about STP operation are accurate?",
options: ["STP operates primarily at layer 3", "BPDUs are routing updates exchanged by routers", "Exactly one root bridge exists per network", "Each bridge selects one root port", "All redundant ports continue forwarding data"],
answer: [2, 3],
explain: "One root anchors every calculation and each bridge keeps one root port toward it. Other redundant ports block, STP runs at layer 2, and BPDUs are STP messages.",
tags: ["stp"]
},
{
type: "match",
q: "Match each STP port role to its function.",
pairs: [
{ item: "Root port", match: "The one port per bridge closest to the root bridge" },
{ item: "Designated port", match: "The lowest-cost port on a link, pointing downstream" },
{ item: "Blocked port", match: "Neither role, so it does not forward data" }
],
explain: "A root port is the bridge's way home; a designated port is the forwarding port for a link; every remaining port blocks to keep the topology loop-free.",
tags: ["stp", "ports"]
},
{
type: "match",
q: "Match each STP port state to its behavior.",
pairs: [
{ item: "Blocking", match: "Receives BPDUs but forwards nothing for 20 seconds" },
{ item: "Listening", match: "Sends BPDUs without forwarding for 15 seconds" },
{ item: "Learning", match: "Learns MAC addresses without forwarding for 15 seconds" },
{ item: "Forwarding", match: "Forwards data and keeps learning indefinitely" }
],
explain: "New ports block for 20 seconds, listen for 15, learn for 15, then forward. A disabled port is shut down manually and takes no part in STP.",
tags: ["stp", "port-states"]
},
{
type: "mcq",
q: "Which STP state is the only one that forwards user data?",
options: ["Forwarding", "Blocking", "Listening", "Learning", "Disabled"],
answer: 0,
explain: "Blocking, listening, and learning all stop short of forwarding. Only the forwarding state passes frames toward their destinations.",
tags: ["stp", "forwarding"]
},
{
type: "match",
q: "Match each modern path technology to its defining trait.",
pairs: [
{ item: "RSTP", match: "IEEE 802.1w with millisecond failure recovery" },
{ item: "MSTP", match: "IEEE 802.1s with multiple spanning trees" },
{ item: "TRILL", match: "IETF multipath link-state protocol" },
{ item: "SPB", match: "IEEE 802.1aq keeping all paths active" }
],
explain: "RSTP and MSTP accelerate recovery, TRILL is a multipath link-state protocol from the IETF, and SPB manages flow across every path instead of blocking them.",
tags: ["stp", "rstp", "trill", "spb"]
},
{
type: "tf",
q: "STP normally needs to be enabled and configured manually before a new switch will block loops.",
answer: false,
explain: "STP ships with the switch operating software and runs by default. Administrators only adjust priorities or path preferences when they want specific behavior.",
tags: ["stp"]
},
{
type: "match",
q: "Match each three-tier hierarchy layer to its responsibility.",
pairs: [
{ item: "Access layer", match: "Workgroup switches connected directly to hosts" },
{ item: "Distribution layer", match: "Routing, filtering, and WAN connections" },
{ item: "Core layer", match: "Fast backbone traffic with minimal processing" }
],
explain: "Hosts attach at access, policy and routing live at distribution, and the core passes backbone traffic as quickly as possible without filtering.",
tags: ["three-tier"]
},
{
type: "mcq",
q: "Which pair correctly describes traffic direction?",
options: ["East-west leaves the segment; north-south stays between local peers", "East-west crosses the Internet; north-south stays inside a rack", "East-west is wireless; north-south is wired", "East-west stays between local peers; north-south enters or leaves the segment", "East-west is encrypted; north-south is cleartext"],
answer: 3,
explain: "A web server querying a local database is east-west traffic. A client on the Internet reaching that web server is north-south traffic through the full hierarchy.",
tags: ["traffic-flow"]
},
{
type: "mcq",
q: "What defines a spine-and-leaf architecture?",
options: ["Spine switches mesh with every leaf, and leaves connect to hosts", "A single core switch connects to every access switch in series", "Leaves connect only to each other in a ring", "Spines connect directly to servers and leaves to WAN links", "Three tiers remain but the core is removed"],
answer: 0,
explain: "Core and distribution collapse into the spine. Every leaf attaches to every spine, and leaves attach to servers and hosts, which shortens paths and adds redundancy.",
tags: ["spine-leaf"]
},
{
type: "mcq",
q: "A leaf switch serves every device in its own rack. Which arrangement is this?",
options: ["EoR switching", "MoR switching", "ToR switching", "Core switching", "Spine switching"],
answer: 2,
explain: "Top-of-rack switching places the leaf in the rack it serves. End-of-row and middle-of-row switching instead share switches across several racks.",
tags: ["tor", "spine-leaf"]
},
{
type: "multi",
q: "Which benefits are attributed to spine-and-leaf designs?",
options: ["Reduced hardware expense", "Mandatory use of original 802.1D STP", "Improved redundancy through mesh connections", "Decreased latency from fewer hops", "Improved scalability and east-west inspection"],
answer: [0, 2, 3, 4],
explain: "Mesh redundancy, fewer hops, scalability, broader security inspection, and lower cost are all benefits. The design replaces slow STP with multipath technologies.",
tags: ["spine-leaf", "benefits"]
},
{
type: "fill",
q: "How much downtime per year does 99.999 percent availability allow?",
answer: "5 minutes 15 seconds",
accepts: ["about 5 minutes", "5 minutes", "5 min 15 sec", "five minutes"],
explain: "Five nines allows only about five minutes of downtime a year. Four nines allows about 52 minutes, and three nines about 8 hours 46 minutes.",
tags: ["availability"]
},
{
type: "mcq",
q: "How do a fault and a failure differ?",
options: ["A fault is a missed service level; a failure is one bad component", "A fault is always hardware; a failure is always software", "A fault is planned downtime; a failure is unplanned", "A fault is one malfunctioning component; a failure misses a performance level", "The terms describe the same event"],
answer: 3,
explain: "A leaking water pump is a fault; the car breaking down is the failure. Fault-tolerant design stops faults from progressing into failures.",
tags: ["fault-tolerance"]
},
{
type: "match",
q: "Match each link aggregation term to its context.",
pairs: [
{ item: "Port aggregation", match: "Cisco terminology for the feature" },
{ item: "NIC teaming", match: "Windows terminology for the feature" },
{ item: "EtherChannel", match: "Cisco name for the bundled link" },
{ item: "LAG", match: "The group of physical links acting as one" }
],
explain: "Bonding, bundling, port aggregation, NIC teaming, and EtherChannel all describe combining interfaces into one logical link called a LAG, bundle, or team.",
tags: ["lag"]
},
{
type: "multi",
q: "Which advantages does a link aggregation group provide?",
options: ["Increased total throughput", "Automatic failover between member links", "Load balancing across member links", "Faster transfer speed for a single session", "Longer maximum cable distance"],
answer: [0, 1, 2],
explain: "A LAG raises aggregate bandwidth and adds failover and balancing. A single session still rides one member link at that link's own speed.",
tags: ["lag", "benefits"]
},
{
type: "tf",
q: "Link aggregation doubles the speed of a single file transfer between two hosts.",
answer: false,
explain: "Aggregation increases total bandwidth for multiple simultaneous sessions; it does not split one session across members, so that session gains no speed.",
tags: ["lag"]
},
{
type: "mcq",
q: "What must match on all interfaces in a link aggregation group?",
options: ["Hostname and management IP address", "Full duplex, speed, VLAN, and MTU settings", "SSID and wireless passphrase", "Cloud region and availability zone", "Firmware version and serial number"],
answer: 1,
explain: "Mismatched speed, duplex, VLAN, or MTU prevents the links from forming one logical interface and can leave a port suspended. LACP coordinates the bundle.",
tags: ["lag", "lacp"]
},
{
type: "mcq",
q: "What does a load balancer do with a VIP?",
options: ["Assigns the cluster a permanent DNS name only", "Encrypts traffic between cluster members", "Balances power draw across server racks", "Accepts traffic for the cluster address and selects a real server", "Reserves a public address for the router"],
answer: 3,
explain: "Clients send requests to one virtual IP representing the cluster. The balancer forwards each request to a server chosen by its algorithm.",
tags: ["load-balancer", "vip"]
},
{
type: "mcq",
q: "Which balancing algorithm is dynamic?",
options: ["Least connections", "Round-robin", "Fixed weighted rotation", "Alphabetical server order", "First available by port number"],
answer: 0,
explain: "Least connections and least response time react to live conditions, making them dynamic. Round-robin and fixed weighted rules are static.",
tags: ["load-balancing"]
},
{
type: "mcq",
q: "What is clustering?",
options: ["Stacking switches in a single rack", "Encrypting all traffic between servers", "Grouping redundant resources so they appear as one device", "Splitting one server into virtual machines", "Measuring signal loss on a link"],
answer: 2,
explain: "Clustering groups servers, routers, or applications so the rest of the network sees one device, and it usually accompanies load balancing.",
tags: ["clustering"]
},
{
type: "mcq",
q: "What is virtualization?",
options: ["A physical upgrade to faster server hardware", "A method of cabling racks in parallel", "A routing protocol for data centers", "A cloud billing model", "A logical version of a resource rather than the physical one"],
answer: 4,
explain: "Virtualization abstracts a computer system from its hardware so multiple logical systems can run on one physical machine.",
tags: ["virtualization"]
},
{
type: "mcq",
q: "In virtualization, what are the host and the guest?",
options: ["The host is the VM; the guest is the hypervisor", "The host is the physical computer; the guest is the logical computer", "The host is the cloud provider; the guest is the customer", "The host is the OS; the guest is the NIC", "The host is the storage array; the guest is the CPU"],
answer: 1,
explain: "The physical machine hosting virtual machines is the host. Each VM it runs is a guest, which typically has no awareness of the underlying hardware.",
tags: ["virtualization"]
},
{
type: "mcq",
q: "What does a hypervisor do?",
options: ["Compresses VM disk images to speed up backup", "Routes traffic between virtual LANs and subnets", "Monitors cloud billing and usage quotas", "Creates and manages VMs while allocating hardware", "Replaces the guest operating system entirely"],
answer: 3,
explain: "The hypervisor creates and manages VMs and divides CPU, memory, storage, and physical NICs among the host and its guests.",
tags: ["hypervisor"]
},
{
type: "mcq",
q: "What characterizes a type 1 hypervisor?",
options: ["It installs before any OS as a minimal operating system", "It runs as an application inside a host OS", "It requires a guest OS to boot first", "It supports only Windows guests", "It provides no hardware partitioning"],
answer: 0,
explain: "Type 1 installs on the hardware before a general-purpose OS. It is often called bare-metal, though it is itself a minimal OS relying on firmware.",
tags: ["hypervisor", "type-1"]
},
{
type: "mcq",
q: "What characterizes a type 2 hypervisor?",
options: ["It installs directly on hardware before any OS", "It partitions hardware without an OS layer", "It runs as an application inside a host operating system", "It is always faster than a type 1 hypervisor", "It cannot run multiple guest systems"],
answer: 2,
explain: "A hosted hypervisor such as VirtualBox or VMware Player depends on the host OS for resources, so its VMs are slower and less isolated than type 1 guests.",
tags: ["hypervisor", "type-2"]
},
{
type: "match",
q: "Match each hypervisor to its type.",
pairs: [
{ item: "VMware ESXi", match: "Type 1 enterprise hypervisor" },
{ item: "Proxmox VE", match: "Type 1 open-source hypervisor" },
{ item: "VirtualBox", match: "Type 2 hosted hypervisor" },
{ item: "VMware Player", match: "Type 2 desktop hypervisor" }
],
explain: "ESXi, Hyper-V, Citrix Hypervisor, and Proxmox install beneath the OS. VirtualBox and VMware Player are applications running inside a host OS.",
tags: ["hypervisor"]
},
{
type: "mcq",
q: "Why are Hyper-V and KVM described as having elements of both hypervisor types?",
options: ["They can only run one guest virtual machine at a time", "They add a virtualization layer beneath the existing OS", "They require a separate physical management server", "They cannot virtualize network adapters for guests", "They run entirely inside a web browser tab"],
answer: 1,
explain: "Hyper-V creates a virtualization layer under Windows while the existing OS keeps privileged access. Installing KVM effectively turns Linux into a type 1 hypervisor.",
tags: ["hyper-v", "kvm"]
},
{
type: "mcq",
q: "What is a vNIC?",
options: ["A physical NIC shared by two separate hosts", "A cloud load balancer front-end interface", "A VLAN tag applied to a physical switch port", "A virtual network adapter that connects a VM to a network", "A wireless antenna installed inside a VM"],
answer: 3,
explain: "Each VM can have several virtual NICs, each with its own MAC address assigned at creation, operating at the data link layer like a physical NIC.",
tags: ["vnic"]
},
{
type: "mcq",
q: "What is a vSwitch?",
options: ["Hypervisor software that passes frames between vNICs at layer 2", "A physical switch reserved for virtual machines", "A cloud router that connects VPCs", "A VLAN trunk between two racks", "A backup appliance for VM images"],
answer: 0,
explain: "The virtual switch is a logically defined layer 2 device controlled by the hypervisor, connecting VMs to each other and to the physical network.",
tags: ["vswitch"]
},
{
type: "mcq",
q: "How do type 1 and type 2 hypervisors differ in vSwitch use?",
options: ["Type 1 uses it only for guests; type 2 hosts and guests use it", "Both use it only for guests", "Type 1 hosts and guests use the vSwitch; type 2 uses it only for guests", "Neither uses a vSwitch", "Only type 2 hypervisors provide a vSwitch"],
answer: 2,
explain: "With a type 1 hypervisor, the host and its guests both connect through the vSwitch. With type 2, the host stays directly on the physical network while guests use the vSwitch.",
tags: ["vswitch"]
},
{
type: "mcq",
q: "In bridged mode, how does a VM obtain its IP address?",
options: ["From the hypervisor's private DHCP pool only", "From a hardcoded loopback address", "From the host's static address automatically", "From a VPN concentrator", "From the physical LAN's DHCP server, as its own address"],
answer: 4,
explain: "A bridged vNIC rides the host's adapter but addresses independently, so other LAN nodes see the VM as an ordinary client or server.",
tags: ["bridged"]
},
{
type: "mcq",
q: "Which mode is the default when creating a VM in VMware Player, VirtualBox, or KVM?",
options: ["Bridged mode", "NAT mode", "Host-only mode", "Internal mode", "Trunk mode"],
answer: 1,
explain: "NAT is the default in those products. Hyper-V implements it by assigning VMs to an internal network on a virtual switch.",
tags: ["nat"]
},
{
type: "mcq",
q: "In host-only mode, which systems can a VM reach?",
options: ["Any host on the physical LAN", "The Internet through the host's NIC", "The default gateway and the Internet", "Other VMs on the host and the host itself only", "Any device in the same VLAN"],
answer: 3,
explain: "Host-only mode never uses the physical NIC, so traffic stays inside the host. It suits isolated labs and incompatible or untrusted systems.",
tags: ["host-only"]
},
{
type: "mcq",
q: "A VM must serve web pages to clients on the physical LAN at a fixed address. Which mode fits?",
options: ["Bridged mode", "NAT mode", "Host-only mode", "Internal mode", "Isolated mode"],
answer: 0,
explain: "Bridged VMs get their own LAN address and are directly reachable, which is required for mail or web servers. NAT and host-only hide the VM.",
tags: ["bridged"]
},
{
type: "multi",
q: "Which are benefits of virtualization?",
options: ["More efficient use of physical resources", "Lower cost and energy consumption", "Fault and threat isolation between guests", "Simple backup, recovery, and cloning", "Elimination of single points of failure"],
answer: [0, 1, 2, 3],
explain: "Consolidation, savings, isolation, and easy images are benefits. A single host is itself a single point of failure unless clustering and failover are added.",
tags: ["virtualization", "benefits"]
},
{
type: "multi",
q: "Which are complications of virtualization?",
options: ["A host failure takes down all of its guests", "Guaranteed better performance for critical systems", "Contended performance when guests compete for resources", "Increased management complexity and forgotten VMs", "Added licensing cost for every commercial guest"],
answer: [0, 2, 3, 4],
explain: "Resource contention, administrative complexity, per-instance licensing, and shared-host failure are real drawbacks. Critical real-time systems should not share hardware.",
tags: ["virtualization", "drawbacks"]
},
{
type: "mcq",
q: "What is NFV?",
options: ["A new fiber connector standard for data centers", "Replacing physical appliances with virtual network functions", "A wireless encryption protocol for guest access", "A cloud billing category based on usage", "A switch port state used during aggregation"],
answer: 1,
explain: "Network functions virtualization runs routers, firewalls, load balancers, and similar appliances as software on shared servers instead of dedicated hardware.",
tags: ["nfv"]
},
{
type: "mcq",
q: "What does an SDN controller do?",
options: ["It forwards every frame itself through the data path", "It replaces the need for any physical network hardware", "It encrypts all traffic between network applications", "Centralizes decisions and pushes policy to physical and virtual devices", "It assigns IP addresses to every cloud instance"],
answer: 3,
explain: "The controller has a bird's-eye view, integrates configuration and management, and lets administrators reconfigure groups of devices from one dashboard.",
tags: ["sdn"]
},
{
type: "match",
q: "Match each SDN plane to its function.",
pairs: [
{ item: "Infrastructure (data) plane", match: "Forwards messages through switch and router ports" },
{ item: "Control plane", match: "Builds tables and decides paths" },
{ item: "Application plane", match: "Network applications communicate through APIs" },
{ item: "Management plane", match: "Administrators monitor devices with SSH and SNMP" }
],
explain: "The data plane is the brawn, the control plane is the brain, applications sit above APIs, and management covers remote administration and monitoring.",
tags: ["sdn", "planes"]
},
{
type: "mcq",
q: "Which interface connects an SDN controller to network devices?",
options: ["The northbound interface, using application APIs", "The management plane, using SNMP", "The southbound interface, often using OpenFlow", "The application plane, using DNS", "The data plane, using Ethernet only"],
answer: 2,
explain: "The SBI programs devices below the controller, typically with OpenFlow. The NBI exposes APIs upward to applications.",
tags: ["sdn", "sbi"]
},
{
type: "mcq",
q: "What is disaggregation in SDN?",
options: ["Combining every function into one physical appliance", "Removing all virtual switches from a host", "Splitting a cable into multiple pairs", "Dividing a cloud bill among tenants", "Separating a system's functions into pieces handled by different devices"],
answer: 4,
explain: "Disaggregation abstracts device functions into separate planes and reallocates them, which is how the control plane can move to a central controller.",
tags: ["sdn", "disaggregation"]
},
{
type: "mcq",
q: "How does application-aware SDN use deep packet inspection?",
options: ["It blocks all encrypted application traffic by default", "It analyzes deeper packet layers to adjust policy for application performance", "It rewrites application source code during deployment", "It converts application data into routing tables", "It inspects only Ethernet headers on each frame"],
answer: 1,
explain: "DPI gives the controller insight into application behavior and user experience, which it uses to make configuration changes automatically.",
tags: ["sdn", "dpi"]
},
{
type: "mcq",
q: "What is a VLAN?",
options: ["A subnet that routes traffic between networks", "A WAN link shared by branch offices", "A virtual LAN that segments traffic at layer 2", "A cloud region with multiple zones", "A tunnel that encrypts wireless traffic"],
answer: 2,
explain: "A VLAN is similar in concept to a subnet but functions at OSI layer 2 instead of layer 3, which is why STP relatives such as Rapid PVST+ operate per VLAN.",
tags: ["vlan"]
},
{
type: "mcq",
q: "What is cloud computing?",
options: ["Flexible provision of IT resources over the Internet", "A network built entirely from wireless links", "A data center owned and operated by one company", "A method of cabling servers directly to users", "A backup strategy using physical tapes"],
answer: 0,
explain: "Cloud computing delivers computing resources to clients over the Internet, usually from a provider's virtualized infrastructure.",
tags: ["cloud"]
},
{
type: "multi",
q: "Which features are part of the NIST definition of cloud computing?",
options: ["On-demand self-service", "Broad network access", "Resource pooling across tenants", "Rapid elasticity", "Permanent fixed capacity"],
answer: [0, 1, 2, 3],
explain: "NIST lists on-demand self-service, broad network access, resource pooling, measured service, and rapid elasticity. Fixed capacity contradicts elasticity.",
tags: ["cloud", "nist"]
},
{
type: "mcq",
q: "A user provisions a cloud server without contacting the provider. Which characteristic is this?",
options: ["Measured service", "Resource pooling", "Broad network access", "Rapid elasticity", "On-demand self-service"],
answer: 4,
explain: "On-demand self-service means services, applications, and storage are available whenever the user requests them, without provider intervention.",
tags: ["cloud", "self-service"]
},
{
type: "mcq",
q: "A user manages cloud resources from a tablet while traveling. Which characteristic applies?",
options: ["Resource pooling", "Broad network access", "Measured service", "Rapid elasticity", "Multitenancy"],
answer: 1,
explain: "Broad network access lets any client device type reach cloud services over an Internet connection, regardless of operating system or location.",
tags: ["cloud", "access"]
},
{
type: "mcq",
q: "Several customers pay for resources running on the same physical hardware. What is this?",
options: ["Elasticity", "Durability", "Clustering", "Multitenancy", "Disaggregation"],
answer: 3,
explain: "Resource pooling consolidates capacity, and multitenancy means multiple customers share the pooled hardware while remaining logically separate.",
tags: ["cloud", "multitenancy"]
},
{
type: "mcq",
q: "A provider bills by bandwidth, processing, and storage consumed. Which characteristic is this?",
options: ["Measured service", "Rapid elasticity", "Broad network access", "Resource pooling", "Cloud native"],
answer: 0,
explain: "Measured service means everything the provider offers is metered, and customers are limited or charged according to what they use.",
tags: ["cloud", "metering"]
},
{
type: "mcq",
q: "How do scalability and elasticity differ?",
options: ["Scalability is automatic; elasticity requires manual work", "Elasticity only applies to storage; scalability only to compute", "Scalability is the ability to grow; elasticity is changing quickly and automatically", "They are identical in the NIST definition", "Scalability is temporary; elasticity is permanent"],
answer: 2,
explain: "Scalability is the capacity to scale without harming the workload. Elasticity is the speed and automation of that change as demand shifts.",
tags: ["cloud", "elasticity"]
},
{
type: "mcq",
q: "What does cloud native describe?",
options: ["Moving an on-premises application unchanged to a VM", "Building a private data center from scratch", "Using only physical servers in the cloud", "Storing all data on local drives", "Designing services to take full advantage of the cloud environment"],
answer: 4,
explain: "Cloud-native designs use services built for the cloud, such as compute that runs code without server management or storage that scales indefinitely.",
tags: ["cloud-native"]
},
{
type: "mcq",
q: "Which model provides virtual hardware while the customer manages the OS and applications?",
options: ["PaaS", "IaaS", "SaaS", "DaaS", "On-premises"],
answer: 1,
explain: "Infrastructure as a Service supplies virtual servers, networking, and storage. The customer installs and patches the OS and manages applications and data.",
tags: ["iaas"]
},
{
type: "mcq",
q: "A developer runs code without managing a server or operating system. Which model is this?",
options: ["IaaS", "SaaS", "On-premises", "PaaS", "Colocation"],
answer: 3,
explain: "Platform as a Service supplies the OS, runtimes, and hardware, including containers and serverless compute, so developers focus on their applications and data.",
tags: ["paas"]
},
{
type: "mcq",
q: "Which model delivers an application through a browser while the provider manages everything except user data?",
options: ["SaaS", "PaaS", "IaaS", "DaaS", "NFV"],
answer: 0,
explain: "Software as a Service covers webmail, CRM, and online office suites. The customer supplies only the device, browser, data, and access credentials.",
tags: ["saas"]
},
{
type: "mcq",
q: "What are DaaS and XaaS?",
options: ["DaaS provides databases; XaaS provides wireless access", "DaaS provides DNS; XaaS provides DHCP", "DaaS provides virtual desktops; XaaS covers any service mix", "DaaS is on-premises; XaaS is always private", "DaaS is a hypervisor type; XaaS is a hypervisor mode"],
answer: 2,
explain: "DaaS is a SaaS variant delivering a hosted virtual desktop. XaaS is the broad anything-as-a-service category covering whatever mix a client needs.",
tags: ["daas", "xaas"]
},
{
type: "mcq",
q: "What does the shared responsibility model divide?",
options: ["Costs between departments in one company", "Traffic between east-west and north-south flows", "Storage between block and object formats", "Addresses between public and private ranges", "Responsibilities between the cloud provider and the cloud customer"],
answer: 4,
explain: "The provider generally owns the physical data center and its security, the customer generally owns its data, and the middle shifts with the service model.",
tags: ["shared-responsibility"]
},
{
type: "mcq",
q: "Which AWS service lets customers create and run their own cloud VMs?",
options: ["S3", "EC2", "Lambda", "CloudFront", "Route 53"],
answer: 1,
explain: "Elastic Compute Cloud provides processing, storage, and deployment services so customers can create VMs, install an OS, and run their own applications.",
tags: ["iaas", "ec2"]
},
{
type: "match",
q: "Match each service model to its management boundary.",
pairs: [
{ item: "IaaS", match: "Vendor manages virtualization through networking" },
{ item: "PaaS", match: "Vendor also manages the operating system" },
{ item: "SaaS", match: "Vendor manages everything except user data" },
{ item: "On-premises", match: "Customer manages every layer" }
],
explain: "Responsibility shifts upward at each model: the vendor takes on more of the stack while the customer keeps progressively less.",
tags: ["service-models"]
},
{
type: "mcq",
q: "What is a public cloud?",
options: ["Services offered over public lines and open to the general public", "Services reserved for one organization's approved users", "Services shared by organizations with common interests", "Services that combine private and public resources", "Services hosted only on customer hardware"],
answer: 0,
explain: "Public cloud services run on the provider's infrastructure and are available to anyone, with resources shared across customers.",
tags: ["public-cloud"]
},
{
type: "mcq",
q: "What is a private cloud?",
options: ["Services sold to any customer over the Internet", "Services shared by hospitals in one region", "Services dedicated to a single organization and its approved users", "Services split between two providers", "Services hosted only by a third party"],
answer: 2,
explain: "A private cloud runs on the organization's own servers or remotely for its exclusive use, giving it more control than a public cloud.",
tags: ["private-cloud"]
},
{
type: "mcq",
q: "Hospitals in one region share a medical database that is not public. Which model is this?",
options: ["Public cloud", "Private cloud", "Hybrid cloud", "Multicloud", "Community cloud"],
answer: 4,
explain: "A community cloud serves multiple organizations with common interests, such as regulatory or data-sharing needs, without opening access to the public.",
tags: ["community-cloud"]
},
{
type: "mcq",
q: "A company keeps data in a private cloud but uses public cloud email. Which model is this?",
options: ["Public cloud only", "Hybrid cloud", "Private cloud only", "Community cloud", "On-premises only"],
answer: 1,
explain: "Hybrid cloud combines public and private resources. It often results from keeping legacy systems on-premises while adopting cloud services.",
tags: ["hybrid-cloud"]
},
{
type: "mcq",
q: "What separates multicloud from simply using several providers?",
options: ["Every provider must offer the same service catalog", "All providers must be public clouds", "The organization must own the hardware", "The services from different providers must be integrated and communicate", "Only one provider may hold production data"],
answer: 3,
explain: "Multicloud combines services across providers into one deployment. Independent services that never connect do not qualify.",
tags: ["multicloud"]
},
{
type: "match",
q: "Match each cloud access method to its user.",
pairs: [
{ item: "GUI portal", match: "Beginners clicking through wizards in a browser" },
{ item: "CLI", match: "Administrators typing repeatable commands" },
{ item: "SDK", match: "Developers coding in their language" },
{ item: "API", match: "Applications making machine-to-machine calls" }
],
explain: "Portals serve general users, command lines suit admins, SDKs fit developers, and APIs connect software without a human in the loop.",
tags: ["cloud", "access-methods"]
},
{
type: "match",
q: "Match each cloud service category to its purpose.",
pairs: [
{ item: "Compute", match: "Processing power from VMs, containers, or serverless" },
{ item: "Networking", match: "Routing, subnetting, DNS, and firewalls" },
{ item: "Storage", match: "Durable data with tiered access and controls" },
{ item: "Security", match: "Protection services for cloud resources" }
],
explain: "Cloud platforms group services by purpose, and the largest providers organize them into dozens of such categories.",
tags: ["cloud", "services"]
},
{
type: "mcq",
q: "What does an SLA define for cloud services?",
options: ["The exact source code of the provider's platform", "The physical address of each data center", "The provider's internal staffing plan", "The customer's application architecture", "Which aspects of a service are guaranteed available"],
answer: 4,
explain: "Service-level agreements state the guaranteed availability and related commitments. Read them carefully before choosing a provider or tier.",
tags: ["sla"]
},
{
type: "mcq",
q: "S3 advertises eleven nines of durability but four nines of availability. What does that mean?",
options: ["Data is often lost but always reachable", "Data almost never disappears but can be briefly unreachable", "Durability and availability describe the same outage", "Durability measures download speed", "Availability measures storage capacity"],
answer: 1,
explain: "Durability is a resource's ongoing existence, achieved by copying objects across devices and sites. Availability is whether you can reach it right now.",
tags: ["durability", "availability"]
},
{
type: "mcq",
q: "How do reliability and resiliency differ?",
options: ["Reliability is recovery; resiliency is error-free operation", "Both describe storage capacity", "Reliability applies only to networks; resiliency only to servers", "Reliability is error-free operation; resiliency is recovery from errors", "The terms are interchangeable"],
answer: 3,
explain: "Reliability describes how well a resource runs without errors. Resiliency describes how well it recovers even if it becomes unavailable during an outage.",
tags: ["reliability", "resiliency"]
},
{
type: "mcq",
q: "What is a static inventory?",
options: ["An unchanging record of infrastructure resources", "A list that updates automatically as resources change", "A cloud provider's pricing catalog", "A snapshot of switch MAC tables", "A pipeline that deploys code"],
answer: 0,
explain: "A static inventory stays fixed. Cloud and virtual environments are in constant flux, so they need a dynamic inventory that adapts to changes and inputs.",
tags: ["inventory"]
},
{
type: "mcq",
q: "What is a pipeline?",
options: ["A physical conduit carrying network cables", "A cloud region with multiple zones", "A sequence of entry, transition, and exit points", "A queue of unanswered support tickets", "A type of switch stacking cable"],
answer: 2,
explain: "Pipelines move work through automated or manual transitions. Software pipelines support iterative development, while data pipelines collect, analyze, and store data.",
tags: ["pipeline"]
},
{
type: "mcq",
q: "How does a data pipeline differ from a software pipeline?",
options: ["It deploys code to production while software pipelines test it", "It runs only on physical servers", "It replaces source control entirely", "It manages switch firmware instead of code", "It collects, analyzes, and stores data rather than building an application"],
answer: 4,
explain: "Software pipelines support iterative application development. Data pipelines gather data from sources, ingest and analyze it for insight, and store it for later research.",
tags: ["pipeline", "data"]
},
{
type: "mcq",
q: "What is infrastructure as code?",
options: ["Installing applications from removable media", "Managing resources with code files instead of manual commands", "Writing application source code directly on a server", "Documenting a network topology in a spreadsheet", "Encrypting all infrastructure traffic on the wire"],
answer: 1,
explain: "IaC uses text-based commands in formats such as JSON, Python, or YAML. It records who changed what and when, allows reverts, and enables automation.",
tags: ["iac"]
},
{
type: "mcq",
q: "Which benefit does infrastructure as code provide?",
options: ["Automatic replacement of all physical hardware", "Elimination of the need for testing", "Guaranteed zero cloud cost", "A tracked, reversible history of configuration changes", "Permanent manual approval of every change"],
answer: 3,
explain: "IaC tracks the before and after state of resources, supports reverting to earlier states, and lets changes be triggered automatically.",
tags: ["iac"]
},
{
type: "mcq",
q: "What is orchestration?",
options: ["Automating many tasks to work together in a complex workflow", "Running a single command on one server", "Manually approving each configuration change", "Balancing traffic across web servers", "Copying files between data centers"],
answer: 0,
explain: "Orchestration chains automated tasks into a lengthy workflow, minimizing hands-on administration and reducing human error.",
tags: ["orchestration"]
},
{
type: "mcq",
q: "What is a playbook in an orchestrated deployment?",
options: ["A printed troubleshooting guide for technicians", "A list of approved cloud providers", "A template defining which tasks run and in what sequence", "A record of past security incidents", "A script that only tests network latency"],
answer: 2,
explain: "The playbook defines the collection of tasks to orchestrate, including which resources to deploy, how to deploy them, and the order of operations.",
tags: ["orchestration", "playbook"]
},
{
type: "mcq",
q: "What is AWS CloudFormation?",
options: ["A physical rack of servers in an AWS region", "A monitoring dashboard for cloud billing", "A hypervisor for running Windows VMs", "A protocol for switch management", "A service that deploys resources from JSON templates"],
answer: 4,
explain: "CloudFormation templates can deploy and configure everything a solution needs, such as a web server, database, and security protections for a WordPress blog.",
tags: ["orchestration", "cloudformation"]
},
{
type: "mcq",
q: "What is configuration drift?",
options: ["The movement of VMs between hosts", "A gradual departure from approved configurations", "A shift in cloud pricing tiers", "The delay in replicating data to a backup site", "A routing loop between switches"],
answer: 1,
explain: "Drift can break compliance. Automation enforces defined configurations or alerts administrators when thresholds are exceeded.",
tags: ["automation", "config-drift"]
},
{
type: "mcq",
q: "What is source control?",
options: ["Controlling which users may access a source repository", "Copying source code to a backup tape", "Limiting where source traffic may travel", "Tracking and managing changes to code so they can be tested or reversed", "Selecting the source address for outbound traffic"],
answer: 3,
explain: "Source control, also called version control, systematically develops, tests, integrates, and reverses changes to code and infrastructure definitions.",
tags: ["source-control"]
},
{
type: "match",
q: "Match each source-control term to its meaning.",
pairs: [
{ item: "Central repository", match: "Authoritative code, especially what production runs" },
{ item: "Branch", match: "A copy for development and testing" },
{ item: "Commit", match: "Uploading changes into the current branch" },
{ item: "Merge", match: "Folding approved changes into production" }
],
explain: "The repository holds the authoritative version, branches isolate work, commits record changes, and merges create a new documented production version.",
tags: ["source-control"]
},
{
type: "mcq",
q: "What happens when two developers edit the same code?",
options: ["The newer edit silently overwrites the older one", "Both edits are merged without review", "The version control system adds conflict markers and blocks the merge", "The repository is deleted and rebuilt", "The branch is automatically promoted to production"],
answer: 2,
explain: "Conflicts arise from overlapping edits or deletions. Markers block merging until the team resolves them.",
tags: ["source-control", "conflicts"]
},
{
type: "tf",
q: "Committing often, testing before committing, and communicating between teams all reduce source-control conflicts.",
answer: true,
explain: "Small frequent commits, self-testing, and clear communication are the chapter's best practices for avoiding merge conflicts.",
tags: ["source-control"]
}
]
});