# HackBoston Website

The website for the HackBoston hackathon, hosted at [hackboston.dev](https://hackboston.dev).

The site is built with [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5 + TypeScript) and deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) using the SvelteKit Cloudflare adapter.

## Prerequisites

- [Node.js](https://nodejs.org/) 20.19 or newer (required by Vite 7)
- npm (comes with Node.js)
- Recommended editor extension: [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

## Getting Started

Clone the repository and install dependencies:

```sh
git clone <repository-url>
cd website
npm i
```

## Developing

Start the local development server with hot reloading:

```sh
npm run dev
```

The site will be available at [http://localhost:5173](http://localhost:5173). To open it in your browser automatically, run `npm run dev -- --open`.

### Project Structure

| Path                 | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| `src/routes/`        | Pages and layouts (file-based routing)             |
| `src/lib/`           | Shared components, utilities, and assets           |
| `src/app.html`       | HTML template wrapping every page                  |
| `static/`            | Static files served as-is (e.g. `robots.txt`)      |
| `svelte.config.js`   | SvelteKit configuration                            |
| `wrangler.jsonc`     | Cloudflare Workers deployment configuration        |

To add a new page, create a `+page.svelte` file in a folder under `src/routes/`. For example, `src/routes/events/+page.svelte` is served at `/events`.
