window.ReviewApp.content.register({
type: "flashcards",
cert: "linux-plus",
chapter: "Ch 04 · Filtering, Redirecting, and Editing Text",
items: [
{
front: "What does the `cut` command do?",
back: "It extracts and displays specific fields, characters, or bytes from each record of a file without modifying the file itself.",
tags: ["cut", "text-processing"]
},
{
front: "What is a text file record?",
back: "A text file record is a single file line that ends in a newline linefeed (ASCII LF).",
tags: ["text-files", "cut"]
},
{
front: "How can cat -E help identify line endings?",
back: "cat -E displays every newline linefeed as a $ character, making line endings visible.",
tags: ["cat", "text-files"]
},
{
front: "What option lets cut process NUL-terminated records?",
back: "-z (--zero-terminated) designates the record end-of-line character as ASCII NUL.",
tags: ["cut", "options"]
},
{
front: "What is a text file record delimiter?",
back: "A delimiter is one or more characters that create a boundary between different data items within a record. /etc/passwd uses : as its delimiter.",
tags: ["cut", "delimiters", "etc-passwd"]
},
{
front: "cut — Important options",
back: "-c nlist → display selected characters; -b blist → display selected bytes; -d d → set the field delimiter; -f flist → display selected fields; -s → display only records containing the delimiter; -z → use NUL as the record terminator.",
tags: ["cut", "options"]
},
{
front: "What does cut -d ':' -f 1,7 /etc/passwd display?",
back: "It uses : as the delimiter and displays fields 1 and 7, which are the username and shell fields.",
tags: ["cut", "etc-passwd"]
},
{
front: "What does cut -c 1-5 do?",
back: "It displays characters 1 through 5 from every record.",
tags: ["cut", "characters"]
},
{
front: "What does grep do?",
back: "grep searches text file records for a pattern and displays the matching records.",
tags: ["grep", "search"]
},
{
front: "grep — Important options",
back: "-c → count matching records; -d action → control handling of directories; -E → use an extended regular expression; -i → ignore case; -R/-r → search recursively; -v → show records that do not match.",
tags: ["grep", "options"]
},
{
front: "What does grep -c do?",
back: "It displays a count of text file records that contain a pattern match.",
tags: ["grep", "options"]
},
{
front: "What does grep -i do?",
back: "It ignores case in both the pattern and the text file records.",
tags: ["grep", "options"]
},
{
front: "What does grep -r do?",
back: "It recursively searches a directory and the contents of its subdirectories.",
tags: ["grep", "recursive"]
},
{
front: "What does grep -v do?",
back: "It displays only records that do not contain a match for the specified pattern.",
tags: ["grep", "options"]
},
{
front: "What does grep -d skip do?",
back: "When grep encounters a directory, it skips that directory instead of reading or recursively searching it.",
tags: ["grep", "directories"]
},
{
front: "What is a regular expression?",
back: "A regular expression (regex or regexp) is a pattern template used by utilities such as grep to filter text.",
tags: ["regex", "grep"]
},
{
front: "What does . mean in a basic regular expression?",
back: "A dot matches any single character.",
tags: ["regex", "bre"]
},
{
front: "What does .* mean in a basic regular expression?",
back: "It matches zero or more characters, allowing a pattern to span multiple characters.",
tags: ["regex", "bre"]
},
{
front: "What does [abc] mean in a basic regular expression?",
back: "It matches any one character listed inside the brackets.",
tags: ["regex", "bre"]
},
{
front: "What does [^abc] mean in a basic regular expression?",
back: "It matches any character that is not listed inside the brackets.",
tags: ["regex", "bre"]
},
{
front: "What does [A-Z] mean in a regex?",
back: "It represents a character range, matching an uppercase letter from A through Z.",
tags: ["regex", "character-ranges"]
},
{
front: "What does ^ mean in a basic regular expression?",
back: "It anchors the pattern to the start of a line.",
tags: ["regex", "anchors"]
},
{
front: "What does $ mean in a basic regular expression?",
back: "It anchors the pattern to the end of a line.",
tags: ["regex", "anchors"]
},
{
front: "What does * mean in a basic regular expression?",
back: "It matches zero or more occurrences of the preceding character.",
tags: ["regex", "bre"]
},
{
front: "What does {n} mean in a basic regular expression?",
back: "It matches exactly n occurrences of the preceding character.",
tags: ["regex", "bre"]
},
{
front: "What does {n,m} mean in a basic regular expression?",
back: "It matches from n through m occurrences of the preceding character.",
tags: ["regex", "bre"]
},
{
front: "What does grep ^root /etc/passwd match?",
back: "It matches records that begin with root.",
tags: ["grep", "regex"]
},
{
front: "What does grep daemon.*nologin match?",
back: "It matches records containing daemon followed later by nologin, with any number of characters allowed between them.",
tags: ["grep", "regex"]
},
{
front: "What does grep -v 'nologin$' /etc/passwd find?",
back: "It displays records that do not end in nologin, such as accounts whose shell is not /sbin/nologin.",
tags: ["grep", "regex", "etc-passwd"]
},
{
front: "What is an extended regular expression (ERE)?",
back: "An ERE supports more complex pattern constructs such as alternation with | and grouping with parentheses.",
tags: ["regex", "ere"]
},
{
front: "grep -E — What does it do?",
back: "It tells grep to interpret the pattern as an extended regular expression.",
tags: ["grep", "ere"]
},
{
front: "What does | mean in an ERE?",
back: "It specifies alternation, meaning one pattern or another can match.",
tags: ["regex", "ere"]
},
{
front: "What do parentheses mean in an ERE?",
back: "Parentheses define a subexpression or group within the pattern.",
tags: ["regex", "ere"]
},
{
front: "ERE — Important pattern elements",
back: "+ → one or more of the preceding character; ? → zero or one; {n} → exactly n; {n,m} → n to m; | → alternation; () → grouping.",
tags: ["regex", "ere"]
},
{
front: "What happens if ERE syntax is used without grep -E?",
back: "grep treats ERE special characters such as + or | as literals, so the pattern may not match as expected.",
tags: ["grep", "regex", "ere"]
},
{
front: "What is egrep?",
back: "egrep is equivalent to grep -E and uses extended regular expressions.",
tags: ["egrep", "grep", "ere"]
},
{
front: "What does sort do?",
back: "sort sorts a file's data for display without changing the original file.",
tags: ["sort", "text-processing"]
},
{
front: "sort — Important options",
back: "-c → check whether input is sorted; -f → ignore case; -n → numeric sort; -r → reverse/descending order; -u → unique output; -k → sort by a specific field; -t → set the field separator; -o → write output to a file; -M → sort by month name; -V → version sort.",
tags: ["sort", "options"]
},
{
front: "What does sort -n do?",
back: "It sorts according to numeric value rather than string comparison.",
tags: ["sort", "numeric"]
},
{
front: "What does sort -r do?",
back: "It sorts in reverse, or descending, order.",
tags: ["sort", "options"]
},
{
front: "What does sort -u do?",
back: "It outputs only the first line of an equal run, effectively removing duplicate adjacent entries after sorting.",
tags: ["sort", "unique"]
},
{
front: "How do you sort /etc/passwd by UID numerically?",
back: "Use sort -t: -k3 -n /etc/passwd, because field 3 contains the UID.",
tags: ["sort", "etc-passwd"]
},
{
front: "What does sort -t do?",
back: "It specifies the field separator used when identifying fields.",
tags: ["sort", "options"]
},
{
front: "What does sort -k do?",
back: "It selects the field or key used for sorting.",
tags: ["sort", "options"]
},
{
front: "What does sort -o do?",
back: "It writes the sorted result to the specified output file instead of standard output.",
tags: ["sort", "options", "redirection"]
},
{
front: "What does sort -M do?",
back: "It sorts by month names such as Jan, Feb, and so on.",
tags: ["sort", "options"]
},
{
front: "What does sort -V do?",
back: "It sorts strings as version values.",
tags: ["sort", "options"]
},
{
front: "What does uniq do?",
back: "uniq filters out adjacent duplicate lines from input.",
tags: ["uniq", "duplicates"]
},
{
front: "Why is uniq usually used after sort?",
back: "uniq only detects duplicates that are consecutive, so sorting first brings identical lines together.",
tags: ["uniq", "sort"]
},
{
front: "uniq — Important options",
back: "-c → prefix lines with occurrence counts; -d → show only duplicated lines; -i → ignore case; -u → show only non-repeated lines; -f N → skip N fields when comparing; -s N → skip N characters when comparing.",
tags: ["uniq", "options"]
},
{
front: "What does sort file.txt | uniq -c do?",
back: "It sorts the file and then counts how many times each distinct line occurs.",
tags: ["sort", "uniq", "pipes"]
},
{
front: "What does uniq -d do?",
back: "It prints only lines that are duplicated.",
tags: ["uniq", "options"]
},
{
front: "What does uniq -u do?",
back: "It prints only lines that are not repeated.",
tags: ["uniq", "options"]
},
{
front: "What does cat do?",
back: "cat reads files sequentially and writes their contents to standard output; it can also concatenate multiple files.",
tags: ["cat", "text-processing"]
},
{
front: "cat — Important options",
back: "-A → show all, equivalent to -vET; -n → number all lines; -b → number nonblank lines; -s → squeeze repeated blank lines; -E → show line ends with $; -T → show tabs as ^I; -v → show nonprinting characters using ^ and M- notation.",
tags: ["cat", "options"]
},
{
front: "What does cat -n do?",
back: "It numbers all output lines.",
tags: ["cat", "options"]
},
{
front: "What does cat -b do?",
back: "It numbers only nonblank output lines.",
tags: ["cat", "options"]
},
{
front: "What does cat -E do?",
back: "It displays a $ at the end of each line.",
tags: ["cat", "options", "line-endings"]
},
{
front: "What does cat -T do?",
back: "It displays TAB characters as ^I.",
tags: ["cat", "options", "tabs"]
},
{
front: "What does cat -v do?",
back: "It displays non-printing characters using caret (^) and M- notation.",
tags: ["cat", "options", "nonprinting"]
},
{
front: "What does cat -A combine?",
back: "It is equivalent to -vET, showing nonprinting characters, line endings, and tabs.",
tags: ["cat", "options"]
},
{
front: "What is fmt used for?",
back: "fmt is a simple word-wrap filter that reflows text paragraphs to a specified width.",
tags: ["fmt", "formatting"]
},
{
front: "What does fmt -w 72 article.txt do?",
back: "It reformats the text to a 72-character width; the notes state the default width is 75.",
tags: ["fmt", "formatting"]
},
{
front: "What does printf do?",
back: "printf formats and displays text data according to a supplied format description.",
tags: ["printf", "formatting"]
},
{
front: "printf — Important formats",
back: "%c → first argument character; %d → decimal integer; %f → floating-point number; %s → string; %% → percent sign; \" → double quote; \\ → backslash; \f → form feed; \n → newline; \r → carriage return; \t → horizontal tab.",
tags: ["printf", "formatting"]
},
{
front: "What does %s mean in printf?",
back: "It displays the supplied argument as a character string.",
tags: ["printf", "formats"]
},
{
front: "What does %d mean in printf?",
back: "It displays the argument as a decimal integer.",
tags: ["printf", "formats"]
},
{
front: "What does %.2f do in printf?",
back: "It formats a floating-point value with two digits after the decimal point.",
tags: ["printf", "formats"]
},
{
front: "Does printf automatically add a newline?",
back: "No. A newline must be included explicitly, typically with \n.",
tags: ["printf", "echo"]
},
{
front: "Why prefer printf over echo for consistent formatting?",
back: "printf handles escape sequences consistently across shells, while echo behavior varies.",
tags: ["printf", "echo"]
},
{
front: "What does wc do by default?",
back: "It displays the number of lines, words, and bytes in that order.",
tags: ["wc", "text-statistics"]
},
{
front: "wc — Important options",
back: "-c → bytes; -L → longest line length; -l → lines; -m → characters; -w → words.",
tags: ["wc", "options"]
},
{
front: "What does wc -l do?",
back: "It displays the number of lines in the input file.",
tags: ["wc", "options"]
},
{
front: "What does wc -w do?",
back: "It displays the number of words in the input file.",
tags: ["wc", "options"]
},
{
front: "What does wc -c do?",
back: "It displays the file's byte count.",
tags: ["wc", "options"]
},
{
front: "What does wc -m do?",
back: "It displays the file's character count.",
tags: ["wc", "options"]
},
{
front: "What does wc -L do?",
back: "It displays the byte count of the file's longest line.",
tags: ["wc", "options"]
},
{
front: "Why can wc -L help troubleshoot configuration files?",
back: "An unusually long line can indicate that two configuration file lines were accidentally merged during editing.",
tags: ["wc", "troubleshooting"]
},
{
front: "What are the three standard Linux process data streams?",
back: "STDIN is descriptor 0, STDOUT is descriptor 1, and STDERR is descriptor 2.",
tags: ["redirection", "stdin", "stdout", "stderr"]
},
{
front: "What is STDIN?",
back: "Standard input, file descriptor 0; by default it receives input from the keyboard or another input source.",
tags: ["stdin", "redirection"]
},
{
front: "What is STDOUT?",
back: "Standard output, file descriptor 1; by default it sends normal command output to the terminal.",
tags: ["stdout", "redirection"]
},
{
front: "What is STDERR?",
back: "Standard error, file descriptor 2; by default it sends error messages to the terminal.",
tags: ["stderr", "redirection"]
},
{
front: "Where does STDOUT normally go?",
back: "It normally goes to the current terminal, represented by /dev/tty.",
tags: ["stdout", "redirection"]
},
{
front: "What does > do?",
back: "It redirects STDOUT to a file, creating the file or overwriting it if it exists.",
tags: ["redirection", "stdout"]
},
{
front: "What does >> do?",
back: "It redirects STDOUT to a file and appends to the file if it already exists.",
tags: ["redirection", "stdout"]
},
{
front: "What is the overwrite risk of >?",
back: "If the destination file already exists, > deletes its current contents before writing the new output.",
tags: ["redirection", "stdout"]
},
{
front: "What does 2> do?",
back: "It redirects STDERR to a file, overwriting the file if it already exists.",
tags: ["redirection", "stderr"]
},
{
front: "What does 2>> do?",
back: "It redirects STDERR to a file and appends to it.",
tags: ["redirection", "stderr"]
},
{
front: "What does &> do?",
back: "It redirects both STDOUT and STDERR to a file, overwriting the file if it exists.",
tags: ["redirection", "stdout", "stderr"]
},
{
front: "What does &>> do?",
back: "It redirects both STDOUT and STDERR to a file and appends to the file.",
tags: ["redirection", "stdout", "stderr"]
},
{
front: "What does 2>&1 mean?",
back: "It redirects STDERR to the same destination currently used by STDOUT.",
tags: ["redirection", "stderr", "stdout"]
},
{
front: "What does < do?",
back: "It redirects STDIN from a specified file into a command.",
tags: ["redirection", "stdin"]
},
{
front: "What does << do?",
back: "It starts a here document, feeding multiple lines as standard input to a command.",
tags: ["redirection", "heredoc", "stdin"]
},
{
front: "What does <<< do?",
back: "It is a here string that feeds a single string as standard input.",
tags: ["redirection", "heredoc", "stdin"]
},
{
front: "What does <> do?",
back: "It redirects STDIN from a specified file into a command and redirects STDOUT to the specified file.",
tags: ["redirection", "stdin", "stdout"]
},
{
front: "What is /dev/null?",
back: "/dev/null is the bit bucket; anything redirected there is discarded and cannot be retrieved.",
tags: ["dev-null", "redirection"]
},
{
front: "How do you discard error output?",
back: "Redirect STDERR to /dev/null, for example: command 2> /dev/null.",
tags: ["dev-null", "stderr"]
},
{
front: "What does diff do?",
back: "diff compares two files line by line and displays their differences.",
tags: ["diff", "comparison"]
},
{
front: "diff — Important options",
back: "-u → unified diff with 3 lines of context; -i → ignore case; -y → side-by-side output; -w → ignore all whitespace; -e → output differences as an ed editor script.",
tags: ["diff", "options"]
},
{
front: "What does diff -u do?",
back: "It produces unified diff output with three lines of context.",
tags: ["diff", "options"]
},
{
front: "What does diff -y do?",
back: "It displays differences side by side.",
tags: ["diff", "options"]
},
{
front: "What does diff -w do?",
back: "It ignores all whitespace differences when comparing files.",
tags: ["diff", "options"]
},
{
front: "What does diff -e produce?",
back: "It outputs differences as an ed editor script.",
tags: ["diff", "ed"]
},
{
front: "How can diff create a patch file?",
back: "Use unified output and redirect it to a file, such as diff -u old.conf new.conf > changes.patch.",
tags: ["diff", "patch"]
},
{
front: "How can a patch file be applied?",
back: "Use patch with the target file as input, such as patch original.txt < changes.patch.",
tags: ["patch", "redirection"]
},
{
front: "What is a pipe?",
back: "A pipe, represented by |, redirects one command's STDOUT into the next command's STDIN.",
tags: ["pipes", "redirection"]
},
{
front: "What is the pipe symbol's ASCII value?",
back: "The vertical bar | is ASCII character 124.",
tags: ["pipes", "metacharacters"]
},
{
front: "What is the general syntax of a pipeline?",
back: "command1 | command2 | commandN. Each command can pass its STDOUT to the next command as STDIN.",
tags: ["pipes", "syntax"]
},
{
front: "How do you count users with a bash shell?",
back: "Use grep \"/bin/bash\" /etc/passwd | wc -l.",
tags: ["pipes", "grep", "wc", "etc-passwd"]
},
{
front: "What does tee do?",
back: "tee writes piped input to a file while also displaying it on STDOUT.",
tags: ["tee", "pipes"]
},
{
front: "tee — Important options",
back: "-a → append to the file instead of overwriting; -i → ignore interrupts such as Ctrl+C.",
tags: ["tee", "options"]
},
{
front: "How can tee continue a pipeline?",
back: "tee can be followed by another pipe, so its output is written to a file and simultaneously passed to the next command.",
tags: ["tee", "pipes"]
},
{
front: "What is a here document?",
back: "A here document redirects multiple lines of text into a command's standard input.",
tags: ["heredoc", "stdin"]
},
{
front: "What is the syntax of a here document?",
back: "command <<EOF, followed by input lines, ending with EOF on its own line; the delimiter keyword can be any chosen word.",
tags: ["heredoc", "syntax"]
},
{
front: "What happens when a here-document delimiter is quoted?",
back: "Quoting the delimiter, such as 'EOF' or \"EOF\", suppresses shell variable expansion inside the here document.",
tags: ["heredoc", "variables"]
},
{
front: "What happens to $HOME inside an unquoted here document?",
back: "The shell expands variables such as $HOME when the delimiter is not quoted.",
tags: ["heredoc", "variables"]
},
{
front: "What does xargs do?",
back: "xargs reads items from STDIN and executes a specified command with those items as arguments.",
tags: ["xargs", "stdin"]
},
{
front: "xargs — Important options",
back: "-p → prompt before each execution; -n NUM → use at most NUM arguments per command line; -0 → use NUL as the input delimiter; -I STR → replace STR with each input item; -t → print the command to STDERR before executing it.",
tags: ["xargs", "options"]
},
{
front: "What does xargs -p do?",
back: "It prompts the user for confirmation before executing each command.",
tags: ["xargs", "options"]
},
{
front: "What does xargs -n NUM do?",
back: "It limits each command line to at most NUM arguments.",
tags: ["xargs", "options"]
},
{
front: "Why pair find -print0 with xargs -0?",
back: "NUL-delimited input safely handles filenames containing spaces and other whitespace.",
tags: ["xargs", "find", "filenames"]
},
{
front: "What does xargs -I STR do?",
back: "It replaces occurrences of STR with the current input item when constructing the command.",
tags: ["xargs", "options"]
},
{
front: "What does xargs -t do?",
back: "It prints the command to STDERR before executing it.",
tags: ["xargs", "options"]
},
{
front: "What problem occurs when xargs is used without -0 for filenames with spaces?",
back: "xargs splits input on whitespace, so a filename containing spaces can be split into multiple arguments and cause errors.",
tags: ["xargs", "filenames"]
},
{
front: "What is command substitution?",
back: "Command substitution embeds the output of one command directly into another command.",
tags: ["command-substitution", "shell"]
},
{
front: "Which command substitution syntax is preferred?",
back: "$(command) is preferred because it is clearer and easier to nest than backtick syntax.",
tags: ["command-substitution", "shell"]
},
{
front: "What is the older command substitution syntax?",
back: "Backticks: `command`.",
tags: ["command-substitution", "shell"]
},
{
front: "What is brace expansion?",
back: "Brace expansion is a Bash feature that generates strings from patterns enclosed in braces; it is not a command.",
tags: ["brace-expansion", "bash"]
},
{
front: "What does file{1,2,3} expand to?",
back: "file1 file2 file3.",
tags: ["brace-expansion", "bash"]
},
{
front: "What does {1..5} expand to?",
back: "1 2 3 4 5.",
tags: ["brace-expansion", "bash"]
},
{
front: "What does {a..e} expand to?",
back: "a b c d e.",
tags: ["brace-expansion", "bash"]
},
{
front: "What does dir/{a,b}/{c,d} expand to?",
back: "dir/a/c, dir/a/d, dir/b/c, and dir/b/d.",
tags: ["brace-expansion", "bash"]
},
{
front: "What does nano do?",
back: "nano is a simple interactive text editor well suited to straightforward text file modifications.",
tags: ["nano", "text-editors"]
},
{
front: "What are the four main sections of the nano interface?",
back: "Title Bar, Main Body, Status Bar, and Shortcut List.",
tags: ["nano", "text-editors"]
},
{
front: "nano — Important shortcuts",
back: "Ctrl+O → save/write; Ctrl+X → exit; Ctrl+K → cut current line; Ctrl+U → paste cut text; Ctrl+W → search; Ctrl+G → display help.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+O do in nano?",
back: "It writes or saves the current file.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+X do in nano?",
back: "It exits nano.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+K do in nano?",
back: "It cuts the current line.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+U do in nano?",
back: "It pastes previously cut text.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+W do in nano?",
back: "It searches for text.",
tags: ["nano", "shortcuts"]
},
{
front: "What does Ctrl+G do in nano?",
back: "It displays help.",
tags: ["nano", "shortcuts"]
},
{
front: "What is vim?",
back: "vim means vi improved; it is an open-source development of the original Unix vi editor.",
tags: ["vim", "vi", "text-editors"]
},
{
front: "How can you check whether vi or vim exists?",
back: "Use which vim and which vi to locate the programs.",
tags: ["vim", "vi", "which"]
},
{
front: "What is vim.tiny?",
back: "vim.tiny is a limited Vim implementation found on some distributions, such as Ubuntu, and it lacks some full Vim commands.",
tags: ["vim", "vim-tiny"]
},
{
front: "How can you determine whether vi points to vi.tiny?",
back: "Use type vi and then readlink -f on the resulting path.",
tags: ["vi", "vim", "vim-tiny"]
},
{
front: "What are vim's three standard modes?",
back: "Command (normal) mode, Insert (edit/entry) mode, and Ex (colon-command) mode.",
tags: ["vim", "modes"]
},
{
front: "What is vim command mode?",
back: "It is the initial mode in the buffer and is used for commands and efficient movement through the file.",
tags: ["vim", "command-mode"]
},
{
front: "How do you enter insert mode in vim according to the notes?",
back: "From command mode, press I. The editor displays --Insert--.",
tags: ["vim", "insert-mode"]
},
{
front: "How do you leave insert mode in vim?",
back: "Press Esc to return to command mode.",
tags: ["vim", "insert-mode"]
},
{
front: "What is vim Ex mode?",
back: "Ex mode uses colon commands such as :q and requires command mode before entering the command.",
tags: ["vim", "ex-mode"]
},
{
front: "vim — Movement and editing commands",
back: "h/j/k/l → left/down/up/right; w → forward one word; b → backward one word; 0 → line start; $ → line end; gg → first line; G → last line; nG → line n; x → delete character; dd → delete line; yy → yank line; p → paste after cursor.",
tags: ["vim", "movement", "editing"]
},
{
front: "vim — Scrolling, undo, and search",
back: "Ctrl+f → full screen down; Ctrl+b → full screen up; Ctrl+d → half screen down; Ctrl+u → half screen up; u → undo; Ctrl+r → redo; /pattern → search forward; ?pattern → search backward; n/N → repeat search in same/opposite direction.",
tags: ["vim", "search", "movement"]
},
{
front: "What does gg do in vim?",
back: "It moves to the first line of the file.",
tags: ["vim", "movement"]
},
{
front: "What does G do in vim?",
back: "It moves to the last line of the file.",
tags: ["vim", "movement"]
},
{
front: "What does nG do in vim?",
back: "It moves to line number n.",
tags: ["vim", "movement"]
},
{
front: "What does dd do in vim?",
back: "It deletes the current line.",
tags: ["vim", "editing"]
},
{
front: "What does yy do in vim?",
back: "It yanks, or copies, the current line.",
tags: ["vim", "editing"]
},
{
front: "What does p do in vim?",
back: "It pastes yanked or deleted text after the cursor.",
tags: ["vim", "editing"]
},
{
front: "What does u do in vim?",
back: "It undoes the last change.",
tags: ["vim", "editing"]
},
{
front: "What does Ctrl+r do in vim?",
back: "It redoes the last undo.",
tags: ["vim", "editing"]
},
{
front: "How do you search forward in vim?",
back: "Enter /pattern in command mode.",
tags: ["vim", "search"]
},
{
front: "How do you search backward in vim?",
back: "Enter ?pattern in command mode.",
tags: ["vim", "search"]
},
{
front: "What do n and N do after a vim search?",
back: "n repeats the search in the same direction; N repeats it in the opposite direction.",
tags: ["vim", "search"]
},
{
front: "What does :%s/old/new/g do in vim?",
back: "It substitutes old with new throughout the entire file, replacing all occurrences on each matching line.",
tags: ["vim", "substitution"]
},
{
front: "What does :s/old/new/g do in vim?",
back: "It substitutes old with new on the current line, replacing all occurrences on that line.",
tags: ["vim", "substitution"]
},
{
front: "How do you save and exit vim with ZZ?",
back: "In command mode, ZZ writes the buffer to disk and exits.",
tags: ["vim", "exit"]
},
{
front: "vim — Important Ex commands",
back: ":x → write and quit; :wq → write and quit; :wq! → write and quit overriding protection; :w → write and stay; :w! → write overriding protection; :q → quit without writing; :q! → quit without writing overriding protection; :! command → run a shell command; :r! command → run a shell command and include its output; :r file → read a file into the buffer.",
tags: ["vim", "ex-mode"]
},
{
front: "What does :q do in vim?",
back: "It quits without writing the buffer to the file.",
tags: ["vim", "ex-mode", "exit"]
},
{
front: "What does :q! do in vim?",
back: "It quits without writing the buffer and overrides protection.",
tags: ["vim", "ex-mode", "exit"]
},
{
front: "What does :w do in vim?",
back: "It writes the buffer to the file and remains in the editor.",
tags: ["vim", "ex-mode"]
},
{
front: "What does :wq do in vim?",
back: "It writes the buffer and quits the editor.",
tags: ["vim", "ex-mode", "exit"]
},
{
front: "What does :x do in vim?",
back: "It writes the buffer to the file and quits the editor.",
tags: ["vim", "ex-mode", "exit"]
},
{
front: "What does :! command do in vim?",
back: "It executes a shell command and displays its results without quitting vim.",
tags: ["vim", "ex-mode", "shell"]
},
{
front: "What does :r! command do in vim?",
back: "It executes a shell command and inserts the command's results into the editor buffer.",
tags: ["vim", "ex-mode", "shell"]
},
{
front: "What does :r file do in vim?",
back: "It reads the specified file and includes its contents in the current buffer.",
tags: ["vim", "ex-mode"]
},
{
front: "What is vimtutor?",
back: "vimtutor is a command-line tutorial for learning Vim; the notes state it may be installed by default on some distributions.",
tags: ["vim", "vimtutor"]
},
{
front: "What is a stream editor?",
back: "A stream editor modifies text passed to it through a file or pipeline as the text streams through the editor.",
tags: ["sed", "stream-editors"]
},
{
front: "What does sed do?",
back: "sed reads text line by line, applies editing commands, and outputs the modified text.",
tags: ["sed", "stream-editors"]
},
{
front: "sed — Important options",
back: "-e → add a script expression; -f → read commands from a script file; -i → edit files in place; -n → suppress automatic printing; \b → match a word boundary.",
tags: ["sed", "options"]
},
{
front: "What does sed -i do?",
back: "It edits the original file in place instead of only producing modified output.",
tags: ["sed", "options"]
},
{
front: "Why should sed -i be used carefully?",
back: "It directly modifies the original file, so the notes recommend testing without -i first and using -i.bak when a backup is desired.",
tags: ["sed", "options", "safety"]
},
{
front: "What does sed -n do?",
back: "It suppresses automatic printing so selected lines can be printed explicitly with commands such as p.",
tags: ["sed", "options"]
},
{
front: "What does \b mean in the sed material?",
back: "It matches a word boundary, which is useful for matching a whole word rather than part of a word.",
tags: ["sed", "regex"]
},
{
front: "What is the basic sed substitution syntax?",
back: "sed 's/pattern/replacement/flags' file.txt.",
tags: ["sed", "substitution"]
},
{
front: "What does the sed s command do?",
back: "The s command performs text substitution by replacing a matched pattern with a replacement string.",
tags: ["sed", "substitution"]
},
{
front: "sed substitution flags",
back: "g → replace all occurrences on each line; n → replace only the nth occurrence; p → print the line when a substitution occurs; w FILE → write changed lines to FILE; I → ignore case when matching.",
tags: ["sed", "flags"]
},
{
front: "What does sed 's/cake/donut/g' do?",
back: "It replaces every occurrence of cake with donut on each input line.",
tags: ["sed", "substitution"]
},
{
front: "What does sed '/error/d' logfile.txt do?",
back: "It deletes lines containing error from the output.",
tags: ["sed", "delete"]
},
{
front: "What does sed -n '5,10p' largefile.txt do?",
back: "It prints only lines 5 through 10.",
tags: ["sed", "options"]
},
{
front: "What does awk provide beyond simple text matching?",
back: "awk is a programming language for field-based processing that supports variables, arithmetic, string operators, loops, and formatted reports.",
tags: ["awk", "gawk"]
},
{
front: "What is gawk?",
back: "gawk is GNU awk, the GNU project's rewritten version of the original Unix awk program.",
tags: ["awk", "gawk"]
},
{
front: "What is the awk general syntax?",
back: "awk [OPTIONS] 'pattern { action }' [FILE...].",
tags: ["awk", "syntax"]
},
{
front: "What is awk's default field separator?",
back: "Fields are separated by whitespace by default.",
tags: ["awk", "fields"]
},
{
front: "What does $0 mean in awk?",
back: "$0 represents the entire current input line.",
tags: ["awk", "variables"]
},
{
front: "What do $1, $2, and $N mean in awk?",
back: "They represent the first, second, and Nth fields of the current input record.",
tags: ["awk", "fields"]
},
{
front: "What does NR mean in awk?",
back: "NR is the current line number.",
tags: ["awk", "variables"]
},
{
front: "What does NF mean in awk?",
back: "NF is the number of fields in the current record.",
tags: ["awk", "variables"]
},
{
front: "awk — Important options",
back: "-F SEP → set the field separator; -f FILE → read an awk program from a file; -v VAR=VAL → assign a variable before execution.",
tags: ["awk", "options"]
},
{
front: "What does awk -F: do?",
back: "It sets the field separator to a colon.",
tags: ["awk", "options", "etc-passwd"]
},
{
front: "What does awk -v do?",
back: "It assigns a variable and value before awk executes the program.",
tags: ["awk", "options", "variables"]
},
{
front: "How can awk print username and home directory from /etc/passwd?",
back: "Use awk -F: '{print $1, $6}' /etc/passwd.",
tags: ["awk", "etc-passwd"]
},
{
front: "How can awk find users whose UID is greater than 1000?",
back: "Use awk -F: '$3 > 1000 {print $1}' /etc/passwd.",
tags: ["awk", "etc-passwd", "fields"]
},
{
front: "How can awk count the total number of users in /etc/passwd?",
back: "Use awk -F: 'END {print NR}' /etc/passwd.",
tags: ["awk", "etc-passwd", "nr"]
},
{
front: "grep vs sed vs awk",
back: "grep finds lines matching a pattern; sed performs simple substitutions and stream edits; awk handles complex field-based processing, calculations, and structured output.",
tags: ["grep", "sed", "awk"]
}
]
});
