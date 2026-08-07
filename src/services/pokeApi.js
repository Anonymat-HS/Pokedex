// Base URL of the PokeAPI (version 2 of the API).
// All our requests start from this root.
const BASE_URL = 'https://pokeapi.co/api/v2'

// Fetches the list of pokémons (limit = number, offset = offset).
// NB: this list only contains the name and a URL, not a sprite or types.
export async function getPokemons(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Error while loading Pokémon names')
  return res.json()
}

// Fetches the FULL details of a single pokémon.
// URL format: https://pokeapi.co/api/v2/pokemon/{id ou nom}
// Example: /pokemon/1 → Bulbasaur
// Why this format? The API separates the list (lightweight) from the
// detail (complete). This detail contains the sprite
// (sprites.front_default) and the types (types[].type.name).
export async function getPokemon(idOrName) {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  if (!res.ok) throw new Error(`Pokémon "${idOrName}" not found`)
  return res.json()
}

export async function getTypes() {
  const res = await fetch(`${BASE_URL}/type`)
  if (!res.ok) throw new Error('Error while loading the types')
  return res.json()
}