window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 6: Wireless Networking",
items: [
{
type: "mcq",
q: "Which description matches a WLAN?",
options: ["A LAN that carries frames through the air using RF waves", "A LAN built from fiber uplinks between switches", "A WAN that links branch offices over leased lines", "A VLAN that splits one switch into segments", "A PAN limited to one desk's peripherals"],
answer: 0,
explain: "A WLAN is a local area network whose medium is the air, carrying frames as radio frequency waves rather than electrical or optical signals in a cable.",
tags: ["wlan", "wireless"]
},
{
type: "mcq",
q: "What frequency range does the FCC define as the wireless spectrum?",
options: ["88 MHz to 108 MHz", "9 MHz to 300 MHz", "9 kHz to 300 GHz", "2.4 GHz to 6 GHz", "300 GHz to 3 THz"],
answer: 2,
explain: "The airwaves run from 9 kHz to 300 GHz. Wi-Fi occupies narrow slices of that much larger range.",
tags: ["spectrum", "fcc"]
},
{
type: "mcq",
q: "Which services share the frequency range around 2.4 GHz?",
options: ["AM broadcast, FM broadcast, and shortwave", "Cellular 800, cellular 1900, and L-band satellite", "C-band, Ku-band, and Ka-band satellite links", "Wi-Fi, Bluetooth, RFID, and some satellite", "Airport radar, weather radar, and military radar"],
answer: 3,
explain: "Wi-Fi, Bluetooth, RFID, and some satellite signals all live near 2.4 GHz, which is why that band is so congested.",
tags: ["spectrum", "2-4-ghz"]
},
{
type: "mcq",
q: "Which band hosts primary-use radar from airports, weather stations, satellites, and the military?",
options: ["2.4 GHz", "5 GHz", "6 GHz", "900 MHz", "60 GHz"],
answer: 1,
explain: "5 GHz already belongs to important radar users, so 802.11h adds DFS and TPC to keep Wi-Fi from interfering with them.",
tags: ["5-ghz", "radar"]
},
{
type: "tf",
q: "Simultaneous transmissions on the same frequency force retransmissions that lower throughput.",
answer: true,
explain: "Same-frequency energy interferes, so frames arrive corrupted and must be sent again. Collisions are a direct performance drain.",
tags: ["collision"]
},
{
type: "mcq",
q: "How does FHSS move data across a band?",
options: ["It spreads each frame across every frequency at once", "It assigns each client a permanent narrow slice", "It sends short bursts that hop to the next frequency in sequence", "It bonds adjacent channels into one wider channel", "It reserves the medium with RTS and CTS frames"],
answer: 2,
explain: "FHSS transmits a short burst on one frequency, then the next burst on the next frequency in the sequence, hopping hundreds of times per second.",
tags: ["fhss"]
},
{
type: "mcq",
q: "What does DSSS do with a data stream?",
options: ["Divides it into chips spread over all available frequencies at once", "Hops it between frequencies hundreds of times per second", "Assigns each transmission its own encryption key", "Reserves one channel for large frames", "Splits a channel into 2 MHz allocations per client"],
answer: 0,
explain: "DSSS encodes data into small chunks called chips and spreads them across every available frequency simultaneously, using a device-specific chipping code.",
tags: ["dsss"]
},
{
type: "mcq",
q: "Which spread-spectrum technology does Wi-Fi use?",
options: ["FHSS", "OFDMA", "CSMA/CD", "TDMA", "DSSS"],
answer: 4,
explain: "Wi-Fi uses DSSS, while Bluetooth is the chapter's FHSS example. OFDMA is a later multiuser technique, not the spread-spectrum method.",
tags: ["dsss", "wifi"]
},
{
type: "mcq",
q: "How many channels does Bluetooth hop across?",
options: ["11", "24", "79", "59", "14"],
answer: 2,
explain: "Bluetooth is allocated 79 channels. Constant hopping makes interference and collisions less disruptive than they would be on a fixed channel.",
tags: ["bluetooth", "fhss"]
},
{
type: "mcq",
q: "What role does the master device play in a Bluetooth piconet?",
options: ["It retransmits every frame twice for reliability", "It supplies the clock other devices use to coordinate hopping", "It reserves a bonded 40 MHz channel", "It authenticates devices against a RADIUS server", "It converts FHSS bursts into DSSS chips"],
answer: 1,
explain: "One device is designated master and provides the clock that keeps every member hopping in step.",
tags: ["bluetooth", "piconet"]
},
{
type: "mcq",
q: "Which advantage does FHSS hold over DSSS?",
options: ["Higher throughput in clear environments", "More efficient use of the available bandwidth", "Support for 160 MHz bonded channels", "Better performance in crowded indoor spaces", "No need to synchronize devices"],
answer: 3,
explain: "FHSS is cheaper to implement and performs better in crowded indoor environments, though DSSS uses bandwidth more efficiently and pushes higher throughput.",
tags: ["fhss", "dsss"]
},
{
type: "fill",
q: "How many 20 MHz Wi-Fi channels does the FCC define for the 2.4 GHz band in the United States?",
answer: "11",
accepts: ["eleven"],
explain: "The FCC defines 11 channels in the 2.4 GHz band; some other countries define 14.",
tags: ["channels", "2-4-ghz"]
},
{
type: "fill",
q: "How wide is each Wi-Fi channel in the United States, in MHz?",
answer: "20 MHz",
accepts: ["20", "20MHz"],
explain: "Each channel is 20 MHz wide. Bonding combines two of them into 40 MHz, and newer standards bond further into 80 or 160 MHz.",
tags: ["channels"]
},
{
type: "mcq",
q: "Why does bonding two 20 MHz channels more than double the usable bandwidth?",
options: ["Both channels transmit at double power", "Bonding uses a simpler modulation scheme", "Buffer space at the channel edges can carry data", "Bonding removes acknowledgment overhead", "Bonding disables CSMA/CA"],
answer: 2,
explain: "The small bands at the top and bottom of each 20 MHz channel normally reserved as interference buffers can be reassigned to carry data once the channels are bonded.",
tags: ["channel-bonding"]
},
{
type: "mcq",
q: "Which band is better suited to channel bonding?",
options: ["5 GHz, which has more channels and less crowding", "2.4 GHz, whose longer wavelengths carry more data", "6 GHz, which is restricted to low-power devices", "900 MHz, which avoids radar entirely", "2.4 GHz, which offers 59 channels"],
answer: 0,
explain: "Bonding needs adjacent free channels. The 5 GHz band supplies more channels and less congestion than 2.4 GHz.",
tags: ["channel-bonding", "5-ghz"]
},
{
type: "mcq",
q: "What does OFDMA let an access point do?",
options: ["Combine two 20 MHz channels into one 40 MHz channel", "Subdivide a channel into smaller allocations for several clients at once", "Hop between frequencies to dodge interference", "Reserve the medium with RTS and CTS frames", "Lower transmit power when radar is detected"],
answer: 1,
explain: "OFDMA splits each channel into smaller frequency allocations, so the AP can send multiple small frames to multiple clients in the same channel at the same time.",
tags: ["ofdma"]
},
{
type: "mcq",
q: "What does the 802.11h amendment address?",
options: ["Channel planning for the unlicensed 6 GHz band", "Encryption of management frames between AP and client", "320 MHz channel bonding for high throughput", "WPA3 support on older wireless client devices", "Spectrum and transmit power management in the 5 GHz band"],
answer: 4,
explain: "802.11h, the Spectrum and Transmit Power Management Extensions, lets 5 GHz APs detect priority signals and adjust their operation to avoid interfering with them.",
tags: ["802-11h", "5-ghz"]
},
{
type: "mcq",
q: "How does DFS respond to a priority signal on a 5 GHz channel?",
options: ["It bonds the channel with a neighbor", "It raises power until the other signal is overwhelmed", "It stops transmitting on that channel and tells clients about the change", "It moves clients to the 2.4 GHz band", "It encrypts the channel's management frames"],
answer: 2,
explain: "Dynamic Frequency Selection monitors the channel, and when a priority signal appears the AP stops using that channel and informs its clients of the change.",
tags: ["dfs", "5-ghz"]
},
{
type: "mcq",
q: "What does Transmit Power Control do?",
options: ["It lowers the AP's transmit power to reduce interference risk", "It raises power to overpower radar", "It controls which channels clients may probe", "It authenticates clients before association", "It aligns both antennas to one polarization"],
answer: 0,
explain: "TPC reduces the AP's transmission power on a channel to limit interference, and it tells clients about any power limits for the network.",
tags: ["tpc", "802-11h"]
},
{
type: "mcq",
q: "Which situation calls for a directional antenna?",
options: ["Covering a stadium from one ceiling point", "Bridging two buildings with a fixed link", "Broadcasting television across a city", "Serving phones moving in every direction", "Spreading a signal in a perfect sphere"],
answer: 1,
explain: "A directional antenna concentrates energy along a single path, which is ideal for a point-to-point link between two fixed locations.",
tags: ["antenna", "directional"]
},
{
type: "mcq",
q: "Which use fits an omnidirectional antenna?",
options: ["Satellite downlink to one dish", "Point-to-point bridge between LANs", "Aiming down from a high ceiling", "Linking two APs 1,000 feet apart", "Cellular towers serving mobile devices"],
answer: 4,
explain: "Omnidirectional antennas radiate in all directions, which suits towers and mobile clients whose position cannot be predicted.",
tags: ["antenna", "omnidirectional"]
},
{
type: "mcq",
q: "Why must an AP sit close to a separately mounted antenna?",
options: ["Coax amplifies the signal over distance", "Coax changes the signal's polarization", "Coax carries power but not data", "Coax attenuates Wi-Fi signals within a few feet", "Coax is required only for directional antennas"],
answer: 3,
explain: "Wi-Fi signals degrade quickly over even short runs of coax, so attenuating cable forces the AP to be placed very near the antenna.",
tags: ["antenna", "coax", "attenuation"]
},
{
type: "mcq",
q: "What does an RSSI of -70 dBm indicate?",
options: ["Excellent signal, possible only beside the AP", "The minimum for reliable data delivery", "Enough for basic connectivity only", "A signal too weak to associate", "Ideal for time-sensitive VoIP"],
answer: 1,
explain: "At -70 dBm data delivery is still reliable. Below that, -80 dBm supports only basic connectivity and -90 dBm is effectively unusable.",
tags: ["rssi"]
},
{
type: "mcq",
q: "Which RSSI level supports time-sensitive traffic such as VoIP and streaming video?",
options: ["-50 dBm", "-70 dBm", "-80 dBm", "-90 dBm", "-100 dBm"],
answer: 0,
explain: "-50 dBm is rated good and is the level at which time-sensitive data such as VoIP or streaming video is delivered reliably.",
tags: ["rssi"]
},
{
type: "mcq",
q: "Which Linux command does the chapter suggest for checking wireless interface details?",
options: ["iwlist scan", "iw dev", "iwconfig", "nmcli device wifi list", "ip addr show wlan0"],
answer: 1,
explain: "The chapter points to iw dev as the quick way to inspect wireless interfaces on Linux; a Wi-Fi analyzer is still needed for a full site picture.",
tags: ["linux", "rssi", "tools"]
},
{
type: "mcq",
q: "A signal splits into secondary waves that bend around the corner of a wall. Which phenomenon is this?",
options: ["Reflection", "Refraction", "Scattering", "Diffraction", "Fading"],
answer: 3,
explain: "Diffraction splits a wave at an obstruction with sharp edges, producing secondary waves that appear to bend around the obstacle.",
tags: ["diffraction", "propagation"]
},
{
type: "mcq",
q: "Which phenomenon occurs when a signal bounces off a large metal surface?",
options: ["Reflection", "Refraction", "Scattering", "Diffraction", "Attenuation"],
answer: 0,
explain: "Reflection sends the wave back toward its source. Surfaces large and flat compared with the wavelength, especially conductive ones, reflect most readily.",
tags: ["reflection", "propagation"]
},
{
type: "mcq",
q: "Which conditions produce scattering?",
options: ["Large flat conductive surfaces", "Media of different density such as glass or water", "Rough surfaces and objects small relative to the wavelength", "Sharp edges of walls and desks", "Increasing distance from the transmitter"],
answer: 2,
explain: "When an object is small compared with the wavelength, or its surface is rough, the signal diffuses in many directions instead of reflecting cleanly.",
tags: ["scattering", "propagation"]
},
{
type: "mcq",
q: "What happens to a signal that refracts?",
options: ["It bounces back toward its source off a flat surface", "Its direction, speed, and wavelength change in a new medium", "It splits into secondary waves around sharp edges", "It diffuses in many directions off rough objects", "It gradually loses energy as obstacles accumulate"],
answer: 1,
explain: "Refraction occurs at a change of medium, such as glass or water, where the wave's direction, speed, and wavelength are altered.",
tags: ["refraction", "propagation"]
},
{
type: "mcq",
q: "Which statement describes fading?",
options: ["Rapid hopping between frequencies", "Complete reflection off metal", "Signal loss caused only by distance", "Gradual energy loss as obstacles are encountered", "Noise from other transmitters"],
answer: 3,
explain: "Fading is the gradual loss of energy as a signal runs into obstacles, leaving the receiver with less than was transmitted and risking dropped connections.",
tags: ["fading", "propagation"]
},
{
type: "mcq",
q: "Which action counters attenuation without moving the client?",
options: ["Change antenna polarization", "Lower the AP transmit power", "Switch the AP from DSSS to FHSS", "Disable channel bonding", "Increase transmit power or add a repeater"],
answer: 4,
explain: "Attenuation is distance-based weakening, so amplifying the signal or extending it with a repeater or range extender restores usable strength.",
tags: ["attenuation"]
},
{
type: "mcq",
q: "What does SNR compare?",
options: ["Noise to signal strength, where higher is better", "Signal to noise, where lower is better", "Two adjacent channel widths", "Received power to transmit power", "Clients to available channels"],
answer: 0,
explain: "SNR is the ratio of noise to signal strength. A high SNR is good, and noisy environments such as dense metropolitan areas produce a lower SNR.",
tags: ["snr", "interference"]
},
{
type: "mcq",
q: "What is the main downside of multipath signals?",
options: ["They cannot pass through walls", "Only one copy ever reaches the receiver", "Copies arrive at different times and can be misread", "They prevent channel bonding", "They disable acknowledgments"],
answer: 2,
explain: "Bounced copies travel different distances, so they arrive at different times. The receiver can misinterpret the overlapping instances, producing data errors and retransmissions.",
tags: ["multipath"]
},
{
type: "match",
q: "Match each propagation phenomenon to its cause.",
pairs: [
{ item: "Attenuation", match: "Distance from the transmission source" },
{ item: "Reflection", match: "Large flat surfaces compared with the wavelength" },
{ item: "Scattering", match: "Rough or small objects compared with the wavelength" },
{ item: "Diffraction", match: "Obstructions with sharp edges" }
],
explain: "Weakening with distance is attenuation, bouncing off large flat surfaces is reflection, diffusion off small or rough objects is scattering, and splitting around sharp edges is diffraction.",
tags: ["propagation"]
},
{
type: "multi",
q: "Which statements about the 2.4 GHz Wi-Fi band are accurate?",
options: ["The FCC defines 11 channels in the United States", "Each channel is 20 MHz wide", "Each channel is 40 MHz wide by default", "Bluetooth and RFID share this band", "The band spans 5.925 to 7.125 GHz"],
answer: [0, 1, 3],
explain: "In the United States 2.4 GHz offers 11 channels, each 20 MHz wide, shared with Bluetooth and RFID. The 5.925 to 7.125 GHz range is the 6 GHz band.",
tags: ["2-4-ghz", "channels"]
},
{
type: "tf",
q: "Line-of-sight propagation maximizes distance for the energy used and gives the clearest signal.",
answer: true,
explain: "LOS is ideal because nothing blocks the path, but the atmosphere is unguided and obstacles usually prevent it, which is why multipath is common.",
tags: ["propagation", "los"]
},
{
type: "mcq",
q: "Which OSI layers do WLAN standards define?",
options: ["Layers 1 and 3", "Layers 3 and 4", "Layers 1 and 2", "Layers 2 and 3", "Layers 4 through 7"],
answer: 2,
explain: "WLANs define operations at Layers 1 and 2 while reusing the same IP, TCP, and UDP protocols above them, which lets wired and wireless networks interoperate.",
tags: ["osi", "802-11"]
},
{
type: "mcq",
q: "How many address fields does an 802.11 data frame carry?",
options: ["One", "Two", "Three", "Four", "Six"],
answer: 3,
explain: "The 802.11 data frame carries four 6-byte addresses: source, transmitter, receiver, and destination. Ethernet's 802.3 frame carries only two.",
tags: ["frames", "addressing"]
},
{
type: "match",
q: "Match each 802.11 standard to its maximum theoretical throughput.",
pairs: [
{ item: "802.11b", match: "11 Mbps" },
{ item: "802.11g", match: "54 Mbps in the 2.4 GHz band" },
{ item: "802.11n", match: "600 Mbps using both bands" },
{ item: "802.11ac", match: "6.93 Gbps with eight streams" },
{ item: "802.11ax", match: "9.6 Gbps across 2.4, 5, and 6 GHz" },
{ item: "802.11be", match: "46 Gbps with 6 GHz improvements" }
],
explain: "Each generation raises the ceiling: 11 Mbps, then 54 Mbps, then 600 Mbps, then multi-gigabit rates from 802.11ac onward.",
tags: ["standards", "throughput"]
},
{
type: "mcq",
q: "What geographic range is rated for 802.11a?",
options: ["50 m", "70 m", "100 m", "250 m", "120 m"],
answer: 0,
explain: "802.11a is rated at 50 m, half the 100 m of 802.11b and 802.11g, because its higher frequency travels a shorter distance.",
tags: ["802-11a", "range"]
},
{
type: "mcq",
q: "How wide are 802.11b channels?",
options: ["20 MHz", "22 MHz", "40 MHz", "80 MHz", "160 MHz"],
answer: 1,
explain: "802.11b separates the 2.4 GHz band into 22 MHz channels, slightly wider than the 20 MHz channels used by later standards.",
tags: ["802-11b", "channels"]
},
{
type: "mcq",
q: "Why is 802.11a rarely the preferred choice?",
options: ["It shares the crowded 2.4 GHz band with Bluetooth", "It delivers lower throughput than 802.11b", "It cannot coexist with any other 802.11 standard", "Its higher frequencies need more power and denser APs", "It supports only ad hoc topologies without an AP"],
answer: 3,
explain: "5 GHz signals need more power, travel shorter distances, and require denser AP placement, making 802.11a more expensive than b or g for the same coverage.",
tags: ["802-11a"]
},
{
type: "fill",
q: "Which earlier 802.11 standard is 802.11g backward compatible with?",
answer: "802.11b",
accepts: ["b", "11b"],
explain: "802.11g was designed to match 802.11b's affordability while raising throughput, and it stayed compatible with 802.11b so older clients kept working during upgrades.",
tags: ["802-11g", "compatibility"]
},
{
type: "mcq",
q: "Which band does 802.11ac use?",
options: ["2.4 GHz only", "6 GHz only", "5 GHz only", "2.4 GHz and 5 GHz", "2.4 GHz, 5 GHz, and 6 GHz"],
answer: 2,
explain: "802.11ac operates on the 5 GHz band, where wider channels and less congestion let it approach Gigabit Ethernet speeds.",
tags: ["802-11ac", "5-ghz"]
},
{
type: "mcq",
q: "What problem does BSS coloring address in 802.11ax?",
options: ["Weak encryption on management frames", "Channel overlap with radar", "Client roaming between bands", "Power limits in the 6 GHz band", "Interference from neighboring Wi-Fi networks"],
answer: 4,
explain: "BSS coloring tags frames so an AP and its clients can ignore traffic from neighboring networks that would otherwise look like same-network contention.",
tags: ["802-11ax", "bss-coloring"]
},
{
type: "mcq",
q: "How wide is the 6 GHz range that Wi-Fi 6E uses?",
options: ["70 MHz", "1,200 MHz", "500 MHz", "83.5 MHz", "700 MHz"],
answer: 1,
explain: "The 6 GHz range totals 1,200 MHz, wider than 2.4 GHz (about 70 MHz) or 5 GHz (about 500 MHz), which allows many more channels but shorter reach.",
tags: ["wifi-6e", "6-ghz"]
},
{
type: "mcq",
q: "What does an AP's ability to saturate its range describe?",
options: ["How many antennas it can drive at once", "How well it fills its coverage area with a strong, fast signal", "How many channels it can bond together", "How quickly it reassociates roaming clients", "How much power it draws at peak load"],
answer: 1,
explain: "Rated range is less useful than saturation: newer standards keep a fast signal across their whole coverage area, so at 75 m an 802.11ac AP outperforms an 802.11n AP.",
tags: ["saturation", "range"]
},
{
type: "mcq",
q: "Which frames handle association and reassociation?",
options: ["Management frames", "Control frames", "Data frames", "Beacon-only frames", "Encrypted frames"],
answer: 0,
explain: "Management frames cover association and reassociation; probe and beacon frames are examples.",
tags: ["frames", "management"]
},
{
type: "mcq",
q: "Which pair are control frames?",
options: ["Probe and beacon", "Data and payload", "Association and reassociation", "ACK and RTS/CTS", "Beacon and data"],
answer: 3,
explain: "ACK and RTS/CTS are control frames, used for medium access and data delivery. Probe and beacon are management frames.",
tags: ["frames", "control"]
},
{
type: "mcq",
q: "What is the Sequence Control field used for?",
options: ["It records the frame's encryption type", "It shows how a large packet was fragmented", "It lists the transmitting antenna", "It reports received signal strength", "It identifies the channel in use"],
answer: 1,
explain: "Sequence Control indicates how a large packet is subdivided into smaller frames for more reliable delivery, a field unique to the 802.11 frame.",
tags: ["frames", "fragmentation"]
},
{
type: "mcq",
q: "What does the Duration field tell other nodes?",
options: ["How long the network SSID is allowed to be", "How long the client has been associated with the AP", "How long the current encryption key remains valid", "How long the frame may be retried after an error", "How long the transmission will take, so the channel frees up"],
answer: 4,
explain: "Duration announces the length of the current transmission so other nodes know when the medium becomes available again.",
tags: ["frames", "duration"]
},
{
type: "mcq",
q: "What limitation does CSMA/CA have?",
options: ["It cannot prevent collisions", "It requires RTS/CTS on every frame", "It cannot detect collisions that occur", "It works only on wired media", "It eliminates the need for ACKs"],
answer: 2,
explain: "Collision avoidance reduces the chance of collisions but cannot detect one after it happens, so recovery depends on missing acknowledgments and retransmission.",
tags: ["csma-ca"]
},
{
type: "mcq",
q: "What is the hidden node problem?",
options: ["An access point hidden inside a dropped ceiling", "Two nodes too far apart to detect each other's transmissions", "A client whose network SSID is not being broadcast", "A data frame hidden inside encrypted traffic", "A rogue access point cloaked as a legitimate one"],
answer: 1,
explain: "Nodes at opposite edges of a coverage area cannot hear each other, so they may transmit to the AP at the same time and collide.",
tags: ["hidden-node", "csma-ca"]
},
{
type: "mcq",
q: "What is the tradeoff of enabling RTS/CTS?",
options: ["It adds overhead but protects large packets from collisions", "It removes overhead and speeds small frames", "It encrypts every frame at the MAC layer", "It replaces acknowledgments entirely", "It prevents clients from roaming"],
answer: 0,
explain: "RTS/CTS reserves the medium for one node, which costs efficiency but is worthwhile for large packets that are more vulnerable to collision problems.",
tags: ["rts-cts"]
},
{
type: "mcq",
q: "In active scanning, what does the client transmit?",
options: ["A beacon on one channel", "An ACK to the AP", "A CTS frame", "A probe on all available channels", "A reassociation request"],
answer: 3,
explain: "Active scanning puts the client in charge: it probes every channel in range and the AP answers with a probe response containing what the client needs to associate.",
tags: ["active-scanning", "association"]
},
{
type: "mcq",
q: "What information does a beacon frame carry?",
options: ["Only the AP's encryption key", "Only the client's station ID", "The network's transmission rate and SSID", "The wired switch port number", "The RSSI of every client"],
answer: 2,
explain: "Beacons are periodic announcements from the AP. They carry the transmission rate and the SSID, letting a listening client associate without probing first.",
tags: ["passive-scanning", "beacon"]
},
{
type: "mcq",
q: "Why should the manufacturer's default SSID be replaced?",
options: ["Default SSIDs disable encryption", "It often reveals the manufacturer and model", "It prevents channel bonding", "It forces the AP into ad hoc mode", "It limits the AP to 802.11b"],
answer: 1,
explain: "A default SSID can hand an attacker the manufacturer and model, which shortens the search for known weaknesses. A custom SSID also avoids client confusion.",
tags: ["ssid", "security"]
},
{
type: "mcq",
q: "Which topology uses no access point?",
options: ["BSS", "ESS", "Mesh ESS", "Infrastructure BSS", "Ad hoc IBSS"],
answer: 4,
explain: "An IBSS is an ad hoc topology where a small number of nearby nodes transmit directly to one another without an intervening connectivity device.",
tags: ["ibss", "topology"]
},
{
type: "mcq",
q: "Which identifier belongs to a group of nodes sharing a single AP?",
options: ["BSSID", "ESSID", "RSSI", "SSID broadcast", "PNAC"],
answer: 0,
explain: "The BSSID identifies one basic service set, the group of nodes served by a single autonomous AP. An ESSID identifies a larger group spanning multiple APs.",
tags: ["bssid", "topology"]
},
{
type: "mcq",
q: "What distinguishes an ESS from a BSS?",
options: ["It drops the use of MAC addresses", "It uses no encryption", "It relies on a single autonomous AP", "It links multiple APs that share an ESSID", "It works only in ad hoc mode"],
answer: 3,
explain: "An ESS joins several APs, often lightweight ones managed by a WLC, under one ESSID so clients can roam across a larger area.",
tags: ["ess", "topology"]
},
{
type: "mcq",
q: "Which event triggers reassociation?",
options: ["The AP reboots", "The client changes its IP address", "The client moves into another AP's range", "The SSID is hidden", "The channel width changes to 40 MHz"],
answer: 2,
explain: "As a device roams out of one AP's range and into another's, it reassociates automatically. A high error rate on the current AP can also trigger it.",
tags: ["roaming", "reassociation"]
},
{
type: "mcq",
q: "How does a wireless LAN controller help with rogue APs?",
options: ["It encrypts management frames from unauthorized devices", "It recognizes when an unauthorized AP tries to join the network", "It converts unauthorized APs into lightweight APs", "It blocks all 2.4 GHz traffic near the controller", "It assigns unauthorized APs to a quarantined guest SSID"],
answer: 1,
explain: "The WLC monitors its APs and flags an unauthorized AP when one attempts to connect, giving administrators a chance to locate and remove it.",
tags: ["wlc", "rogue-ap"]
},
{
type: "mcq",
q: "How does band steering push a client toward 5 GHz?",
options: ["The AP answers the probe only on the 5 GHz band", "The AP disables its 2.4 GHz radio", "The AP refuses the client's passphrase", "The AP lowers the 5 GHz power level", "The AP forces a reassociation timer"],
answer: 0,
explain: "Instead of offering both bands and letting the client pick the stronger signal, the AP replies to the probe only on 5 GHz, steering the client to the faster band.",
tags: ["band-steering"]
},
{
type: "mcq",
q: "How does active band steering differ from passive band steering?",
options: ["It works only during initial association", "It applies only to 6 GHz clients", "It requires WPA3-Enterprise", "It moves already-associated clients from 2.4 GHz to 5 GHz", "It disables 2.4 GHz entirely"],
answer: 3,
explain: "Passive band steering acts during association by answering probes only on 5 GHz. Active band steering keeps working afterward, moving clients that already joined on 2.4 GHz.",
tags: ["band-steering"]
},
{
type: "mcq",
q: "Why keep 2.4 GHz available when 5 GHz is faster?",
options: ["2.4 GHz supports more bonded channels", "2.4 GHz has longer wavelengths that extend range", "2.4 GHz is reserved for enterprise clients", "2.4 GHz avoids all interference", "2.4 GHz requires no antenna"],
answer: 1,
explain: "Shorter 5 GHz wavelengths favor throughput, while longer 2.4 GHz wavelengths favor range, so both bands serve different client situations.",
tags: ["bands", "band-steering"]
},
{
type: "multi",
q: "Which statements about WPA3 are accurate?",
options: ["It authenticates both ends of a connection with SAE", "It requires protected management frames", "It relies on TKIP for encryption", "It permits 64-bit WEP keys for legacy clients", "It removes enterprise authentication support"],
answer: [0, 1],
explain: "WPA3 uses the SAE handshake so client and AP authenticate each other, and it requires protected management frames. TKIP, WEP keys, and dropping enterprise support are not WPA3 features.",
tags: ["wpa3", "security"]
},
{
type: "multi",
q: "Which actions help reduce interference on a crowded 2.4 GHz WLAN?",
options: ["Assign APs non-overlapping channels such as 1, 6, and 11", "Move capable clients to the 5 GHz band", "Lower AP power so coverage cells overlap less", "Use a Wi-Fi analyzer to find the clearest channel", "Widen every channel to 160 MHz"],
answer: [0, 1, 2, 3],
explain: "Non-overlapping channels, band steering or dual-band clients, reduced power, and analyzer-guided channel choice all cut contention. Wider channels consume more spectrum and increase overlap.",
tags: ["interference", "troubleshooting"]
},
{
type: "mcq",
q: "What does 802.11be change about 6 GHz operation?",
options: ["It allows higher-powered signals that reach farther", "It restricts the band to low-power indoor use", "It removes the band from Wi-Fi entirely", "It limits the band to 20 MHz channels", "It requires radar detection on every channel"],
answer: 0,
explain: "Wi-Fi 6E's 6 GHz reach is limited by power restrictions. 802.11be is expected to permit higher-powered 6 GHz signals that travel farther and penetrate more obstacles.",
tags: ["802-11be", "6-ghz"]
},
{
type: "mcq",
q: "Which device combines routing, switching, and wireless access in a SOHO network?",
options: ["A standalone lightweight AP", "A wireless LAN controller", "A SOHO wireless router", "A media converter", "A patch panel"],
answer: 2,
explain: "The SOHO wireless router contains switch hardware plus routing and AP functions, connecting wireless clients to the LAN and to the Internet through its WAN port.",
tags: ["soho"]
},
{
type: "mcq",
q: "Which port on a SOHO router connects to the modem?",
options: ["A LAN port", "The WAN port", "The console port", "The USB service port", "The reset pinhole"],
answer: 1,
explain: "The ISP signal enters through the modem and reaches the router on its WAN port, which is often labeled Internet and is set apart from the LAN ports.",
tags: ["soho", "wan"]
},
{
type: "mcq",
q: "A three-floor home has clients spread evenly on every floor. Where should the single AP go?",
options: ["The basement", "The top floor", "Beside the modem", "The middle floor", "The garage"],
answer: 3,
explain: "Placing the AP on the middle floor puts it closest to clients above and below, which matches the chapter's guidance on distance.",
tags: ["soho", "placement"]
},
{
type: "multi",
q: "Which items are listed as potential sources of Wi-Fi interference?",
options: ["Cordless phones", "Ethernet patch cables", "Fluorescent lights", "Fiber optic strands", "Microwave ovens"],
answer: [0, 2, 4],
explain: "Cordless phones, fluorescent lights, and microwave ovens all emit energy that can interfere with Wi-Fi. Copper and fiber cabling do not radiate in the same way.",
tags: ["interference", "placement"]
},
{
type: "mcq",
q: "What does a wireless site survey assess?",
options: ["Only the building's electrical wiring and outlets", "Only the number of users expected on each floor", "Client requirements, facility characteristics, and coverage areas", "The ISP's guaranteed bandwidth for the building", "The encryption strength of every nearby wireless network"],
answer: 2,
explain: "A site survey combines those three inputs into a report that determines AP quantity and placement for reliable coverage.",
tags: ["site-survey"]
},
{
type: "mcq",
q: "Which device usually needs the greatest throughput capacity on a WLAN?",
options: ["A smart doorbell", "A security camera", "A wireless LAN controller", "A smart lock", "A wireless bridge"],
answer: 4,
explain: "A wireless bridge carries traffic for whole network segments, so its throughput demand can far exceed that of individual clients or IoT devices.",
tags: ["wireless-bridge"]
},
{
type: "mcq",
q: "What is the purpose of carrying a dummy AP between proposed locations?",
options: ["To test the building's electrical load", "To measure range and throughput before permanent installation", "To register the AP with the wireless LAN controller", "To capture traffic from rogue access points", "To calibrate antenna polarization for coverage"],
answer: 1,
explain: "A dummy AP plus a wireless client lets you test each candidate location's real range and throughput before committing to an installation.",
tags: ["site-survey"]
},
{
type: "fill",
q: "What are gaps in Wi-Fi coverage called?",
answer: "dead zones",
accepts: ["dead spots"],
explain: "A heat map from survey software exposes dead zones, so APs or range extenders can be added where users would otherwise drop connections.",
tags: ["site-survey", "dead-zones"]
},
{
type: "tf",
q: "APs in the same ESS must share an ESSID for clients to move between coverage areas seamlessly.",
answer: true,
explain: "Roaming depends on every AP in the ESS advertising the same ESSID and security credentials, otherwise clients treat each AP as a separate network.",
tags: ["ess", "roaming"]
},
{
type: "mcq",
q: "How long should the reset button be held while powering on a SOHO router?",
options: ["5 seconds", "10 seconds", "15 seconds", "At least 30 seconds", "At least 5 minutes"],
answer: 3,
explain: "Hold the pinhole reset while restoring power for at least 30 seconds, then release; the exact duration varies by manufacturer, so check the documentation.",
tags: ["soho", "reset"]
},
{
type: "tf",
q: "An access point should run its own DHCP server even when the network already has one.",
answer: false,
explain: "A second DHCP server on the same LAN produces conflicting addressing. DHCP belongs on the designated server, not on the AP.",
tags: ["ap", "dhcp"]
},
{
type: "mcq",
q: "What does an onboarding agent give a device?",
options: ["Trusted access to portions of the network", "A permanent static IP address", "A dedicated 5 GHz channel", "A copy of the AP configuration", "Exemption from OS updates"],
answer: 0,
explain: "The agent establishes trusted access and can also check for OS and security updates, required settings such as timeouts, and existing malware.",
tags: ["onboarding", "byod"]
},
{
type: "mcq",
q: "Which offboarding control clears a lost phone of data without physical access?",
options: ["Geofencing", "Client isolation", "Remote wipe", "Captive portal", "MAC filtering"],
answer: 2,
explain: "Remote wipe removes important information, permissions, and apps from a device at a distance, and can disable it entirely.",
tags: ["offboarding", "remote-wipe"]
},
{
type: "mcq",
q: "What security does the 802.11 standard provide by default?",
options: ["WEP encryption", "WPA2-Personal", "None whatsoever", "WPA3-SAE security", "MAC filtering"],
answer: 2,
explain: "By default 802.11 offers no security at all. A client only needs the SSID, which many APs broadcast, so authentication and encryption must be added.",
tags: ["security", "802-11"]
},
{
type: "mcq",
q: "What does disabling SSID broadcast accomplish?",
options: ["It encrypts management frames", "It prevents brute force attacks", "It enforces WPA3", "It hides the network but does not secure it", "It blocks rogue APs"],
answer: 3,
explain: "Hiding the SSID makes the network harder to notice but is not true security, because the SSID still travels in other frames and can be discovered.",
tags: ["ssid", "security"]
},
{
type: "mcq",
q: "Why is MAC filtering weak protection?",
options: ["It slows the AP below 802.11b speeds", "MAC addresses are easily impersonated", "It requires a RADIUS server", "It works only with WPA3", "It disables roaming"],
answer: 1,
explain: "Maintaining the approved list is time consuming and MAC addresses can be spoofed, so the effort buys little real protection.",
tags: ["mac-filtering"]
},
{
type: "mcq",
q: "What happens in Open System Authentication?",
options: ["Both sides prove knowledge of a shared key", "The AP verifies a username and password", "A RADIUS server issues a certificate", "The client supplies a pre-shared key", "Any device that knows the SSID is authenticated without a key"],
answer: 4,
explain: "OSA uses no key: the client asks with only the SSID and the AP returns a single-use code. No real authentication occurs and no encrypted data can follow.",
tags: ["wep", "osa"]
},
{
type: "mcq",
q: "What is the core weakness of Shared Key Authentication?",
options: ["Every client uses the same easily discovered key", "It requires a dedicated RADIUS server", "It cannot encrypt any transmitted data", "It supports only the 802.11ax standard", "It rejects any SSID that is not broadcast"],
answer: 0,
explain: "WEP's SKA relies on one or a few static keys shared by all clients, so discovering the key compromises every client on the network.",
tags: ["wep", "ska"]
},
{
type: "mcq",
q: "How quickly can a 128-bit WEP key be cracked?",
options: ["Several weeks", "Several days", "A matter of minutes", "Several months", "It cannot be cracked"],
answer: 2,
explain: "Even 128-bit WEP keys fall in minutes because the shared key is reused and is not dynamically generated.",
tags: ["wep", "security"]
},
{
type: "mcq",
q: "Which three improvements did TKIP add?",
options: ["Bonding, beamforming, and roaming", "Key distribution, encryption, and message integrity", "Geofencing, isolation, and portal control", "Authentication, authorization, and accounting", "Compression, fragmentation, and retry"],
answer: 1,
explain: "TKIP assigns every transmission its own key, provides encryption with RC4, and adds a message integrity code called Michael.",
tags: ["wpa", "tkip"]
},
{
type: "mcq",
q: "Which cipher does TKIP use for encryption?",
options: ["AES", "CCMP", "CBC-MAC", "SAE", "RC4"],
answer: 4,
explain: "TKIP wraps WEP's RC4 encryption in stronger key management and integrity checks. RC4 is now considered insecure.",
tags: ["wpa", "rc4"]
},
{
type: "mcq",
q: "What role does Michael play in WPA?",
options: ["It is the message integrity code that authenticates packet sources", "It is the key exchange handshake that assigns session keys", "It is the channel-hopping schedule shared by all devices", "It is the RADIUS attribute that assigns clients to VLANs", "It is the WPA3 generator that creates stronger passwords"],
answer: 0,
explain: "Michael verifies that incoming packets really come from their declared source, which is why it is also described as packet authentication.",
tags: ["wpa", "michael"]
},
{
type: "mcq",
q: "Which protocol replaced TKIP in WPA2?",
options: ["WEP", "SAE", "RC4", "CCMP", "EAP"],
answer: 3,
explain: "WPA2 replaced TKIP's data confidentiality methods with CCMP, which is more future-focused than backward-compatible.",
tags: ["wpa2", "ccmp"]
},
{
type: "mcq",
q: "What kind of cipher is AES?",
options: ["A stream cipher that encrypts one byte at a time", "A hashing algorithm for passwords", "A block cipher that encrypts larger chunks", "A key-exchange protocol", "A message integrity code"],
answer: 2,
explain: "AES is a block cipher: it transforms larger blocks in each calculation, unlike a stream cipher such as RC4 that works a byte or bit at a time.",
tags: ["aes", "ciphers"]
},
{
type: "mcq",
q: "What does CCMP's CBC-MAC provide?",
options: ["Channel bonding between adjacent access points", "Packet authentication through a message integrity check", "Frequency hopping that avoids interference", "Client isolation from other local devices", "Dynamic channel selection near radar systems"],
answer: 1,
explain: "CBC-MAC verifies that incoming packets come from their declared source, and it does so with the AES block cipher.",
tags: ["wpa2", "cbc-mac"]
},
{
type: "mcq",
q: "How does SAE differ from the WPA2 handshake?",
options: ["Only the client proves its identity to the AP", "Only the AP proves its identity to the client", "It relies on a shared static key for both sides", "It omits authentication and uses encryption only", "Both the client and the AP must authenticate to each other"],
answer: 4,
explain: "Simultaneous Authentication of Equals authenticates both sides, so an attacker who captures another device's traffic cannot easily crack the network password.",
tags: ["wpa3", "sae"]
},
{
type: "mcq",
q: "Which WPA2 weakness did WPA3's handshake design target?",
options: ["Weak RC4 keys reused across every transmission", "Management frames that travel without any protection", "A password hash exposed during association that enables offline cracking", "Bonded channels that overlap with neighboring access points", "Open System Authentication accepting any device that knows the SSID"],
answer: 2,
explain: "WPA2's handshake leaves a password hash exposed during initial association, so captured traffic can be taken away and cracked offline. WPA3's SAE closes that gap.",
tags: ["wpa3", "sae"]
},
{
type: "mcq",
q: "In WPA2-Personal and WPA3-Personal, what is used to calculate each device's encryption key?",
options: ["The access point's MAC address alone", "The passphrase and the SSID characters", "A challenge issued by the RADIUS server", "The IP address assigned to the client", "The channel number in use at the time"],
answer: 1,
explain: "Personal mode takes the shared passphrase plus the SSID characters and derives a unique encryption key per device from them.",
tags: ["psk", "wpa2", "wpa3"]
},
{
type: "mcq",
q: "What does WPA-Enterprise add that Personal does not?",
options: ["A longer pre-shared key for every client", "Channel bonding across adjacent 20 MHz channels", "A captive portal that collects guest consent", "An authentication server with individual credentials", "A separate guest SSID with its own passphrase"],
answer: 3,
explain: "Enterprise mode pairs WPA with an authentication server, usually RADIUS, so each user authenticates individually instead of sharing one passphrase.",
tags: ["enterprise", "radius"]
},
{
type: "mcq",
q: "What is RADIUS used for in a WLAN?",
options: ["Central authentication and authorization of users", "Encrypting all management frames on the WLAN", "Assigning channel widths to access points", "Detecting radar signals in the 5 GHz band", "Bonding 20 MHz channels into wider ones"],
answer: 0,
explain: "RADIUS provides one central authentication and authorization point for wireless, mobile, and remote users, and it can also carry authorization data.",
tags: ["radius", "enterprise"]
},
{
type: "mcq",
q: "Which statement separates authentication from authorization?",
options: ["Authentication decides permissions; authorization verifies identity", "Authentication verifies identity; authorization decides what may be done", "Both describe encryption strength", "Authorization happens only on wireless networks", "Authentication requires RADIUS; authorization never does"],
answer: 1,
explain: "Authentication is the sign-in check of credentials. Authorization governs what the authenticated entity is allowed to do afterward.",
tags: ["authentication", "authorization"]
},
{
type: "mcq",
q: "What does EAP itself provide?",
options: ["AES encryption for the wireless session", "A complete RADIUS server implementation", "A shared-key handshake between client and AP", "Channel management for neighboring access points and clients", "A framework for authentication, not encryption or verification"],
answer: 4,
explain: "EAP is a framework. It carries other schemes that perform the actual encryption and credential verification, which is why it can support many methods.",
tags: ["eap"]
},
{
type: "mcq",
q: "What is EAPoL?",
options: ["EAP over a WAN leased line", "EAP operating without a server", "EAP encrypted with TKIP", "EAP carried over LAN frames under 802.1X", "A replacement for RADIUS"],
answer: 3,
explain: "EAPoL is EAP over LAN. The 802.1X standard adapted EAP from point-to-point WAN links to wired and wireless LANs, where Ethernet frames carry it.",
tags: ["eapol", "802-1x"]
},
{
type: "mcq",
q: "What does port-based network access control do?",
options: ["Bonds ports into a single channel", "Assigns static IPs to guests", "Allows only EAPoL traffic until the client authenticates", "Blocks all multicast traffic on the port", "Encrypts traffic between switches"],
answer: 2,
explain: "PNAC, part of 802.1X, holds the port to EAPoL traffic until the client completes authentication with the authentication server.",
tags: ["pnac", "802-1x"]
},
{
type: "mcq",
q: "A store offers coupons only to devices inside the mall. Which technique is this?",
options: ["Client isolation", "Geofencing", "Captive portal", "MAC filtering", "Band steering"],
answer: 1,
explain: "Geofencing detects a client's geographic position and activates resources or access based on being inside a defined area.",
tags: ["geofencing"]
},
{
type: "mcq",
q: "What characterizes a guest network?",
options: ["It shares the main SSID with all employees", "It requires a RADIUS server for every guest", "It exposes the entire LAN to visiting users", "It disables encryption to simplify access", "It uses a separate SSID, passphrase, and rules"],
answer: 4,
explain: "A guest network is isolated from the main LAN, offers Internet access on its own SSID and passphrase, and can enforce different rules or time limits.",
tags: ["guest-network"]
},
{
type: "mcq",
q: "A client cannot open the captive portal because the browser starts on an HTTPS site. What is the workaround?",
options: ["Disable the portal's custom DNS settings", "Switch the access point from WPA2 to WPA3", "Open a nonsecure page such as neverssl.com first", "Lower the access point's transmit power", "Reassociate the client with a different ESSID"],
answer: 2,
explain: "HTTPS can interfere with a captive portal's interception. Opening a plain HTTP page first gives the portal a chance to redirect the client.",
tags: ["captive-portal"]
},
{
type: "mcq",
q: "What does wireless client isolation restrict a guest to?",
options: ["The default gateway only", "The nearest AP only", "The RADIUS server only", "The 5 GHz band only", "The guest SSID's printer"],
answer: 0,
explain: "Client isolation applies firewall rules that let the client reach the default gateway and the Internet but no other devices on the local network.",
tags: ["client-isolation"]
},
{
type: "mcq",
q: "Which practice best hardens an IoT deployment?",
options: ["Keeping default device names for easy discovery", "Sharing one strong password across devices", "Enabling every feature the device offers", "Putting IoT devices on a separate network with a strong password", "Using the guest network without encryption"],
answer: 3,
explain: "IoT hardening combines changed defaults, strong unique passwords, two-factor authentication where offered, firmware updates, disabled unused features, and a separate network.",
tags: ["iot", "security"]
},
{
type: "mcq",
q: "What is war driving?",
options: ["Marking buildings with symbols that flag open networks", "Driving around with a laptop to find and capture unprotected networks", "Brute forcing a WPS PIN until the network grants access", "Cloning a legitimate AP's SSID to capture credentials", "Analyzing a spectrum for noise from nearby devices"],
answer: 1,
explain: "War driving searches for unprotected wireless networks from a moving vehicle, capturing whatever transmissions are in range.",
tags: ["war-driving", "threats"]
},
{
type: "mcq",
q: "What is war chalking?",
options: ["Cracking WPA2 handshakes offline with captured traffic", "Jamming a wireless channel with constant noise", "Marking a symbol to advertise a nearby open network", "Installing a card skimmer on an ATM or gas pump", "Spoofing a MAC address to bypass filtering"],
answer: 2,
explain: "War chalking leaves symbols on a building or sidewalk to tell other attackers that an open wireless network is nearby.",
tags: ["war-chalking", "threats"]
},
{
type: "mcq",
q: "Which attack uses a rogue AP with the same SSID as a legitimate network?",
options: ["War driving", "War chalking", "Skimming", "Evil twin", "WPS brute force"],
answer: 3,
explain: "An evil twin masquerades as the legitimate AP, often copying its SSID, so users connect to the attacker and expose credentials or data.",
tags: ["evil-twin", "threats"]
},
{
type: "mcq",
q: "Why is WPS considered risky?",
options: ["Its PIN can be brute forced to gain access", "It disables WPA3 permanently", "It broadcasts the passphrase in beacons", "It requires a RADIUS server", "It forces open authentication"],
answer: 0,
explain: "WPS simplifies joining with a PIN, but an attacker can systematically try every PIN combination until the network lets them in.",
tags: ["wps", "threats"]
},
{
type: "mcq",
q: "Which attack installs a card reader on a payment terminal?",
options: ["Evil twin", "War chalking", "Electronic pickpocketing", "WPS attack", "Skimming"],
answer: 4,
explain: "Skimming places a reader on a pump or ATM to collect card data. RFID chips can transmit to a skimmer several inches away.",
tags: ["skimming", "threats"]
},
{
type: "match",
q: "Match each security standard to its key mechanism.",
pairs: [
{ item: "WEP", match: "Static shared keys with RC4" },
{ item: "WPA", match: "TKIP with per-transmission keys and Michael" },
{ item: "WPA2", match: "CCMP using AES and CBC-MAC" },
{ item: "WPA3", match: "SAE mutual handshake with 128-bit AES minimum" }
],
explain: "WEP's static shared keys gave way to TKIP, then to CCMP with AES, and finally to SAE, which authenticates both ends of the connection.",
tags: ["security", "standards"]
},
{
type: "mcq",
q: "Which tool reveals non-Wi-Fi interference such as a leaking microwave oven?",
options: ["A Wi-Fi analyzer", "A spectrum analyzer", "A captive portal", "A wireless LAN controller", "A protocol analyzer"],
answer: 1,
explain: "A spectrum analyzer scans a band of frequencies for signals and noise, not just Wi-Fi traffic, so it exposes interference from any source in that band.",
tags: ["spectrum-analyzer", "tools"]
},
{
type: "mcq",
q: "What is a Wi-Fi analyzer best used for?",
options: ["Measuring cable continuity and signal loss", "Evaluating Wi-Fi availability, channels, and threats", "Authenticating guest users through a RADIUS server", "Assigning channels to lightweight access points", "Encrypting management frames between AP and client"],
answer: 1,
explain: "A Wi-Fi analyzer evaluates Wi-Fi availability and helps optimize settings, identify nearby channels, and flag security threats on the WLAN.",
tags: ["wifi-analyzer", "tools"]
},
{
type: "mcq",
q: "Which channel set avoids overlap in the United States 2.4 GHz band?",
options: ["1, 2, and 3", "1, 6, and 11", "2, 7, and 12", "3, 8, and 13", "4, 9, and 14"],
answer: 1,
explain: "Neighboring US networks typically use 1, 6, and 11, the non-overlapping channels across the 2.4 GHz band.",
tags: ["channels", "troubleshooting"]
},
{
type: "mcq",
q: "Where all 14 channels are available, which spread maximizes use of the band?",
options: ["1, 6, and 11", "1, 5, 9, and 13", "2, 4, 6, and 8", "1, 7, and 14", "3, 6, 9, and 12"],
answer: 1,
explain: "With 14 channels available, administrators may keep 1-6-11 for worldwide compatibility or use 1-5-9-13 to make fuller use of the band.",
tags: ["channels"]
},
{
type: "mcq",
q: "A client cannot join a network whose SSID is MyHouse, but it can see MYHOUSE. What is the problem?",
options: ["The channel width is wrong", "SSIDs are case sensitive", "The AP is running WPA3", "The client has a static IP", "The antenna is horizontally polarized"],
answer: 1,
explain: "SSIDs are case sensitive, so MYHOUSE and MyHouse are different network names. The client must be configured with the exact characters.",
tags: ["troubleshooting", "ssid"]
},
{
type: "mcq",
q: "A client is locked to one channel while the AP uses another. What symptom appears?",
options: ["Association fails", "Throughput drops to 802.11b rates", "The client roams constantly", "The AP reboots", "The SSID stops broadcasting"],
answer: 0,
explain: "Static channel utilization on the client prevents it from following the AP's channel, so association never completes.",
tags: ["troubleshooting", "channel"]
},
{
type: "mcq",
q: "A 2.4 GHz-only security camera cannot see a 5 GHz-only AP. Which cause fits?",
options: ["Incorrect passphrase", "Mismatched RF band", "Stalled association", "Channel overlap", "Client saturation"],
answer: 1,
explain: "Some devices are built for a single band. The AP must offer a standard on the band the device supports.",
tags: ["troubleshooting", "bands"]
},
{
type: "mcq",
q: "An AP allows only 802.11ac while a client is configured for 802.11n only. What is the result?",
options: ["The client associates at 802.11n speed", "The client cannot find or join the AP", "The AP falls back to 802.11b mode", "The client roams to another ESS", "The AP disables its 5 GHz radio"],
answer: 1,
explain: "The client must support and be configured for a standard the AP offers. A client locked to one standard will not find an AP broadcasting a different one.",
tags: ["troubleshooting", "standards"]
},
{
type: "mcq",
q: "A client at the far edge of coverage keeps failing to finish associating. What is the likely cause?",
options: ["Encryption protocol mismatch", "Wrong SSID case", "Stalled AP association from a weak signal", "Duplicate DHCP servers", "Mismatched antenna polarization"],
answer: 2,
explain: "Association needs enough signal to exchange packets. At the edge of range, missed packets leave the client stuck partway through the process.",
tags: ["troubleshooting", "association"]
},
{
type: "mcq",
q: "Users cannot roam between floors without losing connectivity. What should be checked first?",
options: ["The AP firmware version installed on each unit", "Whether all APs share the SSID and security credentials", "The channel width configured on each client", "The RADIUS shared secret configured on the server", "The antenna polarization used by each access point"],
answer: 1,
explain: "Roaming requires consistent SSIDs and security settings across APs. Mismatched configuration makes each AP a separate network.",
tags: ["troubleshooting", "roaming"]
},
{
type: "mcq",
q: "Where should AP power levels start when optimizing coverage?",
options: ["100 percent on every AP", "75 percent", "50 percent, then adjust incrementally", "25 percent", "The lowest setting available"],
answer: 2,
explain: "Starting near 50 percent and adjusting in steps avoids the two extremes: dropped signals at the edges and excessive overlap between cells.",
tags: ["troubleshooting", "power"]
},
{
type: "mcq",
q: "A client sees a strong signal from a distant high-power AP but its replies never arrive. What is this?",
options: ["Near-far effect", "Evil twin", "Hidden node", "Diffraction", "Client isolation"],
answer: 0,
explain: "The near-far effect is the asymmetry where the client can hear the AP but the client's weaker return signal cannot reach it.",
tags: ["near-far", "troubleshooting"]
},
{
type: "mcq",
q: "A factory AP sits near a 30-foot ceiling and serves workers far below. Which change improves coverage?",
options: ["Replace it with an omnidirectional antenna", "Raise the AP higher", "Use a directional antenna aimed down", "Increase the channel width", "Lower the transmit power"],
answer: 2,
explain: "An omnidirectional antenna wastes most of its energy above and around the ceiling. A directional antenna aimed down forms a dome of coverage over the floor.",
tags: ["antenna", "troubleshooting"]
},
{
type: "mcq",
q: "A laptop's Wi-Fi drops when its lid is tilted at an odd angle. What explains this?",
options: ["Client saturation from too many devices", "Mismatched antenna polarization between devices", "Channel overlap with a neighboring access point", "Incorrect passphrase configured on the client", "Stalled association at the edge of the range"],
answer: 1,
explain: "Laptop antennas sit around the screen. Tilting the lid misaligns their polarization with the AP's antenna and degrades the connection.",
tags: ["polarization", "troubleshooting"]
},
{
type: "mcq",
q: "A SOHO AP slows sharply once 16 devices connect. What is the cause?",
options: ["Channel overlap", "Client saturation or overcapacity", "Mismatched standards", "Incorrect antenna type", "Static channel utilization"],
answer: 1,
explain: "Consumer APs may handle only about 10 to 15 clients before becoming overwhelmed, and real capacity is well below the advertised figure.",
tags: ["capacity", "troubleshooting"]
},
{
type: "mcq",
q: "A client disassociates frequently on a crowded channel. Which adjustment is recommended?",
options: ["Use a wider bonded channel", "Use a narrower channel such as 20 or 40 MHz", "Raise the AP power to maximum", "Disable WPA3", "Hide the SSID"],
answer: 1,
explain: "A narrower channel is less likely to overlap with neighbors and is more resilient to interference, which stabilizes the association.",
tags: ["troubleshooting", "channels"]
}
]
});
