window.ReviewApp.content.register({
type: "labs",
cert: "network-plus",
chapter: "Chapter 1 — Introduction to Networking",
items: [
{
title: "Classify the Network Model and Topology",
difficulty: 1,
minutes: 20,
scenario: "You are reviewing a small office network before documenting it. Each workstation maintains its own user accounts and shared resources. The workstations and a network printer all connect to one central switch. Determine the logical network model and the physical topology from the evidence.",
objectives: [
"Identify the logical network model from access-control behavior.",
"Identify the physical topology from device connectivity."
],
objectiveSteps: [[0], [1]],
mockData: [
"Network observations:\n- Five Windows workstations share files directly.\n- Each workstation maintains its own user accounts and permissions.\n- No centralized directory database is present.\n- All five workstations and a network printer connect directly to one central switch."
],
steps: [
{
do: "Classify the logical network model used by the workstations.",
hint: "Focus on whether access control is centralized or maintained independently by each computer.",
solution: "Peer-to-peer (P2P)",
expectedOutput: "Peer-to-peer (P2P)",
expectedOutputDynamic: false,
check: "Verify that your classification reflects decentralized resource and access control."
},
{
do: "Classify the physical topology created by the central switch and directly connected devices.",
hint: "Identify the topology in which all devices connect to one central device.",
solution: "Star topology",
expectedOutput: "Star topology",
expectedOutputDynamic: false,
check: "Verify that every endpoint has a direct connection to the same central device."
}
],
tags: ["network-plus", "p2p", "star-topology", "network-models"]
},
{
title: "Analyze Network Services",
difficulty: 1,
minutes: 20,
scenario: "A support technician receives four service descriptions from an internal application team. Map each description to the protocol or service taught in the chapter and distinguish secure from insecure file and remote-access choices.",
objectives: [
"Map common network services to their protocols.",
"Distinguish secure and insecure protocol choices."
],
mockData: [
"Service descriptions:\nA. Browser requests and receives a webpage.\nB. Mail client sends a message to the sender's mail server.\nC. User accesses files on a remote server with an encrypted channel.\nD. Two computers transfer files using a protocol with no encryption by itself."
],
steps: [
{
do: "Identify the protocol used for description A.",
hint: "Think about the primary protocol used by web browsers and web servers.",
solution: "HTTP",
expectedOutput: "HTTP",
expectedOutputDynamic: false,
check: "Verify that the protocol matches the web-service description."
},
{
do: "Identify the protocol used for description B.",
hint: "Focus on the protocol used to send email rather than retrieve it.",
solution: "SMTP",
expectedOutput: "SMTP",
expectedOutputDynamic: false,
check: "Verify that your choice is the chapter's email-sending protocol."
},
{
do: "Identify the secure remote-access protocol used for description C.",
hint: "Choose the encrypted remote-access protocol contrasted with Telnet.",
solution: "SSH",
expectedOutput: "SSH",
expectedOutputDynamic: false,
check: "Verify that the protocol creates an encrypted channel or tunnel."
},
{
do: "Identify the file-transfer protocol described in D and state its security limitation.",
hint: "The chapter contrasts this protocol with FTPS and SFTP.",
solution: "FTP — it does not provide encryption by itself.",
expectedOutput: "FTP — it does not provide encryption by itself.",
expectedOutputDynamic: false,
check: "Verify that both the protocol and its lack of built-in encryption are correct."
}
],
tags: ["network-plus", "protocols", "network-services", "remote-access"]
},
{
title: "Trace a Web Request Through the OSI Model",
difficulty: 2,
minutes: 25,
scenario: "A browser sends an HTTP request to a web server on another network. Use the chapter's encapsulation model to identify what happens as the request moves down the stack, crosses a switch and router, and is decapsulated at the destination.",
objectives: [
"Map protocol data units to OSI layers.",
"Explain encapsulation and decapsulation.",
"Distinguish switch processing from router processing."
],
objectiveSteps: [[0], [1], [2]],
mockData: [
"Transmission sequence:\nBrowser payload → Transport → Network → Data Link → Physical → Switch → Router → Destination host\n\nRelevant source mappings:\nLayer 4: TCP segment or UDP datagram\nLayer 3: IP packet\nLayer 2: Ethernet or Wi-Fi frame\nLayer 1: bits or transmission\nSwitch: examines destination MAC\nRouter: examines destination IP and creates a new frame for the next LAN"
],
steps: [
{
do: "Identify the Layer 4 PDU for the TCP-based browser request.",
hint: "Use the chapter's TCP-to-PDU mapping.",
solution: "Segment",
expectedOutput: "Segment",
expectedOutputDynamic: false,
check: "Verify that the TCP PDU name is correct."
},
{
do: "Identify the Layer 3 PDU after IP adds its header.",
hint: "The Network layer gives the Transport-layer data a new PDU name.",
solution: "Packet",
expectedOutput: "Packet",
expectedOutputDynamic: false,
check: "Verify that the IP PDU is a packet."
},
{
do: "Identify the Layer 2 PDU after the Data Link layer adds a header and trailer.",
hint: "Think about the PDU that contains MAC addressing information.",
solution: "Frame",
expectedOutput: "Frame",
expectedOutputDynamic: false,
check: "Verify that Layer 2 produces a frame."
},
{
do: "State what the switch examines when forwarding the frame.",
hint: "The switch operates on the local Data Link information in the frame.",
solution: "Destination MAC address",
expectedOutput: "Destination MAC address",
expectedOutputDynamic: false,
check: "Verify that your answer identifies the local hardware address."
},
{
do: "State what the router examines and what it does before forwarding the packet onto the next LAN.",
hint: "The router moves between networks, so use the Network-layer addressing information.",
solution: "The router examines the destination IP address, then re-encapsulates the packet in a new frame appropriate for the next LAN.",
expectedOutput: "Destination IP address; a new frame is created for the next LAN.",
expectedOutputDynamic: false,
check: "Verify that both the Network-layer decision and new Data Link encapsulation are included."
},
{
do: "Name the reverse process used by the destination host as it removes the lower-layer headers and trailer.",
hint: "It is the reverse of encapsulation.",
solution: "Decapsulation",
expectedOutput: "Decapsulation",
expectedOutputDynamic: false,
check: "Verify that the destination removes encapsulation in reverse order."
}
],
tags: ["network-plus", "osi", "encapsulation", "pdu", "troubleshooting"]
},
{
title: "Apply Network Safety Decisions",
difficulty: 2,
minutes: 20,
scenario: "You are preparing a technician work area and data-center equipment for service. Apply the chapter's safety guidance to four situations involving electrical work, ESD, chemicals, and failure behavior.",
objectives: [
"Choose appropriate electrical and ESD precautions.",
"Select an appropriate failure policy for a safety or security requirement."
],
objectiveSteps: [[0], [1, 2, 3]],
mockData: [
"Situations:\nA. A technician must work inside a powered data-center rack.\nB. A technician is about to handle a motherboard.\nC. A chemical cleaning solution has spilled on the workbench.\nD. A firewall protecting sensitive customer data fails and must remain unavailable until restored."
],
steps: [
{
do: "For situation A, identify the electrical safety actions required before working inside the rack.",
hint: "Use the chapter's OSHA-related procedure for electrical work.",
solution: "Turn the electrical devices off and lock out the electrical supply before working near or inside the equipment.",
expectedOutput: "Devices off; electrical supply locked out.",
expectedOutputDynamic: false,
check: "Verify that both shutdown and lockout are included."
},
{
do: "For situation B, choose the preferred method for reducing ESD risk before handling the motherboard.",
hint: "Use the dedicated ESD protection method recommended in the chapter.",
solution: "Wear an ESD strap clipped to a metallic part of the computer chassis.",
expectedOutput: "ESD strap connected to the chassis.",
expectedOutputDynamic: false,
check: "Verify that the strap is connected to the chassis."
},
{
do: "For situation C, identify the document that provides chemical handling, first-aid, fire-fighting, accidental-release, and disposal information.",
hint: "Use the current name of the document discussed in the safety section.",
solution: "SDS (safety data sheet)",
expectedOutput: "SDS (safety data sheet)",
expectedOutputDynamic: false,
check: "Verify that you selected the safety data sheet rather than a network document."
},
{
do: "For situation D, choose the failure behavior that prioritizes protecting sensitive customer data.",
hint: "The source contrasts safety-driven access with security-driven denial.",
solution: "Fail-close (fail-secure)",
expectedOutput: "Fail-close (fail-secure)",
expectedOutputDynamic: false,
check: "Verify that the policy denies access while the protection system is unavailable."
}
],
tags: ["network-plus", "safety", "esd", "fail-close", "osha"]
},
{
title: "Work Through a Network Troubleshooting Scenario",
difficulty: 3,
minutes: 30,
scenario: "A workstation cannot reach the Internet or normal company network resources. Nearby coworkers are unaffected. Use the seven-step troubleshooting model from the chapter to isolate the issue, apply the least invasive fix, verify service, and identify the appropriate documentation result.",
objectives: [
"Apply the seven-step troubleshooting process in order.",
"Use OSI-oriented reasoning to test a likely physical cause.",
"Verify the fix and determine the appropriate documentation action."
],
objectiveSteps: [[0], [1], [2]],
mockData: [
"Observed symptoms:\n- Browser cannot reach any websites.\n- File Explorer cannot reach normal company network resources.\n- Nearby coworkers have no connectivity problem.\n- A network technician worked near the desk the previous evening.\n\nAvailable evidence:\n- Network cable is lying on the floor near the workstation.\n- The cable is not connected to the desktop."
],
steps: [
{
do: "Perform Step 1 by stating the problem scope and the relevant symptoms.",
hint: "Include what does not work and use the fact that nearby coworkers are unaffected.",
solution: "The workstation cannot reach websites or normal company network resources, while nearby coworkers are unaffected.",
expectedOutput: "Workstation cannot reach websites or company network resources; nearby coworkers are unaffected.",
expectedOutputDynamic: false,
check: "Verify that the symptoms and limited scope are captured."
},
{
do: "Perform Step 2 by establishing a theory of probable cause.",
hint: "The chapter recommends checking simple physical causes first for a general connectivity problem.",
solution: "Suspect a physical connectivity problem, specifically an unplugged network cable.",
expectedOutput: "Probable cause: unplugged network cable.",
expectedOutputDynamic: false,
check: "Verify that the theory starts with the obvious physical cause."
},
{
do: "Perform Step 3 by testing the theory against the provided evidence.",
hint: "Inspect the cable evidence in the mock data.",
solution: "Check the network cable and confirm that it is lying on the floor and is not connected to the desktop.",
expectedOutput: "Cable is not connected to the desktop.",
expectedOutputDynamic: false,
check: "Verify that the observed cable condition confirms the theory."
},
{
do: "Perform Step 4 by choosing the plan for resolution.",
hint: "Consider whether this simple fix affects other users and apply the least invasive principle.",
solution: "Plan to reconnect the network cable; the change is simple and does not affect other users.",
expectedOutput: "Plan: reconnect the network cable.",
expectedOutputDynamic: false,
check: "Verify that the plan is limited to the least invasive fix supported by the evidence."
},
{
do: "Perform Step 5 by implementing the solution.",
hint: "Apply the plan without changing unrelated network settings.",
solution: "Reconnect the network cable to the desktop.",
expectedOutput: "(no output)",
expectedOutputDynamic: false,
check: "Verify that the cable is physically connected."
},
{
do: "Perform Step 6 by verifying functionality.",
hint: "Use the symptoms from Step 1 as the validation criteria.",
solution: "Open a browser to confirm Internet access and verify that normal company network resources are accessible.",
expectedOutput: "Websites load and company network resources are accessible.",
expectedOutputDynamic: false,
check: "Verify both Internet access and company network resource access."
},
{
do: "Perform Step 7 by selecting the appropriate documentation action for this simple scenario.",
hint: "The chapter notes that technicians generally document work, but the example uses a lightweight result for a simple problem.",
solution: "Inform coworkers that the network connection is working and record the troubleshooting result according to normal organizational practice.",
expectedOutput: "Network connection restored; troubleshooting result communicated/documented.",
expectedOutputDynamic: false,
check: "Verify that the successful resolution and relevant record are captured."
}
],
tags: ["network-plus", "troubleshooting", "osi", "cabling", "methodology"]
}
]
});
