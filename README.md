# The Wayfarer's Codex

A generator of inns, taverns, and waystations for tabletop adventures.

---

## Deploying to the web (about 20 minutes, no terminal)

### 1. Make a GitHub account
Go to [github.com](https://github.com) → **Sign up**. Email + password is enough. Verify your email.

### 2. Make a Vercel account
Go to [vercel.com](https://vercel.com) → **Sign Up** → **Continue with GitHub**. This links your two accounts. No separate password.

### 3. Upload this project to GitHub
1. On github.com, click the **+** in the top-right → **New repository**.
2. Name it `wayfarers-codex` (or whatever you like). Leave it **Public**. Don't tick any of the "initialize with…" boxes. Click **Create repository**.
3. On the new empty repo page, click the link **"uploading an existing file"** (it's in the sentence "Get started by creating a new file or uploading an existing file").
4. Drag this entire folder's contents into the upload area. Make sure to include the hidden `.gitignore` file too — on Mac you may need `Cmd+Shift+.` in Finder to see it.
5. Scroll down and click **Commit changes**.

### 4. Deploy with Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Find your `wayfarers-codex` repo in the list and click **Import**.
3. Vercel auto-detects Vite — leave all the settings alone.
4. Click **Deploy**.
5. Wait about 90 seconds. You'll get a URL like `wayfarers-codex-abc123.vercel.app`. That's your live site.

### 5. (Optional) Custom URL
In the Vercel dashboard for the project → **Settings** → **Domains** → you can either set the project name to something cleaner (free `*.vercel.app` subdomain) or attach a domain you own.

---

## Making changes later

The easy way:

1. On github.com, open the file you want to edit (probably `src/App.jsx`).
2. Click the pencil icon (top right of the file view).
3. Edit in the browser.
4. Scroll down → **Commit changes**.
5. Vercel rebuilds and redeploys automatically in ~30 seconds. Refresh your live URL.

The slightly less easy way (better for big changes): download the repo as a zip from GitHub, edit locally in any text editor, and re-upload the changed files.

---

## File map

```
wayfarers-codex/
├── .gitignore              Files Git should ignore
├── README.md               This file
├── index.html              Page shell + Google Fonts
├── package.json            Lists the libraries used
├── postcss.config.js       Plumbing for Tailwind
├── tailwind.config.js      Tailwind setup
├── vite.config.js          Build tool config
└── src/
    ├── App.jsx             The inn generator — all the logic and UI
    ├── index.css           Tailwind directives
    └── main.jsx            Starts React
```

You'll only ever need to edit `src/App.jsx` for normal changes (new tables, new tone presets, tweaking text, adjusting colors, etc.).

---

## Running it on your own computer (optional, for power users)

If you ever install Node.js:

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Not required for deployment.
