import PropTypes from 'prop-types'
import PokemonCard from './PokemonCard'

// Affiche la liste des pokémons.
// count = combien de pokémons afficher (par défaut 50).
// onSelect = fonction appelée quand on clique sur une carte (transmise à chacune).
export default function PokemonList({ count = 50, onSelect }) {
  // Array.from crée un tableau de `count` cases.
  // Le 2e argument transforme chaque case : l'index va de 0 à count-1,
  // donc index + 1 donne les ids de 1 à count.
  // Résultat : [1, 2, 3, ..., 50]
  const ids = Array.from({ length: count }, (_, index) => index + 1)

  return (
    <div className="pokemon-list">
      {/* .map() rend un PokemonCard par id. Chaque carte fait son propre
          fetch, donc chacune gère son propre "Chargement..."
          On transmet onSelect à chaque carte. */}
      {ids.map((id) => (
        <PokemonCard key={id} id={id} onSelect={onSelect} />
      ))}
    </div>
  )
}

PokemonList.propTypes = {
  count: PropTypes.number,
  onSelect: PropTypes.func,
}
