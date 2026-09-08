/**
 * Automated Verification: Section Cards Count, Desktop Grid Rows, Banner Border Radius,
 * Hollywood Stars CTA removal, and Mobile Tabs Dropdown.
 */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const htmlPath = path.resolve(__dirname, "../index.html");
const cssPath = path.resolve(__dirname, "../assets/css/marketing.css");
const jsPath = path.resolve(__dirname, "../assets/js/marketing.js");

const html = fs.readFileSync(htmlPath, "utf-8");
const css = fs.readFileSync(cssPath, "utf-8");
const js = fs.readFileSync(jsPath, "utf-8");

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${description}`);
    passed++;
  } catch (err) {
    console.error(`❌ FAIL: ${description}`);
    console.error(err);
    failed++;
  }
}

console.log("=== VERIFYING SECTION CARDS, DESKTOP ROWS, AND MOBILE TABS DROPDOWN ===");

// 1. Real-Time Global Charts: 10 cards, 2 rows of 5 on desktop
test("Trending section slices and renders 10 cards", () => {
  assert(js.includes("items = items.slice(0, 10);"), "Trending section must slice to 10 items");
});

test("Desktop grid for trending cards is configured for 5 equal columns (2 rows of 5)", () => {
  assert(
    css.includes("grid-template-columns: repeat(5, minmax(0, 1fr));") &&
    css.includes(".mkt-cards-grid"),
    ".mkt-cards-grid must use repeat(5, minmax(0, 1fr)) for 2 rows of 5 cards"
  );
});

// 2. Hollywood Talent & Stars: 10 cards, 2 rows of 5 on desktop
test("Hollywood Talent & Stars slices and renders 10 actor cards", () => {
  assert(
    js.includes("const items = (persons || []).slice(0, 10);"),
    "ActorsSection must slice persons to 10 items"
  );
});

test("Desktop grid for actor cards is configured for 5 equal columns (2 rows of 5)", () => {
  assert(
    css.includes(".mkt-actors-grid") &&
    css.includes("grid-template-columns: repeat(5, minmax(0, 1fr));"),
    ".mkt-actors-grid must use repeat(5, minmax(0, 1fr)) for 2 rows of 5 cards"
  );
});

// 3. Live Industry Dispatch: 6 cards, 2 rows of 3 on desktop
test("Live Industry Dispatch slices and renders 6 news cards", () => {
  assert(
    js.includes("const items = (articles || []).slice(0, 6);"),
    "NewsSection must slice articles to 6 items"
  );
});

test("Desktop grid for news cards is configured for 3 equal columns (2 rows of 3)", () => {
  assert(
    css.includes(".mkt-news-grid") &&
    css.includes("grid-template-columns: repeat(3, minmax(0, 1fr));"),
    ".mkt-news-grid must use repeat(3, minmax(0, 1fr)) for 2 rows of 3 cards"
  );
});

// 4. Hollywood Talent & Stars - Remove the [Discover Filmographies] button
test("Discover Filmographies button is removed from index.html", () => {
  assert(
    !html.includes("Discover Filmographies"),
    "[Discover Filmographies] button must not be present in index.html"
  );
});

// 5. mkt-banner-title - Remove the border raduis
test("mkt-banner-title and conversion banner have border-radius removed", () => {
  assert(
    css.includes(".mkt-banner-title") && css.includes("border-radius: 0 !important;"),
    ".mkt-banner-title must have border-radius: 0 !important"
  );
  assert(
    css.includes(".mkt-conversion-banner") && css.includes("border-radius: 0 !important;"),
    ".mkt-conversion-banner must have border-radius: 0 !important"
  );
});

// 6. Mobile tabs dropdown
test("mkt-tabs is wrapped with dropdown trigger markup in index.html", () => {
  assert(html.includes('id="mkt-tabs-wrapper"'), "Must have #mkt-tabs-wrapper");
  assert(html.includes('id="mkt-tabs-dropdown-btn"'), "Must have #mkt-tabs-dropdown-btn");
  assert(html.includes('id="mkt-tabs-current-label"'), "Must have #mkt-tabs-current-label");
  assert(html.includes('id="mkt-tabs-menu"'), "Must have #mkt-tabs-menu");
});

test("Desktop styles hide dropdown button and display tabs inline", () => {
  assert(css.includes(".mkt-tabs-dropdown-btn"), "CSS must define .mkt-tabs-dropdown-btn");
  assert(css.includes(".mkt-tabs-wrapper"), "CSS must define .mkt-tabs-wrapper");
});

test("Mobile (<= 768px) styles transform tabs into dropdown with open state", () => {
  assert(css.includes(".mkt-tabs-wrapper.open .mkt-tabs"), "CSS must handle open dropdown state");
  assert(css.includes(".mkt-tabs-wrapper.open .mkt-dropdown-chevron"), "CSS must rotate chevron on open");
  assert(css.includes("@keyframes mktDropdownFade"), "CSS must define dropdown animation");
});

test("JavaScript manages mobile dropdown toggle, outside click, escape, and label synchronization", () => {
  assert(js.includes('document.getElementById("mkt-tabs-dropdown-btn")'), "JS must query dropdown button");
  assert(js.includes('document.getElementById("mkt-tabs-wrapper")'), "JS must query tabs wrapper");
  assert(js.includes('document.getElementById("mkt-tabs-current-label")'), "JS must query current label");
  assert(js.includes('currentLabel.textContent = "Trending Movies Today"'), "JS must sync Movies label");
  assert(js.includes('currentLabel.textContent = "Trending TV Series"'), "JS must sync TV label");
  assert(js.includes('currentLabel.textContent = "Trending Anime"'), "JS must sync Anime label");
  assert(js.includes('closeDropdown()'), "JS must close dropdown upon selection or outside click");
});

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
