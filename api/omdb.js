export default async function handler(req, res) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey)
    return res.status(500).json({ error: 'API key non configurata' });

  const query = new URLSearchParams({
    apikey: apiKey,
    ...req.query,
  }).toString();

  try {
    const r = await fetch(`https://www.omdbapi.com/?${query}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Errore proxy verso OMDB' });
  }
}
