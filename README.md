# Pokédex — React

A small Pokerédex built with React and Vite that lists the first 50 Pokémon and shows a detailed profile when a card is clicked.

## Screenshots

![Pokédex - Screenshoot](./Pokédex%20-%20Screenshoot.png)

## Features

- **Responsive Pokémon grid** — the first 50 Pokémon rendered as cards that adapt automatically to the screen width (no media queries needed).
- **Type-based colors** — each card background is a gradient built from the Pokémon's primary type (fire, water, grass, poison, electric, and all official types).
- **Hover effects** — cards lift up with a subtle shadow, a glowing type-colored border, and a diagonal "shine" sweep.
- **Detailed modal view** — click any card to open a profile with the sprite, id, name, type badges, **height** and **weight** (converted from decimeters/hectograms to meters/kilograms), and a list of **abilities**.
- **Discreet footer & branded title** — a "Pokédex" title using the Bangers retro font with Pokéball-red coloring.

## Tech Stack

| Technology | Used for |
|---|---|
| [React 19](https://react.dev) | UI components, `useState` / `useEffect` data fetching |
| [Vite](https://vitejs.dev) | Development server and build tooling |
| [PokeAPI](https://pokeapi.co/) | Pokémon data (sprite, types, stats, abilities) |
| [PropTypes](https://www.npmjs.com/package/prop-types) | Component prop validation |
| [ESLint](https://eslint.org) | Code linting |
| Plain CSS | All styling (no Tailwind or CSS frameworks) |

## Getting Started

```bash
# 1. Clone the repository
git clone git@github.com:Anonymat-HS/Pokedex.git
cd Pokedex

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:5173 in the browser.

### Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production (to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── PokemonCard.jsx    # Single card: sprite, id, name, type badges, click handler
│   ├── PokemonList.jsx    # Grid of N cards (default 50)
│   ├── PokemonModal.jsx   # Detailed profile shown above the grid
│   └── SearchBar.jsx      # (unused placeholder for a future search feature)
├── data/
│   └── types.js           # Official type→color mapping (unused in current cards)
├── hooks/
│   └── usePokemon.js      # Custom hook to fetch the Pokémon list (unused)
├── pages/
│   └── Pokedex.jsx        # Main page: owns selectedPokemon state + modal logic
├── services/
│   └── pokeApi.js         # All PokeAPI fetch helpers
├── utils/
│   └── capitalize.js      # Capitalizes strings ("bulbasaur" → "Bulbasaur")
├── App.jsx                # Root component, renders <Pokedex />
├── main.jsx               # Vite/React entry point
└── index.css              # All global styles (variables, grid, cards, modal)
```

## How the data flows

1. `Pokedex` (page) keeps a `selectedPokemon` state (`null` by default).
2. `PokemonList` renders 50 `PokémonCard` components, each fetching its own Pokémon from the PokeAPI with `useEffect`.
3. Clicking a card calls `PokemonCard`'s `onSelect` prop, which bubbles the clicked Pokémon up to `Pokedex`.
4. `Pokedex` renders `PokémonModal` only when `selectedPokemon` is set. Clicking the overlay or the close button resets the state and hides the modal.

## API Reference

This project consumes the public **[PokeAPI v2](https://pokeapi.co/api/v2/)**. All requests are wrapped in [`src/services/pokeApi.js`](./src/services/pokeApi.js):

| Endpoint | Helper | Used for |
|---|---|---|
| `GET /pokemon?limit={n}&offset={o}` | `getPokemons()` | Pokémon list (id/reference only) |
| `GET /pokemon/{id}` | `getPokemon()` | Full Pokémon details: sprite, id, name, types, height, weight, abilities |
| `GET /type` | `getTypes()` | All Pokémon types (unused in the current UI) |

**Note:** the PokeAPI terms of service require you to acknowledge the API — the project already credits the author in the footer.

## Built as a learning project

This repo is a teaching exercise for React fundamentals: components and props, component state lifting (`onSelect` callback), fetching with `useState`/`useEffect`, conditional rendering (`{selectedPokemon && <Modal/>}`), and plain CSS theming with custom properties (CSS variables).

## License

This is a learning project; feel free to fork it. Pokémon is a trademark of Nintendo / Game Freak / The Pokémon Company — this project is not affiliated with or endorsed by them.