/* ==========================================================
   KLM CINEMATICS — Catalog Cards (TMDB Weekly Trending)
   Populates Movies, TV Shows, Anime, and Cartoons grids
   concurrently from the TMDB API with landscape backdrops,
   dynamic TMDB ratings, and metadata badges.
   ========================================================== */

(() => {
  "use strict";

  /* ── Config ────────────────────────────────────────────── */
  const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";
  const POSTER_BASE   = "https://image.tmdb.org/t/p/w500";
  const TMDB_PROXY    = "/api/tmdb";
  const CARDS_COUNT   = 4;   // cards per section

  /* ── TMDB Endpoints ────────────────────────────────────── */
  const ENDPOINTS = {
    movies: `${TMDB_PROXY}?path=trending/movie/week`,
    tvshows: `${TMDB_PROXY}?path=trending/tv/week`,
    // Authentic Japanese trending anime (TMDB weekly trending animation)
    anime: `${TMDB_PROXY}?path=trending/tv/week`,
  };

  /* ── Grid targets (matching IDs in HTML) ─────────────────── */
  const GRID_IDS = {
    movies:   "cards-movies",
    tvshows:  "cards-tvshows",
    anime:    "cards-anime",
  };

  /* ── Fallback gradient classes (poster-1 … poster-12) ─── */
  const POSTER_GRADIENTS = [
    "poster-1","poster-2","poster-3","poster-4",
    "poster-5","poster-6","poster-7","poster-8",
    "poster-9","poster-10","poster-11","poster-12",
  ];

  /* ── Utility: pick a deterministic gradient for an item ── */
  function gradientClass(index) {
    return POSTER_GRADIENTS[index % POSTER_GRADIENTS.length];
  }

  /* ── Utility: safe text – strip nulls ───────────────────── */
  function safe(val, fallback = "") {
    return (val && String(val).trim()) || fallback;
  }

  /* ── Utility: clamp overview to ~140 chars ──────────────── */
  function clamp(text, limit = 140) {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit).trimEnd() + "\u2026" : text;
  }

  /* ── Utility: Derive .card-badge text from TMDB data ───── */
  function getBadge(item, index, categoryKey) {
    const year = (item.release_date || item.first_air_date || "").slice(0, 4);
    const vote = Number(item.vote_average) || 0;
    const currentYear = new Date().getFullYear();

    // Top trending item in the category
    if (index === 0) {
      return "TOP TRENDING";
    }
    // High TMDB rating
    if (vote >= 7.8) {
      return "TOP RATED";
    }
    // Recent release (current year or previous year)
    if (year && Number(year) >= currentYear - 1) {
      return "NEW";
    }
    // Classic catalog title
    if (year && Number(year) <= 2005) {
      return "CLASSIC";
    }
    // Anime Japanese origin
    if (categoryKey === "anime" || item.original_language === "ja") {
      return "SUB & DUB";
    }
    // Release year if present
    if (year) {
      return year;
    }
    return "HD";
  }

  /* ── Utility: Format TMDB vote_average for .card-rating ─ */
  function formatRating(voteAverage) {
    const vote = Number(voteAverage);
    return !isNaN(vote) && vote > 0 ? `\u2B50 ${vote.toFixed(1)}` : "\u2B50 N/A";
  }

  /* ── Fetch with error guard ─────────────────────────────── */
  async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB fetch failed [${res.status}] ${url}`);
    return res.json();
  }

  /* ── Build one .cinema-card element ─────────────────────── */
  function buildCard(item, fallbackIndex, categoryKey) {
    const title   = safe(item.title || item.name, "Untitled");
    const genre   = safe(item.overview ? clamp(item.overview) : "", "");

    /* Prefer widescreen backdrop (16:9) so the entire picture is visible
       in the 16:10 card without being zoomed in; fallback to poster */
    const imgUrl = item.backdrop_path
      ? `${BACKDROP_BASE}${item.backdrop_path}`
      : item.poster_path
      ? `${POSTER_BASE}${item.poster_path}`
      : null;

    const gradCls    = gradientClass(fallbackIndex);
    const badgeText  = getBadge(item, fallbackIndex, categoryKey);
    const ratingText = formatRating(item.vote_average);

    /* Card container */
    const card = document.createElement("div");
    card.className = "cinema-card";
    card.tabIndex  = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Play ${title}`);
    if (item.id) {
      card.setAttribute("data-tmdb-id", item.id);
    }
    card.setAttribute("data-category", categoryKey);
    card.setAttribute("data-type", categoryKey === "anime" ? "Anime" : (categoryKey === "movies" ? "Movies" : "TV Shows"));
    const releaseYear = (item.release_date || item.first_air_date || "").slice(0, 4);
    if (releaseYear) {
      card.setAttribute("data-year", releaseYear);
    }
    if (item.overview) {
      card.setAttribute("data-overview", item.overview);
    }

    /* Poster container */
    const poster = document.createElement("div");
    poster.className = `card-poster ${gradCls}`;

    if (imgUrl) {
      poster.style.backgroundImage    = `url('${imgUrl}')`;
      poster.style.backgroundSize     = "cover";
      poster.style.backgroundPosition = "center center";
    }

    /* Poster contents: Badge (top-left), Rating (top-right), Center Play Button */
    poster.innerHTML = `
      <span class="card-badge">${badgeText}</span>
      <span class="card-rating">${ratingText}</span>
      <button type="button" class="card-play-center-btn" tabindex="-1" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </button>`;

    /* Details container */
    const details = document.createElement("div");
    details.className = "card-details";

    const titleEl = document.createElement("h3");
    titleEl.className   = "card-title";
    titleEl.textContent = title;
    titleEl.title       = title;

    const genreEl = document.createElement("p");
    genreEl.className   = "card-genre";
    genreEl.textContent = genre;

    details.appendChild(titleEl);
    details.appendChild(genreEl);

    card.appendChild(poster);
    card.appendChild(details);

    return card;
  }

  /* ── Render items into a grid container ─────────────────── */
  function renderGrid(gridId, items, categoryKey) {
    const grid = document.getElementById(gridId);
    if (!grid) {
      console.warn(`[CatalogCards] Grid #${gridId} not found in DOM.`);
      return;
    }

    /* Clear placeholder static cards */
    grid.innerHTML = "";

    const slice = items.slice(0, CARDS_COUNT);

    if (!slice.length) {
      /* Nothing returned – leave grid empty rather than crash */
      console.warn(`[CatalogCards] No items returned for #${gridId}.`);
      return;
    }

    slice.forEach((item, i) => {
      grid.appendChild(buildCard(item, i, categoryKey));
    });
  }

  /* ── Fetch trending anime ───────────────────────────────── */
  async function fetchTrendingAnime() {
    try {
      // Mirror Movies & TV Shows weekly trending logic from TMDB
      const [p1, p2] = await Promise.all([
        fetchJSON(`${ENDPOINTS.anime}&page=1`).catch(() => ({ results: [] })),
        fetchJSON(`${ENDPOINTS.anime}&page=2`).catch(() => ({ results: [] })),
      ]);

      const combined = [...(p1.results || []), ...(p2.results || [])];
      // Filter strictly for authentic Japanese Anime (original_language ja + animation genre 16)
      let animeList = combined.filter((item) =>
        item.original_language === "ja" &&
        (item.genre_ids?.includes(16) || item.genres?.some((g) => g.id === 16))
      );

      // Deduplicate by ID
      const seenIds = new Set();
      animeList = animeList.filter((item) => {
        if (seenIds.has(item.id)) return false;
        seenIds.add(item.id);
        return true;
      });

      // If fewer than CARDS_COUNT (4) are found in trending TV, supplement with top discover anime
      if (animeList.length < CARDS_COUNT) {
        const discoverData = await fetchJSON(
          `${TMDB_PROXY}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=1`
        ).catch(() => ({ results: [] }));
        for (const item of (discoverData.results || [])) {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            animeList.push(item);
            if (animeList.length >= CARDS_COUNT) break;
          }
        }
      }

      return { results: animeList };
    } catch (err) {
      console.warn("[CatalogCards] fetchTrendingAnime failed:", err);
      // Fallback directly to discover anime
      return fetchJSON(
        `${TMDB_PROXY}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=1`
      );
    }
  }

  /* ── Main orchestrator ───────────────────────────────────── */
  async function initCatalogCards() {
    try {
      /* Fire all 3 fetches in parallel */
      const [moviesData, tvData, animeData] = await Promise.all([
        fetchJSON(ENDPOINTS.movies),
        fetchJSON(ENDPOINTS.tvshows),
        fetchTrendingAnime(),
      ]);

      /* Each TMDB response has a .results array */
      renderGrid(GRID_IDS.movies,   moviesData.results   || [], "movies");
      renderGrid(GRID_IDS.tvshows,  tvData.results       || [], "tvshows");
      renderGrid(GRID_IDS.anime,    animeData.results    || [], "anime");

      window.__catalogCardsLoaded = true;
    } catch (err) {
      /* Log and leave existing placeholder cards intact */
      console.error("[CatalogCards] Failed to load catalog data:", err);
    }
  }

  /* ── Boot ──────────────────────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCatalogCards);
  } else {
    initCatalogCards();
  }
})();
