export default async function handler(req, res) {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  if (!API_KEY)
    return res.status(500).json({ error: 'API key non configurata' });

  const query = new URLSearchParams({
    API_KEY: API_KEY,
    ...req.query,
  }).toString();

  try {
    const r = await fetch(`https://www.omdbapi.com/?${query}`);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: 'Errore proxy verso OMDB' });
  }
}
