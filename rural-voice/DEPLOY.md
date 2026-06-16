# Deploying Rural Voice to Vercel

This is a static demo build of Rural Voice (HTML/CSS/JS, in-memory data — no backend/database required). It deploys instantly on Vercel.

## Option A — Deploy via Vercel CLI (fastest, from your computer)

1. Unzip this project, then open a terminal inside the folder.
2. Install the Vercel CLI if you don't have it:
   ```bash
   npm install -g vercel
   ```
3. Run:
   ```bash
   vercel
   ```
4. Follow the prompts (log in / create an account if asked, accept the defaults).
5. Vercel will print a live URL like `https://rural-voice-xxxx.vercel.app` — that's your deployed site.
6. To push future updates: `vercel --prod`.

## Option B — Deploy via GitHub + Vercel dashboard (no CLI needed)

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Rural Voice"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rural-voice.git
   git push -u origin main
   ```
2. Go to https://vercel.com and sign in (GitHub login is easiest).
3. Click **Add New Project**, select your `rural-voice` repo.
4. Vercel auto-detects it as a static site because of `vercel.json`. Leave settings as default.
5. Click **Deploy**. In about 30 seconds you'll get a live link such as `https://rural-voice.vercel.app`.

## Option C — Drag-and-drop (no Git at all)

1. Go to https://vercel.com/new
2. Drag the entire project folder onto the page.
3. Click **Deploy**.

## Project structure

```
rural-voice/
├── public/
│   ├── index.html     # All pages (home, login, register, dashboards, announcements)
│   ├── style.css      # Styling
│   └── app.js          # App logic (auth, complaints, announcements - in-memory demo data)
├── vercel.json         # Vercel static routing config
├── package.json
└── DEPLOY.md            # This file
```

## Demo logins (once deployed)

- Villager: `villager@demo.in` / `pass123`
- Official: `official@demo.in` / `pass123`
- Admin: `admin@demo.in` / `pass123`

## Note on data persistence

This static version stores data in browser memory (JavaScript variables), so it resets on every page reload — it's meant as a fully working interactive demo. For real persistence matching the README's Node.js + MongoDB stack, you'd deploy a backend (e.g. on Render/Railway) plus MongoDB Atlas, and Vercel would host the frontend while calling that API.
