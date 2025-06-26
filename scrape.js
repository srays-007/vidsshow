export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { url, category } = req.body;
  // Simulated scraping (you can replace this with real logic)
  const newVideo = {
    url,
    title: "Extracted Video Title",
    thumbnail: "https://example.com/thumb.jpg",
    category
  };
  const fs = require("fs");
  const path = "videos.json";
  const videos = JSON.parse(fs.readFileSync(path, "utf8"));
  videos.push(newVideo);
  fs.writeFileSync(path, JSON.stringify(videos, null, 2));
  res.status(200).json({ success: true });
}
