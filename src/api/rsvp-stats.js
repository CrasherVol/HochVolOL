export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const baseUrl = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!baseUrl || !token) return res.status(500).json({ error: "KV not configured" });

    const kv = async (cmd, ...args) => {
      const body = { command: [cmd, ...args] };
      const r = await fetch(baseUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return r.json();
    };

    const yes = Number((await kv("GET", "rsvp:yes"))?.result || 0);
    const no  = Number((await kv("GET", "rsvp:no"))?.result || 0);

    res.status(200).json({ yes, no, total: yes + no });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
}
