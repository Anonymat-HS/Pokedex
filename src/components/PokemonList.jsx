import PropTypes from 'prop-types'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import SearchBar from './SearchBar'
import { usePokemon } from '../hooks/usePokemon'

export default function PokemonList({ count = 50, onSelect }) {

  const { pokemons } = usePokemon(count)

  const [searchTerm, setSearchTerm] = useState('')

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function idFromUrl(url) {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
  }

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />

      <div className="pokemon-list">
        {filtered.length === 0 ? (
          <p className="empty-message">Aucun pokémon trouvé</p>
        ) : (

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