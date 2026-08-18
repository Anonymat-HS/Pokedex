import { useEffect, useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonModal from '../components/PokemonModal'
import ThemeToggle from '../components/ThemeToggle'

function Pokedex() {

  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  function handleSelect(pokemon) {
    setSelectedPokemon(pokemon)
  }

  function closeModal() {
    setSelectedPokemon(null)
  }

  return (
    <section>
      <header className="pokedex-header">
        <h1 className="pokedex-title">
          <span className="title-poke">Poké</span>
          <span className="title-dex">dex</span>
        </h1>

        <ThemeToggle dark={dark} onToggle={setDark} />
      </header>

      <PokemonList count={50} onSelect={handleSelect} />

      <footer className="footer">
        <p>H.S © 2026</p>
      </footer>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </section>
  )
}

export default Pokedex
