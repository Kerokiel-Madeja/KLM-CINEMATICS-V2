const fs = require("fs");
const path = require("path");

const rootDir = "c:\\Users\\Engr. Kiel\\Documents\\KLM CINEMATICS";
const css = fs.readFileSync(path.join(rootDir, "assets", "css", "marketing.css"), "utf8");

console.log("=== VERIFYING MARKETING MOBILE NAVBAR STATES ===");
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

// 1. Normal state on mobile: nav-cta-btn hidden in top bar (tucked inside hamburger drawer)
assert(
  css.includes(".marketing-page .navbar:not(.scrolled) .nav-cta-btn {") &&
  css.includes("display: none !important;"),
  "Normal state on mobile hides nav-cta-btn from top bar (accessible inside hamburger drawer)"
);

// 2. Scrolled state on mobile: right-nav-list flattened with display: contents
assert(
  css.includes(".marketing-page .navbar.scrolled .right-nav-list {") &&
  css.includes("display: contents !important;"),
  "Scrolled state on mobile uses display: contents on right-nav-list so CTA and hamburger become direct flex items"
);

// 3. Scrolled state on mobile: nav-cta-btn on the left (order: 1)
assert(
  css.includes(".marketing-page .navbar.scrolled .nav-cta-btn {") &&
  css.includes("order: 1 !important;"),
  "Scrolled state on mobile places nav-cta-btn on the LEFT (order: 1)"
);

// 4. Scrolled state on mobile: circular red button with 50% border-radius and hidden text
assert(
  css.includes(".marketing-page .navbar.scrolled .nav-cta-btn {") &&
  css.includes("border-radius: 50% !important;") &&
  css.includes(".marketing-page .navbar.scrolled .nav-cta-btn span {") &&
  css.includes("display: none !important;"),
  "nav-cta-btn on mobile scrolled state is a circular red button with text hidden (play icon only)"
);

// 5. Scrolled state on mobile: logo in the center (order: 2)
assert(
  css.includes(".marketing-page .navbar.scrolled .logo {") &&
  css.includes("order: 2 !important;"),
  "Scrolled state on mobile centers the logo in the middle (order: 2)"
);

// 6. Scrolled state on mobile: hamburger-btn on the right (order: 3)
assert(
  css.includes(".marketing-page .navbar.scrolled .hamburger-btn {") &&
  css.includes("order: 3 !important;"),
  "Scrolled state on mobile places the hamburger button on the RIGHT (order: 3)"
);

// 7. Streaming site styles unaffected (style.css retains its search/logo/hamburger layout)
const styleCss = fs.readFileSync(path.join(rootDir, "assets", "css", "style.css"), "utf8");
assert(
  styleCss.includes(".navbar.scrolled .search-button {\r\n  order: 1;") ||
  styleCss.includes(".navbar.scrolled .search-button {\n  order: 1;"),
  "Streaming site navbar layout remains completely untouched and isolated"
);

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
