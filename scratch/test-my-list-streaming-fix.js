/**
 * Automated Verification: My List on Main Streaming Site Does NOT Redirect to Marketing Page
 * Checks subpages.js, navbar.js, movies.html, tv-shows.html, anime.html, stream.html, index.html.
 */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const subpagesJs = fs.readFileSync(path.resolve(__dirname, "../assets/js/subpages.js"), "utf-8");
const navbarJs = fs.readFileSync(path.resolve(__dirname, "../assets/js/navbar.js"), "utf-8");
const moviesHtml = fs.readFileSync(path.resolve(__dirname, "../movies.html"), "utf-8");
const tvHtml = fs.readFileSync(path.resolve(__dirname, "../tv-shows.html"), "utf-8");
const animeHtml = fs.readFileSync(path.resolve(__dirname, "../anime.html"), "utf-8");
const streamHtml = fs.readFileSync(path.resolve(__dirname, "../stream.html"), "utf-8");
const indexHtml = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

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

console.log("=== VERIFYING MY LIST ON STREAMING SITE DOES NOT NAVIGATE TO MARKETING PAGE ===");

// 1. Check that NO HTML files use "index.html#My-List"
test("No HTML files contain index.html#My-List which would navigate back to marketing page", () => {
  assert(!moviesHtml.includes("index.html#My-List"), "movies.html must not use index.html#My-List");
  assert(!tvHtml.includes("index.html#My-List"), "tv-shows.html must not use index.html#My-List");
  assert(!animeHtml.includes("index.html#My-List"), "anime.html must not use index.html#My-List");
  assert(!streamHtml.includes("index.html#My-List"), "stream.html must not use index.html#My-List");
  assert(!indexHtml.includes("index.html#My-List"), "index.html must not use index.html#My-List");
});

// 2. Check that subpages.js explicitly ignores My List clicks
test("subpages.js ignores My List clicks and never triggers index.html#home redirect", () => {
  assert(
    subpagesJs.includes('this.classList.contains("my-list-btn")') &&
    subpagesJs.includes('rawDataTarget === "my-list"'),
    "subpages.js must check for my-list-btn and my-list data-target"
  );
  assert(
    subpagesJs.includes('!rawHref.includes("list")'),
    "subpages.js must ensure rawHref.includes('index') does not trigger on my-list links"
  );
});

// 3. Check navbar.js ROUTE_MAP and click interceptor
test("navbar.js ROUTE_MAP routes my-list to #My-List instead of index.html#My-List", () => {
  assert(
    navbarJs.includes('"my-list": "#My-List"'),
    "navbar.js ROUTE_MAP must use #My-List"
  );
  assert(
    !navbarJs.includes('"my-list": "index.html#My-List"'),
    "navbar.js ROUTE_MAP must not point to index.html"
  );
});

test("navbar.js intercepted My List click prevents default and opens modal without page navigation", () => {
  assert(
    navbarJs.includes('key === "my-list"') &&
    navbarJs.includes('window.KLMWatchlist.openModal()'),
    "navbar.js must call window.KLMWatchlist.openModal() on my-list click"
  );
});

// 4. Check that all streaming subpages have #My-List href for My List button
test("movies.html has href='#My-List' on both desktop navbar and hamburger drawer", () => {
  assert(moviesHtml.includes('<a href="#My-List" class="nav-item my-list-btn" data-target="my-list">'), "Desktop link must be #My-List");
  assert(moviesHtml.includes('<a href="#My-List" class="nav-menu-item nav-menu-footer-item my-list-btn" id="footer-my-list-btn" data-target="my-list">'), "Drawer link must be #My-List");
});

test("tv-shows.html has href='#My-List' on both desktop navbar and hamburger drawer", () => {
  assert(tvHtml.includes('<a href="#My-List" class="nav-item my-list-btn" data-target="my-list">'), "Desktop link must be #My-List");
  assert(tvHtml.includes('<a href="#My-List" class="nav-menu-item nav-menu-footer-item my-list-btn" id="footer-my-list-btn" data-target="my-list">'), "Drawer link must be #My-List");
});

test("anime.html has href='#My-List' on both desktop navbar and hamburger drawer", () => {
  assert(animeHtml.includes('<a href="#My-List" class="nav-item my-list-btn" data-target="my-list">'), "Desktop link must be #My-List");
  assert(animeHtml.includes('<a href="#My-List" class="nav-menu-item nav-menu-footer-item my-list-btn" id="footer-my-list-btn" data-target="my-list">'), "Drawer link must be #My-List");
});

test("stream.html has href='#My-List' on both desktop navbar and hamburger drawer", () => {
  assert(streamHtml.includes('<a href="#My-List" class="nav-item my-list-btn" data-target="my-list">'), "Desktop link must be #My-List");
  assert(streamHtml.includes('<a href="#My-List" class="nav-menu-item nav-menu-footer-item my-list-btn" id="footer-my-list-btn" data-target="my-list">'), "Drawer link must be #My-List");
});

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
