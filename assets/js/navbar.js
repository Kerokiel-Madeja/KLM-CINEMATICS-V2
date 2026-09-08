/**
 * KLM CINEMATICS - Dynamic Navigation Controller
 * Handles scroll-triggered layout transitions, expanding menu animations,
 * search interactions, and accessibility.
 */

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenuCollapse = document.getElementById("nav-menu-collapse");
  const searchBtn = document.getElementById("search-btn");
  const navLinks = document.querySelectorAll(".nav-item, .nav-menu-item:not(.nav-menu-dropdown-toggle)");

  const SCROLL_THRESHOLD = 30; // Threshold in px to trigger scrolled state
  let isTicking = false;

  // Programmatic smooth scroll lock state & debounce handlers
  let isNavClickScrolling = false;
  let lockedTargetId = null;
  let navClickScrollTimer = null;
  let scrollDebounceTimer = null;

  function releaseNavLock() {
    if (navClickScrollTimer) {
      clearTimeout(navClickScrollTimer);
      navClickScrollTimer = null;
    }
    if (scrollDebounceTimer) {
      clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = null;
    }
    isNavClickScrolling = false;
    lockedTargetId = null;
    if (typeof window.updateScrollSpy === "function") {
      window.updateScrollSpy();
    }
  }

  window.setNavClickScrolling = function (state, targetId = null, duration = 2500) {
    if (state) {
      isNavClickScrolling = true;
      lockedTargetId = targetId;
      if (targetId && typeof setActiveNavLink === "function") {
        setActiveNavLink(targetId, true);
      }
      if (navClickScrollTimer) clearTimeout(navClickScrollTimer);
      navClickScrollTimer = setTimeout(() => {
        releaseNavLock();
      }, duration);
    } else {
      releaseNavLock();
    }
  };

  // Modern browser scroll completion listener
  window.addEventListener("scrollend", () => {
    if (isNavClickScrolling) {
      releaseNavLock();
    }
  });

  // ==========================================================
  // Scroll Handler (Smooth 60fps with requestAnimationFrame)
  // ==========================================================
  function onScroll() {
    if (!navbar) return;

    const currentScrollY = window.scrollY || window.pageYOffset;
    const shouldBeScrolled = currentScrollY > SCROLL_THRESHOLD;

    if (navbar.classList.contains("scrolled") !== shouldBeScrolled) {
      navbar.classList.toggle("scrolled", shouldBeScrolled);

      // Automatically close menu when user scrolls back to the top
      if (!shouldBeScrolled) {
        setMenuOpen(false);
      }
    }

    // While programmatic smooth scroll is active, maintain lock and debounce release
    if (isNavClickScrolling) {
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        releaseNavLock();
      }, 150);
      return;
    }

    // High-performance active navigation highlighting
    if (typeof updateScrollSpy === "function") {
      updateScrollSpy();
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          onScroll();
          isTicking = false;
        });
        isTicking = true;
      }
    },
    { passive: true }
  );

  // Close menu if window is resized to desktop width while at top of page
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && navbar && !navbar.classList.contains("scrolled")) {
      setMenuOpen(false);
    }
  });

  // Initialize on page load in case user refreshed mid-page
  onScroll();

  // ==========================================================
  // Expanding Menu Open / Close Logic
  // ==========================================================
  function setMenuOpen(isOpen) {
    if (!navbar || !hamburgerBtn) return;

    if (isOpen) {
      // Close search modal if open
      closeSearchModal();
      navbar.classList.add("menu-open");
      hamburgerBtn.classList.add("open");
      hamburgerBtn.setAttribute("aria-expanded", "true");
      if (navMenuCollapse) {
        navMenuCollapse.setAttribute("aria-hidden", "false");
      }
    } else {
      navbar.classList.remove("menu-open");
      hamburgerBtn.classList.remove("open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      if (navMenuCollapse) {
        navMenuCollapse.setAttribute("aria-hidden", "true");
      }
    }
  }

  function toggleMenu() {
    const isOpen = navbar.classList.contains("menu-open");
    setMenuOpen(!isOpen);
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // ==========================================================
  // Catalog Dataset (Cinema Titles with Metadata & Badges)
  // ==========================================================
  const CINEMA_CATALOG = [
    {
      id: 1,
      title: "Coyote vs. Acme",
      year: "2026",
      type: "Movies",
      badge: "MOVIE",
      rating: "7.4",
      genres: ["Animation", "Comedy", "Family"],
      description: "After Acme products fail him one too many times in his dogged pursuit of the Roadrunner, Wile E. Coyote decides to hire a human lawyer to sue the company.",
      posterClass: "poster-1"
    },
    {
      id: 2,
      title: "Shape of My Heart",
      year: "2024",
      type: "Movies",
      badge: "MOVIE",
      rating: "8.1",
      genres: ["Drama", "Romance"],
      description: "A romance about a man and a woman who, due to an unexpected event, end up switching bodies. Despite coming from very different walks of life, they find harmony.",
      posterClass: "poster-2"
    },
    {
      id: 3,
      title: "The Last Sunrise",
      year: "2026",
      type: "Movies",
      badge: "MOVIE",
      rating: "7.6",
      genres: ["Drama", "Sci-Fi"],
      description: "Ry, a college student with a chronic illness, escapes to Mallorca for the summer with her mother, where she discovers an enduring friendship under dying starlight.",
      posterClass: "poster-3"
    },
    {
      id: 4,
      title: "The Runner",
      year: "2025",
      type: "Movies",
      badge: "MOVIE",
      rating: "6.3",
      genres: ["Action", "Thriller"],
      description: "An elite courier gets entangled in a high-stakes government conspiracy when a covert package reveals state secrets during a citywide blackout lockdown.",
      posterClass: "poster-4"
    },
    {
      id: 5,
      title: "Toxic: A Fairy Tale for Grown-Ups",
      year: "2025",
      type: "Movies",
      badge: "MOVIE",
      rating: "7.9",
      genres: ["Action", "Drama"],
      description: "In the gritty underworld of Goa, an ambitious cartel fixer battles rival syndicates and his own moral decay while protecting his estranged daughter.",
      posterClass: "poster-5"
    },
    {
      id: 6,
      title: "Facing El Chapo",
      year: "2024",
      type: "TV Shows",
      badge: "TV SHOW",
      rating: "8.8",
      genres: ["Crime", "Documentary"],
      description: "An investigative docuseries providing rare insider access into the DEA task forces and operatives who orchestrated the capture of the cartel kingpin.",
      posterClass: "poster-6"
    },
    {
      id: 7,
      title: "Cyberpunk: Neon Edge",
      year: "2025",
      type: "Anime",
      badge: "ANIME",
      rating: "8.7",
      genres: ["Animation", "Action", "Sci-Fi"],
      description: "In an electric neon city where memories are tradable currency, an orphaned netrunner discovers a forbidden archive that challenges the governing AI mainframe.",
      posterClass: "poster-7"
    },
    {
      id: 8,
      title: "Arcane Odyssey",
      year: "2025",
      type: "TV Shows",
      badge: "TV SHOW",
      rating: "9.1",
      genres: ["Animation", "Adventure"],
      description: "Two young cartographers venture across the uncharted Shattered Isles to find the source of ancient aether crystals before the Empire strikes.",
      posterClass: "poster-8"
    },
    {
      id: 9,
      title: "Shadow Operative",
      year: "2024",
      type: "Movies",
      badge: "MOVIE",
      rating: "8.2",
      genres: ["Action", "Crime"],
      description: "A retired black-ops extractor is pulled back for one final mission across Eastern Europe when a former protégé is targeted by rogue intelligence agents.",
      posterClass: "poster-9"
    },
    {
      id: 10,
      title: "The Deep Silence",
      year: "2024",
      type: "Movies",
      badge: "MOVIE",
      rating: "8.5",
      genres: ["Drama", "Adventure"],
      description: "A deep-sea acoustic research team stranded in the Mariana Trench encounters an uncharted biological frequency communicating through sonic pulses.",
      posterClass: "poster-10"
    },
    {
      id: 11,
      title: "Neon Dynasties",
      year: "2025",
      type: "TV Shows",
      badge: "TV SHOW",
      rating: "8.9",
      genres: ["Drama", "Sci-Fi"],
      description: "Multi-generational corporate clans battle for monopolistic dominion over Earth's orbital elevators and interplanetary colonies.",
      posterClass: "poster-11"
    },
    {
      id: 12,
      title: "Spirit Blade: Infinite",
      year: "2026",
      type: "Anime",
      badge: "ANIME",
      rating: "9.7",
      genres: ["Animation", "Action", "Adventure"],
      description: "Wielding the legendary ethereal soul blade, a wandering ronin must sever the bindings of ancient demonic warlords to preserve peace.",
      posterClass: "poster-12"
    }
  ];

  // TMDB Search & Filter Engine
  const TMDB_PROXY = "/api/tmdb";
  const TMDB_GENRES = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western", 10759: "Action & Adventure",
    10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy",
    10766: "Soap", 10767: "Talk", 10768: "War & Politics"
  };

  // Search Modal Elements
  const searchModal = document.getElementById("search-modal");
  const searchModalClose = document.getElementById("search-modal-close");
  const searchModalInput = document.getElementById("search-modal-input");
  const searchModalForm = document.getElementById("search-modal-form");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const emptyResetBtn = document.getElementById("empty-reset-btn");
  const contentTypeButtons = document.querySelectorAll("#content-type-filters .filter-pill-btn");
  const genreCheckboxes = document.querySelectorAll("#genre-filters input[type='checkbox']");

  // State Management
  let currentSearchQuery = "";
  let currentType = "all";
  let currentGenres = new Set();
  let searchDebounceTimer = null;
  let activeSearchController = null;
  let cachedRawResults = [];
  let trendingResultsCache = null;
  const searchResultsCache = new Map();

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================
  // Render Search Loading Effect (Banner + Shimmer Skeletons)
  // ==========================================================
  function renderSearchLoading(query = "") {
    const grid = document.getElementById("search-results-grid");
    const emptyState = document.getElementById("search-empty-state");
    if (!grid) return;
    if (emptyState) emptyState.style.display = "none";

    const label = query.trim()
      ? `Searching for &ldquo;${escapeHtml(query.trim())}&rdquo; across KLM CINEMATICS...`
      : "Fetching trending & popular cinema titles...";

    let html = `
      <div class="search-loading-banner" role="status" aria-live="polite">
        <div class="search-loading-spinner" aria-hidden="true"></div>
        <span>${label}</span>
      </div>
    `;

    for (let i = 0; i < 6; i++) {
      html += `
        <div class="search-skeleton-card" aria-hidden="true">
          <div class="skeleton-poster shimmer-sweep"></div>
          <div class="skeleton-body">
            <div class="skeleton-line title shimmer-sweep"></div>
            <div class="skeleton-line meta shimmer-sweep"></div>
            <div class="skeleton-line desc shimmer-sweep"></div>
            <div class="skeleton-line desc-short shimmer-sweep"></div>
          </div>
        </div>
      `;
    }

    grid.innerHTML = html;
  }

  // ==========================================================
  // TMDB Item Normalization Helper
  // ==========================================================
  function mapTMDBItem(item) {
    const isMovie = item.media_type === "movie";
    const isTv = item.media_type === "tv";
    const genreIds = Array.isArray(item.genre_ids) ? item.genre_ids : [];
    const isJapanese = item.original_language === "ja" || (Array.isArray(item.origin_country) && item.origin_country.includes("JP"));
    const isAnime = (isTv || isMovie) && (isJapanese || genreIds.includes(16) || item.genre_ids?.includes(16));

    const title = (item.title || item.name || "Untitled Cinema").trim();
    const year = (item.release_date || item.first_air_date || "").slice(0, 4) || "2025";
    const rating = typeof item.vote_average === "number" && item.vote_average > 0
      ? item.vote_average.toFixed(1)
      : "8.1";

    const genres = genreIds.map((id) => TMDB_GENRES[id]).filter(Boolean);
    if (genres.length === 0) {
      genres.push(isMovie ? "Movie" : "TV Series");
    }

    let badge = "MOVIE";
    if (isAnime) {
      badge = "ANIME";
    } else if (isTv) {
      badge = "TV SERIES";
    }

    const posterPath = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "";
    const backdropUrl = item.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
      : (posterPath || "");

    return {
      id: item.id,
      tmdbId: item.id,
      title,
      name: title,
      year,
      rating,
      type: isAnime ? "Anime" : (isTv ? "TV Shows" : "Movies"),
      category: isAnime ? "anime" : (isTv ? "tv-shows" : "movies"),
      badge,
      genres,
      isAnime,
      description: item.overview || "Now streaming in ultra-high fidelity with Dolby Atmos spatial sound on KLM CINEMATICS.",
      posterPath,
      backdropUrl,
      posterClass: "poster-1"
    };
  }

  // ==========================================================
  // Live TMDB Multi-Search & Trending Query Fetcher
  // ==========================================================
  async function fetchCatalogForQuery(query) {
    const trimmed = query.trim();

    // 1. If query is empty, fetch and return Trending titles
    if (!trimmed) {
      if (trendingResultsCache && trendingResultsCache.length > 0) {
        return trendingResultsCache;
      }
      try {
        const res = await fetch(`${TMDB_PROXY}?path=trending/all/day`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.results)) {
            const mapped = data.results
              .filter((i) => (i.media_type === "movie" || i.media_type === "tv") && (i.poster_path || i.backdrop_path))
              .map(mapTMDBItem);
            trendingResultsCache = mapped;
            return mapped;
          }
        }
      } catch (err) {
        console.warn("[Search] Trending fetch fallback:", err);
      }
      return CINEMA_CATALOG;
    }

    // 2. Check query cache
    const cacheKey = trimmed.toLowerCase();
    if (searchResultsCache.has(cacheKey)) {
      return searchResultsCache.get(cacheKey);
    }

    // 3. Abort previous in-flight search
    if (activeSearchController) {
      activeSearchController.abort();
    }
    activeSearchController = new AbortController();

    try {
      const url = `${TMDB_PROXY}?path=search/multi&language=en-US&query=${encodeURIComponent(trimmed)}&page=1&include_adult=false`;
      const res = await fetch(url, { signal: activeSearchController.signal });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.results)) {
          const mapped = data.results
            .filter((i) => (i.media_type === "movie" || i.media_type === "tv") && (i.poster_path || i.backdrop_path))
            .map(mapTMDBItem);
          searchResultsCache.set(cacheKey, mapped);
          return mapped;
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("[Search] Search query fetch error:", err);
      }
    }

    // Fallback: local catalog matches
    return CINEMA_CATALOG.filter((i) =>
      i.title.toLowerCase().includes(trimmed.toLowerCase()) ||
      i.description.toLowerCase().includes(trimmed.toLowerCase())
    );
  }

  // ==========================================================
  // Filter Array by Content Type & Checked Genres
  // ==========================================================
  function filterItems(items) {
    if (!Array.isArray(items)) return [];

    return items.filter((item) => {
      // 1. Content Type Filter
      if (currentType !== "all") {
        if (currentType === "Anime") {
          if (!item.isAnime && !item.genres.includes("Animation") && item.category !== "anime") {
            return false;
          }
        } else if (item.type !== currentType) {
          return false;
        }
      }

      // 2. Genre Filter (match if item contains at least one selected genre)
      if (currentGenres.size > 0) {
        const itemGenresLower = (item.genres || []).map((g) => g.toLowerCase());
        const hasMatch = Array.from(currentGenres).some((g) => {
          const gLower = g.toLowerCase();
          return itemGenresLower.some((ig) => ig.includes(gLower) || gLower.includes(ig));
        });
        if (!hasMatch) return false;
      }

      return true;
    });
  }

  // ==========================================================
  // Render Filtered Catalog Cards & Wire Click to Play Modal
  // ==========================================================
  function renderCatalog(items) {
    const grid = document.getElementById("search-results-grid");
    const emptyState = document.getElementById("search-empty-state");
    if (!grid) return;

    grid.innerHTML = "";

    if (!items || items.length === 0) {
      if (emptyState) {
        emptyState.style.display = "flex";
        const h3 = emptyState.querySelector("h3");
        if (h3) {
          h3.textContent = currentSearchQuery.trim()
            ? `No titles found for "${currentSearchQuery.trim()}"`
            : "No titles found";
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "search-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Play ${item.title} (${item.year})`);

      const posterBg = item.posterPath || item.backdropUrl;
      const bgStyle = posterBg ? `style="background-image: url('${posterBg}');"` : "";

      card.innerHTML = `
        <div class="search-card-poster ${item.posterClass || "poster-1"}" ${bgStyle}>
          <span class="search-card-rating" title="Rating: ${item.rating}">
            <svg class="rating-star-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${item.rating}
          </span>
          <span class="search-card-type-badge">${item.badge}</span>
          <div class="search-card-play-overlay">
            <div class="search-card-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="search-card-body">
          <h3 class="search-card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
          <div class="search-card-meta">
            <span>${item.year}</span>
            <span class="bullet">•</span>
            <span>${escapeHtml(item.genres && item.genres.length > 0 ? item.genres[0] : item.badge)}</span>
          </div>
          <p class="search-card-desc">${escapeHtml(item.description || "")}</p>
        </div>
      `;

      // Play item on player modal when clicked
      function handlePlayCard() {
        closeSearchModal();
        if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.openPlayerModal === "function") {
          window.KLMCinematicsSubpages.openPlayerModal(item);
        } else {
          console.warn("[Search] Player modal controller not available on window.KLMCinematicsSubpages");
        }
      }

      card.addEventListener("click", (e) => {
        e.stopPropagation();
        handlePlayCard();
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePlayCard();
        }
      });

      grid.appendChild(card);
    });
  }

  // ==========================================================
  // Search & Filter Execution Controller
  // ==========================================================
  async function executeSearch(immediate = false) {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = null;
    }

    const query = currentSearchQuery;

    // Show loading skeleton effect
    renderSearchLoading(query);

    const performSearch = async () => {
      const rawResults = await fetchCatalogForQuery(query);
      cachedRawResults = rawResults;
      const filtered = filterItems(rawResults);
      renderCatalog(filtered);
    };

    if (immediate) {
      await performSearch();
    } else {
      searchDebounceTimer = setTimeout(performSearch, 280);
    }
  }

  function applyFilters() {
    if (cachedRawResults && cachedRawResults.length > 0) {
      const filtered = filterItems(cachedRawResults);
      renderCatalog(filtered);
    } else {
      executeSearch(true);
    }
  }

  function resetAllFilters() {
    currentSearchQuery = "";
    currentType = "all";
    currentGenres.clear();

    if (searchModalInput) searchModalInput.value = "";

    contentTypeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-type") === "all");
    });

    genreCheckboxes.forEach((cb) => {
      cb.checked = false;
    });

    executeSearch(true);
  }

  // ==========================================================
  // Modal Open & Close Controller
  // ==========================================================
  function openSearchModal() {
    if (!searchModal) return;
    setMenuOpen(false); // Close navbar mobile drawer if open

    // Ensure search results area is completely unhidden and clean
    const resultsArea = searchModal.querySelector(".search-results-area");
    if (resultsArea) {
      resultsArea.style.display = "";
      resultsArea.removeAttribute("style");
    }

    searchModal.classList.add("open");
    searchModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (searchModalInput) {
      setTimeout(() => searchModalInput.focus(), 150);
    }
    // Load trending titles if empty or if results grid is unpopulated
    const grid = document.getElementById("search-results-grid");
    if (!cachedRawResults || cachedRawResults.length === 0 || (grid && grid.children.length === 0)) {
      executeSearch(true);
    }
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove("open");
    searchModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Navbar Search Button triggers modal
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSearchModal();
    });
  }

  // Close Button
  if (searchModalClose) {
    searchModalClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSearchModal();
    });
  }

  // Backdrop Click to Dismiss
  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });
  }

  // Accordion Collapse Elements (Mobile/Tablet)
  const searchFilterSidebar = document.getElementById("search-filter-sidebar");
  const filterShrinkBtn = document.getElementById("filter-shrink-btn");
  const filterShrinkText = document.getElementById("filter-shrink-text");
  const filterActiveCount = document.getElementById("filter-active-count");

  function updateActiveFilterBadge() {
    if (!filterActiveCount) return;
    let count = 0;
    if (currentType !== "all") count++;
    count += currentGenres.size;
    if (count > 0) {
      filterActiveCount.textContent = count;
      filterActiveCount.style.display = "inline-flex";
    } else {
      filterActiveCount.style.display = "none";
    }
  }

  function setFiltersCollapsed(isCollapsed) {
    if (!searchFilterSidebar) return;
    searchFilterSidebar.classList.toggle("collapsed", isCollapsed);

    const actionText = isCollapsed ? "Show filter" : "Hide filter";

    if (filterShrinkBtn) {
      filterShrinkBtn.setAttribute("aria-expanded", !isCollapsed);
      filterShrinkBtn.setAttribute("title", actionText);
      filterShrinkBtn.setAttribute("aria-label", actionText);
    }

    if (filterShrinkText) {
      filterShrinkText.textContent = actionText;
    }
  }

  function toggleFiltersCollapse() {
    if (!searchFilterSidebar) return;
    const isCurrentlyCollapsed = searchFilterSidebar.classList.contains("collapsed");
    setFiltersCollapsed(!isCurrentlyCollapsed);
  }

  if (filterShrinkBtn) {
    filterShrinkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFiltersCollapse();
      filterShrinkBtn.blur();
    });
  }

  // Real-time Text Input Search (Debounced with instant loading skeleton)
  if (searchModalInput) {
    searchModalInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      executeSearch(false);
    });
  }

  if (searchModalForm) {
    searchModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      executeSearch(true);
      // On mobile viewports, collapse filters on search submit to maximize results visibility
      if (window.innerWidth <= 1023) {
        setFiltersCollapsed(true);
      }
    });
  }

  // Content Type Pill Filters
  contentTypeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      contentTypeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.getAttribute("data-type") || "all";
      applyFilters();
      updateActiveFilterBadge();
    });
  });

  // Genre Checkbox Filters
  genreCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) {
        currentGenres.add(cb.value);
      } else {
        currentGenres.delete(cb.value);
      }
      applyFilters();
      updateActiveFilterBadge();
    });
  });

  // Reset Filters
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      resetAllFilters();
      updateActiveFilterBadge();
    });
  }

  if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", () => {
      resetAllFilters();
      updateActiveFilterBadge();
    });
  }

  // Preload trending titles for search modal
  executeSearch(true);

  // ==========================================================
  // Context-Aware Navigation Architecture (Home vs Subpages)
  // ==========================================================
  function getCurrentPageContext() {
    const path = (window.location.pathname || "").toLowerCase();
    if (path.includes("movies.html") || path.endsWith("/movies")) return "movies";
    if (path.includes("tv-shows.html") || path.includes("tvshows") || path.endsWith("/tv-shows")) return "tv-shows";
    if (path.includes("anime.html") || path.endsWith("/anime") || path.includes("cartoons.html") || path.endsWith("/cartoons")) return "anime";

    // Dynamic SPA subpage check on index.html
    const hash = (window.location.hash || "").toLowerCase().replace("#", "").replace("/", "");
    if (hash.includes("movie")) return "movies";
    if (hash.includes("tv") || hash.includes("show")) return "tv-shows";
    if (hash.includes("anime") || hash.includes("cartoon")) return "anime";

    const subpageContainer = document.getElementById("subpage-view");
    if (subpageContainer && subpageContainer.style.display !== "none") {
      const activeCat = window.KLMCinematicsSubpages?.activeCategory;
      if (activeCat) return (activeCat === "cartoons" ? "anime" : activeCat);
    }

    return "home";
  }

  // Section Tracking & High-Performance Scroll-Spy (Context-Aware for Marketing & Streaming)
  const isMarketingPage = document.body.classList.contains("marketing-page");
  const SPY_SECTION_IDS = isMarketingPage
    ? ["home", "trending-section", "actors-section", "news-section", "footer-section"]
    : ["home", "Movies", "TV-Shows", "Anime", "My-List"];
  const trackedSections = SPY_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

  let activeSectionId = "home";

  function getCleanNavKey(id) {
    if (!id) return "";
    return id.toLowerCase().replace("#", "").replace(".html", "").replace("-section", "").replace(/-/g, "");
  }

  function setActiveNavLink(targetId, force = false) {
    if (!targetId) return;

    // Reject conflicting updates during a programmatic smooth scroll
    if (isNavClickScrolling && !force && lockedTargetId) {
      if (getCleanNavKey(targetId) !== getCleanNavKey(lockedTargetId)) {
        return;
      }
    }

    activeSectionId = targetId;

    const raw = targetId.toLowerCase().replace("#", "").replace(".html", "");
    const clean = getCleanNavKey(targetId);

    navLinks.forEach((link) => {
      if (link.classList.contains("nav-menu-dropdown-toggle") || link.closest(".nav-menu-dropdown")) {
        return;
      }

      const href = (link.getAttribute("href") || "").toLowerCase().replace("#", "").replace(".html", "");
      const cleanHref = href.replace("-section", "").replace(/-/g, "");
      const dataTarget = (link.getAttribute("data-target") || "").toLowerCase().replace("-section", "").replace(/-/g, "");

      const isMatch =
        (raw && (href === raw || dataTarget === raw)) ||
        (clean && (cleanHref === clean || dataTarget === clean)) ||
        (clean === "home" && (cleanHref.includes("home") || dataTarget === "home")) ||
        (clean === "trending" && (dataTarget === "trending" || cleanHref.includes("trending"))) ||
        ((clean === "about" || clean === "footer") && (dataTarget === "about" || cleanHref.includes("about") || cleanHref.includes("footer"))) ||
        (clean === "actors" && (dataTarget === "actors" || cleanHref.includes("actors"))) ||
        (clean === "news" && (dataTarget === "news" || cleanHref.includes("news")));

      if (isMatch) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  // Expose globally so subpages.js and marketing.js can synchronize the active nav instantly
  window.setActiveNavLink = setActiveNavLink;

  // Optimized Scroll-Spy position coordinator
  window.updateScrollSpy = function () {
    if (isNavClickScrolling) return;

    const pageContext = getCurrentPageContext();
    if (pageContext !== "home") {
      setActiveNavLink(pageContext);
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset;

    // 1. Top of document safeguard -> Home
    if (scrollY < 180) {
      setActiveNavLink("home");
      return;
    }

    // 2. Bottom of document safeguard -> Last section (e.g. About)
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100) {
      const lastSection = trackedSections[trackedSections.length - 1];
      if (lastSection) {
        setActiveNavLink(lastSection.id);
        return;
      }
    }

    // 3. Section boundary scanning aligned directly to headers
    const clearance = 200;
    let currentId = "home";

    for (let i = 0; i < trackedSections.length; i++) {
      const sec = trackedSections[i];
      const titleEl = sec.querySelector(".section-title, .mkt-section-title, .mkt-footer-container") || sec;
      const titleDocTop = (titleEl ? titleEl.getBoundingClientRect().top : sec.getBoundingClientRect().top) + scrollY;
      if (scrollY >= titleDocTop - clearance) {
        currentId = sec.id;
      }
    }

    setActiveNavLink(currentId);
  };

  // IntersectionObserver for viewport tracking (active for streaming app; marketing uses deterministic offset spy)
  if ("IntersectionObserver" in window && trackedSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.2, 0.5]
    };

    const visibilityMap = new Map();

    const spyObserver = new IntersectionObserver((entries) => {
      if (isNavClickScrolling || getCurrentPageContext() !== "home") return;
      if (isMarketingPage) return;

      entries.forEach((entry) => {
        visibilityMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY < 180) {
        setActiveNavLink("home");
        return;
      }

      let maxRatio = 0;
      let dominantId = "";
      visibilityMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          dominantId = id;
        }
      });

      if (dominantId && maxRatio > 0) {
        setActiveNavLink(dominantId);
      }
    }, observerOptions);

    trackedSections.forEach((sec) => spyObserver.observe(sec));
  }

  // Initial active link indicator
  const initialContext = getCurrentPageContext();
  if (initialContext !== "home") {
    setActiveNavLink(initialContext);
  } else {
    window.updateScrollSpy();
  }

  // Ensure navigation to hero section on home page
  const isHomePage = window.location.pathname.endsWith("index.html") ||
                     window.location.pathname.endsWith("/") ||
                     !window.location.pathname.includes(".html");

  if (isHomePage) {
    const hash = (window.location.hash || "").toLowerCase();
    const shouldScrollToHero = sessionStorage.getItem("klm_scroll_to_hero") === "true" ||
                               hash === "#home" ||
                               hash === "" ||
                               hash === "#/";

    if (shouldScrollToHero) {
      sessionStorage.removeItem("klm_scroll_to_hero");
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      setActiveNavLink("home");
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 60);
    }
  }

  // ==========================================================
  // Smart Navigation Handler: Smooth Scroll (Home) vs Page Redirects (Subpages)
  // ==========================================================
  const ROUTE_MAP = {
    home: "index.html#home",
    movies: "movies.html",
    "tv-shows": "tv-shows.html",
    anime: "anime.html",
    cartoons: "anime.html",
    "my-list": "#My-List"
  };

  const SECTION_MAP = {
    home: "home",
    movies: "Movies",
    "tv-shows": "TV-Shows",
    anime: "Anime",
    cartoons: "Anime",
    "my-list": "My-List"
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.classList.contains("nav-menu-dropdown-toggle") || this.closest(".nav-menu-dropdown")) {
        return;
      }
      const href = (this.getAttribute("href") || "").trim();
      const dataTarget = (this.getAttribute("data-target") || "").toLowerCase().trim();

      // Normalize key
      let key = dataTarget;
      if (key === "cartoons" || key === "cartoon") key = "anime";
      if (!key) {
        const cleanHref = href.toLowerCase().replace("#", "").replace(".html", "").replace("index", "");
        if (cleanHref.includes("movie")) key = "movies";
        else if (cleanHref.includes("tv") || cleanHref.includes("show")) key = "tv-shows";
        else if (cleanHref.includes("anime") || cleanHref.includes("cartoon")) key = "anime";
        else if (cleanHref.includes("list")) key = "my-list";
        else key = "home";
      }

      // Marketing Homepage Explicit Routing (index.html)
      if (document.body.classList.contains("marketing-page")) {
        const marketingTargetMap = {
          home: "home",
          trending: "trending-section",
          "trending-section": "trending-section",
          actors: "actors-section",
          "actors-section": "actors-section",
          news: "news-section",
          "news-section": "news-section",
          about: "footer-section",
          "footer-section": "footer-section"
        };

        if (marketingTargetMap[key]) {
          e.preventDefault();
          setMenuOpen(false);
          const targetId = marketingTargetMap[key];

          // Lock scroll spy immediately to the target section
          window.setNavClickScrolling(true, targetId, 2500);

          if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(targetId);
            if (el) {
              const navbarOffset = 76;
              const targetDocTop = el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
              window.scrollTo({ top: Math.max(0, Math.round(targetDocTop - navbarOffset)), behavior: "smooth" });
            }
          }
          return;
        }

        if (key === "movies") {
          e.preventDefault();
          setMenuOpen(false);
          window.location.href = "movies.html";
          return;
        }
        if (key === "tv-shows") {
          e.preventDefault();
          setMenuOpen(false);
          window.location.href = "tv-shows.html";
          return;
        }
        if (key === "anime") {
          e.preventDefault();
          setMenuOpen(false);
          window.location.href = "anime.html";
          return;
        }
      }

      // Explicit Home Navigation Handling (Always lands directly at Hero Section)
      if (key === "home") {
        e.preventDefault();
        setMenuOpen(false);

        const isHome = window.location.pathname.endsWith("index.html") ||
                       window.location.pathname.endsWith("/") ||
                       !window.location.pathname.includes(".html");

        if (isHome) {
          // If a subpage view is open on index.html, close it and restore home
          const subpageContainer = document.getElementById("subpage-view");
          if (subpageContainer && subpageContainer.style.display !== "none") {
            if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.navigateToHome === "function") {
              window.KLMCinematicsSubpages.navigateToHome(true);
            } else {
              subpageContainer.style.display = "none";
              subpageContainer.classList.remove("active");
              const homeMain = document.getElementById("home-main") || document.querySelector("body > main:not(#search-modal *):not(.search-results-area):not(#subpage-view)");
              if (homeMain) homeMain.style.display = "block";
            }
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveNavLink("home");
          if (window.location.hash !== "#home" && window.location.hash !== "") {
            try {
              history.pushState(null, "", "#home");
            } catch (err) {
              window.location.hash = "#home";
            }
          }
        } else {
          // On subpages (anime.html, movies.html, tv-shows.html, cartoons.html)
          sessionStorage.setItem("klm_scroll_to_hero", "true");
          window.location.href = "index.html#home";
        }
        resetGenreDropdownUI();
        return;
      }

      resetGenreDropdownUI();

      // Universal "My List" Watchlist Modal Popup Access (Homepage & Subpages)
      if (
        key === "my-list" ||
        this.classList.contains("my-list-btn") ||
        this.id === "footer-my-list-btn" ||
        (href && (href.toLowerCase() === "#my-list" || href.toLowerCase().includes("my-list")))
      ) {
        e.preventDefault();
        setMenuOpen(false);
        if (window.KLMWatchlist && typeof window.KLMWatchlist.openModal === "function") {
          window.KLMWatchlist.openModal();
        } else {
          setTimeout(() => {
            if (window.KLMWatchlist && typeof window.KLMWatchlist.openModal === "function") {
              window.KLMWatchlist.openModal();
            }
          }, 60);
        }
        return;
      }

      const pageContext = getCurrentPageContext();

      if (pageContext === "home") {
        // ON HOME: Perform smooth scroll to respective section anchor
        const targetSectionId = SECTION_MAP[key] || "home";
        const targetEl = document.getElementById(targetSectionId);

        if (targetEl) {
          e.preventDefault();
          isNavClickScrolling = true;
          setActiveNavLink(key);
          clearTimeout(navClickScrollTimer);
          navClickScrollTimer = setTimeout(() => {
            isNavClickScrolling = false;
          }, 900);

          if (targetSectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const titleEl = targetEl.querySelector(".section-title") || targetEl;
            const navbarClearance = 82;
            const targetY = titleEl.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - navbarClearance;
            window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          }
          setMenuOpen(false);
          return;
        }
      } else {
        // ON SUBPAGES: Execute page navigation / routing directly
        const destination = ROUTE_MAP[key];
        if (destination) {
          e.preventDefault();
          setMenuOpen(false);
          // If destination is the current page, scroll to top
          const currentFile = window.location.pathname.split("/").pop() || "index.html";
          if (destination.startsWith(currentFile)) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            window.location.href = destination;
          }
          return;
        }
      }
    });
  });

  const siteLogo = document.getElementById("site-logo");
  if (siteLogo) {
    siteLogo.addEventListener("click", function (e) {
      e.preventDefault();
      setMenuOpen(false);

      const isHome = window.location.pathname.endsWith("index.html") ||
                     window.location.pathname.endsWith("/") ||
                     !window.location.pathname.includes(".html");

      if (isHome) {
        const subpageContainer = document.getElementById("subpage-view");
        if (subpageContainer && subpageContainer.style.display !== "none") {
          if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.navigateToHome === "function") {
            window.KLMCinematicsSubpages.navigateToHome(true);
          } else {
            subpageContainer.style.display = "none";
            subpageContainer.classList.remove("active");
            const homeMain = document.getElementById("home-main") || document.querySelector("body > main:not(#search-modal *):not(.search-results-area):not(#subpage-view)");
            if (homeMain) homeMain.style.display = "block";
          }
        }
        window.setNavClickScrolling(true, "home", 2500);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveNavLink("home", true);
        if (window.location.hash !== "#home" && window.location.hash !== "") {
          try {
            history.pushState(null, "", "#home");
          } catch (err) {
            window.location.hash = "#home";
          }
        }
      } else {
        sessionStorage.setItem("klm_scroll_to_hero", "true");
        window.location.href = "index.html#home";
      }
    });
  }

  // ==========================================================
  // Navbar Genre Dropdown Controller (Desktop & Mobile)
  // ==========================================================
  const genresDropdown = document.getElementById("genres-dropdown");
  const genresDropdownToggle = document.getElementById("genres-dropdown-toggle");
  const mobileGenresDropdown = document.getElementById("mobile-genres-dropdown");
  const mobileGenresDropdownToggle = document.getElementById("mobile-genres-dropdown-toggle");

  function setDesktopDropdownOpen(isOpen) {
    if (!genresDropdown) return;
    genresDropdown.classList.toggle("open", isOpen);
    if (genresDropdownToggle) {
      genresDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  function setMobileDropdownOpen(isOpen) {
    if (!mobileGenresDropdown) return;
    mobileGenresDropdown.classList.toggle("open", isOpen);
    if (mobileGenresDropdownToggle) {
      mobileGenresDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  if (genresDropdownToggle) {
    genresDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = genresDropdown.classList.contains("open");
      setDesktopDropdownOpen(!isOpen);
    });
  }

  if (mobileGenresDropdownToggle) {
    mobileGenresDropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileGenresDropdown.classList.contains("open");
      setMobileDropdownOpen(!isOpen);
    });
  }

  // Dropdown UI synchronizers for genre selection and route resets
  function resetGenreDropdownUI() {
    allGenreButtons.forEach((b) => {
      const g = (b.getAttribute("data-genre") || "").toLowerCase();
      if (g === "all") {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
    if (genresDropdownToggle) {
      const span = genresDropdownToggle.querySelector("span");
      if (span) span.textContent = "Genres";
    }
    if (mobileGenresDropdownToggle) {
      const span = mobileGenresDropdownToggle.querySelector(".item-text");
      if (span) span.textContent = "Genres";
    }
  }
  window.resetGenreDropdownUI = resetGenreDropdownUI;

  function updateGenreDropdownUI(selectedGenre) {
    const isAll = !selectedGenre || selectedGenre.toLowerCase() === "all";
    allGenreButtons.forEach((b) => {
      const g = b.getAttribute("data-genre") || "All";
      if ((isAll && g.toLowerCase() === "all") || (!isAll && g.toLowerCase() === selectedGenre.toLowerCase())) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
    if (genresDropdownToggle) {
      const span = genresDropdownToggle.querySelector("span");
      if (span) span.textContent = isAll ? "Genres" : selectedGenre;
    }
    if (mobileGenresDropdownToggle) {
      const span = mobileGenresDropdownToggle.querySelector(".item-text");
      if (span) span.textContent = isAll ? "Genres" : `Genres: ${selectedGenre}`;
    }
  }
  window.updateGenreDropdownUI = updateGenreDropdownUI;

  // Genre Selection Handler
  const allGenreButtons = document.querySelectorAll(".nav-dropdown-item, .nav-menu-dropdown-item");
  allGenreButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const selectedGenre = this.getAttribute("data-genre") || "All";

      // Synchronize UI labels & active classes across desktop & mobile
      updateGenreDropdownUI(selectedGenre);

      // Close dropdowns
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
      setMenuOpen(false);

      // Context-aware action
      const pageContext = getCurrentPageContext();
      if (pageContext === "home") {
        if (selectedGenre !== "All") {
          openSearchModal();
          genreCheckboxes.forEach((cb) => {
            cb.checked = cb.value.toLowerCase() === selectedGenre.toLowerCase();
          });
          currentGenres.clear();
          currentGenres.add(selectedGenre);
          applyFilters();
          updateActiveFilterBadge();
        } else {
          resetAllFilters();
        }
      } else {
        // On category subpages: execute dynamic TMDB Discover query & card re-render!
        if (typeof window.filterSubpageByGenre === "function") {
          window.filterSubpageByGenre(selectedGenre);
        }
      }
    });
  });

  // ==========================================================
  // Homepage Card & Hero Play Modal Trigger
  // ==========================================================
  document.addEventListener("click", (e) => {
    const centerPlayBtn = e.target.closest(".card-play-center-btn");
    const cinemaCard = e.target.closest(".cinema-card");
    const heroWatchBtn = e.target.closest("#watch-now-btn");

    if (centerPlayBtn || (cinemaCard && !cinemaCard.classList.contains("rail-card") && !e.target.closest("a, button"))) {
      const targetCard = centerPlayBtn ? centerPlayBtn.closest(".cinema-card") : cinemaCard;
      if (!targetCard || targetCard.classList.contains("rail-card")) return;

      const titleEl = targetCard.querySelector(".card-title");
      const title = titleEl ? titleEl.textContent.trim() : "Cinema Title";
      const posterEl = targetCard.querySelector(".card-poster");
      let posterClass = "";
      if (posterEl) {
        const classes = Array.from(posterEl.classList);
        posterClass = classes.find((c) => c.startsWith("poster-")) || "";
      }
      const genreEl = targetCard.querySelector(".card-genre");
      const genre = genreEl ? genreEl.textContent.trim() : "";
      const sectionEl = targetCard.closest("section");
      const sectionId = sectionEl ? sectionEl.id : "";

      const catalogMatch = CINEMA_CATALOG.find((c) => c.title.toLowerCase() === title.toLowerCase());
      const cardTypeAttr = targetCard.getAttribute("data-type");
      const cardCategoryAttr = (targetCard.getAttribute("data-category") || "").toLowerCase();
      const tmdbIdAttr = targetCard.getAttribute("data-tmdb-id");
      const badgeEl = targetCard.querySelector(".card-badge");
      const badgeText = (badgeEl ? badgeEl.textContent.trim() : "").toUpperCase();

      const inAnimeSection = Boolean(
        targetCard.closest("#cards-anime, #Anime, [data-category='anime'], #cards-cartoons, #Cartoons, [data-category='cartoons']") ||
        (sectionId && (sectionId.toLowerCase().includes("anime") || sectionId.toLowerCase().includes("cartoon")))
      );

      const isAnimeCard =
        inAnimeSection ||
        cardCategoryAttr === "anime" ||
        cardCategoryAttr === "cartoons" ||
        cardCategoryAttr === "animation" ||
        (cardTypeAttr || "").toLowerCase().includes("anime") ||
        (cardTypeAttr || "").toLowerCase().includes("cartoon") ||
        (genre || "").toLowerCase().includes("anime") ||
        (genre || "").toLowerCase().includes("animation") ||
        badgeText.includes("SIMULCAST") ||
        badgeText.includes("ANIME") ||
        badgeText.includes("SUB & DUB") ||
        catalogMatch?.type === "Anime" ||
        (typeof catalogMatch?.isAnime === "boolean" && catalogMatch.isAnime);

      const type = isAnimeCard ? "Anime" : (cardTypeAttr || catalogMatch?.type || (sectionId === "Movies" ? "Movies" : (sectionId === "TV-Shows" ? "TV Shows" : "")));
      const rating = catalogMatch?.rating || (targetCard.querySelector(".card-rating")?.textContent.replace("⭐", "").trim()) || "8.5";
      const year = catalogMatch?.year || targetCard.getAttribute("data-year") || "2024";
      const description = targetCard.getAttribute("data-overview") || catalogMatch?.description || (genre ? `${genre} • Now streaming in 4K HDR with Dolby Atmos spatial sound.` : "Now streaming in ultra-high fidelity with Dolby Atmos spatial sound.");

      if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.openPlayerModal === "function") {
        window.KLMCinematicsSubpages.openPlayerModal({
          tmdbId: tmdbIdAttr && !isNaN(parseInt(tmdbIdAttr, 10)) ? parseInt(tmdbIdAttr, 10) : undefined,
          title: title,
          posterClass: posterClass,
          type: isAnimeCard ? "Anime" : type,
          category: isAnimeCard ? "anime" : (sectionId.toLowerCase() === "movies" ? "movies" : "tv-shows"),
          mediaType: isAnimeCard ? "tv" : (sectionId.toLowerCase() === "movies" ? "movie" : "tv"),
          isAnime: isAnimeCard,
          genres: isAnimeCard ? ["Animation", "Anime"] : (genre ? [genre] : []),
          rating: rating,
          year: year,
          description: description
        });
      }
    } else if (heroWatchBtn) {
      e.preventDefault();
      const heroSection = document.getElementById("home");
      const heroTmdbId = heroWatchBtn.getAttribute("data-tmdb-id") || heroSection?.getAttribute("data-current-tmdb-id");
      const heroTitle = heroWatchBtn.getAttribute("data-title") || document.querySelector(".hero-title")?.textContent || "CYBERSPACE: HORIZON";
      const heroDesc = heroWatchBtn.getAttribute("data-overview") || document.querySelector(".hero-description")?.textContent;
      const heroRating = heroWatchBtn.getAttribute("data-rating") || document.querySelector(".hero-meta .rating")?.textContent || "9.6";
      const heroYear = heroWatchBtn.getAttribute("data-year") || "2026";
      const heroType = heroWatchBtn.getAttribute("data-type") || "Movies";

      if (window.KLMCinematicsSubpages && typeof window.KLMCinematicsSubpages.openPlayerModal === "function") {
        window.KLMCinematicsSubpages.openPlayerModal({
          tmdbId: heroTmdbId ? parseInt(heroTmdbId, 10) : undefined,
          title: heroTitle,
          posterClass: "poster-1",
          type: heroType,
          rating: heroRating,
          year: heroYear,
          duration: "2h 28m",
          description: heroDesc
        });
      }
    }
  });

  // ==========================================================
  // Global Outside Click & Keyboard Escape Listeners
  // ==========================================================
  document.addEventListener("click", (e) => {
    if (!navbar) return;

    // If click was outside genres dropdown, close it
    if (genresDropdown && !genresDropdown.contains(e.target)) {
      setDesktopDropdownOpen(false);
    }

    // If click was outside navbar, close navbar menu
    if (!navbar.contains(e.target)) {
      if (navbar.classList.contains("menu-open")) {
        setMenuOpen(false);
      }
    }
  });

  // ==========================================================
  // Smart TV Remote & Keyboard Universal Listeners
  // ==========================================================
  document.addEventListener("keydown", (e) => {
    const isBackKey =
      e.key === "Escape" ||
      e.keyCode === 27 ||
      e.keyCode === 10009 || // Samsung Tizen Return / Back
      e.keyCode === 461 ||   // LG webOS Return / Back
      e.keyCode === 4;       // Android TV KEYCODE_BACK

    if (isBackKey) {
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
      setMenuOpen(false);
      closeSearchModal();

      const playerModal = document.getElementById("cinema-player-modal");
      if (playerModal && playerModal.classList.contains("open")) {
        const closeBtn = playerModal.querySelector("#player-modal-close");
        if (closeBtn) closeBtn.click();
      }
    }

    // Remote "OK" / "Select" on cinema cards
    if (e.key === "Enter" || e.keyCode === 13 || e.key === " ") {
      const el = document.activeElement;
      if (el && el.classList.contains("cinema-card") && el.tagName !== "BUTTON" && el.tagName !== "A") {
        e.preventDefault();
        el.click();
      }
    }
  });

  // Ensure all homepage cards have tabindex and role for Smart TV remotes
  document.querySelectorAll(".cinema-card").forEach((card) => {
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    if (!card.hasAttribute("role")) card.setAttribute("role", "button");
    const title = card.querySelector(".card-title")?.textContent.trim();
    if (title && !card.hasAttribute("aria-label")) card.setAttribute("aria-label", `Play ${title}`);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}


