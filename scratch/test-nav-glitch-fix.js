const fs = require("fs");
const path = require("path");

const rootDir = "c:\\Users\\Engr. Kiel\\Documents\\KLM CINEMATICS";

console.log("=== VERIFYING NAV GLITCH RESOLUTION ===");

const navbarCode = fs.readFileSync(path.join(rootDir, "assets", "js", "navbar.js"), "utf8");
const marketingCode = fs.readFileSync(path.join(rootDir, "assets", "js", "marketing.js"), "utf8");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Check that marketing.js no longer has a competing IntersectionObserver
assert(
  !marketingCode.includes("new IntersectionObserver"),
  "marketing.js does NOT contain a competing IntersectionObserver that can overwrite active nav during scrolling"
);

// 2. Check that marketing.js initMarketingScrollSpy delegates to window.updateScrollSpy
assert(
  marketingCode.includes("window.updateScrollSpy?.()"),
  "marketing.js delegates scroll spy coordination cleanly to navbar.js"
);

// 3. Check that navbar.js locks active state on click
assert(
  navbarCode.includes("isNavClickScrolling = true") && navbarCode.includes("lockedTargetId = targetId"),
  "navbar.js registers target lock (lockedTargetId) when setNavClickScrolling is invoked"
);

// 4. Check that setActiveNavLink rejects mismatched updates when locked
assert(
  navbarCode.includes("if (isNavClickScrolling && !force && lockedTargetId)") &&
  navbarCode.includes("if (getCleanNavKey(targetId) !== getCleanNavKey(lockedTargetId))"),
  "navbar.js setActiveNavLink rejects intermediate section updates while smooth scroll is locked"
);

// 5. Check debounce scroll release in onScroll
assert(
  navbarCode.includes("if (isNavClickScrolling)") &&
  navbarCode.includes("releaseNavLock()"),
  "navbar.js onScroll debounces lock release until scrolling completely comes to rest"
);

// 6. Check scrollend listener
assert(
  navbarCode.includes('window.addEventListener("scrollend"'),
  "navbar.js listens for native scrollend event to cleanly unlock target"
);

// 7. Check logo click has target lock
assert(
  navbarCode.includes('window.setNavClickScrolling(true, "home"') &&
  navbarCode.includes('setActiveNavLink("home", true)'),
  "navbar.js site logo click locks active state to 'home' to prevent bounce during scroll-to-top"
);

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
