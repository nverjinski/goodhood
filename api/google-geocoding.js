export default async function handler(req, res) {
  const apiKey = process.env.VITE_GOOGLE_GEOCODING_API_KEY;
  const { input: placeId } = req.query;

  if (!placeId) {
    return res
      .status(400)
      .json({ error: "Input parameter (placeId) is required" });
  }

  // The base URL for the Geocoding API.
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  const url = `${baseUrl}?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Vercel enables CORS by default, so we can set headers for caching
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch data from Google Geocoding API" });
  }
}
