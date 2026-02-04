# Nutri Landing Pages

## Overview
A collection of landing pages for a nutritionist/health professional website. The site is in Portuguese and offers online nutrition consultations.

## Project Structure
- `/src/` - TypeScript server code
- `/css/` - Custom stylesheets and themes
- `/js/` - Custom JavaScript files
- `/img/` - Image assets
- `/video/` - Video assets
- `/vendor/` - Third-party libraries (Bootstrap, FontAwesome, jQuery plugins, etc.)
- `/*.html` - HTML landing pages

## Tech Stack
- TypeScript with Express.js server
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

## Development
Run with `npx tsx src/server.ts` on port 5000.

## Deployment
Configured with build step (`npm run build`) and runs compiled JavaScript in production.
