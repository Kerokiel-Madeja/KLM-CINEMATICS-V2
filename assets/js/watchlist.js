/**
 * KLM CINEMATICS — Universal Persistent "My Watchlist" Engine & Modal Popup
 * Features:
 * 1. Array of Objects Browser Storage (TMDB IDs, titles, posters, ratings, badges, media types).
 * 2. Dynamic Homepage Watchlist Section rendering with TMDB posters, "SAVED" badges, and direct removal.
 * 3. Dedicated Responsive Watchlist Modal Popup accessible universally from navbar & "Browse all".
 * 4. Real-time DOM updates, counter synchronization, and player modal integration.
 */

(function () {
  "use strict";

  const STORAGE_KEY_ITEMS   = "klm_cinematics_watchlist_items";
  const STORAGE_KEY_LEGACY  = "klm_cinematics_watchlist";
  const TMDB_POSTER_MD      = "https://image.tmdb.org/t/p/w500";
  const TMDB_BACKDROP_MD    = "https://image.tmdb.org/t/p/w780";

  /* ── In-Memory Watchlist State ───────────────────────────── */
  let watchlist = [];

  // Known default demo seed IDs & titles from older builds to auto-clean on existing test devices
  const DEFAULT_SEED_IDS = [157336, 94605, 30984, 37854];
  const DEFAULT_SEED_TITLES = [
    "interstellar", "arcane", "bleach", "one piece",
    "interstellar odyssey", "neon dynasties", "spirit blade: infinite", "eclipse: origins"
  ];

  /* ── Storage Initialization & Migration ──────────────────── */
  function initStorage() {
    try {
      const savedItemsJson = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedItemsJson) {
        const parsed = JSON.parse(savedItemsJson);
        if (Array.isArray(parsed)) {
          // If stored items are purely the old automated demo seed items, clean them up
          const isPurelyDefaultSeed = parsed.length > 0 && parsed.length <= 4 && parsed.every((item) => {
            const id = Number(item.tmdbId || item.id);
            const title = (item.title || "").toLowerCase().trim();
            return DEFAULT_SEED_IDS.includes(id) || DEFAULT_SEED_TITLES.includes(title);
          });

          const isCleanedFlag = localStorage.getItem("klm_watchlist_v2_initialized");
          if (!isCleanedFlag && isPurelyDefaultSeed) {
            watchlist = [];
            persistWatchlist();
            localStorage.setItem("klm_watchlist_v2_initialized", "true");
            return;
          }

          watchlist = parsed;
          localStorage.setItem("klm_watchlist_v2_initialized", "true");
          return;
        }
      }

      // If no array-of-objects yet, check for legacy string array
      const legacyJson = localStorage.getItem(STORAGE_KEY_LEGACY);
      if (legacyJson) {
        const legacyTitles = JSON.parse(legacyJson);
        if (Array.isArray(legacyTitles) && legacyTitles.length > 0) {
          const isLegacyPureSeed = legacyTitles.length <= 4 && legacyTitles.every((t) =>
            DEFAULT_SEED_TITLES.includes(String(t).toLowerCase().trim())
          );
          if (!isLegacyPureSeed) {
            watchlist = legacyTitles.map((t, idx) => ({
              id: Date.now() + idx,
              tmdbId: null,
              title: t,
              posterPath: "",
              backdropPath: "",
              posterUrl: "",
              backdropUrl: "",
              posterClass: "poster-" + ((idx % 12) + 1),
              mediaType: "movie",
              isMovie: true,
              rating: "8.5",
              year: "2026",
              genres: "Cinema Masterpiece",
              overview: "Now streaming on KLM CINEMATICS in ultra-high fidelity.",
              badge: "SAVED"
            }));
            persistWatchlist();
            localStorage.setItem("klm_watchlist_v2_initialized", "true");
            return;
          }
        }
      }

      // Default: Clean empty watchlist for every new user and device!
      watchlist = [];
      persistWatchlist();
      localStorage.setItem("klm_watchlist_v2_initialized", "true");
    } catch (err) {
      console.warn("[Watchlist] Storage error, using empty watchlist:", err);
      watchlist = [];
    }
  }

  function persistWatchlist() {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(watchlist));
      // Keep legacy string array in sync for backward compatibility
      const titles = watchlist.map((item) => item.title);
      localStorage.setItem(STORAGE_KEY_LEGACY, JSON.stringify(titles));
    } catch (err) {
      console.warn("[Watchlist] Failed to write to localStorage:", err);
    }
  }

  /* ── Query & Check Methods ───────────────────────────────── */
  function getWatchlist() {
    return [...watchlist];
  }

  function isInWatchlist(idOrTitle) {
    if (!idOrTitle) return false;
    const search = String(idOrTitle).toLowerCase().trim();
    return watchlist.some((item) => {
      if (item.id && String(item.id).toLowerCase() === search) return true;
      if (item.tmdbId && String(item.tmdbId).toLowerCase() === search) return true;
      if (item.title && item.title.toLowerCase().trim() === search) return true;
      return false;
    });
  }

  function findWatchlistItem(idOrTitle) {
    if (!idOrTitle) return null;
    const search = String(idOrTitle).toLowerCase().trim();
    return watchlist.find((item) => {
      if (item.id && String(item.id).toLowerCase() === search) return true;
      if (item.tmdbId && String(item.tmdbId).toLowerCase() === search) return true;
      if (item.title && item.title.toLowerCase().trim() === search) return true;
      return false;
    }) || null;
  }

  /* ── Mutation Methods ────────────────────────────────────── */
  function addToWatchlist(item) {
    if (!item) return false;
    const title = item.title || item.name || "Untitled";
    if (isInWatchlist(item.id || item.tmdbId || title)) {
      return false;
    }

    const isMovie = item.isMovie !== undefined
      ? Boolean(item.isMovie)
      : (item.mediaType === "movie" || item.category === "movies" || item.type === "Movie");
    const mediaType = item.mediaType || (item.category === "anime" ? "anime" : (isMovie ? "movie" : "tv"));
    const tmdbId = (item.tmdbId && !isNaN(parseInt(item.tmdbId, 10))) ? Number(item.tmdbId) : ((item.id && !isNaN(parseInt(item.id, 10))) ? Number(item.id) : null);
    const posterPath = item.posterPath || item.poster_path || "";
    const backdropPath = item.backdropPath || item.backdrop_path || "";
    const posterUrl = item.posterUrl || (posterPath ? `${TMDB_POSTER_MD}${posterPath}` : (item.backdropUrl || ""));
    const backdropUrl = item.backdropUrl || (backdropPath ? `${TMDB_BACKDROP_MD}${backdropPath}` : (posterUrl || ""));
    const rating = item.rating ? String(item.rating).replace("⭐", "").trim() : (item.vote_average ? Number(item.vote_average).toFixed(1) : "8.5");
    const year = String(item.year || (item.release_date || item.first_air_date || "2026").slice(0, 4));
    const genres = Array.isArray(item.genres)
      ? item.genres.map(g => typeof g === "object" ? g.name : g).slice(0, 2).join(" • ")
      : (item.genres || (isMovie ? "Movie" : "Series"));
    const overview = item.overview || item.description || item.desc || "Now streaming on KLM CINEMATICS.";

    const newItem = {
      id: tmdbId || Date.now(),
      tmdbId: tmdbId,
      title: title,
      rawTitle: item.rawTitle || title,
      posterPath: posterPath,
      backdropPath: backdropPath,
      posterUrl: posterUrl,
      backdropUrl: backdropUrl,
      posterClass: item.posterClass || "poster-1",
      mediaType: mediaType,
      isMovie: isMovie,
      rating: rating,
      year: year,
      genres: genres,
      overview: overview,
      badge: "SAVED",
      dateAdded: Date.now()
    };

    watchlist.unshift(newItem);
    persistWatchlist();
    syncWatchlistUI();
    return true;
  }

  function removeFromWatchlist(idOrTitle) {
    if (!idOrTitle) return false;
    const search = String(idOrTitle).toLowerCase().trim();
    const initialLen = watchlist.length;
    watchlist = watchlist.filter((item) => {
      if (item.id && String(item.id).toLowerCase() === search) return false;
      if (item.tmdbId && String(item.tmdbId).toLowerCase() === search) return false;
      if (item.title && item.title.toLowerCase().trim() === search) return false;
      return true;
    });

    if (watchlist.length !== initialLen) {
      persistWatchlist();
      syncWatchlistUI();
      return true;
    }
    return false;
  }

  function toggleWatchlist(item) {
    if (!item) return { success: false, added: false, action: "removed", valueOf: () => false };
    const identifier = item.tmdbId || item.id || item.title || item.name;
    let added = false;
    if (isInWatchlist(identifier)) {
      removeFromWatchlist(identifier);
      added = false;
    } else {
      addToWatchlist(item);
      added = true;
    }
    return {
      success: true,
      added: added,
      action: added ? "added" : "removed",
      valueOf: () => added,
      toString: () => (added ? "added" : "removed")
    };
  }

  function clearWatchlist() {
    watchlist = [];
    persistWatchlist();
    syncWatchlistUI();
  }

  /* ── Card HTML Builder ───────────────────────────────────── */
  function buildWatchlistCardHTML(item, isInsideModal = false) {
    const imgUrl = item.backdropUrl || item.posterUrl || (item.backdropPath ? `${TMDB_BACKDROP_MD}${item.backdropPath}` : "") || (item.posterPath ? `${TMDB_POSTER_MD}${item.posterPath}` : "");
    const bgStyle = imgUrl
      ? `style="background-image: url('${imgUrl}'); background-size: cover; background-position: center center;"`
      : "";
    const safeOverview = (item.overview || "").replace(/"/g, "&quot;");

    return `
      <article class="cinema-card" tabindex="0" role="button" aria-label="Play ${item.title}" data-tmdb-id="${item.tmdbId || ""}" data-title="${item.title}" data-genres="${item.genres || ""}" data-year="${item.year || "2026"}" data-is-movie="${item.isMovie ? "true" : "false"}" data-media-type="${item.mediaType || "movie"}" data-overview="${safeOverview}">
        <div class="card-poster ${item.posterClass || "poster-1"}" ${bgStyle}>
          <span class="card-badge">SAVED</span>
          <div class="card-poster-top-actions">
            <span class="card-rating">⭐ ${item.rating || "8.5"}</span>
            <button type="button" class="watchlist-card-remove-btn" data-action="remove-watchlist" data-id="${item.id}" data-title="${item.title}" aria-label="Remove ${item.title} from watchlist" title="Remove from watchlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <button type="button" class="card-play-center-btn" tabindex="-1" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
        <div class="card-details">
          <h3 class="card-title" title="${item.title}">${item.title}</h3>
          <p class="card-genre">${item.genres || (item.mediaType === "movie" ? "Movie" : "Series")}</p>
        </div>
      </article>
    `;
  }

  /* ── Homepage Watchlist Section Rendering ────────────────── */
  function renderHomepageWatchlistSection() {
    const section = document.getElementById("My-List");
    if (!section) return;

    let grid = section.querySelector(".cards-grid");
    if (!grid) return;
    grid.id = "cards-watchlist";

    if (watchlist.length === 0) {
      grid.innerHTML = `
        <div class="watchlist-empty-state" style="grid-column: 1 / -1;">
          <div class="watchlist-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Your Watchlist is Empty</h3>
          <p>Explore our catalog of movies, TV shows, and anime to save titles for instant streaming.</p>
          <a href="#home" class="watchlist-empty-action-btn" id="empty-watchlist-explore-btn">Explore Titles</a>
        </div>
      `;
      const exploreBtn = grid.querySelector("#empty-watchlist-explore-btn");
      if (exploreBtn) {
        exploreBtn.addEventListener("click", (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
      return;
    }

    // Display first 4 saved items on homepage grid
    const slice = watchlist.slice(0, 4);
    grid.innerHTML = slice.map((item) => buildWatchlistCardHTML(item, false)).join("");
  }

  /* ── Dedicated Watchlist Modal Popup Creation & Control ──── */
  function ensureWatchlistModal() {
    let modalBackdrop = document.getElementById("watchlist-modal");
    if (modalBackdrop) return modalBackdrop;

    modalBackdrop = document.createElement("div");
    modalBackdrop.className = "watchlist-modal-backdrop";
    modalBackdrop.id = "watchlist-modal";
    modalBackdrop.setAttribute("role", "dialog");
    modalBackdrop.setAttribute("aria-modal", "true");
    modalBackdrop.setAttribute("aria-labelledby", "watchlist-modal-title");
    modalBackdrop.style.display = "none";

    modalBackdrop.innerHTML = `
      <div class="watchlist-modal-box">
        <div class="watchlist-modal-header">
          <div class="watchlist-modal-title-group">
            <h2 class="watchlist-modal-title" id="watchlist-modal-title">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              My Watchlist
            </h2>
            <span class="watchlist-modal-count" id="watchlist-modal-count">0 Titles</span>
          </div>
          <div class="watchlist-modal-actions">
            <button type="button" class="watchlist-clear-all-btn" id="watchlist-clear-all-btn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span class="watchlist-clear-text">Clear All</span>
            </button>
            <button type="button" class="watchlist-modal-close" id="watchlist-modal-close" aria-label="Close watchlist modal" title="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="watchlist-modal-body">
          <div class="watchlist-modal-grid" id="watchlist-modal-grid"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modalBackdrop);

    // Bind Close events
    const closeBtn = modalBackdrop.querySelector("#watchlist-modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeWatchlistModal);

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeWatchlistModal();
    });

    const clearAllBtn = modalBackdrop.querySelector("#watchlist-clear-all-btn");
    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", () => {
        if (watchlist.length > 0) {
          clearWatchlist();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
        closeWatchlistModal();
      }
    });

    return modalBackdrop;
  }

  function renderModalGrid() {
    const modal = ensureWatchlistModal();
    const grid = modal.querySelector("#watchlist-modal-grid");
    const countBadge = modal.querySelector("#watchlist-modal-count");
    const clearAllBtn = modal.querySelector("#watchlist-clear-all-btn");

    if (countBadge) {
      countBadge.textContent = `${watchlist.length} ${watchlist.length === 1 ? "Title" : "Titles"}`;
    }

    if (clearAllBtn) {
      clearAllBtn.style.display = watchlist.length > 0 ? "inline-flex" : "none";
    }

    if (!grid) return;

    if (watchlist.length === 0) {
      grid.innerHTML = `
        <div class="watchlist-empty-state" style="grid-column: 1 / -1;">
          <div class="watchlist-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Your Watchlist is Empty</h3>
          <p>Explore movies, TV shows, and anime across KLM CINEMATICS to add titles to your personal collection.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = watchlist.map((item) => buildWatchlistCardHTML(item, true)).join("");
  }

  function openWatchlistModal() {
    const modal = ensureWatchlistModal();
    renderModalGrid();
    modal.style.display = "flex";
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeWatchlistModal() {
    const modal = document.getElementById("watchlist-modal");
    if (!modal) return;
    modal.classList.remove("open");
    setTimeout(() => {
      modal.style.display = "none";
      if (!document.getElementById("cinema-player-modal")?.classList.contains("open")) {
        document.body.classList.remove("modal-open");
      }
    }, 280);
  }

  /* ── Global Real-Time UI Sync ────────────────────────────── */
  function syncWatchlistUI() {
    // 1. Re-render Homepage Watchlist Section
    renderHomepageWatchlistSection();

    // 2. Re-render Modal Grid if open
    const modal = document.getElementById("watchlist-modal");
    if (modal && modal.classList.contains("open")) {
      renderModalGrid();
    }

    // 3. Update all counter badges in navbar and subpages
    document.querySelectorAll(".item-count, .badge-count").forEach((el) => {
      el.textContent = `${watchlist.length} Saved`;
    });

    const modalCount = document.getElementById("watchlist-modal-count");
    if (modalCount) {
      modalCount.textContent = `${watchlist.length} ${watchlist.length === 1 ? "Title" : "Titles"}`;
    }

    // 4. Synchronize all card bookmark buttons currently visible in DOM
    document.querySelectorAll(".watchlist-btn").forEach((btn) => {
      const card = btn.closest(".rail-card, .cinema-card");
      if (!card) return;
      const title = card.getAttribute("data-title");
      const id = card.getAttribute("data-tmdb-id");
      const saved = isInWatchlist(id || title);
      btn.classList.toggle("active", saved);
      btn.innerHTML = saved
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
    });

    // 5. Synchronize subpage & homepage hero watchlist buttons
    document.querySelectorAll("#hero-watchlist-btn, #add-list-btn, .btn-spotlight-watchlist, .subpage-hero .btn-secondary").forEach((heroBtn) => {
      const heroContainer = heroBtn.closest(".subpage-hero, .hero-spotlight, .hero-section, .hero, .subpage-hero-content");
      const heroTitleEl = heroContainer ? heroContainer.querySelector(".subpage-hero-title, .hero-title") : document.querySelector(".subpage-hero-title, .hero-title");
      const heroTitle = heroTitleEl ? heroTitleEl.textContent.trim() : null;
      if (heroTitle) {
        const saved = isInWatchlist(heroTitle);
        heroBtn.classList.toggle("in-watchlist", saved);
        const isAddListBtn = heroBtn.id === "add-list-btn";
        heroBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${saved ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
          </svg>
          ${saved ? "In Watchlist" : (isAddListBtn ? "Add to My List" : "Add to Watchlist")}
        `;
      }
    });
  }

  /* ── Universal Event Delegation ──────────────────────────── */
  function initEventDelegation() {
    // 1. Delegated Remove from Watchlist clicks (on homepage grid & modal grid)
    document.addEventListener("click", (e) => {
      // Universal Nav and Header "My List" trigger delegation
      const navMyListBtn = e.target.closest('.my-list-btn, #footer-my-list-btn, [data-target="my-list"], a[href="#My-List"]:not(#add-list-btn), a[href*="My-List"]:not(#add-list-btn), a[href="#all-watchlist"]');
      if (navMyListBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.setMenuOpen === "function") {
          window.setMenuOpen(false);
        }
        openWatchlistModal();
        return;
      }

      const removeBtn = e.target.closest('[data-action="remove-watchlist"]');
      if (removeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = removeBtn.getAttribute("data-id");
        const title = removeBtn.getAttribute("data-title");
        removeFromWatchlist(id || title);
        return;
      }

      // Homepage Hero "Add to My List" button toggle
      const heroAddBtn = e.target.closest("#add-list-btn");
      if (heroAddBtn) {
        e.preventDefault();
        e.stopPropagation();
        const heroSection = document.querySelector(".hero-section");
        const watchNowBtn = heroSection ? heroSection.querySelector("#watch-now-btn") : null;
        const title = watchNowBtn?.getAttribute("data-title") || heroSection?.querySelector(".hero-title")?.textContent.trim() || "Cyberspace: Horizon";
        const tmdbId = watchNowBtn?.getAttribute("data-tmdb-id") || heroSection?.getAttribute("data-current-tmdb-id");
        const rating = watchNowBtn?.getAttribute("data-rating") || "9.6";
        const year = watchNowBtn?.getAttribute("data-year") || "2026";
        const type = watchNowBtn?.getAttribute("data-type") || "movie";
        const overview = watchNowBtn?.getAttribute("data-overview") || heroSection?.querySelector(".hero-description")?.textContent.trim() || "";
        const backdropStyle = heroSection?.querySelector(".hero-backdrop")?.style.backgroundImage || "";
        let backdropUrl = "";
        const bgMatch = backdropStyle.match(/url\(['"]?(.*?)['"]?\)/);
        if (bgMatch && bgMatch[1]) backdropUrl = bgMatch[1];

        const itemObj = {
          id: tmdbId ? parseInt(tmdbId, 10) : title,
          tmdbId: tmdbId && !isNaN(parseInt(tmdbId, 10)) ? parseInt(tmdbId, 10) : undefined,
          title: title,
          backdropUrl: backdropUrl,
          posterUrl: backdropUrl,
          mediaType: type.toLowerCase().includes("tv") ? "tv" : "movie",
          isMovie: !type.toLowerCase().includes("tv"),
          rating: rating.replace("⭐", "").trim(),
          year: year,
          genres: "Featured",
          overview: overview,
          badge: "SAVED"
        };
        toggleWatchlist(itemObj);
        return;
      }

      // 2. Play item when card in Watchlist section or modal is clicked
      const card = e.target.closest("#cards-watchlist .cinema-card, #watchlist-modal-grid .cinema-card");
      if (card && !e.target.closest(".watchlist-card-remove-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const title = card.getAttribute("data-title");
        const id = card.getAttribute("data-tmdb-id");
        const found = findWatchlistItem(id || title);

        const playItem = found || {
          tmdbId: id ? Number(id) : null,
          title: title,
          category: card.getAttribute("data-media-type") === "anime" ? "anime" : "movies",
          mediaType: card.getAttribute("data-media-type") || "movie",
          isMovie: card.getAttribute("data-is-movie") === "true",
          rating: card.querySelector(".card-rating")?.textContent.replace("⭐", "").trim() || "8.5",
          year: card.getAttribute("data-year") || "2026",
          duration: "2h 05m",
          genres: card.querySelector(".card-genre")?.textContent.trim() || "",
          description: card.getAttribute("data-overview") || "Streaming on KLM CINEMATICS.",
          overview: card.getAttribute("data-overview") || "Streaming on KLM CINEMATICS."
        };

        if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.openPlayerModal === "function") {
          window.KLMCinematicsSubpages.openPlayerModal(playItem);
        }
      }
    });

    // 3. Navigation Bar "My List" triggers (Universal Subpage Access)
    function attachNavTriggers() {
      const triggers = document.querySelectorAll('.my-list-btn, #footer-my-list-btn, a[data-target="my-list"], a.nav-menu-item[href="#My-List"], a.quick-link[href="#My-List"], a[href="#all-watchlist"]');
      triggers.forEach((btn) => {
        if (btn.dataset.watchlistBound === "true") return;
        btn.dataset.watchlistBound = "true";

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Close mobile menu if open
          if (typeof window.setMenuOpen === "function") {
            window.setMenuOpen(false);
          }

          openWatchlistModal();
        });
      });

      // Homepage "Browse all" trigger in My Watchlist section header
      const browseAll = document.querySelector('#My-List .section-more, a[href="#all-watchlist"]');
      if (browseAll && browseAll.dataset.watchlistBound !== "true") {
        browseAll.dataset.watchlistBound = "true";
        browseAll.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          openWatchlistModal();
        });
      }
    }

    attachNavTriggers();
    // Re-check after DOM manipulations or subpage routing
    setTimeout(attachNavTriggers, 500);
    setTimeout(attachNavTriggers, 1500);
  }

  /* ── Initialization ──────────────────────────────────────── */
  function init() {
    initStorage();
    renderHomepageWatchlistSection();
    ensureWatchlistModal();
    initEventDelegation();
    syncWatchlistUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ── Global API Export ───────────────────────────────────── */
  window.KLMWatchlist = {
    getWatchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    clearWatchlist,
    openModal: openWatchlistModal,
    closeModal: closeWatchlistModal,
    syncUI: syncWatchlistUI
  };

})();
