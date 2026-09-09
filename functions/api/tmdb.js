// functions/api/tmdb.js

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Read the desired TMDB subpath, e.g. "trending/movie/week" or "movie/popular"
  const tmdbPath = url.searchParams.get("path") || "trending/movie/week";

  // Forward extra query params (like &page=1 or &query=batman)
  url.searchParams.delete("path");
  const forwardParams = url.searchParams.toString();

  // Retrieve TMDB key securely from Cloudflare environment secrets with fallback
  const apiKey = env?.TMDB_API_KEY || "57a0bf48cdfb41f42652162db1f0617e";

  const targetUrl = `https://api.themoviedb.org/3/${tmdbPath}?api_key=${apiKey}${forwardParams ? `&${forwardParams}` : ""}`;

  try {
    const tmdbResponse = await fetch(targetUrl, {
      headers: { "Accept": "application/json" }
    });

    const data = await tmdbResponse.text();

    return new Response(data, {
      status: tmdbResponse.status,
      headers: {
        "Content-Type": "application/json",
        // Cache at edge for 1 hour to save your TMDB API quota
        "Cache-Control": "public, max-age=3600, s-maxage=3600"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from TMDB", details: err.message }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
}
