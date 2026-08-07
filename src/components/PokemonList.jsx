import PropTypes from 'prop-types'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import SearchBar from './SearchBar'
import { usePokemon } from '../hooks/usePokemon'

// Affiche la liste des pokémons.
// count = combien de pokémons afficher (par défaut 50).
// onSelect = fonction appelée quand on clique sur une carte (transmise à chacune).
export default function PokemonList({ count = 50, onSelect }) {
  // usePokemon(count) récupère la LISTE des noms (et des ids via url)
  // UNE SEULE fois au chargement, puis la garde en mémoire.
  // C'est sur ces données déjà chargées qu'on filtre — aucun nouvel
  // appel API à chaque frappe.
  const { pokemons } = usePokemon(count)

  // searchTerm contient ce que l'utilisateur tape dans la barre.
  // Pourquoi ce state est-il ICI et pas dans une carte ? Parce que
  // le filtrage concerne la LISTE ENTIÈRE : le composant qui possède
  // la liste (ici PokemonList) est le seul qui peut décider quelles
  // cartes montrer. On parle de "lifting state up" : le state vit au
  // niveau du parent qui a besoin de la valeur.
  const [searchTerm, setSearchTerm] = useState('')

  // ── Le filtrage en mémoire ──
  // .filter() boucle dans `pokemons` et garde uniquement les éléments
  // dont la CONDITION est vraie. Ici : le nom contient searchTerm.
  // toLowerCase() des deux côtés rend le filtre INSENSIBLE à la casse :
  // "PIK" matche "pikachu" comme "PIKACHU". .includes() vérifie une
  // sous-chaîne, donc ça marche dès la première lettre, sans Entrée.
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // L'id d'un pokémon est caché dans son url API (".../pokemon/25").
  // On l'extrait pour pouvoir relier la carte à son fetch exact.
  function idFromUrl(url) {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
  }

  return (
    <>
      {/* La barre de recherche : onSearch reçoit la valeur tapée à CHAQUE
          changement (onChange) → le filtre se met à jour en temps réel. */}
      <SearchBar onSearch={setSearchTerm} />

      <div className="pokemon-list">
        {/* Si le filtre ne matche rien, on affiche un message
            à la place de la grille vide. */}
        {filtered.length === 0 ? (
          <p className="empty-message">Aucun pokémon trouvé</p>
        ) : (
          /* On rend une PokemonCard par élément filtré. Chaque carte
             fait son propre fetch de détail (sprite, types...), donc
             cette partie fonctionne comme avant. */
          filtered.map((p) => (
            <PokemonCard key={p.name} id={idFromUrl(p.url)} onSelect={onSelect} />
          ))
        )}
      </div>
    </>
  )
}

PokemonList.propTypes = {
  count: PropTypes.number,
  onSelect: PropTypes.func,
}