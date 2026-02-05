-- Schema para criar as tabelas no Supabase
-- Execute este SQL no SQL Editor do Supabase

-- Tabela para armazenar informações do Google Ads
CREATE TABLE IF NOT EXISTS info_google_ads (
  id SERIAL PRIMARY KEY,
  gclid VARCHAR(255),
  page_url TEXT,
  whatsapp_url TEXT,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar mensagens de saudação do WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_greetings (
  id SERIAL PRIMARY KEY,
  greeting_message TEXT,
  id_info_google_ads INTEGER REFERENCES info_google_ads(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para buscar saudações disponíveis mais rapidamente
CREATE INDEX IF NOT EXISTS idx_whatsapp_greetings_available 
ON whatsapp_greetings(id_info_google_ads) 
WHERE id_info_google_ads IS NULL;

-- Inserir mensagens de saudação iniciais
INSERT INTO whatsapp_greetings (greeting_message, id_info_google_ads) VALUES
('Oie sou a Loine, assistente da nutri Tâmili. Por gentileza, me diga qual seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Olá! Aqui é a Loine, assistente da nutri Tâmili. Poderia me contar qual é o seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oi! Sou a Loine, assistente da nutricionista Tâmili. Me conta qual seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oie! Aqui é a Loine, da equipe da nutri Tâmili. Qual seria o seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Olá! Sou a Loine, assistente da nutri Tâmili. Gostaria de saber qual é seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oi, tudo bem? Sou a Loine, assistente da nutri Tâmili. Me diz qual seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oie! Aqui é a Loine, assistente da nutri Tâmili. Pode me informar qual seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Olá! Loine aqui, assistente da nutricionista Tâmili. Qual o seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oi! Sou a Loine, da equipe da nutri Tâmili. Por favor, me conta qual seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL),
('Oie, tudo bem? Aqui é a Loine, assistente da nutri Tâmili. Poderia compartilhar seu objetivo nutricional? (ex: emagrecimento, doença diagnosticada, ganho de massa, bariátrica…).', NULL);
