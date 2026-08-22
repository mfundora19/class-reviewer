window.ReviewApp.content.register({
type: "questions",
cert: "linux-plus",
chapter: "Ch 03 · Files, Directories & Search",
items: [
{
q: "Which pathname is an absolute pathname on Linux?",
type: "mcq",
options: ["/etc/passwd", "etc/passwd", "./etc/passwd", "../etc/passwd", "home/etc/passwd"],
answer: 0,
explain: "An absolute pathname starts at the root directory, `/`. The other choices are relative pathnames.",
tags: ["paths", "absolute"]
},
{
q: "Which command displays your current working directory?",
type: "mcq",
options: ["cd", "pwd", "ls", "whereis", "whoami"],
answer: 1,
explain: "`pwd` prints the working directory. `cd` changes directories, while `ls` lists directory contents.",
tags: ["paths", "pwd"]
},
{
q: "What does `cd` with no argument do?",
type: "mcq",
options: ["Moves to the root directory", "Moves to the previous directory", "Returns to the user's home directory", "Lists the current directory", "Stays in the current directory"],
answer: 2,
explain: "Plain `cd` returns you to your home directory. `cd -` instead returns to the previous working directory.",
tags: ["paths", "cd"]
},
{
q: "Which metacharacter refers to the current user's home directory?",
type: "mcq",
options: ["$", "~", "#", "&", "!"],
answer: 1,
explain: "`~` is the special home-directory variable. `$` is used for shell variables.",
tags: ["paths", "metacharacters"]
},
{
q: "Which command changes to another user's home directory when supported by the shell?",
type: "mcq",
options: ["cd @mary", "cd ~mary", "cd $mary", "cd /mary", "cd /~mary"],
answer: 1,
explain: "`~mary` refers to Mary's home directory, so `cd ~mary` changes there.",
tags: ["paths", "cd", "metacharacters"]
},
{
q: "What is a relative pathname?",
type: "mcq",
options: ["A pathname interpreted from the root directory regardless of the current working directory.", "A pathname interpreted from the current working directory rather than from the root directory.", "A pathname that contains only a filename and never includes a directory component.", "A pathname stored in a system configuration file such as `/etc`, not in the directory tree.", "A pathname expanded from the user's home directory before the command runs."],
answer: 1,
explain: "A relative pathname is interpreted from the current working directory. An absolute pathname starts at `/`.",
tags: ["paths", "relative"]
},
{
q: "In the Linux directory tree, what is the parent directory?",
type: "mcq",
options: ["The directory closest to `/dev` in the filesystem tree, regardless of the current path.", "The directory one level closer to the root than the current directory in the tree.", "The home directory assigned to the current user rather than the current path's parent.", "The directory that contains the system administrator's home directory in every case.", "The directory one level farther from the root than the current directory."],
answer: 1,
explain: "The parent directory is one level closer to the root than the current directory.",
tags: ["paths", "directories"]
},
{
q: "Which shell feature lets you type enough unique characters and press Tab to complete a pathname?",
type: "mcq",
options: ["Piping", "Tab completion", "Command grouping", "Variable expansion", "Command substitution"],
answer: 1,
explain: "Bash provides Tab completion. If multiple matches exist, it can present the possibilities.",
tags: ["bash", "paths"]
},
{
q: "Which directory contains system-wide configuration files?",
type: "mcq",
options: ["/etc", "/var", "/srv", "/opt", "/var/config"],
answer: 0,
explain: "`/etc` stores system-wide configuration files. `/var` stores variable data such as logs and caches.",
tags: ["filesystem", "etc"]
},
{
q: "Which directory contains user home directories?",
type: "mcq",
options: ["/home", "/root", "/usr", "/tmp", "/users"],
answer: 0,
explain: "`/home` contains ordinary users' home directories. `/root` is specifically the root user's home directory.",
tags: ["filesystem", "home"]
},
{
q: "Which directory is the home directory for the root user?",
type: "mcq",
options: ["/home/root", "/root", "/usr/root", "/var/root", "/home/admin"],
answer: 1,
explain: "The notes identify `/root` as the root user's home directory.",
tags: ["filesystem", "root"]
},
{
q: "Where are Linux kernel and boot-related files normally stored?",
type: "mcq",
options: ["/boot", "/etc", "/run", "/usr/src", "/var/lib/boot"],
answer: 0,
explain: "`/boot` contains the Linux kernel, initramfs, and boot-related files.",
tags: ["filesystem", "boot"]
},
{
q: "Which directory is associated with UEFI bootloaders and the EFI System Partition?",
type: "mcq",
options: ["/boot/efi", "/etc/efi", "/usr/efi", "/var/efi", "/boot/grub"],
answer: 0,
explain: "The notes identify `/boot/efi` as the EFI System Partition for UEFI bootloaders.",
tags: ["filesystem", "uefi"]
},
{
q: "Which directory contains most system commands and utilities?",
type: "mcq",
options: ["/usr", "/var", "/srv", "/mnt", "/home"],
answer: 0,
explain: "`/usr` contains most system commands and utilities, along with libraries and other shared data.",
tags: ["filesystem", "usr"]
},
{
q: "Which subdirectory contains user binary commands?",
type: "mcq",
options: ["/usr/bin", "/usr/sbin", "/usr/lib", "/usr/src", "/usr/share"],
answer: 0,
explain: "The notes identify `/usr/bin` as the location for user binary commands.",
tags: ["filesystem", "usr", "bin"]
},
{
q: "Which `/usr` subdirectory contains system binary commands?",
type: "mcq",
options: ["/usr/share", "/usr/sbin", "/usr/include", "/usr/local", "/usr/bin"],
answer: 1,
explain: "`/usr/sbin` contains system binary commands. `/usr/bin` contains user binary commands.",
tags: ["filesystem", "usr", "sbin"]
},
{
q: "Which `/usr` subdirectories contain libraries?",
type: "mcq",
options: ["/usr/lib and /usr/lib64", "/usr/bin and /usr/sbin", "/usr/src and /usr/share", "/usr/local and /usr/include", "/usr/libexec and /usr/share"],
answer: 0,
explain: "The notes list `/usr/lib` and `/usr/lib64` as library directories.",
tags: ["filesystem", "libraries"]
},
{
q: "Which directory is intended for optional or third-party application software?",
type: "mcq",
options: ["/opt", "/srv", "/tmp", "/media", "/usr/share"],
answer: 0,
explain: "`/opt` is used for optional or third-party application software.",
tags: ["filesystem", "opt"]
},
{
q: "Which directory contains variable data such as logs, spools, caches, and databases?",
type: "mcq",
options: ["/var", "/usr", "/boot", "/proc", "/etc"],
answer: 0,
explain: "`/var` contains variable data. Its subdirectories include `/var/log`, `/var/lib`, and `/var/cache`.",
tags: ["filesystem", "var"]
},
{
q: "Which directory contains system and application logs?",
type: "mcq",
options: ["/var/log", "/var/lib", "/var/cache", "/run/log", "/var/spool"],
answer: 0,
explain: "`/var/log` is used for system and application logs.",
tags: ["filesystem", "logs", "var"]
},
{
q: "Which directory is used for temporary files created by programs?",
type: "mcq",
options: ["/tmp", "/srv", "/mnt", "/run", "/var/cache"],
answer: 0,
explain: "`/tmp` contains temporary files used by programs.",
tags: ["filesystem", "tmp"]
},
{
q: "Which directory is intended for data served by system services such as web or FTP services?",
type: "mcq",
options: ["/srv", "/media", "/opt", "/proc", "/usr/share"],
answer: 0,
explain: "`/srv` contains data served by system services, such as web, FTP, or repositories.",
tags: ["filesystem", "srv"]
},
{
q: "Which directory is a temporary manual mount point?",
type: "mcq",
options: ["/mnt", "/media", "/run", "/boot", "/home"],
answer: 0,
explain: "`/mnt` is described as a temporary manual mount point. `/media` is for automatically mounted removable media.",
tags: ["filesystem", "mounts"]
},
{
q: "Which directory is commonly used for automatically mounted removable media such as USB devices and DVDs?",
type: "mcq",
options: ["/media", "/mnt", "/dev", "/srv", "/sys"],
answer: 0,
explain: "`/media` is used for auto-mounted removable media.",
tags: ["filesystem", "media"]
},
{
q: "Which directory is a virtual filesystem containing process and kernel information?",
type: "mcq",
options: ["/proc", "/sys", "/dev", "/run", "/etc/kernel"],
answer: 0,
explain: "`/proc` is a virtual filesystem for process and kernel information. `/sys` exposes devices and kernel interfaces.",
tags: ["filesystem", "proc"]
},
{
q: "Which directory contains device files?",
type: "mcq",
options: ["/dev", "/proc", "/sys", "/run", "/sys/kernel"],
answer: 0,
explain: "`/dev` contains device files, usually through devtmpfs.",
tags: ["filesystem", "dev", "devices"]
},
{
q: "Which directory stores runtime process state and replaces `/var/run`?",
type: "mcq",
options: ["/run", "/tmp", "/proc", "/var/lib", "/var/tmp"],
answer: 0,
explain: "`/run` stores runtime process state and replaces `/var/run`.",
tags: ["filesystem", "run"]
},
{
q: "Which shell metacharacter expands to a shell variable's value?",
type: "mcq",
options: ["$", "#", ";", "|", "%"],
answer: 0,
explain: "`$` tells the shell that the following text refers to a variable.",
tags: ["metacharacters", "variables"]
},
{
q: "Which shell metacharacter runs a command in the background?",
type: "mcq",
options: ["&", ";", "#", ">", "!"],
answer: 0,
explain: "`&` causes command execution in the background. `;` terminates one command before another.",
tags: ["metacharacters", "background"]
},
{
q: "Which metacharacter is used for command piping?",
type: "mcq",
options: ["|", ">", "&", "$", ">>"],
answer: 0,
explain: "`|` pipes the output of one command into another command.",
tags: ["metacharacters", "pipe"]
},
{
q: "Which wildcard represents any number of characters?",
type: "mcq",
options: ["?", "*", "[ ]", "~", "{ }"],
answer: 1,
explain: "The `*` wildcard represents anything, while `?` represents a single character.",
tags: ["wildcards", "metacharacters"]
},
{
q: "Which wildcard represents a single character?",
type: "mcq",
options: ["*", "?", "[ ]", "#", "{ }"],
answer: 1,
explain: "`?` matches a single character. `*` can match any number of characters.",
tags: ["wildcards", "metacharacters"]
},
{
q: "Which shell metacharacter is used for a range wildcard?",
type: "mcq",
options: ["[ ]", "*", "?", "{ }", "~"],
answer: 0,
explain: "`[ ]` is identified in the notes as the range wildcard.",
tags: ["wildcards", "metacharacters"]
},
{
q: "What is the purpose of single quotes in shell metacharacter handling?",
type: "mcq",
options: ["Allow variables to expand", "Treat text literally", "Run text in the background", "Create a pipeline", "Perform command substitution"],
answer: 1,
explain: "Single quotes make the enclosed text literal. Double quotes allow variables.",
tags: ["quoting", "metacharacters"]
},
{
q: "Which quoting form allows variables to expand?",
type: "mcq",
options: ["Single quotes", "Double quotes", "Backslashes only", "Parentheses", "Here documents"],
answer: 1,
explain: "The notes state that double quotes allow variables, while single quotes preserve literal text.",
tags: ["quoting", "variables"]
},
{
q: "What is the primary purpose of `echo`?",
type: "mcq",
options: ["Display text on the terminal", "Create a directory", "Delete a file", "Search the filesystem", "Read input from the terminal"],
answer: 0,
explain: "`echo` prints text to the terminal screen.",
tags: ["shell", "echo"]
},
{
q: "Which filename characteristic makes a file hidden in Linux?",
type: "mcq",
options: ["It ends in `.hidden`", "It begins with a period", "It contains a dash", "It has no extension", "It is owned by the root user"],
answer: 1,
explain: "Files whose names begin with `.` are hidden files. `ls -a` displays them.",
tags: ["filenames", "hidden"]
},
{
q: "Which command lists hidden files in a directory?",
type: "mcq",
options: ["ls -h", "ls -a", "ls -R", "ls -d", "ls -l"],
answer: 1,
explain: "`ls -a` displays all file and subdirectory names, including hidden files.",
tags: ["ls", "hidden"]
},
{
q: "Which statement about Linux file extensions is correct?",
type: "mcq",
options: ["Every executable must end in `.exe`", "Extensions are mandatory", "Extensions are optional", "Only text files may have extensions", "Extensions determine file permissions"],
answer: 2,
explain: "Linux does not require filename extensions; they are optional.",
tags: ["filenames", "extensions"]
},
{
q: "What is the maximum filename length in Linux?",
type: "mcq",
options: ["64 characters", "128 characters", "255 characters", "1024 characters", "512 characters"],
answer: 2,
explain: "The notes state that filenames can include up to 255 characters.",
tags: ["filenames"]
},
{
q: "Which command displays file and subdirectory names along with metadata?",
type: "mcq",
options: ["ls", "cat", "file", "stat", "pwd"],
answer: 0,
explain: "`ls` lists files and directories and can display metadata. `stat` provides more detailed metadata for a file.",
tags: ["ls", "metadata"]
},
{
q: "Which `ls` option displays a directory's own metadata instead of its contents?",
type: "mcq",
options: ["-a", "-d", "-R", "-i", "-D"],
answer: 1,
explain: "`-d` displays the directory entry itself instead of listing its contents.",
tags: ["ls", "options"]
},
{
q: "Which `ls` option appends indicators showing file types?",
type: "mcq",
options: ["-F", "-h", "-l", "-R", "-g"],
answer: 0,
explain: "`ls -F` appends type indicators such as `/` for directories and `*` for executables.",
tags: ["ls", "options"]
},
{
q: "Which `ls` option displays inode numbers?",
type: "mcq",
options: ["-i", "-n", "-o", "-I", "-L"],
answer: 0,
explain: "`ls -i` displays each file's inode number.",
tags: ["ls", "inode"]
},
{
q: "Which `ls` option produces the long listing format?",
type: "mcq",
options: ["-l", "-a", "-d", "-F", "-n"],
answer: 0,
explain: "`-l` displays file type, permissions, hard link count, owner, group, modification time, and filename.",
tags: ["ls", "permissions"]
},
{
q: "Which `ls` option recursively lists a directory tree?",
type: "mcq",
options: ["-R", "-r", "-d", "-F", "-S"],
answer: 0,
explain: "`-R` recursively displays a directory and all subdirectories in its tree.",
tags: ["ls", "recursive"]
},
{
q: "What does `ls -lh` add compared with `ls -l`?",
type: "mcq",
options: ["Hidden files", "Recursive output", "Human-readable file sizes", "Inode numbers", "Colorized file names"],
answer: 2,
explain: "`-h` makes sizes human-readable, such as `30K`, when used with long listing.",
tags: ["ls", "human-readable"]
},
{
q: "In an `ls -l` entry, what does the first character `d` represent?",
type: "mcq",
options: ["Device", "Directory", "Data file", "Daemon", "Document"],
answer: 1,
explain: "The first character identifies file type, and `d` means directory.",
tags: ["ls", "filetypes"]
},
{
q: "In an `ls -l` entry, what does the first character `l` represent?",
type: "mcq",
options: ["Log file", "Library", "Symbolic link", "Local file", "Regular file"],
answer: 2,
explain: "The leading `l` identifies a symbolic link.",
tags: ["ls", "symlink"]
},
{
q: "Which command creates an empty file or updates a file's timestamps?",
type: "mcq",
options: ["mkdir", "touch", "cat", "file", "chmod"],
answer: 1,
explain: "`touch` creates an empty file if needed or updates access and modification timestamps for an existing file.",
tags: ["touch", "files"]
},
{
q: "Which command creates a directory?",
type: "mcq",
options: ["mkdir", "rmdir", "touch", "cp", "chmod"],
answer: 0,
explain: "`mkdir` creates directories. `rmdir` removes empty directories.",
tags: ["mkdir", "directories"]
},
{
q: "Which `mkdir` option creates missing parent directories automatically?",
type: "mcq",
options: ["-v", "-p", "-m", "-Z", "-d"],
answer: 1,
explain: "`mkdir -p` creates any missing parent directories needed for the full path.",
tags: ["mkdir", "options"]
},
{
q: "Which `mkdir` option prints a message for each directory created?",
type: "mcq",
options: ["-p", "-v", "-m", "-Z", "-d"],
answer: 1,
explain: "`-v` is verbose and reports each directory created.",
tags: ["mkdir", "options"]
},
{
q: "What happens when `mkdir Projects/42/` is run and `Projects` does not exist?",
type: "mcq",
options: ["Both directories are created automatically", "The command fails unless `-p` is used", "Only `42` is created", "The shell changes to `Projects`", "Only the parent directory is created"],
answer: 1,
explain: "Without `-p`, `mkdir` fails if required parent directories do not already exist.",
tags: ["mkdir", "paths"]
},
{
q: "Which command returns to the previous working directory?",
type: "mcq",
options: ["cd ..", "cd -", "cd ~", "cd /", "cd /home"],
answer: 1,
explain: "`cd -` jumps to the previous working directory. Plain `cd` returns home.",
tags: ["cd", "paths"]
},
{
q: "Which command copies a file or directory locally?",
type: "mcq",
options: ["mv", "cp", "rsync", "ln", "chmod"],
answer: 1,
explain: "`cp` copies files or directories. `mv` moves or renames them.",
tags: ["cp", "files"]
},
{
q: "What does `cp` require in its basic syntax?",
type: "mcq",
options: ["Only a source", "Only a destination", "A source and a destination", "A source and a pipe", "A source and a permission mask"],
answer: 2,
explain: "Both the source and destination are required in the basic `cp` syntax.",
tags: ["cp", "syntax"]
},
{
q: "Which option is required by `cp` when copying a directory tree?",
type: "mcq",
options: ["-h", "-R", "-i", "-u", "-f"],
answer: 1,
explain: "`-R` or `-r` recursively copies a directory and its contents.",
tags: ["cp", "recursive"]
},
{
q: "What does `cp` do when asked to copy a directory without `-R` or `-r`?",
type: "mcq",
options: ["Copies only the directory entry and skips its contents.", "Refuses the directory and reports that it is omitting the directory.", "Deletes the directory before copying its contents as a regular file.", "Converts the directory into a regular file at the destination.", "Creates an empty destination directory."],
answer: 1,
explain: "Without recursive mode, `cp` refuses to copy a directory and reports `cp: omitting directory`.",
tags: ["cp", "recursive"]
},
{
q: "Which `cp` option preserves permissions, ownership, and timestamps while copying recursively?",
type: "mcq",
options: ["-a", "-f", "-n", "-v", "-R"],
answer: 0,
explain: "`-a` is archive mode and performs a recursive copy while preserving permissions, ownership, and timestamps.",
tags: ["cp", "archive"]
},
{
q: "Which `cp` option asks before overwriting an existing destination file?",
type: "mcq",
options: ["-i", "-f", "-u", "-n", "-R"],
answer: 0,
explain: "`-i` is interactive and asks for confirmation before overwriting an existing destination file.",
tags: ["cp", "overwrite"]
},
{
q: "Which `cp` option guarantees that an existing destination file is not overwritten?",
type: "mcq",
options: ["-f", "-i", "-n", "-u", "-R"],
answer: 2,
explain: "`-n` means no-clobber and never overwrites an existing destination file.",
tags: ["cp", "overwrite"]
},
{
q: "Which command moves or renames a file or directory?",
type: "mcq",
options: ["mv", "cp", "ln", "rsync", "install"],
answer: 0,
explain: "`mv` moves files or directories and can also rename them.",
tags: ["mv", "files"]
},
{
q: "Can `mv` rename a directory without a special recursive option?",
type: "mcq",
options: ["Yes", "No, `-R` is required", "Only with `-p`", "Only for empty directories", "Only when the directory is mounted"],
answer: 0,
explain: "Renaming an entire directory with `mv` works like renaming a file and requires no extra option.",
tags: ["mv", "directories"]
},
{
q: "Which command can move a file to a new directory and rename it in one operation?",
type: "mcq",
options: ["mv", "cp", "ln", "touch", "mkdir"],
answer: 0,
explain: "`mv source new-location/new-name` can move and rename in a single command.",
tags: ["mv", "paths"]
},
{
q: "Which command is useful for fast copies of large numbers of files and backups?",
type: "mcq",
options: ["rmdir", "rsync", "cat", "which", "tar"],
answer: 1,
explain: "`rsync` is used for fast copying of large files or many files and is commonly used for backups.",
tags: ["rsync", "backup"]
},
{
q: "Which `rsync` option enables archive mode?",
type: "mcq",
options: ["-a", "-h", "-t", "--stats", "-r"],
answer: 0,
explain: "`-a` is archive mode and is shorthand for `-rlptgoD`.",
tags: ["rsync", "archive"]
},
{
q: "Which command is the main utility for removing files and directory trees?",
type: "mcq",
options: ["rm", "rmdir", "mv", "cp", "unlink"],
answer: 0,
explain: "`rm` is the main deletion utility. `rmdir` specifically removes empty directories.",
tags: ["rm", "deletion"]
},
{
q: "Which `rm` option asks for confirmation before deleting each file?",
type: "mcq",
options: ["-i", "-f", "-I", "-v", "-d"],
answer: 0,
explain: "`rm -i` is interactive and prompts before deleting each file.",
tags: ["rm", "safety"]
},
{
q: "Which `rm` option suppresses errors for nonexistent targets and prompts?",
type: "mcq",
options: ["-i", "-f", "-I", "-d", "-n"],
answer: 1,
explain: "`-f` forces deletion, suppressing prompts and continuing even when some target files do not exist.",
tags: ["rm", "options"]
},
{
q: "Which `rm` option asks only once before deleting more than three files or before recursive deletion?",
type: "mcq",
options: ["-I", "-i", "-f", "-d", "-n"],
answer: 0,
explain: "`-I` provides a single confirmation in the described bulk or recursive cases, unlike `-i`, which prompts for each file.",
tags: ["rm", "safety"]
},
{
q: "Which option allows `rm` to remove a directory tree recursively?",
type: "mcq",
options: ["-R", "-d", "-p", "-a", "-u"],
answer: 0,
explain: "`rm -R` or `rm -r` recursively removes directory contents and then the directories.",
tags: ["rm", "recursive"]
},
{
q: "Which command removes empty directories only?",
type: "mcq",
options: ["rm", "rmdir", "mkdir", "mv", "unlink"],
answer: 1,
explain: "`rmdir` removes empty directories only. Non-empty directories require recursive `rm`.",
tags: ["rmdir", "directories"]
},
{
q: "Which `rmdir` option removes a chain of empty parent directories?",
type: "mcq",
options: ["-p", "-v", "-R", "-i", "-d"],
answer: 0,
explain: "`rmdir -p` removes a directory tree of empty directories when given the full path.",
tags: ["rmdir", "options"]
},
{
q: "What is the key structural difference between hard and symbolic links?",
type: "mcq",
options: ["Hard links share an inode; symbolic links do not", "Symbolic links share an inode; hard links do not", "Both always have different inodes", "Both always have the same inode", "Both require the target to remain on the same filesystem"],
answer: 0,
explain: "Hard links refer to the same inode and underlying data. Symbolic links point to the original name and location and have their own inode.",
tags: ["links", "inode"]
},
{
q: "Which command creates a hard link?",
type: "mcq",
options: ["ln", "ln -s", "readlink", "cp -a", "readlink -f"],
answer: 0,
explain: "`ln original linked` creates a hard link. `ln -s` creates a symbolic link.",
tags: ["links", "ln"]
},
{
q: "What must be true before creating a hard link?",
type: "mcq",
options: ["The original may be absent if the destination name is created first.", "The destination name must already exist, and both paths may use different filesystems.", "The original must exist, the new name must be unused, and both paths must use one filesystem.", "The two link names must use different filesystems so their inodes remain separate.", "The target may be a directory when both names use one filesystem."],
answer: 2,
explain: "The original must exist, the new name must not already exist, and hard links must reside on the same filesystem.",
tags: ["links", "hardlink"]
},
{
q: "Which command creates a symbolic link?",
type: "mcq",
options: ["ln -s", "ln -P", "readlink", "cp -a", "ln"],
answer: 0,
explain: "`ln -s` or `ln --symbolic` creates a symbolic link.",
tags: ["links", "symlink"]
},
{
q: "Which statement about symbolic links is correct?",
type: "mcq",
options: ["They must share an inode with the original", "They can point across filesystems", "They duplicate the target's data", "They cannot become stale", "They always require an existing target at creation time"],
answer: 1,
explain: "Symbolic links can exist on different filesystems because they point to the original file's name and location rather than sharing its inode.",
tags: ["links", "symlink"]
},
{
q: "What command can resolve a chain of symbolic links to its final target?",
type: "mcq",
options: ["readlink -f", "stat", "ls -i", "which -a", "basename"],
answer: 0,
explain: "`readlink -f <file>` resolves a chain of symbolic links to the final target name and directory location.",
tags: ["links", "readlink"]
},
{
q: "What is a stale symbolic link?",
type: "mcq",
options: ["A hard link with two directory entries that refer to the same inode.", "A symbolic link whose target was moved or deleted, so the link no longer resolves.", "A file whose timestamp no longer matches the metadata in its directory entry.", "A link that cannot be changed because its filesystem is mounted read-only.", "A symbolic link whose target is on another filesystem."],
answer: 1,
explain: "A stale or dead link points to a target that has been deleted or moved. The link itself is not automatically updated or removed.",
tags: ["links", "security"]
},
{
q: "Which command displays the contents of a small text file and can concatenate multiple files?",
type: "mcq",
options: ["cat", "grep", "less", "file", "strings"],
answer: 0,
explain: "`cat` concatenates and displays text files and is commonly used for small files.",
tags: ["cat", "reading"]
},
{
q: "Which `cat` option displays line numbers?",
type: "mcq",
options: ["-l", "-n", "-c", "-N", "-s"],
answer: 1,
explain: "`cat -n` numbers the lines of the displayed file.",
tags: ["cat", "options"]
},
{
q: "Which `grep` option makes the search case-insensitive?",
type: "mcq",
options: ["-i", "-v", "-n", "-c", "-w"],
answer: 0,
explain: "`grep -i` ignores case. By default, `grep` is case-sensitive.",
tags: ["grep", "options"]
},
{
q: "What does `grep -v` display?",
type: "mcq",
options: ["Only matching lines", "Lines that do not match the pattern", "Only line numbers", "A count of matches", "Whole-word matches only"],
answer: 1,
explain: "`-v` inverts the match, showing lines that do not match the pattern.",
tags: ["grep", "options"]
},
{
q: "Which `grep` option displays the line number for each match?",
type: "mcq",
options: ["-n", "-c", "-v", "-i", "-H"],
answer: 0,
explain: "`grep -n` prefixes matching lines with their line numbers.",
tags: ["grep", "options"]
},
{
q: "Which `grep` option displays the number of matching lines?",
type: "mcq",
options: ["-c", "-n", "-v", "-i", "-m"],
answer: 0,
explain: "`grep -c` reports the number of matching lines.",
tags: ["grep", "options"]
},
{
q: "Which command normally displays the first 10 lines of a file?",
type: "mcq",
options: ["head", "tail", "more", "pr", "wc"],
answer: 0,
explain: "`head` displays the first lines of a file, defaulting to 10.",
tags: ["head", "reading"]
},
{
q: "Which command normally displays the last 10 lines of a file?",
type: "mcq",
options: ["head", "tail", "less", "cat", "sed"],
answer: 1,
explain: "`tail` displays the last lines of a file, defaulting to 10.",
tags: ["tail", "reading"]
},
{
q: "Which `tail` option follows a file and displays newly appended lines?",
type: "mcq",
options: ["-f", "-n", "-c", "-w", "--pid"],
answer: 0,
explain: "`tail -f` follows the file and is useful for monitoring logs in real time.",
tags: ["tail", "logs"]
},
{
q: "On systems using journald, which command can follow new journal messages?",
type: "mcq",
options: ["journalctl --follow", "tail --journal", "grep -f journal", "less --follow", "journalctl --since today"],
answer: 0,
explain: "`journalctl --follow` watches messages being added to the systemd journal.",
tags: ["journald", "logs"]
},
{
q: "Which pager can move backward through a file while `more` cannot?",
type: "mcq",
options: ["less", "cat", "head", "pr", "more"],
answer: 0,
explain: "`less` supports backward movement, while `more` does not.",
tags: ["less", "more", "pager"]
},
{
q: "Which key exits `less`?",
type: "mcq",
options: ["x", "q", "Esc", "Ctrl+D", "Space"],
answer: 1,
explain: "Press `q` to exit `less`.",
tags: ["less", "pager"]
},
{
q: "Which command is the default pager for `man` pages?",
type: "mcq",
options: ["more", "less", "cat", "pr", "view"],
answer: 1,
explain: "The notes state that `less` is the default man-page pager.",
tags: ["man", "less"]
},
{
q: "What is the purpose of the `file` command?",
type: "mcq",
options: ["Show detailed inode metadata", "Determine a file's basic type", "Find a file by owner", "Compare two files", "Extract printable strings"],
answer: 1,
explain: "`file` provides basic information about a file's type, such as whether it is an executable text file.",
tags: ["file", "metadata"]
},
{
q: "Which command displays detailed metadata including inode, size, device, and timestamps?",
type: "mcq",
options: ["ls", "stat", "file", "which", "ls -l"],
answer: 1,
explain: "`stat` provides detailed metadata such as size, inode number, device, and access/modify/change timestamps.",
tags: ["stat", "metadata"]
},
{
q: "Which command compares two text files line by line?",
type: "mcq",
options: ["diff", "grep", "sdiff", "file", "cmp"],
answer: 0,
explain: "`diff` compares two text files line by line. `sdiff` provides a more visually oriented side-by-side comparison.",
tags: ["diff", "comparison"]
},
{
q: "What does `diff -q` do when two files differ?",
type: "mcq",
options: ["Shows every changed line", "Prints a simple message saying the files differ", "Creates an `ed` script", "Displays the files side by side", "Shows a unified diff"],
answer: 1,
explain: "`-q` means brief and reports that the files differ without showing the detailed changes.",
tags: ["diff", "options"]
},
{
q: "Which `diff` option displays two files side by side?",
type: "mcq",
options: ["-y", "-q", "-e", "-s", "-u"],
answer: 0,
explain: "`diff -y` displays the files in two columns for side-by-side comparison.",
tags: ["diff", "options"]
},
{
q: "Which command shows the full pathname of a shell command by searching directories in `PATH`?",
type: "mcq",
options: ["which", "whereis", "locate", "find", "apropos"],
answer: 0,
explain: "`which` searches directories in `$PATH` and shows the command's full pathname. It can also reveal aliases.",
tags: ["which", "path"]
},
{
q: "What does the `PATH` environment variable contain?",
type: "mcq",
options: ["User passwords", "Directories searched for command binaries", "Filesystem mount points", "Kernel parameters", "Command aliases"],
answer: 1,
explain: "`PATH` specifies the directories Linux searches for a command's binary. Entries are separated by colons.",
tags: ["path", "environment"]
},
{
q: "Which command locates a program binary, source files, and man pages?",
type: "mcq",
options: ["whereis", "which", "locate", "find", "apropos"],
answer: 0,
explain: "`whereis` locates a command's program binary, source code files, and man pages.",
tags: ["whereis", "search"]
},
{
q: "Which command searches a prebuilt database for files?",
type: "mcq",
options: ["find", "locate", "which", "stat", "whereis"],
answer: 1,
explain: "`locate` searches a prebuilt database rather than the live filesystem.",
tags: ["locate", "search"]
},
{
q: "Why might `locate` fail to find a file created recently?",
type: "mcq",
options: ["It searches only `/home`", "Its database is typically refreshed only once per day", "It ignores text files", "It only searches mounted USB devices", "The file name begins with a period"],
answer: 1,
explain: "The notes state that the `locate` database is typically updated once daily, so newly created files may not appear until it is refreshed.",
tags: ["locate", "database"]
},
{
q: "Which command can manually refresh the database used by `locate`?",
type: "mcq",
options: ["updatedb", "updated", "rebuilddb", "locate --update", "locate --rebuild"],
answer: 0,
explain: "`updatedb` refreshes the `locate` database and requires superuser privileges according to the notes.",
tags: ["locate", "updatedb"]
},
{
q: "Which option makes `locate` match only the filename portion, ignoring directory names?",
type: "mcq",
options: ["-b", "-w", "-A", "-r", "-d"],
answer: 0,
explain: "`locate -b` matches the basename only. `-w` includes the directory names.",
tags: ["locate", "options"]
},
{
q: "Which command searches files recursively using metadata such as owner, modification time, or permissions?",
type: "mcq",
options: ["find", "which", "whereis", "cat", "locate"],
answer: 0,
explain: "`find` recursively searches from a starting path using criteria such as name, owner, time, size, type, or permissions.",
tags: ["find", "metadata"]
},
{
q: "What does `find .` use as its starting directory?",
type: "mcq",
options: ["The root directory", "The current working directory", "The user's home directory", "The `/tmp` directory", "The directory containing the shell executable"],
answer: 1,
explain: "A dot (`.`) designates the current working directory as `find`'s starting point.",
tags: ["find", "paths"]
},
{
q: "Which `find` criterion searches for a specified filename?",
type: "mcq",
options: ["-name", "-type", "-user", "-size", "-printf"],
answer: 0,
explain: "`find -name` searches for a specified filename.",
tags: ["find", "name"]
},
{
q: "Which `find` criterion searches for a specific inode number?",
type: "mcq",
options: ["-inum", "-inode", "-i", "-id", "-links"],
answer: 0,
explain: "`-inum` searches for files with the specified inode number.",
tags: ["find", "inode"]
},
{
q: "Which `find` criterion searches by file type?",
type: "mcq",
options: ["-type", "-name", "-user", "-size", "-perm"],
answer: 0,
explain: "`-type` searches by type, such as `f` for regular file, `d` for directory, or `l` for symbolic link.",
tags: ["find", "filetypes"]
},
{
q: "Which `find` option limits how many levels down the directory tree are searched?",
type: "mcq",
options: ["-maxdepth", "-depth", "-mindepth", "-size", "-empty"],
answer: 0,
explain: "`-maxdepth` limits the depth of the recursive search.",
tags: ["find", "maxdepth"]
},
{
q: "Which command can audit `/usr/bin` for the SUID permission bit?",
type: "mcq",
options: ["find /usr/bin -perm /4000", "find /usr/bin -mode 4000", "ls /usr/bin -suid", "grep /usr/bin 4000", "find /usr/bin -suid"],
answer: 0,
explain: "The notes give `find /usr/bin -perm /4000`; the leading `/` causes the search to match the SUID bit while ignoring other permission bits.",
tags: ["find", "suid", "permissions"]
},
{
q: "Which command can recursively search a directory tree for text patterns?",
type: "mcq",
options: ["grep -R", "find . -type f", "locate", "file", "grep -n"],
answer: 0,
explain: "`grep -R` or `grep -r` recursively searches a directory tree for matching text.",
tags: ["grep", "recursive"]
},
{
q: "Which `grep` option causes directories encountered while searching to be skipped?",
type: "mcq",
options: ["-d skip", "-r", "-R", "-v", "-h"],
answer: 0,
explain: "`grep -d skip` tells `grep` to skip directories instead of producing errors for them in the described search.",
tags: ["grep", "directories"]
},
{
q: "Which of the following are valid Linux file types?",
type: "multi",
options: ["Encrypted files", "Text files", "Binary data files", "Executable program files", "Directory files"],
answer: [1, 2, 3, 4],
explain: "The notes categorize files as text, binary data, executable programs, directories, linked files, named pipes/sockets (and device files). Encryption and compression are file properties, not distinct file types.",
tags: ["files", "filetypes"]
},
{
q: "Which statements about the Linux directory tree are correct?",
type: "multi",
options: ["Every mounted filesystem must expose a separate top-level root", "It has a single root directory `/`", "Different filesystems can be mounted at directories", "It combines storage devices into one virtual directory structure", "Every filesystem must use a separate visible device tree"],
answer: [1, 2, 3],
explain: "Linux presents a single directory tree rooted at `/`, and different storage filesystems can be mounted into that tree.",
tags: ["filesystem", "paths"]
},
{
q: "Which statements about `ls -l` output are correct?",
type: "multi",
options: ["It shows the file's creation date", "It shows the owner and group", "It shows the hard-link count", "It shows permissions", "It shows the file's inode number"],
answer: [1, 2, 3],
explain: "The long listing includes file type/permissions, hard-link count, owner, group, size, modification time, and filename — but neither a creation date nor an inode number; `ls -l` reports the modification time, and inode numbers require `ls -i`.",
tags: ["ls", "metadata"]
},
{
q: "Which `-F` indicators does `ls` use?",
type: "multi",
options: ["# for a hidden file", "/ for a directory", "* for an executable", "@ for a symbolic link", "= for a socket"],
answer: [1, 2, 3, 4],
explain: "The notes associate `/`, `*`, `@`, and `=` with directories, executables, symbolic links, and sockets; regular files (hidden or not) get no indicator, so `#` is never shown.",
tags: ["ls", "filetypes"]
},
{
q: "Which statements about `cp` are correct?",
type: "multi",
options: ["A directory can be copied without any special option", "`-n` prevents overwriting an existing destination", "Both source and destination are required", "`-a` does not copy directories recursively", "`-R` or `-r` copies directory trees"],
answer: [1, 2, 4],
explain: "`cp` always needs a source and a destination, requires `-R`/`-r` (or `-a`, which is recursive) to copy directories, and uses `-n`, `-i`, `-u`, and `-f` to control overwriting; a plain `cp` cannot copy a directory.",
tags: ["cp", "options"]
},
{
q: "Which statements about `mv` are correct?",
type: "multi",
options: ["`-r` is required to move directories", "It can rename files", "`-n` prevents overwriting", "It can rename directories", "It can move and rename in one command"],
answer: [1, 2, 3, 4],
explain: "`mv` moves or renames files and directories in one step and supports `-i`, `-n`, `-f`, and `-u` for overwrite behavior; no `-r` flag is needed to move a directory.",
tags: ["mv", "options"]
},
{
q: "Which statements about `rsync` are correct?",
type: "multi",
options: ["It can only copy files on the same machine", "It can preserve symbolic links as symbolic links", "It can display progress", "It can perform archive-mode copies", "It can preserve timestamps"],
answer: [1, 2, 3, 4],
explain: "The notes document `-a`, `-l`, `-t`, `--progress`, and `--stats` for these purposes; `rsync` also copies over a network through OpenSSH.",
tags: ["rsync", "options"]
},
{
q: "Which statements about `rm` are correct?",
type: "multi",
options: ["`-u` restores deleted files", "`-R` recursively removes directory trees", "`-i` prompts before each file", "`rmdir -r` removes non-empty directory trees", "`-I` can ask once for bulk deletion"],
answer: [1, 2, 4],
explain: "The notes document `-i`, `-I`, `-R`/`-r`, `-f`, and `-d` for deletion and prompt behavior; there is no `-u` (undo/restore) option in `rm`, and `rmdir` removes only empty directories.",
tags: ["rm", "options"]
},
{
q: "Which statements correctly compare hard and symbolic links?",
type: "multi",
options: ["Symbolic links do not share an inode", "Hard links must be on the same filesystem", "A stale symbolic link can remain after its target is moved or deleted", "Symbolic links point to the same inode as their target", "Hard links share an inode"],
answer: [0, 1, 2, 4],
explain: "Hard links share an inode and cannot cross filesystems; symbolic links have their own inode and point to the target's name rather than sharing its inode, so they go stale when the target is moved or deleted.",
tags: ["links", "inode"]
},
{
q: "Which commands are appropriate for reading portions of a text file?",
type: "multi",
options: ["dd", "less", "head", "grep", "tail"],
answer: [1, 2, 3, 4],
explain: "`head` and `tail` show the first and last lines and `grep` shows matching lines; `less` pages through a file. `dd` copies raw data and is not a text-reading tool.",
tags: ["reading", "text"]
},
{
q: "Which statements about `less` are correct?",
type: "multi",
options: ["`Esc` + `V` moves forward one page", "`q` exits", "`?` starts a backward search", "Spacebar moves forward one page", "`/` starts a forward search"],
answer: [1, 2, 3, 4],
explain: "The notes document Spacebar, `/`, `?`, and `q`, and `Esc`+`V` moves backward one page (not forward); `.` is not listed as a navigation key.",
tags: ["less", "pager"]
},
{
q: "Which commands can help locate a command or file?",
type: "multi",
options: ["updatedb", "locate", "find", "which", "whereis"],
answer: [1, 2, 3, 4],
explain: "`which`, `whereis`, `locate`, and `find` are described as information or file-location utilities with different mechanisms; `updatedb` only refreshes the locate database and does not locate anything itself.",
tags: ["search", "which", "whereis", "locate", "find"]
},
{
q: "Which statements about `locate` are correct?",
type: "multi",
options: ["The database is rebuilt automatically before every search", "`-b` matches the basename", "`-i` ignores case", "It normally searches a prebuilt database", "The database may be stale"],
answer: [1, 2, 3, 4],
explain: "`locate` searches a prebuilt database that can be stale (usually updated once per day) and supports `-b`, `-i`, `-c`, and other options; the database is not rebuilt on every search — `updatedb` does that.",
tags: ["locate", "options"]
},
{
q: "Which `find` criteria are valid?",
type: "multi",
options: ["-owner", "-mtime", "-name", "-group", "-user"],
answer: [1, 2, 3, 4],
explain: "`-name`, `-user`, `-group`, and `-mtime` are documented `find` criteria (along with `-size`, `-type`, `-empty`, `-regex`, and others). `-owner` and `-recent` are not real `find` options — ownership is tested with `-user`/`-group`.",
tags: ["find", "criteria"]
},
{
q: "Which statements about `grep` are correct?",
type: "multi",
options: ["`-E` treats the pattern as a literal string", "`-v` displays only the matching lines", "`-i` ignores case", "It is case-sensitive by default", "`-v` inverts the match"],
answer: [2, 3, 4],
explain: "`grep` is case-sensitive by default, and `-i` ignores case while `-v` shows non-matching lines; `-E` enables extended regular expressions (`-F` treats the pattern as a literal string), so the last two options are wrong.",
tags: ["grep", "options"]
},
{
q: "Which statements about `diff` are correct?",
type: "multi",
options: ["`-q` prints the complete contents of both files", "It compares files byte by byte", "`-y` shows side-by-side output", "It compares text files line by line", "`-q` gives brief difference output"],
answer: [2, 3, 4],
explain: "`diff` compares text files line by line; `-q` gives brief output and `-y` shows side-by-side output (`-e` generates an `ed` script). It does not compare byte by byte, and `-q` never prints whole files.",
tags: ["diff", "comparison"]
},
{
q: "Which statements about Linux filenames are correct?",
type: "multi",
options: ["Filenames must include a file extension", "Filenames may contain periods", "Names beginning with `.` are hidden", "Filenames can be up to 255 characters", "Extensions are optional"],
answer: [1, 2, 3, 4],
explain: "Filenames can be up to 255 characters, may contain periods, do not require extensions, and are hidden when they start with `.`; extensions are never mandatory.",
tags: ["filenames", "hidden"]
},
{
q: "Deleting one hard-link name of a file removes the data from the filesystem.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "Deleting one hard-link name does not remove the underlying data as long as at least one other hard-link name still references the same inode.",
tags: ["links", "hardlink"]
},
{
q: "Symbolic links always share the same inode number as their target.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "Symbolic links have their own inode and point to the target's name and location.",
tags: ["links", "symlink", "inode"]
},
{
q: "Hard links can exist on different filesystems.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "The notes require the original and hard links to exist on the same filesystem.",
tags: ["links", "hardlink"]
},
{
q: "`cd -` returns to the previous working directory.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "The notes explicitly identify `cd -` as the way to jump back to the previous working directory.",
tags: ["cd", "paths"]
},
{
q: "`locate` searches the live filesystem every time it is run.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "`locate` searches a prebuilt database, which may not contain recently created files.",
tags: ["locate", "search"]
},
{
q: "`ls -a` includes hidden files in its output.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "`-a` means all and includes files whose names begin with a period.",
tags: ["ls", "hidden"]
},
{
q: "`rm -r` can remove a directory tree containing files and subdirectories.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "Recursive `rm` removes directory contents and then the directory itself.",
tags: ["rm", "recursive"]
},
{
q: "`rmdir` is used to remove non-empty directories.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "`rmdir` removes empty directories only. A non-empty directory requires recursive `rm`.",
tags: ["rmdir", "directories"]
},
{
q: "`grep` is case-insensitive by default.",
type: "tf",
options: ["True", "False"],
answer: false,
explain: "`grep` is case-sensitive by default; use `-i` to ignore case.",
tags: ["grep", "case"]
},
{
q: "`less` can move backward through a file.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "Unlike `more`, `less` supports backward navigation.",
tags: ["less", "more"]
},
{
q: "`which` can reveal an alias for a command.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "The notes show `which ls` reporting an alias before the actual binary path.",
tags: ["which", "aliases"]
},
{
q: "`find . -maxdepth 2` limits the search to the current directory and one level of subdirectories.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "The notes explicitly state that `-maxdepth 2` limits the search to the current directory and one level below it.",
tags: ["find", "maxdepth"]
},
{
q: "A symbolic link can become a security risk when its target is deleted and a malicious file is later placed at the old target path.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "The notes describe this stale-link scenario and warn that the link can resolve to the malicious replacement.",
tags: ["symlink", "security"]
},
{
q: "The shell metacharacter for the home directory is ___",
type: "fill",
answer: "~",
explain: "The tilde refers to the current user's home directory and can also be used with another username such as `~mary`.",
tags: ["metacharacters", "home"]
},
{
q: "The command that prints the current working directory is ___",
type: "fill",
answer: "pwd",
explain: "`pwd` prints the present working directory.",
tags: ["pwd", "paths"]
},
{
q: "The command used to create directories is ___",
type: "fill",
answer: "mkdir",
explain: "`mkdir` creates directories.",
tags: ["mkdir", "directories"]
},
{
q: "The `mkdir` option that creates missing parent directories is ___",
type: "fill",
answer: "-p",
explain: "`mkdir -p` creates the necessary parent directories along the requested path.",
tags: ["mkdir", "options"]
},
{
q: "The command used to copy a file or directory locally is ___",
type: "fill",
answer: "cp",
explain: "`cp` performs local copies of files and directories.",
tags: ["cp", "files"]
},
{
q: "The command used to move or rename a file or directory is ___",
type: "fill",
answer: "mv",
explain: "`mv` can move items, rename them, or do both at once.",
tags: ["mv", "files"]
},
{
q: "The command used to remove empty directories only is ___",
type: "fill",
answer: "rmdir",
explain: "`rmdir` specifically removes empty directories.",
tags: ["rmdir", "directories"]
},
{
q: "The command used to create a symbolic link is ___",
type: "fill",
answer: "ln -s",
explain: "`ln -s` creates a symbolic link to the specified original file.",
tags: ["links", "symlink"]
},
{
q: "The command used to remove a linked filename without modifying the original link target is ___",
type: "fill",
answer: "unlink",
explain: "The notes specify `unlink` with the linked filename to remove that link.",
tags: ["links", "unlink"]
},
{
q: "The command used to show the first 10 lines of a file by default is ___",
type: "fill",
answer: "head",
explain: "`head` defaults to the first 10 lines.",
tags: ["head", "reading"]
},
{
q: "The command used to monitor newly appended lines in a log file is ___",
type: "fill",
answer: "tail -f",
explain: "`tail -f` follows the file and displays lines as they are appended.",
tags: ["tail", "logs"]
},
{
q: "The command used to determine a file's basic type is ___",
type: "fill",
answer: "file",
explain: "`file` provides basic information about a file's type.",
tags: ["file", "metadata"]
},
{
q: "The command used to display detailed metadata such as inode and timestamps is ___",
type: "fill",
answer: "stat",
explain: "`stat` displays detailed metadata including inode, size, device, and timestamps.",
tags: ["stat", "metadata"]
},
{
q: "The command used to compare two text files line by line is ___",
type: "fill",
answer: "diff",
explain: "`diff` compares text files line by line and reports required changes.",
tags: ["diff", "comparison"]
},
{
q: "The environment variable containing the directories searched for command binaries is ___",
type: "fill",
answer: "PATH",
explain: "`PATH` contains the directories Linux searches for executable command binaries.",
tags: ["path", "environment"]
},
{
q: "Match the `ls` options with their descriptions.",
type: "command_match",
command: "ls",
pairs: [
{ option: "-a", description: "Display all files, including hidden files" },
{ option: "-d", description: "Show a directory's own metadata instead of its contents" },
{ option: "-F", description: "Append indicators showing file types" },
{ option: "-i", description: "Display inode numbers" },
{ option: "-l", description: "Display long-format metadata" },
{ option: "-h", description: "Display human-readable sizes" }
],
explain: "These `ls` options are the documented switches for controlling hidden-file display, directory handling, type indicators, inode output, long listings, and readable sizes.",
tags: ["ls", "options"]
},
{
q: "Match the `cp` options with their descriptions.",
type: "command_match",
command: "cp",
pairs: [
{ option: "-a", description: "Archive copy preserving permissions, ownership, and timestamps" },
{ option: "-i", description: "Ask before overwriting an existing destination file" },
{ option: "-n", description: "Never overwrite an existing destination file" },
{ option: "-R", description: "Recursively copy a directory tree" },
{ option: "-u", description: "Overwrite only when the source file is newer" },
{ option: "-v", description: "Print detailed information while copying" }
],
explain: "These are the key `cp` options emphasized in the notes for fidelity, overwrite protection, recursion, update behavior, and output.",
tags: ["cp", "options"]
},
{
q: "Match the `rm` options with their descriptions.",
type: "command_match",
command: "rm",
pairs: [
{ option: "-d", description: "Delete empty directories" },
{ option: "-f", description: "Suppress prompts and continue when some targets do not exist" },
{ option: "-i", description: "Ask for confirmation before deleting each file" },
{ option: "-I", description: "Ask once before large or recursive deletions" },
{ option: "-R", description: "Recursively delete a directory tree" },
{ option: "-v", description: "Print detailed information while deleting" }
],
explain: "The notes distinguish `-i` from `-I`, document recursive deletion with `-R`, and identify `-f`, `-d`, and `-v` for their respective behaviors.",
tags: ["rm", "options"]
},
{
q: "Match the `find` criteria with their descriptions.",
type: "command_match",
command: "find",
pairs: [
{ option: "-name", description: "Search for a specified filename" },
{ option: "-user", description: "Search for files owned by a specified user or UID" },
{ option: "-group", description: "Search for files owned by a specified group or GID" },
{ option: "-inum", description: "Search for a specified inode number" },
{ option: "-type", description: "Search by file type" },
{ option: "-maxdepth", description: "Limit how many levels of the directory tree are searched" }
],
explain: "These criteria are among the primary metadata-based searches described for `find`.",
tags: ["find", "criteria"]
},
{
q: "Match each shell notation with its meaning.",
type: "match",
context: "Shell metacharacters",
pairs: [
{ item: "$", match: "Shell variable expansion" },
{ item: "~", match: "Home-directory expansion" },
{ item: "#", match: "Shell-script comment" },
{ item: "&", match: "Background execution" },
{ item: "*", match: "Wildcard for any number of characters" }
],
explain: "These symbols form a coherent metacharacter group in the notes: variable and home-directory expansion, comments, background execution, and filename wildcards.",
tags: ["shell", "metacharacters", "wildcards"]
},
{
q: "Match the `cat` options with their descriptions.",
type: "command_match",
command: "cat",
pairs: [
{ option: "-n, --number", description: "Display line numbers for all lines" },
{ option: "-b, --number-nonblank", description: "Number only non-empty lines" },
{ option: "-s, --squeeze-blank", description: "Replace multiple consecutive empty lines with a single empty line" },
{ option: "-E, --show-ends", description: "Display `$` at the end of each line" },
{ option: "-T, --show-tabs", description: "Display tab characters as `^I`" },
{ option: "-v, --show-nonprinting", description: "Display non-printing characters in a visible form" },
{ option: "-A, --show-all", description: "Equivalent to `-vET`: show non-printing characters, tabs, and line endings" },
{ option: "-e", description: "Equivalent to `-vE`: show non-printing characters and line endings" },
{ option: "-t", description: "Equivalent to `-vT`: show non-printing characters and tabs" }
],
explain: "`cat` concatenates and displays text files. These options add line numbering, squeeze blank lines, or make line endings, tabs, and other non-printing characters visible.",
tags: ["cat", "options", "reading"]
}
]
});
