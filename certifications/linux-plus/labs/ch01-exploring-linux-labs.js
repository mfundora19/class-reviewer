window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      title: "Security Workstation System Snapshot",
      difficulty: 1,
      minutes: 20,
      scenario: "You are preparing a Linux workstation for a security support team. Collect a read-only snapshot of the running system so the handoff identifies the kernel, architecture, distribution, memory, and mounted storage before any changes are made.",
      objectives: [
        "Identify the running kernel release and machine architecture",
        "Inspect the local distribution identity",
        "Measure available memory and mounted filesystem capacity",
        "Produce a reproducible read-only asset snapshot"
      ],
      objectiveSteps: [[0, 1], [2], [3], [4, 5]],
      steps: [
        {
          do: "Display the running kernel release and record the complete value returned by the workstation.",
          command: "uname -r",
          hint: "Use the system-information command's release field rather than trying to infer the version from the desktop or hostname.",
          solution: "uname -r",
          expectedOutput: "6.8.0-31-generic",
          expectedOutputDynamic: true,
          check: "A complete kernel-release value appears in the asset record."
        },
        {
          do: "Display the machine hardware name and record the architecture used by the workstation.",
          command: "uname -m",
          hint: "Use the same system-information command with the field that reports the machine type, not the kernel release.",
          solution: "uname -m",
          expectedOutput: "x86_64",
          expectedOutputDynamic: true,
          check: "The snapshot includes an architecture such as x86_64, aarch64, or s390x."
        },
        {
          do: "Read the operating-system identification file and record the distribution name, version identifier, and short ID.",
          command: "cat /etc/os-release",
          hint: "The standard identity file contains labeled fields; locate the values that identify the distribution rather than recording unrelated environment details.",
          solution: "cat /etc/os-release",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The record contains the distribution name, version identifier, and short ID."
        },
        {
          do: "Display memory availability in a human-readable form and record total and available memory.",
          command: "free -h",
          hint: "Select the readable presentation so the handoff can use GiB or MiB values without converting raw bytes.",
          solution: "free -h",
          expectedOutput: "              total        used        free      shared  buff/cache   available\nMem:           15Gi       4.1Gi       2.8Gi       512Mi       8.7Gi        10Gi\nSwap:         2.0Gi          0B       2.0Gi",
          expectedOutputDynamic: true,
          check: "The memory table includes total and available values in human-readable units."
        },
        {
          do: "Display mounted filesystem capacity in a human-readable form and record the size, used, available, and use-percentage columns.",
          command: "df -h",
          hint: "Use the filesystem-capacity report and focus on the mount-point rows relevant to the workstation rather than guessing from disk labels.",
          solution: "df -h",
          expectedOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p3  120G   38G   76G  34% /\ntmpfs           7.8G     0  7.8G   0% /dev/shm",
          expectedOutputDynamic: true,
          check: "The storage snapshot includes capacity, use, availability, and mount-point information."
        },
        {
          do: "Review the collected command results and mark the handoff complete only when kernel, architecture, distribution, memory, and storage values are all present.",
          hint: "Compare the five observed result groups with the required asset fields; do not invent values that were not displayed by the workstation.",
          solution: "Use the outputs from `uname -r`, `uname -m`, `cat /etc/os-release`, `free -h`, and `df -h` to complete the asset record.",
          expectedOutput: "Asset snapshot complete\nKernel: recorded\nArchitecture: recorded\nDistribution: recorded\nMemory: recorded\nMounted storage: recorded",
          expectedOutputDynamic: true,
          check: "The handoff contains all five observed system-inventory categories."
        }
      ],
      tags: ["system-info", "kernel", "architecture", "distribution", "memory", "disk", "asset-inventory"]
    },
    {
      title: "Package Repository Readiness Check",
      difficulty: 2,
      minutes: 20,
      scenario: "A security workstation must receive routine updates, but the operator wants to refresh repository metadata without installing upgrades. Identify the distribution family, run the appropriate metadata-refresh action, and verify that the system remains suitable for the next maintenance step.",
      objectives: [
        "Identify the current distribution before selecting a package manager",
        "Match Ubuntu, Rocky/RHEL/Fedora, and openSUSE with their package managers",
        "Refresh repository metadata without applying a package upgrade",
        "Record the maintenance action actually performed"
      ],
      objectiveSteps: [[0], [1], [2], [3, 4]],
      steps: [
        {
          do: "Inspect the workstation's distribution identity before choosing a package-management command.",
          command: "cat /etc/os-release",
          hint: "Use the labeled distribution fields to decide whether the host belongs to the Debian, Red Hat, or SUSE family.",
          solution: "cat /etc/os-release",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The distribution family is identified before a package manager is selected."
        },
        {
          do: "Use the chapter's family map to select the package manager: Ubuntu/Debian uses apt, Rocky/RHEL/Fedora uses dnf, and openSUSE uses zypper.",
          hint: "Base the selection on the distribution identity you just observed, not on the command used by a different workstation.",
          solution: "Ubuntu/Debian → apt. Rocky/RHEL/Fedora → dnf. openSUSE → zypper.",
          expectedOutput: "Observed family: Debian-based\nSelected manager: apt",
          expectedOutputDynamic: true,
          check: "The selected manager matches the observed distribution family."
        },
        {
          do: "Refresh repository metadata on the Debian-based training workstation without applying a package upgrade.",
          command: "sudo apt update",
          hint: "Choose the package-manager action that downloads current repository indexes; do not choose the action that changes installed packages.",
          solution: "sudo apt update",
          expectedOutput: "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done",
          expectedOutputDynamic: true,
          check: "Repository metadata is refreshed and no package-upgrade action is reported."
        },
        {
          do: "Re-read the distribution identity after the refresh and confirm that the same Debian-based workstation remains selected for the handoff.",
          command: "cat /etc/os-release",
          hint: "Use the same identity check as before and compare the family result, not incidental repository timestamps or mirror text.",
          solution: "cat /etc/os-release",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The post-refresh identity still matches the package manager used."
        },
        {
          do: "Record the completed maintenance state in the workstation handoff.",
          hint: "State the family, manager, and refresh action that actually ran; do not claim that packages were upgraded.",
          solution: "Record: Family Debian-based; manager apt; repository metadata refreshed; package upgrade not performed.",
          expectedOutput: "Maintenance status\nFamily: Debian-based\nManager: apt\nCompleted: repository metadata refresh\nNot performed: package upgrade",
          check: "The handoff distinguishes metadata refresh from package installation or upgrade."
        }
      ],
      tags: ["distributions", "apt", "dnf", "zypper", "package-management", "maintenance"]
    },
    {
      title: "Virtualization Host Capacity Assessment",
      difficulty: 2,
      minutes: 20,
      scenario: "Before creating an isolated Linux environment for security training, assess the current workstation against the chapter's local virtualization baseline. Use live system output to decide whether the host has the documented architecture, CPU class, memory, and disk capacity.",
      objectives: [
        "Inspect live host architecture and resource information",
        "Compare observed memory and disk capacity with the chapter baseline",
        "Identify whether local virtualization is viable",
        "Record a capacity-based deployment decision"
      ],
      objectiveSteps: [[0], [1, 2], [3], [4]],
      steps: [
        {
          do: "Display the host architecture and compare it with the chapter's x86_64 virtualization baseline.",
          command: "uname -m",
          hint: "Use the machine hardware result and mark whether it matches the architecture required by the supplied baseline.",
          solution: "uname -m",
          expectedOutput: "x86_64",
          expectedOutputDynamic: true,
          check: "The host architecture is recorded and compared with x86_64."
        },
        {
          do: "Display available memory and compare the total with the chapter's 8 GB local-virtualization baseline.",
          command: "free -h",
          hint: "Use the total-memory row and compare it with the stated baseline; do not use available memory as a substitute for total capacity.",
          solution: "free -h",
          expectedOutput: "              total        used        free      shared  buff/cache   available\nMem:           15Gi       4.1Gi       2.8Gi       512Mi       8.7Gi        10Gi",
          expectedOutputDynamic: true,
          check: "The memory result is present and its total is compared with 8 GB."
        },
        {
          do: "Display mounted filesystem capacity and compare available space on the relevant mount with the chapter's 70 GB disk baseline.",
          command: "df -h",
          hint: "Use the available-space column for the mount where the training environment would be stored, and compare it with 70 GB.",
          solution: "df -h",
          expectedOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p3  120G   38G   76G  34% /",
          expectedOutputDynamic: true,
          check: "Filesystem capacity is recorded and the relevant available space is compared with 70 GB."
        },
        {
          do: "Use the three observed command results to decide whether the host meets the architecture, memory, and disk portions of the local baseline.",
          hint: "Make the decision from live output: architecture must match, total memory must reach 8 GB, and relevant available disk must reach 70 GB.",
          solution: "Record whether `uname -m` reports x86_64, whether `free -h` shows at least 8 GB total memory, and whether `df -h` shows at least 70 GB available on the selected mount.",
          expectedOutput: "Capacity assessment\nArchitecture: meets or does not meet baseline\nMemory: meets or does not meet 8 GB baseline\nDisk: meets or does not meet 70 GB baseline",
          expectedOutputDynamic: true,
          check: "The decision cites live architecture, memory, and disk results rather than a supplied fictional profile."
        },
        {
          do: "Record the deployment recommendation based on the assessment: local virtualization only if the measured requirements are met; otherwise use one of the chapter's cloud alternatives.",
          hint: "Keep the recommendation tied to the measured capacity and choose only among the local products or cloud providers named in the chapter.",
          solution: "If all measured requirements pass, recommend a local option such as Oracle VirtualBox. If a requirement fails, recommend AWS, Microsoft Azure, or DigitalOcean instead.",
          expectedOutput: "Deployment recommendation\nBasis: live host capacity assessment\nDecision: local virtualization or cloud alternative selected",
          expectedOutputDynamic: true,
          check: "The recommendation follows the measured host capacity and names a chapter-supported deployment option."
        }
      ],
      tags: ["virtualization", "cloud", "virtualbox", "qemu", "hyper-v", "capacity"]
    },
    {
      title: "TTY Recovery Drill for a Security Workstation",
      difficulty: 1,
      minutes: 15,
      scenario: "During a basic incident review, a workstation's graphical desktop becomes unresponsive while the machine remains powered on. Practice the chapter's text-console recovery path, run a read-only identity check from the console, and return to the graphical session.",
      objectives: [
        "Switch from a graphical desktop to a text-only virtual console",
        "Run a read-only system check from the TTY",
        "Return to the graphical desktop",
        "Record the recovery result"
      ],
      objectiveSteps: [[0], [1], [2], [3]],
      steps: [
        {
          do: "Switch from the graphical desktop to the numbered text console identified in the chapter.",
          hint: "Use the Control, Alt, and function-key sequence for a numbered console; this is a keyboard action rather than a shell command.",
          solution: "Press Ctrl+Alt+F2 to open tty2. Some distributions also use Ctrl+Alt+F3 for another text console.",
          expectedOutput: "Ubuntu 24.04.1 LTS labhost tty2\nlabhost login:",
          expectedOutputDynamic: true,
          check: "A text-only login prompt for a numbered TTY appears."
        },
        {
          do: "Sign in with the training account if requested and run a read-only distribution identity check from the text console.",
          command: "cat /etc/os-release",
          hint: "After reaching the independent console, use a read-only command that confirms the host identity without changing system state.",
          solution: "Sign in when prompted, then run `cat /etc/os-release`.",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The TTY provides a shell and the distribution identity can be read without the graphical desktop."
        },
        {
          do: "Return to the graphical desktop using the display-manager shortcut appropriate to the workstation.",
          hint: "The return key can vary by distribution or display manager, so use one of the return paths documented in the chapter.",
          solution: "Press Ctrl+Alt+F1, Ctrl+Alt+F7, or Ctrl+Alt+F2 as appropriate for the distribution and display manager.",
          expectedOutput: "Graphical desktop restored.",
          expectedOutputDynamic: true,
          check: "The graphical session returns after leaving the text console."
        },
        {
          do: "Record the recovery status, including the console reached, the successful read-only check, and the desktop state after returning.",
          hint: "Report only observable results from the keyboard actions and the identity command; do not claim that an underlying GUI fault was repaired.",
          solution: "Record: Reached tty2, confirmed shell access by reading the distribution identity, and returned to the graphical desktop.",
          expectedOutput: "Recovery status\nTTY reached: tty2\nRead-only check: completed\nGraphical desktop: restored",
          expectedOutputDynamic: true,
          check: "The handoff records TTY access, the read-only check, and the return to the graphical session."
        }
      ],
      tags: ["tty", "terminal", "recovery", "incident-response", "system-info"]
    }
  ]
});
