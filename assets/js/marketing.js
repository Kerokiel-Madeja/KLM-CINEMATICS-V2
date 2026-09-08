/**
 * KLM CINEMATICS — Marketing, Discovery & Conversion Controller (marketing.js)
 * High-Performance Vanilla JS Architecture with Async/Await, Quota-Safe Caching,
 * TMDB API & GNews API Integration, Hero Slider Engine, and SEO Schema Injector.
 */

(() => {
  "use strict";

  /* ===================================================================
     1. CONFIGURATION & CREDENTIALS
     =================================================================== */
  const CONFIG = {
    tmdbKey: "57a0bf48cdfb41f42652162db1f0617e",
    gnewsKey: "ffdef2a70a18c4de3139f471fcfee54d",
    tmdbBase: "https://api.themoviedb.org/3",
    backdropBase: "https://image.tmdb.org/t/p/w1280",
    posterBase: "https://image.tmdb.org/t/p/w500",
    profileBase: "https://image.tmdb.org/t/p/w300",
    heroInterval: 5000, // 5 seconds
    cacheGNewsTtl: 2 * 60 * 60 * 1000, // 2 Hours Quota Protection (100 req/day limit)
    cacheTmdbTtl: 60 * 60 * 1000,       // 1 Hour TTL for TMDB data
    streamingAppUrl: "movies.html"      // Destination for "Watch on KLM Cinematics"
  };

  /* TMDB Genre Mapping Dictionary */
  const GENRE_MAP = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western", 10759: "Action & Adventure",
    10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy",
    10766: "Soap", 10767: "Talk", 10768: "War & Politics"
  };

  /* Fallback seed cinema news in case GNews quota (100 req/day) is exhausted or offline */
  const FALLBACK_NEWS = [
    {
      title: "Venice Film Festival 2026: Golden Lion Contenders and Breakthrough Premieres Revealed",
      description: "From visionary sci-fi spectacles to intimate period dramas, the 83rd Venice International Film Festival unveils a powerhouse lineup captivating global cinema critics.",
      url: "https://variety.com",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      source: { name: "Variety" }
    },
    {
      title: "Next-Generation Cinema Tech: Why IMAX 70mm and Dolby Atmos Are Dominating Box Offices",
      description: "As audiences demand premium large-format experiences, theater chains report record-shattering demand for ultra-high-resolution film projection and object-based spatial audio.",
      url: "https://deadline.com",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      source: { name: "Deadline" }
    },
    {
      title: "Top 10 Cinematic Sci-Fi Masterpieces of the 21st Century That Redefined the Genre",
      description: "An in-depth analysis of groundbreaking storytelling, visual worldbuilding, and philosophical depths in modern cinema from Christopher Nolan to Denis Villeneuve.",
      url: "https://screenrant.com",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      source: { name: "Screen Rant" }
    }
  ];

  /* ===================================================================
     2. QUOTA-PROTECTED LOCALSTORAGE CACHE UTILITY
     =================================================================== */
  const Cache = {
    get(key) {
      try {
        const raw = localStorage.getItem(`klm_mkt_${key}`);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() > parsed.expiry) {
          localStorage.removeItem(`klm_mkt_${key}`);
          return null;
        }
        return parsed.data;
      } catch (e) {
        return null;
      }
    },
    set(key, data, ttlMs) {
      try {
        const item = {
          data,
          expiry: Date.now() + ttlMs
        };
        localStorage.setItem(`klm_mkt_${key}`, JSON.stringify(item));
      } catch (e) {
        // LocalStorage quota might be full or private browsing active
      }
    }
  };

  /* ===================================================================
     3. ASYNCHRONOUS API SERVICES
     =================================================================== */
  const TMDB = {
    async fetchTrendingMovies() {
      const cacheKey = "tmdb_trending_movies";
      const cached = Cache.get(cacheKey);
      if (cached) return cached;

      try {
        const res = await fetch(`${CONFIG.tmdbBase}/trending/movie/day?api_key=${CONFIG.tmdbKey}`);
        if (!res.ok) throw new Error(`TMDB movies status ${res.status}`);
        const data = await res.json();
        const results = data.results || [];
        Cache.set(cacheKey, results, CONFIG.cacheTmdbTtl);
        return results;
      } catch (err) {
        console.warn("TMDB Trending Movies fetch error, using fallback state:", err);
        return [];
      }
    },

    async fetchTrendingTV() {
      const cacheKey = "tmdb_trending_tv";
      const cached = Cache.get(cacheKey);
      if (cached) return cached;

      try {
        const res = await fetch(`${CONFIG.tmdbBase}/trending/tv/day?api_key=${CONFIG.tmdbKey}`);
        if (!res.ok) throw new Error(`TMDB TV status ${res.status}`);
        const data = await res.json();
        const results = data.results || [];
        Cache.set(cacheKey, results, CONFIG.cacheTmdbTtl);
        return results;
      } catch (err) {
        console.warn("TMDB Trending TV fetch error:", err);
        return [];
      }
    },

    async fetchTrendingAnime() {
      const cacheKey = "tmdb_trending_anime";
      const cached = Cache.get(cacheKey);
      if (cached) return cached;

      try {
        const res = await fetch(`${CONFIG.tmdbBase}/discover/tv?api_key=${CONFIG.tmdbKey}&with_genres=16&sort_by=popularity.desc`);
        if (!res.ok) throw new Error(`TMDB Anime status ${res.status}`);
        const data = await res.json();
        const results = data.results || [];
        Cache.set(cacheKey, results, CONFIG.cacheTmdbTtl);
        return results;
      } catch (err) {
        console.warn("TMDB Trending Anime fetch error:", err);
        return [];
      }
    },

    async fetchPopularPersons() {
      const cacheKey = "tmdb_popular_persons";
      const cached = Cache.get(cacheKey);
      if (cached) return cached;

      try {
        const res = await fetch(`${CONFIG.tmdbBase}/person/popular?api_key=${CONFIG.tmdbKey}`);
        if (!res.ok) throw new Error(`TMDB Person status ${res.status}`);
        const data = await res.json();
        const results = data.results || [];
        Cache.set(cacheKey, results, CONFIG.cacheTmdbTtl);
        return results;
      } catch (err) {
        console.warn("TMDB Popular Persons fetch error:", err);
        return [];
      }
    },

    async fetchMovieTrailerKey(movieId) {
      try {
        const res = await fetch(`${CONFIG.tmdbBase}/movie/${movieId}/videos?api_key=${CONFIG.tmdbKey}`);
        if (!res.ok) return null;
        const data = await res.json();
        const videos = data.results || [];
        // Look for official Trailer or Teaser on YouTube
        const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer") ||
                        videos.find(v => v.site === "YouTube" && v.type === "Teaser") ||
                        videos.find(v => v.site === "YouTube");
        return trailer ? trailer.key : null;
      } catch {
        return null;
      }
    }
  };

  const GNews = {
    async fetchLiveCinemaNews() {
      const cacheKey = "gnews_cinema_feed";
      const cached = Cache.get(cacheKey);
      // If we have cached news, reuse immediately to protect the 100 req/day quota!
      if (cached && Array.isArray(cached) && cached.length > 0) {
        return cached;
      }

      try {
        const endpoint = `https://gnews.io/api/v4/search?q=movies+OR+cinema&lang=en&token=${CONFIG.gnewsKey}`;
        const res = await fetch(endpoint);
        if (res.status === 429) {
          console.warn("GNews quota exceeded (429 Too Many Requests), activating graceful cached fallback.");
          return FALLBACK_NEWS;
        }
        if (!res.ok) throw new Error(`GNews status ${res.status}`);
        const data = await res.json();
        const articles = data.articles || [];
        if (articles.length > 0) {
          Cache.set(cacheKey, articles, CONFIG.cacheGNewsTtl);
          return articles;
        }
        return FALLBACK_NEWS;
      } catch (err) {
        console.warn("GNews network/fetch failed, serving reliable fallback news:", err);
        return FALLBACK_NEWS;
      }
    }
  };

  /* ===================================================================
     4. DATA FORMATTING UTILITIES
     =================================================================== */
  function getGenreNames(genreIds) {
    if (!genreIds || !genreIds.length) return "Cinema • Feature";
    return genreIds
      .slice(0, 3)
      .map(id => GENRE_MAP[id] || "")
      .filter(Boolean)
      .join(" • ") || "Entertainment";
  }

  function formatRating(val) {
    const num = Number(val);
    return num > 0 ? num.toFixed(1) : "N/A";
  }

  function getYear(dateStr) {
    return dateStr ? dateStr.substring(0, 4) : "2026";
  }

  function formatRelativeDate(isoStr) {
    if (!isoStr) return "Just now";
    const then = new Date(isoStr).getTime();
    const now = Date.now();
    const diffHours = Math.round((now - then) / (1000 * 60 * 60));
    if (diffHours <= 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  }

  /* ===================================================================
     5. HERO BACKDROP SLIDER COMPONENT
     =================================================================== */
  class HeroSlider {
    constructor(movies) {
      this.movies = (movies || []).slice(0, 5);
      this.currentIndex = 0;
      this.timer = null;
      this.isPaused = false;

      this.backdropsEl = document.getElementById("hero-backdrops");
      this.headlineEl = document.getElementById("hero-headline");
      this.metaEl = document.getElementById("hero-meta");
      this.subheadlineEl = document.getElementById("hero-subheadline");
      this.watchBtn = document.getElementById("hero-watch-btn");
      this.previewBtn = document.getElementById("hero-preview-btn");
      this.dotsContainer = document.getElementById("hero-dots");
      this.prevBtn = document.getElementById("hero-prev-btn");
      this.nextBtn = document.getElementById("hero-next-btn");

      // Spotlight right-card elements
      this.spotlightPoster = document.getElementById("hero-spotlight-poster");
      this.spotlightTitle = document.getElementById("hero-spotlight-title");
      this.spotlightDesc = document.getElementById("hero-spotlight-desc");
      this.spotlightCard = document.getElementById("hero-spotlight-card");

      if (this.movies.length > 0) {
        this.init();
      }
    }

    init() {
      // Build backdrop slide elements
      this.backdropsEl.innerHTML = "";
      this.dotsContainer.innerHTML = "";

      this.movies.forEach((movie, idx) => {
        const slide = document.createElement("div");
        slide.className = `mkt-hero-slide ${idx === 0 ? "active" : ""}`;
        const backdropUrl = movie.backdrop_path
          ? `${CONFIG.backdropBase}${movie.backdrop_path}`
          : (movie.poster_path ? `${CONFIG.posterBase}${movie.poster_path}` : "");
        slide.style.backgroundImage = `url('${backdropUrl}')`;
        slide.setAttribute("data-index", idx);

        // Core Web Vitals optimization: High priority fetch on first slide
        if (idx === 0 && backdropUrl) {
          const preloadImg = new Image();
          preloadImg.fetchPriority = "high";
          preloadImg.src = backdropUrl;
        }

        this.backdropsEl.appendChild(slide);

        // Build indicator dot
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `mkt-dot ${idx === 0 ? "active" : ""}`;
        dot.setAttribute("aria-label", `Go to slide ${idx + 1}: ${movie.title || movie.name}`);
        dot.addEventListener("click", () => this.goTo(idx));
        this.dotsContainer.appendChild(dot);
      });

      // Bind controls
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => this.prev());
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => this.next());
      }

      // Pause on hover
      const heroSection = document.getElementById("home");
      if (heroSection) {
        heroSection.addEventListener("mouseenter", () => { this.isPaused = true; });
        heroSection.addEventListener("mouseleave", () => { this.isPaused = false; });
      }

      // Preview click handler
      if (this.previewBtn) {
        this.previewBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const currentMovie = this.movies[this.currentIndex];
          if (currentMovie) {
            TrailerModal.open(currentMovie);
          }
        });
      }

      // Spotlight card click handler
      if (this.spotlightCard) {
        this.spotlightCard.addEventListener("click", () => {
          const currentMovie = this.movies[this.currentIndex];
          if (currentMovie) {
            TrailerModal.open(currentMovie);
          }
        });
      }

      // Render initial slide data
      this.renderSlide(0);

      // Start auto-slider
      this.startTimer();
    }

    renderSlide(index) {
      const movie = this.movies[index];
      if (!movie) return;

      const title = movie.title || movie.name || "Cinema Masterpiece";
      const year = getYear(movie.release_date || movie.first_air_date);
      const rating = formatRating(movie.vote_average);
      const genres = getGenreNames(movie.genre_ids);
      const overview = movie.overview || "Experience cinema-grade entertainment in Dolby Atmos and crystal-clear 4K Ultra HD on KLM Cinematics.";

      // Text transitions with subtle keying
      if (this.headlineEl) {
        this.headlineEl.innerHTML = `<span class="highlight-gradient">${title}</span>`;
      }

      if (this.metaEl) {
        this.metaEl.innerHTML = `
          <span class="rating-tag">⭐ ${rating}</span>
          <span class="badge-4k">4K UHD</span>
          <span class="badge-4k">DOLBY ATMOS</span>
          <span>•</span>
          <span>${year}</span>
          <span>•</span>
          <span>${genres}</span>
        `;
      }

      if (this.subheadlineEl) {
        this.subheadlineEl.textContent = overview.length > 180 ? overview.substring(0, 180).trim() + "..." : overview;
      }

      // Update CTA links to pass tmdb ID directly to the streaming player
      if (this.watchBtn) {
        const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
        const targetRoute = mediaType === "tv" ? "tv-shows.html" : "movies.html";
        this.watchBtn.href = `${targetRoute}?play=${movie.id}&title=${encodeURIComponent(title)}&type=${mediaType}&year=${year}&rating=${rating}`;
      }

      // Spotlight Card
      if (this.spotlightPoster) {
        const spotImg = movie.backdrop_path
          ? `${CONFIG.backdropBase}${movie.backdrop_path}`
          : `${CONFIG.posterBase}${movie.poster_path}`;
        this.spotlightPoster.style.backgroundImage = `url('${spotImg}')`;
      }
      if (this.spotlightTitle) {
        this.spotlightTitle.textContent = title;
      }
      if (this.spotlightDesc) {
        this.spotlightDesc.textContent = overview;
      }

      // Toggle active classes on slides & dots
      const slides = this.backdropsEl.querySelectorAll(".mkt-hero-slide");
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === index);
      });

      const dots = this.dotsContainer.querySelectorAll(".mkt-dot");
      dots.forEach((d, idx) => {
        d.classList.toggle("active", idx === index);
      });
    }

    goTo(index) {
      this.currentIndex = index;
      this.renderSlide(index);
      this.resetTimer();
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.movies.length;
      this.renderSlide(this.currentIndex);
      this.resetTimer();
    }

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
      this.renderSlide(this.currentIndex);
      this.resetTimer();
    }

    startTimer() {
      this.timer = setInterval(() => {
        if (!this.isPaused) {
          this.next();
        }
      }, CONFIG.heroInterval);
    }

    resetTimer() {
      clearInterval(this.timer);
      this.startTimer();
    }
  }

  /* ===================================================================
     6. TRENDING MOVIES, TV SHOWS & ANIME RENDERER
     =================================================================== */
  const TrendingSection = {
    moviesData: [],
    tvData: [],
    animeData: [],
    activeTab: "movies",

    init(movies, tvShows, anime) {
      this.moviesData = movies || [];
      this.tvData = tvShows || [];
      this.animeData = anime || [];

      const tabMoviesBtn = document.getElementById("tab-trending-movies");
      const tabTVBtn = document.getElementById("tab-trending-tv");
      const tabAnimeBtn = document.getElementById("tab-trending-anime");
      const viewAllLink = document.getElementById("trending-view-all");
      const dropdownBtn = document.getElementById("mkt-tabs-dropdown-btn");
      const tabsWrapper = document.getElementById("mkt-tabs-wrapper");
      const currentLabel = document.getElementById("mkt-tabs-current-label");

      const closeDropdown = () => {
        if (tabsWrapper && tabsWrapper.classList.contains("open")) {
          tabsWrapper.classList.remove("open");
          dropdownBtn?.setAttribute("aria-expanded", "false");
        }
      };

      if (dropdownBtn && tabsWrapper) {
        dropdownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = tabsWrapper.classList.toggle("open");
          dropdownBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", (e) => {
          if (!tabsWrapper.contains(e.target)) {
            closeDropdown();
          }
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeDropdown();
            dropdownBtn.focus();
          }
        });
      }

      const updateViewAll = () => {
        if (!viewAllLink) return;
        const spanEl = viewAllLink.querySelector("span") || viewAllLink;
        if (this.activeTab === "movies") {
          viewAllLink.href = "movies.html";
          spanEl.textContent = "Explore Movies Catalog";
          if (currentLabel) currentLabel.textContent = "Trending Movies Today";
        } else if (this.activeTab === "tv") {
          viewAllLink.href = "tv-shows.html";
          spanEl.textContent = "Explore TV Series Catalog";
          if (currentLabel) currentLabel.textContent = "Trending TV Series";
        } else if (this.activeTab === "anime") {
          viewAllLink.href = "anime.html";
          spanEl.textContent = "Explore Anime Catalog";
          if (currentLabel) currentLabel.textContent = "Trending Anime";
        }
      };

      if (tabMoviesBtn) {
        tabMoviesBtn.addEventListener("click", () => {
          this.activeTab = "movies";
          tabMoviesBtn.classList.add("active");
          tabTVBtn?.classList.remove("active");
          tabAnimeBtn?.classList.remove("active");
          updateViewAll();
          closeDropdown();
          this.render();
        });
      }

      if (tabTVBtn) {
        tabTVBtn.addEventListener("click", () => {
          this.activeTab = "tv";
          tabTVBtn.classList.add("active");
          tabMoviesBtn?.classList.remove("active");
          tabAnimeBtn?.classList.remove("active");
          updateViewAll();
          closeDropdown();
          this.render();
        });
      }

      if (tabAnimeBtn) {
        tabAnimeBtn.addEventListener("click", () => {
          this.activeTab = "anime";
          tabAnimeBtn.classList.add("active");
          tabMoviesBtn?.classList.remove("active");
          tabTVBtn?.classList.remove("active");
          updateViewAll();
          closeDropdown();
          this.render();
        });
      }

      updateViewAll();
      this.render();
    },

    render() {
      const container = document.getElementById("trending-grid");
      if (!container) return;

      let items = [];
      let mediaType = "MOVIE";
      let targetRoute = "movies.html";
      let typeParam = "movie";

      if (this.activeTab === "movies") {
        items = this.moviesData;
        mediaType = "MOVIE";
        targetRoute = "movies.html";
        typeParam = "movie";
      } else if (this.activeTab === "tv") {
        items = this.tvData;
        mediaType = "SERIES";
        targetRoute = "tv-shows.html";
        typeParam = "tv";
      } else if (this.activeTab === "anime") {
        items = this.animeData;
        mediaType = "ANIME";
        targetRoute = "anime.html";
        typeParam = "anime";
      }

      items = items.slice(0, 10);
      container.innerHTML = "";

      if (!items.length) {
        container.innerHTML = `<p style="color:#8c8c9e; padding: 2rem;">Loading latest entertainment catalog...</p>`;
        return;
      }

      items.forEach((item) => {
        const title = item.title || item.name || "Untitled";
        const year = getYear(item.release_date || item.first_air_date);
        const rating = formatRating(item.vote_average);
        const genres = getGenreNames(item.genre_ids);
        const posterUrl = item.poster_path
          ? `${CONFIG.posterBase}${item.poster_path}`
          : "assets/img/poster-fallback.jpg";

        // Direct stream trigger URL to launch player on the corresponding subpage
        const streamUrl = `${targetRoute}?play=${item.id}&title=${encodeURIComponent(title)}&type=${typeParam}&year=${year}&rating=${rating}`;

        const card = document.createElement("article");
        card.className = "mkt-media-card";
        card.setAttribute("itemscope", "");
        card.setAttribute("itemtype", "https://schema.org/Movie");

        card.innerHTML = `
          <div class="mkt-card-media-wrap">
            <span class="mkt-card-badge-rating">⭐ ${rating}</span>
            <span class="mkt-card-badge-type">${mediaType}</span>
            <img
              class="mkt-card-img"
              src="${posterUrl}"
              alt="${title} poster"
              loading="lazy"
              itemprop="image"
              onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'500\\' height=\\'750\\' viewBox=\\'0 0 500 750\\'><rect fill=\\'%2314141f\\' width=\\'500\\' height=\\'750\\'/><text fill=\\'%238c8c9e\\' font-family=\\'sans-serif\\' font-size=\\'22\\' text-anchor=\\'middle\\' x=\\'250\\' y=\\'375\\'>KLM CINEMATICS</text></svg>'"
            />
            <div class="mkt-card-play-hover">
              <a href="${streamUrl}" class="mkt-stream-now-btn" title="Stream ${title} on KLM Cinematics">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Stream on KLM</span>
              </a>
            </div>
          </div>
          <div class="mkt-card-body">
            <h3 class="mkt-card-title" itemprop="name" title="${title}">${title}</h3>
            <div class="mkt-card-meta">
              <span>${year}</span>
              <span>•</span>
              <span class="mkt-card-genres">${genres}</span>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    }
  };

  /* ===================================================================
     7. POPULAR ACTORS & CELEBRITIES RENDERER
     =================================================================== */
  const ActorsSection = {
    render(persons) {
      const container = document.getElementById("actors-grid");
      if (!container) return;

      const items = (persons || []).slice(0, 10);
      container.innerHTML = "";

      if (!items.length) {
        container.innerHTML = `<p style="color:#8c8c9e; padding: 2rem;">Loading featured actors...</p>`;
        return;
      }

      items.forEach((person) => {
        const name = person.name || "Celebrity";
        const dept = person.known_for_department || "Acting";
        const popularity = Math.round(person.popularity || 0);
        const portrait = person.profile_path
          ? `${CONFIG.profileBase}${person.profile_path}`
          : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='360' viewBox='0 0 300 360'><rect fill='%2314141f' width='300' height='360'/><circle cx='150' cy='140' r='60' fill='%232a2a3c'/><path d='M60,320 C60,240 240,240 240,320 Z' fill='%232a2a3c'/></svg>";

        // Top 3 known-for titles
        const knownForTitles = (person.known_for || [])
          .slice(0, 3)
          .map(k => k.title || k.name || "")
          .filter(Boolean);

        const knownPills = knownForTitles
          .map(t => `<span class="mkt-known-pill" title="${t}">${t}</span>`)
          .join("");

        const card = document.createElement("article");
        card.className = "mkt-actor-card";
        card.setAttribute("itemscope", "");
        card.setAttribute("itemtype", "https://schema.org/Person");

        card.innerHTML = `
          <div class="mkt-actor-portrait-wrap">
            <span class="mkt-actor-pop-badge" title="Popularity Score">🔥 ${popularity}</span>
            <img
              class="mkt-actor-portrait"
              src="${portrait}"
              alt="${name} profile portrait"
              loading="lazy"
              itemprop="image"
              onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'360\\' viewBox=\\'0 0 300 360\\'><rect fill=\\'%2314141f\\' width=\\'300\\' height=\\'360\\'/><circle cx=\\'150\\' cy=\\'140\\' r=\\'60\\' fill=\\'%232a2a3c\\'/><path d=\\'M60,320 C60,240 240,240 240,320 Z\\' fill=\\'%232a2a3c\\'/></svg>'"
            />
          </div>
          <div class="mkt-actor-body">
            <h3 class="mkt-actor-name" itemprop="name">${name}</h3>
            <span class="mkt-actor-dept" itemprop="jobTitle">${dept}</span>
            ${knownForTitles.length > 0 ? `
              <div class="mkt-actor-known-for">
                <span class="mkt-known-label">Top Projects:</span>
                <div class="mkt-known-pills">${knownPills}</div>
              </div>
            ` : ""}
          </div>
        `;

        container.appendChild(card);
      });
    }
  };

  /* ===================================================================
     8. LATEST MOVIE NEWS FEED (GNEWS API INTEGRATION)
     =================================================================== */
  const NewsSection = {
    render(articles) {
      const container = document.getElementById("news-grid");
      if (!container) return;

      const items = (articles || []).slice(0, 6);
      container.innerHTML = "";

      if (!items.length) {
        container.innerHTML = `<p style="color:#8c8c9e; padding: 2rem;">Loading latest Hollywood news...</p>`;
        return;
      }

      items.forEach((article) => {
        const title = article.title || "Cinema Industry News";
        const snippet = article.description || "Read the latest updates and behind-the-scenes reporting from Hollywood and international film festivals.";
        const source = article.source && article.source.name ? article.source.name : "Entertainment Wire";
        const dateStr = formatRelativeDate(article.publishedAt);
        const link = article.url || "#";
        const imgUrl = article.image || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80";

        const card = document.createElement("article");
        card.className = "mkt-news-card";
        card.setAttribute("itemscope", "");
        card.setAttribute("itemtype", "https://schema.org/NewsArticle");

        card.innerHTML = `
          <div class="mkt-news-thumb-wrap">
            <span class="mkt-news-source-badge">${source}</span>
            <img
              class="mkt-news-thumb"
              src="${imgUrl}"
              alt="${title}"
              loading="lazy"
              itemprop="image"
              onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'"
            />
          </div>
          <div class="mkt-news-body">
            <div class="mkt-news-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <time datetime="${article.publishedAt || ''}" itemprop="datePublished">${dateStr}</time>
            </div>
            <h3 class="mkt-news-headline" itemprop="headline">${title}</h3>
            <p class="mkt-news-snippet" itemprop="description">${snippet}</p>
            <div class="mkt-news-footer">
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="mkt-news-link" itemprop="url">
                Read Full Story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    }
  };

  /* ===================================================================
     9. INTERACTIVE TRAILER MODAL
     =================================================================== */
  const TrailerModal = {
    backdropEl: null,
    dialogEl: null,
    videoWrapEl: null,
    titleEl: null,
    textEl: null,
    closeBtn: null,

    init() {
      this.backdropEl = document.getElementById("trailer-modal");
      if (!this.backdropEl) return;

      this.videoWrapEl = document.getElementById("trailer-video-wrap");
      this.titleEl = document.getElementById("trailer-title");
      this.textEl = document.getElementById("trailer-text");
      this.closeBtn = document.getElementById("trailer-close-btn");

      if (this.closeBtn) {
        this.closeBtn.addEventListener("click", () => this.close());
      }

      this.backdropEl.addEventListener("click", (e) => {
        if (e.target === this.backdropEl) {
          this.close();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.backdropEl.classList.contains("active")) {
          this.close();
        }
      });
    },

    async open(movie) {
      if (!this.backdropEl) return;

      const title = movie.title || movie.name || "Trailer Preview";
      this.titleEl.textContent = title;
      this.textEl.textContent = movie.overview || "Experience high-definition cinema streaming on KLM Cinematics.";

      // Display loading state in video wrapper
      this.videoWrapEl.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#fff;">
          <span>Fetching cinematic preview...</span>
        </div>
      `;

      this.backdropEl.classList.add("active");
      this.backdropEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Fetch YouTube key from TMDB
      const youtubeKey = await TMDB.fetchMovieTrailerKey(movie.id);

      if (youtubeKey) {
        this.videoWrapEl.innerHTML = `
          <iframe
            src="https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0&modestbranding=1"
            title="${title} Official Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `;
      } else {
        // Fallback teaser embed if movie trailer is restricted
        this.videoWrapEl.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:#0e0e14;color:#c0c0d4;padding:2rem;text-align:center;">
            <p style="font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:0.75rem;">Official Trailer Stream Available</p>
            <p style="font-size:0.9rem;max-width:440px;margin-bottom:1.5rem;">Direct playback is ready inside the KLM Cinematics streaming player.</p>
            <a href="${CONFIG.streamingAppUrl}#watch-${movie.id}" class="mkt-btn-primary">
              Watch on KLM Cinematics Now
            </a>
          </div>
        `;
      }
    },

    close() {
      if (!this.backdropEl) return;
      this.backdropEl.classList.remove("active");
      this.backdropEl.setAttribute("aria-hidden", "true");
      this.videoWrapEl.innerHTML = "";
      document.body.style.overflow = "";
    }
  };

  /* ===================================================================
     10. COMPLIANCE & LEGAL MODALS (DMCA, Privacy, Terms, Contact)
     =================================================================== */
  const LegalModal = {
    backdropEl: null,
    titleEl: null,
    contentEl: null,
    closeBtn: null,

    docs: {
      dmca: {
        title: "DMCA Disclaimer & Copyright Policy",
        html: `
          <p>KLM Cinematics respects the intellectual property rights of content creators. KLM Cinematics operates as a discovery, marketing, and meta-indexing catalog utilizing open metadata protocols provided by The Movie Database (TMDB) API and licensed third-party feeds.</p>
          <p style="margin-top:1rem;">All trademarks, media posters, logos, and product names remain the property of their respective copyright holders. If you believe your copyrighted work has been improperly cataloged, please contact our compliance desk at <strong>dmca@klmcinematics.com</strong> with formal documentation.</p>
        `
      },
      privacy: {
        title: "Privacy Policy",
        html: `
          <p>Your privacy is paramount at KLM Cinematics. We adhere strictly to data protection standards. We do not sell, rent, or trade your personal information with any third-party advertisers.</p>
          <p style="margin-top:1rem;">We utilize modern client-side caching (LocalStorage) solely to protect third-party API rate quotas (such as GNews and TMDB) and to deliver instant, responsive page navigation without tracking individual personal identifiers.</p>
        `
      },
      terms: {
        title: "Terms of Service",
        html: `
          <p>By accessing KLM Cinematics, you agree to comply with these terms, all applicable laws, and regulations. KLM Cinematics is designed for personal, non-commercial entertainment and cinematic discovery.</p>
          <p style="margin-top:1rem;">Service availability may depend on third-party API uptime, internet connection speed, and regional availability.</p>
        `
      },
      contact: {
        title: "Contact KLM Cinematics",
        html: `
          <p>Have inquiries, media partnership proposals, or technical feedback? Our engineering and editorial team would love to hear from you.</p>
          <div style="margin-top:1.25rem;display:flex;flex-direction:column;gap:0.75rem;">
            <div><strong>General Inquiries:</strong> support@klmcinematics.com</div>
            <div><strong>Press & Partnerships:</strong> press@klmcinematics.com</div>
          </div>
        `
      }
    },

    init() {
      this.backdropEl = document.getElementById("legal-modal");
      if (!this.backdropEl) return;

      this.titleEl = document.getElementById("legal-modal-title");
      this.contentEl = document.getElementById("legal-modal-body");
      this.closeBtn = document.getElementById("legal-close-btn");

      if (this.closeBtn) {
        this.closeBtn.addEventListener("click", () => this.close());
      }

      this.backdropEl.addEventListener("click", (e) => {
        if (e.target === this.backdropEl) {
          this.close();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.backdropEl.classList.contains("active")) {
          this.close();
        }
      });

      // Bind all legal trigger links
      document.querySelectorAll("[data-legal-modal]").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const docKey = link.getAttribute("data-legal-modal");
          this.open(docKey);
        });
      });
    },

    open(key) {
      const doc = this.docs[key];
      if (!doc || !this.backdropEl) return;

      this.titleEl.textContent = doc.title;
      this.contentEl.innerHTML = doc.html;

      this.backdropEl.classList.add("active");
      this.backdropEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    },

    close() {
      if (!this.backdropEl) return;
      this.backdropEl.classList.remove("active");
      this.backdropEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  /* ===================================================================
     11. DYNAMIC JSON-LD SCHEMA INJECTOR
     =================================================================== */
  function injectDynamicSchema(movies, news) {
    try {
      const script = document.createElement("script");
      script.type = "application/ld+json";

      const movieSchemas = (movies || []).slice(0, 5).map(m => ({
        "@type": "Movie",
        "name": m.title || m.name,
        "image": m.poster_path ? `${CONFIG.posterBase}${m.poster_path}` : undefined,
        "datePublished": m.release_date || m.first_air_date,
        "description": m.overview,
        "aggregateRating": m.vote_average ? {
          "@type": "AggregateRating",
          "ratingValue": m.vote_average,
          "bestRating": "10",
          "ratingCount": m.vote_count || 100
        } : undefined
      }));

      const newsSchemas = (news || []).slice(0, 4).map(n => ({
        "@type": "NewsArticle",
        "headline": n.title,
        "image": n.image,
        "datePublished": n.publishedAt,
        "author": {
          "@type": "Organization",
          "name": n.source ? n.source.name : "Entertainment Wire"
        }
      }));

      const graph = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "name": "KLM Cinematics",
            "url": "https://klmcinematics.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://klmcinematics.com/movies.html?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          ...movieSchemas,
          ...newsSchemas
        ]
      };

      script.textContent = JSON.stringify(graph);
      document.head.appendChild(script);
    } catch (e) {
      console.warn("Schema injection error:", e);
    }
  }

  /* ===================================================================
     12. SMOOTH SCROLL NAVIGATION INTERCEPTOR
     =================================================================== */
  function initSmoothScrollNav() {
    // Smooth scroll for in-page anchors outside primary navbar (which is managed by navbar.js)
    document.querySelectorAll('a[href^="#"]:not(.nav-item):not(.nav-menu-item):not(#site-logo):not(.logo)').forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href") || "";
        const targetId = href.replace("#", "");
        if (!targetId) return;

        if (targetId === "home") {
          e.preventDefault();
          window.setNavClickScrolling?.(true, "home", 2500);
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.setActiveNavLink?.("home", true);
          return;
        }

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          window.setNavClickScrolling?.(true, targetId, 2500);
          const navbarOffset = 76;
          const targetDocTop = targetEl.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
          window.scrollTo({ top: Math.max(0, Math.round(targetDocTop - navbarOffset)), behavior: "smooth" });
          window.setActiveNavLink?.(targetId, true);
        }
      });
    });
  }

  /* ===================================================================
     13. MARKETING SCROLL SPY CONTROLLER
     =================================================================== */
  function initMarketingScrollSpy() {
    // Canonical sections list maintained for metadata and section registry
    const sections = [
      { id: "home", target: "home" },
      { id: "trending-section", target: "trending" },
      { id: "actors-section", target: "actors" },
      { id: "news-section", target: "news" },
      { id: "footer-section", target: "about" }
    ];

    // Delegate active navigation tracking directly to navbar.js to ensure a single source of truth
    // and prevent competing observers from bouncing the active indicator mid-scroll
    window.updateScrollSpy?.();
  }

  /* ===================================================================
     14. MASTER INITIALIZATION
     =================================================================== */
  async function init() {
    TrailerModal.init();
    LegalModal.init();
    initSmoothScrollNav();
    initMarketingScrollSpy();

    // Concurrent asynchronous API fetching
    try {
      const [movies, tvShows, anime, actors, news] = await Promise.all([
        TMDB.fetchTrendingMovies(),
        TMDB.fetchTrendingTV(),
        TMDB.fetchTrendingAnime(),
        TMDB.fetchPopularPersons(),
        GNews.fetchLiveCinemaNews()
      ]);

      // 1. Initialize Hero Slider with top movies
      new HeroSlider(movies);

      // 2. Initialize Trending Movies, TV & Anime tab switcher
      TrendingSection.init(movies, tvShows, anime);

      // 3. Initialize Actors section
      ActorsSection.render(actors);

      // 4. Initialize GNews live news feed
      NewsSection.render(news);

      // 5. Inject Structured JSON-LD Data for search engines
      injectDynamicSchema(movies, news);

    } catch (err) {
      console.error("KLM Cinematics initialization error:", err);
    }
  }

  // Trigger when DOM is interactive
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
