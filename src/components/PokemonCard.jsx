import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getPokemon } from '../services/pokeApi'
import { capitalize } from '../utils/capitalize'
import { TYPE_COLORS } from '../data/types'

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
  const sprite =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default

  return (
    <article
      className="card-gradient relative cursor-pointer overflow-hidden rounded-2xl border-2 border-(--card-border) p-4 text-center shadow-[0_4px_12px_var(--card-shade)] transition-[transform,box-shadow,border-color] duration-300 before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-[45%] before:rotate-[10deg] before:translate-x-[-115%] before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.4),transparent)] before:transition-transform before:duration-[600ms] hover:-translate-y-1 hover:border-(--card-color) hover:shadow-[0_10px_24px_var(--card-shade-hover)] hover:card-gradient-hover hover:before:translate-x-[300%]"
      style={{ '--card-color': TYPE_COLORS[primaryType] }}
      onClick={() => onSelect(pokemon)}
    >
      <img
        src={sprite}
        alt={pokemon.name}
        className="mx-auto h-32 w-32 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
      />
      <p className="mt-2 text-xs opacity-70"># {pokemon.id}</p>
      <h2 className="my-1.5 text-xl font-bold capitalize">{capitalize(pokemon.name)}</h2>
      <p className="flex flex-wrap justify-center gap-1.5">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="rounded-full bg-(--type) px-2.5 py-0.5 text-xs capitalize text-white"
            style={{ '--type': TYPE_COLORS[t.type.name] }}
          >
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
