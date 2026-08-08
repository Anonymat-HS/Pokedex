import { useEffect, useState } from 'react'
import PokemonList from '../components/PokemonList'
import PokemonModal from '../components/PokemonModal'
import ThemeToggle from '../components/ThemeToggle'

function Pokedex() {
  // selectedPokemon = the clicked pokémon (null while nothing is selected).
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  // ── Thème clair/sombre ──
  // Au premier chargement on suit la préférence du système
  // (prefers-color-scheme) si l'utilisateur n'a pas déjà choisi
  // manuellement (localStorage). Le choix manuel est prioritaire.
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // À chaque changement de `dark`, on bascule la classe sur <html>
  // (toutes les couleurs du site viennent du CSS : .dark les
  // redéfinit) et on mémorise le choix pour la prochaine visite.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

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
      {/* Header: title on the left, theme toggle on the right
          (flex with justify-content: space-between). */}
      <header className="pokedex-header">
        <h1 className="pokedex-title">
          <span className="title-poke">Poké</span>
          <span className="title-dex">dex</span>
        </h1>

        <ThemeToggle dark={dark} onToggle={setDark} />
      </header>

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
