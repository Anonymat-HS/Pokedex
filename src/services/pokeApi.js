// URL de base de l'API PokeAPI (version 2 de l'API).
// Toutes nos requêtes partent de cette racine.
const BASE_URL = 'https://pokeapi.co/api/v2'

// Récupère la liste des pokémons (limite = nombre, offset = décalage).
// NB : cette liste ne contient que le nom et une URL, pas le sprite ni les types.
export async function getPokemons(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Erreur lors du chargement des Pokémons')
  return res.json()
}

// Récupère LE détail complet d'un pokémon.
// Format d'URL : https://pokeapi.co/api/v2/pokemon/{id ou nom}
// Exemple : /pokemon/1  → Bulbasaur
// Pourquoi ce format ? L'API distingue la liste (légère) du détail (complet).
// C'est dans ce détail qu'on trouve le sprite (sprites.front_default)
// et les types (types[].type.name).
export async function getPokemon(idOrName) {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  if (!res.ok) throw new Error(`Pokémon "${idOrName}" introuvable`)
  return res.json()
}

export async function getTypes() {
  const res = await fetch(`${BASE_URL}/type`)
  if (!res.ok) throw new Error('Erreur lors du chargement des types')
  return res.json()
}
