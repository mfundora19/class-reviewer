window.ReviewApp.content.register({
type: "labs",
cert: "network-plus",
chapter: "Chapter 2: Infrastructure and Documentation",
items: [
{
title: "Map the Campus Cabling Hierarchy",
difficulty: 1,
minutes: 15,
scenario: "You are documenting a new school network. The external ISP connection enters the building, reaches the central distribution area, branches to intermediate distribution areas, and finally serves user work areas. Build the correct infrastructure path from the source notes.",
objectives: [
"Identify the correct structured-cabling hierarchy",
"Distinguish the roles of the EF, demarc, MDF, IDF, and work area"
],
objectiveSteps: [
[0],
[1]
],
mockData: [
"Components available: ISP, EF, Demarc, MDF, IDF, Work Area"
],
steps: [
{
do: "Arrange the six components into the physical path from the ISP to an end-user work area.",
hint: "Start at the external provider and move inward toward the user. The responsibility boundary appears before the central distribution point.",
solution: "ISP -> EF -> Demarc -> MDF -> IDF -> Work Area",
expectedOutput: "ISP -> EF -> Demarc -> MDF -> IDF -> Work Area",
expectedOutputDynamic: false,
check: "Verify that the demarc appears between the EF and MDF, and that the IDF appears between the MDF and work area.",
tags: ["network-plus", "structured-cabling", "hierarchy"]
}
],
tags: ["network-plus", "structured-cabling", "infrastructure"]
},
{
title: "Troubleshoot the Demarc Boundary",
difficulty: 1,
minutes: 15,
scenario: "An ISP technician arrives to troubleshoot a weak WAN connection. A transceiver associated with the incoming connection was damaged during a storm. Before deciding who should replace it, determine the responsibility boundary using the network layout.",
objectives: [
"Use the demarc to determine responsibility",
"Apply the responsibility boundary to a troubleshooting scenario"
],
objectiveSteps: [
[0],
[1]
],
mockData: [
"Network path: ISP -> EF -> Demarc -> MDF -> Router",
"Affected transceiver location: between the ISP connection and the customer-side equipment"
],
steps: [
{
do: "Determine the key physical boundary you must use to decide whether the ISP or the organization is generally responsible for the damaged transceiver.",
hint: "Think about the point where provider responsibility changes to customer responsibility.",
solution: "Demarc",
expectedOutput: "Demarc",
expectedOutputDynamic: false,
check: "Verify that you selected the responsibility boundary rather than a distribution frame or work area.",
tags: ["network-plus", "demarc", "troubleshooting"]
},
{
do: "The damaged device is confirmed to be on the ISP side of the demarc. Identify which party is generally responsible according to the source.",
hint: "The party responsible for its network extends its responsibility up to the boundary.",
solution: "ISP",
expectedOutput: "ISP",
expectedOutputDynamic: false,
check: "Verify that the responsible party matches the side of the demarc where the device is located.",
tags: ["network-plus", "demarc", "responsibility"]
}
],
tags: ["network-plus", "troubleshooting", "demarc"]
},
{
title: "Validate Horizontal Cabling",
difficulty: 1,
minutes: 20,
scenario: "A contractor is installing cabling from an IDF to a workstation. The fixed cable run is measured at 86 meters, and the workstation patch connection is expected to be 9 meters. Determine whether the installation stays within the source's maximum horizontal-cabling distance.",
objectives: [
"Apply the 90 m fixed-run limit",
"Apply the 100 m total horizontal-cabling limit"
],
objectiveSteps: [
[0],
[1]
],
mockData: [
"Fixed horizontal run: 86 m",
"Workstation connection: 9 m",
"Source limits: 90 m fixed horizontal cabling; 10 m workstation connection; 100 m total"
],
steps: [
{
do: "Determine whether the 86 m fixed horizontal run is within the maximum fixed-run distance.",
hint: "Compare the measured fixed run against the fixed portion of the source's 100 m model.",
solution: "Yes. 86 m is within the 90 m maximum fixed horizontal-cabling distance.",
expectedOutput: "Yes. 86 m <= 90 m.",
expectedOutputDynamic: false,
check: "Verify that the fixed run does not exceed 90 m.",
tags: ["network-plus", "horizontal-cabling", "cabling"]
},
{
do: "Calculate the total cabling distance by adding the fixed horizontal run and the workstation connection.",
hint: "Add the two measured segments.",
solution: "86 m + 9 m = 95 m",
expectedOutput: "95 m",
expectedOutputDynamic: false,
check: "Verify that the calculated total is 100 m or less.",
tags: ["network-plus", "horizontal-cabling", "numbers"]
},
{
do: "State whether the complete installation complies with the source's 100 m maximum.",
hint: "Compare your calculated total with the overall limit.",
solution: "Compliant. The total is 95 m, which is below the 100 m maximum.",
expectedOutput: "Compliant. 95 m <= 100 m.",
expectedOutputDynamic: false,
check: "Verify that the total remains within the 100 m maximum.",
tags: ["network-plus", "horizontal-cabling", "validation"]
}
],
tags: ["network-plus", "cabling", "distance"]
},
{
title: "Diagnose a Physical-Layer Cabling Problem",
difficulty: 2,
minutes: 20,
scenario: "A newly terminated twisted-pair connection intermittently loses connectivity. Inspection shows excessive exposed conductor at the termination and a section of cable routed beside fluorescent lighting. Use the source's installation guidance to identify the likely physical-layer concerns and the corrective actions.",
objectives: [
"Identify crosstalk as a risk from excessive exposed twisted pair",
"Identify EMI as a risk from nearby electrical activity",
"Select source-supported installation corrections"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"Termination: approximately 2.5 inches of exposed twisted-pair conductor",
"Cable path: approximately 1 foot from fluorescent lighting",
"Observed symptom: intermittent data errors"
],
steps: [
{
do: "Identify the transmission problem associated with excessive exposed twisted-pair conductor at the termination.",
hint: "The source describes a form of interference that can occur between the wires when too much conductor is left exposed.",
solution: "Crosstalk",
expectedOutput: "Crosstalk",
expectedOutputDynamic: false,
check: "Verify that you identified interference between wires rather than EMI.",
tags: ["network-plus", "crosstalk", "termination"]
},
{
do: "Identify the interference concern associated with routing the cable approximately 1 foot from fluorescent lighting.",
hint: "The source specifically lists fluorescent lights as a source of electromagnetic noise.",
solution: "EMI (electromagnetic interference)",
expectedOutput: "EMI (electromagnetic interference)",
expectedOutputDynamic: false,
check: "Verify that the identified problem is electromagnetic interference from the nearby electrical source.",
tags: ["network-plus", "emi", "physical-layer"]
},
{
do: "State the two source-supported corrections for this installation.",
hint: "One correction addresses the termination and the other addresses the physical route.",
solution: "Reduce exposed twisted-pair conductor to no more than 1 inch and move the cable so it is at least 3 feet from the fluorescent lighting.",
expectedOutput: "Exposed conductor <= 1 inch; cable >= 3 feet from fluorescent lighting.",
expectedOutputDynamic: false,
check: "Verify that both the termination and EMI-source-distance requirements are addressed.",
tags: ["network-plus", "cabling", "best-practices"]
}
],
tags: ["network-plus", "physical-layer", "cabling"]
},
{
title: "Use Nmap to Build a Network Inventory",
difficulty: 2,
minutes: 25,
scenario: "A department added three servers and a network printer, but the administrator cannot easily associate the devices with their IP addresses. Use Nmap as described in the chapter to discover hosts on the address range. The exercise uses simulated output so the result is deterministic.",
objectives: [
"Use the Nmap command against an address range",
"Interpret discovered hosts and addressing information",
"Connect network mapping results to documentation"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"Simulated Nmap output:\nNmap scan report for 192.168.2.10\nHost is up\nMAC Address: 00:11:22:33:44:10\n\nNmap scan report for 192.168.2.11\nHost is up\nMAC Address: 00:11:22:33:44:11\n\nNmap scan report for 192.168.2.20\nHost is up\nMAC Address: 00:11:22:33:44:20"
],
steps: [
{
do: "Use Nmap to scan the address range 192.168.2.1 through 192.168.2.254.",
command: "nmap 192.168.2.1-254",
hint: "The chapter identifies the Nmap command-line executable and demonstrates scanning a range using a hyphen between the starting and ending addresses.",
solution: "nmap 192.168.2.1-254",
expectedOutput: "Nmap scan report for 192.168.2.10\nHost is up\nMAC Address: 00:11:22:33:44:10\n\nNmap scan report for 192.168.2.11\nHost is up\nMAC Address: 00:11:22:33:44:11\n\nNmap scan report for 192.168.2.20\nHost is up\nMAC Address: 00:11:22:33:44:20",
expectedOutputDynamic: false,
check: "Verify that the scan covers the complete 192.168.2.1-254 range.",
tags: ["network-plus", "nmap", "network-mapping"]
},
{
do: "From the simulated results, list the discovered IP addresses.",
hint: "Record only the addresses associated with hosts that responded.",
solution: "192.168.2.10, 192.168.2.11, 192.168.2.20",
expectedOutput: "192.168.2.10\n192.168.2.11\n192.168.2.20",
expectedOutputDynamic: false,
check: "Verify that all three discovered host addresses are recorded.",
tags: ["network-plus", "nmap", "inventory"]
},
{
do: "Explain why these results are useful for network documentation.",
hint: "Think about the purpose of network mapping and the information needed to identify devices on a network.",
solution: "The results help identify devices and their addressing information so the administrator can update the network map and inventory records.",
expectedOutput: "Discovered hosts and addressing information can be used to update the network map and inventory.",
expectedOutputDynamic: false,
check: "Verify that your explanation connects discovery results to logical connections, addressing, or inventory.",
tags: ["network-plus", "network-mapping", "documentation"]
}
],
tags: ["network-plus", "nmap", "documentation"]
},
{
title: "Build a Network Documentation Record",
difficulty: 2,
minutes: 25,
scenario: "You have inherited a small department network with incomplete records. Create a concise documentation record from the supplied asset information, following the chapter's guidance for inventory, labeling, naming, and documentation.",
objectives: [
"Identify the important inventory fields",
"Apply a consistent top-down naming approach",
"Produce a documentation record that can be searched and maintained"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"Asset type: Switch\nModel: Example-SW-48\nSerial: SW24001\nBuilding: Main\nFloor: 2\nData room: IDF-2A\nRack: 03\nVendor: Example Networks\nSoftware version: 4.2\nWarranty: 2028-06-30",
"Naming guidance from the source: design names from large-scale information toward details, such as building -> floor -> data room -> rack; avoid unnecessarily revealing sensitive information."
],
steps: [
{
do: "Identify the inventory fields from the supplied record that should be retained in the documentation.",
hint: "Use the source's inventory-record categories rather than keeping only the device name.",
solution: "Device identification, model number, serial number, location, warranty information, software version, and vendor.",
expectedOutput: "Device identification; model number; serial number; location; warranty; software version; vendor.",
expectedOutputDynamic: false,
check: "Verify that the record retains identity, physical location, lifecycle/support, and technical information.",
tags: ["network-plus", "inventory", "documentation"]
},
{
do: "Create a descriptive device name using a top-down naming approach from building to rack.",
hint: "Start with the largest location and move toward the most specific location.",
solution: "MAIN-02-IDF-2A-R03-SW01",
expectedOutput: "MAIN-02-IDF-2A-R03-SW01",
expectedOutputDynamic: false,
check: "Verify that the name consistently moves from building to floor to data room to rack and then identifies the device.",
tags: ["network-plus", "naming", "documentation"]
},
{
do: "Create a compact documentation record that includes the device name and the key inventory fields.",
hint: "Keep the record structured so another technician can search it quickly.",
solution: "Device: MAIN-02-IDF-2A-R03-SW01\nType: Switch\nModel: Example-SW-48\nSerial: SW24001\nLocation: Main / Floor 2 / IDF-2A / Rack 03\nVendor: Example Networks\nSoftware: 4.2\nWarranty: 2028-06-30",
expectedOutput: "Device: MAIN-02-IDF-2A-R03-SW01\nType: Switch\nModel: Example-SW-48\nSerial: SW24001\nLocation: Main / Floor 2 / IDF-2A / Rack 03\nVendor: Example Networks\nSoftware: 4.2\nWarranty: 2028-06-30",
expectedOutputDynamic: false,
check: "Verify that the resulting record contains enough information to identify, locate, and manage the asset.",
tags: ["network-plus", "inventory", "documentation"]
}
],
tags: ["network-plus", "inventory", "naming", "documentation"]
},
{
title: "Detect Configuration Drift",
difficulty: 2,
minutes: 25,
scenario: "A production switch has a documented baseline configuration. A later audit shows that several settings differ from the intended state. Use the supplied configuration records to identify drift and determine which state should be used as the comparison reference.",
objectives: [
"Compare a current configuration with a baseline",
"Identify configuration drift",
"Use a golden configuration as a reference standard"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"Baseline configuration:\nHostname: SW-02\nVLAN10: enabled\nVLAN20: enabled\nManagement IP: 10.10.20.2",
"Current configuration:\nHostname: SW-02\nVLAN10: enabled\nVLAN20: disabled\nManagement IP: 10.10.20.2",
"Golden configuration:\nHostname: SW-02\nVLAN10: enabled\nVLAN20: enabled\nManagement IP: 10.10.20.2"
],
steps: [
{
do: "Compare the current configuration with the baseline and identify the setting that changed.",
hint: "Compare each field one at a time and find the value that no longer matches.",
solution: "VLAN20 changed from enabled in the baseline to disabled in the current configuration.",
expectedOutput: "VLAN20 changed: enabled -> disabled",
expectedOutputDynamic: false,
check: "Verify that only the VLAN20 state differs between the two supplied configurations.",
tags: ["network-plus", "configuration-management", "baseline"]
},
{
do: "Name the configuration-management condition represented by the unauthorized or undocumented difference.",
hint: "The chapter has a specific term for gradual movement away from an intended configuration.",
solution: "Configuration drift",
expectedOutput: "Configuration drift",
expectedOutputDynamic: false,
check: "Verify that the condition describes movement away from the intended configuration.",
tags: ["network-plus", "configuration-drift"]
},
{
do: "Identify the supplied configuration that can serve as the optimized standard for compliance and performance.",
hint: "The source uses a specific term for a configuration optimized for compliance and performance.",
solution: "Golden configuration",
expectedOutput: "Golden configuration",
expectedOutputDynamic: false,
check: "Verify that you selected the configuration explicitly designated as the optimized standard.",
tags: ["network-plus", "golden-configuration", "configuration-management"]
}
],
tags: ["network-plus", "configuration-management", "drift"]
},
{
title: "Plan a Safe Network Change",
difficulty: 3,
minutes: 30,
scenario: "Your organization must apply a software update to a networked system. The change affects several users, requires testing, and has a documented rollback option. Use the chapter's change-management process to build a safe implementation sequence.",
objectives: [
"Order the major change-management activities",
"Include testing, notification, backup, and rollback planning",
"Recognize the maintenance window as the scheduled implementation period"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"Change: Apply a vendor software update\nAffected users: 10\nExpected downtime: 2 hours\nRollback: Restore the previous version if testing fails\nMaintenance preference: Off-hours",
"Source process: assess necessity, read vendor documentation, test in a segmented environment, determine scope, schedule a maintenance window, notify personnel, back up configuration, restrict access when appropriate, implement, test, keep or roll back, notify completion, record the change."
],
steps: [
{
do: "Write the first five major activities you should complete before the live implementation.",
hint: "Begin with determining whether the change is necessary and understanding the vendor's requirements. The live implementation should not be your first test.",
solution: "Determine whether the update is necessary -> Read vendor documentation -> Test in a segmented test environment -> Determine scope -> Schedule the maintenance window",
expectedOutput: "Determine necessity -> Read vendor documentation -> Test in test environment -> Determine scope -> Schedule maintenance window",
expectedOutputDynamic: false,
check: "Verify that the sequence includes necessity, vendor guidance, isolated testing, scope, and scheduling before production implementation.",
tags: ["network-plus", "change-management", "planning"]
},
{
do: "Identify the two communication points required around the maintenance window.",
hint: "One notification occurs before the change and another occurs after implementation.",
solution: "Notify affected personnel before the maintenance window and notify affected personnel of completion afterward.",
expectedOutput: "Before: notify affected personnel. After: notify affected personnel of completion.",
expectedOutputDynamic: false,
check: "Verify that both pre-change and post-change communication are present.",
tags: ["network-plus", "change-management", "notification"]
},
{
do: "Identify the configuration protection step that should occur before implementation.",
hint: "The source calls for preserving the current router, switch, or server configuration before the change.",
solution: "Back up the current configuration.",
expectedOutput: "Back up the current configuration.",
expectedOutputDynamic: false,
check: "Verify that the current configuration is preserved before implementation.",
tags: ["network-plus", "change-management", "backup"]
},
{
do: "After implementation, the system passes normal-operation testing but fails a higher-load stress test. Decide whether to keep the change or invoke the rollback plan.",
hint: "The source says the decision after testing depends on whether the implementation produces the desired result.",
solution: "Invoke the rollback plan and revert to the previous version.",
expectedOutput: "Rollback the change and restore the previous version.",
expectedOutputDynamic: false,
check: "Verify that the failed post-implementation test leads to the documented rollback path rather than closing the change.",
tags: ["network-plus", "change-management", "rollback", "testing"]
},
{
do: "State the final documentation action after the change process is complete.",
hint: "The source requires completed changes to be formally captured in the organization's change-management system.",
solution: "Record the change in the change-management system.",
expectedOutput: "Change recorded in the change-management system.",
expectedOutputDynamic: false,
check: "Verify that the completed change is formally recorded rather than left undocumented.",
tags: ["network-plus", "change-management", "documentation"]
}
],
tags: ["network-plus", "change-management", "rollback"]
},
{
title: "Decommission a Legacy System Safely",
difficulty: 2,
minutes: 25,
scenario: "A legacy network service is approaching end-of-support. Management wants it removed before support ends, but the system may still have hidden dependencies. Follow the source's decommissioning process using the supplied records.",
objectives: [
"Identify dependencies before removal",
"Protect required data and verify backups",
"Sequence the decommissioning activities safely"
],
objectiveSteps: [
[0],
[1],
[2]
],
mockData: [
"System: Legacy-App-01\nLifecycle status: EOS approaching\nKnown users: Accounting and Operations\nKnown integration: nightly reporting job\nBackup status: last backup completed successfully\nBackup test status: not yet documented",
"Source sequence: identify dependencies, determine whether users or business processes rely on the system, document configuration and status, back up required data, test backups, document backups, schedule the decommissioning window, notify affected people, decommission in stages when appropriate."
],
steps: [
{
do: "Identify the dependency that must be investigated before the system is removed.",
hint: "Look for a recurring business process or integration that could fail when the system disappears.",
solution: "The nightly reporting job and the Accounting and Operations users must be assessed as dependencies.",
expectedOutput: "Nightly reporting job; Accounting users; Operations users",
expectedOutputDynamic: false,
check: "Verify that both technical integration and user/business dependencies are considered.",
tags: ["network-plus", "decommissioning", "dependencies"]
},
{
do: "Identify the missing backup-validation activity in the supplied record.",
hint: "A successful backup is not the same as proving that the backup can actually be used.",
solution: "Test the backups and document the results.",
expectedOutput: "Backup testing is required and its results should be documented.",
expectedOutputDynamic: false,
check: "Verify that the backup is tested before decommissioning proceeds.",
tags: ["network-plus", "decommissioning", "backup"]
},
{
do: "Write the remaining decommissioning sequence after dependency analysis and backup preparation.",
hint: "Use the source's ordering for scheduling, communication, and staged removal.",
solution: "Schedule the decommissioning window -> Notify potentially affected people -> Decommission in stages when appropriate",
expectedOutput: "Schedule window -> Notify affected people -> Decommission in stages when appropriate",
expectedOutputDynamic: false,
check: "Verify that scheduling and notification occur before removal.",
tags: ["network-plus", "decommissioning", "lifecycle"]
}
],
tags: ["network-plus", "decommissioning", "asset-management"]
}
]
});
