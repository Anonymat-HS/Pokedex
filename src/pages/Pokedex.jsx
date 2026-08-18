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
      <header className="flex items-center justify-between gap-4">
        <h1 className="font-bangers text-5xl leading-none tracking-[3px] [text-shadow:3px_3px_0_rgba(0,0,0,0.2)]">
          <span className="text-(--poke-red)">Poké</span>
          <span className="text-(--poke-dark)">dex</span>
        </h1>

        <ThemeToggle dark={dark} onToggle={setDark} />
      </header>

      <PokemonList count={100} onSelect={handleSelect} />

      <footer className="mt-8 text-center">
        <p className="text-sm text-(--muted)">H.S © 2026</p>
      </footer>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </section>
  )
}

export default Pokedex
