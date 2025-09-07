import offendersResponseJson from "@data/offenders.json";

export default async function handler(req, res) {
  // Fake input/location until I figure out exactly how we're going to make requests
  const { input: location } = req.query;

  if (!location) {
    return res
      .status(400)
      .json({ error: "Input parameter (location) is required" });
  }

  try {
    const mockResponse = {
      json: async () => offendersResponseJson,
    };
    const data = await mockResponse.json();

    // Vercel enables CORS by default, so we can set headers for caching
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Offenders API" });
  }
}
