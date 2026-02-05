# Nutri Landing Pages

## Overview
A collection of landing pages for a nutritionist/health professional website. The site is in Portuguese and offers online nutrition consultations.

## Project Structure
- `/src/` - TypeScript server code
- `/css/` - Custom stylesheets and themes
- `/js/` - Custom JavaScript files (including whatsapp-tracker.js)
- `/img/` - Image assets
- `/video/` - Video assets
- `/vendor/` - Third-party libraries (Bootstrap, FontAwesome, jQuery plugins, etc.)
- `/*.html` - HTML landing pages

## Tech Stack
- TypeScript with Express.js server
- PostgreSQL database
- Bootstrap framework
- jQuery and various plugins

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

## Database

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

## Google Ads Tracking Flow
1. User visits page → insert into info_google_ads (captures gclid)
2. Find available greeting (where id_info_google_ads IS NULL)
3. Update greeting with the new info_google_ads ID
4. Return greeting to frontend

## Development
Run with `npx tsx src/server.ts` on port 5000.

## Deployment
Configured with build step (`npm run build`) and runs compiled JavaScript in production.
