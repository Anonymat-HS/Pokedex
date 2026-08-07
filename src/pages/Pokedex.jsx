import { useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonModal from '../components/PokemonModal'

function Pokedex() {
  // selectedPokemon = the clicked pokémon (null while nothing is selected).
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // This function is passed to every card. It receives the clicked
  // pokémon and stores it in state.
  function handleSelect(pokemon) {
    setSelectedPokemon(pokemon)
  }

  // The modal is closed by setting selectedPokemon back to null.
  function closeModal() {
    setSelectedPokemon(null)
  }

  return (
    <section>
      {/* Title split in two colors: "Poké" in Pokéball red, "dex" in
          dark gray — we split the text into two <span> so they can
          be colored separately in CSS. */}
      <h1 className="pokedex-title">
        <span className="title-poke">Poké</span>
        <span className="title-dex">dex</span>
      </h1>

      {/* List of the first 50 pokémons */}
      <PokemonList count={50} onSelect={handleSelect} />

      {/* Footer: discreet signature at the bottom of the page.
          <footer> has a semantic role (page footer) and nothing here
          prevents it from living inside the <section>. */}
      <footer className="footer">
        <p>H.S © 2026</p>
      </footer>

      {/* The modal is only rendered when selectedPokemon is not null:
          {cond && <Comp />} → React renders the component when cond is
          true, and nothing at all otherwise. */}
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </section>
  )
}

export default Pokedex
