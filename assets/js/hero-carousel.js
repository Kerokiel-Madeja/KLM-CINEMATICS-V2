/* ==========================================================
   KLM CINEMATICS — Hero Carousel (TMDB Daily Trending)
   Fetches the top-5 daily trending items, auto-rotates every
   4 seconds, and populates the existing hero DOM elements.
   ========================================================== */

(() => {
  "use strict";

  /* ── Constants ─────────────────────────────────────────── */
  const TMDB_API_KEY   = "57a0bf48cdfb41f42652162db1f0617e";
  const TMDB_ENDPOINT  = `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`;
  const TMDB_IMG_BASE  = "https://image.tmdb.org/t/p/w1280";
  const SLIDE_INTERVAL = 4000; // ms
  const MAX_SLIDES     = 5;

  /* ── State ─────────────────────────────────────────────── */
  let slides          = [];
  let currentIndex    = 0;
  let autoTimer       = null;
  let isTransitioning = false;

  /* ── DOM refs (resolved inside initCarousel) ────────────── */
  let heroSection, heroBackdrop, heroTitle, heroMeta,
      heroDescription, heroBadge, heroIndicators,
      heroPrevBtn, heroNextBtn, heroContentEl;

  /* ── Utility: clamp overview text to ~200 chars ─────────── */
  function clampText(text, limit = 200) {
    if (!text) return "No description available.";
    return text.length > limit ? text.slice(0, limit).trimEnd() + "\u2026" : text;
  }

  /* ── Utility: human-readable media type label ───────────── */
  function typeLabel(item) {
    if (item.media_type === "movie")  return "Movie";
    if (item.media_type === "tv")     return "TV Series";
    if (item.media_type === "person") return "Person";
    return item.media_type ?? "Unknown";
  }

  /* ── Utility: format vote average ──────────────────────── */
  function formatRating(v) {
    return v ? `\u2B50 ${parseFloat(v).toFixed(1)}` : "\u2B50 N/A";
  }

  /* ── Utility: extract year from release / air date ──────── */
  function releaseYear(item) {
    const raw = item.release_date || item.first_air_date || "";
    return raw ? raw.slice(0, 4) : "";
  }

  /* ── Build dot indicator buttons ───────────────────────── */
  function buildIndicators() {
    if (!heroIndicators) return;
    heroIndicators.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type      = "button";
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.dataset.index = i;
      dot.addEventListener("click", () => {
        if (i === currentIndex) return;
        goTo(i, true);
      });
      heroIndicators.appendChild(dot);
    });
  }

  /* ── Sync dot active state ──────────────────────────────── */
  function updateIndicators() {
    if (!heroIndicators) return;
    heroIndicators.querySelectorAll(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  /* ── Populate hero DOM with a single slide's data ───────── */
  function renderSlide(item) {
    const title       = item.title || item.name || "Untitled";
    const description = clampText(item.overview);
    const rating      = formatRating(item.vote_average);
    const year        = releaseYear(item);
    const type        = typeLabel(item);
    const imgPath     = item.backdrop_path
      ? `${TMDB_IMG_BASE}${item.backdrop_path}`
      : null;

    /* Backdrop photo */
    if (imgPath) {
      heroBackdrop.style.backgroundImage    = `url('${imgPath}')`;
      heroBackdrop.style.backgroundSize     = "cover";
      heroBackdrop.style.backgroundPosition = "center 20%";
    } else {
      heroBackdrop.style.backgroundImage = "none";
    }

    /* Title */
    if (heroTitle) heroTitle.textContent = title;

    /* Meta row  ─ rating • year • type */
    if (heroMeta) {
      heroMeta.innerHTML =
        `<span class="rating">${rating}</span>` +
        (year ? `<span class="dot">\u2022</span><span>${year}</span>` : "") +
        `<span class="dot">\u2022</span><span class="tag">${type}</span>`;
    }

    /* Trending rank badge */
    if (heroBadge) {
      const rank = slides.indexOf(item) + 1;
      heroBadge.textContent = `#${rank} Trending Today`;
    }

    /* Description */
    if (heroDescription) heroDescription.textContent = description;

    /* Sync current slide metadata to Watch Now button */
    const watchBtn = heroSection?.querySelector("#watch-now-btn");
    if (watchBtn) {
      watchBtn.setAttribute("data-tmdb-id", item.id || "");
      watchBtn.setAttribute("data-title", title);
      watchBtn.setAttribute("data-overview", description);
      watchBtn.setAttribute("data-year", year);
      watchBtn.setAttribute("data-rating", rating);
      watchBtn.setAttribute("data-type", type);
    }
    if (heroSection) {
      heroSection.setAttribute("data-current-tmdb-id", item.id || "");
    }
    if (window.KLMWatchlist && typeof window.KLMWatchlist.syncUI === "function") {
      window.KLMWatchlist.syncUI();
    }
  }

  /* ── Crossfade transition ──────────────────────────────── */
  function crossfadeTo(index) {
    if (isTransitioning || !slides.length) return;
    isTransitioning = true;

    /* Step 1 – fade out current content + backdrop */
    heroContentEl.classList.add("hero-fade-out");
    heroBackdrop.classList.add("hero-backdrop-fade");

    setTimeout(() => {
      /* Step 2 – swap data at the hidden state */
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      renderSlide(slides[currentIndex]);
      updateIndicators();

      /* Step 3 – fade back in */
      heroContentEl.classList.remove("hero-fade-out");
      heroBackdrop.classList.remove("hero-backdrop-fade");
      heroContentEl.classList.add("hero-fade-in");
      heroBackdrop.classList.add("hero-backdrop-reveal");

      setTimeout(() => {
        heroContentEl.classList.remove("hero-fade-in");
        heroBackdrop.classList.remove("hero-backdrop-reveal");
        isTransitioning = false;
      }, 500);
    }, 400);
  }

  /* ── Public navigate helper (optionally resets timer) ───── */
  function goTo(index, resetTimer = false) {
    crossfadeTo(index);
    if (resetTimer) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  /* ── Auto-play controls ─────────────────────────────────── */
  function startAutoPlay() {
    if (autoTimer) return;
    autoTimer = setInterval(() => {
      goTo(currentIndex + 1);
    }, SLIDE_INTERVAL);
  }

  function stopAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  /* ── Attach prev/next buttons & hover pause ─────────────── */
  function wireControls() {
    if (heroPrevBtn) {
      heroPrevBtn.addEventListener("click", () => goTo(currentIndex - 1, true));
    }
    if (heroNextBtn) {
      heroNextBtn.addEventListener("click", () => goTo(currentIndex + 1, true));
    }

    /* Pause auto-play while hovering the hero on desktop */
    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopAutoPlay);
      heroSection.addEventListener("mouseleave", startAutoPlay);
    }
  }

  /* ── Main: fetch trending data & boot the carousel ──────── */
  async function initCarousel() {
    /* Resolve all needed DOM references */
    heroSection     = document.getElementById("home");
    heroBackdrop    = heroSection?.querySelector(".hero-backdrop");
    heroContentEl   = heroSection?.querySelector(".hero-content");
    heroTitle       = heroSection?.querySelector(".hero-title");
    heroMeta        = heroSection?.querySelector(".hero-meta");
    heroDescription = heroSection?.querySelector(".hero-description");
    heroBadge       = heroSection?.querySelector(".hero-badge");
    heroIndicators  = heroSection?.querySelector(".hero-indicators");
    heroPrevBtn     = heroSection?.querySelector(".hero-prev-btn");
    heroNextBtn     = heroSection?.querySelector(".hero-next-btn");

    if (!heroSection || !heroBackdrop || !heroContentEl) {
      console.warn("[HeroCarousel] Required hero DOM elements not found.");
      return;
    }

    try {
      const res = await fetch(TMDB_ENDPOINT);
      if (!res.ok) throw new Error(`TMDB API responded with status ${res.status}`);
      const data = await res.json();

      /* Keep only items that have a backdrop image */
      const filtered = (data.results || [])
        .filter(item => item.backdrop_path)
        .slice(0, MAX_SLIDES);

      if (!filtered.length) throw new Error("No trending items with backdrops returned.");

      slides = filtered;

      /* Render first slide immediately (no fade-in animation) */
      renderSlide(slides[0]);

      /* Build dot indicators */
      buildIndicators();

      /* Wire interactive controls */
      wireControls();

      /* Begin auto-rotation */
      startAutoPlay();

      /* Tag the section so CSS knows the carousel is live */
      heroSection.classList.add("hero-carousel-active");

    } catch (err) {
      console.error("[HeroCarousel] Could not load TMDB trending data:", err);
      /* Graceful degradation: the static placeholder HTML remains unchanged */
    }
  }

  /* ── Boot after DOM is ready ────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousel);
  } else {
    initCarousel();
  }
})();
