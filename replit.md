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
- `POST /api/track-click` - Records WhatsApp button clicks with gclid for Google Ads offline conversions

## Database
PostgreSQL with table `whatsapp_clicks`:
- id (serial, primary key)
- gclid (varchar) - Google Ads click ID
- page_url (text) - Page where click occurred
- whatsapp_url (text) - WhatsApp link clicked
- user_agent (text)
- ip_address (varchar)
- created_at (timestamp)

## Google Ads Tracking
The `whatsapp-tracker.js` script captures gclid from URL parameters and stores it in sessionStorage. When users click WhatsApp buttons, the gclid is sent to the API before redirecting.

## Development
Run with `npx tsx src/server.ts` on port 5000.

## Deployment
Configured with build step (`npm run build`) and runs compiled JavaScript in production.
