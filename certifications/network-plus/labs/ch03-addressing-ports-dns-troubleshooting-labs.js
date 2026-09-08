window.ReviewApp.content.register({
type: "labs",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
title: "Inspect a Switch MAC Address Table",
difficulty: 1,
minutes: 20,
scenario: "A small LAN is experiencing intermittent forwarding issues. You have access to a Cisco switch and need to inspect the learned MAC address table to determine which switch ports the devices are associated with.",
objectives: [
"Display the switch MAC address table.",
"Interpret learned MAC addresses and their associated ports."
],
objectiveSteps: [[0], [0]],
mockData: [
"Representative switch output:\nMac Address Table\n-------------------------------------------\nVlan    Mac Address       Type       Ports\n----    -----------       --------   -----\n   1    0001.4296.04db    DYNAMIC    Fa4/1\n   1    0030.f27.2383     DYNAMIC    Fa4/1\n   1    00d0.97ee.4b28     DYNAMIC    Fa0/1"
],
steps: [
{
do: "Enter privileged EXEC mode and display the switch's learned MAC address table.",
command: "show mac-address-table",
hint: "The table is the Layer 2 data structure that maps learned MAC addresses to switch ports.",
solution: "Switch>enable\nSwitch#show mac-address-table",
expectedOutput: "Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type       Ports\n----    -----------       --------   -----\n   1    0001.4296.04db    DYNAMIC    Fa4/1\n   1    0030.f27.2383     DYNAMIC    Fa4/1\n   1    00d0.97ee.4b28    DYNAMIC    Fa0/1",
expectedOutputDynamic: false,
check: "Confirm that each learned MAC address is paired with the switch port where the source frame was observed."
}
],
tags: ["network-plus", "switching", "mac-table", "cisco"]
},
{
title: "Identify a NIC Manufacturer from a MAC Address",
difficulty: 1,
minutes: 20,
scenario: "You are investigating a packet capture and need to identify the manufacturer of a network adapter. The chapter procedure uses the first three bytes of a MAC address as the OUI and an OUI lookup.",
objectives: [
"Extract the OUI from a MAC address.",
"Use the OUI portion as the manufacturer lookup value."
],
objectiveSteps: [[0], [1]],
mockData: [
"Captured source MAC address: 00:60:8C:00:54:99"
],
steps: [
{
do: "Inspect the captured MAC address and isolate its first three hexadecimal byte pairs.",
hint: "A 48-bit MAC address is conceptually divided into two 24-bit halves. Focus on the manufacturer portion.",
solution: "00:60:8C",
expectedOutput: "00:60:8C",
expectedOutputDynamic: false,
check: "Verify that your extracted value contains exactly the first three byte pairs of the MAC address."
},
{
do: "Use the extracted OUI with an OUI lookup source, such as the lookup resource referenced by the chapter, to identify the manufacturer.",
hint: "Submit only the manufacturer portion of the MAC rather than the complete device-specific address.",
solution: "OUI lookup for 00:60:8C",
expectedOutput: "(manufacturer name returned by the OUI lookup)",
expectedOutputDynamic: true,
check: "Verify that the lookup accepts the first 24 bits and returns a NIC manufacturer."
}
],
tags: ["network-plus", "mac", "oui", "wireshark"]
},
{
title: "Configure and Verify IPv4 Host Settings",
difficulty: 2,
minutes: 25,
scenario: "A workstation has been configured with IPv4 settings, but its administrator wants to verify the complete TCP/IP configuration before troubleshooting connectivity. Use the host configuration tools emphasized in the chapter.",
objectives: [
"Display the host's IP, subnet, gateway, and DNS configuration.",
"Distinguish DHCP-based configuration from manually configured addressing."
],
objectiveSteps: [[0], [0]],
mockData: [
"Expected configuration fields to inspect:\nIPv4 address: 192.168.2.172\nDNS servers: 1.1.1.1 and 1.0.0.1\nIP assignment: Automatic (DHCP)\nDNS server assignment: Automatic (DHCP)"
],
steps: [
{
do: "On Windows, display the complete TCP/IP configuration for the active network interfaces.",
command: "ipconfig /all",
hint: "Use the detailed configuration form rather than the abbreviated display.",
solution: "ipconfig /all",
expectedOutput: "Windows IP Configuration\n\nEthernet adapter:\n   DHCP Enabled. . . . . . . . . . . : Yes\n   IPv4 Address. . . . . . . . . . . : 192.168.2.172\n   DNS Servers . . . . . . . . . . . : 1.1.1.1\n                                       1.0.0.1",
expectedOutputDynamic: false,
check: "Verify that you can locate the IPv4 address, DHCP status, DNS servers, and other TCP/IP settings in the output."
},
{
do: "Identify whether the example host receives its addressing information dynamically or statically.",
hint: "Look for the setting that indicates whether the address is being obtained from a DHCP service.",
solution: "DHCP is enabled; the host is dynamically configured.",
expectedOutput: "DHCP Enabled. . . . . . . . . . . : Yes",
expectedOutputDynamic: false,
check: "Confirm that the configuration indicates DHCP rather than a manually assigned client address."
}
],
tags: ["network-plus", "ipv4", "dhcp", "windows", "ipconfig"]
},
{
title: "Diagnose a Missing Default Route",
difficulty: 2,
minutes: 25,
scenario: "A DNS migration appears to be failing. The DNS settings look correct, but an external network test reports that the network is unreachable. Apply the chapter's lower-layer-first troubleshooting approach and inspect the routing information.",
objectives: [
"Recognize a routing failure from the symptom.",
"Inspect the host routing table for a default route."
],
objectiveSteps: [[0, 1], [1]],
mockData: [
"Symptom: DNS queries are not receiving answers.\nExternal connectivity test: Network is unreachable.\nDNS configuration: Correct.\nRouting information: No default route is present."
],
steps: [
{
do: "Decide whether the symptom should be treated as an application-layer DNS problem immediately, or whether basic routing should be verified first.",
hint: "Use the chapter's troubleshooting order and move from lower-layer connectivity toward DNS.",
solution: "Verify IP configuration and routing before blaming DNS.",
expectedOutput: "Routing should be verified before treating DNS as the root cause.",
expectedOutputDynamic: false,
check: "Confirm that your troubleshooting path checks basic connectivity and routing before application-layer DNS behavior."
},
{
do: "On Windows, display the routing table and inspect it for a usable default route.",
command: "route print",
hint: "The routing table shows how traffic is directed to different networks. Look for the route used when no more specific route exists.",
solution: "route print",
expectedOutput: "IPv4 Route Table\n\nActive Routes:\nNetwork Destination    Netmask          Gateway\n0.0.0.0                0.0.0.0          <default gateway>",
expectedOutputDynamic: true,
check: "Verify whether a 0.0.0.0 destination with a 0.0.0.0 mask is present and points to a usable gateway."
}
],
tags: ["network-plus", "routing", "dns", "troubleshooting"]
},
{
title: "Use Ping to Isolate a Connectivity Problem",
difficulty: 2,
minutes: 25,
scenario: "A workstation reports that the Internet is unavailable. Determine whether the problem is local TCP/IP connectivity, the gateway, remote IP connectivity, or DNS by running the chapter's sequence of ping tests.",
objectives: [
"Test the local TCP/IP stack.",
"Test the default gateway and a remote IP address.",
"Distinguish IP connectivity from DNS name resolution."
],
objectiveSteps: [[0], [1, 2], [3]],
mockData: [
"Test targets:\n127.0.0.1 = local loopback\ndefault gateway = 192.168.1.1\nInternet IP = 8.8.8.8\nHostname = google.com"
],
steps: [
{
do: "Test the local TCP/IP stack with the IPv4 loopback address.",
command: "ping 127.0.0.1",
hint: "Start with the host itself before testing any external device.",
solution: "ping 127.0.0.1",
expectedOutput: "Reply from 127.0.0.1: bytes=32 time<1ms TTL=128",
expectedOutputDynamic: true,
check: "Verify that the local loopback test receives replies."
},
{
do: "Test connectivity to the workstation's default gateway.",
command: "ping 192.168.1.1",
hint: "Use the configured gateway address to test local network reachability.",
solution: "ping 192.168.1.1",
expectedOutput: "Reply from 192.168.1.1: bytes=32 time<1ms TTL=64",
expectedOutputDynamic: true,
check: "Verify that the gateway responds, indicating local network connectivity."
},
{
do: "Test Internet IP connectivity without requiring DNS name resolution.",
command: "ping 8.8.8.8",
hint: "Use a known numeric Internet address so the test does not depend on resolving a hostname.",
solution: "ping 8.8.8.8",
expectedOutput: "Reply from 8.8.8.8: bytes=32 time=20ms TTL=117",
expectedOutputDynamic: true,
check: "Verify that the numeric IP responds before moving to a hostname test."
},
{
do: "Test Internet connectivity together with DNS resolution by pinging a hostname.",
command: "ping google.com",
hint: "Compare this result with the previous numeric-IP test. The key difference is name resolution.",
solution: "ping google.com",
expectedOutput: "Pinging google.com [93.184.216.34] with 32 bytes of data:\nReply from 93.184.216.34: bytes=32 time=20ms TTL=117",
expectedOutputDynamic: true,
check: "If the numeric IP succeeds but the hostname test fails, classify the problem as a DNS/name-resolution issue."
}
],
tags: ["network-plus", "ping", "icmp", "troubleshooting"]
},
{
title: "Troubleshoot DNS with nslookup and dig",
difficulty: 2,
minutes: 30,
scenario: "You need to investigate a DNS problem from both Windows and Linux/macOS perspectives. Perform a forward lookup, a reverse lookup, and targeted record queries using the tools covered in the chapter.",
objectives: [
"Perform a basic forward DNS lookup.",
"Perform a reverse DNS lookup.",
"Query specific DNS record types and DNS servers."
],
objectiveSteps: [[0], [1], [2, 3]],
mockData: [
"Test domain: example.com\nTest DNS server: 8.8.8.8\nTest IP for reverse lookup: 8.8.8.8"
],
steps: [
{
do: "Perform a basic DNS lookup for example.com with nslookup.",
command: "nslookup example.com",
hint: "A forward lookup starts with a hostname and seeks its associated IP address.",
solution: "nslookup example.com",
expectedOutput: "Name:    example.com\nAddresses: 93.184.216.34",
expectedOutputDynamic: false,
check: "Verify that the response associates the hostname with an IP address."
},
{
do: "Perform a reverse DNS lookup for the supplied IP address with nslookup.",
command: "nslookup 8.8.8.8",
hint: "For a reverse lookup, provide the numeric IP rather than the hostname.",
solution: "nslookup 8.8.8.8",
expectedOutput: "Name:    dns.google\nAddress: 8.8.8.8",
expectedOutputDynamic: false,
check: "Verify that the response attempts to map the supplied IP address back to a hostname."
},
{
do: "Query the MX records for example.com with nslookup.",
command: "nslookup -type=MX example.com",
hint: "The record type tells the DNS server which kind of resource record you want to inspect.",
solution: "nslookup -type=MX example.com",
expectedOutput: "example.com    MX preference = 10, mail exchanger = mail.example.com",
expectedOutputDynamic: false,
check: "Confirm that the response identifies a mail exchanger rather than an address record."
},
{
do: "Repeat the basic lookup against a specified DNS server using dig.",
command: "dig @8.8.8.8 example.com",
hint: "The `@` syntax selects the DNS server that will answer the query.",
solution: "dig @8.8.8.8 example.com",
expectedOutput: ";; SERVER: 8.8.8.8#53\nexample.com.    IN    A    93.184.216.34",
expectedOutputDynamic: false,
check: "Verify that the output shows the selected DNS server and an A record for the queried hostname."
}
],
tags: ["network-plus", "dns", "nslookup", "dig"]
},
{
title: "Analyze DNS Resource Records",
difficulty: 2,
minutes: 25,
scenario: "You are reviewing a DNS zone file to identify how hosts, mail systems, name servers, and aliases are represented. Use the record types emphasized in the chapter to classify each entry.",
objectives: [
"Identify the purpose of common DNS resource records.",
"Distinguish forward and reverse lookup records."
],
objectiveSteps: [[0], [1]],
mockData: [
"example.com.            IN     SOA      ns1.example.com. admin.example.com. 2026090601 86400 7200 3600000 86400\nexample.com.            IN     NS       ns1.example.com.\nexample.com.            IN     NS       ns2.example.com.\nwww.example.com.        IN     A        192.0.2.10\nmail.example.com.       IN     A        192.0.2.20\nexample.com.            IN     MX       10 mail.example.com.\nblog.example.com.       IN     CNAME    [www.example.com.\nexample.com](http://www.example.com.\nexample.com).            IN     TXT      v=spf1 include:outlook.com ~all"
],
steps: [
{
do: "Classify the A, MX, CNAME, NS, SOA, and TXT records in the supplied zone data by their primary purpose.",
hint: "Think in terms of address mapping, mail delivery, aliases, authoritative servers, zone administration, and free-form text.",
solution: "A = hostname to IPv4; MX = mail server; CNAME = alias to canonical hostname; NS = authoritative name server; SOA = zone authority and administrative data; TXT = text such as SPF information.",
expectedOutput: "A → IPv4 address\nMX → mail server\nCNAME → canonical hostname alias\nNS → authoritative name server\nSOA → zone authority information\nTXT → text/SPF information",
expectedOutputDynamic: false,
check: "Verify that each record has been assigned to the correct functional category."
},
{
do: "Determine which record type would be used for a reverse lookup when the known value is an IP address.",
hint: "Reverse DNS starts with an address and seeks the hostname associated with it.",
solution: "PTR",
expectedOutput: "PTR",
expectedOutputDynamic: false,
check: "Confirm that the selected record performs IP-to-hostname reverse DNS."
},
{
do: "For the supplied zone data, identify the resource record that authorizes or describes an email sender policy.",
hint: "The chapter notes that email authentication information is commonly carried in free-form DNS text records.",
solution: "TXT",
expectedOutput: "example.com. IN TXT v=spf1 include:outlook.com ~all",
expectedOutputDynamic: false,
check: "Verify that the record is a TXT record containing SPF information."
}
],
tags: ["network-plus", "dns", "records", "zone-file"]
},
{
title: "Practice DHCP and DNS Cache Troubleshooting",
difficulty: 2,
minutes: 25,
scenario: "A Windows workstation may have stale DNS information and an incorrect DHCP lease. Use the Windows commands from the chapter to inspect the current state, release and renew the address, and clear cached DNS data.",
objectives: [
"Inspect cached DNS information.",
"Release and renew the DHCP configuration.",
"Clear stale local DNS cache entries."
],
objectiveSteps: [[0], [1], [2]],
steps: [
{
do: "Display the workstation's local DNS resolver cache.",
command: "ipconfig /displaydns",
hint: "Use the command that reports cached name-resolution data rather than the full interface configuration.",
solution: "ipconfig /displaydns",
expectedOutput: "Windows IP Configuration\n\nexample.com\n----------------------------------------\nRecord Name . . . . . : example.com\nRecord Type . . . . . : 1",
expectedOutputDynamic: true,
check: "Verify that cached DNS entries are displayed."
},
{
do: "Release the current DHCP lease.",
command: "ipconfig /release",
hint: "Choose the Windows command intended to give up the active DHCP address.",
solution: "ipconfig /release",
expectedOutput: "Windows IP Configuration\n\nThe operation completed successfully.",
expectedOutputDynamic: true,
check: "Verify that the active DHCP configuration has been released."
},
{
do: "Request fresh network configuration from DHCP.",
command: "ipconfig /renew",
hint: "Use the complementary DHCP command to obtain current network configuration.",
solution: "ipconfig /renew",
expectedOutput: "Windows IP Configuration\n\nEthernet adapter:\n   IPv4 Address. . . . . . . . . . . : 192.168.2.172",
expectedOutputDynamic: true,
check: "Verify that the interface receives current DHCP configuration."
},
{
do: "Clear the local DNS resolver cache.",
command: "ipconfig /flushdns",
hint: "Use the command that removes cached DNS results without changing the interface's IP configuration.",
solution: "ipconfig /flushdns",
expectedOutput: "Windows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache.",
expectedOutputDynamic: false,
check: "Verify that Windows reports a successful DNS cache flush."
}
],
tags: ["network-plus", "dhcp", "dns", "windows", "troubleshooting"]
},
{
title: "Troubleshoot Incorrect Time Synchronization",
difficulty: 2,
minutes: 25,
scenario: "Several computers in a domain are consistently showing the wrong time. Determine whether the issue is likely local hardware or centralized NTP configuration, then verify the active Windows time source.",
objectives: [
"Differentiate single-host clock problems from multi-host NTP problems.",
"Inspect the configured Windows NTP source.",
"Identify the network requirement for NTP synchronization."
],
objectiveSteps: [[0], [1], [2]],
steps: [
{
do: "Classify the likely cause when multiple domain computers consistently show the wrong time.",
hint: "Compare the chapter's guidance for a single computer with its guidance for multiple devices in a domain.",
solution: "Check the NTP time source.",
expectedOutput: "Likely cause: NTP time-source or synchronization configuration",
expectedOutputDynamic: false,
check: "Verify that you selected an NTP-related cause rather than a single-host CMOS battery problem."
},
{
do: "On Windows, display the current NTP/time source.",
command: "w32tm /query /source",
hint: "Use the Windows time-management utility and query its current source.",
solution: "w32tm /query /source",
expectedOutput: "time.example.net",
expectedOutputDynamic: true,
check: "Verify that the command returns the time source currently used by the system."
},
{
do: "Identify the transport requirement that should be checked in firewalls when NTP synchronization fails.",
hint: "The chapter associates NTP with a specific UDP service port.",
solution: "UDP port 123",
expectedOutput: "UDP 123",
expectedOutputDynamic: false,
check: "Confirm that the relevant firewall path permits UDP port 123."
}
],
tags: ["network-plus", "ntp", "windows", "time-sync", "troubleshooting"]
},
{
title: "Perform an IPv6 SLAAC Sequence",
difficulty: 3,
minutes: 30,
scenario: "An IPv6-capable host has joined a local network and must autoconfigure an address. Walk through the SLAAC sequence from link-local addressing through duplicate detection and router discovery.",
objectives: [
"Identify the components of a link-local IPv6 address.",
"Apply the SLAAC sequence in the correct order.",
"Distinguish RS and RA roles."
],
objectiveSteps: [[0], [1], [2]],
mockData: [
"IPv6 values for the exercise:\nLink-local prefix: FE80::/64\nExample interface ID: 0000:00D3:9C5A:00CC\nExample router prefix received in RA: 2001:0DB8:0B80:0000::/64"
],
steps: [
{
do: "Construct the host's example link-local IPv6 address from the supplied prefix and interface ID.",
hint: "Combine the link-local prefix with the interface identifier; do not alter the hexadecimal groups unnecessarily.",
solution: "FE80::0000:00D3:9C5A:00CC",
expectedOutput: "FE80::0000:00D3:9C5A:00CC",
expectedOutputDynamic: false,
check: "Verify that the address begins with the link-local FE80 prefix and contains the supplied interface ID."
},
{
do: "Place the SLAAC actions in the order taught by the chapter.",
hint: "The device first creates an address, then checks uniqueness, then communicates with the router.",
solution: "Generate address → DAD → RS → RA",
expectedOutput: "1. Generate address\n2. Check uniqueness with DAD\n3. Send RS\n4. Receive RA",
expectedOutputDynamic: false,
check: "Confirm that your sequence matches the chapter's SLAAC workflow."
},
{
do: "Identify which message requests configuration and which message supplies it.",
hint: "One message is sent by the host toward the router; the other is the router's response.",
solution: "RS requests router configuration; RA provides router configuration.",
expectedOutput: "RS → request\nRA → router-provided configuration",
expectedOutputDynamic: false,
check: "Verify that RS and RA have been assigned opposite but complementary roles."
}
],
tags: ["network-plus", "ipv6", "slaac", "dad"]
},
{
title: "Classify an Addressing Failure from Symptoms",
difficulty: 3,
minutes: 30,
scenario: "A workstation can communicate with local devices but cannot reach Internet resources by name. Use the chapter's diagnostic sequence to infer the most likely fault from a controlled set of test results.",
objectives: [
"Interpret diagnostic results from multiple addressing layers.",
"Identify whether the likely fault is routing, DNS, or an application service.",
"Select the next appropriate troubleshooting action."
],
objectiveSteps: [[0], [1], [2]],
mockData: [
"Test results:\nping 127.0.0.1 → succeeds\nping 192.168.1.1 → succeeds\nping 8.8.8.8 → succeeds\nping google.com → fails\nApplication access by hostname → fails"
],
steps: [
{
do: "Interpret the test sequence and identify which major subsystem should be investigated next.",
hint: "The numeric Internet IP test succeeds while the hostname test fails. Focus on what extra function the hostname test requires.",
solution: "DNS/name resolution",
expectedOutput: "Most likely issue: DNS/name resolution",
expectedOutputDynamic: false,
check: "Verify that your diagnosis explains why IP connectivity works while hostname access fails."
},
{
do: "Choose the most appropriate tool from the chapter to investigate the DNS response.",
hint: "Use a utility designed specifically to query DNS information rather than a general connectivity command.",
solution: "nslookup",
expectedOutput: "Recommended DNS troubleshooting tool: nslookup",
expectedOutputDynamic: false,
check: "Verify that the selected tool can perform forward and reverse DNS queries."
},
{
do: "Choose a query that tests the configured DNS server directly instead of relying on the system's default resolver.",
hint: "The chapter shows a form of the DNS query tools that specifies the server address explicitly.",
solution: "nslookup example.com 8.8.8.8",
expectedOutput: "Server:  dns.google\nAddress:  8.8.8.8\nName:    example.com\nAddress:  93.184.216.34",
expectedOutputDynamic: false,
check: "Verify that the query explicitly targets the supplied DNS server and returns an address for the hostname."
}
],
tags: ["network-plus", "troubleshooting", "dns", "ping"]
},
{
title: "Map Protocols to Ports for Firewall Review",
difficulty: 2,
minutes: 25,
scenario: "A firewall review requires you to validate several proposed service rules against the chapter's port table. Identify the correct service, port, and transport for each required connection.",
objectives: [
"Identify common protocol-to-port mappings.",
"Distinguish secure and nonsecure service variants.",
"Use port knowledge to validate firewall rules."
],
objectiveSteps: [[0], [1], [2]],
mockData: [
"Firewall requests:\nSecure web access\nSecure remote administration\nDirectory access\nEncrypted email submission\nNetwork file sharing"
],
steps: [
{
do: "Map each requested service to the port values emphasized in the chapter.",
hint: "Use the chapter's high-value port table rather than guessing from service names.",
solution: "Secure web access → 443\nSecure remote administration → 22\nDirectory access → 389 or 636 depending on whether secure access is required\nEncrypted email submission → 587\nNetwork file sharing → 445",
expectedOutput: "HTTPS → 443\nSSH → 22\nLDAP → 389 / LDAPS → 636\nSMTPS → 587\nSMB → 445",
expectedOutputDynamic: false,
check: "Verify that each requested service is paired with the port used in the chapter."
},
{
do: "Identify which requested service requires the secure alternative rather than the plaintext or base service.",
hint: "Compare each service with its secure counterpart in the chapter's paired port list.",
solution: "HTTPS, SSH, LDAPS, and SMTPS use the secure variants shown in the source.",
expectedOutput: "HTTPS 443\nSSH 22\nLDAPS 636\nSMTPS 587",
expectedOutputDynamic: false,
check: "Verify that the selected protocols provide the security characteristic requested by the scenario."
},
{
do: "Review the final firewall rule set and state the core reason ports matter in this troubleshooting context.",
hint: "A firewall can allow or block traffic based on the destination service port.",
solution: "Firewall rules can filter traffic by port, so the correct service-to-port mapping is required.",
expectedOutput: "Port mappings determine which service traffic a firewall rule permits or blocks.",
expectedOutputDynamic: false,
check: "Confirm that your explanation ties port identification to firewall filtering."
}
],
tags: ["network-plus", "ports", "firewall", "protocols"]
}
]
});
