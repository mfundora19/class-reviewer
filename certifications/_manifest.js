/* ReviewApp content manifest — the ONLY file to update when adding content */
window.ReviewApp.content.setManifest({
  contentVersion: "1.2.5",
  certs: [
    { id: "linux-plus", name: "CompTIA Linux+", color: "#f8a63b" },
    { id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" },
  ],
  files: [
    // ++++++++++++++++ TEMPLATE +++++++++++++++++++++++
    // ====================  Class  ====================
    // ----------------- Flashcards -----------------
    // ----------------- Questions -----------------
    // ----------------- Labs -----------------
    // ----------------- Notes -----------------



    // ====================  Linux+  ====================
        // ----------------- Flashcards -----------------
    "linux-plus/flashcards/ch01-exploring-linux-flashcards.js",
    "linux-plus/flashcards/ch02-servers-services-security-flashcards.js",
    "linux-plus/flashcards/ch03-directories-flashcards.js",
    "linux-plus/flashcards/ch04-filtering-redirecting-editing-flashcards.js",


    // ----------------- Questions -----------------
    "linux-plus/questions/ch01-exploring-linux-questions.js",
    "linux-plus/questions/ch02-servers-services-security-questions.js",
    "linux-plus/questions/ch03-files-directories-search-questions.js",
    "linux-plus/questions/ch04-filtering-redirecting-editing-flashcards.js",


    // ----------------- Labs -----------------
    "linux-plus/labs/ch01-exploring-linux-labs.js",
    "linux-plus/labs/ch02-servers-services-security-labs.js",
    "linux-plus/labs/ch03-files-dirs-search-labs.js",
    "linux-plus/labs/ch04-filtering-redirecting-editing-labs.js",

    // ----------------- Notes -----------------
    "linux-plus/notes/ch01-notes.js",
    "linux-plus/notes/ch02-notes.js",
    "linux-plus/notes/ch03-notes.js", 
    "linux-plus/notes/ch04-notes.js", 



    // ====================  Network+  ====================
    // ----------------- Flashcards -----------------
    "network-plus/flashcards/ch01-intro-to-networking-flashcards.js",
    "network-plus/flashcards/ch02-infrastructure-documentation-flashcards.js",

    // ----------------- Questions -----------------
    "network-plus/questions/ch01-intro-to-networking-questions.js",
    "network-plus/questions/ch02-infrastructure-documentation-questions.js",
    // ----------------- Labs -----------------
    "network-plus/labs/ch01-intro-to-networking-labs.js",
    "network-plus/labs/ch02-infrastructure-documentation-labs.js",
    // ----------------- Notes -----------------
    "network-plus/notes/ch01-notes.js",
    "network-plus/notes/ch02-notes.js",
    



  ]
});
