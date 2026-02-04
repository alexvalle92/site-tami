import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..');

const app = express();
const PORT = 5000;

app.use('/css', express.static(path.join(publicDir, 'css')));
app.use('/js', express.static(path.join(publicDir, 'js')));
app.use('/img', express.static(path.join(publicDir, 'img')));
app.use('/video', express.static(path.join(publicDir, 'video')));
app.use('/vendor', express.static(path.join(publicDir, 'vendor')));

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
