// functions/api/news.js

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const query = url.searchParams.get("q") || "cinema movies entertainment";
  const lang = url.searchParams.get("lang") || "en";
  const max = url.searchParams.get("max") || "6";

  // Retrieve GNews key securely from Cloudflare environment secrets with fallback
  const apiKey = env?.GNEWS_API_KEY || "ffdef2a70a18c4de3139f471fcfee54d";

  const targetUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&max=${max}&apikey=${apiKey}`;

  try {
    const gnewsResponse = await fetch(targetUrl, {
      headers: { "Accept": "application/json" }
    });

    const data = await gnewsResponse.text();

    return new Response(data, {
      status: gnewsResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=3600"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from GNews", details: err.message }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
}
