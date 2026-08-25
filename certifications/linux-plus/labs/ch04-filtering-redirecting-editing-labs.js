window.ReviewApp.content.register({
type: "labs",
cert: "linux-plus",
chapter: "Ch 04 · Processing and Editing Text",
items: [
{
title: "Triage a User Account Export",
difficulty: 1,
minutes: 20,
scenario: "A junior administrator has received a local account export and needs to quickly identify shell assignments, isolate selected fields, and verify how many accounts use a restricted shell. Work only with the supplied sample data and use command-line filtering tools to produce concrete results.",
objectives: [
"Search records with grep",
"Extract delimited fields with cut",
"Use regular-expression anchors",
"Count matching records with wc"
],
mockData: [
{
name: "Account export",
filename: "accounts.txt",
description: "A colon-delimited account export modeled on the structure of /etc/passwd for filtering practice.",
content: "root:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice:/home/alice:/bin/bash\nbob:x:1002:1002:Bob:/home/bob:/sbin/nologin\ncarol:x:1003:1003:Carol:/home/carol:/bin/zsh\ndave:x:1004:1004:Dave:/home/dave:/sbin/nologin\nsvcbackup:x:998:998:Backup Service:/var/backups:/sbin/nologin"
}
],
steps: [
{
do: "Inspect the first two records so you can confirm the file structure and delimiter before filtering.",
command: "head -2 accounts.txt",
hint: "Start by viewing a small portion of the input rather than processing the entire file. The first field boundaries should reveal how the records are structured.",
solution: "head -2 accounts.txt",
expectedOutput: "root:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice:/home/alice:/bin/bash",
check: "The first two colon-delimited account records are displayed."
},
{
do: "Extract only the usernames and login shells from every account record.",
command: "cut -d ':' -f 1,7 accounts.txt",
hint: "The records use a single character between fields. Select the first and seventh fields after identifying that separator.",
solution: "cut -d ':' -f 1,7 accounts.txt",
expectedOutput: "root:/bin/bash\nalice:/bin/bash\nbob:/sbin/nologin\ncarol:/bin/zsh\ndave:/sbin/nologin\nsvcbackup:/sbin/nologin",
check: "Each record shows only its username and shell."
},
{
do: "Find only the records whose shell is exactly /sbin/nologin.",
command: "grep '/sbin/nologin$' accounts.txt",
hint: "The shell value is at the end of each record. Anchor the search so that the target text must occur at the end of the line.",
solution: "grep '/sbin/nologin$' accounts.txt",
expectedOutput: "bob:x:1002:1002:Bob:/home/bob:/sbin/nologin\ndave:x:1004:1004:Dave:/home/dave:/sbin/nologin\nsvcbackup:x:998:998:Backup Service:/var/backups:/sbin/nologin",
check: "Three account records end with /sbin/nologin."
},
{
do: "Count how many account records use the restricted shell.",
command: "grep '/sbin/nologin$' accounts.txt | wc -l",
hint: "First produce only the matching records, then use the line-counting statistic on that filtered stream.",
solution: "grep '/sbin/nologin$' accounts.txt | wc -l",
expectedOutput: "3",
check: "The pipeline reports a count of 3."
}
],
tags: ["grep", "cut", "regex", "wc", "pipes"]
},
{
title: "Normalize and Analyze Access Records",
difficulty: 2,
minutes: 25,
scenario: "A service owner has exported a small access log. Your task is to identify repeated source addresses, count occurrences, and isolate useful fields for a quick operational summary.",
objectives: [
"Sort records before using uniq",
"Count duplicate values with uniq",
"Use cut with a custom delimiter",
"Combine filtering, extraction, sorting, and counting"
],
mockData: [
{
name: "Web access records",
filename: "access_sample.log",
description: "Pipe-delimited access records containing source address, user, action, and result.",
content: "192.0.2.15|alice|LOGIN|SUCCESS\n192.0.2.27|bob|LOGIN|FAIL\n192.0.2.15|alice|LIST|SUCCESS\n192.0.2.44|carol|LOGIN|SUCCESS\n192.0.2.27|bob|LOGIN|FAIL\n192.0.2.15|alice|LOGIN|SUCCESS\n192.0.2.44|carol|LIST|SUCCESS"
}
],
steps: [
{
do: "Extract only the source address from each record.",
command: "cut -d '|' -f 1 access_sample.log",
hint: "The first field is separated from the rest of each record by a consistent delimiter. Extract that field without changing the input file.",
solution: "cut -d '|' -f 1 access_sample.log",
expectedOutput: "192.0.2.15\n192.0.2.27\n192.0.2.15\n192.0.2.44\n192.0.2.27\n192.0.2.15\n192.0.2.44",
check: "Seven source addresses are displayed, one per line."
},
{
do: "Sort the extracted source addresses so identical values become adjacent.",
command: "cut -d '|' -f 1 access_sample.log | sort",
hint: "The duplicate-filtering tool works on adjacent lines, so arrange identical values next to one another first.",
solution: "cut -d '|' -f 1 access_sample.log | sort",
expectedOutput: "192.0.2.15\n192.0.2.15\n192.0.2.15\n192.0.2.27\n192.0.2.27\n192.0.2.44\n192.0.2.44",
check: "The addresses are alphabetically sorted with identical addresses grouped."
},
{
do: "Count how many records came from each source address.",
command: "cut -d '|' -f 1 access_sample.log | sort | uniq -c",
hint: "After sorting the values, use the duplicate filter's counting capability to summarize each adjacent run.",
solution: "cut -d '|' -f 1 access_sample.log | sort | uniq -c",
expectedOutput: "      3 192.0.2.15\n      2 192.0.2.27\n      2 192.0.2.44",
check: "The source counts are 3, 2, and 2 respectively."
},
{
do: "Display only records that contain the LOGIN action.",
command: "grep '|LOGIN|' access_sample.log",
hint: "Search for the action as a field value rather than matching a partial word that could appear elsewhere in a record.",
solution: "grep '|LOGIN|' access_sample.log",
expectedOutput: "192.0.2.15|alice|LOGIN|SUCCESS\n192.0.2.27|bob|LOGIN|FAIL\n192.0.2.44|carol|LOGIN|SUCCESS\n192.0.2.27|bob|LOGIN|FAIL\n192.0.2.15|alice|LOGIN|SUCCESS",
check: "Five LOGIN records remain after filtering."
},
{
do: "Count only the failed LOGIN records.",
command: "grep '|LOGIN|FAIL$' access_sample.log | wc -l",
hint: "Combine a field-specific search with an end-of-line anchor so the final status must be FAIL, then count the remaining records.",
solution: "grep '|LOGIN|FAIL$' access_sample.log | wc -l",
expectedOutput: "2",
check: "The filtered count is 2 failed LOGIN records."
}
],
tags: ["grep", "cut", "sort", "uniq", "wc", "pipes"]
},
{
title: "Build an Auditing Output Pipeline",
difficulty: 2,
minutes: 25,
scenario: "You are preparing a small audit report from a local configuration-like file. The goal is to demonstrate safe output redirection, append additional evidence, suppress unwanted errors, and preserve a copy of live pipeline output for later review.",
objectives: [
"Redirect STDOUT to files",
"Append output without overwriting existing content",
"Redirect STDERR independently",
"Use tee in a pipeline",
"Suppress unwanted errors with /dev/null"
],
steps: [
{
do: "Create a small audit input file using formatted output rather than typing the records interactively.",
command: "printf '%s\n' 'root:/bin/bash' 'alice:/bin/bash' 'bob:/sbin/nologin' 'carol:/bin/zsh' > audit_users.txt",
hint: "Use the shell's formatted text-output facility and an explicit newline for each record. Store the resulting text in a new local file.",
solution: "printf '%s\n' 'root:/bin/bash' 'alice:/bin/bash' 'bob:/sbin/nologin' 'carol:/bin/zsh' > audit_users.txt",
expectedOutput: "(no output)",
check: "The audit_users.txt file is created without terminal output."
},
{
do: "Save the restricted-shell records into a report file.",
command: "grep '/sbin/nologin$' audit_users.txt > restricted_report.txt",
hint: "Use the pattern that identifies the target shell and redirect the matching records to a new report file.",
solution: "grep '/sbin/nologin$' audit_users.txt > restricted_report.txt",
expectedOutput: "(no output)",
check: "The report file receives the matching account record."
},
{
do: "Append a timestamp-style label to the existing report without replacing its current contents.",
command: "echo 'Review complete' >> restricted_report.txt",
hint: "The report already contains useful data. Choose the output operator that preserves existing content and adds a new line.",
solution: "echo 'Review complete' >> restricted_report.txt",
expectedOutput: "(no output)",
check: "The label is appended after the existing report entry."
},
{
do: "Display the complete report and confirm that both the filtered record and appended label are present.",
command: "cat restricted_report.txt",
hint: "Read the resulting file directly and verify the order of the two pieces of information.",
solution: "cat restricted_report.txt",
expectedOutput: "bob:/sbin/nologin\nReview complete",
check: "The report contains the nologin record followed by Review complete."
},
{
do: "Run a recursive search against /etc while saving errors separately from normal output.",
command: "grep -r 'root' /etc/ 2> audit_errors.log",
hint: "Normal matches should remain visible while filesystem access problems should be separated into the error stream.",
solution: "grep -r 'root' /etc/ 2> audit_errors.log",
expectedOutput: "/etc/group:root:x:0:\n/etc/passwd:root:x:0:0:root:/root:/bin/bash\n/etc/shells:/bin/bash",
expectedOutputDynamic: true,
check: "Matching output remains on screen while any STDERR is written to audit_errors.log; exact matches vary by system."
},
{
do: "Capture matching lines to a file while still displaying them as the pipeline runs.",
command: "grep 'nologin' audit_users.txt | tee nologin_live.txt",
hint: "Use a pipeline stage that duplicates its input: one copy should go to a file while the other continues to the terminal.",
solution: "grep 'nologin' audit_users.txt | tee nologin_live.txt",
expectedOutput: "bob:/sbin/nologin",
check: "The matching line is displayed and also stored in nologin_live.txt."
}
],
tags: ["redirection", "stdout", "stderr", "tee", "grep", "printf"]
},
{
title: "Investigate Text Differences",
difficulty: 2,
minutes: 25,
scenario: "A configuration backup and a revised configuration have diverged. Review the supplied files, compare them in multiple formats, create a unified patch, and verify the practical difference between the two versions.",
objectives: [
"Compare files with diff",
"Use unified and side-by-side diff output",
"Ignore whitespace during comparison",
"Create a patch file with redirection"
],
mockData: [
{
name: "Original configuration",
filename: "server_old.conf",
description: "Baseline configuration used as the reference version.",
content: "Port=22\nPermitRootLogin=no\nPasswordAuthentication=yes\nLogLevel=INFO\n"
},
{
name: "Revised configuration",
filename: "server_new.conf",
description: "Updated configuration containing a changed port, authentication setting, and log level.",
content: "Port=2222\nPermitRootLogin=no\nPasswordAuthentication=no\nLogLevel=VERBOSE\n"
}
],
steps: [
{
do: "Compare the baseline and revised configurations using normal diff output.",
command: "diff server_old.conf server_new.conf",
hint: "Compare the two files directly first so you can see which lines changed and how diff represents additions and removals.",
solution: "diff server_old.conf server_new.conf",
expectedOutput: "1c1\n< Port=22\n---\n> Port=2222\n3,4c3,4\n< PasswordAuthentication=yes\n< LogLevel=INFO\n---\n> PasswordAuthentication=no\n> LogLevel=VERBOSE",
check: "The comparison identifies three changed configuration values."
},
{
do: "Produce the same comparison in unified format.",
command: "diff -u server_old.conf server_new.conf",
hint: "Choose the diff format intended to provide compact changes together with surrounding context.",
solution: "diff -u server_old.conf server_new.conf",
expectedOutput: "--- server_old.conf\n+++ server_new.conf\n@@ -1,4 +1,4 @@\n-Port=22\n+Port=2222\n PermitRootLogin=no\n-PasswordAuthentication=yes\n-LogLevel=INFO\n+PasswordAuthentication=no\n+LogLevel=VERBOSE",
expectedOutputDynamic: true,
check: "Unified output shows removed lines with - and added lines with +; filename headers may vary."
},
{
do: "Display the comparison side by side for a visual review.",
command: "diff -y server_old.conf server_new.conf",
hint: "Use the comparison format designed to place corresponding lines beside each other.",
solution: "diff -y server_old.conf server_new.conf",
expectedOutput: "Port=22                 | Port=2222\nPermitRootLogin=no        PermitRootLogin=no\nPasswordAuthentication=yes | PasswordAuthentication=no\nLogLevel=INFO            | LogLevel=VERBOSE",
check: "Corresponding old and new lines appear beside each other."
},
{
do: "Create a reusable unified patch file from the two configurations.",
command: "diff -u server_old.conf server_new.conf > server_changes.patch",
hint: "Generate the patch-oriented comparison format and redirect the result into a file so another system can consume it later.",
solution: "diff -u server_old.conf server_new.conf > server_changes.patch",
expectedOutput: "(no output)",
check: "The server_changes.patch file is created and contains the unified differences."
},
{
do: "Inspect the generated patch file.",
command: "cat server_changes.patch",
hint: "Read the artifact you just created and verify that it contains the unified comparison rather than an empty file.",
solution: "cat server_changes.patch",
expectedOutput: "--- server_old.conf\n+++ server_new.conf\n@@ -1,4 +1,4 @@\n-Port=22\n+Port=2222\n PermitRootLogin=no\n-PasswordAuthentication=yes\n-LogLevel=INFO\n+PasswordAuthentication=no\n+LogLevel=VERBOSE",
check: "The patch contains the expected old/new configuration differences."
}
],
tags: ["diff", "patch", "redirection", "configuration"]
},
{
title: "Process a Log with xargs and Shell Expansion",
difficulty: 3,
minutes: 30,
scenario: "A temporary workspace contains a list of candidate log files and several numbered artifacts. You need to process those filenames safely, demonstrate controlled argument construction, use command substitution for a generated filename, and create a related group of files with Bash brace expansion.",
objectives: [
"Use xargs to construct command arguments",
"Handle filenames safely with NUL delimiters",
"Use command substitution",
"Use brace expansion",
"Use wc through xargs"
],
mockData: [
{
name: "Filename list",
filename: "log_files.list",
description: "A list of filenames including one name containing a space to demonstrate NUL-safe processing.",
content: "app.log\nproxy log.log\nsecurity.log\n"
}
],
steps: [
{
do: "Create the three sample log files so the filename-processing workflow has concrete local targets.",
command: "printf '%s\n' 'INFO app started' > app.log; printf '%s\n' 'WARN delayed request' > 'proxy log.log'; printf '%s\n' 'ALERT policy check' > security.log",
hint: "Create the files with the exact names represented in the supplied list. One filename intentionally contains whitespace.",
solution: "printf '%s\n' 'INFO app started' > app.log; printf '%s\n' 'WARN delayed request' > 'proxy log.log'; printf '%s\n' 'ALERT policy check' > security.log",
expectedOutput: "(no output)",
check: "Three sample log files are present in the current workspace."
},
{
do: "Use the supplied filename list to count lines in each file one at a time.",
command: "cat log_files.list | xargs -n 1 wc -l",
hint: "Feed each filename from the list into a command invocation separately. Notice that the whitespace-containing name is a boundary case.",
solution: "cat log_files.list | xargs -n 1 wc -l",
expectedOutput: "      1 app.log\n      1 proxy\nwc: log.log: No such file or directory\n      1 security.log",
check: "The first and third files count correctly, while the spaced filename demonstrates why ordinary whitespace splitting is unsafe."
},
{
do: "Create a NUL-delimited list of the filenames and process it with xargs so the spaced filename remains one argument.",
command: "printf '%s\0' 'app.log' 'proxy log.log' 'security.log' | xargs -0 -n 1 wc -l",
hint: "The safe solution needs an input separator that cannot be confused with spaces inside a filename. Supply the names using that delimiter and tell the argument consumer to expect it.",
solution: "printf '%s\0' 'app.log' 'proxy log.log' 'security.log' | xargs -0 -n 1 wc -l",
expectedOutput: "      1 app.log\n      1 proxy log.log\n      1 security.log",
check: "All three filenames, including proxy log.log, are treated as single arguments."
},
{
do: "Generate a dated backup filename with command substitution.",
command: "printf '%s\n' \"backup_$(date +%Y%m%d).tar.gz\"",
hint: "Embed the output of a command inside the larger string. The result should combine a fixed prefix with the command's generated date value.",
solution: "printf '%s\n' \"backup_$(date +%Y%m%d).tar.gz\"",
expectedOutput: "backup_20260823.tar.gz",
expectedOutputDynamic: true,
check: "A backup filename containing the current date is produced; the date varies with the system date."
},
{
do: "Use brace expansion to generate ten numbered text filenames.",
command: "printf '%s\n' file{1..10}.txt",
hint: "Use the Bash feature that expands a numeric range inside braces into multiple strings before printf receives them.",
solution: "printf '%s\n' file{1..10}.txt",
expectedOutput: "file1.txt\nfile2.txt\nfile3.txt\nfile4.txt\nfile5.txt\nfile6.txt\nfile7.txt\nfile8.txt\nfile9.txt\nfile10.txt",
check: "Ten filenames from file1.txt through file10.txt are generated."
}
],
tags: ["xargs", "command-substitution", "brace-expansion", "printf", "wc"]
},
{
title: "Edit and Validate a Service Configuration",
difficulty: 3,
minutes: 35,
scenario: "A junior administrator has to make several controlled text changes to a service configuration. Practice stream editing first, verify the resulting content, then use Vim command and Ex modes to inspect and modify a second copy.",
objectives: [
"Perform substitutions with sed",
"Select lines with sed",
"Use Vim navigation and search",
"Use Vim substitution and save/quit commands",
"Validate edited files"
],
mockData: [
{
name: "Service configuration",
filename: "service.conf",
description: "A small configuration file containing values that will be reviewed and changed.",
content: "Port=8080\nPermitDebug=yes\nLogLevel=INFO\nBackend=[http://app.internal\nWorkers=4\n](http://app.internal\nWorkers=4\n)"
}
],
steps: [
{
do: "Create a working copy of the supplied configuration without changing the original file.",
command: "cp service.conf service_work.conf",
hint: "Preserve the supplied baseline and perform your edits on a separate working artifact.",
solution: "cp service.conf service_work.conf",
expectedOutput: "(no output)",
check: "A separate service_work.conf copy exists for editing."
},
{
do: "Preview the configuration with the debug setting changed from yes to no, without editing the file in place.",
command: "sed 's/PermitDebug=yes/PermitDebug=no/' service_work.conf",
hint: "Use a stream substitution that changes only the targeted text and prints the transformed result rather than modifying the source file.",
solution: "sed 's/PermitDebug=yes/PermitDebug=no/' service_work.conf",
expectedOutput: "Port=8080\nPermitDebug=no\nLogLevel=INFO\nBackend=[http://app.internal\nWorkers=4](http://app.internal\nWorkers=4)",
check: "The displayed stream shows PermitDebug=no while the stored file remains unchanged."
},
{
do: "Print only the configuration lines covering the logging and backend settings.",
command: "sed -n '3,4p' service_work.conf",
hint: "Use the quiet mode and explicitly print a contiguous range of line numbers.",
solution: "sed -n '3,4p' service_work.conf",
expectedOutput: "LogLevel=INFO\nBackend=[http://app.internal](http://app.internal)",
check: "Only lines 3 and 4 are displayed."
},
{
do: "Apply the debug change directly to the working copy.",
command: "sed -i 's/PermitDebug=yes/PermitDebug=no/' service_work.conf",
hint: "The preview already demonstrated the desired transformation. Now apply that substitution to the working file itself.",
solution: "sed -i 's/PermitDebug=yes/PermitDebug=no/' service_work.conf",
expectedOutput: "(no output)",
check: "The working copy is modified in place."
},
{
do: "Open the working configuration in Vim and search for the Backend entry.",
command: "vim service_work.conf",
hint: "Enter the interactive editor, then use its command-mode search capability to locate a known configuration token without scanning manually.",
solution: "vim service_work.conf",
expectedOutput: "\"service_work.conf\" 5L, 91C",
expectedOutputDynamic: true,
check: "Vim opens the five-line working configuration and allows command-mode searching."
},
{
do: "While in Vim command mode, replace the log level INFO with VERBOSE throughout the file, then write the file and quit.",
command: ":%s/LogLevel=INFO/LogLevel=VERBOSE/g | :wq",
hint: "Use the Ex substitution form that targets the entire file and then use a write-and-quit command. Return to command mode before entering colon commands.",
solution: ":%s/LogLevel=INFO/LogLevel=VERBOSE/g\n:wq",
expectedOutput: "(no output)",
check: "Vim saves the working configuration and returns to the shell."
},
{
do: "Verify the final working configuration.",
command: "cat service_work.conf",
hint: "Read the complete file and check both edits rather than checking only one line.",
solution: "cat service_work.conf",
expectedOutput: "Port=8080\nPermitDebug=no\nLogLevel=VERBOSE\nBackend=[http://app.internal\nWorkers=4](http://app.internal\nWorkers=4)",
check: "PermitDebug is no and LogLevel is VERBOSE in the saved file."
}
],
tags: ["sed", "vim", "configuration", "substitution"]
},
{
title: "Automate a Text-Analysis Report",
difficulty: 3,
minutes: 35,
scenario: "You have been asked to produce a compact report from a colon-delimited service inventory. Combine awk field processing, filtering, sorting, counting, and formatted output to turn raw records into useful administrative evidence.",
objectives: [
"Extract fields with awk",
"Filter records numerically with awk",
"Use NR and END",
"Combine awk with sort and uniq",
"Produce formatted output with printf"
],
mockData: [
{
name: "Service inventory",
filename: "service_inventory.txt",
description: "Colon-delimited service records containing service name, owner, numeric priority, and state.",
content: "ssh:system:10:enabled\nhttp:system:20:enabled\nbackup:ops:30:enabled\nmonitor:ops:20:disabled\napi:dev:30:enabled\nworker:dev:10:disabled\nmetrics:ops:30:enabled"
}
],
steps: [
{
do: "Print each service name together with its state using the colon delimiter.",
command: "awk -F: '{print $1, $4}' service_inventory.txt",
hint: "The required values are the first and fourth fields. Tell the field processor which character separates the records.",
solution: "awk -F: '{print $1, $4}' service_inventory.txt",
expectedOutput: "ssh enabled\nhttp enabled\nbackup enabled\nmonitor disabled\napi enabled\nworker disabled\nmetrics enabled",
check: "Seven service/state pairs are displayed."
},
{
do: "Identify services whose numeric priority is greater than 20.",
command: "awk -F: '$3 > 20 {print $1}' service_inventory.txt",
hint: "The priority is a numeric field. Compare that field against the threshold and print only the service name for matching records.",
solution: "awk -F: '$3 > 20 {print $1}' service_inventory.txt",
expectedOutput: "backup\napi\nmetrics",
check: "The three services with priority above 20 are listed."
},
{
do: "Count the total number of service records with awk.",
command: "awk 'END {print NR}' service_inventory.txt",
hint: "The total number of input records is available as a built-in line counter at the end of processing.",
solution: "awk 'END {print NR}' service_inventory.txt",
expectedOutput: "7",
check: "The record count is 7."
},
{
do: "Extract the owner field and count how many services belong to each owner.",
command: "awk -F: '{print $2}' service_inventory.txt | sort | uniq -c",
hint: "First extract the owner field, then group identical values before asking the duplicate filter to count them.",
solution: "awk -F: '{print $2}' service_inventory.txt | sort | uniq -c",
expectedOutput: "      2 dev\n      4 ops\n      2 system",
check: "The owner counts are dev 2, ops 4, and system 2."
},
{
do: "Create a formatted report header using printf.",
command: "printf '%-15s %10s %10s\n' 'SERVICE' 'PRIORITY' 'STATE'",
hint: "Use width specifications in printf so the three column headings line up consistently.",
solution: "printf '%-15s %10s %10s\n' 'SERVICE' 'PRIORITY' 'STATE'",
expectedOutput: "SERVICE            PRIORITY      STATE",
check: "Three aligned report columns are displayed."
},
{
do: "Generate a formatted report containing each service name, priority, and state.",
command: "awk -F: '{printf \"%-15s %10s %10s\n\", $1, $3, $4}' service_inventory.txt",
hint: "Use the same three fields already identified and pass them through a formatted output specification.",
solution: "awk -F: '{printf \"%-15s %10s %10s\n\", $1, $3, $4}' service_inventory.txt",
expectedOutput: "ssh                     10 enabled\nhttp                    20 enabled\nbackup                  30 enabled\nmonitor                 20 disabled\napi                     30 enabled\nworker                  10 disabled\nmetrics                 30 enabled",
check: "All seven services appear in aligned service, priority, and state columns."
}
],
tags: ["awk", "printf", "sort", "uniq", "pipes"]
},
{
title: "Capstone: Incident Text Triage",
difficulty: 3,
minutes: 40,
scenario: "A security operations ticket contains a small incident log. Triage the records, isolate failures, summarize repeated source addresses, preserve evidence in a report, and inspect the resulting artifact without modifying the original evidence file.",
objectives: [
"Combine grep and regular expressions",
"Extract fields with cut",
"Sort and count repeated values",
"Build a multi-stage pipeline",
"Preserve evidence with tee and redirection",
"Validate the resulting report"
],
mockData: [
{
name: "Incident log",
filename: "incident.log",
description: "A self-contained incident log containing source address, account, event type, and result fields.",
content: "2026-08-23T18:02:11|192.0.2.15|alice|LOGIN|SUCCESS\n2026-08-23T18:03:41|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:04:02|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:05:13|192.0.2.15|alice|LIST|SUCCESS\n2026-08-23T18:06:28|192.0.2.91|bob|LOGIN|SUCCESS\n2026-08-23T18:07:44|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:08:19|192.0.2.91|bob|LOGIN|SUCCESS\n2026-08-23T18:09:55|192.0.2.15|alice|LOGIN|FAIL\n2026-08-23T18:10:31|192.0.2.44|carol|LOGIN|SUCCESS"
}
],
steps: [
{
do: "Find every failed login event and display the complete matching record.",
command: "grep '|LOGIN|FAIL$' incident.log",
hint: "The event contains multiple fields. Match the LOGIN field and require FAIL to occur at the end of the record.",
solution: "grep '|LOGIN|FAIL$' incident.log",
expectedOutput: "2026-08-23T18:03:41|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:04:02|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:07:44|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:09:55|192.0.2.15|alice|LOGIN|FAIL",
check: "Four failed LOGIN records are displayed."
},
{
do: "Extract only the source addresses from the failed login events.",
command: "grep '|LOGIN|FAIL$' incident.log | cut -d '|' -f 2",
hint: "Filter the incident records first, then use the record delimiter to extract the second field.",
solution: "grep '|LOGIN|FAIL$' incident.log | cut -d '|' -f 2",
expectedOutput: "192.0.2.77\n192.0.2.77\n192.0.2.77\n192.0.2.15",
check: "The failed-login source addresses are extracted from four records."
},
{
do: "Identify which source addresses generated the most repeated failures.",
command: "grep '|LOGIN|FAIL$' incident.log | cut -d '|' -f 2 | sort | uniq -c | sort -rn",
hint: "Build the analysis in stages: filter failures, isolate the source field, group equal values, count them, then order the counts from largest to smallest.",
solution: "grep '|LOGIN|FAIL$' incident.log | cut -d '|' -f 2 | sort | uniq -c | sort -rn",
expectedOutput: "      3 192.0.2.77\n      1 192.0.2.15",
check: "192.0.2.77 has three failures and 192.0.2.15 has one."
},
{
do: "Save every failed login record to an evidence report while also displaying the records.",
command: "grep '|LOGIN|FAIL$' incident.log | tee failed_logins.report",
hint: "Duplicate the filtered stream so one copy remains visible and another becomes a persistent local evidence artifact.",
solution: "grep '|LOGIN|FAIL$' incident.log | tee failed_logins.report",
expectedOutput: "2026-08-23T18:03:41|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:04:02|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:07:44|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:09:55|192.0.2.15|alice|LOGIN|FAIL",
check: "The four failure records are displayed and saved to failed_logins.report."
},
{
do: "Count the number of evidence records in the saved report.",
command: "wc -l failed_logins.report",
hint: "The evidence report contains one event per line, so use the text statistic that counts records by line.",
solution: "wc -l failed_logins.report",
expectedOutput: "4 failed_logins.report",
check: "The report contains 4 lines."
},
{
do: "Display the final evidence report for a last validation pass.",
command: "cat failed_logins.report",
hint: "Read the saved artifact rather than rerunning the original search so you validate what was actually preserved.",
solution: "cat failed_logins.report",
expectedOutput: "2026-08-23T18:03:41|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:04:02|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:07:44|192.0.2.77|admin|LOGIN|FAIL\n2026-08-23T18:09:55|192.0.2.15|alice|LOGIN|FAIL",
check: "The saved report contains exactly the four failed login events identified during triage."
}
],
tags: ["grep", "cut", "sort", "uniq", "tee", "wc", "incident-response"]
}
]
});
