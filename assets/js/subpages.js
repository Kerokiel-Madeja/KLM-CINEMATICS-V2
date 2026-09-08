/**
 * KLM CINEMATICS - Dedicated Sub-Pages Controller
 * Netflix / Disney+ Inspired Layout Engine
 * Handles Category Routing, Hero Spotlight, Scroll-Snap Rails,
 * Card Hover-Zoom, Watchlist State, and Simulated Cinema Player.
 */

(function () {
  "use strict";

  // ==========================================================
  // Comprehensive Catalog Data for Dedicated Sub-Pages
  // 5-6 Unique Thematic Rails per Category
  // ==========================================================
  const SUBPAGE_DATA = {
    movies: {
      id: "movies",
      name: "Movies",
      title: "Movies & Blockbusters",
      subtitle: "Full-length feature films, cinematic epics & award-winning releases",
      hero: {
        title: "CYBERSPACE: HORIZON",
        badge: "KLM EXCLUSIVE",
        rank: "#1 in Movies Today",
        match: "98% Match",
        rating: "9.6",
        year: "2026",
        quality: "4K ULTRA HD",
        audio: "Dolby Atmos",
        age: "PG-13",
        duration: "2h 28m",
        genres: ["Sci-Fi", "Cyberpunk", "Action Thriller"],
        description:
          "In a neon-drenched metropolis governed by autonomous synthetic intelligences, a rogue cyber-detective unearths a clandestine frequency threatening the architecture of reality.",
        backdropClass: "poster-1"
      },
      genres: ["All", "Action", "Adventure", "Crime", "Drama", "Fantasy", "Sci-Fi", "Thriller"],
      rails: [
        {
          title: "Trending Now in Movies",
          items: [
            {
              id: "m-1",
              title: "Interstellar Odyssey",
              year: "2026",
              match: "98% Match",
              age: "PG-13",
              rating: "9.4",
              quality: "4K UHD",
              duration: "2h 45m",
              genres: "Sci-Fi • Space Adventure",
              desc: "Deep-space explorers embark on humanity's most perilous voyage across a gravitational wormhole.",
              posterClass: "poster-1"
            },
            {
              id: "m-2",
              title: "The Shadow Protocol",
              year: "2025",
              match: "94% Match",
              age: "16+",
              rating: "8.9",
              quality: "DOLBY VISION",
              duration: "2h 12m",
              genres: "Espionage • Action",
              desc: "A rogue intelligence extractor must outrun syndicate hit squads after acquiring classified encrypted drives.",
              posterClass: "poster-2"
            },
            {
              id: "m-3",
              title: "Eclipse: Origins",
              year: "2026",
              match: "96% Match",
              age: "18+",
              rating: "9.1",
              quality: "HDR10+",
              duration: "2h 30m",
              genres: "Dark Fantasy • Horror",
              desc: "When an eternal eclipse engulfs the Nordic kingdoms, an ancient order awakens to seal the underworld gates.",
              posterClass: "poster-3"
            },
            {
              id: "m-4",
              title: "Velocity Vanguard",
              year: "2025",
              match: "91% Match",
              age: "13+",
              rating: "8.7",
              quality: "4K UHD",
              duration: "1h 58m",
              genres: "Heist • Thriller",
              desc: "A crew of elite underground drivers stage a synchronized heist across Monaco during a citywide blackout.",
              posterClass: "poster-4"
            },
            {
              id: "m-5",
              title: "Toxic: Goa Underground",
              year: "2025",
              match: "89% Match",
              age: "18+",
              rating: "8.2",
              quality: "HD",
              duration: "2h 20m",
              genres: "Action • Drama",
              desc: "An ambitious fixer navigates syndicate turf wars and moral decay to protect his estranged daughter.",
              posterClass: "poster-5"
            },
            {
              id: "m-6",
              title: "The Deep Silence",
              year: "2024",
              match: "93% Match",
              age: "PG-13",
              rating: "8.5",
              quality: "4K UHD",
              duration: "2h 05m",
              genres: "Drama • Adventure",
              desc: "Trapped in the Mariana Trench, an acoustic research submarine encounters an alien bio-luminescent pulse.",
              posterClass: "poster-10"
            }
          ]
        },
        {
          title: "Top Rated Blockbusters",
          items: [
            {
              id: "m-7",
              title: "Shadow Operative",
              year: "2024",
              match: "95% Match",
              age: "16+",
              rating: "9.2",
              quality: "4K UHD",
              duration: "2h 15m",
              genres: "Action • Crime",
              desc: "A retired operative undertakes one final extraction mission across Eastern Europe.",
              posterClass: "poster-9"
            },
            {
              id: "m-8",
              title: "Shape of My Heart",
              year: "2024",
              match: "92% Match",
              age: "13+",
              rating: "8.8",
              quality: "DOLBY ATMOS",
              duration: "1h 54m",
              genres: "Drama • Romance",
              desc: "Two souls from opposite worlds swap lives during a celestial phenomenon, forging an unbreakable bond.",
              posterClass: "poster-2"
            },
            {
              id: "m-9",
              title: "The Last Sunrise",
              year: "2026",
              match: "91% Match",
              age: "PG-13",
              rating: "8.7",
              quality: "HDR10+",
              duration: "2h 02m",
              genres: "Drama • Sci-Fi",
              desc: "Under the glow of a dying star, a vacationing student uncovers secrets that alter humanity's perception of time.",
              posterClass: "poster-3"
            },
            {
              id: "m-10",
              title: "The Runner: Protocol",
              year: "2025",
              match: "88% Match",
              age: "16+",
              rating: "8.4",
              quality: "HD",
              duration: "1h 48m",
              genres: "Action • Thriller",
              desc: "An underground courier races against time through fortified checkpoints to deliver life-saving antidote data.",
              posterClass: "poster-4"
            },
            {
              id: "m-11",
              title: "Aether Void",
              year: "2025",
              match: "94% Match",
              age: "13+",
              rating: "8.9",
              quality: "4K UHD",
              duration: "2h 18m",
              genres: "Sci-Fi • Adventure",
              desc: "A derelict orbital habitat reappears after thirty years in dark hyperspace with its crew in suspended stasis.",
              posterClass: "poster-11"
            },
            {
              id: "m-12",
              title: "Whispers of the Cosmos",
              year: "2024",
              match: "97% Match",
              age: "All",
              rating: "9.4",
              quality: "4K IMAX",
              duration: "1h 45m",
              genres: "Drama • Sci-Fi",
              desc: "An acoustic and visual journey across nebulae, mapping the primordial harmonies that sculpted the galaxies.",
              posterClass: "poster-12"
            }
          ]
        },
        {
          title: "Action & Adrenaline Thrillers",
          items: [
            {
              id: "m-13",
              title: "Apex Predator",
              year: "2025",
              match: "90% Match",
              age: "18+",
              rating: "8.6",
              quality: "DOLBY 5.1",
              duration: "1h 50m",
              genres: "Action • Thriller",
              desc: "Special forces stranded in the Siberian wilderness encounter a genetically augmented stealth predator.",
              posterClass: "poster-8"
            },
            {
              id: "m-14",
              title: "Sub-Zero Siege",
              year: "2026",
              match: "91% Match",
              age: "16+",
              rating: "8.8",
              quality: "4K UHD",
              duration: "2h 08m",
              genres: "Action • Crime",
              desc: "Arctic commandos infiltrate a fortified bio-weapons fortress hidden beneath polar ice caps.",
              posterClass: "poster-1"
            },
            {
              id: "m-15",
              title: "Velocity Vanguard",
              year: "2025",
              match: "91% Match",
              age: "13+",
              rating: "8.7",
              quality: "4K UHD",
              duration: "1h 58m",
              genres: "Action • Thriller",
              desc: "Precision drivers synchronize a multi-million dollar tech vault breach under cover of darkness.",
              posterClass: "poster-4"
            },
            {
              id: "m-16",
              title: "The Shadow Protocol",
              year: "2025",
              match: "94% Match",
              age: "16+",
              rating: "8.9",
              quality: "DOLBY VISION",
              duration: "2h 12m",
              genres: "Action • Thriller",
              desc: "High-stakes tactical extraction turns into an all-out metropolitan warfare against rogue intelligence units.",
              posterClass: "poster-2"
            },
            {
              id: "m-17",
              title: "Toxic: Goa Underground",
              year: "2025",
              match: "89% Match",
              age: "18+",
              rating: "8.2",
              quality: "HD",
              duration: "2h 20m",
              genres: "Action • Drama",
              desc: "Brutal syndicate vendettas collide along coastal territories in this pulse-pounding thriller.",
              posterClass: "poster-5"
            },
            {
              id: "m-18",
              title: "Shadow Operative",
              year: "2024",
              match: "95% Match",
              age: "16+",
              rating: "9.2",
              quality: "4K UHD",
              duration: "2h 15m",
              genres: "Action • Crime",
              desc: "One operator against an army of corrupt mercenaries in the snows of the Carpathian range.",
              posterClass: "poster-9"
            }
          ]
        },
        {
          title: "Sci-Fi & Cyberpunk Visions",
          items: [
            {
              id: "m-19",
              title: "Neon Horizon 2099",
              year: "2026",
              match: "97% Match",
              age: "16+",
              rating: "9.5",
              quality: "4K UHD",
              duration: "2h 35m",
              genres: "Sci-Fi • Cyberpunk",
              desc: "A synthetic freedom fighter challenges the omniscient neural mainframe controlling subterranean mega-cities.",
              posterClass: "poster-7"
            },
            {
              id: "m-20",
              title: "Interstellar Odyssey",
              year: "2026",
              match: "98% Match",
              age: "PG-13",
              rating: "9.4",
              quality: "4K UHD",
              duration: "2h 45m",
              genres: "Sci-Fi • Adventure",
              desc: "Relativity fractures as mankind's greatest pioneers seek habitable colonies across event horizons.",
              posterClass: "poster-1"
            },
            {
              id: "m-21",
              title: "Aether Void",
              year: "2025",
              match: "94% Match",
              age: "13+",
              rating: "8.9",
              quality: "4K UHD",
              duration: "2h 18m",
              genres: "Sci-Fi • Mystery",
              desc: "An eerie deep space station holds secrets capable of rewriting laws of thermodynamic physics.",
              posterClass: "poster-11"
            },
            {
              id: "m-22",
              title: "The Last Sunrise",
              year: "2026",
              match: "91% Match",
              age: "PG-13",
              rating: "8.7",
              quality: "HDR10+",
              duration: "2h 02m",
              genres: "Sci-Fi • Drama",
              desc: "A stellar anomaly forces Earth's astronomers to seek answers beyond the heliosphere.",
              posterClass: "poster-3"
            },
            {
              id: "m-23",
              title: "Whispers of the Cosmos",
              year: "2024",
              match: "97% Match",
              age: "All",
              rating: "9.4",
              quality: "4K IMAX",
              duration: "1h 45m",
              genres: "Sci-Fi • Documentary",
              desc: "Visualizing hyperspace dimensions and the birth of superclusters with peerless CGI fidelity.",
              posterClass: "poster-12"
            },
            {
              id: "m-24",
              title: "The Deep Silence",
              year: "2024",
              match: "93% Match",
              age: "PG-13",
              rating: "8.5",
              quality: "4K UHD",
              duration: "2h 05m",
              genres: "Sci-Fi • Drama",
              desc: "Sub-oceanic exploration meets interstellar frequency telemetry in deep aquatic trenches.",
              posterClass: "poster-10"
            }
          ]
        },
        {
          title: "Dark Fantasy & Mythic Sagas",
          items: [
            {
              id: "m-25",
              title: "Eclipse: Origins",
              year: "2026",
              match: "96% Match",
              age: "18+",
              rating: "9.1",
              quality: "HDR10+",
              duration: "2h 30m",
              genres: "Fantasy • Horror",
              desc: "Ancient runic orders summon celestial avatars to counter demonic legions rising from volcanic rifts.",
              posterClass: "poster-3"
            },
            {
              id: "m-26",
              title: "Chronicles of Solaria",
              year: "2025",
              match: "93% Match",
              age: "13+",
              rating: "8.9",
              quality: "HDR10+",
              duration: "2h 10m",
              genres: "Fantasy • Adventure",
              desc: "Guardians of the solar forge unite against shadows ascending from the core of a fractured continent.",
              posterClass: "poster-4"
            },
            {
              id: "m-27",
              title: "Spirit Blade: Awakening",
              year: "2026",
              match: "98% Match",
              age: "16+",
              rating: "9.6",
              quality: "4K UHD",
              duration: "2h 22m",
              genres: "Fantasy • Action",
              desc: "Live-action cinematic translation of the legendary soul-severing ronin folklore.",
              posterClass: "poster-12"
            },
            {
              id: "m-28",
              title: "Arcane Odyssey: The Film",
              year: "2025",
              match: "95% Match",
              age: "PG-13",
              rating: "9.2",
              quality: "DOLBY VISION",
              duration: "2h 05m",
              genres: "Fantasy • Adventure",
              desc: "Sky navigators chart celestial storm currents to unearth forgotten temples of arcane light.",
              posterClass: "poster-8"
            },
            {
              id: "m-29",
              title: "Shape of My Heart",
              year: "2024",
              match: "92% Match",
              age: "13+",
              rating: "8.8",
              quality: "DOLBY ATMOS",
              duration: "1h 54m",
              genres: "Fantasy • Drama",
              desc: "A magical body-switching occurrence illuminates the unspoken truths of two intertwined souls.",
              posterClass: "poster-2"
            },
            {
              id: "m-30",
              title: "Kingdom of Cloudcrest",
              year: "2025",
              match: "94% Match",
              age: "PG-13",
              rating: "9.0",
              quality: "4K UHD",
              duration: "2h 12m",
              genres: "Fantasy • Adventure",
              desc: "A floating kingdom suspended in perpetual storms must defend its royal crystal core.",
              posterClass: "poster-9"
            }
          ]
        },
        {
          title: "Award-Winning & Critically Acclaimed",
          items: [
            {
              id: "m-31",
              title: "Interstellar Odyssey",
              year: "2026",
              match: "98% Match",
              age: "PG-13",
              rating: "9.4",
              quality: "ACADEMY WINNER",
              duration: "2h 45m",
              genres: "Sci-Fi • Drama",
              desc: "Winner of 6 Golden Screen Awards including Best Visual Effects and Best Sound Design.",
              posterClass: "poster-1"
            },
            {
              id: "m-32",
              title: "Shape of My Heart",
              year: "2024",
              match: "92% Match",
              age: "13+",
              rating: "8.8",
              quality: "FESTIVAL WINNER",
              duration: "1h 54m",
              genres: "Drama • Romance",
              desc: "Critically revered romantic triumph celebrating empathy across social divides.",
              posterClass: "poster-2"
            },
            {
              id: "m-33",
              title: "Whispers of the Cosmos",
              year: "2024",
              match: "97% Match",
              age: "All",
              rating: "9.4",
              quality: "CRITICS CHOICE",
              duration: "1h 45m",
              genres: "Sci-Fi • Documentary",
              desc: "An immaculate cinematic experience hailed by critics as a milestone in acoustic filmmaking.",
              posterClass: "poster-12"
            },
            {
              id: "m-34",
              title: "Shadow Operative",
              year: "2024",
              match: "95% Match",
              age: "16+",
              rating: "9.2",
              quality: "4K UHD",
              duration: "2h 15m",
              genres: "Action • Crime",
              desc: "Praised for uncompromising stunt choreography and relentless pacing.",
              posterClass: "poster-9"
            },
            {
              id: "m-35",
              title: "Neon Horizon 2099",
              year: "2026",
              match: "97% Match",
              age: "16+",
              rating: "9.5",
              quality: "GRAND PRIX",
              duration: "2h 35m",
              genres: "Cyberpunk • Sci-Fi",
              desc: "An audiovisual tour-de-force that sets the new benchmark for modern worldbuilding.",
              posterClass: "poster-7"
            },
            {
              id: "m-36",
              title: "The Last Sunrise",
              year: "2026",
              match: "91% Match",
              age: "PG-13",
              rating: "8.7",
              quality: "OFFICIAL SELECTION",
              duration: "2h 02m",
              genres: "Drama • Sci-Fi",
              desc: "An intimate human exploration amidst cosmic devastation. A must-watch masterpiece.",
              posterClass: "poster-3"
            }
          ]
        }
      ]
    },

    "tv-shows": {
      id: "tv-shows",
      name: "TV Shows",
      title: "TV Shows & Series",
      subtitle: "Binge-worthy drama, episodic masterpieces & original serialized sagas",
      hero: {
        title: "NEON DYNASTIES",
        badge: "SEASON 3 STREAMING",
        rank: "#1 TV Show in the World",
        match: "99% Match",
        rating: "9.5",
        year: "2025",
        quality: "4K ULTRA HD",
        audio: "Dolby Atmos",
        age: "TV-MA",
        duration: "3 Seasons • 28 Episodes",
        genres: ["Cyberpunk", "Corporate Intrigue", "Sci-Fi Drama"],
        description:
          "Multi-generational corporate clans battle for monopolistic dominion over Earth's orbital space elevators, quantum banking networks, and Martian terraforming licenses.",
        backdropClass: "poster-5"
      },
      genres: ["All", "Action", "Crime", "Documentary", "Drama", "Mystery", "Sci-Fi", "Horror", "Thriller"],
      rails: [
        {
          title: "Trending Series This Week",
          items: [
            {
              id: "tv-1",
              title: "Neon Dynasties",
              year: "2025",
              match: "99% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "4K UHD",
              duration: "S3 • Ep 4 Available",
              genres: "Cyberpunk • Drama",
              desc: "Corporate clans wage proxy wars for orbital elevator monopolies.",
              posterClass: "poster-5"
            },
            {
              id: "tv-2",
              title: "Deep Horizon",
              year: "2024",
              match: "94% Match",
              age: "TV-14",
              rating: "9.2",
              quality: "SERIES FINALE",
              duration: "4 Seasons",
              genres: "Sci-Fi • Mystery",
              desc: "A generational starship crew awakens 200 years early to find navigation data corrupted.",
              posterClass: "poster-6"
            },
            {
              id: "tv-3",
              title: "Arcane Chronicles",
              year: "2025",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.0",
              quality: "EXCLUSIVE",
              duration: "2 Seasons",
              genres: "Horror • Drama",
              desc: "Ancient demigods walk modern metropolis streets, manipulating global financial systems.",
              posterClass: "poster-7"
            },
            {
              id: "tv-4",
              title: "Midnight Syndicate",
              year: "2024",
              match: "91% Match",
              age: "TV-MA",
              rating: "8.8",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Crime • Thriller",
              desc: "An undercover detective falls deeper into a corrupt cartel underworld to avenge his brother.",
              posterClass: "poster-8"
            },
            {
              id: "tv-5",
              title: "Facing El Chapo",
              year: "2024",
              match: "93% Match",
              age: "TV-14",
              rating: "8.8",
              quality: "DOCUSERIES",
              duration: "6 Episodes",
              genres: "Crime • Documentary",
              desc: "Unprecedented insider access into the multinational DEA operations targeting cartel leadership.",
              posterClass: "poster-6"
            },
            {
              id: "tv-6",
              title: "Quantum Cipher",
              year: "2025",
              match: "95% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "4K UHD",
              duration: "S1 Now Streaming",
              genres: "Thriller • Sci-Fi",
              desc: "A mathematician cracks an impossible algorithmic pattern embedded into satellite radio waves.",
              posterClass: "poster-11"
            }
          ]
        },
        {
          title: "Binge-Worthy Originals",
          items: [
            {
              id: "tv-7",
              title: "Sector 9: Quarantine",
              year: "2025",
              match: "92% Match",
              age: "TV-MA",
              rating: "8.9",
              quality: "4K HDR",
              duration: "2 Seasons",
              genres: "Sci-Fi • Thriller",
              desc: "Citizens enclosed in a walled metropolitan dome fight for survival against synthetic airborne pathogens.",
              posterClass: "poster-3"
            },
            {
              id: "tv-8",
              title: "The Glass Empire",
              year: "2024",
              match: "90% Match",
              age: "TV-14",
              rating: "8.7",
              quality: "HD",
              duration: "3 Seasons",
              genres: "Drama • Crime",
              desc: "Dynastic rivalries explode within Venice's golden mercantile renaissance.",
              posterClass: "poster-2"
            },
            {
              id: "tv-9",
              title: "Ghost Division",
              year: "2025",
              match: "94% Match",
              age: "TV-MA",
              rating: "9.3",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Action • Crime",
              desc: "A stealth special reconnaissance team executes deniable cross-border cyber operations.",
              posterClass: "poster-4"
            },
            {
              id: "tv-10",
              title: "Subterranea",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.0",
              quality: "NEW RELEASE",
              duration: "S1 Available",
              genres: "Mystery • Sci-Fi",
              desc: "Miners drilling beneath Antarctica discover an ancient preserved biosystem that shouldn't exist.",
              posterClass: "poster-10"
            },
            {
              id: "tv-11",
              title: "Neon Dynasties: Prologue",
              year: "2024",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.3",
              quality: "MINISERIES",
              duration: "4 Episodes",
              genres: "Cyberpunk • Drama",
              desc: "The origins of the megacorp summit that triggered the Pacific orbital conflict.",
              posterClass: "poster-5"
            },
            {
              id: "tv-12",
              title: "Deep Horizon: Colony",
              year: "2025",
              match: "92% Match",
              age: "TV-14",
              rating: "8.9",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Sci-Fi • Adventure",
              desc: "Pioneers on Gliese 667Cc construct humanity's first geodesic dome colony.",
              posterClass: "poster-1"
            }
          ]
        },
        {
          title: "Cyberpunk Dystopias & Sci-Fi",
          items: [
            {
              id: "tv-13",
              title: "Neon Dynasties",
              year: "2025",
              match: "99% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "4K UHD",
              duration: "3 Seasons",
              genres: "Cyberpunk • Sci-Fi",
              desc: "Cybernetic enhancements and neural link backdoors ignite corporate espionage in Neo-Tokyo.",
              posterClass: "poster-5"
            },
            {
              id: "tv-14",
              title: "Deep Horizon",
              year: "2024",
              match: "94% Match",
              age: "TV-14",
              rating: "9.2",
              quality: "4K UHD",
              duration: "4 Seasons",
              genres: "Sci-Fi • Thriller",
              desc: "An AI overseer malfunctions as cosmic rays destabilize interstellar cryo pods.",
              posterClass: "poster-6"
            },
            {
              id: "tv-15",
              title: "Sector 9: Quarantine",
              year: "2025",
              match: "92% Match",
              age: "TV-MA",
              rating: "8.9",
              quality: "4K HDR",
              duration: "2 Seasons",
              genres: "Sci-Fi • Action",
              desc: "Rogue synthetic doctors create illicit black-market vaccines in quarantined sector ruins.",
              posterClass: "poster-3"
            },
            {
              id: "tv-16",
              title: "Quantum Cipher",
              year: "2025",
              match: "95% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Sci-Fi • Mystery",
              desc: "Quantum computing cores predict major geopolitical catastrophes before they occur.",
              posterClass: "poster-11"
            },
            {
              id: "tv-17",
              title: "Subterranea",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.0",
              quality: "NEW",
              duration: "1 Season",
              genres: "Sci-Fi • Drama",
              desc: "Sub-glacial geothermal vents emit signals correlated to ancient extraterrestrial orbital probes.",
              posterClass: "poster-10"
            },
            {
              id: "tv-18",
              title: "Ghost Protocol 2099",
              year: "2026",
              match: "93% Match",
              age: "TV-MA",
              rating: "8.9",
              quality: "4K UHD",
              duration: "S1 Streaming",
              genres: "Cyberpunk • Action",
              desc: "Synthetic mercenaries battle in orbital debris fields over rogue tactical data satchel keys.",
              posterClass: "poster-7"
            }
          ]
        },
        {
          title: "True Crime & High-Stakes Intrigue",
          items: [
            {
              id: "tv-19",
              title: "Facing El Chapo",
              year: "2024",
              match: "93% Match",
              age: "TV-14",
              rating: "8.8",
              quality: "DOCUSERIES",
              duration: "6 Episodes",
              genres: "Crime • Documentary",
              desc: "Operatives recount the clandestine wiretap network and cross-border manhunts.",
              posterClass: "poster-6"
            },
            {
              id: "tv-20",
              title: "Midnight Syndicate",
              year: "2024",
              match: "91% Match",
              age: "TV-MA",
              rating: "8.8",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Crime • Drama",
              desc: "Federal agents infiltrate offshore banking nodes laundering cartel currency.",
              posterClass: "poster-8"
            },
            {
              id: "tv-21",
              title: "Ghost Division",
              year: "2025",
              match: "94% Match",
              age: "TV-MA",
              rating: "9.3",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Crime • Action",
              desc: "Special ops units track down corrupt officials selling state secrets to arms syndicates.",
              posterClass: "poster-4"
            },
            {
              id: "tv-22",
              title: "The Glass Empire",
              year: "2024",
              match: "90% Match",
              age: "TV-14",
              rating: "8.7",
              quality: "HD",
              duration: "3 Seasons",
              genres: "Crime • Drama",
              desc: "Murder, blackmail, and political corruption behind opulent Renaissance merchant palaces.",
              posterClass: "poster-2"
            },
            {
              id: "tv-23",
              title: "Toxic: Goa Underground",
              year: "2025",
              match: "89% Match",
              age: "18+",
              rating: "8.2",
              quality: "HD",
              duration: "Limited Series",
              genres: "Crime • Thriller",
              desc: "Underworld kingpins battle corrupt port authorities in south Asian shipping lanes.",
              posterClass: "poster-5"
            },
            {
              id: "tv-24",
              title: "Shadow Syndicate",
              year: "2024",
              match: "92% Match",
              age: "TV-MA",
              rating: "8.9",
              quality: "4K UHD",
              duration: "2 Seasons",
              genres: "Crime • Thriller",
              desc: "A forensic accountant unravels a global money-laundering web guarded by lethal assassins.",
              posterClass: "poster-9"
            }
          ]
        },
        {
          title: "Dark Horror & Mythic Lore",
          items: [
            {
              id: "tv-25",
              title: "Arcane Chronicles",
              year: "2025",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.0",
              quality: "EXCLUSIVE",
              duration: "2 Seasons",
              genres: "Horror • Drama",
              desc: "Hidden covenants of immortal sorcerers wage invisible arcane wars across European capitals.",
              posterClass: "poster-7"
            },
            {
              id: "tv-26",
              title: "Eclipse Sovereign",
              year: "2025",
              match: "94% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "4K UHD",
              duration: "2 Seasons",
              genres: "Horror • Fantasy",
              desc: "Demonic warlords reincarnate inside ancient monastic sanctums across the Himalayas.",
              posterClass: "poster-3"
            },
            {
              id: "tv-27",
              title: "Subterranea",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.0",
              quality: "NEW",
              duration: "1 Season",
              genres: "Horror • Mystery",
              desc: "An eldritch presence beneath the permafrost communicates with isolated research teams.",
              posterClass: "poster-10"
            },
            {
              id: "tv-28",
              title: "Soul Resonance",
              year: "2025",
              match: "93% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "DOLBY 5.1",
              duration: "Season 1",
              genres: "Horror • Action",
              desc: "Spiritual warriors channel the souls of past samurai masters to ward off shadow specters.",
              posterClass: "poster-12"
            },
            {
              id: "tv-29",
              title: "Sector 9: Occult",
              year: "2025",
              match: "91% Match",
              age: "TV-MA",
              rating: "8.8",
              quality: "HDR",
              duration: "1 Season",
              genres: "Horror • Thriller",
              desc: "When science failed to stop the outbreak, occult rituals were summoned in the ruins.",
              posterClass: "poster-8"
            },
            {
              id: "tv-30",
              title: "Kingdom of Cloudcrest",
              year: "2025",
              match: "95% Match",
              age: "PG-13",
              rating: "9.3",
              quality: "4K UHD",
              duration: "2 Seasons",
              genres: "Horror • Fantasy",
              desc: "Celestial sky spirits challenge mortal kings for sovereignty over high mountain shrines.",
              posterClass: "poster-9"
            }
          ]
        },
        {
          title: "Critically Acclaimed Miniseries",
          items: [
            {
              id: "tv-31",
              title: "Facing El Chapo",
              year: "2024",
              match: "93% Match",
              age: "TV-14",
              rating: "8.8",
              quality: "EMMY NOMINEE",
              duration: "6 Episodes",
              genres: "Crime • Documentary",
              desc: "Nominated for Best Documentary Series. Riveting, uncompromising historical journalism.",
              posterClass: "poster-6"
            },
            {
              id: "tv-32",
              title: "Neon Dynasties",
              year: "2025",
              match: "99% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "CRITICS CHOICE",
              duration: "28 Episodes",
              genres: "Drama • Sci-Fi",
              desc: "Universal critical acclaim for visionary worldbuilding and powerhouse ensemble acting.",
              posterClass: "poster-5"
            },
            {
              id: "tv-33",
              title: "The Glass Empire",
              year: "2024",
              match: "90% Match",
              age: "TV-14",
              rating: "8.7",
              quality: "BAFTA WINNER",
              duration: "3 Seasons",
              genres: "Drama • History",
              desc: "Winner of 4 BAFTA Awards for Production Design and Historical Costume.",
              posterClass: "poster-2"
            },
            {
              id: "tv-34",
              title: "Ghost Division",
              year: "2025",
              match: "94% Match",
              age: "TV-MA",
              rating: "9.3",
              quality: "4K UHD",
              duration: "1 Season",
              genres: "Action • Crime",
              desc: "An edge-of-your-seat thriller praised for tactical accuracy and authentic tension.",
              posterClass: "poster-4"
            },
            {
              id: "tv-35",
              title: "Quantum Cipher",
              year: "2025",
              match: "95% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "FESTIVAL WINNER",
              duration: "8 Episodes",
              genres: "Thriller • Sci-Fi",
              desc: "Celebrated for its mind-bending plot twists and mathematical intrigue.",
              posterClass: "poster-11"
            },
            {
              id: "tv-36",
              title: "Midnight Syndicate",
              year: "2024",
              match: "91% Match",
              age: "TV-MA",
              rating: "8.8",
              quality: "TOP PICK",
              duration: "10 Episodes",
              genres: "Crime • Drama",
              desc: "A gritty neo-noir journey through neon alleys and treacherous backrooms.",
              posterClass: "poster-8"
            }
          ]
        }
      ]
    },

    anime: {
      id: "anime",
      name: "Anime",
      title: "Anime & Japanese Animation",
      subtitle: "Worldwide simulcasts, Shonen epics, Cyberpunk sagas & Japanese masterworks",
      hero: {
        title: "SPIRIT BLADE: INFINITE",
        badge: "SIMULCAST EPISODE 24",
        rank: "#1 Anime Worldwide",
        match: "99% Match",
        rating: "9.7",
        year: "2026",
        quality: "4K HDR",
        audio: "Japanese / Dual Audio",
        age: "TV-14",
        duration: "Season 2 • 24 Episodes",
        genres: ["Action", "Dark Fantasy", "Horror Samurai"],
        description:
          "Wielding the legendary ethereal soul blade, a wandering exile ronin must sever the eternal bindings of resurrected demonic warlords to preserve peace in a burning empire.",
        backdropClass: "poster-12"
      },
      genres: ["All", "Action", "Adventure", "Comedy", "Fantasy", "Mecha", "Sci-Fi", "Horror"],
      rails: [
        {
          title: "Top Simulcasts & New Episodes",
          items: [
            {
              id: "a-1",
              title: "Spirit Blade: Infinite",
              year: "2026",
              match: "99% Match",
              age: "TV-14",
              rating: "9.7",
              quality: "SIMULCAST",
              duration: "Ep 24 Stream Ready",
              genres: "Action • Horror",
              desc: "A wandering ronin severs the demonic warlord bindings using ethereal katana techniques.",
              posterClass: "poster-12"
            },
            {
              id: "a-2",
              title: "Cyberpunk: Neon Edge",
              year: "2025",
              match: "97% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "4K UHD",
              duration: "Season 1 (Complete)",
              genres: "Sci-Fi • Cyberpunk",
              desc: "In an electric neon city where memories are traded, an orphaned netrunner hacks forbidden mainframes.",
              posterClass: "poster-7"
            },
            {
              id: "a-3",
              title: "Aether Wanderers",
              year: "2025",
              match: "94% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "TOP PICK",
              duration: "Season 1",
              genres: "Fantasy • Adventure",
              desc: "Airship sky pirates discover floating islands containing remnants of celestial architecture.",
              posterClass: "poster-10"
            },
            {
              id: "a-4",
              title: "Ghost Protocol 2099",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.0",
              quality: "NEW",
              duration: "Weekly Simulcast",
              genres: "Mecha • Sci-Fi",
              desc: "Gigantic cyber-frames clash over orbital kinetic strike weapons in the upper stratosphere.",
              posterClass: "poster-11"
            },
            {
              id: "a-5",
              title: "Eclipse Sovereign",
              year: "2025",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.4",
              quality: "4K",
              duration: "Season 2",
              genres: "Fantasy • Horror",
              desc: "A demon lord reincarnates as an ordinary academy librarian concealing primordial destructive spells.",
              posterClass: "poster-9"
            },
            {
              id: "a-6",
              title: "Tokyo Chrono: Zero",
              year: "2025",
              match: "91% Match",
              age: "TV-14",
              rating: "8.9",
              quality: "HD",
              duration: "12 Episodes",
              genres: "Sci-Fi • Mystery",
              desc: "High school detectives use temporal rewinds to prevent quantum calamities across Shibuya.",
              posterClass: "poster-5"
            }
          ]
        },
        {
          title: "Fan Favorites & Shonen Hits",
          items: [
            {
              id: "a-7",
              title: "Dragon Crest: Reborn",
              year: "2024",
              match: "96% Match",
              age: "TV-14",
              rating: "9.4",
              quality: "4K UHD",
              duration: "Season 3",
              genres: "Action • Adventure",
              desc: "An aspiring dragon rider tames a legendary black wyrm to protect the frontier kingdom.",
              posterClass: "poster-1"
            },
            {
              id: "a-8",
              title: "Soul Resonance",
              year: "2025",
              match: "93% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "DOLBY 5.1",
              duration: "Season 1",
              genres: "Action • Horror",
              desc: "Spiritual warriors harmonize elemental chakras to repel hollow monstrosities.",
              posterClass: "poster-3"
            },
            {
              id: "a-9",
              title: "Starlight Alchemist",
              year: "2024",
              match: "90% Match",
              age: "All",
              rating: "8.8",
              quality: "HD",
              duration: "24 Episodes",
              genres: "Fantasy • Comedy",
              desc: "A prodigy student invents culinary alchemical potions that accidentally grant godly speed.",
              posterClass: "poster-4"
            },
            {
              id: "a-10",
              title: "Valkyrie Vanguard",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.2",
              quality: "NEW",
              duration: "Simulcast Ep 8",
              genres: "Mecha • Sci-Fi",
              desc: "Elite female pilot aces defend interplanetary colony convoys from swarming biomechanical invaders.",
              posterClass: "poster-8"
            },
            {
              id: "a-11",
              title: "Spirit Blade: Infinite",
              year: "2026",
              match: "99% Match",
              age: "TV-14",
              rating: "9.7",
              quality: "FAN FAVORITE",
              duration: "24 Episodes",
              genres: "Action • Horror",
              desc: "Unstoppable ronin swordplay and spiritual sorcery animate this record-breaking Shonen phenomenon.",
              posterClass: "poster-12"
            },
            {
              id: "a-12",
              title: "Cyberpunk: Neon Edge",
              year: "2025",
              match: "97% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "4K UHD",
              duration: "10 Episodes",
              genres: "Action • Cyberpunk",
              desc: "Adrenaline-fueled cybernetic action that redefined modern animated television.",
              posterClass: "poster-7"
            }
          ]
        },
        {
          title: "Dark Samurai & Feudal Legends",
          items: [
            {
              id: "a-13",
              title: "Spirit Blade: Infinite",
              year: "2026",
              match: "99% Match",
              age: "TV-14",
              rating: "9.7",
              quality: "4K HDR",
              duration: "Ep 24 Stream Ready",
              genres: "Action • Horror",
              desc: "Masterful katana duels in bamboo forests illuminated by ghostly lanterns.",
              posterClass: "poster-12"
            },
            {
              id: "a-14",
              title: "Eclipse Sovereign",
              year: "2025",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.4",
              quality: "4K",
              duration: "Season 2",
              genres: "Fantasy • Horror",
              desc: "Feudal warlords bind ancient yokai souls into ancestral steel weapons.",
              posterClass: "poster-9"
            },
            {
              id: "a-15",
              title: "Soul Resonance",
              year: "2025",
              match: "93% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "DOLBY 5.1",
              duration: "Season 1",
              genres: "Action • Horror",
              desc: "Martial artists harness ancestral spirit fires during clan wars in ancient Kyoto.",
              posterClass: "poster-3"
            },
            {
              id: "a-16",
              title: "Dragon Crest: Ronin",
              year: "2024",
              match: "95% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "4K UHD",
              duration: "OVA 4-Part",
              genres: "Action • Adventure",
              desc: "A disgraced warrior wanders snowbound mountain passes seeking redemption.",
              posterClass: "poster-1"
            },
            {
              id: "a-17",
              title: "Tokyo Chrono: Sengoku",
              year: "2025",
              match: "92% Match",
              age: "TV-14",
              rating: "8.9",
              quality: "HD",
              duration: "12 Episodes",
              genres: "Action • Sci-Fi",
              desc: "Time-traveling swordsmen intervene in historical battles to preserve timeline integrity.",
              posterClass: "poster-5"
            },
            {
              id: "a-18",
              title: "Valkyrie Blade",
              year: "2026",
              match: "94% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "NEW",
              duration: "1 Season",
              genres: "Action • Fantasy",
              desc: "Mythic Norse valkyries collide with eastern sword masters in an otherworldly rift.",
              posterClass: "poster-8"
            }
          ]
        },
        {
          title: "Mecha Wars & Cybernetic Dreams",
          items: [
            {
              id: "a-19",
              title: "Ghost Protocol 2099",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.0",
              quality: "NEW",
              duration: "Weekly Simulcast",
              genres: "Mecha • Sci-Fi",
              desc: "Colossal mech armors clash with railguns across orbital elevator defense rings.",
              posterClass: "poster-11"
            },
            {
              id: "a-20",
              title: "Valkyrie Vanguard",
              year: "2026",
              match: "95% Match",
              age: "TV-14",
              rating: "9.2",
              quality: "4K UHD",
              duration: "Simulcast Ep 8",
              genres: "Mecha • Action",
              desc: "Transformable fighter-frames dogfight through planetary rings against robotic swarms.",
              posterClass: "poster-8"
            },
            {
              id: "a-21",
              title: "Cyberpunk: Neon Edge",
              year: "2025",
              match: "97% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "4K UHD",
              duration: "10 Episodes",
              genres: "Cyberpunk • Sci-Fi",
              desc: "Neural implants, titanium exoskeletons, and high-velocity highway skirmishes.",
              posterClass: "poster-7"
            },
            {
              id: "a-22",
              title: "Tokyo Chrono: Zero",
              year: "2025",
              match: "91% Match",
              age: "TV-14",
              rating: "8.9",
              quality: "HD",
              duration: "12 Episodes",
              genres: "Sci-Fi • Mecha",
              desc: "Prototype temporal mechs battle anomaly manifestations in downtown Tokyo.",
              posterClass: "poster-5"
            },
            {
              id: "a-23",
              title: "Aether Wanderers: Iron Sky",
              year: "2025",
              match: "94% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "TOP PICK",
              duration: "1 Season",
              genres: "Mecha • Adventure",
              desc: "Steam-powered brass titans protect flying armada ships from aerial predators.",
              posterClass: "poster-10"
            },
            {
              id: "a-24",
              title: "Neon Horizon: Gundam Sagas",
              year: "2026",
              match: "96% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "4K UHD",
              duration: "Feature Special",
              genres: "Mecha • Sci-Fi",
              desc: "Epic space colony warfare orchestrated with breathtaking hand-drawn frame animation.",
              posterClass: "poster-1"
            }
          ]
        },
        {
          title: "Isekai Realms & Mythic Magic",
          items: [
            {
              id: "a-25",
              title: "Eclipse Sovereign",
              year: "2025",
              match: "96% Match",
              age: "TV-MA",
              rating: "9.4",
              quality: "4K",
              duration: "Season 2",
              genres: "Fantasy • Horror",
              desc: "A reincarnated sovereign builds an underground kingdom of enchanted automatons.",
              posterClass: "poster-9"
            },
            {
              id: "a-26",
              title: "Dragon Crest: Reborn",
              year: "2024",
              match: "96% Match",
              age: "TV-14",
              rating: "9.4",
              quality: "4K UHD",
              duration: "Season 3",
              genres: "Fantasy • Adventure",
              desc: "Transported to a world of flying wyverns, an ordinary student discovers ancient crest magic.",
              posterClass: "poster-1"
            },
            {
              id: "a-27",
              title: "Starlight Alchemist",
              year: "2024",
              match: "90% Match",
              age: "All",
              rating: "8.8",
              quality: "HD",
              duration: "24 Episodes",
              genres: "Fantasy • Comedy",
              desc: "Whimsical alchemy in a colorful fantasy guild with hilarious potion mishaps.",
              posterClass: "poster-4"
            },
            {
              id: "a-28",
              title: "Aether Wanderers",
              year: "2025",
              match: "94% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "TOP PICK",
              duration: "Season 1",
              genres: "Fantasy • Adventure",
              desc: "Soaring among floating sky continents powered by ancient mana crystals.",
              posterClass: "poster-10"
            },
            {
              id: "a-29",
              title: "Spirit Blade: Infinite",
              year: "2026",
              match: "99% Match",
              age: "TV-14",
              rating: "9.7",
              quality: "MASTERPIECE",
              duration: "Season 2",
              genres: "Fantasy • Action",
              desc: "Traversing spirit gateways connecting the mortal realm to the celestial ether.",
              posterClass: "poster-12"
            },
            {
              id: "a-30",
              title: "Chronicles of Solaria",
              year: "2025",
              match: "93% Match",
              age: "13+",
              rating: "8.9",
              quality: "HDR10+",
              duration: "Movie Special",
              genres: "Fantasy • Magic",
              desc: "Sun-magic wielders battle shadows invading from the abyssal threshold.",
              posterClass: "poster-2"
            }
          ]
        },
        {
          title: "Acclaimed Japanese Feature Films",
          items: [
            {
              id: "a-31",
              title: "Spirit Blade: Infinite",
              year: "2026",
              match: "99% Match",
              age: "TV-14",
              rating: "9.7",
              quality: "BOX OFFICE #1",
              duration: "2h 10m Film",
              genres: "Action • Horror",
              desc: "Highest grossing theatrical anime release of the year worldwide.",
              posterClass: "poster-12"
            },
            {
              id: "a-32",
              title: "Cyberpunk: Neon Edge",
              year: "2025",
              match: "97% Match",
              age: "TV-MA",
              rating: "9.5",
              quality: "CRITICS CHOICE",
              duration: "Feature Edition",
              genres: "Action • Sci-Fi",
              desc: "Re-edited theatrical edition with remastered DTS audio and extended scenes.",
              posterClass: "poster-7"
            },
            {
              id: "a-33",
              title: "Whispers of the Cosmos",
              year: "2024",
              match: "97% Match",
              age: "All",
              rating: "9.4",
              quality: "AWARD WINNER",
              duration: "1h 45m",
              genres: "Sci-Fi • Family",
              desc: "An acoustic and visual tour-de-force that won the Tokyo Animation Film Award.",
              posterClass: "poster-12"
            },
            {
              id: "a-34",
              title: "Aether Wanderers: Skyfall",
              year: "2025",
              match: "94% Match",
              age: "TV-14",
              rating: "9.3",
              quality: "4K UHD",
              duration: "1h 52m",
              genres: "Fantasy • Adventure",
              desc: "The cinematic conclusion to the beloved sky-pirate journey across the floating realm.",
              posterClass: "poster-10"
            },
            {
              id: "a-35",
              title: "Soul Resonance: The Movie",
              year: "2025",
              match: "93% Match",
              age: "TV-14",
              rating: "9.1",
              quality: "DOLBY ATMOS",
              duration: "1h 48m",
              genres: "Action • Horror",
              desc: "Spectacular theatrical battle between elemental warriors and the Primordial Hollow.",
              posterClass: "poster-3"
            },
            {
              id: "a-36",
              title: "Dragon Crest: Final Flight",
              year: "2024",
              match: "96% Match",
              age: "TV-14",
              rating: "9.4",
              quality: "4K UHD",
              duration: "2h 04m",
              genres: "Action • Adventure",
              desc: "A breathtaking emotional farewell as dragon and rider soar into legend.",
              posterClass: "poster-1"
            }
          ]
        }
      ]
    },

    get cartoons() {
      return this.anime;
    }
  };

  // State Management
  let currentCategory = "movies";
  let activeGenreFilter = "All";
  let activeFilteredItems = [];
  let previousScrollPosition = 0;
  let watchlistItems = new Set(["Interstellar Odyssey", "Neon Dynasties", "Spirit Blade: Infinite", "Eclipse: Origins"]);

  // Load Watchlist from LocalStorage
  try {
    const saved = localStorage.getItem("klm_cinematics_watchlist");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        watchlistItems = new Set(parsed);
      }
    }
  } catch (e) {
    // LocalStorage fallback
  }

  function isItemInWatchlist(idOrTitle) {
    if (window.KLMWatchlist && typeof window.KLMWatchlist.isInWatchlist === "function") {
      return window.KLMWatchlist.isInWatchlist(idOrTitle);
    }
    return watchlistItems.has(idOrTitle);
  }

  function saveWatchlist() {
    try {
      localStorage.setItem("klm_cinematics_watchlist", JSON.stringify(Array.from(watchlistItems)));
    } catch (e) {}
    updateWatchlistBadges();
  }

  function updateWatchlistBadges() {
    const badgeCountEl = document.querySelector(".item-count");
    if (badgeCountEl) {
      const count = (window.KLMWatchlist && typeof window.KLMWatchlist.getWatchlist === "function")
        ? window.KLMWatchlist.getWatchlist().length
        : watchlistItems.size;
      badgeCountEl.textContent = `${count} Saved`;
    }
  }

  // ==========================================================
  // Video Player Modal (Server Selection & Episode Engine)
  // TMDB-only Architecture — no AniList or Jikan dependencies
  // ==========================================================
  const TMDB_PROXY            = "/api/tmdb";
  const TMDB_BACKDROP_LG      = "https://image.tmdb.org/t/p/w1280";
  const TMDB_BACKDROP_MD      = "https://image.tmdb.org/t/p/w780";
  const TMDB_POSTER_MD        = "https://image.tmdb.org/t/p/w500";



  // In-memory + SessionStorage Resolution Cache for Anime -> TMDB mapping
  const animeTMDBResolutionCache = new Map();
  try {
    const savedMap = sessionStorage.getItem("anime_tmdb_map");
    if (savedMap) {
      const parsed = JSON.parse(savedMap);
      for (const [k, v] of Object.entries(parsed)) {
        animeTMDBResolutionCache.set(k, v);
      }
    }
  } catch (e) {}

  function saveAnimeTMDBResolutionCache() {
    try {
      const obj = {};
      animeTMDBResolutionCache.forEach((v, k) => {
        obj[k] = v;
      });
      sessionStorage.setItem("anime_tmdb_map", JSON.stringify(obj));
    } catch (e) {}
  }

  async function searchTMDB(type, query, year) {
    let url = `${TMDB_PROXY}?path=search/${type}&query=${encodeURIComponent(query)}&include_adult=false`;
    if (year) url += `&year=${year}`;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) return [];
      const data = await res.json();
      return (data?.results || []).map((r) => ({ ...r, _mediaType: type }));
    } catch (e) {
      return [];
    }
  }

  // Dynamic Resolution: AniList / Jikan Anime Title -> TMDB ID
  // Dual Title Lookup: title.english first -> retry title.romaji
  // Strict Genre & Language Filtering: Genre ID 16 (Animation) AND original_language === "ja"
  // Fallback: If no Japanese animation match exists, select first result with Genre ID 16
  // Media Type Route Handling: "tv" vs "movie"
  async function getTmdbIdForAnime(animeItem) {
    if (!animeItem) return { tmdbId: null, mediaType: "tv", isMovie: false };

    // Only trust existing tmdbId if explicitly verified by our TMDB pipeline
    if (animeItem._tmdbVerified === true && animeItem.tmdbId && !isNaN(parseInt(animeItem.tmdbId, 10))) {
      const isMov = Boolean(animeItem.isMovie || animeItem.format === "MOVIE" || animeItem.type === "Movie" || animeItem.type === "Anime Movie");
      return {
        tmdbId: Number(animeItem.tmdbId),
        mediaType: isMov ? "movie" : "tv",
        isMovie: isMov,
        title: typeof animeItem.title === "string" ? animeItem.title : (animeItem.title?.english || animeItem.title?.romaji || "")
      };
    }

    const englishTitle = (typeof animeItem.title === "object" ? animeItem.title?.english : animeItem.title) || animeItem.rawTitle?.english || "";
    const romajiTitle = (typeof animeItem.title === "object" ? animeItem.title?.romaji : "") || animeItem.rawTitle?.romaji || "";
    const cleanItemTitle = (typeof animeItem.title === "string" ? animeItem.title : "").trim();
    const isMovieHint = Boolean(animeItem.format === "MOVIE" || animeItem.isMovie === true || animeItem.type === "Movie" || animeItem.type === "Anime Movie");

    const lookupTitle = (englishTitle || romajiTitle || cleanItemTitle).trim();
    if (!lookupTitle) {
      return { tmdbId: null, mediaType: isMovieHint ? "movie" : "tv", isMovie: isMovieHint };
    }

    const cacheKey = `anime:${lookupTitle.toLowerCase()}:${isMovieHint ? "movie" : "tv"}`;
    if (animeTMDBResolutionCache.has(cacheKey)) {
      const cached = animeTMDBResolutionCache.get(cacheKey);
      if (animeItem) {
        animeItem.tmdbId = cached.tmdbId;
        animeItem._tmdbVerified = true;
        animeItem.mediaType = cached.mediaType;
        animeItem.isMovie = cached.isMovie;
      }
      return cached;
    }

    // Dual Title Lookup: title.english first, then retry with title.romaji (and fallback to cleanItemTitle)
    const titlesToTry = [];
    if (englishTitle && englishTitle.trim()) titlesToTry.push(englishTitle.trim());
    if (romajiTitle && romajiTitle.trim() && !titlesToTry.includes(romajiTitle.trim())) {
      titlesToTry.push(romajiTitle.trim());
    }
    if (cleanItemTitle && !titlesToTry.includes(cleanItemTitle)) {
      titlesToTry.push(cleanItemTitle);
    }

    // Endpoints to check: query both /search/tv and /search/movie with include_adult=false
    const endpoints = isMovieHint ? ["movie", "tv"] : ["tv", "movie"];

    let bestMatch = null;
    let matchedEndpoint = isMovieHint ? "movie" : "tv";

    // 1. Strict Filter: TMDB Genre ID 16 (Animation) AND original_language === "ja"
    for (const title of titlesToTry) {
      for (const endpoint of endpoints) {
        const results = await searchTMDB(endpoint, title);
        const strictMatch = results.find((r) => 
          Array.isArray(r.genre_ids) && r.genre_ids.includes(16) && r.original_language === "ja"
        );
        if (strictMatch) {
          bestMatch = strictMatch;
          matchedEndpoint = endpoint;
          break;
        }
      }
      if (bestMatch) break;
    }

    // 2. Fallback: If no Japanese animation match exists, select first result containing genre ID 16
    if (!bestMatch) {
      for (const title of titlesToTry) {
        for (const endpoint of endpoints) {
          const results = await searchTMDB(endpoint, title);
          const genre16Match = results.find((r) => 
            Array.isArray(r.genre_ids) && r.genre_ids.includes(16)
          );
          if (genre16Match) {
            bestMatch = genre16Match;
            matchedEndpoint = endpoint;
            break;
          }
        }
        if (bestMatch) break;
      }
    }

    // 3. Last fallback: any result if no genre 16 returned
    if (!bestMatch) {
      for (const title of titlesToTry) {
        for (const endpoint of endpoints) {
          const results = await searchTMDB(endpoint, title);
          if (results && results.length > 0) {
            bestMatch = results.find((r) => r.original_language === "ja") || results[0];
            matchedEndpoint = endpoint;
            break;
          }
        }
        if (bestMatch) break;
      }
    }

    // Route Media Correctly:
    // If matched item is TV show: route type is "tv" (/embed/tv/{tmdb_id}/{season}/{episode})
    // If matched item is Movie: route type is "movie" (/embed/movie/{tmdb_id})
    const finalMediaType = bestMatch
      ? (bestMatch._mediaType || matchedEndpoint || (bestMatch.first_air_date ? "tv" : "movie"))
      : (isMovieHint ? "movie" : "tv");

    const finalIsMovie = finalMediaType === "movie";

    // Robust anime fallback if not matched in TMDB
    const fallbackAnimeId = finalIsMovie ? 129 : 85937; // 129: Spirited Away (movie), 85937: Demon Slayer (TV)
    const resolved = {
      tmdbId: bestMatch ? bestMatch.id : fallbackAnimeId,
      mediaType: finalMediaType,
      isMovie: finalIsMovie,
      title: bestMatch ? (bestMatch.name || bestMatch.title) : lookupTitle
    };

    if (resolved.tmdbId) {
      animeTMDBResolutionCache.set(cacheKey, resolved);
      saveAnimeTMDBResolutionCache();
    }

    if (animeItem) {
      animeItem.tmdbId = resolved.tmdbId;
      animeItem._tmdbVerified = Boolean(resolved.tmdbId);
      animeItem.mediaType = resolved.mediaType;
      animeItem.isMovie = resolved.isMovie;
    }

    return resolved;
  }

  // Alias for backward compatibility
  const resolveAnimeToTMDB = getTmdbIdForAnime;
  const GENERAL_SERVERS = [
    {
      id: "server-1",
      label: "Server 1",
      movie: (id) => `https://vsembed.ru/embed/movie/${id}`,
      tv: (id, s, e) => `https://vidrock.ru/tv/${id}/${s}/${e}`
    },
    {
      id: "server-2",
      label: "Server 2",
      movie: (id) => `https://moviesapi.to/movie/${id}`,
      tv: (id, s, e) => `https://vidsrcme.su/embed/tv?tmdb=${id}&season=${s}&episode=${e}`
    },
    {
      id: "server-3",
      label: "Server 3",
      movie: (id) => `https://vidsrc.vip/embed/movie/${id}`,
      tv: (id, s, e) => `https://moviesapi.to/tv/${id}-${s}-${e}`
    },
    {
      id: "server-4",
      label: "Server 4",
      movie: (id) => `https://vidlink.pro/movie/${id}`,
      tv: (id, s, e) => `https://vidsrc.vip/embed/tv/${id}/${s}/${e}`
    },
    {
      id: "server-5",
      label: "Server 5",
      movie: (id) => `https://player.videasy.net/movie/${id}`,
      tv: (id, s, e) => `https://vidlink.pro/tv/${id}/${s}/${e}`
    },
    {
      id: "server-6",
      label: "Server 6",
      movie: (id) => `https://vidfast.pro/movie/${id}?autoPlay=true`,
      tv: (id, s, e) => `https://player.videasy.net/tv/${id}/${s}/${e}`
    },
    {
      id: "server-7",
      label: "Server 7",
      movie: (id) => `https://player.vidzee.wtf/embed/movie/${id}?server=1`,
      tv: (id, s, e) => `https://vidfast.pro/tv/${id}/${s}/${e}?autoPlay=true`
    }
  ];

  // Dedicated Anime & Cartoons servers (Renumbered Server 1, Server 2, Server 3)
  const ANIME_SERVERS = [
    {
      id: "server-1",
      label: "Server 1",
      movie: (id) => `https://player.videasy.net/movie/${id}`,
      tv: (id, s, e) => `https://player.videasy.net/tv/${id}/${s}/${e}`,
      anime: (id, s, e) => `https://player.videasy.net/tv/${id}/${s}/${e}`,
      animeMovie: (id) => `https://player.videasy.net/movie/${id}`
    },
    {
      id: "server-2",
      label: "Server 2",
      movie: (id) => `https://vsembed.ru/embed/movie/${id}`,
      tv: (id, s, e) => `https://vidsrcme.su/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
      anime: (id, s, e) => `https://vidsrcme.su/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
      animeMovie: (id) => `https://vsembed.ru/embed/movie/${id}`
    },
    {
      id: "server-3",
      label: "Server 3",
      movie: (id) => `https://vidfast.pro/movie/${id}?autoPlay=true`,
      tv: (id, s, e) => `https://vidrock.ru/tv/${id}/${s}/${e}`,
      anime: (id, s, e) => `https://vidrock.ru/tv/${id}/${s}/${e}`,
      animeMovie: (id) => `https://vidfast.pro/movie/${id}?autoPlay=true`
    }
  ];

  const STREAM_SERVERS = GENERAL_SERVERS;

  let currentModalItem = null;
  let currentModalSeason = 1;
  let currentModalEpisode = 1;
  let lastFocusedElementBeforeModal = null;

  // In-memory caching for TMDB TV series details & season episodes
  const tmdbSeriesCache = new Map();
  const tmdbEpisodeCache = new Map();

  function checkIsEpisodic(item) {
    if (!item) return false;
    // Explicit movie flags always override
    if (item.mediaType === "movie" || item.isMovie === true || item.format === "MOVIE") return false;
    if (item.category === "movies" || item.type === "Movie" || item.type === "Anime Movie") return false;

    // Explicit TV series flags
    if (item.mediaType === "tv" || item.category === "tv-shows") return true;
    if ((item.category === "anime" || item.type === "Anime") && !item.isMovie && item.mediaType !== "movie") return true;
    if (item.hasEpisodes !== undefined) return Boolean(item.hasEpisodes);
    if (Array.isArray(item.episodes) && item.episodes.length > 0) return true;
    if (typeof item.episodes === "number" && item.episodes > 1) return true;
    if (Array.isArray(item.seasons) && item.seasons.length > 0) return true;

    const rawType = (item.type || item.category || "").toLowerCase();
    if (rawType.includes("movie")) return false;
    if (rawType.includes("tv") || rawType.includes("series") || rawType.includes("show")) return true;

    const rawGenres = (Array.isArray(item.genres) ? item.genres.join(" ") : (item.genres || "")).toLowerCase();
    if (rawGenres.includes("movie") && !rawGenres.includes("series")) return false;
    if (rawGenres.includes("tv series") || rawGenres.includes("anime series")) return true;

    const rawDuration = (item.duration || "").toLowerCase();
    const rawBadge = (item.badge || item.quality || "").toLowerCase();
    if (rawBadge.includes("s1") || rawBadge.includes("s2") || rawBadge.includes("s3") || rawBadge.includes("episode") || rawBadge.includes("series")) return true;
    if (rawDuration.includes("season") || rawDuration.includes("ep") || rawDuration.includes("episode")) return true;

    const itemTitle = (typeof item.title === "object" ? (item.title?.english || item.title?.romaji) : (item.title || "")).toLowerCase().trim();
    if (itemTitle) {
      for (const catKey of ["tv-shows", "anime"]) {
        const cat = SUBPAGE_DATA[catKey];
        if (cat && cat.rails) {
          for (const rail of cat.rails) {
            if (rail.items && rail.items.some((i) => (typeof i.title === "string" ? i.title.toLowerCase().trim() : "") === itemTitle)) {
              return true;
            }
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      const loc = (window.location.pathname + window.location.hash).toLowerCase();
      if (loc.includes("movies")) return false;
      if (loc.includes("tv-shows") || loc.includes("anime")) return true;
    }
    return false;
  }

  function checkIsAnime(item) {
    if (!item) return false;
    if (item.isAnime === true) return true;
    const cat = (item.category || "").toLowerCase();
    if (cat === "anime" || cat.includes("anime")) return true;
    const type = (item.type || "").toLowerCase();
    if (type.includes("anime")) return true;
    // TMDB genre_ids: 16 = Animation
    if (Array.isArray(item.genre_ids) && item.genre_ids.includes(16)) return true;
    const genres = (Array.isArray(item.genres) ? item.genres.join(" ") : (item.genres || "")).toLowerCase();
    if (genres.includes("anime") || genres.includes("animation")) return true;
    const badge = (item.badge || "").toLowerCase();
    if (badge.includes("anime") || badge.includes("simulcast")) return true;
    const title = ((typeof item.title === "object" ? (item.title?.english || item.title?.romaji) : item.title) || "").toLowerCase();
    if (title && (title.includes("anime") || title.includes("naruto") || title.includes("dragon ball") || title.includes("piece") || title.includes("bleach") || title.includes("jujutsu") || title.includes("titan") || title.includes("slayer") || title.includes("hero academia") || title.includes("death note") || title.includes("reborn") || title.includes("simpsons"))) return true;
    if (typeof window !== "undefined") {
      const loc = (window.location.pathname + window.location.hash).toLowerCase();
      if (loc.includes("anime")) return true;
    }
    return false;
  }

  function checkIsAnimeOrCartoon(item) {
    if (!item) return false;
    if (checkIsAnime(item)) return true;
    const cat = (item.category || "").toLowerCase();
    if (cat.includes("anime") || cat.includes("cartoon") || cat.includes("animation")) return true;
    const type = (item.type || "").toLowerCase();
    if (type.includes("anime") || type.includes("cartoon") || type.includes("animation")) return true;
    if (Array.isArray(item.genre_ids) && item.genre_ids.includes(16)) return true; // 16 = TMDB Animation genre ID
    const rawGenres = (Array.isArray(item.genres) ? item.genres.join(" ") : (item.genres || "")).toLowerCase();
    if (rawGenres.includes("anime") || rawGenres.includes("cartoon") || rawGenres.includes("animation")) return true;
    const badge = (item.badge || "").toLowerCase();
    if (badge.includes("anime") || badge.includes("cartoon") || badge.includes("simulcast")) return true;
    if (typeof window !== "undefined") {
      const loc = (window.location.pathname + window.location.hash).toLowerCase();
      if (loc.includes("anime") || loc.includes("cartoon")) return true;
    }
    return false;
  }

  function getActiveServers(item) {
    if (checkIsAnimeOrCartoon(item)) {
      // When the card is anime or cartoon, return Server 1, Server 2, Server 3
      return ANIME_SERVERS;
    }
    // For other genres / movies / TV shows: show all 7 servers
    return GENERAL_SERVERS;
  }

  // Resolve true TMDB ID from item or dynamic TMDB search API
  async function resolveTMDBId(item) {
    if (!item) return 157336;
    if (item.tmdbId && !isNaN(parseInt(item.tmdbId, 10)) && Number(item.tmdbId) > 0) {
      return Number(item.tmdbId);
    }
    if (item.id && !isNaN(parseInt(item.id, 10)) && Number(item.id) > 0) {
      item.tmdbId = Number(item.id);
      item._tmdbVerified = true;
      return item.tmdbId;
    }

    if (checkIsAnime(item)) {
      const res = await getTmdbIdForAnime(item);
      item.tmdbId = res.tmdbId;
      item._tmdbVerified = true;
      item.mediaType = res.mediaType;
      item.isMovie = res.isMovie;
      return res.tmdbId;
    }

    const isEpisodic = checkIsEpisodic(item);
    const searchType = isEpisodic ? "tv" : "movie";
    const cleanTitle = (typeof item.title === "string" ? item.title : (item.title?.english || item.title?.romaji || "")).trim();
    if (!cleanTitle) {
      return isEpisodic ? 1399 : 157336;
    }

    try {
      // Search without restrictive year query to avoid false negative misses
      const searchUrl = `${TMDB_BASE_URL}/search/${searchType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(searchUrl, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.results) && data.results.length > 0) {
          const matched = data.results[0];
          item.tmdbId = matched.id;
          item._tmdbVerified = true;
          return matched.id;
        }
      }
    } catch (e) {
      console.warn("[TMDB] Failed to resolve TMDB ID for title:", cleanTitle, e);
    }

    // Default fallback so playback never breaks on subpages
    const fallbackId = isEpisodic ? 1399 : 157336; // 1399: Game of Thrones, 157336: Interstellar
    item.tmdbId = fallbackId;
    return fallbackId;
  }

  function generateFallbackEpisodes(title, seasonNum, year) {
    const baseYear = parseInt(year, 10) || 2023;
    const count = 10;
    const fallbackData = [
      { title: "Freedom Day", runtime: "62m", overview: "Sheriff Becker's plans for the future are thrown off course after his wife meets a hacker with information about the silo." },
      { title: "Holston's Pick", runtime: "52m", overview: "Juliette, an engineer, pieces together what might have led to a co-worker's mysterious death." },
      { title: "Machines", runtime: "66m", overview: "In her hunt for a new sheriff, Mayor Jahns clashes with Bernard. Juliette strikes a deal to keep the generator running." },
      { title: "Truth", runtime: "49m", overview: "Juliette tries gaining the trust of Deputy Marnes as they work to uncover the truth about recent tragedies." },
      { title: "The Janitor's Boy", runtime: "54m", overview: "Sims appoints Billings as chief deputy to keep tabs on Juliette, whose efforts to solve two murders lead to a showdown." },
      { title: "The Relic", runtime: "55m", overview: "During her investigation, Juliette uncovers disturbing secrets about someone she thought she knew." },
      { title: "The Flamekeepers", runtime: "51m", overview: "Bernard seeks Juliette's cooperation as he grows increasingly concerned about the silo's security. Juliette asks her father for help." },
      { title: "Hanna", runtime: "48m", overview: "New information leads Juliette to see her family's past in a new light — and finally access the silo's biggest secrets." },
      { title: "The Getaway", runtime: "48m", overview: "Billings makes a fateful move while Juliette works to broadcast an eye-opening message before it's too late." },
      { title: "Outside", runtime: "45m", overview: "Juliette's fate appears sealed, but certain truths are finally brought to light as the silo faces a reckoning." }
    ];
    const list = [];
    for (let i = 1; i <= count; i++) {
      const fb = fallbackData[i - 1] || { title: `Episode ${i}`, runtime: `${45 + ((i * 3) % 15)}m`, overview: "Now streaming in high definition on KLM CINEMATICS." };
      list.push({
        ep: i,
        title: fb.title,
        meta: `${baseYear} | ${fb.runtime}`,
        overview: fb.overview
      });
    }
    return list;
  }

  // Dynamic Dropdown Selectors Injection & Wiring
  function ensurePlayerDropdowns(modalEl) {
    const modal = modalEl || document.getElementById("player-modal") || document.getElementById("cinema-player-modal");
    if (!modal) return { container: null, seasonSelect: null, episodeSelect: null };

    const container = modal.querySelector("#player-dropdowns-container");
    let seasonSelect = modal.querySelector("#season-select");
    let episodeSelect = modal.querySelector("#episode-select");

    // If season-select is not yet present, inject inside .player-episodes-header
    if (!seasonSelect) {
      const header = modal.querySelector(".player-episodes-header");
      if (header) {
        const wrap = document.createElement("div");
        wrap.className = "player-season-dropdown-wrap";
        wrap.innerHTML = `<select class="player-season-select" id="season-select" aria-label="Select season"></select>`;
        header.appendChild(wrap);
        seasonSelect = wrap.querySelector("#season-select");
      }
    }

    if (!episodeSelect) {
      episodeSelect = document.createElement("select");
      episodeSelect.id = "episode-select";
      episodeSelect.className = "player-episode-select";
      episodeSelect.style.display = "none";
      modal.appendChild(episodeSelect);
    }

    wireDropdownListeners(modal);
    return { container, seasonSelect, episodeSelect };
  }

  function wireDropdownListeners(modalEl) {
    const modal = modalEl || document.getElementById("player-modal") || document.getElementById("cinema-player-modal");
    if (!modal) return;
    const seasonSelect = modal.querySelector("#season-select");
    const episodeSelect = modal.querySelector("#episode-select");

    if (seasonSelect && !seasonSelect._wired) {
      seasonSelect._wired = true;
      seasonSelect.addEventListener("change", async () => {
        currentModalSeason = parseInt(seasonSelect.value, 10) || 1;
        currentModalEpisode = 1;
        if (currentModalItem) {
          const seriesId = currentModalItem.tmdbId || (await resolveTMDBId(currentModalItem));
          await fetchAndRenderEpisodes(seriesId, currentModalSeason, currentModalItem);
        }
        serverFailoverAttempts = 0;
        updatePlayerStream(true);
      });
    }

    if (episodeSelect && !episodeSelect._wired) {
      episodeSelect._wired = true;
      episodeSelect.addEventListener("change", () => {
        currentModalEpisode = parseInt(episodeSelect.value, 10) || 1;
        
        const grid = document.getElementById("player-episodes-grid");
        if (grid) {
          grid.querySelectorAll(".player-episode-card").forEach((card) => {
            const cardEp = parseInt(card.getAttribute("data-ep"), 10);
            card.classList.toggle("active", cardEp === currentModalEpisode);
          });
        }
        serverFailoverAttempts = 0;
        updatePlayerStream(true);
      });
    }
  }

  function createPlayerModal() {
    if (document.getElementById("cinema-player-modal") || document.getElementById("player-modal")) return;

    const modal = document.createElement("div");
    modal.id = "cinema-player-modal";
    modal.className = "player-modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="player-modal-box" id="player-modal">
        <!-- 1. Top Header Bar -->
        <div class="player-modal-header">
          <div class="player-header-left">
            <div class="player-server-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <rect x="2" y="4" width="20" height="6" rx="2"></rect>
                <rect x="2" y="14" width="20" height="6" rx="2"></rect>
                <circle cx="6" cy="7" r="1.2" fill="#000"></circle>
                <circle cx="6" cy="17" r="1.2" fill="#000"></circle>
              </svg>
              <span>Server:</span>
            </div>
            <div class="player-server-select-wrap">
              <select class="player-server-select" id="player-server-select" aria-label="Select streaming server">
                <option value="server-1">Server 1</option>
                <option value="server-2">Server 2</option>
                <option value="server-3">Server 3</option>
                <option value="server-4">Server 4</option>
                <option value="server-5">Server 5</option>
                <option value="server-6">Server 6</option>
                <option value="server-7">Server 7</option>
              </select>
            </div>
          </div>
          <div class="player-header-right" style="display: flex; align-items: center; gap: 10px;">
            <button type="button" class="player-modal-download-btn" id="player-modal-download-btn" aria-label="Download on VidVault" title="Download on VidVault (via TMDB ID)" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #fff; border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, transform 0.2s;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            <button type="button" class="player-modal-close" id="player-modal-close" aria-label="Close player">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Server Switch Reminder Notice -->
        <div class="player-server-reminder-popup" id="player-server-reminder-popup" role="status" aria-live="polite">
          <div class="player-reminder-inner">
            <svg class="player-reminder-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span class="player-reminder-text">If the current server is not working, please switch to another server using the dropdown above.</span>
            <button type="button" class="player-reminder-close" id="player-reminder-close" aria-label="Dismiss tip">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 2. Video Player Screen Area -->
        <div class="simulated-screen" id="player-screen-area">
          <div class="simulated-backdrop" id="player-backdrop"></div>
          <div class="player-screen-overlay"></div>
          <div class="player-server-notice" id="player-server-notice" style="display: none; position: absolute; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(229, 9, 20, 0.7); color: #fff; padding: 7px 16px; border-radius: 9999px; font-size: 0.82rem; font-weight: 600; z-index: 35; pointer-events: none; backdrop-filter: blur(8px); box-shadow: 0 4px 20px rgba(0,0,0,0.6); transition: opacity 0.3s ease;"></div>

          <iframe class="player-iframe" id="player-iframe" style="display: none;" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture"></iframe>

          <div class="player-screen-center" id="player-screen-center">
            <button type="button" class="player-center-play-white" id="player-center-play" aria-label="Play video">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
            <div class="player-screen-info">
              <h4 class="player-screen-title" id="player-screen-title">Cinema Stream</h4>
              </div>
          </div>
        </div>

        <!-- Hidden compatibility container for legacy dropdown queries -->
        <div class="player-dropdowns-container" id="player-dropdowns-container" style="display: none !important;"></div>

        <!-- 3. Title & Meta Details Section -->
        <div class="player-details-info">
          <h2 class="player-modal-title" id="player-modal-title">Cinema Stream</h2>
          <div class="player-modal-meta">
            <span class="player-meta-rating" id="player-meta-rating">★ 8.5/10</span>
            <span class="player-meta-year" id="player-meta-year">2025</span>
            <span class="player-meta-type" id="player-meta-type">Cinema</span>
          </div>
          <p class="player-modal-desc" id="player-modal-desc">Description</p>
        </div>

        <!-- 4. Episodes Section (Dynamic TMDB Episodes Visual Grid matching user screenshot) -->
        <div class="player-episodes-section" id="player-episodes-section" style="display: none;">
          <div class="player-episodes-header">
            <h3 class="player-episodes-heading">Episodes</h3>
            <div class="player-season-dropdown-wrap">
              <select class="player-season-select" id="season-select" aria-label="Select season"></select>
            </div>
            <select class="player-episode-select" id="episode-select" aria-label="Select episode" style="display: none;"></select>
          </div>
          <div class="player-episodes-grid" id="player-episodes-grid">
            <!-- Dynamically populated from TMDB -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event handlers
    const closeBtn = modal.querySelector("#player-modal-close");
    closeBtn.addEventListener("click", closePlayerModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closePlayerModal();
    });

    const serverSelect = modal.querySelector("#player-server-select");
    serverSelect.addEventListener("change", () => {
      serverFailoverAttempts = 0;
      updatePlayerStream(true);
    });

    const reminderClose = modal.querySelector("#player-reminder-close");
    if (reminderClose) {
      reminderClose.addEventListener("click", (e) => {
        e.stopPropagation();
        dismissServerReminder();
      });
    }

    const modalDownloadBtn = modal.querySelector("#player-modal-download-btn");
    if (modalDownloadBtn) {
      modalDownloadBtn.addEventListener("click", () => {
        if (!currentModalItem || !currentModalItem.tmdbId) return;
        const isEpisodic = checkIsEpisodic(currentModalItem);
        const tmdbId = currentModalItem.tmdbId;
        const dlUrl = isEpisodic
          ? `https://vidvault.ru/tv/${tmdbId}/${currentModalSeason || 1}/${currentModalEpisode || 1}`
          : `https://vidvault.ru/movie/${tmdbId}`;
        window.open(dlUrl, "_blank");
      });
    }

    const iframe = modal.querySelector("#player-iframe");
    iframe.addEventListener("error", (e) => {
      console.warn("[Player] Iframe error event detected:", e);
      triggerServerFailover("iframe load error");
    });
    iframe.addEventListener("load", () => {
      if (failoverTimeout) {
        clearTimeout(failoverTimeout);
        failoverTimeout = null;
      }
      if (iframe.src && iframe.src !== "about:blank" && iframe.style.display !== "none") {
        setTimeout(hidePlayerNotification, 1500);
      }
    });

    if (!window._playerFailoverMessageAttached) {
      window._playerFailoverMessageAttached = true;
      window.addEventListener("message", (event) => {
        const pModal = document.getElementById("player-modal") || document.getElementById("cinema-player-modal");
        if (!pModal) return;
        const isBackdropOpen = modal.classList.contains("open");
        if (!isBackdropOpen || !currentModalItem) return;
        try {
          let msg = event.data;
          if (typeof msg === "string") {
            try { msg = JSON.parse(msg); } catch (e) {}
          }
          if (msg && (
            msg.event === "error" ||
            msg.type === "error" ||
            msg.type === "PLAYER_ERROR" ||
            msg.status === "error" ||
            (typeof msg === "string" && (msg.includes("PLAYER_ERROR") || msg.includes("source_error") || msg.includes("Video cannot be played")))
          )) {
            triggerServerFailover("player postMessage error");
          }
        } catch (err) {}
      });
    }

    ensurePlayerDropdowns(modal);

    const centerPlay = modal.querySelector("#player-center-play");
    centerPlay.addEventListener("click", () => {
      if (!currentModalItem) return;
      startPlayback();
    });
  }

  function renderEpisodesToGrid(episodes, seasonNum, episodeSelect) {
    const grid = document.getElementById("player-episodes-grid");
    if (!grid || !Array.isArray(episodes) || !episodes.length) return;

    if (episodeSelect) {
      episodeSelect.innerHTML = episodes.map((e) => {
        return `<option value="${e.ep}">Episode ${e.ep}: ${e.title}</option>`;
      }).join("");
      episodeSelect.disabled = false;
      const validEp = episodes.find((e) => e.ep === currentModalEpisode);
      if (!validEp) {
        currentModalEpisode = episodes[0] ? episodes[0].ep : 1;
      }
      episodeSelect.value = String(currentModalEpisode);
    }

    function formatEpisodeOverview(overview, maxLen = 80) {
      if (!overview) return "Now streaming in high definition.....";
      const clean = overview.replace(/<[^>]*>/g, "").trim();
      if (clean.length <= maxLen) {
        return clean.replace(/[.,;!?]+$/, "") + ".....";
      }
      let truncated = clean.slice(0, maxLen);
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace > 45) {
        truncated = truncated.slice(0, lastSpace);
      }
      return truncated.trimEnd().replace(/[.,;!?]+$/, "") + ".....";
    }

    grid.innerHTML = episodes
      .map((epObj) => {
        const isActive = epObj.ep === currentModalEpisode;
        const shortOverview = formatEpisodeOverview(epObj.overview, 80);
        return `
          <button type="button" class="player-episode-card ${isActive ? "active" : ""}" data-ep="${epObj.ep}" data-title="${epObj.title.replace(/"/g, '&quot;')}" data-overview="${epObj.overview.replace(/"/g, '&quot;')}" aria-label="Episode ${epObj.ep}: ${epObj.title}">
            <div class="episode-badge">E${epObj.ep}</div>
            <div class="episode-info">
              <div class="episode-title" title="${epObj.title}">${epObj.title}</div>
              <div class="episode-meta">${epObj.meta}</div>
              <p class="episode-overview" title="${epObj.overview.replace(/"/g, '&quot;')}">${shortOverview}</p>
            </div>
          </button>
        `;
      })
      .join("");

    grid.querySelectorAll(".player-episode-card").forEach((card) => {
      card.addEventListener("click", () => {
        const ep = parseInt(card.getAttribute("data-ep"), 10) || 1;
        const epTitle = card.getAttribute("data-title");
        const epOverview = card.getAttribute("data-overview");

        currentModalEpisode = ep;
        if (episodeSelect) {
          episodeSelect.value = String(ep);
        }
        grid.querySelectorAll(".player-episode-card").forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        if (epOverview) {
          const descEl = document.getElementById("player-modal-desc");
          if (descEl) {
            descEl.textContent = `S${seasonNum} E${ep} "${epTitle}": ${epOverview}`;
          }
        }

        serverFailoverAttempts = 0;
        updatePlayerStream(true);
      });
    });
  }

  // Dynamic Season Fetcher from TMDB API (/tv/{series_id})
  async function loadDynamicTVSeasons(item) {
    const { seasonSelect, episodeSelect } = ensurePlayerDropdowns();
    const episodesSection = document.getElementById("player-episodes-section");
    if (episodesSection) episodesSection.style.display = "block";

    // Instantly populate season select and 10 episode cards with 0ms delay
    if (seasonSelect) {
      seasonSelect.innerHTML = `<option value="1">Season 1 (10 episodes)</option>`;
      seasonSelect.disabled = false;
    }
    const initialEpisodes = generateFallbackEpisodes(item?.title, currentModalSeason || 1, item?.year);
    renderEpisodesToGrid(initialEpisodes, currentModalSeason || 1, episodeSelect);

    let seriesId = item.tmdbId;
    if (!seriesId || !item._tmdbVerified) {
      seriesId = await resolveTMDBId(item);
      item.tmdbId = seriesId;
    }
    if (!seriesId) return;

    let seasons = [];
    if (tmdbSeriesCache.has(seriesId)) {
      seasons = tmdbSeriesCache.get(seriesId);
    } else {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(`${TMDB_PROXY}?path=tv/${seriesId}`, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.seasons)) {
            // Ignore Specials (Season 0)
            const regularSeasons = data.seasons.filter((s) => s.season_number > 0);
            seasons = regularSeasons.length ? regularSeasons : data.seasons;
          }
          if (data && data.number_of_seasons && (!seasons || !seasons.length)) {
            for (let i = 1; i <= data.number_of_seasons; i++) {
              seasons.push({ season_number: i, name: `Season ${i}`, episode_count: 10 });
            }
          }
          tmdbSeriesCache.set(seriesId, seasons);
        }
      } catch (err) {
        console.warn(`[TMDB] Could not load TV details for series ID ${seriesId}:`, err);
      }
    }

    if (!seasons || !seasons.length) {
      seasons = [{ season_number: 1, name: "Season 1", episode_count: 10 }];
    }

    // Populate #season-select options formatted as: Season {num} ({count} episodes)
    if (seasonSelect) {
      seasonSelect.innerHTML = seasons.map((s) => {
        const epCount = s.episode_count || 10;
        const sName = s.name && !s.name.toLowerCase().includes("season") ? `Season ${s.season_number} - ${s.name}` : (s.name || `Season ${s.season_number}`);
        return `<option value="${s.season_number}">${sName} (${epCount} episodes)</option>`;
      }).join("");
      seasonSelect.disabled = false;

      const firstSeason = seasons.find((s) => s.season_number === currentModalSeason) || seasons[0];
      currentModalSeason = firstSeason ? firstSeason.season_number : 1;
      seasonSelect.value = String(currentModalSeason);
    }

    await fetchAndRenderEpisodes(seriesId, currentModalSeason, item);
  }

  // Dynamic Episode Fetcher from TMDB API (/tv/{series_id}/season/{season_number})
  async function fetchAndRenderEpisodes(seriesId, seasonNum, item) {
    const { episodeSelect } = ensurePlayerDropdowns();

    const cacheKey = `${seriesId}_s${seasonNum}`;
    let episodes = null;

    if (tmdbEpisodeCache.has(cacheKey)) {
      episodes = tmdbEpisodeCache.get(cacheKey);
    } else {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(`${TMDB_PROXY}?path=tv/${seriesId}/season/${seasonNum}`, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.episodes) && data.episodes.length > 0) {
            episodes = data.episodes.map((ep) => {
              const epNum = ep.episode_number;
              const title = ep.name || `Episode ${epNum}`;
              const year = ep.air_date ? ep.air_date.slice(0, 4) : (item?.year || "2023");
              const runtime = ep.runtime ? `${ep.runtime}m` : (item?.duration || "50m");
              const meta = `${year} | ${runtime}`;
              const overview = ep.overview || "Now streaming in high definition on KLM CINEMATICS.";
              return { ep: epNum, title, meta, overview };
            });
            tmdbEpisodeCache.set(cacheKey, episodes);
          }
        }
      } catch (err) {
        console.warn(`[TMDB] Could not load episodes for TV series ${seriesId} Season ${seasonNum}:`, err);
      }
    }

    if (!episodes || !episodes.length) {
      episodes = generateFallbackEpisodes(item?.title, seasonNum, item?.year);
    }

    renderEpisodesToGrid(episodes, seasonNum, episodeSelect);
  }

  let failoverTimeout = null;
  let serverFailoverAttempts = 0;
  const FAILOVER_TIMEOUT_MS = 12000;

  function showPlayerNotification(msg, duration = 3500) {
    const notice = document.getElementById("player-server-notice");
    if (!notice) return;
    notice.textContent = msg;
    notice.style.display = "block";
    notice.style.opacity = "1";
    if (notice._timeout) clearTimeout(notice._timeout);
    notice._timeout = setTimeout(() => {
      notice.style.opacity = "0";
      setTimeout(() => {
        notice.style.display = "none";
      }, 300);
    }, duration);
  }

  function hidePlayerNotification() {
    const notice = document.getElementById("player-server-notice");
    if (notice) {
      notice.style.opacity = "0";
      notice.style.display = "none";
    }
  }

  let reminderPopupTimer = null;

  function triggerServerReminderPopup() {
    const popup = document.getElementById("player-server-reminder-popup");
    if (!popup) return;

    if (reminderPopupTimer) {
      clearTimeout(reminderPopupTimer);
      reminderPopupTimer = null;
    }

    popup.style.display = "block";
    popup.classList.remove("active");

    // Force browser repaint to trigger smooth CSS transition
    requestAnimationFrame(() => {
      popup.classList.add("active");
    });

    // Auto dismiss after duration (5.5 seconds)
    reminderPopupTimer = setTimeout(() => {
      dismissServerReminder();
    }, 5500);
  }

  function dismissServerReminder() {
    const popup = document.getElementById("player-server-reminder-popup");
    if (!popup) return;
    if (reminderPopupTimer) {
      clearTimeout(reminderPopupTimer);
      reminderPopupTimer = null;
    }
    popup.classList.remove("active");
    setTimeout(() => {
      if (!popup.classList.contains("active")) {
        popup.style.display = "none";
      }
    }, 420);
  }

  function triggerServerFailover(reason) {
    if (failoverTimeout) {
      clearTimeout(failoverTimeout);
      failoverTimeout = null;
    }

    const modal = document.getElementById("cinema-player-modal");
    if (!currentModalItem || !modal || !modal.classList.contains("open")) {
      return;
    }

    const activeServers = getActiveServers(currentModalItem);
    if (serverFailoverAttempts >= activeServers.length - 1) {
      console.warn("[Player] All servers attempted. Stopping failover loop.");
      showPlayerNotification("Unable to load video on available servers. Please try another title.");
      return;
    }

    serverFailoverAttempts++;
    const serverSelect = document.getElementById("player-server-select");
    const currentId = serverSelect?.value || activeServers[0].id;
    let currentIndex = activeServers.findIndex((s) => s.id === currentId);
    if (currentIndex === -1) currentIndex = 0;

    const prevServer = activeServers[currentIndex];
    const nextIndex = (currentIndex + 1) % activeServers.length;
    const nextServer = activeServers[nextIndex];

    console.log(`[Player] ${prevServer.label} failed (${reason}). Auto-switching to ${nextServer.label}...`);
    showPlayerNotification(`${prevServer.label} unavailable. Switching to ${nextServer.label}...`);

    if (serverSelect) {
      serverSelect.value = nextServer.id;
    }

    executeStreamLoad(false);
  }

  function executeStreamLoad(resetFailoverAttempts = true) {
    if (resetFailoverAttempts) {
      serverFailoverAttempts = 0;
    }

    if (failoverTimeout) {
      clearTimeout(failoverTimeout);
      failoverTimeout = null;
    }

    const iframe = document.getElementById("player-iframe");
    const screenCenter = document.getElementById("player-screen-center");
    const overlay = document.querySelector(".player-screen-overlay");
    const backdrop = document.getElementById("player-backdrop");
    if (!iframe || !currentModalItem) return;

    const activeServers = getActiveServers(currentModalItem);
    const serverSelect = document.getElementById("player-server-select");
    const serverId = serverSelect?.value || activeServers[0].id;
    const server = activeServers.find((s) => s.id === serverId) || activeServers[0];
    const isEpisodic = checkIsEpisodic(currentModalItem);
    const isAnimeOrCartoon = checkIsAnimeOrCartoon(currentModalItem);
    let tmdbId = currentModalItem.tmdbId;

    // If tmdbId is still missing, apply a safe fallback and warn — never block playback
    if (!tmdbId || isNaN(Number(tmdbId)) || Number(tmdbId) <= 0) {
      tmdbId = isEpisodic ? 1399 : 157336; // Game of Thrones / Interstellar as placeholders
      currentModalItem.tmdbId = tmdbId;
      console.warn("[Player] TMDB ID missing — using fallback:", tmdbId, currentModalItem);
    }

    let streamUrl = "";
    if (isAnimeOrCartoon) {
      if (isEpisodic && typeof server.anime === "function") {
        streamUrl = server.anime(tmdbId, currentModalSeason || 1, currentModalEpisode || 1, currentModalItem);
      } else if (typeof server.animeMovie === "function") {
        streamUrl = server.animeMovie(tmdbId, currentModalItem);
      } else if (isEpisodic && typeof server.tv === "function") {
        streamUrl = server.tv(tmdbId, currentModalSeason || 1, currentModalEpisode || 1, currentModalItem);
      } else if (typeof server.movie === "function") {
        streamUrl = server.movie(tmdbId, currentModalItem);
      }
    } else if (isEpisodic) {
      if (typeof server.tv === "function") {
        streamUrl = server.tv(tmdbId, currentModalSeason || 1, currentModalEpisode || 1, currentModalItem);
      }
    } else if (typeof server.movie === "function") {
      streamUrl = server.movie(tmdbId, currentModalItem);
    }

    // Safety fallback: ensure streamUrl is never empty
    if (!streamUrl) {
      streamUrl = isEpisodic
        ? (isAnimeOrCartoon ? `https://player.videasy.net/tv/${tmdbId}/${currentModalSeason || 1}/${currentModalEpisode || 1}` : `https://vidrock.ru/tv/${tmdbId}/${currentModalSeason || 1}/${currentModalEpisode || 1}`)
        : `https://vsembed.ru/embed/movie/${tmdbId}`;
    }

    // Set timeout to detect server failure / hanging
    failoverTimeout = setTimeout(() => {
      triggerServerFailover("unresponsive / loading timeout");
    }, FAILOVER_TIMEOUT_MS);

    if (streamUrl && iframe.src !== streamUrl) {
      iframe.src = streamUrl;
    }
    iframe.style.display = "block";
    if (screenCenter) screenCenter.style.display = "none";
    if (overlay) overlay.style.display = "none";
    if (backdrop) backdrop.style.display = "none";
  }

  function startPlayback() {
    executeStreamLoad(true);
  }

  function updatePlayerStream(resetFailover = true) {
    executeStreamLoad(resetFailover);
  }

  async function openPlayerModal(item) {
    createPlayerModal();
    const modal = document.getElementById("player-modal") || document.getElementById("cinema-player-modal");
    const backdrop = document.getElementById("player-backdrop");
    const iframe = document.getElementById("player-iframe");
    const screenCenter = document.getElementById("player-screen-center");
    const screenTitle = document.getElementById("player-screen-title");
    const modalTitle = document.getElementById("player-modal-title");
    const modalDesc = document.getElementById("player-modal-desc");
    const metaRating = document.getElementById("player-meta-rating");
    const metaYear = document.getElementById("player-meta-year");
    const metaType = document.getElementById("player-meta-type");
    const episodesSection = document.getElementById("player-episodes-section");
    const { container: dropdownContainer } = ensurePlayerDropdowns(modal);

    currentModalItem = item;
    currentModalSeason = 1;
    currentModalEpisode = 1;
    serverFailoverAttempts = 0;
    hidePlayerNotification();

    // Reset iframe on open
    if (iframe) {
      iframe.src = "about:blank";
      iframe.style.display = "none";
    }

    // Clean center play button state (ready to click, never disabled or stuck in wait)
    const centerPlay = modal ? modal.querySelector("#player-center-play") : null;
    if (centerPlay) {
      centerPlay.disabled = false;
      centerPlay.style.opacity = "";
      centerPlay.style.cursor = "pointer";
      centerPlay.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }

    const backdropModal = document.getElementById("cinema-player-modal") || modal;
    const overlay = backdropModal.querySelector(".player-screen-overlay");
    if (overlay) overlay.style.display = "block";
    if (backdrop) backdrop.style.display = "block";

    const title = (typeof item.title === "object" ? (item.title?.english || item.title?.romaji) : item.title) || "Cinema Title";
    const year = (item.startDate?.year ? String(item.startDate.year) : null) || item.year || "2025";
    const rating = item.rating || (item.averageScore ? (item.averageScore / 10).toFixed(1) : "8.5");
    const isAnime = checkIsAnime(item) || item.category === "anime" || item.type === "Anime";
    const isEpisodic = checkIsEpisodic(item);

    // Backdrop
    if (backdrop) {
      backdrop.className = `simulated-backdrop ${item.posterClass || "poster-1"}`;
      if (item.backdropUrl) {
        backdrop.style.backgroundImage = `url('${item.backdropUrl}')`;
        backdrop.style.backgroundSize = "cover";
        backdrop.style.backgroundPosition = "center";
      } else {
        backdrop.style.backgroundImage = "";
      }
    }

    // Screen info
    if (screenTitle) screenTitle.textContent = title;
    if (modalTitle) modalTitle.textContent = title;
    if (metaRating) metaRating.textContent = `★ ${String(rating).includes("/") ? rating : rating + "/10"}`;
    if (metaYear) metaYear.textContent = year;
    if (modalDesc) {
      modalDesc.textContent = (item.description ? item.description.replace(/<[^>]*>/g, "") : null) || item.desc || "Now streaming in ultra-high fidelity with Dolby Atmos spatial sound.";
    }

    // Update meta type label immediately
    if (metaType) {
      if (isAnime) {
        metaType.textContent = isEpisodic ? "Anime Series" : "Anime Movie";
      } else if (isEpisodic) {
        metaType.textContent = "TV Series";
      } else {
        metaType.textContent = "Movie";
      }
    }

    // Show/hide episode dropdowns & episode grid section immediately
    if (isEpisodic) {
      if (dropdownContainer) dropdownContainer.style.display = "flex";
      if (episodesSection) episodesSection.style.display = "block";
    } else {
      if (dropdownContainer) dropdownContainer.style.display = "none";
      if (episodesSection) episodesSection.style.display = "none";
    }

    backdropModal.classList.add("open");
    backdropModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Dynamically synchronize server dropdown options for item category (Anime: 3 servers; Movies & TV: 7 servers)
    const serverSelect = document.getElementById("player-server-select");
    if (serverSelect) {
      const activeServers = getActiveServers(item);
      serverSelect.innerHTML = activeServers
        .map((s) => `<option value="${s.id}">${s.label}</option>`)
        .join("");
      serverSelect.value = activeServers[0].id;
    }

    triggerServerReminderPopup();

    const modalBox = modal.classList.contains("player-modal-box") ? modal : modal.querySelector(".player-modal-box");
    if (modalBox) {
      modalBox.scrollTop = 0;
    }

    lastFocusedElementBeforeModal = document.activeElement;

    // Check if numeric TMDB ID is already present
    const hasNumericId = item.tmdbId && !isNaN(parseInt(item.tmdbId, 10)) && Number(item.tmdbId) > 0;

    if (hasNumericId) {
      item.tmdbId = Number(item.tmdbId);
      item._tmdbVerified = true;
      if (!item.mediaType) {
        item.mediaType = (item.isMovie === true || item.category === "movies") ? "movie" : (isEpisodic ? "tv" : "movie");
      }
      if (isEpisodic) loadDynamicTVSeasons(item);
      // Start video playback immediately
      startPlayback();
    } else {
      // Safe placeholder fallback so video starts playing immediately with zero hang/wait
      const fallbackId = isEpisodic ? 1399 : 157336;
      item.tmdbId = fallbackId;
      if (!item.mediaType) {
        item.mediaType = isEpisodic ? "tv" : "movie";
      }
      if (isEpisodic) loadDynamicTVSeasons(item);
      // Start video playback immediately
      startPlayback();

      // Resolve true TMDB ID in background asynchronously without blocking playback
      (async () => {
        try {
          let resolvedId = null;
          if (isAnime) {
            const res = await getTmdbIdForAnime(item);
            if (res && res.tmdbId) {
              resolvedId = res.tmdbId;
              item.mediaType = res.mediaType;
              item.isMovie = res.isMovie;
            }
          } else {
            resolvedId = await resolveTMDBId(item);
          }
          if (resolvedId && Number(resolvedId) !== fallbackId && currentModalItem === item) {
            item.tmdbId = Number(resolvedId);
            item._tmdbVerified = true;
            updatePlayerStream(false);
            if (isEpisodic) loadDynamicTVSeasons(item);
          }
        } catch (err) {
          console.warn("[Player] Background TMDB ID resolution:", err);
        }
      })();
    }
  }

  function closePlayerModal() {
    const modal = document.getElementById("cinema-player-modal");
    if (!modal) return;
    if (failoverTimeout) {
      clearTimeout(failoverTimeout);
      failoverTimeout = null;
    }
    serverFailoverAttempts = 0;
    hidePlayerNotification();
    dismissServerReminder();

    const iframe = document.getElementById("player-iframe");
    if (iframe) {
      iframe.src = "";
      iframe.style.display = "none";
    }
    const overlay = modal.querySelector(".player-screen-overlay");
    const backdrop = document.getElementById("player-backdrop");
    const screenCenter = document.getElementById("player-screen-center");
    if (overlay) overlay.style.display = "block";
    if (backdrop) backdrop.style.display = "block";
    if (screenCenter) screenCenter.style.display = "flex";

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Smart TV / Remote: restore focus to the card that opened the modal
    if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === "function") {
      try {
        lastFocusedElementBeforeModal.focus();
      } catch (e) {}
    }
  }

  // ==========================================================
  // Render Dedicated Sub-Page HTML Layout
  // Completely removes .genre-filter-bar;
  // Standardizes .rail-card to mirror home page .cinema-card.
  // ==========================================================
  function getHomeMain() {
    return document.getElementById("home-main") || document.querySelector("body > main:not(#search-modal *):not(.search-results-area):not(#subpage-view)");
  }

  function toggleSubpageHeroWatchlist(categoryKey) {
    const heroBtn = document.getElementById("hero-watchlist-btn");
    if (!heroBtn) return false;
    const cat = SUBPAGE_DATA[categoryKey] || {};
    const activeSlide = (subpageHeroSlides && subpageHeroSlides.length && subpageHeroSlides[subpageHeroIndex]) ? subpageHeroSlides[subpageHeroIndex] : null;
    const domTitle = document.querySelector(".subpage-hero-title")?.textContent.trim();
    const slideTitle = activeSlide ? (activeSlide.title?.english || activeSlide.title?.romaji || activeSlide.title?.native || activeSlide.title || activeSlide.name) : null;
    const title = domTitle || slideTitle || cat?.hero?.title || "Spotlight";
    const tmdbId = activeSlide?.id || activeSlide?.tmdbId || cat?.hero?.tmdbId;
    const isMovie = activeSlide ? (activeSlide.format === "MOVIE" || activeSlide.isMovie === true || activeSlide.type === "Movie") : (cat?.id === "movies");
    const backdropUrl = activeSlide?.bannerImage || (activeSlide?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${activeSlide.backdrop_path}` : cat?.hero?.backdropUrl || "");
    const posterUrl = activeSlide?.coverImage?.extraLarge || (activeSlide?.poster_path ? `https://image.tmdb.org/t/p/w500${activeSlide.poster_path}` : cat?.hero?.posterUrl || "");
    const rating = activeSlide?.averageScore ? (activeSlide.averageScore / 10).toFixed(1) : (activeSlide?.vote_average ? activeSlide.vote_average.toFixed(1) : (cat?.hero?.rating || "8.5"));

    const heroItem = {
      id: tmdbId || title,
      tmdbId: tmdbId && !isNaN(parseInt(tmdbId, 10)) ? parseInt(tmdbId, 10) : undefined,
      title: title,
      rawTitle: title,
      posterUrl: posterUrl,
      backdropUrl: backdropUrl,
      mediaType: cat?.id === "movies" ? "movie" : (cat?.id === "tv-shows" ? "tv" : (isMovie ? "movie" : "tv")),
      isMovie: isMovie,
      rating: rating,
      year: cat?.hero?.year || "2026",
      genres: cat?.hero?.badge || "Featured",
      overview: activeSlide?.overview || cat?.hero?.description || "",
      badge: "SAVED"
    };

    let isNowIn = false;
    if (window.KLMWatchlist && typeof window.KLMWatchlist.toggleWatchlist === "function") {
      const res = window.KLMWatchlist.toggleWatchlist(heroItem);
      isNowIn = Boolean(res === true || res?.action === "added" || res?.added === true || (window.KLMWatchlist.isInWatchlist && window.KLMWatchlist.isInWatchlist(title)));
    } else {
      if (watchlistItems.has(title)) {
        watchlistItems.delete(title);
        isNowIn = false;
      } else {
        watchlistItems.add(title);
        isNowIn = true;
      }
      saveWatchlist();
    }

    heroBtn.classList.toggle("in-watchlist", isNowIn);
    heroBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${isNowIn ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
      </svg>
      ${isNowIn ? "In Watchlist" : "Add to Watchlist"}
    `;
    return isNowIn;
  }

  function renderSubpage(categoryKey) {
    const cat = SUBPAGE_DATA[categoryKey];
    if (!cat) return;

    let subpageContainer = document.getElementById("subpage-view");
    if (!subpageContainer) {
      subpageContainer = document.createElement("main");
      subpageContainer.id = "subpage-view";
      subpageContainer.className = "subpage-container";
      const mainEl = getHomeMain();
      if (mainEl) {
        mainEl.parentNode.insertBefore(subpageContainer, mainEl.nextSibling);
      } else {
        document.body.appendChild(subpageContainer);
      }
    }

    const isHeroInWatchlist = isItemInWatchlist(cat.hero.tmdbId || cat.hero.title);

    // Build Rails HTML
    const railsHTML = cat.rails
      .map((rail, railIdx) => {
        const cardsHTML = rail.items
          .map((card) => {
            const inWatchlist = isItemInWatchlist(card.tmdbId || card.title);
            const isMovieAttr = cat.id === "movies" ? "true" : (card.isMovie ? "true" : "false");
            const overviewAttr = (card.desc || card.description || "Now streaming on KLM CINEMATICS.").replace(/"/g, "&quot;");
            return `
            <article class="rail-card cinema-card" data-tmdb-id="${card.tmdbId || ''}" data-title="${card.title}" data-genres="${card.genres}" data-year="${card.year || '2025'}" data-is-movie="${isMovieAttr}" data-overview="${overviewAttr}" tabindex="0" role="button" aria-label="${card.title}">
              <div class="card-poster rail-card-media ${card.posterClass}">
                <span class="card-badge">${card.quality || "4K UHD"}</span>
                <span class="card-rating">⭐ ${card.rating}</span>
              </div>
              <div class="card-details rail-card-body">
                <h3 class="card-title rail-card-title">${card.title}</h3>
                <p class="card-genre">${card.genres}</p>
                <div class="rail-card-meta">
                  <span class="card-age">${card.age}</span>
                  <span>${card.duration}</span>
                </div>
                <div class="rail-card-actions">
                  <div class="card-action-group">
                    <button type="button" class="card-action-btn play-btn" data-action="play" aria-label="Play ${card.title}">
                      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                    <button type="button" class="card-action-btn watchlist-btn ${inWatchlist ? "active" : ""}" data-action="watchlist" aria-label="Watchlist toggle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        ${inWatchlist ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
                      </svg>
                    </button>
                  </div>
                  <button type="button" class="card-action-btn download-btn" data-action="download" aria-label="Download ${card.title}" title="Download ${card.title}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </button>
                </div>
              </div>
            </article>
          `;
          })
          .join("");

        return `
        <section class="media-rail-section" id="rail-${railIdx}">
          <div class="rail-header">
            <div class="rail-title-group">
              <h3 class="rail-title">${rail.title}</h3>
            </div>
          </div>
          <div class="rail-carousel-container">
            <button type="button" class="rail-nav-btn prev" disabled aria-label="Scroll left in ${rail.title}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="rail-track">
              ${cardsHTML}
            </div>
            <button type="button" class="rail-nav-btn next" aria-label="Scroll right in ${rail.title}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>
      `;
      })
      .join("");

    subpageContainer.innerHTML = `
      <!-- Hero Spotlight Banner -->
      <header class="subpage-hero">
        <div class="subpage-hero-backdrop ${cat.hero.backdropClass}"></div>
        <div class="subpage-hero-overlay"></div>
        <div class="subpage-hero-content">
          <div class="subpage-hero-badges">
            <span class="spotlight-category-badge">${cat.hero.badge}</span>
            <span class="spotlight-rank-badge">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${cat.hero.rank}
            </span>
          </div>
          <h1 class="subpage-hero-title">${cat.hero.title}</h1>
          <div class="subpage-hero-meta">
            <span class="meta-rating">⭐ ${cat.hero.rating}</span>
            <span class="meta-year">${cat.hero.year}</span>
            <span class="meta-badge">${cat.hero.quality}</span>
            <span class="meta-badge">${cat.hero.audio}</span>
            <span class="meta-badge badge-red">${cat.hero.age}</span>
            <span>${cat.hero.duration}</span>
          </div>
          <p class="subpage-hero-desc">${cat.hero.description}</p>
          <div class="subpage-hero-actions">
            <button type="button" class="btn btn-spotlight-play" id="hero-play-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Play Now
            </button>
            <button type="button" class="btn btn-secondary btn-spotlight-watchlist ${isHeroInWatchlist ? "in-watchlist" : ""}" id="hero-watchlist-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${isHeroInWatchlist ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
              </svg>
              ${isHeroInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>

        <!-- Hero Carousel Controls (Centered, matching home page) -->
        <div class="hero-carousel-controls" aria-label="Hero carousel controls">
          <!-- Prev button -->
          <button type="button" class="hero-prev-btn" id="subpage-hero-prev-btn" aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Dot indicators -->
          <div class="hero-indicators subpage-hero-indicators" role="tablist" aria-label="Slide indicators"></div>

          <!-- Next button -->
          <button type="button" class="hero-next-btn" id="subpage-hero-next-btn" aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </header>

      <!-- Categorized Horizontal Media Rails -->
      <main class="subpage-content-rails">
        ${railsHTML}
      </main>
    `;

    bindSubpageEvents(subpageContainer, cat);

    // Apply active filter if one was already set
    if (activeGenreFilter && activeGenreFilter !== "All") {
      filterSubpageByGenre(activeGenreFilter);
    } else {
      // Trigger dynamic TMDB daily hero carousel & weekly trending cards
      initSubpageTMDB(categoryKey);
    }
  }

  // ==========================================================
  // Event Binding for Sub-Page Interactions
  // ==========================================================
  function bindSubpageEvents(container, cat) {
    // 1. Hero Action Buttons
    const heroPlay = container.querySelector("#hero-play-btn");
    if (heroPlay) {
      heroPlay.addEventListener("click", () => {
        const activeSlide = subpageHeroSlides[subpageHeroIndex];
        const isAnime = cat.id === "anime";
        const slideId = activeSlide && activeSlide.id && !isNaN(parseInt(activeSlide.id, 10)) ? Number(activeSlide.id) : undefined;
        const isMovieHero = cat.id === "movies" || activeSlide?.format === "MOVIE" || Boolean(activeSlide?.title && !activeSlide?.name);
        const heroItem = {
          tmdbId: !isAnime ? slideId : undefined,
          _tmdbVerified: !isAnime && Boolean(slideId),
          title: activeSlide?.title ? (typeof activeSlide.title === "object" ? (activeSlide.title.english || activeSlide.title.romaji) : activeSlide.title) : (activeSlide?.name || cat.hero.title),
          rawTitle: activeSlide?.title,
          format: activeSlide?.format,
          isMovie: isMovieHero,
          mediaType: cat.id === "movies" ? "movie" : (cat.id === "tv-shows" ? "tv" : (isMovieHero ? "movie" : "tv")),
          description: activeSlide?.description || activeSlide?.overview || cat.hero.description,
          posterClass: cat.hero.backdropClass,
          category: cat.id,
          type: cat.name,
          rating: cat.hero.rating,
          year: cat.hero.year,
          duration: cat.hero.duration,
          backdropUrl: activeSlide?.bannerImage || activeSlide?.coverImage?.extraLarge || (activeSlide?.backdrop_path ? `${TMDB_BACKDROP_LG}${activeSlide.backdrop_path}` : "")
        };
        openPlayerModal(heroItem);
      });
    }

    // 1. Hero Watchlist Toggle
    const heroWatchlist = container.querySelector("#hero-watchlist-btn");
    if (heroWatchlist) {
      heroWatchlist.onclick = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggleSubpageHeroWatchlist(cat.id);
      };
    }

    // 2. Rail Horizontal Carousel Smooth Scroll & Arrow Triggers
    initRailScrollArrows(container);

    // 4. Card Action Delegation (Play, Watchlist, Info)
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".rail-card");
      const actionBtn = e.target.closest(".card-action-btn");

      if (actionBtn && card) {
        e.stopPropagation();
        const action = actionBtn.getAttribute("data-action");
        const title = card.getAttribute("data-title");

        if (action === "play" || action === "info") {
          let foundItem = null;
          if (activeFilteredItems && activeFilteredItems.length > 0) {
            const cardIdStr = card ? card.getAttribute("data-tmdb-id") : null;
            const match = activeFilteredItems.find((i) => (cardIdStr && String(i.tmdbId) === cardIdStr) || i.title === title);
            if (match) {
              foundItem = Object.assign({}, match, { category: cat.id, type: cat.name });
            }
          }
          if (!foundItem) {
            for (const r of cat.rails) {
              const match = r.items.find((i) => i.title === title);
              if (match) {
                foundItem = Object.assign({}, match, { category: cat.id, type: cat.name });
                break;
              }
            }
          }
          if (!foundItem && card) {
            foundItem = {
              title: title,
              category: cat.id,
              type: cat.name,
              genres: card.getAttribute("data-genres") || "",
              year: card.getAttribute("data-year") || "2025",
              rating: card.querySelector(".card-rating")?.textContent.replace("⭐", "").trim() || "8.5",
              duration: "Season 1",
              description: card.getAttribute("data-overview") || "Now streaming on KLM CINEMATICS.",
              backdropUrl: card.querySelector(".card-poster")?.style.backgroundImage ? card.querySelector(".card-poster").style.backgroundImage.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "") : ""
            };
          }
          if (foundItem) {
            const isAnime = cat.id === "anime" || checkIsAnime(foundItem);
            const cardIdAttr = card ? card.getAttribute("data-tmdb-id") : null;
            const parsedCardId = cardIdAttr && !isNaN(parseInt(cardIdAttr, 10)) && Number(cardIdAttr) > 0 ? Number(cardIdAttr) : null;
            const cardIsMovieAttr = card ? card.getAttribute("data-is-movie") : null;
            if (cardIsMovieAttr !== null) {
              foundItem.isMovie = cardIsMovieAttr === "true";
              foundItem.mediaType = cardIsMovieAttr === "true" ? "movie" : "tv";
            } else if (cat.id === "movies") {
              foundItem.isMovie = true;
              foundItem.mediaType = "movie";
            } else if (cat.id === "tv-shows") {
              foundItem.isMovie = false;
              foundItem.mediaType = "tv";
            }

            if (isAnime) {
              // Preserve the TMDB numeric ID — anime cards now come from TMDB Discover
              const numericTmdbId = parsedCardId || (foundItem.tmdbId && !isNaN(parseInt(foundItem.tmdbId, 10)) && Number(foundItem.tmdbId) > 0 ? Number(foundItem.tmdbId) : null);
              foundItem.tmdbId = numericTmdbId;
              foundItem._tmdbVerified = Boolean(numericTmdbId);
              foundItem.category = "anime";
              foundItem.type = "Anime";
              // Default to TV series for anime (TMDB Discover only returns tv results for genre 16)
              if (!foundItem.mediaType) foundItem.mediaType = "tv";
              if (foundItem.isMovie === undefined) foundItem.isMovie = false;
            } else {
              const numericTmdbId = parsedCardId || (typeof foundItem.tmdbId === "number" && foundItem.tmdbId > 0 ? foundItem.tmdbId : null);
              foundItem.tmdbId = numericTmdbId;
              foundItem._tmdbVerified = Boolean(numericTmdbId);
            }
            openPlayerModal(foundItem);
          }
        } else if (action === "download") {
          const rawId = card ? card.getAttribute("data-tmdb-id") : null;
          const isMovieCard = card && card.getAttribute("data-is-movie") === "true";
          const isEpisodic = cat?.id === "movies" ? false : (isMovieCard ? false : true);
          if (rawId && !isNaN(parseInt(rawId, 10))) {
            const tmdbId = parseInt(rawId, 10);
            const downloadUrl = isEpisodic
              ? `https://vidvault.ru/tv/${tmdbId}/1/1`
              : `https://vidvault.ru/movie/${tmdbId}`;
            window.open(downloadUrl, "_blank");
          } else {
            const newTab = window.open("about:blank", "_blank");
            resolveTMDBId({ title: title, type: cat?.name, category: cat?.id, isMovie: isMovieCard }).then((resolvedId) => {
              if (resolvedId) {
                const downloadUrl = isEpisodic
                  ? `https://vidvault.ru/tv/${resolvedId}/1/1`
                  : `https://vidvault.ru/movie/${resolvedId}`;
                if (newTab) newTab.location.href = downloadUrl;
              }
            }).catch(() => {});
          }
        } else if (action === "watchlist") {
          const cardId = card ? card.getAttribute("data-tmdb-id") : null;
          const isMovieCard = card && card.getAttribute("data-is-movie") === "true";
          const genresAttr = card ? card.getAttribute("data-genres") : "";
          const yearAttr = card ? card.getAttribute("data-year") : "";
          const overviewAttr = card ? card.getAttribute("data-overview") : "";
          const posterStyle = card ? card.querySelector(".card-poster")?.getAttribute("style") || "" : "";
          let extractedPosterUrl = "";
          const bgMatch = posterStyle.match(/url\(['"]?(.*?)['"]?\)/);
          if (bgMatch && bgMatch[1]) extractedPosterUrl = bgMatch[1];
          const ratingText = card ? card.querySelector(".card-rating")?.textContent.replace("⭐", "").trim() : "8.2";

          const itemObj = {
            id: cardId ? parseInt(cardId, 10) : (card ? card.getAttribute("data-title") : title),
            tmdbId: cardId && !isNaN(parseInt(cardId, 10)) ? parseInt(cardId, 10) : undefined,
            title: title,
            posterUrl: extractedPosterUrl,
            mediaType: cat?.id === "movies" ? "movie" : (cat?.id === "tv-shows" ? "tv" : (isMovieCard ? "movie" : "tv")),
            isMovie: isMovieCard,
            rating: ratingText,
            year: yearAttr || "2026",
            genres: genresAttr || "",
            overview: overviewAttr || "",
            badge: "SAVED"
          };

          let isNowIn = false;
          if (window.KLMWatchlist && typeof window.KLMWatchlist.toggleWatchlist === "function") {
            const res = window.KLMWatchlist.toggleWatchlist(itemObj);
            isNowIn = Boolean(res === true || res?.action === "added" || res?.added === true || (window.KLMWatchlist.isInWatchlist && window.KLMWatchlist.isInWatchlist(itemObj.tmdbId || title)));
          } else {
            if (watchlistItems.has(title)) {
              watchlistItems.delete(title);
              isNowIn = false;
            } else {
              watchlistItems.add(title);
              isNowIn = true;
            }
            saveWatchlist();
          }

          actionBtn.classList.toggle("active", isNowIn);
          actionBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              ${isNowIn ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
            </svg>
          `;
        }
        return;
      }

      // If card itself was clicked (outside action buttons)
      if (card && !actionBtn) {
        const title = card.getAttribute("data-title");
        let foundItem = null;
        if (activeFilteredItems && activeFilteredItems.length > 0) {
          const cardIdStr = card ? card.getAttribute("data-tmdb-id") : null;
          const match = activeFilteredItems.find((i) => (cardIdStr && String(i.tmdbId) === cardIdStr) || i.title === title);
          if (match) {
            foundItem = Object.assign({}, match, { category: cat.id, type: cat.name });
          }
        }
        if (!foundItem) {
          for (const r of cat.rails) {
            const match = r.items.find((i) => i.title === title);
            if (match) {
              foundItem = Object.assign({}, match, { category: cat.id, type: cat.name });
              break;
            }
          }
        }
        if (!foundItem && card) {
          foundItem = {
            title: title,
            category: cat.id,
            type: cat.name,
            genres: card.getAttribute("data-genres") || "",
            year: card.getAttribute("data-year") || "2025",
            rating: card.querySelector(".card-rating")?.textContent.replace("⭐", "").trim() || "8.5",
            duration: "Season 1",
            description: card.getAttribute("data-overview") || "Now streaming on KLM CINEMATICS.",
            backdropUrl: card.querySelector(".card-poster")?.style.backgroundImage ? card.querySelector(".card-poster").style.backgroundImage.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "") : ""
          };
        }
        if (foundItem) {
          const isAnime = cat.id === "anime" || checkIsAnime(foundItem);
          const cardIdAttr = card ? card.getAttribute("data-tmdb-id") : null;
          const parsedCardId = cardIdAttr && !isNaN(parseInt(cardIdAttr, 10)) && Number(cardIdAttr) > 0 ? Number(cardIdAttr) : null;
          const cardIsMovieAttr = card ? card.getAttribute("data-is-movie") : null;
          if (cardIsMovieAttr !== null) {
            foundItem.isMovie = cardIsMovieAttr === "true";
            foundItem.mediaType = cardIsMovieAttr === "true" ? "movie" : "tv";
          } else if (cat.id === "movies") {
            foundItem.isMovie = true;
            foundItem.mediaType = "movie";
          } else if (cat.id === "tv-shows") {
            foundItem.isMovie = false;
            foundItem.mediaType = "tv";
          }

          if (isAnime) {
            const numericTmdbId = parsedCardId || (foundItem.tmdbId && !isNaN(parseInt(foundItem.tmdbId, 10)) && Number(foundItem.tmdbId) > 0 ? Number(foundItem.tmdbId) : null);
            foundItem.tmdbId = numericTmdbId;
            foundItem._tmdbVerified = Boolean(numericTmdbId);
            foundItem.category = "anime";
            foundItem.type = "Anime";
            if (!foundItem.mediaType) foundItem.mediaType = "tv";
            if (foundItem.isMovie === undefined) foundItem.isMovie = false;
          } else {
            const numericTmdbId = parsedCardId || (typeof foundItem.tmdbId === "number" && foundItem.tmdbId > 0 ? foundItem.tmdbId : null);
            foundItem.tmdbId = numericTmdbId;
            foundItem._tmdbVerified = Boolean(numericTmdbId);
          }
          openPlayerModal(foundItem);
        }
      }
    });
  }

  // ==========================================================
  // Rail Horizontal Carousel Smooth Scroll & Arrow Controls
  // ==========================================================
  function initRailScrollArrows(container) {
    if (!container) return;
    const rails = container.querySelectorAll(".media-rail-section");
    rails.forEach((rail) => {
      const track = rail.querySelector(".rail-track");
      const prevBtn = rail.querySelector(".rail-nav-btn.prev");
      const nextBtn = rail.querySelector(".rail-nav-btn.next");
      if (!track || !prevBtn || !nextBtn) return;

      const updateBtns = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = track.scrollLeft <= 8;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 8;
      };

      prevBtn.onclick = (e) => {
        e.stopPropagation();
        track.scrollBy({ left: -Math.max(track.clientWidth * 0.75, 280), behavior: "smooth" });
      };

      nextBtn.onclick = (e) => {
        e.stopPropagation();
        track.scrollBy({ left: Math.max(track.clientWidth * 0.75, 280), behavior: "smooth" });
      };

      track.onscroll = () => updateBtns();
      updateBtns();
      setTimeout(updateBtns, 200);
      setTimeout(updateBtns, 600);
    });
  }

  function getSubpageCategoryKey() {
    if (currentCategory && SUBPAGE_DATA[currentCategory]) {
      return currentCategory;
    }
    const path = (window.location.pathname || "").toLowerCase();
    if (path.includes("anime") || path.includes("cartoon")) return "anime";
    if (path.includes("tv") || path.includes("show")) return "tv-shows";
    if (path.includes("movie")) return "movies";
    const hash = (window.location.hash || "").toLowerCase();
    if (hash.includes("anime") || hash.includes("cartoon")) return "anime";
    if (hash.includes("tv") || hash.includes("show")) return "tv-shows";
    if (hash.includes("movie")) return "movies";
    return "movies";
  }

  // TMDB Discover Genre Parameter Mapping for Subpages
  const GENRE_TMDB_MAP = {
    movies: {
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Fantasy: 14,
      "Sci-Fi": 878,
      Horror: 27,
      Thriller: 53
    },
    "tv-shows": {
      Action: 10759,
      Adventure: 10759,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Fantasy: 10765,
      "Sci-Fi": 10765,
      Horror: "9648,10765",
      Thriller: "9648,80"
    },
    anime: {
      Action: "16,10759",
      Adventure: "16,10759",
      Animation: "16",
      Comedy: "16,35",
      Crime: "16,80",
      Documentary: "16,99",
      Drama: "16,18",
      Fantasy: "16,10765",
      "Sci-Fi": "16,10765",
      Horror: "16,9648",
      Thriller: "16,9648"
    }
  };

  // Reusable card markup generator ensuring uniform attributes, rating, and badge styling
  function buildSubpageCardHTML(card) {
    const inWatchlist = isItemInWatchlist(card.tmdbId || card.title);
    const bgStyle = card.backdropUrl ? `style="background-image: url('${card.backdropUrl}'); background-size: cover; background-position: center;"` : "";
    const safeDesc = (card.desc || card.description || "").replace(/"/g, "&quot;");
    return `
      <article class="rail-card cinema-card" data-tmdb-id="${card.tmdbId || ""}" data-title="${card.title}" data-genres="${card.genres || ""}" data-year="${card.year || "2026"}" data-is-movie="${card.isMovie ? "true" : "false"}" data-overview="${safeDesc}" tabindex="0" role="button" aria-label="${card.title}">
        <div class="card-poster rail-card-media ${card.posterClass || ""}" ${bgStyle}>
          <span class="card-badge">${card.quality || "4K UHD"}</span>
          <span class="card-rating">⭐ ${card.rating || "8.2"}</span>
        </div>
        <div class="card-details rail-card-body">
          <h3 class="card-title rail-card-title">${card.title}</h3>
          <p class="card-genre">${card.genres || ""}</p>
          <div class="rail-card-meta">
            <span class="card-age">${card.age || "14+"}</span>
            <span>${card.year || "2026"}</span>
          </div>
          <div class="rail-card-actions">
            <div class="card-action-group">
              <button type="button" class="card-action-btn play-btn" data-action="play" aria-label="Play ${card.title}">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
              <button type="button" class="card-action-btn watchlist-btn ${inWatchlist ? "active" : ""}" data-action="watchlist" aria-label="Watchlist toggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  ${inWatchlist ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
                </svg>
              </button>
            </div>
            <button type="button" class="card-action-btn download-btn" data-action="download" aria-label="Download ${card.title}" title="Download ${card.title}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function mapTMDBDiscoverItem(item, idx, categoryKey, cat) {
    const title = typeof item.title === "object"
      ? (item.title?.english || item.title?.romaji || item.title?.native || "Untitled")
      : (item.title || item.name || "Untitled");
    const year = (
      item.startDate?.year ? String(item.startDate.year) :
      (item.release_date || item.first_air_date || item.year || "").slice(0, 4)
    ) || "2026";
    const rating = item.averageScore
      ? (item.averageScore / 10).toFixed(1)
      : (item.score ? item.score.toFixed(1) : getCardRating(item));
    const badge = getCardBadge(item, idx, categoryKey);
    const genres = Array.isArray(item.genres)
      ? (typeof item.genres[0] === "number" ? formatTMDBGenres(item.genres) : item.genres.slice(0, 2).join(" • "))
      : (item.genre_ids ? formatTMDBGenres(item.genre_ids) : (item.genres || "Featured"));
    const desc = (item.description ? item.description.replace(/<[^>]*>/g, "") : null) ||
                 item.overview || item.synopsis || "Now streaming on KLM CINEMATICS in ultra-high fidelity.";
    const isMovie = categoryKey === "movies" || item.format === "MOVIE" || item.isMovie === true || item.type === "Movie" || Boolean(item.title && !item.name);
    const imgPath = item.backdrop_path ? `${TMDB_BACKDROP_MD}${item.backdrop_path}` : (item.poster_path ? `${TMDB_POSTER_MD}${item.poster_path}` : "");
    const posterClass = `poster-${(idx % 12) + 1}`;

    return {
      id: `filtered-${categoryKey}-${idx}`,
      tmdbId: (item.id && !isNaN(parseInt(item.id, 10)) ? Number(item.id) : (item.tmdbId || null)),
      title: title,
      rawTitle: item.title,
      format: item.format,
      isMovie: isMovie,
      mediaType: isMovie ? "movie" : "tv",
      year: year,
      age: item.adult || item.isAdult ? "18+" : "14+",
      rating: rating,
      quality: badge,
      duration: isMovie ? "2h 05m" : (item.episodes ? `${item.episodes} Ep` : "Season 1"),
      genres: genres,
      desc: desc,
      description: desc,
      posterClass: posterClass,
      backdropUrl: imgPath,
      category: categoryKey,
      type: cat.name
    };
  }

  // Restores multi-rail standard subpage card layout when filter is cleared or "All Genres" selected
  function restoreStandardSubpageLayout(categoryKey) {
    activeGenreFilter = "All";
    activeFilteredItems = [];
    if (typeof window.resetGenreDropdownUI === "function") {
      window.resetGenreDropdownUI();
    }
    const cat = SUBPAGE_DATA[categoryKey];
    if (!cat) return;

    const railsContainer = document.querySelector(".subpage-content-rails");
    if (!railsContainer) return;

    // Reconstruct standard media rails layout
    railsContainer.innerHTML = cat.rails.map((rail, railIdx) => {
      const cardsHTML = (rail.items || []).map((card) => buildSubpageCardHTML(card)).join("");
      return `
        <section class="media-rail-section" id="rail-${railIdx}">
          <div class="rail-header">
            <div class="rail-title-group">
              <h3 class="rail-title">${rail.title}</h3>
            </div>
          </div>
          <div class="rail-carousel-container">
            <button type="button" class="rail-nav-btn prev" disabled aria-label="Scroll left in ${rail.title}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="rail-track">
              ${cardsHTML}
            </div>
            <button type="button" class="rail-nav-btn next" aria-label="Scroll right in ${rail.title}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>
      `;
    }).join("");

    initRailScrollArrows(document.getElementById("subpage-view") || document.body);
    initSubpageTMDB(categoryKey);
  }

  // Dynamic Subpage Genre Filtering with TMDB Discover API
  async function filterSubpageByGenre(genre) {
    const rawGenre = (genre || "All").trim();
    const catKey = getSubpageCategoryKey();

    if (!rawGenre || rawGenre.toLowerCase() === "all" || rawGenre.toLowerCase() === "all genres") {
      restoreStandardSubpageLayout(catKey);
      return;
    }

    activeGenreFilter = rawGenre;
    if (typeof window.updateGenreDropdownUI === "function") {
      window.updateGenreDropdownUI(rawGenre);
    }

    const cat = SUBPAGE_DATA[catKey];
    if (!cat) return;

    const railsContainer = document.querySelector(".subpage-content-rails");
    if (!railsContainer) return;

    // Show loading state in subpage content area
    railsContainer.innerHTML = `
      <div class="subpage-filter-header" id="subpage-filter-header">
        <div class="filter-header-left">
          <span class="filter-badge">${rawGenre}</span>
          <h2 class="filter-title">${cat.name} — ${rawGenre}</h2>
          <span class="filter-results-count">Filtering titles...</span>
        </div>
        <button type="button" class="filter-clear-btn" id="filter-clear-btn" aria-label="Clear genre filter">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Clear Filter
        </button>
      </div>
      <div class="cards-grid" id="filtered-cards-grid" style="min-height: 280px; opacity: 0.6;">
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          Loading ${rawGenre} ${cat.name}...
        </div>
      </div>
    `;

    const earlyClearBtn = document.getElementById("filter-clear-btn");
    if (earlyClearBtn) {
      earlyClearBtn.addEventListener("click", () => filterSubpageByGenre("All"));
    }

    // Build TMDB Discover Query with with_genres={genre_id}
    const genreId = (GENRE_TMDB_MAP[catKey] && GENRE_TMDB_MAP[catKey][rawGenre]) || rawGenre;
    let endpoint = "";
    if (catKey === "movies") {
      endpoint = `${TMDB_PROXY}?path=discover/movie&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
    } else if (catKey === "tv-shows") {
      endpoint = `${TMDB_PROXY}?path=discover/tv&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
    } else if (catKey === "anime") {
      endpoint = `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_genres=${genreId}&with_original_language=ja&sort_by=popularity.desc&page=1`;
    } else {
      endpoint = `${TMDB_PROXY}?path=discover/movie&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
    }

    try {
      const res = await fetch(endpoint).then((r) => (r.ok ? r.json() : null));
      if (activeGenreFilter !== rawGenre) return; // Discard stale request if user switched filter

      const items = (res?.results || []).filter((item) => item.backdrop_path || item.poster_path);

      if (items.length === 0) {
        activeFilteredItems = [];
        railsContainer.innerHTML = `
          <div class="subpage-filter-header" id="subpage-filter-header">
            <div class="filter-header-left">
              <span class="filter-badge">${rawGenre}</span>
              <h2 class="filter-title">${cat.name} — ${rawGenre}</h2>
              <span class="filter-results-count">0 titles found</span>
            </div>
            <button type="button" class="filter-clear-btn" id="filter-clear-btn" aria-label="Clear genre filter">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear Filter
            </button>
          </div>
          <div class="filter-empty-state">
            <h3>No titles found for "${rawGenre}"</h3>
            <p>Try selecting a different genre or clearing the active filter.</p>
            <button type="button" class="filter-clear-btn" id="filter-empty-clear-btn" style="margin-top: 16px;">
              Reset to All Genres
            </button>
          </div>
        `;
        const resetBtn = document.getElementById("filter-empty-clear-btn");
        if (resetBtn) resetBtn.addEventListener("click", () => filterSubpageByGenre("All"));
        const clearBtn = document.getElementById("filter-clear-btn");
        if (clearBtn) clearBtn.addEventListener("click", () => filterSubpageByGenre("All"));
        return;
      }

      // Map TMDB items and preserve active filtered list for player modal resolution
      const mappedCards = items.map((item, idx) => mapTMDBDiscoverItem(item, idx, catKey, cat));
      activeFilteredItems = mappedCards;

      const cardsHTML = mappedCards.map((card) => buildSubpageCardHTML(card)).join("");

      railsContainer.innerHTML = `
        <div class="subpage-filter-header" id="subpage-filter-header">
          <div class="filter-header-left">
            <span class="filter-badge">${rawGenre}</span>
            <h2 class="filter-title">${cat.name} — ${rawGenre}</h2>
            <span class="filter-results-count">${mappedCards.length} titles found</span>
          </div>
          <button type="button" class="filter-clear-btn" id="filter-clear-btn" aria-label="Clear genre filter">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Clear Filter
          </button>
        </div>
        <div class="cards-grid" id="filtered-cards-grid">
          ${cardsHTML}
        </div>
      `;

      const clearBtn = document.getElementById("filter-clear-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => filterSubpageByGenre("All"));
      }
    } catch (err) {
      console.warn(`[TMDB Genre Filter] Error fetching ${rawGenre} for ${catKey}:`, err);
    }
  }

  function filterRailCards(container, genre) {
    filterSubpageByGenre(genre);
  }

  // Expose global subpage filter bridge for navbar
  window.filterSubpageByGenre = filterSubpageByGenre;

  // ==========================================================
  // TMDB Dynamic Subpage Integration
  // 1. Subpage Daily Trending Hero Slider (Top 5 items, 4s cycle, centered controls)
  // 2. All Sections Cards Grid (Top 10 cards per rail with .card-badge & .card-rating, no card-match)
  // ==========================================================
  // TMDB constants defined at top of engine
  const HERO_CYCLE_MS     = 4000;

  let subpageHeroTimer    = null;
  let subpageHeroIndex    = 0;
  let subpageHeroSlides   = [];
  let subpageActiveCat    = null;

  const TMDB_GENRES = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
    53: "Thriller", 10752: "War", 37: "Western", 10759: "Action & Adventure",
    10762: "Kids", 10763: "News", 10764: "Reality", 10765: "Sci-Fi & Fantasy",
    10766: "Soap", 10767: "Talk", 10768: "War & Politics"
  };

  function formatTMDBGenres(genreIds, fallback = "Action • Drama") {
    if (!Array.isArray(genreIds) || !genreIds.length) return fallback;
    const names = genreIds.map((id) => TMDB_GENRES[id]).filter(Boolean).slice(0, 2);
    return names.length ? names.join(" • ") : fallback;
  }

  function getCardBadge(item, index, categoryKey) {
    const year = (item.release_date || item.first_air_date || "").slice(0, 4);
    const vote = Number(item.vote_average) || 0;
    const currentYear = new Date().getFullYear();

    if (index === 0) return "TOP TRENDING";
    if (vote >= 8.0) return "TOP RATED";
    if (year && Number(year) >= currentYear - 1) return "NEW";
    if (year && Number(year) <= 2005) return "CLASSIC";
    if (categoryKey === "anime" || item.original_language === "ja") return "SUB & DUB";
    if (categoryKey === "tv-shows") return "SERIES";
    if (year) return year;
    return "4K UHD";
  }

  function getCardRating(item) {
    const vote = Number(item.vote_average);
    return !isNaN(vote) && vote > 0 ? vote.toFixed(1) : "8.2";
  }

  function clampOverview(text, limit = 220) {
    if (!text) return "Streaming now on KLM CINEMATICS in ultra-high fidelity with Dolby Atmos spatial sound.";
    return text.length > limit ? text.slice(0, limit).trimEnd() + "\u2026" : text;
  }

  // (AniList and Jikan fetchers removed — anime now uses TMDB Discover API)

  // Endpoints for daily hero slider and all rails per category
  function getSubpageAllEndpoints(catKey) {
    const proxy = TMDB_PROXY;

    switch (catKey) {
      case "movies":
        return {
          daily: `${proxy}?path=trending/movie/day`,
          rails: [
            `${proxy}?path=trending/movie/week`,
            `${proxy}?path=movie/top_rated&page=1`,
            `${proxy}?path=discover/movie&with_genres=28,53&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/movie&with_genres=878,12&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/movie&with_genres=80,9648&sort_by=popularity.desc&page=1`,
            `${proxy}?path=movie/popular&page=2`
          ]
        };
      case "tv-shows":
        return {
          daily: `${proxy}?path=trending/tv/day`,
          rails: [
            `${proxy}?path=trending/tv/week`,
            `${proxy}?path=tv/top_rated&page=1`,
            `${proxy}?path=discover/tv&with_genres=10765&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/tv&with_genres=80,18&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/tv&with_genres=9648&sort_by=popularity.desc&page=1`,
            `${proxy}?path=tv/popular&page=2`
          ]
        };
      case "anime":
        return {
          daily: `${proxy}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=1`,
          rails: [
            `${proxy}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/tv&with_genres=16,10759&with_original_language=ja&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/tv&with_genres=16,10765&with_original_language=ja&sort_by=popularity.desc&page=1`,
            `${proxy}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=200&page=1`,
            `${proxy}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=2`,
            `${proxy}?path=discover/tv&with_genres=16&with_original_language=ja&sort_by=vote_count.desc&page=1`
          ]
        };

      default:
        return null;
    }
  }

  function renderSubpageHeroSlide(slideIndex, categoryKey) {
    if (subpageActiveCat !== categoryKey || !subpageHeroSlides.length) return;
    const hero = document.querySelector(".subpage-hero");
    if (!hero) return;

    subpageHeroIndex = ((slideIndex % subpageHeroSlides.length) + subpageHeroSlides.length) % subpageHeroSlides.length;
    const item = subpageHeroSlides[subpageHeroIndex];
    const cat = SUBPAGE_DATA[categoryKey];

    const backdrop = hero.querySelector(".subpage-hero-backdrop");
    const content = hero.querySelector(".subpage-hero-content");
    const titleEl = hero.querySelector(".subpage-hero-title");
    const descEl = hero.querySelector(".subpage-hero-desc");
    const catBadge = hero.querySelector(".spotlight-category-badge");
    const rankBadge = hero.querySelector(".spotlight-rank-badge");
    const metaRating = hero.querySelector(".meta-rating");
    const playBtn = hero.querySelector("#hero-play-btn");
    const watchlistBtn = hero.querySelector("#hero-watchlist-btn");

    const title = typeof item.title === "object"
      ? (item.title?.english || item.title?.romaji || item.title?.native || "Anime Spotlight")
      : (item.title || item.name || "Cinema Spotlight");
    const overview = clampOverview(
      (item.description ? item.description.replace(/<[^>]*>/g, "") : null) ||
      item.overview ||
      item.synopsis
    );
    const year = (
      item.startDate?.year ? String(item.startDate.year) :
      (item.release_date || item.first_air_date || item.year || "").slice(0, 4)
    ) || "2026";
    const rating = item.averageScore
      ? (item.averageScore / 10).toFixed(1)
      : (item.score ? item.score.toFixed(1) : getCardRating(item));
    const isMovie = item.format === "MOVIE" || item.isMovie === true || item.type === "Movie";
    const imgPath = item.bannerImage
      ? item.bannerImage
      : (item.coverImage?.extraLarge || item.coverImage?.large)
      ? (item.coverImage.extraLarge || item.coverImage.large)
      : item.backdrop_path
      ? `${TMDB_BACKDROP_LG}${item.backdrop_path}`
      : (item.poster_path ? `${TMDB_BACKDROP_MD}${item.poster_path}` : null);

    if (content) content.style.transition = "opacity 0.25s ease";
    if (backdrop) backdrop.style.transition = "opacity 0.35s ease, transform 12s cubic-bezier(0.1, 1, 0.1, 1)";

    if (content) content.style.opacity = "0.7";
    if (backdrop) backdrop.style.opacity = "0.4";

    setTimeout(() => {
      if (subpageActiveCat !== categoryKey) return;

      if (imgPath && backdrop) {
        backdrop.style.backgroundImage = `url('${imgPath}')`;
        backdrop.style.backgroundSize = "cover";
        backdrop.style.backgroundPosition = "center 25%";
      }
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = overview;
      if (catBadge) catBadge.textContent = `${(cat?.name || "CATALOG").toUpperCase()} TRENDING`;
      if (rankBadge) {
        rankBadge.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> #${subpageHeroIndex + 1} in ${cat?.name || "Catalog"} Today`;
      }
      if (metaRating) metaRating.textContent = `⭐ ${rating}`;

      const metaYear = hero.querySelector(".meta-year");
      if (metaYear) {
        metaYear.textContent = year;
      } else {
        const metaSpans = hero.querySelectorAll(".subpage-hero-meta > span");
        if (metaSpans.length >= 2) {
          metaSpans[1].textContent = year;
        }
      }

      // Update indicator dots
      const dots = hero.querySelectorAll(".hero-indicators.subpage-hero-indicators .hero-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === subpageHeroIndex);
      });

      if (playBtn) {
        playBtn.onclick = (e) => {
          e.preventDefault();
          openPlayerModal({
            tmdbId: item.tmdbId || item.id,
            title: title,
            rawTitle: item.title,
            format: item.format,
            isMovie: isMovie,
            description: overview,
            posterClass: "",
            backdropUrl: imgPath,
            category: categoryKey,
            type: cat?.name || "Cinema",
            rating: rating,
            year: year,
            duration: isMovie ? "2h 05m" : (item.episodes ? `${item.episodes} Ep` : "2h 15m")
          });
        };
      }

      if (watchlistBtn) {
        const inWatchlist = isItemInWatchlist(slideId || title);
        watchlistBtn.classList.toggle("in-watchlist", inWatchlist);
        watchlistBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${inWatchlist ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'}
          </svg>
          ${inWatchlist ? "In Watchlist" : "Add to Watchlist"}
        `;
        watchlistBtn.onclick = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          toggleSubpageHeroWatchlist(categoryKey);
        };
      }

      if (content) content.style.opacity = "1";
      if (backdrop) backdrop.style.opacity = "1";
    }, 250);
  }

  function startSubpageHeroAutoPlay(categoryKey) {
    stopSubpageHeroAutoPlay();
    if (!subpageHeroSlides.length) return;
    subpageHeroTimer = setInterval(() => {
      goToSubpageHeroSlide(subpageHeroIndex + 1, categoryKey, false);
    }, HERO_CYCLE_MS);
  }

  function stopSubpageHeroAutoPlay() {
    if (subpageHeroTimer) {
      clearInterval(subpageHeroTimer);
      subpageHeroTimer = null;
    }
  }

  function goToSubpageHeroSlide(newIndex, categoryKey, resetTimer = true) {
    if (subpageActiveCat !== categoryKey || !subpageHeroSlides.length) return;
    renderSubpageHeroSlide(newIndex, categoryKey);
    if (resetTimer) {
      startSubpageHeroAutoPlay(categoryKey);
    }
  }

  function setupSubpageHeroControls(hero, count, categoryKey) {
    if (!hero || count <= 1) return;

    // 1. Build indicator dots
    const indContainer = hero.querySelector(".hero-indicators.subpage-hero-indicators");
    if (indContainer) {
      indContainer.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.onclick = (e) => {
          e.preventDefault();
          goToSubpageHeroSlide(i, categoryKey, true);
        };
        indContainer.appendChild(dot);
      }
    }

    // 2. Prev / Next buttons
    const prevBtn = hero.querySelector("#subpage-hero-prev-btn");
    const nextBtn = hero.querySelector("#subpage-hero-next-btn");
    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        goToSubpageHeroSlide(subpageHeroIndex - 1, categoryKey, true);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        goToSubpageHeroSlide(subpageHeroIndex + 1, categoryKey, true);
      };
    }

    // 3. Hover pause
    hero.onmouseenter = () => stopSubpageHeroAutoPlay();
    hero.onmouseleave = () => {
      if (subpageActiveCat === categoryKey && subpageHeroSlides.length > 1) {
        startSubpageHeroAutoPlay(categoryKey);
      }
    };

    // 4. Activate controls visibility
    hero.classList.add("hero-carousel-active");
  }

  function populateSubpageRailCards(railIdx, items, categoryKey) {
    if (subpageActiveCat !== categoryKey || !items || !items.length) return;
    const cat = SUBPAGE_DATA[categoryKey];
    if (!cat || !cat.rails[railIdx]) return;

    const railSection = document.querySelector(`.subpage-content-rails #rail-${railIdx}`);
    if (!railSection) return;
    const railTrack = railSection.querySelector(".rail-track");
    if (!railTrack) return;

    const top10 = items.slice(0, 10);

    const mappedItems = top10.map((item, idx) => {
      const title = typeof item.title === "object"
        ? (item.title?.english || item.title?.romaji || item.title?.native || "Untitled")
        : (item.title || item.name || "Untitled");
      const year = (
        item.startDate?.year ? String(item.startDate.year) :
        (item.release_date || item.first_air_date || item.year || "").slice(0, 4)
      ) || "2026";
      const rating = item.averageScore
        ? (item.averageScore / 10).toFixed(1)
        : (item.score ? item.score.toFixed(1) : getCardRating(item));
      const badge = getCardBadge(item, idx, categoryKey);
      const genres = Array.isArray(item.genres)
        ? (typeof item.genres[0] === "number" ? formatTMDBGenres(item.genres) : item.genres.slice(0, 2).join(" • "))
        : (item.genres || "Anime • Animation");
      const desc = (item.description ? item.description.replace(/<[^>]*>/g, "") : null) ||
                   item.overview || item.synopsis || "Now streaming on KLM CINEMATICS in ultra-high fidelity.";
      const isMovie = item.format === "MOVIE" || item.isMovie === true || item.type === "Movie";
      const imgPath = item.coverImage
        ? (item.bannerImage || item.coverImage.extraLarge || item.coverImage.large || "")
        : (item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || "")
        || (item.backdrop_path ? `${TMDB_BACKDROP_MD}${item.backdrop_path}` : (item.poster_path ? `${TMDB_POSTER_MD}${item.poster_path}` : ""));
      const posterClass = `poster-${((idx + railIdx * 2) % 12) + 1}`;

      return {
        id: `card-${categoryKey}-${railIdx}-${idx}`,
        tmdbId: (item.id && !isNaN(parseInt(item.id, 10)) ? Number(item.id) : (item.tmdbId || null)),
        title: title,
        rawTitle: item.title,
        format: item.format,
        isMovie: isMovie,
        year: year,
        age: item.adult || item.isAdult ? "18+" : "14+",
        rating: rating,
        quality: badge,
        duration: isMovie ? "2h 05m" : (item.episodes ? `${item.episodes} Ep` : "Season 1"),
        genres: genres,
        desc: desc,
        posterClass: posterClass,
        backdropUrl: imgPath,
        category: categoryKey,
        type: cat.name
      };
    });

    cat.rails[railIdx].items = mappedItems;

    railTrack.innerHTML = mappedItems.map((card) => buildSubpageCardHTML(card)).join("");

    const prevBtn = railSection.querySelector(".rail-nav-btn.prev");
    const nextBtn = railSection.querySelector(".rail-nav-btn.next");
    if (prevBtn && nextBtn) {
      const updateRailBtns = () => {
        const maxScroll = railTrack.scrollWidth - railTrack.clientWidth;
        prevBtn.disabled = railTrack.scrollLeft <= 8;
        nextBtn.disabled = railTrack.scrollLeft >= maxScroll - 8;
      };
      updateRailBtns();
      setTimeout(updateRailBtns, 150);
      setTimeout(updateRailBtns, 600);
    }
  }

  async function initSubpageTMDB(categoryKey) {
    stopSubpageHeroAutoPlay();
    subpageActiveCat = categoryKey;
    subpageHeroSlides = [];
    subpageHeroIndex = 0;

    // Anime uses TMDB Discover (same pipeline as Movies / TV Shows)

    const endpoints = getSubpageAllEndpoints(categoryKey);
    if (!endpoints) return;

    try {
      // Fetch daily trending for hero and all rail endpoints simultaneously
      const fetchList = [
        fetch(endpoints.daily).then((r) => (r.ok ? r.json() : null)),
        ...endpoints.rails.map((url) => fetch(url).then((r) => (r.ok ? r.json() : null)))
      ];

      const [dailyRes, ...railsRes] = await Promise.all(fetchList);

      if (subpageActiveCat !== categoryKey) return;

      // 1. Setup Hero Daily Trending Carousel
      const dailyResults = (dailyRes?.results || []).filter((i) => i.backdrop_path || i.poster_path).slice(0, 5);
      if (dailyResults.length > 0) {
        subpageHeroSlides = dailyResults;
        const hero = document.querySelector(".subpage-hero");
        renderSubpageHeroSlide(0, categoryKey);
        setupSubpageHeroControls(hero, subpageHeroSlides.length, categoryKey);
        startSubpageHeroAutoPlay(categoryKey);
      }

      // 2. Populate Cards on ALL sections of the subpage
      railsRes.forEach((res, railIdx) => {
        const railItems = res?.results || [];
        if (railItems.length > 0) {
          populateSubpageRailCards(railIdx, railItems, categoryKey);
        }
      });

    } catch (err) {
      console.warn(`[TMDB Subpage] Fetch error for ${categoryKey}:`, err);
    }
  }

  // ==========================================================
  // Router & Navigation Logic
  // ==========================================================
  function navigateToCategory(categoryKey, pushState = true) {
    if (categoryKey === "cartoons" || categoryKey === "cartoon") {
      categoryKey = "anime";
    }
    if (!SUBPAGE_DATA[categoryKey]) return;

    currentCategory = categoryKey;
    activeGenreFilter = "All";
    activeFilteredItems = [];
    if (typeof window.resetGenreDropdownUI === "function") {
      window.resetGenreDropdownUI();
    }

    const homeMain = getHomeMain();
    const subpageContainer = document.getElementById("subpage-view");

    // Remember home scroll position before leaving
    if (homeMain && homeMain.style.display !== "none") {
      previousScrollPosition = window.scrollY || window.pageYOffset;
    }

    // Render category subpage
    renderSubpage(categoryKey);

    const updatedSubpage = document.getElementById("subpage-view");
    if (homeMain) homeMain.style.display = "none";
    if (updatedSubpage) {
      updatedSubpage.style.display = "block";
      requestAnimationFrame(() => {
        updatedSubpage.classList.add("active");
      });
    }

    // Scroll to top of sub-page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update document title
    document.title = `${SUBPAGE_DATA[categoryKey].name} — KLM CINEMATICS`;

    // Synchronize URL hash & history
    const targetHash = `#/${categoryKey}`;
    if (window.location.hash !== targetHash) {
      if (pushState) {
        try {
          window.history.pushState({ view: "subpage", category: categoryKey }, "", targetHash);
        } catch (e) {
          window.location.hash = targetHash;
        }
      }
    }

    // Update active navbar links
    updateNavbarActive(categoryKey);
  }

  function navigateToHome(pushState = true) {
    if (subpageHeroTimer) {
      clearInterval(subpageHeroTimer);
      subpageHeroTimer = null;
    }
    subpageActiveCat = null;
    activeGenreFilter = "All";
    activeFilteredItems = [];
    if (typeof window.resetGenreDropdownUI === "function") {
      window.resetGenreDropdownUI();
    }

    const homeMain = getHomeMain();
    const subpageContainer = document.getElementById("subpage-view");

    if (subpageContainer) {
      subpageContainer.classList.remove("active");
      subpageContainer.style.display = "none";
    }

    if (homeMain) {
      homeMain.style.display = "block";
    }

    document.title = "KLM CINEMATICS";

    if (pushState) {
      try {
        window.history.pushState({ view: "home" }, "", "#home");
      } catch (e) {
        window.location.hash = "#home";
      }
    }

    // Always navigate directly to home hero section at the top
    previousScrollPosition = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateNavbarActive("home");
  }

  function updateNavbarActive(activeKey) {
    if (typeof window.setActiveNavLink === "function") {
      window.setActiveNavLink(activeKey);
      return;
    }

    const normalizedTarget = (activeKey || "").toLowerCase().replace("#", "").replace(".html", "").replace("-", "");
    const navLinks = document.querySelectorAll(".nav-item, .nav-menu-item");
    navLinks.forEach((link) => {
      if (link.classList.contains("nav-menu-dropdown-toggle") || link.closest(".nav-menu-dropdown")) {
        return;
      }

      const href = (link.getAttribute("href") || "").toLowerCase().replace("#", "").replace(".html", "").replace("-", "");
      const dataTarget = (link.getAttribute("data-target") || "").toLowerCase().replace("-", "");

      const isMatch =
        (href && href === normalizedTarget) ||
        (dataTarget && dataTarget === normalizedTarget) ||
        (normalizedTarget === "home" && href.includes("home"));

      if (isMatch) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  // ==========================================================
  // URL Hash & Popstate Listener
  // ==========================================================
  function handleRoute() {
    const hash = window.location.hash.toLowerCase().replace("#", "");
    const cleanRoute = hash.replace("/", "").replace("all-", "").replace("shows", "tv-shows");
    const path = window.location.pathname.toLowerCase();
    const isStandaloneSubpage = !document.body.classList.contains("marketing-page") && (
      path.includes("movies") ||
      path.includes("tv-shows") ||
      path.includes("anime") ||
      path.includes("cartoon") ||
      path.includes("stream") ||
      document.body.classList.contains("subpage-active")
    );

    if (cleanRoute === "movies" || cleanRoute === "movie") {
      navigateToCategory("movies", false);
    } else if (cleanRoute === "tv-shows" || cleanRoute === "tvshows" || cleanRoute === "shows") {
      navigateToCategory("tv-shows", false);
    } else if (cleanRoute === "anime") {
      navigateToCategory("anime", false);
    } else if (cleanRoute === "cartoons" || cleanRoute === "cartoon") {
      navigateToCategory("anime", false);
    } else if (cleanRoute === "home") {
      navigateToHome(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (hash === "" || hash === "/") {
      if (!isStandaloneSubpage) {
        const subpageContainer = document.getElementById("subpage-view");
        if (subpageContainer && subpageContainer.style.display !== "none") {
          navigateToHome(false);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  }

  // ==========================================================
  // Attach Click Interceptors to ".section-more" and Nav
  // ==========================================================
  function initRoutingTriggers() {
    // Intercept clicks on ".section-more" ("Browse all ->")
    document.querySelectorAll(".section-more").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const href = this.getAttribute("href") || "";
        const dataCat = this.getAttribute("data-category");

        let targetCategory = "movies";
        if (dataCat) {
          targetCategory = (dataCat === "cartoons" || dataCat === "cartoon") ? "anime" : dataCat;
        } else if (href.includes("movie")) {
          targetCategory = "movies";
        } else if (href.includes("show")) {
          targetCategory = "tv-shows";
        } else if (href.includes("anime") || href.includes("cartoon")) {
          targetCategory = "anime";
        }

        e.preventDefault();
        navigateToCategory(targetCategory);
      });
    });

    // Intercept category clicks from top navbar if user wants direct sub-page view
    document.querySelectorAll(".nav-item, .nav-menu-item").forEach((link) => {
      link.addEventListener("click", function (e) {
        if (this.classList.contains("nav-menu-dropdown-toggle") || this.closest(".nav-menu-dropdown")) return;

        // Never intercept My List buttons — allow watchlist.js and navbar.js to open the modal popup
        const rawDataTarget = (this.getAttribute("data-target") || "").toLowerCase().trim();
        if (
          this.classList.contains("my-list-btn") ||
          this.id === "footer-my-list-btn" ||
          rawDataTarget === "my-list" ||
          (this.getAttribute("href") || "").toLowerCase().includes("my-list")
        ) {
          return;
        }

        const rawHref = (this.getAttribute("href") || "").toLowerCase().replace("#", "").replace(".html", "").replace("/", "");
        const targetToken = (rawDataTarget || rawHref).replace("-", "");

        const categoryKeyMap = {
          movies: "movies",
          movie: "movies",
          tvshows: "tv-shows",
          tvshow: "tv-shows",
          shows: "tv-shows",
          anime: "anime",
          cartoons: "anime",
          cartoon: "anime"
        };

        const resolvedCat = categoryKeyMap[targetToken];

        if (resolvedCat) {
          // If already on a sub-page view on index.html, switch sub-page category directly
          const subpageContainer = document.getElementById("subpage-view");
          const homeMain = getHomeMain();
          if (subpageContainer && homeMain && subpageContainer.style.display !== "none") {
            e.preventDefault();
            navigateToCategory(resolvedCat);
            updateNavbarActive(resolvedCat);
          }
        } else if (targetToken === "home" || rawHref.includes("home") || (rawHref.includes("index") && !rawHref.includes("list"))) {
          const isStandaloneSubpage = !document.body.classList.contains("marketing-page") ||
                                      window.location.pathname.includes("anime") ||
                                      window.location.pathname.includes("movies") ||
                                      window.location.pathname.includes("tv-shows") ||
                                      window.location.pathname.includes("cartoon") ||
                                      window.location.pathname.includes("stream") ||
                                      document.body.classList.contains("subpage-active");
          if (isStandaloneSubpage) {
            e.preventDefault();
            sessionStorage.setItem("klm_scroll_to_hero", "true");
            window.location.href = "index.html#home";
          } else {
            const subpageContainer = document.getElementById("subpage-view");
            if (subpageContainer && subpageContainer.style.display !== "none") {
              e.preventDefault();
              navigateToHome();
            }
          }
        }
      });
    });

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("popstate", handleRoute);
  }

  // ==========================================================
  // Smart TV, Remote Control & Universal Device Controller
  // Handles D-pad, Remote Back key, Enter/Space activation,
  // touch optimization, and spatial auto-scrolling
  // ==========================================================
  function initSmartTVNavigation() {
    // 1. Remote "Back" / "Return" button listener (Tizen, webOS, Android TV, Fire TV, Escape)
    window.addEventListener("keydown", (e) => {
      const isBackKey =
        e.key === "Escape" ||
        e.keyCode === 27 ||
        e.keyCode === 10009 || // Samsung Tizen Return / Back
        e.keyCode === 461 ||   // LG webOS Return / Back
        e.keyCode === 4 ||     // Android TV KEYCODE_BACK
        (e.key === "Backspace" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName));

      if (isBackKey) {
        const playerModal = document.getElementById("cinema-player-modal");
        if (playerModal && playerModal.classList.contains("open")) {
          e.preventDefault();
          closePlayerModal();
          return;
        }
      }

      // 2. Remote "OK" / "Select" (Enter / Space) on focusable cards & articles
      if (e.key === "Enter" || e.keyCode === 13 || e.key === " ") {
        const el = document.activeElement;
        if (el && (el.classList.contains("rail-card") || el.classList.contains("cinema-card") || el.getAttribute("role") === "button")) {
          if (!["BUTTON", "A", "INPUT", "SELECT"].includes(el.tagName)) {
            e.preventDefault();
            el.click();
          }
        }
      }

      // 3. Smart TV D-Pad Spatial Navigation inside horizontal rail carousels
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const focused = document.activeElement;
        if (focused && (focused.classList.contains("rail-card") || focused.classList.contains("cinema-card"))) {
          setTimeout(() => {
            if (document.activeElement && document.activeElement !== focused) {
              document.activeElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
            }
          }, 30);
        }
      }
    });

    // Track pointer/mouse interaction so clicking cards NEVER causes rails to auto-scroll or slide
    let isPointerInteraction = false;
    document.addEventListener("pointerdown", () => {
      isPointerInteraction = true;
    }, true);
    document.addEventListener("pointerup", () => {
      setTimeout(() => { isPointerInteraction = false; }, 400);
    }, true);

    // 4. Auto-scroll carousel rails ONLY when navigating via keyboard (Tab / TV Remote), never on mouse clicks
    document.addEventListener("focusin", (e) => {
      if (isPointerInteraction) return;
      try {
        if (!e.target || !e.target.matches || !e.target.matches(":focus-visible")) return;
      } catch (err) {
        return;
      }
      if (e.target && (e.target.classList.contains("rail-card") || e.target.classList.contains("cinema-card"))) {
        e.target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
  }

  // Initialize on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    updateWatchlistBadges();
    initRoutingTriggers();
    initSmartTVNavigation();
    handleRoute(); // In case page was opened with #/movies, #/anime etc.

    // Direct playback routing from marketing homepage (?play=tmdbId)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const playId = urlParams.get("play") || urlParams.get("tmdb");
      if (playId) {
        const playTitle = urlParams.get("title") ? decodeURIComponent(urlParams.get("title")) : "Selected Feature";
        const playType = urlParams.get("type") || (window.location.pathname.includes("tv-shows") ? "tv" : window.location.pathname.includes("anime") ? "anime" : "movie");
        const playYear = urlParams.get("year") || "2026";
        const playRating = urlParams.get("rating") || "9.0";
        const isEpisodic = playType === "tv" || playType === "anime";

        setTimeout(() => {
          openPlayerModal({
            id: playId,
            tmdbId: playId,
            _tmdbVerified: true,
            title: playTitle,
            type: playType === "tv" ? "TV Series" : (playType === "anime" ? "Anime" : "Movie"),
            category: playType === "tv" ? "tv-shows" : (playType === "anime" ? "anime" : "movies"),
            mediaType: playType,
            year: playYear,
            rating: playRating
          });
        }, 350);
      }
    } catch (err) {
      console.warn("[Subpages] URL play parameter check error:", err);
    }
  });

  // Export to window for standalone pages and global access
  window.KLMCinematicsSubpages = {
    navigateToCategory,
    navigateToHome,
    openPlayerModal,
    filterRailCards,
    filterSubpageByGenre,
    restoreStandardSubpageLayout,
    updateNavbarActive,
    get activeCategory() {
      return subpageActiveCat;
    },
    SUBPAGE_DATA
  };
})();
