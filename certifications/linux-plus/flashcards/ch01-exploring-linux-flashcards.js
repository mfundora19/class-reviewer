window.ReviewApp.content.register({
  type: "flashcards",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      front: "What are the four parts that make up a complete Linux system?",
      back: "The Linux kernel, GNU utilities, a user interface (graphical or command-line), and application software.",
      tags: ["linux-concepts", "components"]
    },
    {
      front: "What is the primary role of the Linux kernel?",
      back: "It interfaces between software and hardware, managing CPU usage, memory, and devices.",
      tags: ["kernel", "linux-concepts"]
    },
    {
      front: "Which part of a Linux system provides the command-line programs used to manage files and programs?",
      back: "The GNU utilities — the command-line programs layered on top of the kernel.",
      tags: ["gnu", "components"]
    },
    {
      front: "What two forms can the user-interface component of a Linux system take?",
      back: "A graphical desktop environment or a command-line shell.",
      tags: ["ui", "shell", "components"]
    },
    {
      front: "Which Linux system component includes programs such as web servers and editors?",
      back: "Application software — the desktop and server programs that run on top of the other components.",
      tags: ["applications", "components"]
    },
    {
      front: "Which three resources does the kernel manage between software and hardware?",
      back: "CPU usage, memory, and devices.",
      tags: ["kernel", "hardware"]
    },
    {
      front: "What is the format of a Linux kernel version number?",
      back: "Major.Minor.Revision — for example, 5.18.16.",
      tags: ["kernel", "versions"]
    },
    {
      front: "In the kernel version 5.18.16, what does each number represent?",
      back: "5 is the major version, 18 is the minor revision, and 16 is the current release revision.",
      tags: ["kernel", "versions"]
    },
    {
      front: "In the kernel version 6.8.12, which number is the major version?",
      back: "6 — the first number in the major.minor.revision format.",
      tags: ["kernel", "versions"]
    },
    {
      front: "In the kernel version 4.19.5, which number is the revision?",
      back: "5 — the last number in the major.minor.revision format.",
      tags: ["kernel", "versions"]
    },
    {
      front: "A kernel moves from 5.15.0 to 5.15.9. Which version component changed?",
      back: "Only the revision (the third number) changed; the major and minor numbers stayed the same.",
      tags: ["kernel", "versions"]
    },
    {
      front: "In kernel version 5.18.16, which two numbers identify the version line?",
      back: "The major number (5) and the minor number (18) identify the version line; the revision (16) identifies the current release within it.",
      tags: ["kernel", "versions"]
    },
    {
      front: "Is 5.18.16 a newer kernel than 5.17.30? How can you tell?",
      back: "Yes — compare the numbers left to right: the minor number 18 is greater than 17, so 5.18.16 is newer.",
      tags: ["kernel", "versions"]
    },
    {
      front: "Which CPU architectures cover 32-bit and 64-bit Intel/AMD desktop and laptop CPUs?",
      back: "x86 (32-bit) and x86_64 (64-bit).",
      tags: ["hardware", "architecture"]
    },
    {
      front: "Which architecture identifier refers specifically to AMD 64-bit CPUs?",
      back: "AMD64.",
      tags: ["hardware", "architecture"]
    },
    {
      front: "Which CPU architecture (and identifier) is used by small-scale systems such as the Raspberry Pi?",
      back: "ARM, identified as aarch64.",
      tags: ["hardware", "arm"]
    },
    {
      front: "Which architecture targets IBM mainframes and minicomputers, and what is its identifier?",
      back: "IBM Z, identified as s390x.",
      tags: ["hardware", "ibm"]
    },
    {
      front: "Which CPU architecture is an open standard that any manufacturer can implement?",
      back: "RISC-V (Reduced Instruction Set Computing, version 5).",
      tags: ["hardware", "risc-v"]
    },
    {
      front: "What makes RISC-V different from architectures like x86_64 or ARM?",
      back: "It is an open standard — any manufacturer can implement it, unlike proprietary architectures.",
      tags: ["hardware", "risc-v"]
    },
    {
      front: "A technician prepares Linux for a Raspberry Pi-class single-board computer. Which architecture applies?",
      back: "ARM (aarch64).",
      tags: ["hardware", "arm"]
    },
    {
      front: "What are the four software licensing models commonly compared?",
      back: "Open source, closed source, freeware, and shareware.",
      tags: ["licensing", "software-types"]
    },
    {
      front: "What defines open source software?",
      back: "Its source code is publicly available for use and modification. It is typically free, but availability of the source is the defining trait, not the cost.",
      tags: ["licensing", "open-source"]
    },
    {
      front: "What is the difference between freeware and shareware?",
      back: "Freeware is closed-source software distributed free of charge; shareware is closed-source software that is initially free but requires payment after a trial period.",
      tags: ["licensing", "software-types"]
    },
    {
      front: "Which licensing model offers a free trial and then requires payment?",
      back: "Shareware.",
      tags: ["licensing", "shareware"]
    },
    {
      front: "Is closed source software usually free or costly?",
      back: "Usually costly — its source code is not publicly available.",
      tags: ["licensing", "closed-source"]
    },
    {
      front: "Give an example of open source software and one of closed source software.",
      back: "The Linux kernel is open source; most commercial software is closed source.",
      tags: ["licensing", "open-source"]
    },
    {
      front: "What is the fundamental difference between copyleft and permissive open source licenses?",
      back: "Copyleft requires derivative works to use the same license; permissive licenses allow derivatives to use a different license or none at all.",
      tags: ["licensing", "copyleft"]
    },
    {
      front: "Which license requires that modifications to source code be released publicly under the same license terms?",
      back: "The GNU General Public License (GPL).",
      tags: ["licensing", "gpl"]
    },
    {
      front: "What does GPL stand for?",
      back: "GNU General Public License.",
      tags: ["licensing", "gpl"]
    },
    {
      front: "Which license allows integrating open source code into a proprietary project without releasing your own changes?",
      back: "The GNU Lesser General Public License (LGPL).",
      tags: ["licensing", "lgpl"]
    },
    {
      front: "What does LGPL stand for?",
      back: "GNU Lesser General Public License.",
      tags: ["licensing", "lgpl"]
    },
    {
      front: "Which permissive license lets a derivative work use a different license entirely?",
      back: "The Apache license.",
      tags: ["licensing", "apache"]
    },
    {
      front: "Under the MIT license, what obligation comes with doing almost anything with the code?",
      back: "You must keep the original copyright notice.",
      tags: ["licensing", "mit"]
    },
    {
      front: "Which two licenses are copyleft, and which two are permissive?",
      back: "Copyleft: GPL and LGPL. Permissive: Apache and MIT.",
      tags: ["licensing", "copyleft"]
    },
    {
      front: "Which license family ensures code changes stay open rather than private?",
      back: "Copyleft licenses (such as GPL and LGPL).",
      tags: ["licensing", "copyleft"]
    },
    {
      front: "Which license governs the Linux kernel itself?",
      back: "GPL version 2.",
      tags: ["licensing", "kernel", "gpl"]
    },
    {
      front: "Does a Linux distribution ship entirely under GPL v2?",
      back: "No — the kernel is GPL v2, but distributions include third-party software under other licenses.",
      tags: ["licensing", "kernel", "distributions"]
    },
    {
      front: "Which two major distribution groups are emphasized for the Linux+ exam?",
      back: "Red Hat-based (RPM-based) and Debian-based (dpkg-based).",
      tags: ["distributions", "package-management"]
    },
    {
      front: "What package format and package manager do Red Hat-based distributions use?",
      back: "The RPM package format, managed with dnf.",
      tags: ["distributions", "rpm", "dnf"]
    },
    {
      front: "What package ecosystem and manager do Debian-based distributions use?",
      back: "dpkg packages, managed with apt.",
      tags: ["distributions", "dpkg", "apt"]
    },
    {
      front: "Which distribution family uses zypper and includes the YaST management tool?",
      back: "SUSE.",
      tags: ["distributions", "suse", "zypper"]
    },
    {
      front: "What is RHEL, and what does using it require?",
      back: "Red Hat Enterprise Linux — a commercial, enterprise-focused distribution that requires a license and includes full support.",
      tags: ["distributions", "rhel"]
    },
    {
      front: "What is CentOS Stream's relationship to RHEL?",
      back: "It is a rolling development distribution and is no longer an exact duplicate of the current RHEL version.",
      tags: ["distributions", "rhel", "centos"]
    },
    {
      front: "Which distribution was created by the original CentOS developers to be an exact duplicate of the latest RHEL?",
      back: "Rocky Linux.",
      tags: ["distributions", "rocky-linux"]
    },
    {
      front: "Which distribution serves as Red Hat's testing ground and is desktop oriented?",
      back: "Fedora.",
      tags: ["distributions", "fedora"]
    },
    {
      front: "Who manages Ubuntu, and which distribution family is it based on?",
      back: "Canonical manages Ubuntu; it is Debian-based.",
      tags: ["distributions", "ubuntu"]
    },
    {
      front: "How does Ubuntu handle administrative access by default?",
      back: "It uses sudo instead of a root login.",
      tags: ["ubuntu", "sudo"]
    },
    {
      front: "What is openSUSE Leap?",
      back: "The stable release of openSUSE.",
      tags: ["opensuse", "distributions"]
    },
    {
      front: "What is YaST on openSUSE?",
      back: "Yet another Setup Tool — a command-center utility that controls many system services from one interface.",
      tags: ["opensuse", "yast"]
    },
    {
      front: "What does YaST stand for?",
      back: "Yet another Setup Tool.",
      tags: ["opensuse", "yast"]
    },
    {
      front: "Which distribution family's package manager command is dnf?",
      back: "The Red Hat-based family — RHEL, Rocky Linux, and Fedora.",
      tags: ["distributions", "dnf"]
    },
    {
      front: "An organization needs an exact duplicate of the latest RHEL without a commercial license. Which distribution fits?",
      back: "Rocky Linux — a community rebuild that duplicates the latest RHEL exactly.",
      tags: ["distributions", "rocky-linux", "rhel"]
    },
    {
      front: "Which distribution is Debian-based and defaults to sudo instead of root logins?",
      back: "Ubuntu.",
      tags: ["distributions", "ubuntu", "sudo"]
    },
    {
      front: "Which stable openSUSE release pairs zypper with a central system-management tool?",
      back: "openSUSE Leap, which includes YaST.",
      tags: ["opensuse", "yast", "zypper"]
    },
    {
      front: "What does dnf stand for?",
      back: "Dandified YUM.",
      tags: ["dnf", "package-management"]
    },
    {
      front: "What does apt stand for?",
      back: "Advanced Package Tool.",
      tags: ["apt", "package-management"]
    },
    {
      front: "What does `sudo dnf check-update` do on a Rocky Linux system?",
      back: "It checks the repositories for available package updates without installing them.",
      tags: ["dnf", "rocky-linux"]
    },
    {
      front: "What does `sudo dnf upgrade -y` do?",
      back: "It applies the available package upgrades, with -y answering yes automatically instead of prompting.",
      tags: ["dnf", "package-management"]
    },
    {
      front: "What does `sudo apt update` do on Ubuntu?",
      back: "It refreshes the local package index with the latest changes from the repositories.",
      tags: ["apt", "ubuntu"]
    },
    {
      front: "What does `sudo apt upgrade -y` do?",
      back: "It installs the available package upgrades without prompting for confirmation.",
      tags: ["apt", "package-management"]
    },
    {
      front: "Which apt command handles upgrades beyond a normal upgrade?",
      back: "`sudo apt dist-upgrade`.",
      tags: ["apt", "package-management"]
    },
    {
      front: "What is the two-step openSUSE update sequence?",
      back: "`sudo zypper refresh` to refresh repository metadata, then `sudo zypper dup` to upgrade.",
      tags: ["zypper", "opensuse"]
    },
    {
      front: "What command refreshes repository metadata on openSUSE?",
      back: "`sudo zypper refresh`.",
      tags: ["zypper", "opensuse"]
    },
    {
      front: "Which command verifies whether updated packages are available on RHEL-family systems?",
      back: "`sudo dnf check-update`.",
      tags: ["dnf", "package-management"]
    },
    {
      front: "Which command pair refreshes and then upgrades packages on Ubuntu?",
      back: "`sudo apt update` followed by `sudo apt upgrade -y`.",
      tags: ["apt", "ubuntu"]
    },
    {
      front: "Which three hypervisors are commonly compared for hosting Linux VMs locally?",
      back: "Oracle VirtualBox, Microsoft Hyper-V, and QEMU.",
      tags: ["virtualization", "hypervisors"]
    },
    {
      front: "Which virtualization product is open source and cross-platform?",
      back: "Oracle VirtualBox.",
      tags: ["virtualization", "virtualbox"]
    },
    {
      front: "Which Windows 11 editions support Microsoft Hyper-V?",
      back: "Pro and Enterprise; Windows 11 Home does not support it.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      front: "Which virtualization product emulates a CPU using dynamic binary translation?",
      back: "QEMU (Quick Emulator).",
      tags: ["virtualization", "qemu"]
    },
    {
      front: "What does QEMU stand for?",
      back: "Quick Emulator.",
      tags: ["virtualization", "qemu"]
    },
    {
      front: "A Windows 11 Home workstation needs a hypervisor. Which product from the chapter will not run there?",
      back: "Microsoft Hyper-V — it requires Windows 11 Pro or Enterprise.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      front: "Which hypervisor is the fully open-source, cross-platform choice for a VM manager?",
      back: "Oracle VirtualBox.",
      tags: ["virtualization", "virtualbox"]
    },
    {
      front: "Which hypervisor relies on CPU emulation instead of hardware-assisted virtualization?",
      back: "QEMU, which uses dynamic binary translation to emulate the CPU.",
      tags: ["virtualization", "qemu"]
    },
    {
      front: "What are the virtualization hardware minimums?",
      back: "8 GB of RAM, 70 GB of disk space, and an x86_64 2 GHz dual-core CPU.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "What is the minimum recommended RAM for a virtualization product hosting multiple Linux distros?",
      back: "8 GB.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "How much disk space is the minimum for a virtualization host?",
      back: "70 GB.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "What CPU minimum applies to a virtualization host?",
      back: "An x86_64 CPU running at 2 GHz with at least two cores.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "Why does RAM sizing matter when planning a virtualization host?",
      back: "Each guest VM needs its own memory, so the host should have at least the recommended 8 GB when hosting multiple distros.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "Which cloud providers are mentioned as options for running Linux VMs?",
      back: "Amazon Web Services (AWS), Microsoft Azure, and DigitalOcean.",
      tags: ["cloud", "virtualization"]
    },
    {
      front: "Which of the cloud providers named for Linux VMs is Microsoft's?",
      back: "Microsoft Azure.",
      tags: ["cloud", "azure"]
    },
    {
      front: "Beyond local hypervisors, where else can Linux virtual machines run?",
      back: "On cloud providers' infrastructure, such as AWS, Microsoft Azure, and DigitalOcean.",
      tags: ["cloud", "virtualization"]
    },
    {
      front: "Is running a VM on DigitalOcean the same category as running one in VirtualBox?",
      back: "No — DigitalOcean is a hosted cloud platform running VMs on remote infrastructure, while VirtualBox is a local desktop hypervisor.",
      tags: ["cloud", "virtualization"]
    },
    {
      front: "What does AWS stand for?",
      back: "Amazon Web Services.",
      tags: ["cloud", "aws"]
    },
    {
      front: "How do you get a command line on a Linux system with a graphical desktop?",
      back: "Open a terminal application within the desktop environment.",
      tags: ["terminal", "ui"]
    },
    {
      front: "How do you access a text-only terminal (TTY) from a graphical desktop on most distributions?",
      back: "Press Ctrl+Alt+F2 (or F3) to switch to a virtual console.",
      tags: ["terminal", "tty"]
    },
    {
      front: "Which virtual console do you reach with Ctrl+Alt+F3?",
      back: "tty3 — a text-only virtual console.",
      tags: ["terminal", "tty"]
    },
    {
      front: "Which keys return you to the graphical desktop from a virtual console?",
      back: "Ctrl+Alt+F1, F7, or F2 — the exact key varies by distribution and display manager.",
      tags: ["terminal", "tty"]
    },
    {
      front: "Why does the return-to-GUI key combination vary between systems?",
      back: "It depends on the distribution and the display manager in use.",
      tags: ["terminal", "tty"]
    },
    {
      front: "On a server with no graphical desktop, how do you interact with the system?",
      back: "Through the text-based virtual console (TTY) directly — no terminal application is needed.",
      tags: ["terminal", "tty"]
    },
    {
      front: "What key combination reaches a text-only virtual console on most distributions?",
      back: "Ctrl+Alt+F2 (or F3).",
      tags: ["terminal", "tty"]
    },
    {
      front: "Order these from outermost to innermost: kernel, application software, GNU utilities, user interface.",
      back: "Kernel → GNU utilities → user interface → application software — the kernel touches hardware, applications sit on top of the stack.",
      tags: ["linux-concepts", "components"]
    },
    {
      front: "Which component would you blame first if a device is not recognized by a running Linux system?",
      back: "The kernel — it is the component that manages devices between software and hardware.",
      tags: ["kernel", "devices"]
    },
    {
      front: "Which two exam-emphasized distribution groups map to the dnf and apt package managers?",
      back: "Red Hat-based (RPM) → dnf; Debian-based (dpkg) → apt.",
      tags: ["distributions", "package-management"]
    },
    {
      front: "Which distribution would you pick for a desktop-oriented testing ground of new Red Hat technology?",
      back: "Fedora.",
      tags: ["distributions", "fedora"]
    },
    {
      front: "Which license would you choose to guarantee improvements to your code stay open?",
      back: "A copyleft license such as GPL — derivative works must use the same license.",
      tags: ["licensing", "copyleft", "gpl"]
    },
    {
      front: "Which license would you choose to let companies use your code in proprietary products?",
      back: "A permissive license such as Apache or MIT — derivatives may use a different license or none at all.",
      tags: ["licensing", "permissive"]
    }
  ]
});
