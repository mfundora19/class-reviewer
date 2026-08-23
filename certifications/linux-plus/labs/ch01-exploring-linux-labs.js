window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      title: "Security Workstation Asset Intake",
      difficulty: 1,
      minutes: 25,
      scenario: "You are helping inventory a Linux workstation before it is assigned to a security support team. Collect a read-only system snapshot, classify the system layers and architecture facts, and prepare a concise handoff without changing the workstation.",
      objectives: [
        "Identify the running kernel release and machine architecture",
        "Read distribution identity, memory, and filesystem summaries",
        "Classify the four parts of a complete Linux system",
        "Interpret kernel version and common architecture names",
        "Produce an accurate asset-intake handoff"
      ],
      objectiveSteps: [[0, 1], [2, 3, 4], [5], [5, 6], [6]],
      steps: [
        {
          do: "Display the current running kernel release for the asset record.",
          command: "uname -r",
          hint: "Use the system-information utility that reports the kernel release, then preserve the complete value exactly as shown.",
          solution: "uname -r",
          expectedOutput: "6.8.0-31-generic",
          expectedOutputDynamic: true,
          check: "A complete running-kernel release appears in the asset record."
        },
        {
          do: "Display the machine hardware name for the asset record.",
          command: "uname -m",
          hint: "Use the same system-information utility, but select the result that identifies the machine architecture rather than the kernel release.",
          solution: "uname -m",
          expectedOutput: "x86_64",
          expectedOutputDynamic: true,
          check: "A machine architecture such as x86_64 or aarch64 appears."
        },
        {
          do: "Display the operating-system identification information and record its name, version, and distribution ID.",
          command: "cat /etc/os-release",
          hint: "Read the standard distribution identity file and locate the fields that distinguish the human-readable name, release identifier, and short ID.",
          solution: "cat /etc/os-release",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The record includes the distribution name, version identifier, and short ID."
        },
        {
          do: "Display available system memory in human-readable format.",
          command: "free -h",
          hint: "Use the memory-reporting utility and choose its readable presentation so the total and available values can be copied into the handoff.",
          solution: "free -h",
          expectedOutput: "              total        used        free      shared  buff/cache   available\nMem:           15Gi       4.1Gi       2.8Gi       512Mi       8.7Gi        10Gi\nSwap:         2.0Gi          0B       2.0Gi",
          expectedOutputDynamic: true,
          check: "The memory table includes total, used, free, and available values."
        },
        {
          do: "Display disk-space usage for mounted filesystems in human-readable format.",
          command: "df -h",
          hint: "Use the filesystem-capacity report and record the columns that show capacity, use, availability, and mount point.",
          solution: "df -h",
          expectedOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p3  120G   38G   76G  34% /\ntmpfs           7.8G     0  7.8G   0% /dev/shm",
          expectedOutputDynamic: true,
          check: "The filesystem table includes size, used, available, use percentage, and mount-point values."
        },
        {
          do: "Complete the reference section of the intake worksheet: classify the Linux kernel, GNU utilities, user interface, and application software; then map `x86_64`, `aarch64`, `s390x`, and `RISC-V` to their architecture descriptions.",
          hint: "Separate the four software layers from the processor families, and use the architecture aliases to distinguish Intel/AMD, ARM, IBM Z, and the open standard.",
          solution: "Linux kernel → hardware interface and resource management. GNU utilities → command-line management programs. User interface → graphical desktop or command-line shell. Application software → desktop or server program. x86_64 → 64-bit Intel/AMD. aarch64 → ARM. s390x → IBM Z. RISC-V → open standard architecture.",
          expectedOutput: "Linux kernel — hardware interface and resource management\nGNU utilities — command-line management programs\nUser interface — graphical desktop or command-line shell\nApplication software — desktop or server program\nx86_64 — 64-bit Intel/AMD\naarch64 — ARM\ns390x — IBM Z\nRISC-V — open standard architecture",
          check: "The worksheet keeps Linux system layers distinct from the architecture-family descriptions."
        },
        {
          do: "Prepare the final intake handoff using the collected snapshot and interpret the supplied kernel version `6.8.12` as major, minor, and revision values.",
          hint: "Combine observed command output with the chapter's version format, and report only facts supported by the snapshot or reference section.",
          solution: "Record the observed kernel release, architecture, distribution, memory, and filesystem summary. For 6.8.12, record major 6, minor 8, and revision 12. Include the four Linux system parts in the handoff.",
          expectedOutput: "Asset intake complete\nKernel version: 6.8.12 (major 6, minor 8, revision 12)\nArchitecture: x86_64 (64-bit Intel/AMD)\nSystem layers: kernel, GNU utilities, user interface, application software\nSnapshot: distribution, memory, and filesystem values recorded",
          expectedOutputDynamic: true,
          check: "The handoff records the system snapshot and interprets the version without adding unsupported host details."
        }
      ],
      tags: ["system-info", "kernel", "architecture", "distribution", "memory", "disk", "asset-inventory"]
    },
    {
      title: "Open-Source Software Compliance Review",
      difficulty: 2,
      minutes: 20,
      scenario: "A security workstation image contains a mixture of kernel code, third-party tools, and commercial utilities. Before the image is shared with another team, classify the software licenses and document the obligations that affect redistribution.",
      objectives: [
        "Distinguish open source, closed source, freeware, and shareware",
        "Differentiate copyleft and permissive license models",
        "Apply the chapter's GPL, LGPL, Apache, and MIT guidance",
        "Explain why a distribution can contain multiple license models"
      ],
      objectiveSteps: [[0], [1], [2], [3, 4]],
      steps: [
        {
          do: "Classify four inventory entries: the Linux kernel, a paid commercial utility, a no-cost closed-source desktop utility, and a thirty-day trial utility.",
          hint: "Separate source availability from price; a program can be free to use without being open source.",
          solution: "Linux kernel: open source. Paid commercial utility: closed source. No-cost closed-source desktop utility: freeware. Thirty-day trial utility: shareware.",
          expectedOutput: "Linux kernel — open source\nPaid commercial utility — closed source\nNo-cost desktop utility — freeware\nThirty-day trial utility — shareware",
          check: "Each inventory entry has the correct software-distribution classification."
        },
        {
          do: "Classify GPL and LGPL as copyleft models and record the distinction stated in the chapter.",
          hint: "Both licenses belong to the same broad model, but their rules for derivative and proprietary work are not identical.",
          solution: "GPL and LGPL are copyleft. GPL modifications must be released publicly under GPL terms. LGPL can be integrated into a proprietary project without releasing the proprietary project's code.",
          expectedOutput: "Copyleft licenses: GPL, LGPL\nGPL: modified source remains under GPL terms\nLGPL: proprietary integration is allowed under the stated model",
          check: "The review distinguishes GPL's same-license obligation from LGPL's integration allowance."
        },
        {
          do: "Classify Apache and MIT as permissive models and record the redistribution guidance for each.",
          hint: "Focus on whether derivative work must retain the same license and on the one notice requirement called out for MIT.",
          solution: "Apache and MIT are permissive. A derivative may use a different license. MIT requires the original copyright notice to remain.",
          expectedOutput: "Permissive licenses: Apache, MIT\nDerivative licensing: a different license is allowed\nMIT reminder: keep the original copyright notice",
          check: "The review identifies both permissive licenses and preserves the MIT notice requirement."
        },
        {
          do: "Explain why the Linux kernel's GPL v2 license does not automatically describe every package in a Linux distribution.",
          hint: "Consider the difference between the kernel itself and the third-party programs bundled beside it by a distribution.",
          solution: "The Linux kernel is GPL v2, but distributions bundle third-party software that can use LGPL, Apache, MIT, closed-source, freeware, or other license models.",
          expectedOutput: "Kernel license: GPL v2\nDistribution conclusion: bundled third-party software may use other license models",
          check: "The explanation separates the kernel license from the licenses of bundled software."
        },
        {
          do: "Prepare a two-line compliance handoff for one modified GPL component and one permissively licensed component.",
          hint: "Write one action for each model, using the obligations you already identified instead of adding legal claims beyond the chapter.",
          solution: "Modified GPL component: release the modified source under GPL terms. Apache/MIT component: preserve required notices and document the chosen redistribution terms.",
          expectedOutput: "GPL-modified component: release modified source under GPL terms.\nApache/MIT component: preserve required notices and document redistribution terms.",
          check: "The handoff gives one chapter-supported action for each license family."
        }
      ],
      tags: ["licensing", "gpl", "lgpl", "apache", "mit", "compliance"]
    },
    {
      title: "Distribution Family Triage and Repository Refresh",
      difficulty: 2,
      minutes: 25,
      scenario: "Three isolated security workstations need routine repository maintenance. Their labels identify them as Ubuntu, Rocky Linux, and openSUSE. Select the correct package-management workflow for each system, then perform a metadata refresh only on the workstation in front of you.",
      objectives: [
        "Match Debian, Red Hat, and SUSE families with their package managers",
        "Select a repository-refresh command appropriate to the current distribution",
        "Distinguish refresh actions from upgrade actions",
        "Document a safe maintenance outcome"
      ],
      objectiveSteps: [[0], [1, 2], [3], [4]],
      steps: [
        {
          do: "Match the three workstation labels to their package managers: Ubuntu, Rocky Linux, and openSUSE.",
          hint: "Use family membership rather than the workstation's desktop appearance: Debian-based, Red Hat-based, and SUSE each use a different manager.",
          solution: "Ubuntu → apt. Rocky Linux → dnf. openSUSE → zypper.",
          expectedOutput: "Ubuntu — apt\nRocky Linux — dnf\nopenSUSE — zypper",
          check: "Each distribution is paired with its chapter-supported package manager."
        },
        {
          do: "Select the repository-metadata refresh action for each labeled workstation without performing an upgrade.",
          hint: "The chapter lists a distinct refresh or update action for each package-management family; do not substitute an upgrade action for a refresh.",
          solution: "Ubuntu/Debian: sudo apt update\nRocky/RHEL/Fedora: sudo dnf check-update\nopenSUSE: sudo zypper refresh",
          expectedOutput: "Ubuntu/Debian — repository metadata refresh selected\nRocky/RHEL/Fedora — update availability check selected\nopenSUSE — repository metadata refresh selected",
          check: "Every workstation has a refresh action rather than a package-upgrade action."
        },
        {
          do: "Run the repository-metadata refresh command for the Debian-based workstation in front of you; do not apply package upgrades.",
          command: "sudo apt update",
          hint: "Use the package manager associated with the Debian family and choose the action that refreshes repository information rather than changing installed packages.",
          solution: "sudo apt update",
          expectedOutput: "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done",
          expectedOutputDynamic: true,
          check: "The Debian-family package manager refreshes repository metadata without applying an upgrade."
        },
        {
          do: "Match the chapter's upgrade action to each package-management family, keeping it separate from the refresh you just performed.",
          hint: "Review the package-manager quick reference and distinguish the action that refreshes information from the action that applies newer packages.",
          solution: "Rocky/RHEL/Fedora: sudo dnf upgrade -y. Ubuntu/Debian: sudo apt upgrade -y or sudo apt dist-upgrade -y. openSUSE: sudo zypper dup.",
          expectedOutput: "Red Hat family — dnf upgrade\nDebian family — apt upgrade or dist-upgrade\nSUSE family — zypper dup",
          check: "The maintenance note keeps upgrade actions distinct from metadata refresh actions."
        },
        {
          do: "Write the final maintenance handoff naming the detected family, selected manager, and the fact that this lab refreshed metadata only.",
          hint: "Use the exact family-to-manager relationship you established, and state only work that was actually completed.",
          solution: "Record a report such as: Family: Debian-based. Manager: apt. Action completed: repository metadata refresh. Package upgrade: not performed in this lab.",
          expectedOutput: "Family: Debian-based\nManager: apt\nCompleted: repository metadata refresh\nNot performed: package upgrade",
          expectedOutputDynamic: true,
          check: "The handoff connects one distribution family, one manager, and the completed non-upgrade action."
        }
      ],
      tags: ["distributions", "apt", "dnf", "zypper", "package-management"]
    },
    {
      title: "Virtualization Deployment Decision",
      difficulty: 2,
      minutes: 20,
      scenario: "A team wants an isolated Linux environment for safe security-tool testing. Review a supplied host profile against the chapter's virtualization baseline, distinguish local virtualization products from cloud providers, and recommend a deployment approach without creating a virtual machine.",
      objectives: [
        "Evaluate architecture, memory, and disk requirements for a local virtual environment",
        "Differentiate VirtualBox, Hyper-V, and QEMU",
        "Recognize when a cloud provider is the appropriate alternative",
        "Document a justified deployment recommendation"
      ],
      objectiveSteps: [[0, 1], [2], [3], [4]],
      steps: [
        {
          do: "Record the chapter's local virtualization baseline: x86_64, a 2 GHz dual-core CPU, 8 GB of RAM, and 70 GB of disk space.",
          hint: "Capture every stated baseline value before comparing a host; do not omit the architecture requirement.",
          solution: "Required architecture: x86_64. Required CPU: 2 GHz dual-core. Required memory: 8 GB. Required disk: 70 GB.",
          expectedOutput: "Architecture: x86_64\nCPU: 2 GHz dual-core\nMemory: 8 GB\nDisk: 70 GB",
          check: "The worksheet includes all four stated virtualization requirements."
        },
        {
          do: "Compare the supplied host profile `x86_64, 2.4 GHz dual-core, 16 GB RAM, 120 GB disk` with that baseline.",
          hint: "Compare each requirement independently; the recommendation should not be based on memory alone.",
          solution: "The host meets the architecture, CPU, memory, and disk requirements for the stated local virtualization baseline.",
          expectedOutput: "Architecture: meets\nCPU: meets\nMemory: meets\nDisk: meets\nLocal virtualization: viable",
          check: "The supplied profile passes all four stated baseline checks."
        },
        {
          do: "Match each local technology to its chapter description: Oracle VirtualBox, Microsoft Hyper-V, and QEMU.",
          hint: "Distinguish a cross-platform open-source VM manager, a Windows-specific product, and an emulator that uses dynamic binary translation.",
          solution: "Oracle VirtualBox: open-source cross-platform VM manager. Microsoft Hyper-V: closed-source Windows virtualization product for Windows 11 Pro or Enterprise. QEMU: open-source CPU emulator using dynamic binary translation.",
          expectedOutput: "Oracle VirtualBox — cross-platform VM manager\nMicrosoft Hyper-V — Windows 11 Pro/Enterprise virtualization product\nQEMU — CPU emulator using dynamic binary translation",
          check: "Each product is paired with its distinguishing chapter-supported characteristic."
        },
        {
          do: "Choose a cloud alternative for a second host profile that has only 4 GB of RAM and 40 GB of disk space.",
          hint: "When the local host fails the stated baseline, choose from the cloud providers listed in the chapter instead of claiming the requirements are met.",
          solution: "Recommend a cloud provider such as AWS, Microsoft Azure, or DigitalOcean because the host does not meet the stated 8 GB memory and 70 GB disk baseline.",
          expectedOutput: "Local host result: insufficient memory and disk\nRecommendation: use AWS, Microsoft Azure, or DigitalOcean",
          check: "The recommendation explains why the underpowered host should use a cloud alternative."
        },
        {
          do: "Write a final deployment handoff for the first host profile, including the chosen local approach and its reason.",
          hint: "Tie the recommendation directly to the capacity comparison and select one documented local technology without inventing an installation procedure.",
          solution: "Record: The x86_64 host meets the stated CPU, memory, and disk baseline. Recommend Oracle VirtualBox for a cross-platform local virtual-machine lab.",
          expectedOutput: "Recommendation: Oracle VirtualBox\nReason: host meets the x86_64, CPU, memory, and disk baseline for local virtualization.",
          check: "The handoff gives one documented local approach and a capacity-based reason."
        }
      ],
      tags: ["virtualization", "cloud", "qemu", "virtualbox", "hyper-v"]
    },
    {
      title: "TTY Recovery Drill for a Security Workstation",
      difficulty: 1,
      minutes: 15,
      scenario: "During a basic incident review, a workstation's graphical desktop becomes unresponsive while the machine remains powered on. Practice the chapter's text-console recovery path so you can retain command-line access and give a teammate a clear recovery status.",
      objectives: [
        "Distinguish a graphical desktop from a text-only virtual console",
        "Switch to a TTY and recognize the login prompt",
        "Return to the graphical desktop using the appropriate function-key path",
        "Record a concise recovery outcome"
      ],
      objectiveSteps: [[0, 2], [1], [3], [4]],
      steps: [
        {
          do: "Identify the two terminal-access methods available on the workstation: a terminal application in the graphical desktop and a text-only virtual console.",
          hint: "One method lives inside the desktop session; the other is a separate numbered console outside the graphical environment.",
          solution: "Graphical desktop: open a terminal application. Text-only access: switch to a virtual console (TTY).",
          expectedOutput: "Graphical path — terminal application\nText-only path — virtual console (TTY)",
          check: "The two terminal-access methods are distinguished by their operating context."
        },
        {
          do: "Switch from the graphical desktop to the numbered text console identified in the chapter.",
          hint: "Use the Control, Alt, and function-key sequence for a numbered console; this is a keyboard action rather than a shell command.",
          solution: "Press Ctrl+Alt+F2 to open tty2. Some distributions also use Ctrl+Alt+F3 for another text console.",
          expectedOutput: "Ubuntu 24.04.1 LTS labhost tty2\nlabhost login:",
          expectedOutputDynamic: true,
          check: "A text-only login prompt for a numbered TTY appears."
        },
        {
          do: "Sign in with the training account if the environment requests credentials, then note why this console remains useful during a GUI problem.",
          hint: "Focus on the operational benefit of an independent text-only session rather than diagnosing the graphical issue itself.",
          solution: "Sign in when prompted, then record: the TTY provides command-line access when the graphical desktop is unavailable.",
          expectedOutput: "student@labhost:~$\nRecovery note: text-only access remains available while the graphical desktop is unavailable.",
          expectedOutputDynamic: true,
          check: "The recovery note explains the purpose of the TTY without claiming the GUI issue was fixed."
        },
        {
          do: "Return to the graphical desktop using the display-manager shortcut appropriate to the workstation.",
          hint: "The return key can vary by distribution or display manager, so use one of the return paths documented in the chapter.",
          solution: "Press Ctrl+Alt+F1, Ctrl+Alt+F7, or Ctrl+Alt+F2 as appropriate for the distribution and display manager to return to the graphical desktop.",
          expectedOutput: "Graphical desktop restored.",
          expectedOutputDynamic: true,
          check: "The graphical session returns after leaving the text console."
        },
        {
          do: "Prepare the final recovery handoff stating which text console was reached and whether the graphical session returned.",
          hint: "Report the observable result only: console number, successful text access, and desktop state after the return action.",
          solution: "Record: Reached tty2 through the virtual-console shortcut, confirmed text-only login access, and returned to the graphical desktop.",
          expectedOutput: "Recovery status\nTTY reached: tty2\nText-only access: confirmed\nGraphical desktop: restored",
          expectedOutputDynamic: true,
          check: "The handoff records the console reached, text-access result, and graphical-session outcome."
        }
      ],
      tags: ["tty", "terminal", "recovery", "incident-response"]
    }
  ]
});
