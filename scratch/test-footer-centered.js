const fs = require("fs");
const path = require("path");

const rootDir = "c:\\Users\\Engr. Kiel\\Documents\\KLM CINEMATICS";
const css = fs.readFileSync(path.join(rootDir, "assets", "css", "marketing.css"), "utf8");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");

console.log("=== VERIFYING FOOTER CENTERING ===");
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

// 1. Check 3 columns grid in footer container
assert(
  css.includes("grid-template-columns: repeat(3, minmax(0, 1fr));") ||
  css.includes("grid-template-columns: repeat(3, 1fr);"),
  "Footer container is configured with exactly 3 columns (eliminating empty 4th column void)"
);

// 2. Check footer container centering
assert(
  css.includes(".mkt-footer-container {") &&
  css.includes("justify-content: center;") &&
  css.includes("justify-items: center;"),
  "Footer container centers grid columns horizontally"
);

// 3. Check brand column centering
assert(
  css.includes(".mkt-footer-brand-col {") &&
  css.includes("align-items: center;") &&
  css.includes("text-align: center;"),
  "Brand column centers logo title, description, and CTA button"
);

// 4. Check navigation and legal columns centering
assert(
  css.includes(".mkt-footer-col {") &&
  css.includes("align-items: center;") &&
  css.includes("text-align: center;"),
  "Navigation and Legal columns are centered"
);

// 5. Check links list centering
assert(
  css.includes(".mkt-footer-links {") &&
  css.includes("align-items: center;") &&
  css.includes("text-align: center;"),
  "Footer link items are centered"
);

// 6. Check Watch Now button centered in index.html
assert(
  html.includes('style="display:flex;justify-content:center;gap:12px;margin-top:0.5rem;width:100%;"'),
  "Footer CTA button container in index.html is centered"
);

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
