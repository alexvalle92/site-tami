import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..');

const app = express();
const PORT = 5000;

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
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

    const { data: infoData, error: infoError } = await supabase
      .from('info_google_ads')
      .insert({
        gclid,
        page_url: pageUrl,
        user_agent: userAgent,
        ip_address: ipAddress
      })
      .select('id')
      .single();

    if (infoError) {
      console.error('Error inserting info_google_ads:', infoError);
      return res.status(500).json({ success: false, error: infoError.message });
    }

    const infoGoogleAdsId = infoData.id;

    const { data: availableGreeting } = await supabase
      .from('whatsapp_greetings')
      .select('id, greeting_message')
      .is('id_info_google_ads', null)
      .order('id')
      .limit(1)
      .single();

    let greeting = null;

    if (availableGreeting) {
      const { data: updatedGreeting, error: updateError } = await supabase
        .from('whatsapp_greetings')
        .update({ id_info_google_ads: infoGoogleAdsId })
        .eq('id', availableGreeting.id)
        .select('id, greeting_message')
        .single();

      if (!updateError && updatedGreeting) {
        greeting = updatedGreeting;
      }
    }

    res.json({ 
      success: true, 
      infoId: infoGoogleAdsId,
      greeting: greeting
    });
  } catch (error) {
    console.error('Error tracking pageview:', error);
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
