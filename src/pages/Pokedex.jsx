import { useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonModal from '../components/PokemonModal'

function Pokedex() {
  // selectedPokemon = le pokémon cliqué (null tant qu'on n'a rien cliqué).
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // Cette fonction est transmise à chaque carte. Elle reçoit le pokémon
  // cliqué et le stocke dans le state.
  function handleSelect(pokemon) {
    setSelectedPokemon(pokemon)
  }

  // Le modal est fermé quand on remet selectedPokemon à null.
  function closeModal() {
    setSelectedPokemon(null)
  }

  return (
    <section>
      {/* Titre en deux couleurs : "Poké" en rouge Pokéball, "dex" en
          gris foncé — on scinde le texte en deux <span> pour pouvoir
          les colorer séparément en CSS. */}
      <h1 className="pokedex-title">
        <span className="title-poke">Poké</span>
        <span className="title-dex">dex</span>
      </h1>

      {/* Liste des 50 premiers pokémons */}
      <PokemonList count={50} onSelect={handleSelect} />

      {/* Le modal n'est rendu QUE si selectedPokemon n'est pas null :
          {cond && <Comp />} → React affiche le composant si cond est vrai,
          et rien du tout sinon. */}
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </section>
  )
}

export default Pokedex
