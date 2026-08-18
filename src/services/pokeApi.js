const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemons(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Error while loading Pokémon names')
  return res.json()
}

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