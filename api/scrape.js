// api/scrape.js

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // Avoid 403 from bot protection
      },
    });
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Try to extract og:title and og:image
    const title = doc.querySelector('meta[property="og:title"]')?.content || 'No title found';
    const thumbnail = doc.querySelector('meta[property="og:image"]')?.content || '';

    res.status(200).json({ title, thumbnail });
  } catch (err) {
    console.error('Scrape error:', err);
    res.status(500).json({ error: 'Failed to scrape the site' });
  }
}
