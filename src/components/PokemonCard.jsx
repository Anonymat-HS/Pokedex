import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getPokemon } from '../services/pokeApi'
import { capitalize } from '../utils/capitalize'

export default function PokemonCard({ id, onSelect }) {

  const [pokemon, setPokemon] = useState(null)

  const [error, setError] = useState(null)

  useEffect(() => {

    getPokemon(id)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err))
  }, [id])

  if (error) return <p>Error: {error.message}</p>
  if (!pokemon) return <p>Loading...</p>

  const primaryType = pokemon.types[0].type.name

  return (

    <article
      className={`pokemon-card pokemon-card--${primaryType}`}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p># {pokemon.id}</p>
      <h2>{capitalize(pokemon.name)}</h2>
      <p className="pokemon-types">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </p>
    </article>
  )
}

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
}