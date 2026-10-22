/* ReviewApp content manifest — the ONLY file to update when adding content */
window.ReviewApp.content.setManifest({
  contentVersion: "1.11.0",
  certs: [
    { id: "linux-plus", name: "CompTIA Linux+", color: "#f8a63b" },
    { id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" },
  ],
  files: [
    // ++++++++++++++++ TEMPLATE +++++++++++++++++++++++
    // ====================  Class  ====================
    // ----------------- Flashcards -----------------
    // ----------------- Questions -----------------
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



    // ----------------- Notes -----------------
    "linux-plus/notes/ch01-notes.js",
    "linux-plus/notes/ch02-notes.js",
    "linux-plus/notes/ch03-notes.js", 
    "linux-plus/notes/ch04-notes.js", 



    // ====================  Network+  ====================
    // ----------------- Flashcards -----------------
    "network-plus/flashcards/ch01-intro-to-networking-flashcards.js",
    "network-plus/flashcards/ch02-infrastructure-documentation-flashcards.js",
    "network-plus/flashcards/ch03-addressing-ports-dns-troubleshooting-flashcards.js",
    "network-plus/flashcards/ch04-protocols-flashcards.js",
    "network-plus/flashcards/ch05-cabling-flashcards.js",
    "network-plus/flashcards/ch06-wireless-networking-flashcards.js",
    "network-plus/flashcards/ch07-network-architecture-flashcards.js",
    "network-plus/flashcards/ch08-network-segmentation-flashcards.js",

    // ----------------- Questions -----------------
    "network-plus/questions/ch01-intro-to-networking-questions.js",
    "network-plus/questions/ch02-infrastructure-documentation-questions.js",
    "network-plus/questions/ch03-addressing-ports-dns-troubleshooting-questions.js",
    "network-plus/questions/ch04-protocols-questions.js",
    "network-plus/questions/ch05-cabling-questions.js",
    "network-plus/questions/ch06-wireless-networking-questions.js",
    "network-plus/questions/ch07-network-architecture-questions.js",
    "network-plus/questions/ch08-network-segmentation-questions.js",
    // ----------------- Notes -----------------
    "network-plus/notes/ch01-intro-to-networking-notes.js",
    "network-plus/notes/ch02-infrastructure-documentation-notes.js",
    "network-plus/notes/ch03-addressing-ports-dns-troubleshooting-notes.js",
    "network-plus/notes/ch04-protocols-notes.js",
    "network-plus/notes/ch05-cabling-notes.js",
    "network-plus/notes/ch06-wireless-networking-notes.js",
    "network-plus/notes/ch07-network-architecture-notes.js",
    "network-plus/notes/ch08-network-segmentation-notes.js",
    



  ]
});
