# Nutri Landing Pages

## Overview
A collection of landing pages for a nutritionist/health professional website. The site is in Portuguese and offers online nutrition consultations.

## Project Structure
- `/src/` - TypeScript server code
  - `server.ts` - Express server with API endpoints
  - `supabase.ts` - Supabase client configuration
- `/css/` - Custom stylesheets and themes
- `/js/` - Custom JavaScript files (including whatsapp-tracker.js)
- `/img/` - Image assets
- `/video/` - Video assets
- `/vendor/` - Third-party libraries (Bootstrap, FontAwesome, jQuery plugins, etc.)
- `/*.html` - HTML landing pages
- `schema.sql` - SQL schema to create tables in Supabase

## Tech Stack
- TypeScript with Express.js server
- Supabase (PostgreSQL)
- Bootstrap framework
- jQuery and various plugins

## Environment Variables
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key

## Routes
- `/` - Main page (nutri-online-v1.html)
- `/consultaPremium` - Consulta Premium page
- `/consultoriaSmart` - Consultoria Smart page
- `/preco` - Pricing page
- `/programaSejaLeve` - Programa Seja Leve page
- `/nutri-bariatrica` - Nutri Bariátrica page
- `/emagrecimento` - Emagrecimento page
- `/inicio` - Início page

## API Endpoints
- `POST /api/track-pageview` - Records page view with gclid and assigns an available greeting

## Database (Supabase)

### Table: info_google_ads
- id (serial, primary key)
- gclid (varchar) - Google Ads click ID
- page_url (text) - Page visited
- whatsapp_url (text)
- user_agent (text)
- ip_address (varchar)
- created_at (timestamp)

### Table: whatsapp_greetings
- id (serial, primary key)
- greeting_message (text) - WhatsApp greeting message
- id_info_google_ads (integer, FK to info_google_ads.id) - NULL means available

## Setup Supabase
1. Copy content from `schema.sql`
2. Run in Supabase SQL Editor
3. Set environment variables SUPABASE_URL and SUPABASE_ANON_KEY

## Development
Run with `npx tsx src/server.ts` on port 5000.

## Deployment
Configured with build step (`npm run build`) and runs compiled JavaScript in production.
