# Project pages: JSON + `project.html`

## How it works

1. **`data/projects.json`** — One file lists all projects. Each entry has a unique **`slug`** (URL-safe id).
2. **`project.html?slug=...`** — Loads that JSON in the browser and fills the page. Example:
   - `project.html?slug=thebook`
   - `project.html?slug=example-game`
3. **`js/project-page.js`** — Fetches JSON, finds the project by `slug`, and renders the hero, overview, tags, and visual rows.

## Editing content

- Add a new object to the `"projects"` array in `data/projects.json`.
- Copy an existing entry and change `slug`, `title`, paths, text, and `showcases`.
- **`heroMedia`** — Full-width **banner** at the top (like the homepage hero, but shorter): gameplay **GIF** or **MP4 loop** behind the title. Same `type` / `src` / `poster` rules as below; use a short, optimized clip for performance.
- **Media types**
  - **Image / GIF**: `"type": "image"`, `"src": "assets/images/..."`  
  - **Video**: `"type": "video"`, `"src": "assets/videos/clip.mp4"`, optional `"poster": "assets/images/poster.jpg"`

## Linking from the homepage

In `index.html`, point a card to:

```html
<a href="project.html?slug=your-slug" class="project-link-wrapper">
```

## Fallback (no server / no JS)

- Browsers may block `fetch()` when opening HTML as **`file://`**. Use **Live Server**, **`npx serve`**, or deploy to GitHub Pages so `data/projects.json` loads.
- **`project-template.html`** is still a static copy-paste template if you prefer fully offline HTML per project.

## Optional: remove duplicate `thebook.html`

If everything for The Book lives in JSON, you can delete `thebook.html` or replace it with a redirect to `project.html?slug=thebook` (meta refresh or server rule).
