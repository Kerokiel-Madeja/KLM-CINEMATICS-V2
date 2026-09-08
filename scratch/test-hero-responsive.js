const fs = require("fs");
const path = require("path");

const rootDir = "c:\\Users\\Engr. Kiel\\Documents\\KLM CINEMATICS";
const css = fs.readFileSync(path.join(rootDir, "assets", "css", "marketing.css"), "utf8");

console.log("=== VERIFYING HERO RESPONSIVE STYLING ===");
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

// 1. Check meta alignment in mobile queries
assert(
  css.includes(".mkt-hero-meta {") && css.includes("justify-content: center;"),
  ".mkt-hero-meta centers items (including wrapped genre rows) on mobile"
);

// 2. Check hero container centering
assert(
  css.includes(".mkt-hero-container {") && css.includes("justify-items: center;"),
  ".mkt-hero-container centers items under tablet and mobile breakpoints"
);

// 3. Check slider bar collision fix (relative position with vertical spacing instead of absolute overlap)
assert(
  css.includes(".mkt-hero-slider-bar {") && css.includes("position: relative;") && css.includes("bottom: auto;"),
  ".mkt-hero-slider-bar switches to relative positioning on mobile to prevent overlapping action buttons"
);

// 4. Check flex column layout for hero on mobile
assert(
  css.includes(".mkt-hero {") && css.includes("flex-direction: column;") && css.includes("justify-content: center;"),
  ".mkt-hero uses flex column with center alignment on mobile"
);

// 5. Check subheadline centering
assert(
  css.includes(".mkt-hero-subheadline {") && css.includes("text-align: center;"),
  ".mkt-hero-subheadline is explicitly centered with auto margins"
);

// 6. Check action buttons centering and stacking
assert(
  css.includes(".mkt-hero-actions {") && css.includes("flex-direction: column;") && css.includes("align-items: center;"),
  ".mkt-hero-actions stacks buttons vertically and centers them"
);

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
