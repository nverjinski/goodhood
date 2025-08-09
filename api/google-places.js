export default async function handler(req, res) {
  const { input } = req.query;

  const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!input) {
    return res.status(400).json({ error: "Input parameter is required" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    // Vercel enables CORS by default, so we can set headers for caching
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Google API" });
  }
}
