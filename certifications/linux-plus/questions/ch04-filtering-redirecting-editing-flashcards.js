window.ReviewApp.content.register({
type: "questions",
cert: "linux-plus",
chapter: "Ch 04 · Processing and Editing Text",
items: [
{
q: "Which command extracts selected fields, characters, or bytes from text records without modifying the source file?",
type: "mcq",
options: ["cut", "grep", "sort", "sed", "wc"],
answer: 0,
explain: "cut extracts selected portions of each record and writes them to standard output. grep searches, sort orders, sed edits streams, and wc counts text statistics.",
tags: ["cut", "text-processing"]
},

{
q: "Which cut option changes the field delimiter from its default of TAB?",
type: "mcq",
options: ["-f", "-d", "-c", "-s", "-z"],
answer: 1,
explain: "-d specifies the delimiter used to separate fields. -f then selects the desired fields.",
tags: ["cut", "delimiters"]
},
{
q: "Which command extracts the username and shell fields from /etc/passwd?",
type: "mcq",
options: [
"cut -d ':' -f 1,7 /etc/passwd",
"cut -c 1,7 /etc/passwd",
"grep -d ':' -f 1,7 /etc/passwd",
"sort -t: -k1,7 /etc/passwd",
"awk -d ':' -f 1,7 /etc/passwd"
],
answer: 0,
explain: "/etc/passwd uses colons as field delimiters, so -d ':' selects the delimiter and -f 1,7 selects fields 1 and 7.",
tags: ["cut", "etc-passwd"]
},
{
q: "Which cut option displays records only when they contain the specified delimiter?",
type: "mcq",
options: ["-z", "-c", "-s", "-b", "-f"],
answer: 2,
explain: "-s means only-delimited and suppresses records that do not contain the designated delimiter.",
tags: ["cut", "options"]
},
{
q: "Which cut option is used when records are terminated by ASCII NUL instead of LF?",
type: "fill",
answer: "-z",
accepts: ["--zero-terminated"],
explain: "cut -z tells cut to treat ASCII NUL as the record terminator instead of the normal newline.",
tags: ["cut", "options", "nul"]
},
{
q: "Which command searches text for records matching a pattern?",
type: "mcq",
options: ["grep", "cut", "fmt", "tee", "uniq"],
answer: 0,
explain: "grep searches input for a specified pattern and displays matching records.",
tags: ["grep", "search"]
},
{
q: "Which grep options are useful for recursively searching a directory while ignoring case?",
type: "multi",
options: ["-r", "-i", "-c", "-v", "-E"],
answer: [0, 1],
explain: "-r recursively searches directories and -i ignores case. The other options perform counting, inversion, or ERE processing.",
tags: ["grep", "options"]
},


{
q: "A password record must begin with the text root. Which regex anchor should be used?",
type: "mcq",
options: ["$", "^", ".", "*", "?"],
answer: 1,
explain: "^ anchors a pattern to the beginning of a line. $ anchors it to the end.",
tags: ["regex", "anchors"]
},


{
q: "What does the regex .* represent in the material?",
type: "mcq",
options: [
"One or more digits",
"Zero or more characters",
"Exactly one character",
"The end of a line",
"A literal period only"
],
answer: 1,
explain: "The dot matches a character and * allows zero or more occurrences, so .* can span multiple characters.",
tags: ["regex", "bre"]
},

{
q: "Which regex matches a character that is not one of the listed characters?",
type: "mcq",
options: ["[abc]", "[^abc]", "(abc)", "abc+", "^abc"],
answer: 1,
explain: "A caret immediately inside the opening bracket negates the character set, so [^abc] means any character other than a, b, or c.",
tags: ["regex", "bre"]
},
{
q: "Which are valid basic-regex anchors or quantifiers described for grep?",
type: "multi",
options: ["^", "$", "*", "{n,m}", "?"],
answer: [0, 1, 2, 3],
explain: "^ and $ are anchors, while *, {n}, and {n,m} are basic-regex repetition constructs. ? is presented as an ERE construct.",
tags: ["regex", "bre", "ere"]
},
{
q: "Which ERE operator means one or more occurrences of the preceding character?",
type: "mcq",
options: ["?", "+", "*", "|", "."],
answer: 1,
explain: "In ERE syntax, + means one or more occurrences. * means zero or more.",
tags: ["regex", "ere"]
},



{
q: "What is the main difference between grep's BRE mode and grep -E?",
type: "mcq",
options: [
"BRE searches only binary files",
"ERE enables constructs such as +, ?, |, and grouping",
"ERE disables anchors such as ^ and $",
"BRE cannot search text files",
"ERE requires numeric sorting"
],
answer: 1,
explain: "grep -E enables extended regular expressions, adding constructs such as +, ?, alternation, and grouping.",
tags: ["grep", "regex", "ere"]
},
{
q: "Which command sorts input data for display without modifying the source file?",
type: "mcq",
options: ["uniq", "sort", "cut", "diff", "fmt"],
answer: 1,
explain: "sort orders its input for display and does not change the original file.",
tags: ["sort", "text-processing"]
},
{
q: "Which sort option performs numeric rather than string sorting?",
type: "mcq",
options: ["-f", "-k", "-n", "-r", "-M"],
answer: 2,
explain: "-n interprets values numerically when sorting.",
tags: ["sort", "options"]
},
{
q: "Which sort options are directly useful for reversing order and removing duplicate sorted entries?",
type: "multi",
options: ["-r", "-u", "-n", "-k", "-M"],
answer: [0, 1],
explain: "-r reverses the sort order and -u emits only the first line from an equal run.",
tags: ["sort", "options"]
},
{
q: "Which command sorts /etc/passwd by UID numerically?",
type: "mcq",
options: [
"sort -t: -k3 -n /etc/passwd",
"sort -d: -f3 /etc/passwd",
"cut -t: -k3 /etc/passwd",
"sort -c3 -n /etc/passwd",
"grep -t: -k3 /etc/passwd"
],
answer: 0,
explain: "The colon separator is set with -t:, field 3 is selected with -k3, and -n performs numeric sorting.",
tags: ["sort", "etc-passwd"]
},
{
q: "Which sort option specifies the field used as the sorting key?",
type: "fill",
answer: "-k",
accepts: ["--key"],
explain: "-k selects a field or key for sorting.",
tags: ["sort", "options"]
},
{
q: "Which sort option specifies the field separator?",
type: "fill",
answer: "-t",
accepts: ["--field-separator"],
explain: "-t defines the character used to separate fields during sorting.",
tags: ["sort", "options"]
},
{
q: "Which sort option writes sorted output to a specified file?",
type: "mcq",
options: ["-o", "-u", "-c", "-V", "-M"],
answer: 0,
explain: "-o directs the sorted result to the named output file instead of standard output.",
tags: ["sort", "options"]
},
{
q: "Which sort modes are supported by the chapter's command table?",
type: "multi",
options: ["Numeric sorting", "Month sorting", "Version sorting", "Case-insensitive sorting", "Recursive sorting"],
answer: [0, 1, 2, 3],
explain: "sort supports -n, -M, -V, and -f for these sorting behaviors. Recursive sorting is associated with grep, not sort.",
tags: ["sort", "options"]
},
{
q: "What is the key limitation of uniq?",
type: "mcq",
options: [
"It reads only binary input",
"It removes only adjacent duplicate lines",
"It changes the source file automatically",
"It supports only numerical data",
"It can process only one line"
],
answer: 1,
explain: "uniq compares neighboring lines, so duplicate entries generally need to be grouped with sort first.",
tags: ["uniq", "sort"]
},
{
q: "Which command counts occurrences of each distinct line in a file?",
type: "mcq",
options: [
"sort file.txt | uniq -c",
"uniq file.txt | wc -l",
"cut file.txt | sort -c",
"grep -c file.txt",
"wc -w file.txt"
],
answer: 0,
explain: "sort groups identical lines and uniq -c prefixes each unique line with its occurrence count.",
tags: ["uniq", "sort", "pipes"]
},
{
q: "Which uniq options select duplicated lines or non-repeated lines?",
type: "multi",
options: ["-d", "-u", "-c", "-f", "-s"],
answer: [0, 1],
explain: "-d shows duplicated lines and -u shows lines that are not repeated.",
tags: ["uniq", "options"]
},
{
q: "What does uniq -f 1 do?",
type: "fill",
answer: "skip the first field when comparing",
accepts: ["skip one field"],
explain: "The -f option tells uniq to skip fields before performing the comparison.",
tags: ["uniq", "options"]
},
{
q: "Which command reads files sequentially and writes their contents to standard output?",
type: "mcq",
options: ["cat", "tee", "fmt", "printf", "sed"],
answer: 0,
explain: "cat reads and outputs files sequentially and can concatenate multiple files.",
tags: ["cat", "text-processing"]
},
{
q: "Which cat option shows a $ at the end of every output line?",
type: "mcq",
options: ["-T", "-v", "-E", "-n", "-s"],
answer: 2,
explain: "-E shows line-ending markers as $.",
tags: ["cat", "options"]
},

{
q: "Which cat option displays non-printing characters using caret and M- notation?",
type: "mcq",
options: ["-v", "-E", "-T", "-s", "-b"],
answer: 0,
explain: "-v exposes non-printing characters using caret and M- notation.",
tags: ["cat", "nonprinting"]
},
{
q: "What does cat -A provide?",
type: "mcq",
options: [
"Line numbering only",
"Equivalent to -vET",
"Only hidden files",
"Only blank-line compression",
"Numeric sorting"
],
answer: 1,
explain: "cat -A is equivalent to -vET and therefore shows nonprinting characters, line endings, and tabs.",
tags: ["cat", "options"]
},
{
q: "What is fmt primarily used for?",
type: "mcq",
options: [
"Sorting filenames",
"Reflowing text to a specified width",
"Searching with regular expressions",
"Counting file descriptors",
"Comparing configuration files"
],
answer: 1,
explain: "fmt is a word-wrap filter that reformats prose to a specified line width.",
tags: ["fmt", "formatting"]
},
{
q: "Which printf format displays a floating-point value?",
type: "mcq",
options: ["%c", "%d", "%f", "%s", "%%"],
answer: 2,
explain: "%f formats a floating-point number.",
tags: ["printf", "formats"]
},

{
q: "Why should a script include \n explicitly when using printf for line-oriented output?",
type: "mcq",
options: [
"printf automatically removes all spaces",
"printf does not automatically append a newline",
"printf ignores format strings",
"printf accepts only integers",
"printf always prints two newlines"
],
answer: 1,
explain: "Unlike typical echo usage, printf does not automatically add a newline, so one must be included when needed.",
tags: ["printf", "shell"]
},
{
q: "Which printf formats or escapes are supported by the chapter?",
type: "multi",
options: ["%s", "%d", "%.2f", "\t", "\n"],
answer: [0, 1, 2, 3],
explain: "%s, %d, floating-point formats such as %.2f, \t, and \n are all supported. The chapter also describes additional escapes.",
tags: ["printf", "formats"]
},
{
q: "What does wc display by default?",
type: "mcq",
options: [
"Bytes, characters, and fields",
"Lines, words, and bytes",
"Words, fields, and lines",
"Characters, lines, and permissions",
"Files, directories, and bytes"
],
answer: 1,
explain: "Without options, wc reports lines, words, and bytes in that order.",
tags: ["wc", "statistics"]
},
{
q: "Which wc option counts lines?",
type: "mcq",
options: ["-L", "-c", "-l", "-m", "-w"],
answer: 2,
explain: "-l reports the number of lines.",
tags: ["wc", "options"]
},
{
q: "Which wc option reports the length of the longest line?",
type: "fill",
answer: "-L",
accepts: ["--max-line-length"],
explain: "-L reports the byte count of the longest line.",
tags: ["wc", "options"]
},
{
q: "Which outputs can wc report with dedicated options?",
type: "multi",
options: ["Line count", "Word count", "Byte count", "Character count", "Longest-line length"],
answer: [0, 1, 2, 3],
explain: "wc provides -l, -w, -c, -m, and -L for these statistics respectively.",
tags: ["wc", "options"]
},
{
q: "A recently edited configuration file may contain a merged line. Which command can help detect an unusually long line?",
type: "mcq",
options: ["wc -L", "grep -r", "cut -c", "uniq -d", "fmt -w"],
answer: 0,
explain: "wc -L reports the longest line length and can reveal unexpectedly long configuration lines.",
tags: ["wc", "troubleshooting"]
},
{
q: "Which file descriptor is associated with STDIN?",
type: "mcq",
options: ["0", "1", "2", "3", "255"],
answer: 0,
explain: "STDIN uses file descriptor 0.",
tags: ["stdin", "file-descriptors"]
},
{
q: "Which file descriptor is associated with STDOUT?",
type: "mcq",
options: ["0", "1", "2", "3", "255"],
answer: 1,
explain: "STDOUT uses file descriptor 1.",
tags: ["stdout", "file-descriptors"]
},
{
q: "Which file descriptor is associated with STDERR?",
type: "mcq",
options: ["0", "1", "2", "3", "255"],
answer: 2,
explain: "STDERR uses file descriptor 2.",
tags: ["stderr", "file-descriptors"]
},
{
q: "Which redirection operators overwrite the target file when it already exists?",
type: "multi",
options: [">", "2>", "&>", ">>", "2>>"],
answer: [0, 1, 2],
explain: ">, 2>, and &> overwrite the target. The >> and 2>> forms append instead.",
tags: ["redirection", "stdout", "stderr"]
},
{
q: "Which operator appends STDOUT to a file?",
type: "fill",
answer: ">>",
explain: ">> sends standard output to the file and appends when the file already exists.",
tags: ["redirection", "stdout"]
},
{
q: "Which operator redirects STDERR to a file while overwriting existing contents?",
type: "mcq",
options: ["2>", "2>>", ">", "&>", "<"],
answer: 0,
explain: "2> targets file descriptor 2 and overwrites the destination file.",
tags: ["redirection", "stderr"]
},
{
q: "Which syntax sends STDERR to the same destination currently used by STDOUT?",
type: "mcq",
options: ["&>", "2>&1", "2>>", "1>&2", "<&0"],
answer: 1,
explain: "2>&1 duplicates STDOUT's current destination for STDERR.",
tags: ["redirection", "stderr", "stdout"]
},
{
q: "Which redirection sends both standard output and standard error to one file while overwriting it?",
type: "fill",
answer: "&>",
accepts: ["&>"],
explain: "&> redirects both STDOUT and STDERR to the same destination.",
tags: ["redirection"]
},
{
q: "What does /dev/null do?",
type: "mcq",
options: [
"Stores all deleted files",
"Discards anything written to it",
"Redirects input back to the terminal",
"Records kernel errors",
"Duplicates standard output"
],
answer: 1,
explain: "/dev/null discards redirected data and is commonly used to suppress unwanted output.",
tags: ["dev-null", "redirection"]
},
{
q: "Which commands correctly use standard input redirection?",
type: "multi",
options: [
"sort < unsorted.txt",
"tr \" \" \" \" < Grades.txt",
"grep word <<< \"this string\"",
"sort > unsorted.txt",
"grep word 2> input.txt"
],
answer: [0, 1, 2],
explain: "< reads STDIN from a file and <<< supplies a single string as STDIN. The other choices redirect output or errors.",
tags: ["stdin", "redirection"]
},


{
q: "What happens when the delimiter of a here document is quoted?",
type: "mcq",
options: [
"The shell expands variables normally",
"Variable expansion inside the document is suppressed",
"The document becomes binary input",
"Only the first line is processed",
"The command exits immediately"
],
answer: 1,
explain: "Quoting the delimiter, such as 'EOF', suppresses expansion of variables inside the here document.",
tags: ["heredoc", "shell-expansion"]
},
{
q: "Which command compares two files line by line and shows their differences?",
type: "mcq",
options: ["diff", "patch", "uniq", "tee", "fmt"],
answer: 0,
explain: "diff compares files line by line and reports their differences.",
tags: ["diff", "comparison"]
},
{
q: "Which diff option produces unified output with three lines of context?",
type: "mcq",
options: ["-y", "-u", "-w", "-i", "-e"],
answer: 1,
explain: "-u selects unified diff format with three lines of surrounding context.",
tags: ["diff", "options"]
},
{
q: "Which diff option ignores case differences?",
type: "fill",
answer: "-i",
accepts: ["--ignore-case"],
explain: "-i causes diff to ignore case when comparing files.",
tags: ["diff", "options"]
},
{
q: "Which diff option displays differences side by side?",
type: "mcq",
options: ["-u", "-e", "-i", "-y", "-w"],
answer: 3,
explain: "-y selects side-by-side output.",
tags: ["diff", "options"]
},
{
q: "Which diff options can ignore whitespace or produce an ed script?",
type: "multi",
options: ["-w", "-e", "-u", "-y", "-i"],
answer: [0, 1],
explain: "-w ignores all whitespace and -e outputs differences as an ed editor script.",
tags: ["diff", "options"]
},
{
q: "Which command can apply a unified diff patch to a file?",
type: "mcq",
options: ["patch original.txt < changes.patch", "diff original.txt < changes.patch", "sed original.txt > changes.patch", "uniq < changes.patch", "tee original.txt < changes.patch"],
answer: 0,
explain: "The patch utility reads the generated patch from standard input and applies it to the target file.",
tags: ["patch", "diff", "redirection"]
},
{
q: "What does the pipe operator | do?",
type: "fill",
answer: "redirects STDOUT to STDIN",
accepts: ["pipes standard output to standard input"],
explain: "The pipe connects commands so the first command's STDOUT becomes the next command's STDIN.",
tags: ["pipes", "redirection"]
},
{
q: "Which pipeline counts entries containing /bin/bash in /etc/passwd?",
type: "mcq",
options: [
"grep \"/bin/bash\" /etc/passwd | wc -l",
"wc -l /etc/passwd | grep \"/bin/bash\"",
"cut /etc/passwd | wc -c",
"sort /etc/passwd | grep -n",
"uniq /etc/passwd | cut -l"
],
answer: 0,
explain: "grep first filters records containing /bin/bash, then wc -l counts those matching records.",
tags: ["pipes", "grep", "wc"]
},
{
q: "Which command saves piped output to a file while also displaying it?",
type: "mcq",
options: ["tee", "cat", "diff", "fmt", "cut"],
answer: 0,
explain: "tee duplicates pipeline output: it writes to the specified file and also continues sending the data to STDOUT.",
tags: ["tee", "pipes"]
},
{
q: "Which tee option appends to the destination file?",
type: "fill",
answer: "-a",
accepts: ["--append"],
explain: "tee -a appends rather than overwriting the destination file.",
tags: ["tee", "options"]
},
{
q: "Which tee option ignores interrupts such as Ctrl+C?",
type: "mcq",
options: ["-a", "-i", "-t", "-p", "-n"],
answer: 1,
explain: "tee -i tells tee to ignore interrupts.",
tags: ["tee", "options"]
},
{
q: "Which commands or shell features can form a multi-stage text-processing pipeline?",
type: "multi",
options: ["grep", "cut", "sort", "wc", "vim"],
answer: [0, 1, 2, 3],
explain:" grep, cut, sort, and wc are commonly chained through pipes. vim is an interactive editor rather than a typical pipeline stage in these examples.",
tags: ["pipes", "text-processing"]
},
{
q: "What is xargs used for?",
type: "mcq",
options: [
"It converts text to binary",
"It turns STDIN items into command arguments",
"It compares files line by line",
"It edits files interactively",
"It sorts fields numerically"
],
answer: 1,
explain: "xargs reads items from standard input and uses them as arguments to another command.",
tags: ["xargs", "shell"]
},
{
q: "Which xargs option prompts before executing each command?",
type: "mcq",
options: ["-0", "-p", "-I", "-n", "-t"],
answer: 1,
explain: "-p enables interactive prompting before execution.",
tags: ["xargs", "options"]
},
{
q: "Which xargs option limits the number of arguments supplied to each command line?",
type: "fill",
answer: "-n",
accepts: ["--max-args"],
explain: "-n NUM limits each invocation to at most NUM arguments.",
tags: ["xargs", "options"]
},
{
q: "Which xargs options are specifically useful for safely processing filenames containing spaces?",
type: "multi",
options: ["-0", "-I", "-p", "-n", "-t"],
answer: [0],
explain: "-0 makes xargs use NUL-delimited input, which pairs safely with find -print0 for filenames containing spaces.",
tags: ["xargs", "filenames"]
},
{
q: "Which find/xargs combination is recommended for filenames containing spaces?",
type: "mcq",
options: [
"find . -print | xargs rm",
"find . -print0 | xargs -0 rm",
"find . -name '* ' | xargs rm",
"find . -null | xargs -p rm",
"find . -print0 | xargs rm -0"
],
answer: 1,
explain: "find -print0 creates NUL-delimited input and xargs -0 reads that format safely.",
tags: ["xargs", "find", "filenames"]
},


{
q: "Which statement about the two command-substitution forms is correct?",
type: "tf",
options: ["A"],
answer: true,
explain: "$(command) is the preferred form, while `command` is the older syntax and is harder to nest.",
tags: ["command-substitution", "shell"]
},
{
q: "What does brace expansion do in Bash?",
type: "mcq",
options: [
"Searches files recursively",
"Generates strings from brace patterns",
"Runs commands in parallel",
"Expands environment variables only",
"Converts regex to wildcards"
],
answer: 1,
explain: "Brace expansion generates strings such as file1 file2 file3 from a brace expression and is a Bash feature rather than a command.",
tags: ["brace-expansion", "bash"]
},


{
q: "Which editor is presented as a simple choice for straightforward text modifications?",
type: "mcq",
options: ["nano", "vim", "sed", "awk", "diff"],
answer: 0,
explain: "nano is described as a good editor for simple text modifications and for users new to terminal editors.",
tags: ["nano", "editors"]
},
{
q: "Which nano shortcut saves the current file?",
type: "mcq",
options: ["Ctrl+O", "Ctrl+X", "Ctrl+K", "Ctrl+W", "Ctrl+G"],
answer: 0,
explain: "Ctrl+O writes the file in nano.",
tags: ["nano", "shortcuts"]
},
{
q: "Which nano shortcuts perform search and help?",
type: "multi",
options: ["Ctrl+W", "Ctrl+G", "Ctrl+K", "Ctrl+U", "Ctrl+O"],
answer: [0, 1],
explain: "Ctrl+W searches for text and Ctrl+G displays help.",
tags: ["nano", "shortcuts"]
},
{
q: "Which nano shortcut cuts the current line?",
type: "fill",
answer: "Ctrl+K",
accepts: ["^K"],
explain: "Ctrl+K cuts the current line in nano.",
tags: ["nano", "shortcuts"]
},

{
q: "Which modes are standard Vim modes described in the chapter?",
type: "multi",
options: ["Command mode", "Insert mode", "Ex mode", "Compile mode", "Binary mode"],
answer: [0, 1, 2],
explain: "The standard modes described are command/normal mode, insert mode, and Ex/colon-command mode.",
tags: ["vim", "modes"]
},
{
q: "Which Vim mode is active when the editor first enters the buffer area?",
type: "mcq",
options: ["Insert mode", "Command mode", "Ex mode", "Replace-only mode", "Search mode"],
answer: 1,
explain: "Vim initially enters command, also called normal, mode.",
tags: ["vim", "modes"]
},
{
q: "Which key enters Insert mode from Vim command mode according to the material?",
type: "mcq",
options: ["I", "Esc", "G", ":", "i"],
answer: 0,
explain: "The material specifically identifies I as the key used to enter Insert mode.",
tags: ["vim", "insert-mode"]
},













{
q: "Which Vim command substitutes text on the current line?",
type: "mcq",
options: [":s/old/new/g", ":%s/old/new/g", ":r old/new", ":w old/new", ":q old/new"],
answer: 0,
explain: ":s/old/new/g applies the substitution to the current line, while :%s applies it to the entire file.",
tags: ["vim", "substitution"]
},
{
q: "Which Vim command substitutes throughout the entire file?",
type: "fill",
answer: ":%s/old/new/g",
explain: "The % address applies the substitution to the whole file and g replaces all occurrences on each matching line.",
tags: ["vim", "substitution"]
},



{
q: "Which Vim Ex command executes a shell command and displays its output without quitting?",
type: "mcq",
options: [":! command", ":r file", ":r! command", ":w command", ":q command"],
answer: 0,
explain: ":! command executes a shell command and displays the result without leaving Vim.",
tags: ["vim", "ex-mode", "shell"]
},

{
q: "Which Vim command reads another file into the current buffer?",
type: "mcq",
options: [":r file", ":w file", ":q file", ":x file", ":! file"],
answer: 0,
explain: ":r file reads the specified file and inserts its contents into the current buffer.",
tags: ["vim", "ex-mode"]
},


{
q: "Which sed option reads commands from a script file?",
type: "mcq",
options: ["-e", "-f", "-i", "-n", "-b"],
answer: 1,
explain: "-f tells sed to read its editing script from the specified file.",
tags: ["sed", "options"]
},
{
q: "Which sed option performs in-place editing of the original file?",
type: "fill",
answer: "-i",
accepts: ["--in-place"],
explain: "-i modifies the original file rather than only writing transformed output.",
tags: ["sed", "options"]
},
{
q: "Which sed option suppresses automatic printing?",
type: "mcq",
options: ["-n", "-i", "-e", "-f", "-s"],
answer: 0,
explain: "-n suppresses automatic output so commands such as p can print selected lines.",
tags: ["sed", "options"]
},
{
q: "Which sed flags can print a changed line or write changed lines to a file?",
type: "multi",
options: ["p", "w FILE", "g", "n", "I"],
answer: [0, 1],
explain: "p prints the line when a substitution occurred, while w FILE writes such changed lines to a file.",
tags: ["sed", "flags"]
},
{
q: "What does the sed substitution flag g do?",
type: "mcq",
options: [
"Matches globally across all files",
"Replaces all occurrences on each line",
"Groups regular expressions",
"Generates a backup file",
"Ignores case"
],
answer: 1,
explain: "The g flag replaces all occurrences on each input line instead of only the first.",
tags: ["sed", "substitution"]
},
{
q: "Which command deletes lines containing the word error from a log?",
type: "mcq",
options: [
"sed '/error/d' logfile.txt",
"sed 's/error//' logfile.txt",
"grep '/error/d' logfile.txt",
"cut '/error/d' logfile.txt",
"awk '/error/d' logfile.txt"
],
answer: 0,
explain: "The sed d command deletes matching lines from the output stream.",
tags: ["sed", "delete"]
},
{
q: "Which command prints only lines 5 through 10 with sed?",
type: "fill",
answer: "sed -n '5,10p' largefile.txt",
explain: "-n suppresses default output and 5,10p explicitly prints lines 5 through 10.",
tags: ["sed", "options"]
},
{
q: "Which tool is best suited to complex field-based processing, calculations, and structured output?",
type: "mcq",
options: ["grep", "sed", "awk", "cut", "uniq"],
answer: 2,
explain: "awk provides field processing plus arithmetic, variables, programming constructs, and formatted output.",
tags: ["awk", "text-processing"]
},




{
q: "Which awk option sets the field separator?",
type: "mcq",
options: ["-f", "-v", "-F", "-s", "-d"],
answer: 2,
explain: "-F SEP sets the field separator used by awk.",
tags: ["awk", "options"]
},
{
q: "Which awk option assigns a variable before execution?",
type: "fill",
answer: "-v",
accepts: ["--assign"],
explain: "-v VAR=VAL assigns a variable before the awk program runs.",
tags: ["awk", "options"]
},

{
q: "Which relationships correctly describe grep, sed, and awk?",
type: "match",
context: "Text-processing tools",
pairs: [
{ item: "grep", match: "Find lines matching a pattern" },
{ item: "sed", match: "Perform simple stream edits" },
{ item: "awk", match: "Process fields and perform calculations" }
],
explain: "grep is primarily used for pattern matching, sed for stream editing, and awk for more complex field-oriented processing.",
tags: ["grep", "sed", "awk"]
},
{
q: "Match each standard stream with its file descriptor.",
type: "match",
context: "Linux standard streams",
pairs: [
{ item: "STDIN", match: "0" },
{ item: "STDOUT", match: "1" },
{ item: "STDERR", match: "2" }
],
explain: "Linux conventionally assigns descriptor 0 to standard input, 1 to standard output, and 2 to standard error.",
tags: ["stdin", "stdout", "stderr"]
},

{
q: "Match each redirection operator with its effect.",
type: "match",
context: "Shell redirection",
pairs: [
{ item: ">", match: "Overwrite file with STDOUT" },
{ item: ">>", match: "Append STDOUT to a file" },
{ item: "2>", match: "Overwrite file with STDERR" },
{ item: "2>&1", match: "Send STDERR to STDOUT's destination" },
{ item: "<", match: "Read STDIN from a file" }
],
explain: "Each operator targets a particular stream or changes where a stream is sent.",
tags: ["redirection", "shell"]
},

{
q: "Match each text-processing utility with its primary role.",
type: "match",
context: "Command-line text tools",
pairs: [
{ item: "cut", match: "Extract selected fields or characters" },
{ item: "sort", match: "Order text records" },
{ item: "uniq", match: "Filter adjacent duplicate lines" },
{ item: "wc", match: "Count text statistics" },
{ item: "diff", match: "Compare two files" }
],
explain: "Each utility performs a distinct text-processing task and is commonly combined with other commands.",
tags: ["text-processing", "commands"]
},
{
q: "Match each editor or stream editor with its primary use.",
type: "match",
context: "Text editing tools",
pairs: [
{ item: "nano", match: "Simple interactive editing" },
{ item: "vim", match: "Powerful interactive editing" },
{ item: "sed", match: "Automated stream transformations" },
{ item: "awk", match: "Field-based processing and reports" }
],
explain: "nano and vim are interactive editors, while sed and awk process text non-interactively.",
tags: ["nano", "vim", "sed", "awk"]
},
{
q: "Which command safely pairs with find -print0 for filenames containing spaces?",
type: "mcq",
options: ["xargs -0", "xargs -n", "xargs -p", "xargs -t", "xargs -I"],
answer: 0,
explain: "find -print0 produces NUL-delimited names, and xargs -0 consumes that format without splitting names at spaces.",
tags: ["xargs", "find", "filenames"]
},
{
q: "Which statements about sed -i are correct?",
type: "multi",
options: [
"It modifies the original file",
"It can be tested safely by first omitting -i",
"Using -i.bak can create a backup",
"It suppresses all output automatically",
"It converts sed into awk"
],
answer: [0, 1, 2],
explain: "-i performs in-place editing; the material recommends testing first without it and notes that -i.bak can preserve a backup.",
tags: ["sed", "in-place"]
},
{
q: "Which command creates a formatted patch file containing differences between two files?",
type: "mcq",
options: [
"diff -u old.conf new.conf > changes.patch",
"patch -u old.conf new.conf > changes.patch",
"diff -e old.conf new.conf < changes.patch",
"sort -u old.conf new.conf > changes.patch",
"tee old.conf new.conf > changes.patch"
],
answer: 0,
explain: "diff -u generates unified differences, and shell output redirection stores them in the patch file.",
tags: ["diff", "patch", "redirection"]
},
{
q: "Which pipeline extracts usernames from /etc/passwd and sorts them?",
type: "mcq",
options: [
"grep \"root\" /etc/passwd | cut -d: -f1 | sort",
"cut -d: -f1 /etc/passwd | grep sort",
"sort /etc/passwd | grep -f1 | cut -d:",
"awk /etc/passwd | sort -d1",
"uniq /etc/passwd | cut -f1 | grep"
],
answer: 0,
explain: "The pipeline demonstrates filtering with grep, extracting the first colon-delimited field with cut, and then sorting the results.",
tags: ["pipes", "cut", "sort"]
},
{
q: "Which statement best distinguishes a shell wildcard from a regular expression?",
type: "tf",
options: ["A"],
answer: true,
explain: "The chapter focuses on regex syntax as patterns used by tools such as grep, while shell pattern matching is a separate mechanism.",
tags: ["regex", "shell"]
},
{
q: "Which operation can be performed without changing the original file?",
type: "mcq",
options: ["sort input.txt", "sed -i 's/a/b/' input.txt", "ed input.txt", "vim input.txt", "cat > input.txt"],
answer: 0,
explain: "sort changes only the displayed output unless redirected elsewhere. sed -i and interactive edits modify the original file.",
tags: ["sort", "files"]
}
]
});
