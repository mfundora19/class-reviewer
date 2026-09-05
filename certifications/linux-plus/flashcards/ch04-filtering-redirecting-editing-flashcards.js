window.ReviewApp.content.register({
type: "flashcards",
cert: "linux-plus",
chapter: "Ch 04 · Filtering, Redirecting, and Editing Text",
items: [



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
front: "What does grep -v do?",
back: "It displays only records that do not contain a match for the specified pattern.",
tags: ["grep", "options"]
},

{
front: "What is a regular expression?",
back: "A regular expression (regex or regexp) is a pattern template used by utilities such as grep to filter text.",
tags: ["regex", "grep"]
},



{
front: "What does [^abc] mean in a basic regular expression?",
back: "It matches any character that is not listed inside the brackets.",
tags: ["regex", "bre"]
},






{
front: "What does grep ^root /etc/passwd match?",
back: "It matches records that begin with root.",
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
front: "sort — Important options",
back: "-c → check whether input is sorted; -f → ignore case; -n → numeric sort; -r → reverse/descending order; -u → unique output; -k → sort by a specific field; -t → set the field separator; -o → write output to a file; -M → sort by month name; -V → version sort.",
tags: ["sort", "options"]
},


{
front: "What does sort -u do?",
back: "It outputs only the first line of an equal run, effectively removing duplicate adjacent entries after sorting.",
tags: ["sort", "unique"]
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
front: "What does cat -v do?",
back: "It displays non-printing characters using caret (^) and M- notation.",
tags: ["cat", "options", "nonprinting"]
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
front: "What does <> do?",
back: "It redirects STDIN from a specified file into a command and redirects STDOUT to the specified file.",
tags: ["redirection", "stdin", "stdout"]
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
front: "What is a pipe?",
back: "A pipe, represented by |, redirects one command's STDOUT into the next command's STDIN.",
tags: ["pipes", "redirection"]
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
front: "Why pair find -print0 with xargs -0?",
back: "NUL-delimited input safely handles filenames containing spaces and other whitespace.",
tags: ["xargs", "find", "filenames"]
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
front: "How can you check whether vi or vim exists?",
back: "Use which vim and which vi to locate the programs.",
tags: ["vim", "vi", "which"]
},

{
front: "How can you determine whether vi points to vi.tiny?",
back: "Use type vi and then readlink -f on the resulting path.",
tags: ["vi", "vim", "vim-tiny"]
},

{
front: "What is vim command mode?",
back: "It is the initial mode in the buffer and is used for commands and efficient movement through the file.",
tags: ["vim", "command-mode"]
},
















{
front: "What does :%s/old/new/g do in vim?",
back: "It substitutes old with new throughout the entire file, replacing all occurrences on each matching line.",
tags: ["vim", "substitution"]
},


{
front: "vim — Important Ex commands",
back: ":x → write and quit; :wq → write and quit; :wq! → write and quit overriding protection; :w → write and stay; :w! → write overriding protection; :q → quit without writing; :q! → quit without writing overriding protection; :! command → run a shell command; :r! command → run a shell command and include its output; :r file → read a file into the buffer.",
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
front: "What does sed '/error/d' logfile.txt do?",
back: "It deletes lines containing error from the output.",
tags: ["sed", "delete"]
},

{
front: "What does awk provide beyond simple text matching?",
back: "awk is a programming language for field-based processing that supports variables, arithmetic, string operators, loops, and formatted reports.",
tags: ["awk", "gawk"]
},

{
front: "What is the awk general syntax?",
back: "awk [OPTIONS] 'pattern { action }' [FILE...].",
tags: ["awk", "syntax"]
},





{
front: "awk — Important options",
back: "-F SEP → set the field separator; -f FILE → read an awk program from a file; -v VAR=VAL → assign a variable before execution.",
tags: ["awk", "options"]
},





{
front: "grep vs sed vs awk",
back: "grep finds lines matching a pattern; sed performs simple substitutions and stream edits; awk handles complex field-based processing, calculations, and structured output.",
tags: ["grep", "sed", "awk"]
}
]
});
