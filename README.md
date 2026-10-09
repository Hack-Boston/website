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
