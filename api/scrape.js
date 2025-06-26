export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { url, category } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  // Dummy logic (to be replaced with actual scraping)
  const video = {
    url,
    category,
    title: "Sample Video Title",
    thumbnail: "https://via.placeholder.com/200"
  };

  // Normally save to DB or file (not possible on Vercel)
  res.status(200).json({ success: true, video });
}
