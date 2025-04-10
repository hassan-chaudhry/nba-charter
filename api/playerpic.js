// get player picture from web scraping
export default async function handler(req, res) {
  const { playerID } = req.query;

  try {
    const response = await fetch(
      `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
    );
    if (!response.ok) {
      console.error(`Failed to fetch player picture: ${res.statusText}`);
      return res.status(response.status).json({ error: response.statusText });
    }

    const buffer = await response.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send("Failed to fetch image");
  }
}
