// functions/api/news.js

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const query = url.searchParams.get("q") || "cinema";
  const category = url.searchParams.get("category") || "entertainment";
  const lang = url.searchParams.get("lang") || "en";
  const max = url.searchParams.get("max") || "10";

  const apiKey = env.GNEWS_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GNews API key not configured on server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const targetUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&q=${encodeURIComponent(query)}&lang=${lang}&max=${max}&apikey=${apiKey}`;

  try {
    const newsResponse = await fetch(targetUrl, {
      headers: { "Accept": "application/json" }
    });

    const data = await newsResponse.text();

    return new Response(data, {
      status: newsResponse.status,
      headers: {
        "Content-Type": "application/json",
        // Cache news at edge for 30 minutes
        "Cache-Control": "public, max-age=1800, s-maxage=1800"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from GNews", details: err.message }), {
      status: 502,
      headers: { "Content-Type": "application/json" }
    });
  }
}
