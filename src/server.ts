import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..');

const app = express();
const PORT = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use('/img', express.static(path.join(publicDir, 'img')));
app.use('/video', express.static(path.join(publicDir, 'video')));
app.use('/vendor', express.static(path.join(publicDir, 'vendor')));

app.post('/api/track-pageview', async (req, res) => {
  try {
    const { gclid, pageUrl } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const result = await pool.query(
      `INSERT INTO whatsapp_clicks (gclid, page_url, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [gclid, pageUrl, userAgent, ipAddress]
    );

    res.json({ success: true, clickId: result.rows[0].id });
  } catch (error) {
    console.error('Error tracking pageview:', error);
    res.status(500).json({ success: false });
  }
});

app.post('/api/save-greeting', async (req, res) => {
  try {
    const { greetingMessage, clickId } = req.body;

    await pool.query(
      `INSERT INTO whatsapp_greetings (greeting_message, whatsapp_click_id) 
       VALUES ($1, $2)`,
      [greetingMessage, clickId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving greeting:', error);
    res.status(500).json({ success: false });
  }
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'nutri-online-v1.html'));
});

app.get('/consultaPremium', (_req, res) => {
  res.sendFile(path.join(publicDir, 'consultaPremium.html'));
});

app.get('/consultoriaSmart', (_req, res) => {
  res.sendFile(path.join(publicDir, 'consultoriaSmart.html'));
});

app.get('/preco', (_req, res) => {
  res.sendFile(path.join(publicDir, 'preco.html'));
});

app.get('/programaSejaLeve', (_req, res) => {
  res.sendFile(path.join(publicDir, 'programaSejaLeve.html'));
});

app.get('/nutri-bariatrica', (_req, res) => {
  res.sendFile(path.join(publicDir, 'nutri-bariatrica-v1.html'));
});

app.get('/emagrecimento', (_req, res) => {
  res.sendFile(path.join(publicDir, 'emagrecimento.html'));
});

app.get('/inicio', (_req, res) => {
  res.sendFile(path.join(publicDir, 'inicio.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
