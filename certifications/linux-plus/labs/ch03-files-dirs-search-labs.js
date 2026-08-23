window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 03 · Files, Directories & Search",
  items: [
    {
      title: "Security Evidence Workspace Orientation",
      difficulty: 1,
      minutes: 25,
      scenario: "You are preparing a temporary evidence workspace for a basic incident review. The workspace contains ordinary reports, a log, and a hidden collection note. Establish a predictable directory layout, inspect the entries, and use path and filename patterns to describe what was collected.",
      objectives: [
        "Navigate with absolute and relative pathnames",
        "Create a nested temporary evidence workspace",
        "Inspect hidden files and file-type indicators",
        "Use shell wildcards to identify a group of reports",
        "Read a small evidence note"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-orientation` with `incoming` and `review` directories, then make `incoming` your working directory.",
          command: "mkdir -p /tmp/linuxplus-ch03-orientation/incoming /tmp/linuxplus-ch03-orientation/review\ncd /tmp/linuxplus-ch03-orientation/incoming",
          hint: "Build both directory levels before entering the workspace; use a full path for the first move so the starting location is unambiguous.",
          solution: "mkdir -p /tmp/linuxplus-ch03-orientation/incoming /tmp/linuxplus-ch03-orientation/review\ncd /tmp/linuxplus-ch03-orientation/incoming",
          expectedOutput: "(no output)",
          check: "The temporary workspace contains `incoming` and `review`, and the session is inside `incoming`."
        },
        {
          do: "Create three report files, one incident log, and one hidden collection note in the incoming directory.",
          command: "printf 'Case: LNX-03\nStatus: reviewed\n' > /tmp/linuxplus-ch03-orientation/incoming/report-01.txt\nprintf 'Case: LNX-03\nStatus: pending\n' > /tmp/linuxplus-ch03-orientation/incoming/report-02.txt\nprintf 'Case: LNX-03\nStatus: escalated\n' > /tmp/linuxplus-ch03-orientation/incoming/report-03.txt\nprintf 'INFO intake started\nFAILED login for analyst\nINFO review queued\n' > /tmp/linuxplus-ch03-orientation/incoming/auth.log\nprintf 'Collected during initial triage\n' > /tmp/linuxplus-ch03-orientation/incoming/.collection-note",
          hint: "Use text redirection to create small, readable artifacts; make the final filename in the note begin with a period so it is hidden by an ordinary listing.",
          solution: "printf 'Case: LNX-03\nStatus: reviewed\n' > /tmp/linuxplus-ch03-orientation/incoming/report-01.txt\nprintf 'Case: LNX-03\nStatus: pending\n' > /tmp/linuxplus-ch03-orientation/incoming/report-02.txt\nprintf 'Case: LNX-03\nStatus: escalated\n' > /tmp/linuxplus-ch03-orientation/incoming/report-03.txt\nprintf 'INFO intake started\nFAILED login for analyst\nINFO review queued\n' > /tmp/linuxplus-ch03-orientation/incoming/auth.log\nprintf 'Collected during initial triage\n' > /tmp/linuxplus-ch03-orientation/incoming/.collection-note",
          expectedOutput: "(no output)",
          check: "The incoming directory contains three reports, `auth.log`, and hidden `.collection-note`."
        },
        {
          do: "Display the incoming directory in a detailed form that includes hidden entries, readable sizes, and file-type indicators.",
          command: "ls -alhF /tmp/linuxplus-ch03-orientation/incoming",
          hint: "Choose a listing that reveals names beginning with a period, adds metadata, makes sizes readable, and marks directories or other file types.",
          solution: "ls -alhF /tmp/linuxplus-ch03-orientation/incoming",
          expectedOutput: "total 20K\ndrwxr-xr-x 2 student student 4.0K Aug 19 10:00 ./\ndrwxr-xr-x 4 student student 4.0K Aug 19 10:00 ../\n-rw-r--r-- 1 student student   31B Aug 19 10:00 .collection-note\n-rw-r--r-- 1 student student   75B Aug 19 10:00 auth.log\n-rw-r--r-- 1 student student   33B Aug 19 10:00 report-01.txt\n-rw-r--r-- 1 student student   33B Aug 19 10:00 report-02.txt\n-rw-r--r-- 1 student student   35B Aug 19 10:00 report-03.txt",
          expectedOutputDynamic: true,
          check: "The detailed listing includes the hidden note and identifies the regular files."
        },
        {
          do: "Print the current location, then list only the report files by using their shared filename pattern.",
          command: "pwd\nls /tmp/linuxplus-ch03-orientation/incoming/report-*.txt",
          hint: "Use the command that prints the working directory, then use a shell filename pattern that matches the common prefix and extension without naming each report separately.",
          solution: "pwd\nls /tmp/linuxplus-ch03-orientation/incoming/report-*.txt",
          expectedOutput: "/tmp/linuxplus-ch03-orientation/incoming\n/tmp/linuxplus-ch03-orientation/incoming/report-01.txt\n/tmp/linuxplus-ch03-orientation/incoming/report-02.txt\n/tmp/linuxplus-ch03-orientation/incoming/report-03.txt",
          check: "The location is the incoming directory and the wildcard selects exactly the three reports."
        },
        {
          do: "Read the hidden collection note and record why hidden entries matter during evidence intake.",
          command: "cat /tmp/linuxplus-ch03-orientation/incoming/.collection-note",
          hint: "Read the small text artifact directly, then connect its hidden filename to the difference between an ordinary listing and an all-entry listing.",
          solution: "cat /tmp/linuxplus-ch03-orientation/incoming/.collection-note",
          expectedOutput: "Collected during initial triage",
          check: "The note is readable and the handoff explains that hidden entries must be deliberately included during review."
        }
      ],
      tags: ["paths", "mkdir", "cd", "pwd", "ls", "wildcards", "hidden-files", "cat"]
    },
    {
      title: "Authentication Log Triage",
      difficulty: 1,
      minutes: 20,
      scenario: "A small application log was recovered from a workstation after several failed sign-in attempts. Create a reproducible copy of the log, identify suspicious entries, and inspect its beginning and end without opening the entire file at once.",
      objectives: [
        "Create a text log with shell redirection",
        "Search log entries with case-sensitive and case-insensitive matching",
        "Display line numbers for suspicious matches",
        "Inspect the beginning and end of a log",
        "Use a live tail to observe an appended event"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-log/app.log` with informational entries and two failed-login entries.",
          command: "mkdir -p /tmp/linuxplus-ch03-log\nprintf 'INFO service starting\nINFO configuration loaded\nFAILED login user=analyst\nINFO retrying connection\nFAILED login user=admin\nINFO service ready\n' > /tmp/linuxplus-ch03-log/app.log",
          hint: "Create the temporary directory first, then redirect several lines into one log so later searches have both normal and suspicious events.",
          solution: "mkdir -p /tmp/linuxplus-ch03-log\nprintf 'INFO service starting\nINFO configuration loaded\nFAILED login user=analyst\nINFO retrying connection\nFAILED login user=admin\nINFO service ready\n' > /tmp/linuxplus-ch03-log/app.log",
          expectedOutput: "(no output)",
          check: "The log contains six entries, including two lines marked `FAILED`."
        },
        {
          do: "Find every failed-login entry and include its line number.",
          command: "grep -n FAILED /tmp/linuxplus-ch03-log/app.log",
          hint: "Search for the exact uppercase marker and request the position of each matching line.",
          solution: "grep -n FAILED /tmp/linuxplus-ch03-log/app.log",
          expectedOutput: "3:FAILED login user=analyst\n5:FAILED login user=admin",
          check: "Two failed-login entries appear at lines 3 and 5."
        },
        {
          do: "Repeat the search for the word `failed` without treating capitalization as significant.",
          command: "grep -i failed /tmp/linuxplus-ch03-log/app.log",
          hint: "Use the search variation that ignores letter case while keeping the same text pattern and file.",
          solution: "grep -i failed /tmp/linuxplus-ch03-log/app.log",
          expectedOutput: "FAILED login user=analyst\nFAILED login user=admin",
          check: "The case-insensitive search returns both failed-login entries."
        },
        {
          do: "Display only the first three entries, then display only the final two entries.",
          command: "head -n 3 /tmp/linuxplus-ch03-log/app.log\ntail -n 2 /tmp/linuxplus-ch03-log/app.log",
          hint: "Use one file-viewing utility for the beginning and another for the end, limiting each view to the requested number of lines.",
          solution: "head -n 3 /tmp/linuxplus-ch03-log/app.log\ntail -n 2 /tmp/linuxplus-ch03-log/app.log",
          expectedOutput: "INFO service starting\nINFO configuration loaded\nFAILED login user=analyst\nFAILED login user=admin\nINFO service ready",
          check: "The combined output contains the first three and final two entries in the correct order."
        },
        {
          do: "Follow the log while a new health-check entry is appended from a second terminal, then stop following it after the new entry appears.",
          command: "tail -f /tmp/linuxplus-ch03-log/app.log\n# In a second terminal:\nprintf 'INFO health check passed\n' >> /tmp/linuxplus-ch03-log/app.log\n# Return to the first terminal and press Ctrl+C",
          hint: "Use the file-view mode that stays open for appended lines; create one new line from another terminal and stop the monitor with the documented interrupt key.",
          solution: "In terminal 1, run `tail -f /tmp/linuxplus-ch03-log/app.log`. In terminal 2, run `printf 'INFO health check passed\\n' >> /tmp/linuxplus-ch03-log/app.log`. After the new entry appears in terminal 1, press Ctrl+C there.",
          expectedOutput: "INFO service starting\nINFO configuration loaded\nFAILED login user=analyst\nINFO retrying connection\nFAILED login user=admin\nINFO service ready\nINFO health check passed",
          expectedOutputDynamic: true,
          check: "The live view shows the appended health-check entry before the monitor is stopped."
        }
      ],
      tags: ["logs", "grep", "head", "tail", "search", "incident-triage"]
    },
    {
      title: "Evidence Copy, Rename, and Integrity Check",
      difficulty: 2,
      minutes: 25,
      scenario: "You have identified a small report as relevant evidence. Preserve the original, place a copy in a review directory, rename the copy using the case convention, and verify that the archived content is identical to the source.",
      objectives: [
        "Create and inspect a source evidence file",
        "Copy a file while preserving its contents",
        "Move and rename the copied artifact",
        "Compare source and archived evidence",
        "Use a no-difference result as an integrity check"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-copy/raw` and `/tmp/linuxplus-ch03-copy/archive`, then write a small incident report into the raw directory.",
          command: "mkdir -p /tmp/linuxplus-ch03-copy/raw /tmp/linuxplus-ch03-copy/archive\nprintf 'Case: LNX-03\nFinding: repeated failed login\nOwner: analyst\n' > /tmp/linuxplus-ch03-copy/raw/alert.txt",
          hint: "Create both destinations before writing the source; use a short, stable text record so the later comparison has meaningful content.",
          solution: "mkdir -p /tmp/linuxplus-ch03-copy/raw /tmp/linuxplus-ch03-copy/archive\nprintf 'Case: LNX-03\nFinding: repeated failed login\nOwner: analyst\n' > /tmp/linuxplus-ch03-copy/raw/alert.txt",
          expectedOutput: "(no output)",
          check: "The raw directory contains `alert.txt` and the archive directory exists."
        },
        {
          do: "Inspect the source report and its containing directory before copying it.",
          command: "ls -l /tmp/linuxplus-ch03-copy/raw\ncat /tmp/linuxplus-ch03-copy/raw/alert.txt",
          hint: "First confirm the filename and metadata, then read the small text artifact so you know what content should survive the copy.",
          solution: "ls -l /tmp/linuxplus-ch03-copy/raw\ncat /tmp/linuxplus-ch03-copy/raw/alert.txt",
          expectedOutput: "-rw-r--r-- 1 student student 57 Aug 19 10:00 alert.txt\nCase: LNX-03\nFinding: repeated failed login\nOwner: analyst",
          expectedOutputDynamic: true,
          check: "The source listing names `alert.txt` and the displayed content identifies the case and finding."
        },
        {
          do: "Copy the report into the archive directory using an option that preserves its file attributes.",
          command: "cp -a /tmp/linuxplus-ch03-copy/raw/alert.txt /tmp/linuxplus-ch03-copy/archive/alert.txt",
          hint: "Use the copy mode intended for preserving metadata, and provide both the original and the destination path explicitly.",
          solution: "cp -a /tmp/linuxplus-ch03-copy/raw/alert.txt /tmp/linuxplus-ch03-copy/archive/alert.txt",
          expectedOutput: "(no output)",
          check: "The archive directory contains a copied `alert.txt` report."
        },
        {
          do: "Move the archived copy to the case-approved filename `alert-verified.txt`.",
          command: "mv /tmp/linuxplus-ch03-copy/archive/alert.txt /tmp/linuxplus-ch03-copy/archive/alert-verified.txt",
          hint: "Use the file operation that changes a path or name without creating a second content copy.",
          solution: "mv /tmp/linuxplus-ch03-copy/archive/alert.txt /tmp/linuxplus-ch03-copy/archive/alert-verified.txt",
          expectedOutput: "(no output)",
          check: "The archive contains `alert-verified.txt` and no longer contains the old archived name."
        },
        {
          do: "Compare the original report with the renamed archived report and inspect the final archive listing.",
          command: "diff -q /tmp/linuxplus-ch03-copy/raw/alert.txt /tmp/linuxplus-ch03-copy/archive/alert-verified.txt\nls -l /tmp/linuxplus-ch03-copy/archive",
          hint: "An identical comparison is silent; use the listing afterward to confirm the destination has the case-approved name.",
          solution: "diff -q /tmp/linuxplus-ch03-copy/raw/alert.txt /tmp/linuxplus-ch03-copy/archive/alert-verified.txt\nls -l /tmp/linuxplus-ch03-copy/archive",
          expectedOutput: "-rw-r--r-- 1 student student 57 Aug 19 10:00 alert-verified.txt",
          expectedOutputDynamic: true,
          check: "The comparison reports no differences and the archive contains `alert-verified.txt`."
        }
      ],
      tags: ["evidence", "cp", "mv", "diff", "files", "integrity"]
    },
    {
      title: "Hard Link and Symbolic Link Review",
      difficulty: 2,
      minutes: 25,
      scenario: "During artifact review, two filenames appear to refer to one report while another entry points into a separate directory. Build both link types, compare inode evidence, resolve the symbolic link, and identify why a moved target can create a stale security-sensitive link.",
      objectives: [
        "Create a hard link and compare inode numbers",
        "Observe that hard-linked names share file content",
        "Create and resolve a symbolic link",
        "Distinguish same-inode links from pathname pointers",
        "Recognize a stale symbolic-link condition"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-links/raw` and `/tmp/linuxplus-ch03-links/review`, then write a report into the raw directory.",
          command: "mkdir -p /tmp/linuxplus-ch03-links/raw /tmp/linuxplus-ch03-links/review\nprintf 'Case: LNX-03\nEvidence: shared indicator\n' > /tmp/linuxplus-ch03-links/raw/indicator.txt",
          hint: "Create the target before either link; keep the target and review directory separate so the path relationships are visible.",
          solution: "mkdir -p /tmp/linuxplus-ch03-links/raw /tmp/linuxplus-ch03-links/review\nprintf 'Case: LNX-03\nEvidence: shared indicator\n' > /tmp/linuxplus-ch03-links/raw/indicator.txt",
          expectedOutput: "(no output)",
          check: "The raw directory contains the original indicator report."
        },
        {
          do: "Create a second filename for the report using a hard link, then display inode numbers for both names.",
          command: "ln /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-hard.txt\nls -i /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-hard.txt",
          hint: "Use the link operation without the symbolic-link option, then request inode numbers so the two directory entries can be compared.",
          solution: "ln /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-hard.txt\nls -i /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-hard.txt",
          expectedOutput: "1234567 /tmp/linuxplus-ch03-links/raw/indicator.txt\n1234567 /tmp/linuxplus-ch03-links/review/indicator-hard.txt",
          expectedOutputDynamic: true,
          check: "Both hard-link names show the same inode number."
        },
        {
          do: "Append one line through the original name, then read the hard-link name to confirm that both names reach the same underlying data.",
          command: "printf 'Review status: linked names share data\n' >> /tmp/linuxplus-ch03-links/raw/indicator.txt\ncat /tmp/linuxplus-ch03-links/review/indicator-hard.txt",
          hint: "Write through one name and read through the other; the result should demonstrate shared data rather than a separate copied file.",
          solution: "printf 'Review status: linked names share data\n' >> /tmp/linuxplus-ch03-links/raw/indicator.txt\ncat /tmp/linuxplus-ch03-links/review/indicator-hard.txt",
          expectedOutput: "Case: LNX-03\nEvidence: shared indicator\nReview status: linked names share data",
          check: "The hard-link name displays the line appended through the original name."
        },
        {
          do: "Create a symbolic link in the review directory that points to the raw report, then display the link relationship.",
          command: "ln -s ../raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt\nls -l /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt",
          hint: "Use the link form that stores a target pathname, and choose a relative target that is correct from the review directory.",
          solution: "ln -s ../raw/indicator.txt /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt\nls -l /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt",
          expectedOutput: "lrwxrwxrwx 1 student student 18 Aug 19 10:00 /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt -> ../raw/indicator.txt",
          expectedOutputDynamic: true,
          check: "The listing shows a symbolic-link marker and the target pathname."
        },
        {
          do: "Resolve the symbolic link to its final target, then move the target and explain the stale-link result.",
          command: "readlink -f /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt\nmv /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/raw/indicator-renamed.txt\nls -l /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt",
          hint: "Resolve the link before changing the target name; after the move, inspect the unchanged pointer and reason about why its old pathname no longer identifies the report.",
          solution: "readlink -f /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt\nmv /tmp/linuxplus-ch03-links/raw/indicator.txt /tmp/linuxplus-ch03-links/raw/indicator-renamed.txt\nls -l /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt",
          expectedOutput: "/tmp/linuxplus-ch03-links/raw/indicator.txt\nlrwxrwxrwx 1 student student 18 Aug 19 10:00 /tmp/linuxplus-ch03-links/review/indicator-symbolic.txt -> ../raw/indicator.txt",
          expectedOutputDynamic: true,
          check: "The original target resolves before the move, and afterward the symbolic link still points to the old pathname."
        }
      ],
      tags: ["links", "hard-link", "symbolic-link", "inode", "readlink", "stale-link", "security"]
    },
    {
      title: "Metadata and File-Type Inspection",
      difficulty: 2,
      minutes: 25,
      scenario: "A triage directory contains a normal report, a hidden review setting, a subdirectory, and a pointer to another artifact. Inspect names, type markers, basic file types, and detailed metadata so the reviewer can distinguish ordinary content from unusual entries.",
      objectives: [
        "Use detailed listings to reveal hidden entries and classify file types",
        "Use file to identify basic file content types",
        "Use stat to inspect detailed metadata",
        "Use inode output to distinguish directory entries",
        "Identify an entry that deserves additional review"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-metadata/evidence`, add a report, a hidden review setting, and a symbolic pointer to the report.",
          command: "mkdir -p /tmp/linuxplus-ch03-metadata/evidence\nprintf 'Case: LNX-03\nFinding: review metadata\n' > /tmp/linuxplus-ch03-metadata/evidence/report.txt\nprintf 'review_scope=initial\n' > /tmp/linuxplus-ch03-metadata/evidence/.reviewrc\nln -s report.txt /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          hint: "Create a regular text file, a period-prefixed hidden file, and a pathname pointer so the later inspection shows different entry types.",
          solution: "mkdir -p /tmp/linuxplus-ch03-metadata/evidence\nprintf 'Case: LNX-03\nFinding: review metadata\n' > /tmp/linuxplus-ch03-metadata/evidence/report.txt\nprintf 'review_scope=initial\n' > /tmp/linuxplus-ch03-metadata/evidence/.reviewrc\nln -s report.txt /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          expectedOutput: "(no output)",
          check: "The evidence directory contains a report, hidden setting, and symbolic pointer."
        },
        {
          do: "List the evidence directory with long metadata, hidden names, readable sizes, and file-type markers.",
          command: "ls -alhF /tmp/linuxplus-ch03-metadata/evidence",
          hint: "Choose the combined listing that exposes hidden entries and appends a visible marker to a directory or symbolic link.",
          solution: "ls -alhF /tmp/linuxplus-ch03-metadata/evidence",
          expectedOutput: "total 12K\ndrwxr-xr-x 2 student student 4.0K Aug 19 10:00 ./\ndrwxr-xr-x 3 student student 4.0K Aug 19 10:00 ../\n-rw-r--r-- 1 student student   21B Aug 19 10:00 .reviewrc\nlrwxrwxrwx 1 student student   10 Aug 19 10:00 report-pointer@ -> report.txt\n-rw-r--r-- 1 student student   39B Aug 19 10:00 report.txt",
          expectedOutputDynamic: true,
          check: "The listing reveals `.reviewrc`, the regular report, and the symbolic pointer."
        },
        {
          do: "Identify the basic types of the report, hidden setting, and pointer.",
          command: "file /tmp/linuxplus-ch03-metadata/evidence/report.txt /tmp/linuxplus-ch03-metadata/evidence/.reviewrc /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          hint: "Use the utility that identifies basic content or link type rather than relying only on a filename extension.",
          solution: "file /tmp/linuxplus-ch03-metadata/evidence/report.txt /tmp/linuxplus-ch03-metadata/evidence/.reviewrc /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          expectedOutput: "/tmp/linuxplus-ch03-metadata/evidence/report.txt: ASCII text\n/tmp/linuxplus-ch03-metadata/evidence/.reviewrc: ASCII text\n/tmp/linuxplus-ch03-metadata/evidence/report-pointer: symbolic link to report.txt",
          expectedOutputDynamic: true,
          check: "The report and hidden setting are identified as text while the pointer is identified as a symbolic link."
        },
        {
          do: "Inspect detailed metadata for the report and pointer, including size, inode, ownership, permissions, and timestamps.",
          command: "stat /tmp/linuxplus-ch03-metadata/evidence/report.txt\nstat /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          hint: "Use the detailed metadata utility and compare the regular file's data record with the pointer's own metadata record.",
          solution: "stat /tmp/linuxplus-ch03-metadata/evidence/report.txt\nstat /tmp/linuxplus-ch03-metadata/evidence/report-pointer",
          expectedOutput: "  File: /tmp/linuxplus-ch03-metadata/evidence/report.txt\n  Size: 39        Blocks: 8          IO Block: 4096   regular file\nDevice: 0,45   Inode: 2345678     Links: 1\nAccess: (0644/-rw-r--r--)  Uid: (1000/ student)   Gid: (1000/ student)\n\n  File: /tmp/linuxplus-ch03-metadata/evidence/report-pointer -> report.txt\n  Size: 10        Blocks: 0          IO Block: 4096   symbolic link\nDevice: 0,45   Inode: 2345679     Links: 1",
          expectedOutputDynamic: true,
          check: "The metadata distinguishes a regular file's content record from the pointer's separate inode and link type."
        },
        {
          do: "Display the directory's own metadata and inode, then decide which entry should receive additional review during a basic security check.",
          command: "ls -ldi /tmp/linuxplus-ch03-metadata/evidence",
          hint: "Request the directory entry itself rather than its contents, include its inode, and use the earlier observations to justify attention to a hidden setting or pointer.",
          solution: "ls -ldi /tmp/linuxplus-ch03-metadata/evidence",
          expectedOutput: "2345670 drwxr-xr-x 2 student student 4096 Aug 19 10:00 /tmp/linuxplus-ch03-metadata/evidence",
          expectedOutputDynamic: true,
          check: "The directory's own inode and metadata are shown, and the review identifies the hidden setting or symbolic pointer as an unusual entry."
        }
      ],
      tags: ["metadata", "file", "stat", "ls", "inode", "hidden-files", "symbolic-link", "triage"]
    },
    {
      title: "Recursive Artifact Search and Command Discovery",
      difficulty: 2,
      minutes: 30,
      scenario: "A temporary incident bundle contains configuration files, logs, and analyst notes at several levels. Search the live directory tree by filename and content, contrast shell wildcards with regular expressions, and record where the search utilities themselves are found.",
      objectives: [
        "Use find for recursive filename and type searches",
        "Use grep for recursive content searches",
        "Distinguish shell wildcard patterns from regular expressions",
        "Limit a recursive search by depth",
        "Use which and whereis for command discovery",
        "Explain locate's database-based limitation"
      ],
      steps: [
        {
          do: "Create a nested incident bundle containing a configuration file, a log, and an analyst note.",
          command: "mkdir -p /tmp/linuxplus-ch03-search/etc/app /tmp/linuxplus-ch03-search/var/log /tmp/linuxplus-ch03-search/home/analyst\nprintf 'API_KEY=training-demo\nmode=staging\n' > /tmp/linuxplus-ch03-search/etc/app/service.conf\nprintf 'INFO service started\nFAILED authentication attempt\n' > /tmp/linuxplus-ch03-search/var/log/service.log\nprintf 'Review the configuration and log together.\n' > /tmp/linuxplus-ch03-search/home/analyst/notes.txt",
          hint: "Create different directory depths and give each artifact a role-specific extension so filename and content searches can be compared.",
          solution: "mkdir -p /tmp/linuxplus-ch03-search/etc/app /tmp/linuxplus-ch03-search/var/log /tmp/linuxplus-ch03-search/home/analyst\nprintf 'API_KEY=training-demo\nmode=staging\n' > /tmp/linuxplus-ch03-search/etc/app/service.conf\nprintf 'INFO service started\nFAILED authentication attempt\n' > /tmp/linuxplus-ch03-search/var/log/service.log\nprintf 'Review the configuration and log together.\n' > /tmp/linuxplus-ch03-search/home/analyst/notes.txt",
          expectedOutput: "(no output)",
          check: "The bundle contains one `.conf`, one `.log`, and one analyst note in different branches."
        },
        {
          do: "Find regular files whose names end in `.conf` anywhere below the incident bundle.",
          command: "find /tmp/linuxplus-ch03-search -type f -name \"*.conf\"",
          hint: "Use a live recursive filesystem search with a regular-file criterion and a shell-style filename pattern.",
          solution: "find /tmp/linuxplus-ch03-search -type f -name \"*.conf\"",
          expectedOutput: "/tmp/linuxplus-ch03-search/etc/app/service.conf",
          check: "The live search returns the configuration file and no directory or log entry."
        },
        {
          do: "Find the configuration assignment by searching file contents recursively with an extended regular expression anchored at the start of a line.",
          command: "grep -R -n -E '^API_KEY=' /tmp/linuxplus-ch03-search",
          hint: "Unlike the filename pattern, the content pattern should describe the beginning of a line and the exact assignment prefix.",
          solution: "grep -R -n -E '^API_KEY=' /tmp/linuxplus-ch03-search",
          expectedOutput: "/tmp/linuxplus-ch03-search/etc/app/service.conf:1:API_KEY=training-demo",
          check: "The recursive content search identifies the configuration line and its source file."
        },
        {
          do: "Search the log branch for failed events without treating letter case as significant, then limit a filename search to the top levels of the bundle.",
          command: "grep -R -n -i failed /tmp/linuxplus-ch03-search/var/log\nfind /tmp/linuxplus-ch03-search -maxdepth 3 -type f -name \"*.log\"",
          hint: "Use a case-insensitive recursive content search for the event word, then use a depth limit to demonstrate that metadata searches can be bounded.",
          solution: "grep -R -n -i failed /tmp/linuxplus-ch03-search/var/log\nfind /tmp/linuxplus-ch03-search -maxdepth 3 -type f -name \"*.log\"",
          expectedOutput: "/tmp/linuxplus-ch03-search/var/log/service.log:2:FAILED authentication attempt\n/tmp/linuxplus-ch03-search/var/log/service.log",
          check: "The log search finds the failed event and the bounded filename search finds the log within the selected depth."
        },
        {
          do: "Record the command path and related source or manual-page locations for the search utility.",
          command: "which grep\nwhereis grep",
          hint: "Use one command that searches the executable path and another that reports the binary, source, and manual-page locations when available.",
          solution: "which grep\nwhereis grep",
          expectedOutput: "/usr/bin/grep\ngrep: /usr/bin/grep /usr/share/man/man1/grep.1.gz",
          expectedOutputDynamic: true,
          check: "The record distinguishes a command's executable path from the broader locations reported for it."
        },
        {
          do: "Create a search handoff file that records why a recently created artifact may be absent from a database-based filename search, then display the note for review.",
          command: "printf 'Live search: find checks the filesystem now.\nDatabase search: locate may miss a recent file until updatedb refreshes its database.\n' > /tmp/linuxplus-ch03-search/search-handoff.txt\ncat /tmp/linuxplus-ch03-search/search-handoff.txt",
          hint: "Turn the live-versus-database distinction into a local handoff artifact; include the database's possible staleness and the operation that refreshes it.",
          solution: "printf 'Live search: find checks the filesystem now.\nDatabase search: locate may miss a recent file until updatedb refreshes its database.\n' > /tmp/linuxplus-ch03-search/search-handoff.txt\ncat /tmp/linuxplus-ch03-search/search-handoff.txt",
          expectedOutput: "Live search: find checks the filesystem now.\nDatabase search: locate may miss a recent file until updatedb refreshes its database.",
          check: "The handoff file records that `find` searches current filesystem state while `locate` can require an `updatedb` refresh."
        }
      ],
      tags: ["find", "grep", "regex", "wildcards", "which", "whereis", "locate", "search"]
    },
    {
      title: "Safe Evidence Cleanup and Formatted Review",
      difficulty: 2,
      minutes: 30,
      scenario: "A junior analyst has finished reviewing a small evidence set but left an empty marker and scratch directory behind. Use safe file-management and text-viewing techniques to document the records, compare two reports side by side, and remove only the disposable empty items.",
      objectives: [
        "Create an empty marker with touch and distinguish it from evidence",
        "Add line numbers while reviewing a text report",
        "Format two reports side by side with pr",
        "Use less for a controlled text review",
        "Remove a disposable file interactively",
        "Remove an empty scratch directory with rmdir"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-cleanup/review` and `/tmp/linuxplus-ch03-cleanup/scratch`, write two short reports, and create an empty disposable marker.",
          command: "mkdir -p /tmp/linuxplus-ch03-cleanup/review /tmp/linuxplus-ch03-cleanup/scratch\nprintf 'Case: LNX-03\nFinding: expected login pattern\nStatus: baseline\n' > /tmp/linuxplus-ch03-cleanup/review/baseline.txt\nprintf 'Case: LNX-03\nFinding: repeated login pattern\nStatus: compare\n' > /tmp/linuxplus-ch03-cleanup/review/observed.txt\ntouch /tmp/linuxplus-ch03-cleanup/review/remove-after-review",
          hint: "Create the evidence files with readable text, then use the file-creation utility that leaves an empty file when no content is supplied.",
          solution: "mkdir -p /tmp/linuxplus-ch03-cleanup/review /tmp/linuxplus-ch03-cleanup/scratch\nprintf 'Case: LNX-03\nFinding: expected login pattern\nStatus: baseline\n' > /tmp/linuxplus-ch03-cleanup/review/baseline.txt\nprintf 'Case: LNX-03\nFinding: repeated login pattern\nStatus: compare\n' > /tmp/linuxplus-ch03-cleanup/review/observed.txt\ntouch /tmp/linuxplus-ch03-cleanup/review/remove-after-review",
          expectedOutput: "(no output)",
          check: "The review directory contains two text reports and one empty disposable marker, while scratch is empty."
        },
        {
          do: "Display the observed report with line numbers so the comparison notes can cite exact lines.",
          command: "cat -n /tmp/linuxplus-ch03-cleanup/review/observed.txt",
          hint: "Use the text-display form that prefixes each line with its position; preserve the report's three-line order.",
          solution: "cat -n /tmp/linuxplus-ch03-cleanup/review/observed.txt",
          expectedOutput: "     1\tCase: LNX-03\n     2\tFinding: repeated login pattern\n     3\tStatus: compare",
          check: "The observed report is shown with line numbers 1 through 3."
        },
        {
          do: "Format the baseline and observed reports side by side for a quick analyst comparison.",
          command: "pr -m /tmp/linuxplus-ch03-cleanup/review/baseline.txt /tmp/linuxplus-ch03-cleanup/review/observed.txt",
          hint: "Use the text formatter's multi-column mode so the two short reports can be compared directly; account for the formatter's page heading in the displayed result.",
          solution: "pr -m /tmp/linuxplus-ch03-cleanup/review/baseline.txt /tmp/linuxplus-ch03-cleanup/review/observed.txt",
          expectedOutput: "Aug 19 2026 baseline.txt                 Aug 19 2026 observed.txt                 Page 1\n\nCase: LNX-03                 Case: LNX-03\nFinding: expected login pattern Finding: repeated login pattern\nStatus: baseline             Status: compare",
          expectedOutputDynamic: true,
          check: "The formatter presents corresponding baseline and observed lines in parallel columns; its heading and spacing may vary by system."
        },
        {
          do: "Open the observed report in a pager, confirm the three-line content, and exit the pager after the review.",
          command: "less /tmp/linuxplus-ch03-cleanup/review/observed.txt",
          hint: "Use the chapter's capable pager for a controlled review of a text file, then use its documented quit action when finished.",
          solution: "less /tmp/linuxplus-ch03-cleanup/review/observed.txt; press q to exit.",
          expectedOutput: "Case: LNX-03\nFinding: repeated login pattern\nStatus: compare",
          expectedOutputDynamic: true,
          check: "The report opens in the pager and the shell prompt returns after the review is closed."
        },
        {
          do: "Remove only the empty disposable marker after confirming it is not one of the two reports.",
          command: "rm -i /tmp/linuxplus-ch03-cleanup/review/remove-after-review",
          hint: "Use the interactive deletion form so the shell asks for confirmation; answer yes only after checking the target name.",
          solution: "rm -i /tmp/linuxplus-ch03-cleanup/review/remove-after-review; enter y when prompted.",
          expectedOutput: "rm: remove regular empty file '/tmp/linuxplus-ch03-cleanup/review/remove-after-review'? y",
          expectedOutputDynamic: true,
          check: "The disposable marker is removed after interactive confirmation and both reports remain."
        },
        {
          do: "Remove the now-empty scratch directory and list the final review directory.",
          command: "rmdir /tmp/linuxplus-ch03-cleanup/scratch\nls -l /tmp/linuxplus-ch03-cleanup/review",
          hint: "The directory-removal command works only when the target is empty; use the final listing to confirm that only the reports remain.",
          solution: "rmdir /tmp/linuxplus-ch03-cleanup/scratch\nls -l /tmp/linuxplus-ch03-cleanup/review",
          expectedOutput: "total 8\n-rw-r--r-- 1 student student 62 Aug 19 10:00 baseline.txt\n-rw-r--r-- 1 student student 61 Aug 19 10:00 observed.txt",
          expectedOutputDynamic: true,
          check: "The scratch directory and marker are gone, while baseline.txt and observed.txt remain in the review directory."
        }
      ],
      tags: ["touch", "cat", "cat-n", "pr", "less", "rm", "rmdir", "safe-cleanup", "evidence"]
    },
    {
      title: "Incremental Evidence Synchronization",
      difficulty: 2,
      minutes: 30,
      scenario: "A small incident collector receives updated logs during a review. Synchronize the incoming evidence to an archive with archive mode, update only what changed, and verify that the archived copies match the current sources.",
      objectives: [
        "Prepare a source and destination for evidence synchronization",
        "Use rsync archive mode for a local evidence copy",
        "Recognize a second synchronization as an incremental update",
        "Use transfer statistics to document the run",
        "Verify synchronized content with diff"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-sync/incoming` and `/tmp/linuxplus-ch03-sync/archive`, then write an authentication log and configuration record in the incoming directory.",
          command: "mkdir -p /tmp/linuxplus-ch03-sync/incoming /tmp/linuxplus-ch03-sync/archive\nprintf 'INFO collector started\nFAILED login user=analyst\n' > /tmp/linuxplus-ch03-sync/incoming/auth.log\nprintf 'mode=staging\nsource=training\n' > /tmp/linuxplus-ch03-sync/incoming/service.conf",
          hint: "Create matching source and destination directories, then give the two artifacts different roles so the later synchronization can be checked file by file.",
          solution: "mkdir -p /tmp/linuxplus-ch03-sync/incoming /tmp/linuxplus-ch03-sync/archive\nprintf 'INFO collector started\nFAILED login user=analyst\n' > /tmp/linuxplus-ch03-sync/incoming/auth.log\nprintf 'mode=staging\nsource=training\n' > /tmp/linuxplus-ch03-sync/incoming/service.conf",
          expectedOutput: "(no output)",
          check: "The incoming directory contains auth.log and service.conf, and the archive directory is empty."
        },
        {
          do: "Synchronize the incoming directory to the archive with archive mode and transfer statistics.",
          command: "rsync -av --stats /tmp/linuxplus-ch03-sync/incoming/ /tmp/linuxplus-ch03-sync/archive/",
          hint: "Use the copy utility intended for repeated transfers, preserve the source directory's attributes, and request a summary of the transfer.",
          solution: "rsync -av --stats /tmp/linuxplus-ch03-sync/incoming/ /tmp/linuxplus-ch03-sync/archive/",
          expectedOutput: "sending incremental file list\nauth.log\nservice.conf\n\nNumber of files: 3 (2 regular)\nNumber of created files: 2\nTotal transferred file size: 78 bytes",
          expectedOutputDynamic: true,
          check: "The first synchronization copies both artifacts and reports transfer statistics."
        },
        {
          do: "Append one new failed-login event to the incoming log and synchronize the directory again.",
          command: "printf 'FAILED login user=admin\n' >> /tmp/linuxplus-ch03-sync/incoming/auth.log\nrsync -av --stats /tmp/linuxplus-ch03-sync/incoming/ /tmp/linuxplus-ch03-sync/archive/",
          hint: "Change only the source log, then repeat the same archive synchronization so the tool can compare current source state with the existing destination.",
          solution: "printf 'FAILED login user=admin\n' >> /tmp/linuxplus-ch03-sync/incoming/auth.log\nrsync -av --stats /tmp/linuxplus-ch03-sync/incoming/ /tmp/linuxplus-ch03-sync/archive/",
          expectedOutput: "sending incremental file list\nauth.log\n\nNumber of files: 3 (2 regular)\nNumber of regular files transferred: 1\nTotal transferred file size: 24 bytes",
          expectedOutputDynamic: true,
          check: "The second run transfers the changed log while leaving the unchanged configuration synchronized."
        },
        {
          do: "Compare both archived files with their current incoming sources and display the archive layout.",
          command: "diff -q /tmp/linuxplus-ch03-sync/incoming/auth.log /tmp/linuxplus-ch03-sync/archive/auth.log\ndiff -q /tmp/linuxplus-ch03-sync/incoming/service.conf /tmp/linuxplus-ch03-sync/archive/service.conf\nls -R /tmp/linuxplus-ch03-sync/archive",
          hint: "Identical comparisons are silent; use the recursive listing last to show that the archive contains both synchronized artifacts.",
          solution: "diff -q /tmp/linuxplus-ch03-sync/incoming/auth.log /tmp/linuxplus-ch03-sync/archive/auth.log\ndiff -q /tmp/linuxplus-ch03-sync/incoming/service.conf /tmp/linuxplus-ch03-sync/archive/service.conf\nls -R /tmp/linuxplus-ch03-sync/archive",
          expectedOutput: "/tmp/linuxplus-ch03-sync/archive:\nauth.log\nservice.conf",
          check: "Both comparisons report no differences and the archive contains auth.log and service.conf."
        },
        {
          do: "Write a synchronization handoff file containing the source, destination, two transfer phases, and verification result, then display it.",
          command: "printf 'Source: /tmp/linuxplus-ch03-sync/incoming/\nDestination: /tmp/linuxplus-ch03-sync/archive/\nInitial run: auth.log and service.conf copied\nSecond run: auth.log updated incrementally\nVerification: no differences\n' > /tmp/linuxplus-ch03-sync/sync-handoff.txt\ncat /tmp/linuxplus-ch03-sync/sync-handoff.txt",
          hint: "Capture the observed transfer history in a local artifact; distinguish the initial copy from the later update and state how equality was checked.",
          solution: "printf 'Source: /tmp/linuxplus-ch03-sync/incoming/\nDestination: /tmp/linuxplus-ch03-sync/archive/\nInitial run: auth.log and service.conf copied\nSecond run: auth.log updated incrementally\nVerification: no differences\n' > /tmp/linuxplus-ch03-sync/sync-handoff.txt\ncat /tmp/linuxplus-ch03-sync/sync-handoff.txt",
          expectedOutput: "Source: /tmp/linuxplus-ch03-sync/incoming/\nDestination: /tmp/linuxplus-ch03-sync/archive/\nInitial run: auth.log and service.conf copied\nSecond run: auth.log updated incrementally\nVerification: no differences",
          check: "The handoff file records both synchronization phases and the successful no-difference verification."
        }
      ],
      tags: ["rsync", "evidence", "archive", "incremental-copy", "diff", "logs"]
    },
    {
      title: "Incident Evidence Collection Capstone",
      difficulty: 3,
      minutes: 35,
      scenario: "You are the junior analyst completing a basic Linux incident handoff. A temporary collection contains a hidden note, an authentication log, a configuration file, and a summary report. Locate the suspicious artifacts, organize copies for review, and verify that the collected evidence matches its sources.",
      objectives: [
        "Create and inspect a self-contained incident dataset",
        "Use hidden-file listings and filename patterns during triage",
        "Search logs and configuration content with grep",
        "Use find to locate artifacts by type and name",
        "Copy evidence into an organized review directory",
        "Verify copied content with diff"
      ],
      steps: [
        {
          do: "Create `/tmp/linuxplus-ch03-capstone/incoming` and `/tmp/linuxplus-ch03-capstone/evidence`, then write the log, configuration, summary, and hidden collection note.",
          command: "mkdir -p /tmp/linuxplus-ch03-capstone/incoming /tmp/linuxplus-ch03-capstone/evidence\nprintf 'INFO service started\nFAILED login user=analyst\nINFO session closed\nFAILED login user=admin\n' > /tmp/linuxplus-ch03-capstone/incoming/auth.log\nprintf 'mode=staging\nAPI_KEY=training-demo\n' > /tmp/linuxplus-ch03-capstone/incoming/service.conf\nprintf 'Case: LNX-03\nStatus: evidence selected\n' > /tmp/linuxplus-ch03-capstone/incoming/summary.txt\nprintf 'Collected by: junior analyst\n' > /tmp/linuxplus-ch03-capstone/incoming/.collection-note",
          hint: "Create the destination before the evidence, and give each artifact a distinct role so you can select only relevant files later.",
          solution: "mkdir -p /tmp/linuxplus-ch03-capstone/incoming /tmp/linuxplus-ch03-capstone/evidence\nprintf 'INFO service started\nFAILED login user=analyst\nINFO session closed\nFAILED login user=admin\n' > /tmp/linuxplus-ch03-capstone/incoming/auth.log\nprintf 'mode=staging\nAPI_KEY=training-demo\n' > /tmp/linuxplus-ch03-capstone/incoming/service.conf\nprintf 'Case: LNX-03\nStatus: evidence selected\n' > /tmp/linuxplus-ch03-capstone/incoming/summary.txt\nprintf 'Collected by: junior analyst\n' > /tmp/linuxplus-ch03-capstone/incoming/.collection-note",
          expectedOutput: "(no output)",
          check: "The incoming directory contains the log, configuration, summary, and hidden collection note."
        },
        {
          do: "Inspect all incoming entries, including the hidden note, and list only the text artifacts selected for initial review by their extensions.",
          command: "ls -alhF /tmp/linuxplus-ch03-capstone/incoming\nls /tmp/linuxplus-ch03-capstone/incoming/*.log /tmp/linuxplus-ch03-capstone/incoming/*.conf /tmp/linuxplus-ch03-capstone/incoming/*.txt",
          hint: "Use one listing for complete intake visibility and another with filename patterns for the log, configuration, and summary groups.",
          solution: "ls -alhF /tmp/linuxplus-ch03-capstone/incoming\nls /tmp/linuxplus-ch03-capstone/incoming/*.log /tmp/linuxplus-ch03-capstone/incoming/*.conf /tmp/linuxplus-ch03-capstone/incoming/*.txt",
          expectedOutput: "total 20K\ndrwxr-xr-x 2 student student 4.0K Aug 19 10:00 ./\ndrwxr-xr-x 4 student student 4.0K Aug 19 10:00 ../\n-rw-r--r-- 1 student student   31B Aug 19 10:00 .collection-note\n-rw-r--r-- 1 student student   99B Aug 19 10:00 auth.log\n-rw-r--r-- 1 student student   36B Aug 19 10:00 service.conf\n-rw-r--r-- 1 student student   39B Aug 19 10:00 summary.txt\n/tmp/linuxplus-ch03-capstone/incoming/auth.log\n/tmp/linuxplus-ch03-capstone/incoming/service.conf\n/tmp/linuxplus-ch03-capstone/incoming/summary.txt",
          expectedOutputDynamic: true,
          check: "The complete listing reveals the hidden note and the wildcard selection returns the three review artifacts."
        },
        {
          do: "Find failed-login entries with line numbers and locate the configuration assignment that should be treated as sensitive evidence.",
          command: "grep -n FAILED /tmp/linuxplus-ch03-capstone/incoming/auth.log\ngrep -n -E '^API_KEY=' /tmp/linuxplus-ch03-capstone/incoming/service.conf",
          hint: "Use line-numbered text searches with one exact event marker and one anchored configuration pattern; the two results represent different evidence types.",
          solution: "grep -n FAILED /tmp/linuxplus-ch03-capstone/incoming/auth.log\ngrep -n -E '^API_KEY=' /tmp/linuxplus-ch03-capstone/incoming/service.conf",
          expectedOutput: "2:FAILED login user=analyst\n4:FAILED login user=admin\n2:API_KEY=training-demo",
          check: "The search identifies both failed-login lines and the configuration line containing the key assignment."
        },
        {
          do: "Use a recursive metadata search to locate the log and configuration files selected for collection.",
          command: "find /tmp/linuxplus-ch03-capstone/incoming -type f -name \"*.log\"\nfind /tmp/linuxplus-ch03-capstone/incoming -type f -name \"*.conf\"",
          hint: "Use filename criteria for regular files and keep the log and configuration patterns separate so the selection is auditable.",
          solution: "find /tmp/linuxplus-ch03-capstone/incoming -type f -name \"*.log\"\nfind /tmp/linuxplus-ch03-capstone/incoming -type f -name \"*.conf\"",
          expectedOutput: "/tmp/linuxplus-ch03-capstone/incoming/auth.log\n/tmp/linuxplus-ch03-capstone/incoming/service.conf",
          check: "The live search returns exactly the log and configuration artifacts selected for collection."
        },
        {
          do: "Copy the log, configuration, and summary into the evidence directory while leaving the incoming originals in place.",
          command: "cp -a /tmp/linuxplus-ch03-capstone/incoming/auth.log /tmp/linuxplus-ch03-capstone/incoming/service.conf /tmp/linuxplus-ch03-capstone/incoming/summary.txt /tmp/linuxplus-ch03-capstone/evidence",
          hint: "Use one archive-mode copy with multiple source files and the evidence directory as the final destination; do not include the hidden collection note in the evidence set.",
          solution: "cp -a /tmp/linuxplus-ch03-capstone/incoming/auth.log /tmp/linuxplus-ch03-capstone/incoming/service.conf /tmp/linuxplus-ch03-capstone/incoming/summary.txt /tmp/linuxplus-ch03-capstone/evidence",
          expectedOutput: "(no output)",
          check: "The evidence directory contains copies of the three selected artifacts and the incoming originals remain available."
        },
        {
          do: "Compare every collected file with its incoming source and display the final evidence layout.",
          command: "diff -q /tmp/linuxplus-ch03-capstone/incoming/auth.log /tmp/linuxplus-ch03-capstone/evidence/auth.log\ndiff -q /tmp/linuxplus-ch03-capstone/incoming/service.conf /tmp/linuxplus-ch03-capstone/evidence/service.conf\ndiff -q /tmp/linuxplus-ch03-capstone/incoming/summary.txt /tmp/linuxplus-ch03-capstone/evidence/summary.txt\nls -R /tmp/linuxplus-ch03-capstone/evidence",
          hint: "Identical comparisons are silent; use the recursive listing last to show exactly which files were placed in the review directory.",
          solution: "diff -q /tmp/linuxplus-ch03-capstone/incoming/auth.log /tmp/linuxplus-ch03-capstone/evidence/auth.log\ndiff -q /tmp/linuxplus-ch03-capstone/incoming/service.conf /tmp/linuxplus-ch03-capstone/evidence/service.conf\ndiff -q /tmp/linuxplus-ch03-capstone/incoming/summary.txt /tmp/linuxplus-ch03-capstone/evidence/summary.txt\nls -R /tmp/linuxplus-ch03-capstone/evidence",
          expectedOutput: "/tmp/linuxplus-ch03-capstone/evidence:\nauth.log\nservice.conf\nsummary.txt",
          check: "All comparisons report no differences and the evidence directory contains the three selected files."
        }
      ],
      tags: ["incident-response", "evidence", "ls", "wildcards", "grep", "find", "cp", "diff", "logs"]
    }
  ]
});
