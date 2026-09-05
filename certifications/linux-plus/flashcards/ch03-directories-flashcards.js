window.ReviewApp.content.register({
  type: "flashcards",
  cert: "linux-plus",
  chapter: "Ch 03 · Managing Files and Directories",
  items: [
    { front: "What is the GNU/Linux shell?", back: "An interactive utility that lets users run programs, manage files, and handle processes; it provides the command-line interface (CLI).", tags: ["shell", "basics"] },
    { front: "What is the command-line interface (CLI)?", back: "A text-based prompt provided by the shell where commands can be entered and run as programs.", tags: ["shell", "basics"] },
    { front: "Absolute pathname", back: "The full pathname to a file or directory starting from the root, e.g. /etc/passwd.", tags: ["paths"] },
    { front: "Relative pathname", back: "The pathname of a target relative to your current directory in the tree, e.g. ./subfolder or ../subfolder.", tags: ["paths"] },
    
    { front: "What is a user's home directory?", back: "A location unique to the user account for storing personal files; you're placed there at login.", tags: ["paths", "home"] },
    { front: "What does the ~ metacharacter represent?", back: "The current user's home directory; ~mary refers to another user's (mary's) home directory.", tags: ["metacharacters", "home"] },
    { front: "pwd", back: "Prints the current working directory (the directory you're presently located in).", tags: ["navigation"] },
    
    
    { front: "Tab-completion", back: "A BASH shell feature: type enough unique letters of a name and press Tab to auto-complete; if multiple matches exist, it lists possibilities.", tags: ["shell", "basics"] },
    { front: "/ (root)", back: "Root filesystem; contains all directories not mounted separately.", tags: ["fhs"] },
    { front: "/boot", back: "Holds the Linux kernel, initramfs, and boot-related files.", tags: ["fhs"] },
    
    
    
    
    
    
    { front: "/opt", back: "Holds optional/third-party application software.", tags: ["fhs"] },
    
    { front: "/tmp", back: "Temporary files used by programs.", tags: ["fhs"] },
    
    
    
    { front: "/proc", back: "A virtual filesystem exposing process and kernel information.", tags: ["fhs"] },
    { front: "/sys", back: "A virtual filesystem exposing device and kernel interfaces.", tags: ["fhs"] },
    
    
    
    
    
    { front: "; (metacharacter)", back: "Terminates/separates commands on the same line.", tags: ["metacharacters"] },
    { front: "< << > >> (metacharacters)", back: "Input/output redirection symbols.", tags: ["metacharacters"] },
    { front: "| (metacharacter)", back: "Pipes the output of one command into another as input.", tags: ["metacharacters"] },
    { front: "Shell wildcards: * ? [ ]", back: "* matches anything, ? matches a single character, [ ] matches a defined range/set of characters.", tags: ["metacharacters", "wildcards"] },
    { front: "Metacharacter quotes: ' \" \\", back: "' = treat text literally; \" = allow variable expansion; \\ = escape the next character.", tags: ["metacharacters"] },
    { front: "( ) { } (metacharacters)", back: "Used for command grouping.", tags: ["metacharacters"] },
    { front: "echo", back: "Prints text to the terminal screen.", tags: ["shell", "basics"] },
    { front: "List the 7 Linux file types", back: "Text files, binary data files, executable programs, directory files, linked files, special device files, and named pipes/sockets.", tags: ["file-types"] },
    { front: "What are binary data files?", back: "Files containing machine language (0s and 1s) that store info such as common functions and graphics, usually supporting a program.", tags: ["file-types"] },
    { front: "Are directories actually files?", back: "Yes — directories are special files that act as placeholders to organize other data.", tags: ["file-types"] },
    { front: "Linked files", back: "Files associated with one another; they may represent the same data or point to another file (like a shortcut).", tags: ["file-types", "links"] },
    
    { front: "Named pipe files", back: "Files that pass information from one process in memory to another; one process writes while another reads.", tags: ["file-types"] },
    { front: "Socket files", back: "A variant of named pipe files that lets a process on another computer write to a file while a local process reads from it.", tags: ["file-types"] },
    { front: "Max filename length in Linux", back: "255 characters, typically alphanumeric characters plus underscore ( _ ), dash ( - ), and period ( . ).", tags: ["filenames"] },
    { front: "Hidden files", back: "Files whose names start with a period ( . ); view them with ls -a.", tags: ["filenames"] },
    { front: "Are file extensions required in Linux?", back: "No — unlike Windows, Linux extensions are optional; the OS doesn't rely on them to identify file type.", tags: ["filenames"] },
    { front: ".sh extension", back: "Shell script — a text file containing commands executed by the shell.", tags: ["filenames", "extensions"] },
    
    { front: ".tar / .gz / .tar.gz extensions", back: ".tar = archive of files; .gz/.bz2/.xz/.Z = compressed files; .tar.gz/.tgz = compressed archived files.", tags: ["filenames", "extensions"] },
    { front: "virtual directory", back: "The single merged directory structure combining files from all storage devices into one tree, based at the root directory.", tags: ["paths", "basics"] },
    { front: "ls — Important options", back: "-a → show all files incl. hidden\n-d → show a directory's own metadata, not contents\n-F → append type indicator (*, /, =, >, @, |)\n-i → show inode number\n-l → long listing (type, perms, links, owner, group, mtime, name)\n-R → recursive listing\n-h → human-readable sizes (use with -l)", tags: ["ls", "commands"] },
    { front: "ls -F symbols", back: "/ = directory, * = executable, @ = symbolic link, | = named pipe (FIFO), = = socket, nothing = regular file.", tags: ["ls", "file-types"] },
    { front: "What is 'present working directory'?", back: "Your login process's current location in the virtual directory structure; shown via pwd, and ls with no args lists its contents.", tags: ["navigation", "basics"] },
    { front: "ls -l field order", back: "Type+permissions, number of hard links, owner, group, file size, last modified date, filename.", tags: ["ls", "permissions"] },
    { front: "ls -l first character = file type", back: "- regular file, d directory, l symbolic link, c character device, b block device, p named pipe, s socket.", tags: ["ls", "file-types"] },
    { front: "Where do you find a command's syntax in man pages?", back: "In the Synopsis section of the command's man page.", tags: ["man", "basics"] },
    
    { front: "lsof command", back: "'List open files' — displays all files currently open by a user or process on the system.", tags: ["commands"] },
    { front: "touch", back: "Creates empty files, or updates a file's access/modification timestamps if it already exists; accepts multiple filenames.", tags: ["commands", "files"] },
    { front: "How does a directory locate a file?", back: "A directory is a special file storing each contained file's name along with that file's inode number.", tags: ["file-types", "directories"] },
    { front: "mkdir — Important options", back: "-p → create missing parent directories as needed\n-v → print confirmation message for each directory created", tags: ["mkdir", "commands"] },
    { front: "What happens if mkdir is used on a nested path without -p?", back: "It fails with 'No such file or directory' because the parent directory doesn't exist yet.", tags: ["mkdir", "commands"] },
    { front: "cp — Important options", back: "-a → archive: recursive copy preserving perms/ownership/timestamps\n-f → force overwrite\n-i → prompt before overwrite\n-n → never overwrite\n-R/-r → recursive copy of directories\n-u → only overwrite if source is newer\n-v → verbose", tags: ["cp", "commands"] },
    
    { front: "mv — Important options", back: "-f → force overwrite\n-i → prompt before overwrite\n-n → never overwrite\n-u → only overwrite if source is newer\n-v → verbose", tags: ["mv", "commands"] },
    { front: "Can mv move and rename a file in one command?", back: "Yes — the source uses the file's current path/name, the destination uses the new path/name.", tags: ["mv", "commands"] },
    { front: "rsync", back: "Used for fast copies of large files or many files at once; often used for backups and can securely copy over a network, typically tunneled through OpenSSH.", tags: ["rsync", "commands"] },
    { front: "rsync — Important options", back: "-a → archive mode (shorthand for -rlptgoD)\n-r → recursive\n-v → verbose\n-h → human-readable sizes\n--progress → show copy progress\n--stats → show transfer statistics", tags: ["rsync", "commands"] },
    { front: "rsync speedup rating", back: "Indicates how many files didn't need copying because they were already backed up and unmodified; a single-file copy always shows 1.00.", tags: ["rsync"] },
    { front: "rm — Important options", back: "-d → delete empty directories\n-f → force, suppress prompts/errors\n-i → prompt before each deletion\n-I → prompt once before deleting >3 files or recursively\n-R/-r → recursive deletion\n-v → verbose", tags: ["rm", "commands"] },
    { front: "Why always use rm -i?", back: "It's a good habit to confirm each deletion so you don't accidentally delete the wrong file.", tags: ["rm", "safety"] },
    { front: "rmdir", back: "Removes only empty directories; -p removes a full tree of empty directories, -v confirms each removal.", tags: ["rmdir", "commands"] },
    { front: "rm -d vs rmdir", back: "rm -d removes only the empty directories within a tree that also has non-empty ones; rmdir fails outright if any target directory has contents.", tags: ["rm", "rmdir"] },
    { front: "Hard link definition", back: "A file with one inode number but at least two different filenames; both names point to the same underlying data.", tags: ["links", "hard-link"] },
    { front: "ln (hard link)", back: "Creates a hard link: ln <original-file> <linked-file>. The original must already exist; the new filename must not.", tags: ["links", "commands"] },
    { front: "Rules for hard links", back: "Original must exist first; new name must not exist; shares inode number and data with original; can be in different directories; must be on the same filesystem.", tags: ["links", "hard-link"] },
    { front: "unlink", back: "Removes a single linked file (hard or soft) without touching the original.", tags: ["links", "commands"] },
    { front: "Soft (symbolic) link definition", back: "A pointer to a file's name/location that may reside on a different filesystem; does not share an inode number with the original.", tags: ["links", "soft-link"] },
    { front: "ln -s (soft link)", back: "Creates a symbolic link: ln -s <original-file> <linked-file>.", tags: ["links", "commands"] },
    { front: "Rules for soft links", back: "Original must exist first; new name must not exist; does NOT share inode number or data; can span different directories and different filesystems.", tags: ["links", "soft-link"] },
    { front: "readlink -f", back: "Resolves a chain of soft links to reveal the final target file's name and location.", tags: ["links", "commands"] },
    { front: "Stale (dead) link", back: "A soft link pointing to a file that's been deleted or moved; it's not auto-removed, and a malicious file placed at that name/location could be silently followed — a security risk.", tags: ["links", "security"] },
    { front: "How to tell a hard link from a soft link via ls -i?", back: "Hard-linked files share the same inode number; soft-linked files show different inode numbers.", tags: ["links", "ls"] },
    { front: "cat", back: "Concatenates and displays files; often used to display a single small text file. -n adds line numbers.", tags: ["cat", "commands"] },
    { front: "bat", back: "A modern clone of cat ('cat with wings') offering extra features like syntax highlighting.", tags: ["cat", "tools"] },
    { front: "pr command", back: "Formats/displays text (originally for printing), useful for viewing files side by side.", tags: ["pr", "commands"] },
    { front: "pr — Important options", back: "-n → column format with n columns\n-l n → set page length (default 66)\n-m → merge/display multiple files in parallel columns\n-s c → set column separator\n-t → omit header/trailer\n-w n → set page width (default 72)", tags: ["pr", "commands"] },
    { front: "paste command", back: "Glues two files together side by side; quick, but output isn't necessarily aligned or pretty.", tags: ["commands"] },
    { front: "grep", back: "Searches for text patterns within files. Syntax: grep [OPTIONS] <pattern> [FILE]...", tags: ["grep", "commands"] },
    { front: "grep — Important options", back: "-i → ignore case\n-v → invert match (show non-matching lines)\n-n → show line numbers\n-c → show count of matching lines", tags: ["grep", "commands"] },
    { front: "Is grep case-sensitive by default?", back: "Yes — use -i to search regardless of case.", tags: ["grep"] },
    { front: "egrep / grep -E", back: "Allows use of extended regular expressions.", tags: ["grep", "regex"] },
    { front: "fgrep / grep -F", back: "Does not interpret regular expressions; returns results much faster than plain grep.", tags: ["grep", "regex"] },
    { front: "head", back: "Displays a file's first lines (default 10). -n N shows first N lines; a negative N shows all but the last N lines.", tags: ["head", "commands"] },
    { front: "tail", back: "Displays a file's last lines (default 10). -n N shows last N lines; -n +N starts at line N from the top; -f follows new appended lines live.", tags: ["tail", "commands"] },
    { front: "tail -f", back: "Watches a file and displays new lines as they're appended — useful for live-monitoring logs; press Ctrl+C to stop.", tags: ["tail", "logs"] },
    { front: "journalctl --follow", back: "Watches new messages being added to the systemd journal, used on distros that replace flat log files with journald.", tags: ["logs", "journald"] },
    { front: "more (pager)", back: "A simple pager: spacebar advances a page, Enter advances a line; cannot move backward; q exits.", tags: ["more", "pagers"] },
    { front: "less (pager)", back: "A flexible pager supporting backward movement and searching (unlike more); it's the default man page pager and reads large files faster than more.", tags: ["less", "pagers"] },
    { front: "less key commands", back: "Spacebar → forward page\nEsc+V → backward page\nArrow keys → move up/down\n/ then term → search forward\n? then term → search backward\nq → exit", tags: ["less", "pagers"] },
    { front: "file command", back: "Provides basic information about a file's type (e.g. shell script, ASCII text).", tags: ["file", "commands"] },
    { front: "stat command", back: "Displays detailed metadata: size, inode number, device, permissions, owner/group, and access/modify/change timestamps.", tags: ["stat", "commands"] },
    { front: "diff — Important options", back: "-e → generate an ed script to transform file1 into file2\n-q → brief: just report whether files differ\n-r → recursively compare directories\n-s → report when files are identical\n-W n → cap output width\n-y → side-by-side display", tags: ["diff", "commands"] },
    { front: "diff output notation (e.g. 2,3c2,3)", back: "Means lines 2–3 of the first file must be changed to match lines 2–3 of the second; diff also uses 'a' for additions and 'd' for deletions.", tags: ["diff"] },
    { front: "sdiff", back: "Compares two files and displays them side by side (one file per column), easier to read than raw diff output.", tags: ["diff", "commands"] },
    { front: "which", back: "Shows the full pathname of a shell command by searching directories in $PATH; if not found, lists the directories searched instead.", tags: ["which", "commands"] },
    
    { front: "How does which reveal aliases?", back: "It shows the alias definition (e.g. alias ls='ls --color=auto') along with the underlying binary path.", tags: ["which", "alias"] },
    { front: "whereis", back: "Locates a command's program binary, source code files, and man pages.", tags: ["whereis", "commands"] },
    { front: "locate", back: "Searches the prebuilt mlocate.db database (in /var/lib/mlocate/) to check whether a file exists on the system.", tags: ["locate", "commands"] },
    { front: "locate — Important options", back: "-A → match all patterns given\n-b → match filename only (ignore directory)\n-c → show count only\n-i → ignore case\n-q → suppress error messages\n-r → use a regular expression\n-w → match full pathname (default)", tags: ["locate", "commands"] },
    { front: "locate and wildcards", back: "A pattern with no wildcards is auto-wrapped in wildcards (passwd becomes *passwd*); quote/use -b for an exact basename search.", tags: ["locate", "wildcards"] },
    { front: "How often is locate's database updated?", back: "Typically once daily via a scheduled job; run updatedb manually (as superuser) to refresh it immediately.", tags: ["locate", "updatedb"] },
    { front: "updatedb", back: "Manually refreshes the locate database (mlocate.db); requires superuser privileges and may take a while.", tags: ["locate", "commands"] },
    { front: "find command", back: "A flexible utility to locate files based on metadata like owner, modification time, or permissions. Syntax: find [PATH...] [OPTION] [EXPRESSION].", tags: ["find", "commands"] },
    { front: "find — Time-based criteria", back: "-amin -/+x → accessed less/more than x min ago\n-atime -/+x → accessed less/more than x days ago\n-mmin -/+x → modified less/more than x min ago\n-mtime -/+x → modified less/more than x days ago", tags: ["find", "commands"] },
    { front: "find — Other common criteria", back: "-empty → empty files/dirs\n-fstype x → files on filesystem type x\n-group x → owned by group/GID x\n-inum x → file with inode x\n-name x → match filename x\n-regex x → match filename via regex\n-size -/+x → size less/more/equal to x\n-user x → owned by user/UID x\n-maxdepth n → limit search depth to n levels", tags: ["find", "commands"] },
    { front: "find -type values", back: "b = block, c = character, d = directory, p = named pipe, f = regular file, l = symbolic link, s = socket.", tags: ["find", "file-types"] },
    { front: "find /usr/bin -perm /4000", back: "Audits for the SUID permission bit (octal 4000), useful for finding potentially dangerous SUID binaries.", tags: ["find", "permissions", "security"] },
    { front: "grep -d skip", back: "Tells grep to skip directories (instead of erroring) while searching a path like /etc/*.", tags: ["grep", "commands"] }
  ]
});
