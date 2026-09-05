window.ReviewApp.content.register({
  type: "questions",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      q: "A server reports its kernel version as 6.8.12. Which number represents the minor revision?",
      type: "mcq",
      options: ["8", "6", "12", "6.8", "6.8.12"],
      answer: 0,
      explain: "Linux kernel versions follow a major.minor.revision format. In 6.8.12, 6 is the major number, 8 is the minor number, and 12 is the revision number.",
      tags: ["kernel", "versions"]
    },
    {
      q: "A developer modifies the Linux kernel source code for a commercial product. Under which license must they release their modified source code to the public?",
      type: "mcq",
      options: ["MIT", "GPL", "Apache", "LGPL", "MPL"],
      answer: 1,
      explain: "The GNU General Public License (GPL) requires that any changes made to the source code be released to the public under the same GPL license. MIT and Apache are permissive licenses without this requirement, and LGPL allows integration without public release.",
      tags: ["licensing", "gpl"]
    },
    {
      q: "Which of the following are considered permissive open source licenses? (Choose two.)",
      type: "multi",
      options: ["MPL 2.0", "MIT License", "GPL v3", "Apache 2.0", "LGPL v2.1"],
      answer: [1, 3],
      explain: "Permissive licenses such as Apache and MIT allow redistribution of derivative work under a different license or with no license at all. GPL and LGPL are copyleft licenses, which require derivative work to inherit the parent license terms.",
      tags: ["licensing", "permissive"]
    },
    {
      q: "Which license governs the Linux kernel itself? (Select one.)",
      type: "multi",
      options: ["MIT License", "MPL 2.0", "GPL version 2", "Apache License 2.0", "LGPL v3"],
      answer: [2],
      explain: "The Linux kernel is licensed under GPL version 2. The other licenses use different permissive or copyleft terms and do not govern the kernel itself.",
      tags: ["licensing", "kernel"]
    },
    {
      q: "The Linux kernel itself is licensed under GPL version 2, but not all Linux distributions use this same license for all included software.",
      type: "tf",
      answer: true,
      explain: "True. While the Linux kernel is under GPL v2, distributions bundle third-party software that may be licensed under Apache, MIT, or other models, so the entire distro does not necessarily use GPL v2.",
      tags: ["licensing", "kernel"]
    },
    {
      q: "On an Ubuntu system, the command to refresh the package index before installing updates is `sudo ____ update`.",
      type: "fill",
      answer: "apt",
      explain: "Ubuntu uses the apt package manager. Running `sudo apt update` refreshes the local package index with the latest changes from the repositories before upgrades are applied.",
      tags: ["ubuntu", "apt", "package-management"]
    },
    {
      q: "Which virtualization product uses dynamic binary translation to emulate a computer's CPU?",
      type: "mcq",
      options: ["Oracle VirtualBox", "Microsoft Hyper-V", "QEMU", "VMware ESXi", "KVM"],
      answer: 2,
      explain: "QEMU (Quick Emulator) is unique among common hypervisors in that it emulates a computer's CPU using dynamic binary translation. VirtualBox and Hyper-V use hardware-assisted virtualization rather than CPU emulation.",
      tags: ["virtualization", "qemu"]
    },
    {
      q: "Which utility allows administrators to control many system services from a single interface on openSUSE?",
      type: "mcq",
      options: ["dnf", "zypper", "apt", "YaST", "pacman"],
      answer: 3,
      explain: "Yet another Setup Tool (YaST) is openSUSE's comprehensive command-center utility for managing system services, network settings, and software. dnf and apt are package managers for other distributions, while zypper is openSUSE's command-line package manager.",
      tags: ["opensuse", "yast"]
    },
    {
      q: "Which CPU architectures are explicitly stressed for the CompTIA Linux+ exam? (Choose all that apply.)",
      type: "multi",
      options: ["Intel/AMD x86 and x86_64", "SPARC (sparc64) servers", "ARM (aarch64) SBCs", "IBM Z mainframes (s390x)", "RISC-V (open standard)"],
      answer: [0, 2, 3, 4],
      explain: "The Linux+ exam stresses Intel/AMD x86 and x86_64, AMD64, ARM (aarch64), IBM Z (s390x), and RISC-V. SPARC is not mentioned in the exam objectives.",
      tags: ["hardware", "architecture"]
    },
    {
      q: "CentOS Stream is currently an exact duplicate of the latest RHEL version, just as the original CentOS was.",
      type: "tf",
      answer: false,
      explain: "False. While the original CentOS was nearly an exact duplicate of RHEL, CentOS Stream is a rolling development distribution and no longer matches the current RHEL version exactly. Rocky Linux was created to fill the role of being an exact RHEL duplicate.",
      tags: ["rhel", "centos", "distributions"]
    },
    {
      q: "The open standard CPU architecture that any manufacturer can implement without licensing fees is ____. ",
      type: "fill",
      answer: "RISC-V",
      explain: "RISC-V (Reduced Instruction Set Computing, version 5) is an open standard architecture, unlike proprietary architectures such as x86_64 or ARM, which require licensing.",
      tags: ["hardware", "architecture", "risc-v"]
    },
    {
      q: "A technician working at a graphical Ubuntu desktop needs to access a text-only terminal to run commands. Which key combination should they press?",
      type: "mcq",
      options: ["Ctrl + Alt + F1", "Ctrl + Alt + F7", "Ctrl + Alt + Delete", "Alt + F4", "Ctrl + Alt + F2"],
      answer: 4,
      explain: "Pressing Ctrl+Alt+F2 (or F3) switches to a virtual console (TTY) such as tty2, providing a text-only terminal. Ctrl+Alt+F1 or F7 typically returns to the graphical desktop, while Ctrl+Alt+Delete may reboot the system.",
      tags: ["terminal", "tty", "ui"]
    },
    {
      q: "Which statement best describes the fundamental difference between copyleft and permissive open source licenses?",
      type: "mcq",
      options: [
        "Copyleft licenses require derivative works to retain the same license, while permissive licenses generally do not.",
        "Copyleft licenses determine whether software may be used only for commercial purposes.",
        "Copyleft licenses prohibit users from modifying software, while permissive licenses encourage modification.",
        "Copyleft licenses are issued only by GNU projects, while permissive licenses are issued only by Apache projects.",
        "Copyleft licenses permit private changes but never allow redistribution of the resulting software."
      ],
      answer: 0,
      explain: "Copyleft licenses such as GPL require that any derivative work be released under the same license terms, ensuring the code remains open. Permissive licenses such as Apache and MIT impose no such restriction, allowing derivatives to use different licenses or remain closed source.",
      tags: ["licensing", "copyleft"]
    },
    {
      q: "Which of the following are core parts that make up a complete Linux system? (Choose all that apply.)",
      type: "multi",
      options: ["Linux kernel", "GNU utilities", "User interface", "User applications", "BIOS firmware"],
      answer: [0, 1, 2, 3],
      explain: "A complete Linux system consists of the Linux kernel, GNU utilities, a user interface (graphical or command-line), and application software. BIOS firmware is hardware-specific and not part of the Linux system itself.",
      tags: ["linux-concepts", "components"]
    },
    {
      q: "On a Rocky Linux system, the command `sudo ____ check-update` is used to verify whether updated packages are available.",
      type: "fill",
      answer: "dnf",
      explain: "Rocky Linux, like RHEL and Fedora, uses the dnf package manager. The `sudo dnf check-update` command queries repositories for available updates before they are installed with `sudo dnf upgrade`.",
      tags: ["rocky-linux", "dnf", "package-management"]
    },
    {
      q: "An organization wants to deploy Linux virtual machines but lacks local hardware with sufficient resources. Which of the following is a valid cloud provider for running Linux VMs?",
      type: "mcq",
      options: [
        "Oracle VirtualBox, a desktop hypervisor that runs VMs on the local workstation.",
        "DigitalOcean, a hosted cloud platform that provisions Linux VMs on remote infrastructure.",
        "Microsoft Hyper-V, a host hypervisor that runs VMs on the organization's own servers.",
        "QEMU, a processor emulator that runs VMs on the local computer.",
        "KVM, a local hypervisor that runs virtual machines on existing hardware."
      ],
      answer: 1,
      explain: "DigitalOcean is a cloud service provider that offers Linux virtual machines. Oracle VirtualBox, Microsoft Hyper-V, and QEMU are local hypervisors or emulators that run on existing hardware, not cloud providers.",
      tags: ["cloud", "virtualization"]
    },
    {
      q: "Match each ls option with its description.",
      type: "command_match",
      command: "ls",
      pairs: [
        { option: "-a", description: "Show all entries, including hidden files" },
        { option: "-l", description: "Use long listing format with file details" },
        { option: "-h", description: "Show human-readable file sizes" },
        { option: "-R", description: "List subdirectories recursively" },
        { option: "-t", description: "Sort by modification time, newest first" }
      ],
      explain: "These options control which entries ls displays and how the output is formatted: -a reveals hidden files, -l adds detail, -h makes sizes readable, -R recurses into subdirectories, and -t sorts by modification time.",
      tags: ["ls", "options"]
    },
    {
      q: "Match each grep option with its description.",
      type: "command_match",
      command: "grep",
      pairs: [
        { option: "-i", description: "Ignore case when matching" },
        { option: "-r", description: "Search directories recursively" },
        { option: "-n", description: "Print line numbers with matches" },
        { option: "-v", description: "Show only lines that do NOT match" }
      ],
      explain: "grep options refine pattern matching: -i makes it case-insensitive, -r descends into directories, -n shows where matches occur, and -v inverts the match.",
      tags: ["grep", "options"]
    },
    {
      q: "Match each Linux system component with its role.",
      type: "match",
      context: "Linux system components",
      pairs: [
        { item: "Linux kernel", match: "Manages CPU, memory, and devices" },
        { item: "GNU utilities", match: "Provides command-line management programs" },
        { item: "User interface", match: "Offers a graphical desktop or command-line shell" },
        { item: "Application software", match: "Runs desktop and server programs" }
      ],
      explain: "These four parts make up a complete Linux system, each with a distinct role: the kernel manages hardware resources, GNU utilities supply command-line tools, the user interface presents the system to the user, and applications deliver functionality.",
      tags: ["linux-concepts", "components"]
    },
    {
      q: "Which component of a Linux system manages communication between software and the CPU, memory, and devices?",
      type: "mcq",
      options: ["The GNU utilities", "A desktop environment", "The kernel", "Web server software", "The boot loader"],
      answer: 2,
      explain: "The kernel is the core of the operating system: it interfaces between software and hardware, managing CPU usage, memory, and devices.",
      tags: ["kernel", "components"]
    },
    {
      q: "Which part of a Linux system supplies the command-line programs used to manage files and programs?",
      type: "mcq",
      options: ["The kernel", "Application software", "The BIOS", "GNU utilities", "A display manager"],
      answer: 3,
      explain: "The GNU utilities are the command-line programs that provide file and program management on a Linux system, layered on top of the kernel.",
      tags: ["gnu", "components"]
    },
    {
      q: "What is the correct format of a Linux kernel version number?",
      type: "mcq",
      options: ["major.revision.minor", "minor.major.revision", "major.patch.build", "release.major.minor", "major.minor.revision"],
      answer: 4,
      explain: "Kernel versions are written major.minor.revision, such as 5.18.16: the major version, then the minor revision, then the current release revision.",
      tags: ["kernel", "versions"]
    },
    {
      q: "In kernel version 4.18.0, which number is the minor number?",
      type: "mcq",
      options: ["18", "4", "0", "4.18", "18.0"],
      answer: 0,
      explain: "Reading major.minor.revision left to right, 4 is the major number, 18 is the minor number, and 0 is the revision.",
      tags: ["kernel", "versions"]
    },
    {
      q: "A server runs kernel 6.1.1. What does the final 1 identify?",
      type: "mcq",
      options: ["The major version", "The current release revision", "The minor revision", "The distribution patch level", "The kernel ABI version"],
      answer: 1,
      explain: "In the major.minor.revision scheme, the third number is the current release revision within that major.minor line.",
      tags: ["kernel", "versions"]
    },
    {
      q: "The x86_64 architecture describes which class of CPUs?",
      type: "mcq",
      options: ["32-bit Intel/AMD desktop CPUs", "ARM-based embedded boards", "64-bit Intel/AMD desktop CPUs", "IBM mainframe processors", "Open-standard RISC chips"],
      answer: 2,
      explain: "x86_64 refers to 64-bit Intel/AMD desktop and laptop CPUs; x86 refers to their 32-bit counterparts.",
      tags: ["hardware", "architecture"]
    },
    {
      q: "Which architecture identifier applies to small-scale systems such as the Raspberry Pi?",
      type: "mcq",
      options: ["s390x", "x86", "sparc64", "aarch64", "mips"],
      answer: 3,
      explain: "aarch64 is the ARM 64-bit identifier, and ARM is the architecture used by small-scale systems like the Raspberry Pi.",
      tags: ["hardware", "arm"]
    },
    {
      q: "Which architecture identifier targets IBM mainframes and minicomputers?",
      type: "mcq",
      options: ["aarch64", "ppc64", "x86_64", "armv7", "s390x"],
      answer: 4,
      explain: "s390x is the identifier for IBM Z, the architecture of IBM mainframes and minicomputers.",
      tags: ["hardware", "ibm"]
    },
    {
      q: "Which CPU architecture can any manufacturer implement because it is an open standard?",
      type: "mcq",
      options: ["RISC-V", "ARM", "IBM Z", "x86_64", "AMD64"],
      answer: 0,
      explain: "RISC-V is an open standard architecture, so any manufacturer can implement it without licensing restrictions.",
      tags: ["hardware", "risc-v"]
    },
    {
      q: "Which term describes closed-source software distributed at no cost?",
      type: "mcq",
      options: ["Shareware", "Freeware", "Copyleft", "Open source", "Public domain"],
      answer: 1,
      explain: "Freeware is closed-source software that is free of charge. Its source code is not available, distinguishing it from open source software.",
      tags: ["licensing", "freeware"]
    },
    {
      q: "Which licensing model is initially free but requires payment after a trial period?",
      type: "mcq",
      options: ["Freeware", "Open source", "Shareware", "Copyleft", "Permissive"],
      answer: 2,
      explain: "Shareware is closed-source software offered free for a trial period, after which payment is required.",
      tags: ["licensing", "shareware"]
    },
    {
      q: "What is the defining characteristic of open source software?",
      type: "mcq",
      options: ["It is always free of charge", "It is developed only by volunteers", "It never includes proprietary components", "Its source code is publicly available", "It cannot be used commercially"],
      answer: 3,
      explain: "Open source software makes its source code publicly available for use and modification. It is typically free, but source availability is the defining trait, not cost.",
      tags: ["licensing", "open-source"]
    },
    {
      q: "What obligation does a copyleft license place on derivative works?",
      type: "mcq",
      options: ["They must be released as freeware", "They must avoid commercial use", "They must remain private", "They must be donated to the original project", "They must use the same license"],
      answer: 4,
      explain: "Copyleft licenses require derivative works to be distributed under the same license, keeping the code open as it is modified and redistributed.",
      tags: ["licensing", "copyleft"]
    },
    {
      q: "Which permissive license allows a derivative work to use a different license entirely?",
      type: "mcq",
      options: ["Apache", "LGPL", "GPL", "BSD-3", "MPL"],
      answer: 0,
      explain: "The Apache license is permissive: a derivative can use a different license. GPL and LGPL are copyleft licenses with redistribution requirements.",
      tags: ["licensing", "apache", "permissive"]
    },
    {
      q: "Under the MIT license, what must you do when redistributing the code?",
      type: "mcq",
      options: ["Release your changes publicly", "Keep the original copyright notice", "License derivatives under MIT", "Contribute changes upstream", "Charge nothing for the software"],
      answer: 1,
      explain: "MIT is permissive: you can do almost anything with the code, but you must keep the original copyright notice.",
      tags: ["licensing", "mit", "permissive"]
    },
    {
      q: "What distinguishes the LGPL from the GPL?",
      type: "mcq",
      options: ["LGPL forbids commercial use", "LGPL applies only to libraries on IBM Z systems", "LGPL permits proprietary use without releasing changes", "LGPL requires payment after a trial", "LGPL is a closed-source license"],
      answer: 2,
      explain: "LGPL (Lesser GPL) permits integrating the code into proprietary projects without releasing your own changes, which the GPL does not allow.",
      tags: ["licensing", "lgpl", "gpl"]
    },
    {
      q: "Which characteristic defines RHEL?",
      type: "mcq",
      options: ["Community rebuild of Fedora", "Rolling development release", "Debian-based desktop distribution", "Commercial with paid license and support", "Free exact clone of CentOS Stream"],
      answer: 3,
      explain: "Red Hat Enterprise Linux is a commercial, enterprise-focused distribution that requires a license and includes full support.",
      tags: ["distributions", "rhel"]
    },
    {
      q: "What kind of release is CentOS Stream today?",
      type: "mcq",
      options: ["An exact duplicate of the latest RHEL", "A long-term support fork of Ubuntu", "A Debian-based community release", "A desktop-only distribution", "A rolling development distribution"],
      answer: 4,
      explain: "CentOS Stream is a rolling development distribution and is no longer an exact duplicate of the current RHEL version.",
      tags: ["distributions", "centos", "rhel"]
    },
    {
      q: "Which distribution was created by the original CentOS developers as an exact duplicate of the latest RHEL?",
      type: "mcq",
      options: ["Rocky Linux", "Fedora", "AlmaLinux", "CentOS Stream", "Oracle Linux"],
      answer: 0,
      explain: "Rocky Linux is the community rebuild created to be an exact duplicate of the latest RHEL release.",
      tags: ["distributions", "rocky-linux"]
    },
    {
      q: "Which distribution acts as Red Hat's testing ground and is desktop oriented?",
      type: "mcq",
      options: ["RHEL", "Fedora", "Debian", "openSUSE Leap", "Rocky Linux"],
      answer: 1,
      explain: "Fedora is where new Red Hat technology is tested before it reaches enterprise releases, and it is desktop oriented.",
      tags: ["distributions", "fedora"]
    },
    {
      q: "Ubuntu is managed by which organization?",
      type: "mcq",
      options: ["Red Hat", "SUSE", "Canonical", "Debian Project", "The Linux Foundation"],
      answer: 2,
      explain: "Canonical manages Ubuntu, which is based on Debian.",
      tags: ["distributions", "ubuntu"]
    },
    {
      q: "How does Ubuntu handle administrative privileges by default?",
      type: "mcq",
      options: ["Direct root logins are enabled", "It disables all administration", "It requires switching to a TTY", "It uses sudo instead of root login", "It uses an admin web panel"],
      answer: 3,
      explain: "Ubuntu defaults to using sudo for administrative tasks instead of allowing direct root logins.",
      tags: ["ubuntu", "sudo"]
    },
    {
      q: "What is openSUSE Leap?",
      type: "mcq",
      options: ["The rolling development release of SUSE", "The SUSE container platform", "A Red Hat certification program", "A Debian derivative for servers", "The stable release of openSUSE"],
      answer: 4,
      explain: "openSUSE Leap is the stable release of openSUSE, featuring the YaST management tool and the zypper package manager.",
      tags: ["opensuse", "distributions"]
    },
    {
      q: "Which package format is used by Red Hat-based distributions?",
      type: "mcq",
      options: ["RPM", "dpkg", "PKG", "APPX", "TGZ"],
      answer: 0,
      explain: "Red Hat-based distributions such as RHEL, Fedora, and Rocky Linux use the RPM package format, managed with dnf.",
      tags: ["distributions", "rpm", "package-management"]
    },
    {
      q: "Which package ecosystem underlies Debian-based distributions?",
      type: "mcq",
      options: ["RPM", "dpkg", "Zypp", "Snap-only", "Ports"],
      answer: 1,
      explain: "Debian-based distributions such as Ubuntu use the dpkg package ecosystem, managed day-to-day with apt.",
      tags: ["distributions", "dpkg", "package-management"]
    },
    {
      q: "What does `sudo dnf check-update` do?",
      type: "mcq",
      options: [        "Installs every pending package update",
        "Downgrades to the previous version",
        "Checks if updated packages are available",
        "Rebuilds the local RPM database",
        "Lists licenses of installed packages"],
      answer: 2,
      explain: "On RHEL-family systems, `sudo dnf check-update` queries the repositories to verify whether updated packages are available; `sudo dnf upgrade` then applies them.",
      tags: ["dnf", "package-management"]
    },
    {
      q: "What does `sudo apt update` do on Ubuntu?",
      type: "mcq",
      options: ["Installs security patches only", "Removes unused packages", "Upgrades the release", "Refreshes the local package index", "Locks package versions"],
      answer: 3,
      explain: "`sudo apt update` refreshes the local package index with the latest repository changes; `sudo apt upgrade -y` then installs the available upgrades.",
      tags: ["apt", "ubuntu", "package-management"]
    },
    {
      q: "What does `sudo zypper dup` do on openSUSE?",
      type: "mcq",
      options: ["Duplicates the system image", "Verifies package signatures", "Downloads source packages", "Locks repository priorities", "Performs a distribution upgrade"],
      answer: 4,
      explain: "`sudo zypper dup` performs the distribution upgrade on openSUSE, typically after `sudo zypper refresh` updates the repository metadata.",
      tags: ["zypper", "opensuse"]
    },
    {
      q: "Which Windows 11 editions include Microsoft Hyper-V support?",
      type: "mcq",
      options: ["Pro and Enterprise", "Home and Pro", "Home and Enterprise", "Home only", "All editions including Home"],
      answer: 0,
      explain: "Hyper-V requires Windows 11 Pro or Enterprise; the Home edition does not support it.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      q: "Which virtualization product is an open source, cross-platform VM manager?",
      type: "mcq",
      options: ["Microsoft Hyper-V", "Oracle VirtualBox", "QEMU", "VMware Workstation", "Windows Sandbox"],
      answer: 1,
      explain: "Oracle VirtualBox is the open source hypervisor that runs across platforms, making it a common choice for hosting Linux distro VMs on a desktop.",
      tags: ["virtualization", "virtualbox"]
    },
    {
      q: "What is the minimum RAM recommended for a virtualization host?",
      type: "mcq",
      options: ["4 GB", "16 GB", "8 GB", "32 GB", "2 GB"],
      answer: 2,
      explain: "The virtualization hardware minimums are 8 GB of RAM, 70 GB of disk, and an x86_64 2 GHz dual-core CPU.",
      tags: ["virtualization", "hardware"]
    },
    {
      q: "What is the minimum disk capacity for a virtualization host?",
      type: "mcq",
      options: ["32 GB", "50 GB", "64 GB", "70 GB", "128 GB"],
      answer: 3,
      explain: "The recommended minimum disk space for a virtualization host is 70 GB.",
      tags: ["virtualization", "hardware"]
    },
    {
      q: "What CPU minimum applies to a virtualization host?",
      type: "mcq",
      options: ["x86 1 GHz single-core", "IBM Z 2 GHz single-core", "ARM 1.5 GHz quad-core", "x86_64 3 GHz octa-core", "x86_64 2 GHz dual-core"],
      answer: 4,
      explain: "The virtualization minimum is an x86_64 CPU running at 2 GHz with at least two cores.",
      tags: ["virtualization", "hardware"]
    },
    {
      q: "Which of the following is a cloud provider for running Linux VMs?",
      type: "mcq",
      options: ["AWS", "Hyper-V", "QEMU", "VirtualBox", "YaST"],
      answer: 0,
      explain: "Amazon Web Services (AWS) is a cloud provider that runs Linux VMs on remote infrastructure, alongside Microsoft Azure and DigitalOcean.",
      tags: ["cloud", "virtualization"]
    },
    {
      q: "Which virtualization product would be unavailable on a Windows 11 Home workstation?",
      type: "mcq",
      options: ["QEMU", "Microsoft Hyper-V", "Oracle VirtualBox", "A cloud provider's VM console", "All of them run on Home"],
      answer: 1,
      explain: "Hyper-V requires Windows 11 Pro or Enterprise, so a Home-edition workstation cannot run it. VirtualBox and QEMU are not restricted by edition.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      q: "RISC-V is a proprietary architecture that requires a license from a single vendor.",
      type: "tf",
      answer: false,
      explain: "False. RISC-V is an open standard architecture that any manufacturer can implement.",
      tags: ["hardware", "risc-v"]
    },
    {
      q: "The Linux kernel is closed source software.",
      type: "tf",
      answer: false,
      explain: "False. The Linux kernel is open source, licensed under GPL version 2.",
      tags: ["licensing", "kernel"]
    },
    {
      q: "Ubuntu defaults to direct root logins for administrative tasks.",
      type: "tf",
      answer: false,
      explain: "False. Ubuntu uses sudo for administrative privileges instead of allowing direct root logins by default.",
      tags: ["ubuntu", "sudo"]
    },
    {
      q: "Fedora serves as a testing ground for new Red Hat technology.",
      type: "tf",
      answer: true,
      explain: "True. Fedora is where Red Hat tests new technology, and it is desktop oriented.",
      tags: ["distributions", "fedora"]
    },
    {
      q: "openSUSE Leap is the rolling development release of SUSE.",
      type: "tf",
      answer: false,
      explain: "False. openSUSE Leap is the stable release of openSUSE.",
      tags: ["opensuse", "distributions"]
    },
    {
      q: "Hyper-V is available on Windows 11 Home.",
      type: "tf",
      answer: false,
      explain: "False. Hyper-V requires Windows 11 Pro or Enterprise; the Home edition does not support it.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      q: "QEMU uses dynamic binary translation to emulate a CPU.",
      type: "tf",
      answer: true,
      explain: "True. QEMU (Quick Emulator) emulates a computer's CPU using dynamic binary translation.",
      tags: ["virtualization", "qemu"]
    },
    {
      q: "Pressing Ctrl+Alt+F2 is one way to reach a text-only virtual console on most distributions.",
      type: "tf",
      answer: true,
      explain: "True. Ctrl+Alt+F2 (or F3) switches to a text-only virtual console (TTY) from a graphical desktop.",
      tags: ["terminal", "tty"]
    },
    {
      q: "The Debian package management ecosystem is known as ____.",
      type: "fill",
      answer: "dpkg",
      explain: "Debian-based distributions use the dpkg package ecosystem, which apt manages at a higher level.",
      tags: ["distributions", "dpkg"]
    },
    {
      q: "The package format used by Red Hat-based distributions is known as ____.",
      type: "fill",
      answer: "RPM",
      explain: "Red Hat-based distributions package software as RPM files, managed with dnf.",
      tags: ["distributions", "rpm"]
    },
    {
      q: "The SUSE command-line package manager is ____.",
      type: "fill",
      answer: "zypper",
      explain: "zypper manages packages on SUSE distributions, with commands such as `zypper refresh` and `zypper dup`.",
      tags: ["suse", "zypper"]
    },
    {
      q: "The openSUSE central system management tool is ____.",
      type: "fill",
      answer: "YaST",
      explain: "YaST (Yet another Setup Tool) controls many system services from one interface on openSUSE.",
      tags: ["opensuse", "yast"]
    },
    {
      q: "On Ubuntu, the command `sudo apt ____ -y` applies the available package upgrades without prompting.",
      type: "fill",
      answer: "upgrade",
      explain: "`sudo apt upgrade -y` installs available upgrades; the -y flag automatically confirms prompts.",
      tags: ["apt", "ubuntu"]
    },
    {
      q: "To reach a text-only virtual console from a graphical desktop, press Ctrl+Alt+____.",
      type: "fill",
      answer: "F2",
      accepts: ["F3"],
      explain: "Ctrl+Alt+F2 (or F3) switches to a text-only virtual console; Ctrl+Alt+F1, F7, or F2 returns to the graphical desktop depending on the distribution.",
      tags: ["terminal", "tty"]
    },
    {
      q: "Which licenses are copyleft licenses? (Choose two.)",
      type: "multi",
      options: ["Apache", "GPL", "MIT", "LGPL", "Shareware"],
      answer: [1, 3],
      explain: "GPL and LGPL are copyleft licenses requiring derivative works to inherit the license terms. Apache and MIT are permissive, and shareware is not an open source license at all.",
      tags: ["licensing", "copyleft"]
    },
    {
      q: "Which licenses are permissive licenses? (Choose two.)",
      type: "multi",
      options: ["MIT", "GPL", "Apache", "LGPL", "Closed source"],
      answer: [0, 2],
      explain: "MIT and Apache are permissive licenses with no same-license requirement on derivatives. GPL and LGPL are copyleft.",
      tags: ["licensing", "permissive"]
    },
    {
      q: "Which distributions belong to the Red Hat family? (Choose three.)",
      type: "multi",
      options: ["RHEL", "Fedora", "Rocky Linux", "Ubuntu Server", "Debian"],
      answer: [0, 1, 2],
      explain: "RHEL, Fedora, and Rocky Linux are Red Hat-based RPM distributions. Ubuntu is Debian-based, and openSUSE belongs to the SUSE family.",
      tags: ["distributions", "red-hat"]
    },
    {
      q: "Which distributions are Debian-based? (Choose two.)",
      type: "multi",
      options: ["Fedora", "Ubuntu", "openSUSE Leap", "Debian", "Rocky Linux"],
      answer: [1, 3],
      explain: "Ubuntu is based on Debian, and Debian is the base distribution itself. Fedora and Rocky Linux are Red Hat-based; openSUSE Leap is SUSE.",
      tags: ["distributions", "debian"]
    },
    {
      q: "Which of the following are package manager commands? (Choose three.)",
      type: "multi",
      options: ["dnf", "apt", "zypper", "YaST", "RPM format"],
      answer: [0, 1, 2],
      explain: "dnf, apt, and zypper are package manager commands for the Red Hat, Debian, and SUSE families. YaST is a system management tool, and RPM is a package format, not a package manager command.",
      tags: ["package-management"]
    },
    {
      q: "Which are cloud providers for running Linux VMs? (Choose three.)",
      type: "multi",
      options: ["AWS", "Microsoft Azure", "DigitalOcean", "Oracle VirtualBox", "KVM"],
      answer: [0, 1, 2],
      explain: "AWS, Microsoft Azure, and DigitalOcean are cloud providers. VirtualBox and Hyper-V are local hypervisors that run on your own hardware.",
      tags: ["cloud", "virtualization"]
    },
    {
      q: "Which are local virtualization products? (Choose three.)",
      type: "multi",
      options: ["VirtualBox", "Hyper-V", "QEMU", "AWS", "DigitalOcean"],
      answer: [0, 1, 2],
      explain: "VirtualBox, Hyper-V, and QEMU run virtual machines on local hardware. AWS and DigitalOcean run VMs in the cloud.",
      tags: ["virtualization"]
    },
    {
      q: "Which statements about Microsoft Hyper-V are correct? (Choose two.)",
      type: "multi",
      options: ["It is open source", "It is closed source", "It runs on Windows 11 Pro", "It runs on Windows 11 Home", "It emulates CPUs with binary translation"],
      answer: [1, 2],
      explain: "Hyper-V is closed source and requires Windows 11 Pro or Enterprise. It does not run on Home, and CPU emulation via dynamic binary translation describes QEMU.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      q: "Which statements describe Ubuntu? (Choose three.)",
      type: "multi",
      options: ["It is Debian-based", "It is managed by Canonical", "It uses sudo by default", "It uses the RPM package format", "It includes YaST"],
      answer: [0, 1, 2],
      explain: "Ubuntu is Debian-based, managed by Canonical, and uses sudo instead of root logins by default. It uses the dpkg/apt ecosystem, not RPM, and YaST belongs to openSUSE.",
      tags: ["distributions", "ubuntu"]
    },
    {
      q: "Which commands refresh package metadata or the package index before upgrading? (Choose two.)",
      type: "multi",
      options: ["sudo apt update", "sudo zypper refresh", "sudo dnf upgrade -y", "sudo apt dist-upgrade -y", "sudo zypper dup"],
      answer: [0, 1],
      explain: "`sudo apt update` refreshes the package index and `sudo zypper refresh` refreshes repository metadata. The other commands perform upgrades rather than refreshing metadata.",
      tags: ["package-management", "apt", "zypper"]
    },
    {
      q: "Which licensing models distribute closed-source software? (Choose three.)",
      type: "multi",
      options: ["Freeware", "Shareware", "Proprietary", "Open source", "Copyleft"],
      answer: [0, 1, 2],
      explain: "Freeware, shareware, and commercial closed-source software all keep their source code closed. Open source and copyleft software make source available.",
      tags: ["licensing", "software-types"]
    },
    {
      q: "Which distribution was created by the original CentOS developers? (Select one.)",
      type: "multi",
      options: ["Rocky Linux", "CentOS Stream", "Fedora", "RHEL", "openSUSE"],
      answer: [0],
      explain: "Rocky Linux was created by the original CentOS developers to be an exact duplicate of the latest RHEL.",
      tags: ["distributions", "rocky-linux"]
    },
    {
      q: "Which openSUSE tool provides centralized system management? (Select one.)",
      type: "multi",
      options: ["YaST", "zypper", "dnf", "apt", "VirtualBox"],
      answer: [0],
      explain: "YaST (Yet another Setup Tool) is openSUSE's central system management utility.",
      tags: ["opensuse", "yast"]
    },
    {
      q: "Which statements are true of the Red Hat family? (Choose four.)",
      type: "multi",
      options: ["RHEL requires a commercial license", "Fedora is desktop oriented", "Rocky Linux duplicates RHEL exactly", "CentOS Stream is rolling development", "Ubuntu belongs to this family"],
      answer: [0, 1, 2, 3],
      explain: "RHEL is commercial, Fedora is the desktop-oriented testing ground, Rocky Linux exactly duplicates the latest RHEL, and CentOS Stream is a rolling development release. Ubuntu is Debian-based, not Red Hat.",
      tags: ["distributions", "red-hat"]
    },
    {
      q: "Match each CPU architecture with its description.",
      type: "match",
      context: "CPU architectures",
      pairs: [
        { item: "x86_64", match: "64-bit Intel/AMD desktop and laptop CPUs" },
        { item: "aarch64", match: "ARM CPUs in small-scale systems such as the Raspberry Pi" },
        { item: "s390x", match: "IBM Z mainframes and minicomputers" },
        { item: "RISC-V", match: "Open standard architecture any manufacturer can implement" }
      ],
      explain: "These identifiers map to the architectures stressed for the Linux+ exam: x86/x86_64 for desktop Intel/AMD, aarch64 for ARM small-scale systems, s390x for IBM Z, and RISC-V as the open standard.",
      tags: ["hardware", "architecture"]
    },
    {
      q: "Match each license with its key property.",
      type: "match",
      context: "Open source licenses",
      pairs: [
        { item: "GPL", match: "Derivatives must be released under the same license" },
        { item: "LGPL", match: "Can be integrated into proprietary projects without releasing your code" },
        { item: "Apache", match: "Derivative can use a different license" },
        { item: "MIT", match: "Do anything; keep the original copyright notice" }
      ],
      explain: "GPL and LGPL are copyleft with different strictness; Apache and MIT are permissive, differing mainly in the notice and patent terms.",
      tags: ["licensing", "copyleft", "permissive"]
    },
    {
      q: "Match each distribution with its distinguishing fact.",
      type: "match",
      context: "Distributions",
      pairs: [
        { item: "RHEL", match: "Commercial distribution with full support" },
        { item: "CentOS Stream", match: "Rolling development release" },
        { item: "Rocky Linux", match: "Exact duplicate of the latest RHEL" },
        { item: "Fedora", match: "Red Hat testing ground, desktop oriented" },
        { item: "Ubuntu", match: "Debian-based with sudo by default" }
      ],
      explain: "Each distribution fills a distinct niche in the Red Hat and Debian families, from RHEL's commercial support to Fedora's testing role and Rocky's exact duplication of RHEL.",
      tags: ["distributions"]
    },
    {
      q: "Match each package command with what it does.",
      type: "match",
      context: "Package commands",
      pairs: [
        { item: "sudo apt update", match: "Refresh the local package index" },
        { item: "sudo apt upgrade -y", match: "Apply upgrades without prompting" },
        { item: "sudo dnf check-update", match: "Verify whether updated packages are available" },
        { item: "sudo zypper refresh", match: "Refresh repository metadata" },
        { item: "sudo zypper dup", match: "Perform a distribution upgrade" }
      ],
      explain: "Refresh/index commands update what the package manager knows; check-update verifies availability; upgrade and dup apply updates.",
      tags: ["package-management", "apt", "dnf", "zypper"]
    },
    {
      q: "Match each virtualization product with its trait.",
      type: "match",
      context: "Virtualization products",
      pairs: [
        { item: "Oracle VirtualBox", match: "Open source and cross-platform" },
        { item: "Microsoft Hyper-V", match: "Closed source; Windows 11 Pro/Enterprise" },
        { item: "QEMU", match: "Emulates the CPU via dynamic binary translation" }
      ],
      explain: "Each product differs in licensing and mechanism: VirtualBox is open source, Hyper-V is Windows-gated, and QEMU emulates rather than virtualizes hardware directly.",
      tags: ["virtualization"]
    },
    {
      q: "Match each acronym with its expansion.",
      type: "match",
      context: "Acronyms",
      pairs: [
        { item: "GPL", match: "GNU General Public License" },
        { item: "LGPL", match: "GNU Lesser General Public License" },
        { item: "dnf", match: "Dandified YUM" },
        { item: "apt", match: "Advanced Package Tool" },
        { item: "YaST", match: "Yet another Setup Tool" }
      ],
      explain: "These expansions recur throughout Linux package and license discussions; knowing them makes command and license names self-explanatory.",
      tags: ["acronyms", "licensing", "package-management"]
    },
    {
      q: "Match each update command with its distribution family.",
      type: "match",
      context: "Update commands by family",
      pairs: [
        { item: "sudo dnf upgrade -y", match: "Rocky / RHEL / Fedora" },
        { item: "sudo apt upgrade -y", match: "Ubuntu / Debian" },
        { item: "sudo zypper dup", match: "openSUSE" }
      ],
      explain: "Each family has its own update command: dnf on Red Hat-family systems, apt on Debian-family systems, and zypper on SUSE systems.",
      tags: ["package-management", "distributions"]
    },
    {
      q: "Match each distribution with its package tool.",
      type: "match",
      context: "Package tools by distribution",
      pairs: [
        { item: "RHEL", match: "dnf" },
        { item: "Ubuntu", match: "apt" },
        { item: "openSUSE", match: "zypper" }
      ],
      explain: "RHEL-family systems use dnf, Ubuntu and Debian use apt, and openSUSE uses zypper.",
      tags: ["distributions", "package-management"]
    },
    {
      q: "Match each virtualization hardware minimum with its value.",
      type: "match",
      context: "Virtualization minimums",
      pairs: [
        { item: "RAM", match: "8 GB" },
        { item: "Disk", match: "70 GB" },
        { item: "CPU", match: "x86_64 2 GHz dual-core" }
      ],
      explain: "These are the recommended minimums for a host running multiple Linux distro VMs.",
      tags: ["virtualization", "hardware"]
    },
    {
      q: "Match each terminal-access fact with its detail.",
      type: "match",
      context: "Terminal access",
      pairs: [
        { item: "Ctrl+Alt+F2", match: "Reach a text-only virtual console" },
        { item: "Ctrl+Alt+F7", match: "Return to the graphical desktop on many distros" },
        { item: "Terminal application", match: "Command line inside a graphical desktop" }
      ],
      explain: "Graphical desktops offer terminal applications, while Ctrl+Alt+F2/F3 reach text-only consoles; the return key (F1, F7, or F2) varies by distribution and display manager.",
      tags: ["terminal", "tty"]
    },
    {
      q: "Match each number in the kernel version 6.8.12 with its meaning.",
      type: "match",
      context: "Kernel version 6.8.12",
      pairs: [
        { item: "6", match: "Major version" },
        { item: "8", match: "Minor revision" },
        { item: "12", match: "Current release revision" }
      ],
      explain: "Kernel versions read major.minor.revision, so 6.8.12 has major 6, minor 8, and revision 12.",
      tags: ["kernel", "versions"]
    },
    {
      q: "Match each licensing model with its cost characteristic.",
      type: "match",
      context: "Licensing models",
      pairs: [
        { item: "Open source", match: "Typically free of charge" },
        { item: "Closed source", match: "Usually costly" },
        { item: "Freeware", match: "Free of charge, closed source" },
        { item: "Shareware", match: "Free trial, then payment required" }
      ],
      explain: "Cost and source availability are independent traits: freeware is free but closed, while open source is typically free with source available.",
      tags: ["licensing", "software-types"]
    },
    {
      q: "Match each tool with its classification.",
      type: "match",
      context: "Tool classification",
      pairs: [
        { item: "YaST", match: "Central system management utility" },
        { item: "zypper", match: "SUSE command-line package manager" },
        { item: "dnf", match: "RPM package manager command" },
        { item: "apt", match: "dpkg package manager command" }
      ],
      explain: "YaST manages the whole system, while zypper, dnf, and apt are the package manager commands for the SUSE, Red Hat, and Debian families respectively.",
      tags: ["package-management", "opensuse"]
    }
  ]
});
