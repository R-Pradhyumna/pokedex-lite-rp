# Pokedex Lite

Pokedex Lite is a modern Pokédex web app powered by PokéAPI.  
Browse, search, filter by type, paginate through results, and mark favorite Pokémon in a fast, responsive interface.

## Features

- **Live data from PokéAPI**  
  Uses the official REST API to fetch Pokémon lists, details, types, and stats in real time.

- **Search by name or ID**  
  Debounced search input to quickly jump to a specific Pokémon without spamming the API.

- **Type filters**  
  One-click chips for types (All, Fire, Water, Grass, Electric) with client-side pagination for type lists.

- **Pagination with page input**  
  Previous/Next buttons plus a page number input for jumping directly to any page of the main list.

- **Favorites with persistence**  
  Heart toggle per card, favorites-only filter, and LocalStorage so favorites survive reloads.

- **Detail modal**  
  Click any card to view sprite, types, base stats, and abilities in a focused dialog.

- **Responsive layout**  
  Grid shifts from 3 → 2 → 1 columns, modal resizes for mobile, and header/footer adapt for small screens.

- **Skeleton loading & empty states**  
  Skeleton UI while data loads plus friendly messages for “no results” and “no favorites yet”.

- **Error handling**  
  Error boundary + React Query error states with retry logic tuned for PokéAPI.

## Tech stack

- **React 18** with functional components and hooks.
- **Vite** for fast dev server and bundling.
- **TanStack Query (React Query)** for data fetching, caching, and pagination.
- **React Error Boundary** for graceful runtime error handling.
- **React Hook Form** for ergonomic search input handling.
- **CSS Modules** for scoped, component-driven styling.
- **PokéAPI v2** as the data source.

## Getting started

### Prerequisites

- Node.js (LTS)
- Bun or npm/yarn (the repo uses Bun in scripts, but npm works with small changes). [file:9]

### Installation

bun install
or
npm install

### Development

bun dev
or
npm run dev

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

bun run build

or
npm run build

To preview the production build locally:

bun run preview
or
npm run preview

Deploy the contents of `dist/` to a static host (Vercel, Netlify, GitHub Pages, etc.).

## Data flow and architecture

- **API layer (`services/api.js`)**

  - `fetchPokemonList` handles search, type-based lists, and default paginated lists using `/pokemon` and `/type/{type}`.
  - `fetchPokemonDetails` fetches full details for cards and modal using `/pokemon/{name}`.
  - `fetchPokemonTypes` returns all types, useful for dynamic type chips.

- **Data hooks**

  - `usePokemonList` wraps `fetchPokemonList` in React Query with `keepPreviousData` and `staleTime` for smooth pagination and caching.
  - `usePokemonDetails` wraps `fetchPokemonDetails` with a longer `staleTime` so details are cached aggressively.

- **State and UI**

  - `Homepage` coordinates search term, selected type, favorites-only toggle, current page, and selected Pokémon for the modal.
  - `PokemonGrid` receives query data and renders cards, pagination controls, and contextual empty states.
  - `PokemonCard` enriches each list item with sprite, type, and HP, and exposes a heart toggle for favorites.
  - `PokemonModal` shows detailed stats and abilities for the selected Pokémon.

- **Favorites**
  - `useFavourites` manages a set-like favorites list backed by LocalStorage and exposes `toggleFavorite`, `isFavorite`, and `favoritesCount`.

## Optimisations

- **React Query defaults** (configured in `App.jsx`):

  - `staleTime: 5 * 60 * 1000` keeps data fresh for 5 minutes to avoid redundant refetches.
  - `refetchOnWindowFocus: false`, `refetchOnMount: false`, and `refetchInterval: false` reduce background network traffic.
  - `retry: 1` retries failed queries once without hammering PokéAPI.

- **Per-query options**:

  - `usePokemonList` uses `keepPreviousData: true` to keep the old page visible while the new page loads.
  - `usePokemonDetails` uses a longer `staleTime` because Pokémon details are effectively static.

- **UI/UX performance**:
  - `React.lazy` + `Suspense` defer loading the main route and show a skeleton fallback.
  - Pagination input lets users jump directly to a page instead of clicking Next/Previous many times.
  - Skeleton loaders provide perceived performance while data arrives.

## Accessibility and future improvements

Potential enhancements:

- Add `aria-label`s for:

  - Favorite heart button (e.g. “Add to favorites” / “Remove from favorites”).
  - Pagination controls (“Previous page”, “Next page”, “Go to page N”).
  - Modal close button.

- Keyboard support:

  - Keyboard focus and Enter/Space to open the modal.
  - Escape key to close the modal.

- Dynamic type chips using `fetchPokemonTypes` instead of a hardcoded subset.

- Additional filters (generation, base stat ranges, color/habitat) by tapping other PokéAPI endpoints.

## Credits

- Data and sprites: [PokéAPI](https://pokeapi.co), which aggregates data and images from official Pokémon sources.
- Built with React, Vite, TanStack Query, React Hook Form, and CSS Modules.

All Pokémon names, sprites, and related media are provided by PokéAPI and originate from official Pokémon resources. This project is for learning/demo purposes only and is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company.
