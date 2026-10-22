window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 6: Wireless Networking",
items: [
{
front: "What is a WLAN?",
back: "A wireless local area network: a LAN that transmits signals through the air using RF (radio frequency) waves instead of cables.",
tags: ["network-plus", "wlan"]
},
{
front: "What is the wireless spectrum, also called the airwaves?",
back: "The frequency range of electromagnetic waves used for data and voice communication.",
tags: ["network-plus", "spectrum"]
},
{
front: "What span does the FCC define for the wireless spectrum in the United States?",
back: "9 kHz to 300 GHz.",
tags: ["network-plus", "spectrum", "fcc"]
},
{
front: "How does a band differ from a channel?",
back: "A band is an overall frequency range such as 2.4 GHz. A band is subdivided into channels, and each channel occupies a slice of that range.",
tags: ["network-plus", "channels"]
},
{
front: "Which technologies share the frequencies around 2.4 GHz?",
back: "Wi-Fi, Bluetooth, RFID, and some satellite signals, which is why the band is crowded.",
tags: ["network-plus", "2-4-ghz"]
},
{
front: "Which users hold primary claims on 5 GHz?",
back: "Radar systems operated by airports, satellites, weather stations, and the military.",
tags: ["network-plus", "5-ghz", "radar"]
},
{
front: "What is a wireless collision?",
back: "Interference caused when multiple devices transmit at the same time on the same frequency. The affected signals must be retransmitted, which lowers throughput.",
tags: ["network-plus", "collision"]
},
{
front: "How does FHSS transmit data?",
back: "It sends a short burst on one frequency, then the next burst on the next frequency in the sequence, hopping hundreds of times per second.",
tags: ["network-plus", "fhss"]
},
{
front: "How does DSSS transmit data?",
back: "It divides the data stream into small chunks called chips and spreads them over all available frequencies at the same time.",
tags: ["network-plus", "dsss"]
},
{
front: "What is a chipping code?",
back: "The spreading ratio used to transform data into chips in DSSS. It is unique to each device.",
tags: ["network-plus", "dsss"]
},
{
front: "Which wireless technology uses FHSS, and how many channels does it hop across?",
back: "Bluetooth uses FHSS across 79 channels, hopping constantly to reduce the impact of interference and collisions.",
tags: ["network-plus", "bluetooth", "fhss"]
},
{
front: "What is a Bluetooth piconet?",
back: "A network of Bluetooth devices in which one device acts as master and supplies the clock the others use to coordinate channel hopping.",
tags: ["network-plus", "bluetooth", "piconet"]
},
{
front: "What are the tradeoffs between FHSS and DSSS?",
back: "FHSS is cheaper and performs better in crowded indoor environments. DSSS uses bandwidth more efficiently and tends to deliver higher throughput.",
tags: ["network-plus", "fhss", "dsss"]
},
{
front: "How many Wi-Fi channels does the FCC define in the United States for 2.4 GHz, 5 GHz, and 6 GHz?",
back: "11 channels in 2.4 GHz, 24 in 5 GHz, and 59 in 6 GHz. Some other countries define 14 channels in 2.4 GHz.",
tags: ["network-plus", "channels"]
},
{
front: "How wide is a Wi-Fi channel in the United States?",
back: "20 MHz.",
tags: ["network-plus", "channels"]
},
{
front: "What is channel bonding?",
back: "Combining adjacent channels, such as two 20 MHz channels into one 40 MHz channel, to increase throughput.",
tags: ["network-plus", "channel-bonding"]
},
{
front: "Why does a bonded 40 MHz channel provide more than twice the bandwidth of one 20 MHz channel?",
back: "The small bands at the top and bottom of each 20 MHz channel normally reserved as interference buffers can be used to carry data instead.",
tags: ["network-plus", "channel-bonding"]
},
{
front: "Which band is best suited to channel bonding, and why?",
back: "5 GHz, because it offers more channels and is less crowded than 2.4 GHz.",
tags: ["network-plus", "channel-bonding", "5-ghz"]
},
{
front: "What does OFDMA allow an AP to do?",
back: "Subdivide a channel into smaller frequency allocations, such as 2 or 4 MHz of a 20 MHz channel, so it can send multiple small frames to multiple clients at once.",
tags: ["network-plus", "ofdma"]
},
{
front: "What is a directional antenna?",
back: "Also called a unidirectional antenna: it issues signals along a single direction, which suits point-to-point links and satellite downlinks.",
tags: ["network-plus", "antenna"]
},
{
front: "What is an omnidirectional antenna?",
back: "An antenna that sends and receives with roughly equal strength in all directions. TV, radio, and cellular towers use them, as do mobile devices.",
tags: ["network-plus", "antenna"]
},
{
front: "Why must an AP be installed close to a separately mounted antenna?",
back: "Wi-Fi signals attenuate rapidly over even a few feet of coax cable.",
tags: ["network-plus", "antenna", "attenuation"]
},
{
front: "What does RSSI measure, and in what unit?",
back: "The received signal strength indicator measures the power of the signal at the receiver, in dBm (decibels relative to one milliwatt).",
tags: ["network-plus", "rssi"]
},
{
front: "What are the typical RSSI levels and their ratings?",
back: "About -30 dBm excellent, -50 good for time-sensitive data, -70 acceptable minimum for reliable data, -80 minimum for basic connectivity, -90 unusable.",
tags: ["network-plus", "rssi"]
},
{
front: "How do attenuation and fading differ?",
back: "Attenuation is weakening with distance from the source and can be offset with more power or a repeater. Fading is gradual energy loss caused by obstacles in the signal's path.",
tags: ["network-plus", "propagation"]
},
{
front: "How do refraction and reflection differ?",
back: "Refraction alters a wave's direction, speed, and wavelength as it passes into a different medium such as glass or water. Reflection bounces the wave back off a large flat surface such as metal or a wall.",
tags: ["network-plus", "propagation"]
},
{
front: "How do scattering and diffraction differ?",
back: "Scattering diffuses a signal in many directions off rough or small objects. Diffraction splits a signal into secondary waves that bend around sharp-edged obstructions.",
tags: ["network-plus", "propagation"]
},
{
front: "What are multipath signals?",
back: "Copies of one transmission that reach the receiver by different paths. They improve the odds of arrival but can arrive at different times and cause misinterpretation and errors.",
tags: ["network-plus", "multipath"]
},
{
front: "At which OSI layers do WLAN standards operate?",
back: "Layers 1 and 2. Above that, wireless and wired networks reuse the same IP, TCP, and UDP protocols.",
tags: ["network-plus", "osi"]
},
{
front: "What is Wi-Fi?",
back: "The popular name for the collection of IEEE 802.11 wireless standards, including their amendments, extensions, and corrections.",
tags: ["network-plus", "wifi"]
},
{
front: "How does the 802.11 access method differ from 802.3?",
back: "802.11 uses CSMA/CA, which avoids collisions because wireless devices cannot detect them. Wired 802.3 uses CSMA/CD, which detects collisions.",
tags: ["network-plus", "csma-ca"]
},
{
front: "What are the three 802.11 frame groups?",
back: "Management frames for association and reassociation, control frames for medium access and data delivery, and data frames that carry data.",
tags: ["network-plus", "frames"]
},
{
front: "Which addresses appear in an 802.11 data frame?",
back: "Four 6-byte fields: source, transmitter, receiver, and destination. An 802.3 frame carries only source and destination.",
tags: ["network-plus", "frames"]
},
{
front: "How large is the frame check sequence in 802.11 and 802.3 frames?",
back: "6 bytes in an 802.11 frame and 4 bytes in an 802.3 Ethernet frame.",
tags: ["network-plus", "frames"]
},
{
front: "What are 802.11b's band, channel width, throughput, and range?",
back: "2.4 GHz, 22 MHz channels, 11 Mbps maximum theoretical throughput, and about 100 m of range. It was the first standard to take hold and the least expensive.",
tags: ["network-plus", "802-11b"]
},
{
front: "What are 802.11a's band, throughput, and range?",
back: "5 GHz, 54 Mbps, and about 50 m. It needs more power, more APs, and costs more, so it is rarely preferred.",
tags: ["network-plus", "802-11a"]
},
{
front: "What are 802.11g's band, throughput, and compatibility?",
back: "2.4 GHz, 54 Mbps, and backward compatible with 802.11b.",
tags: ["network-plus", "802-11g"]
},
{
front: "What are 802.11n's band and maximum throughput?",
back: "2.4 GHz or 5 GHz, with 600 Mbps maximum theoretical throughput. It was ratified in 2009 and must be backward compatible with 802.11a, b, and g.",
tags: ["network-plus", "802-11n"]
},
{
front: "What are 802.11ac's band and key advance?",
back: "It operates on 5 GHz and was the first Wi-Fi standard to approach Gigabit Ethernet, handling multiple transmissions at once over the same spectrum. It shipped in three waves.",
tags: ["network-plus", "802-11ac"]
},
{
front: "What is CSMA/CA?",
back: "Carrier Sense Multiple Access with Collision Avoidance: 802.11's access method, which listens for a quiet channel and waits a brief random time before transmitting.",
tags: ["network-plus", "csma-ca"]
},
{
front: "Why do 802.11 networks deliver less real throughput than a wired network with the same rating?",
back: "Every transmission must be verified with an ACK, so part of the available throughput is spent on acknowledgment traffic.",
tags: ["network-plus", "csma-ca"]
},
{
front: "What is scanning?",
back: "The periodic survey a wireless device performs for evidence of an access point, using either active or passive scanning.",
tags: ["network-plus", "association"]
},
{
front: "What is an SSID?",
back: "Service set identifier: the character string used to identify an access point and its network.",
tags: ["network-plus", "ssid"]
},
{
front: "What is a BSSID?",
back: "Basic service set identifier: the identifier for the group of nodes served by a single access point.",
tags: ["network-plus", "bssid"]
},
{
front: "What is an ESSID?",
back: "Extended service set identifier: the identifier shared by clients that belong to the same ESS, which is what lets them roam between APs.",
tags: ["network-plus", "essid"]
},
{
front: "What is an IBSS?",
back: "Independent basic service set: an ad hoc topology in which a small number of nodes transmit directly to one another without an access point.",
tags: ["network-plus", "ibss"]
},
{
front: "What is a BSS?",
back: "Basic service set: a group of nodes that share a single autonomous access point in an infrastructure topology.",
tags: ["network-plus", "bss"]
},
{
front: "What is an ESS?",
back: "Extended service set: multiple APs, often lightweight ones managed by a WLC, cooperating under one ESSID to cover a larger area fault-tolerantly.",
tags: ["network-plus", "ess"]
},
{
front: "How does a lightweight AP differ from an autonomous AP?",
back: "An autonomous AP manages and is configured by itself. A lightweight AP depends on a wireless LAN controller for configuration and centralized management.",
tags: ["network-plus", "lap", "autonomous-ap"]
},
{
front: "What does a wireless LAN controller provide?",
back: "Centralized authentication, load balancing, channel management, AP redundancy when an AP fails, and detection of rogue access points.",
tags: ["network-plus", "wlc"]
},
{
front: "What is a SOHO network?",
back: "A home or small office network, typically one central AP plus optional range extenders, often built into a single wireless router.",
tags: ["network-plus", "soho"]
},
{
front: "What functions does a SOHO wireless router combine?",
back: "Routing, switching, wireless access, and gateway functions for connecting clients to the LAN and the Internet.",
tags: ["network-plus", "soho"]
},
{
front: "Which port connects a SOHO router to the modem?",
back: "The WAN port, often labeled Internet and set apart from the LAN ports.",
tags: ["network-plus", "soho"]
},
{
front: "What distance and obstacle factors guide AP placement?",
back: "Consider typical distances to clients and the standard's range limits, plus the type and number of obstacles. Concrete floors or a long narrow building may require more APs.",
tags: ["network-plus", "placement"]
},
{
front: "Where should an AP be mounted for best coverage?",
back: "In a high spot such as a shelf, rack, or drop ceiling, away from interference sources.",
tags: ["network-plus", "placement"]
},
{
front: "What common devices interfere with Wi-Fi placement?",
back: "Cordless phones, fluorescent lights, and microwave ovens.",
tags: ["network-plus", "interference"]
},
{
front: "What is a wireless site survey?",
back: "An assessment of client requirements, facility characteristics, and coverage areas that produces a report determining AP arrangement.",
tags: ["network-plus", "site-survey"]
},
{
front: "Why does a wireless bridge need high throughput?",
back: "It connects two networks or two remote portions of one network, so it carries traffic for many clients rather than one device.",
tags: ["network-plus", "wireless-bridge"]
},
{
front: "What is a heat map used for in a site survey?",
back: "Mapping Wi-Fi signals and noise across a location to spot weak coverage and dead zones.",
tags: ["network-plus", "site-survey"]
},
{
front: "What is a dead zone?",
back: "A gap in Wi-Fi coverage where clients drop connections or slow down, identified with a heat map.",
tags: ["network-plus", "site-survey"]
},
{
front: "What must every AP in an ESS share?",
back: "The same ESSID and security credentials, so clients can move between coverage areas without losing service.",
tags: ["network-plus", "ess"]
},
{
front: "What are the steps to reset a SOHO router?",
back: "Disconnect data cables and unplug power, hold the pinhole reset while restoring power for at least 30 seconds, then release to restore factory defaults.",
tags: ["network-plus", "soho"]
},
{
front: "Why should an AP not run DHCP when the network already has a DHCP server?",
back: "Two DHCP servers hand out conflicting addressing, causing address problems on the network.",
tags: ["network-plus", "dhcp"]
},
{
front: "What does onboarding a device involve?",
back: "Installing an agent that gives the device trusted access to parts of the network and can check for OS updates, required security settings, and malware.",
tags: ["network-plus", "onboarding"]
},
{
front: "What is offboarding?",
back: "Removing the onboarding agent and the device's trusted access, remotely if the device is lost or stolen.",
tags: ["network-plus", "offboarding"]
},
{
front: "What is BYOD?",
back: "Bring your own device: an environment where employee-owned devices access network resources, requiring onboarding and offboarding policies that protect the network.",
tags: ["network-plus", "byod"]
},
{
front: "What security does 802.11 provide on its own?",
back: "None. A client only needs the SSID, which many APs broadcast, so authentication and encryption must be configured separately.",
tags: ["network-plus", "security"]
},
{
front: "What is the difference between authentication and encryption on a WLAN?",
back: "Authentication lets a client log on with a password or user credentials. Encryption scrambles transmitted data so an intercepted signal cannot be read.",
tags: ["network-plus", "security"]
},
{
front: "What is MAC filtering, and why is it weak?",
back: "It refuses association to devices whose MAC addresses are not on an approved list. Maintaining the list is time consuming and MAC addresses are easily impersonated.",
tags: ["network-plus", "mac-filtering"]
},
{
front: "What is WEP?",
back: "Wired Equivalent Privacy: the original optional 802.11 encryption, now insecure because it uses one or a few static shared keys.",
tags: ["network-plus", "wep"]
},
{
front: "What key sizes has WEP supported?",
back: "Originally 64-bit, later 128-bit and 256-bit. Even 128-bit keys can be cracked in minutes.",
tags: ["network-plus", "wep"]
},
{
front: "What is 802.11i?",
back: "The IEEE wireless security standard that included WPA as a subset and whose progressive improvements eventually produced WPA3.",
tags: ["network-plus", "wpa"]
},
{
front: "What is WPA?",
back: "Wi-Fi Protected Access: a replacement for WEP that dynamically assigns every transmission its own key.",
tags: ["network-plus", "wpa"]
},
{
front: "What is TKIP?",
back: "Temporal Key Integrity Protocol: the key generation and management scheme in 802.11i and WPA that improves security for legacy WEP devices.",
tags: ["network-plus", "tkip"]
},
{
front: "What three improvements did TKIP bring?",
back: "Key distribution with a key per transmission, encryption with RC4, and message integrity through the Michael code.",
tags: ["network-plus", "tkip"]
},
{
front: "What is RC4, and where is it used?",
back: "Rivest Cipher 4: a now-insecure stream cipher used by WEP and by WPA's TKIP.",
tags: ["network-plus", "rc4"]
},
{
front: "What is Michael?",
back: "The message integrity code in TKIP that ensures incoming packets come from their declared source, also called packet authentication.",
tags: ["network-plus", "michael"]
},
{
front: "What is WPA2?",
back: "The version of WPA that replaced TKIP's confidentiality methods with CCMP, which uses AES for stronger encryption and packet authentication.",
tags: ["network-plus", "wpa2"]
},
{
front: "What does CCMP stand for, and what does it provide?",
back: "Counter Mode with CBC MAC Protocol. It supplies message integrity through CBC-MAC and encryption through AES.",
tags: ["network-plus", "ccmp"]
},
{
front: "Why is AES stronger than TKIP for wireless encryption?",
back: "AES is a block cipher with a more sophisticated family of ciphers and multiple stages of data transformation, giving faster and more secure encryption.",
tags: ["network-plus", "aes"]
},
{
front: "How do stream and block ciphers differ?",
back: "A stream cipher encrypts one byte or bit at a time. A block cipher encrypts much larger chunks in each calculation.",
tags: ["network-plus", "ciphers"]
},
{
front: "What is WPA3, and when did it arrive?",
back: "The Wi-Fi Alliance released it in 2018 and required WPA3 support on certified devices from mid-2020. It disallows legacy protocols and strengthens encryption and management frame protection.",
tags: ["network-plus", "wpa3"]
},
{
front: "What is SAE?",
back: "Simultaneous Authentication of Equals: the WPA3 handshake in which both the client and the AP authenticate to each other, defeating offline password guessing from captured traffic.",
tags: ["network-plus", "sae"]
},
{
front: "What are protected management frames?",
back: "A protection for management traffic that WPA3 requires and WPA2 offers only optionally, guarding frames such as disassociation and deauthentication.",
tags: ["network-plus", "wpa3", "pmf"]
},
{
front: "What does PSK mean, and which networks use it?",
back: "Pre-shared key. WPA-Personal modes use a passphrase, which is the typical home configuration.",
tags: ["network-plus", "psk"]
},
{
front: "How is a per-device key derived in WPA2-Personal and WPA3-Personal?",
back: "From the shared passphrase plus the SSID characters, producing a unique encryption key for each device.",
tags: ["network-plus", "psk"]
},
{
front: "What makes WPA-Enterprise more secure than WPA-Personal?",
back: "It combines WPA with an authentication server, usually RADIUS, so each user authenticates individually instead of sharing one passphrase.",
tags: ["network-plus", "enterprise"]
},
{
front: "What is RADIUS?",
back: "Remote Authentication Dial-In User Service: an open-source authentication and authorization service that provides a central authentication point for wireless, mobile, and remote users.",
tags: ["network-plus", "radius"]
},
{
front: "Name two RADIUS implementations.",
back: "FreeRADIUS and Microsoft NPS (Network Policy Server).",
tags: ["network-plus", "radius"]
},
{
front: "How does authorization differ from authentication?",
back: "Authentication verifies identity at sign-in. Authorization determines what that identity may do once connected.",
tags: ["network-plus", "authentication"]
},
{
front: "What does EAP actually provide?",
back: "Only the framework for authenticating clients and servers. It does not encrypt or verify credentials itself; it incorporates other schemes to do that.",
tags: ["network-plus", "eap"]
},
{
front: "Who are the three EAP entities?",
back: "The supplicant requesting authentication, the authenticator such as an AP or switch that initiates the process, and the authentication server such as RADIUS.",
tags: ["network-plus", "eap"]
},
{
front: "What is EAPoL?",
back: "EAP over LAN: EAP adapted in the 802.1X standard to travel in Ethernet frames on wired and wireless LANs.",
tags: ["network-plus", "eapol"]
},
{
front: "What is PNAC?",
back: "Port-based network access control: the 802.1X behavior that permits only EAPoL traffic on a switch or AP port until the client authenticates.",
tags: ["network-plus", "pnac"]
},
{
front: "What is geofencing?",
back: "A security technique that detects a client's geographic position and activates resources or allows access only within a defined area.",
tags: ["network-plus", "geofencing"]
},
{
front: "What is a guest network?",
back: "An isolated network with its own SSID and passphrase that gives visitors Internet access without exposing the main LAN.",
tags: ["network-plus", "guest-network"]
},
{
front: "What is a captive portal?",
back: "The first page a new guest client sees in its browser, usually requiring agreement to terms before further access is granted.",
tags: ["network-plus", "captive-portal"]
},
{
front: "What is wireless client isolation?",
back: "A firewall rule set that lets a wireless client reach only the default gateway and the Internet, not other devices on the local network.",
tags: ["network-plus", "client-isolation"]
},
{
front: "How should an IoT network be hardened?",
back: "Change default names, usernames, and passwords; use strong passwords and the strongest encryption offered; enable two-factor authentication where possible; put devices on a separate network; disable unused features; apply firmware updates.",
tags: ["network-plus", "iot"]
},
{
front: "What is war driving?",
back: "Searching for unprotected wireless networks by driving around with a laptop or smartphone configured to capture wireless transmissions.",
tags: ["network-plus", "war-driving"]
},
{
front: "What is war chalking?",
back: "Marking a symbol on a building or sidewalk to tell other attackers an open wireless network is nearby.",
tags: ["network-plus", "war-chalking"]
},
{
front: "What is an evil twin?",
back: "A rogue access point that masquerades as a legitimate AP, often copying its SSID, so users connect and expose credentials or data.",
tags: ["network-plus", "evil-twin"]
},
{
front: "What is WPS, and what is its weakness?",
back: "Wi-Fi Protected Setup simplifies joining a network, often with a PIN. That PIN can be brute forced to gain access.",
tags: ["network-plus", "wps"]
},
{
front: "What is a brute force attack?",
back: "Trying every possible combination of passwords or keys until the correct one is found. Longer, more complex keys take far longer to break.",
tags: ["network-plus", "brute-force"]
},
{
front: "What is skimming?",
back: "Installing a card reader on a payment terminal such as a gas pump or ATM to collect data from magnetic strips or RFID chips.",
tags: ["network-plus", "skimming"]
},
{
front: "What is electronic pickpocketing?",
back: "Reading RFID-enabled credit cards with a reader held near a victim's pocket or bag, without any physical contact with the card.",
tags: ["network-plus", "rfid", "skimming"]
},
{
front: "What is a rogue access point?",
back: "An unauthorized AP. A wireless LAN controller can detect one when it attempts to connect to the network.",
tags: ["network-plus", "rogue-ap"]
},
{
front: "What is a spectrum analyzer used for?",
back: "Assessing wireless signal quality by scanning a band of frequencies for signals and noise, which shows where interference is worst.",
tags: ["network-plus", "spectrum-analyzer"]
},
{
front: "What is a Wi-Fi analyzer used for?",
back: "Evaluating Wi-Fi availability, optimizing signal settings, identifying nearby channels, and spotting Wi-Fi security threats.",
tags: ["network-plus", "wifi-analyzer"]
},
{
front: "Which tool finds non-Wi-Fi interference, and which focuses on Wi-Fi?",
back: "A spectrum analyzer scans the whole band for any signal or noise. A Wi-Fi analyzer evaluates Wi-Fi networks and channels.",
tags: ["network-plus", "tools"]
},
{
front: "Which 2.4 GHz channels are used in the United States to avoid overlap?",
back: "1, 6, and 11.",
tags: ["network-plus", "channels"]
},
{
front: "Where 14 channels are available, which channel spread maximizes bandwidth?",
back: "1, 5, 9, and 13, though 1, 6, and 11 may still be chosen for compatibility with devices from other regions.",
tags: ["network-plus", "channels"]
},
{
front: "Why can a client fail to join a visible SSID?",
back: "SSIDs are case sensitive, so the client must be configured with the exact characters. MYHOUSE and MyHouse are different networks.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What happens when the client and AP disagree on encryption?",
back: "The client must support and allow the protocols the AP offers. A mismatch prevents authentication from completing.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What is static channel utilization?",
back: "A client configured to use only one channel or frequency while the AP uses another, which prevents association.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What is a mismatched RF band?",
back: "A device designed for only one band, such as a 2.4 GHz-only camera, cannot associate with an AP offering only 5 GHz.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What happens when the AP and client require different 802.11 standards?",
back: "A client configured for only one standard will not find or join an AP broadcasting a different one, even if its hardware supports several standards.",
tags: ["network-plus", "troubleshooting", "standards"]
},
{
front: "What causes a stalled AP association?",
back: "A client at the edge of coverage or moving between coverage areas cannot exchange enough packets to finish associating because the signal is too weak.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What breaks roaming between APs?",
back: "APs configured with different SSIDs or security credentials, which makes each AP a separate network instead of one ESS.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "At what power level should AP coverage tuning begin?",
back: "About 50 percent, then adjust incrementally. Too little power drops edge clients; too much creates excessive overlap.",
tags: ["network-plus", "troubleshooting"]
},
{
front: "What is the near-far effect?",
back: "A client can hear a distant high-power AP, but its own weaker return signal cannot reach the AP, so communication fails asymmetrically.",
tags: ["network-plus", "near-far"]
},
{
front: "How does antenna type affect coverage in a high-ceiling factory?",
back: "An omnidirectional antenna wastes energy above and around the ceiling. A directional antenna aimed down concentrates coverage on the floor.",
tags: ["network-plus", "antenna"]
},
{
front: "What is antenna polarization, and why does it matter?",
back: "The axis along which radio waves radiate. Most Wi-Fi antennas are vertically polarized, so mismatched orientation, such as a tilted laptop lid, degrades the connection.",
tags: ["network-plus", "polarization"]
},
{
front: "What is client saturation?",
back: "An AP overwhelmed by more connections than it can handle. A SOHO AP may support only about 10 to 15 devices before performance drops.",
tags: ["network-plus", "capacity"]
},
{
front: "What helps a client that frequently disassociates?",
back: "Move it off a crowded channel and consider a narrower channel such as 20 or 40 MHz instead of a large bonded channel, and check for interference.",
tags: ["network-plus", "troubleshooting"]
}
]
});