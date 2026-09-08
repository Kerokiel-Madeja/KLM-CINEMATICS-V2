/**
 * Automated Verification: My List Button Visibility on Small Screen Hamburger Menu
 * Checks index.html, movies.html, tv-shows.html, anime.html, stream.html,
 * responsive.css, and marketing.css.
 */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const responsiveCss = fs.readFileSync(path.resolve(__dirname, "../assets/css/responsive.css"), "utf-8");
const marketingCss = fs.readFileSync(path.resolve(__dirname, "../assets/css/marketing.css"), "utf-8");
const indexHtml = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
const moviesHtml = fs.readFileSync(path.resolve(__dirname, "../movies.html"), "utf-8");
const tvHtml = fs.readFileSync(path.resolve(__dirname, "../tv-shows.html"), "utf-8");
const animeHtml = fs.readFileSync(path.resolve(__dirname, "../anime.html"), "utf-8");
const streamHtml = fs.readFileSync(path.resolve(__dirname, "../stream.html"), "utf-8");

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

console.log("=== VERIFYING MY LIST ON SMALL SCREEN HAMBURGER MENU ===");

// 1. responsive.css fixes
test("responsive.css scopes desktop my-list-btn hiding to top row only", () => {
  assert(
    responsiveCss.includes(".navbar-top .my-list-btn") ||
    responsiveCss.includes(".right-nav-list .my-list-btn"),
    "Must target desktop navbar containers when hiding on mobile"
  );
  assert(
    !responsiveCss.match(/^\s*\.my-list-btn\s*\{\s*display:\s*none\s*!important;\s*\}/m),
    "Must NOT globally hide .my-list-btn with !important"
  );
});

test("responsive.css explicitly ensures drawer My List item is visible (display: flex !important)", () => {
  assert(
    responsiveCss.includes("#footer-my-list-btn") &&
    responsiveCss.includes("display: flex !important;"),
    "#footer-my-list-btn must be display: flex !important in responsive.css"
  );
});

// 2. index.html checks
test("index.html contains #footer-my-list-btn in mobile drawer", () => {
  assert(
    indexHtml.includes('id="footer-my-list-btn"'),
    "index.html must include #footer-my-list-btn in drawer"
  );
  assert(
    indexHtml.includes('data-target="my-list"'),
    "index.html must include data-target='my-list'"
  );
  assert(
    indexHtml.includes("My List"),
    "index.html must include text 'My List'"
  );
  assert(
    indexHtml.includes('src="assets/js/watchlist.js"'),
    "index.html must load assets/js/watchlist.js"
  );
});

// 3. Subpage and streaming checks
test("movies.html has #footer-my-list-btn in hamburger drawer", () => {
  assert(moviesHtml.includes('id="footer-my-list-btn"'), "movies.html must have #footer-my-list-btn");
  assert(moviesHtml.includes('class="nav-menu-item nav-menu-footer-item my-list-btn"'), "movies.html must have class my-list-btn");
});

test("tv-shows.html has #footer-my-list-btn in hamburger drawer", () => {
  assert(tvHtml.includes('id="footer-my-list-btn"'), "tv-shows.html must have #footer-my-list-btn");
  assert(tvHtml.includes('class="nav-menu-item nav-menu-footer-item my-list-btn"'), "tv-shows.html must have class my-list-btn");
});

test("anime.html has #footer-my-list-btn in hamburger drawer", () => {
  assert(animeHtml.includes('id="footer-my-list-btn"'), "anime.html must have #footer-my-list-btn");
  assert(animeHtml.includes('class="nav-menu-item nav-menu-footer-item my-list-btn"'), "anime.html must have class my-list-btn");
});

test("stream.html has #footer-my-list-btn with my-list-btn class in hamburger drawer", () => {
  assert(streamHtml.includes('id="footer-my-list-btn"'), "stream.html must have #footer-my-list-btn");
  assert(streamHtml.includes('my-list-btn'), "stream.html must have class my-list-btn on footer-my-list-btn");
});

// 4. marketing.css checks
test("marketing.css has dedicated mobile drawer styling for #footer-my-list-btn", () => {
  assert(
    marketingCss.includes(".marketing-page .nav-menu-collapse #footer-my-list-btn"),
    "marketing.css must style #footer-my-list-btn in drawer"
  );
});

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
