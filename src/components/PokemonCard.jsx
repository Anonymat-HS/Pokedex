import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getPokemon } from '../services/pokeApi'
import { capitalize } from '../utils/capitalize'

// This component receives an id (e.g. 1) and fetches the data of the
// matching pokémon ITSELF from the API.
// onSelect = function called when the card is clicked.
export default function PokemonCard({ id, onSelect }) {
  // useState is used to store data that changes over time.
  // pokemon = data received from the API (null while we have nothing).
  const [pokemon, setPokemon] = useState(null)
  // error = possible error message (null = no error).
  const [error, setError] = useState(null)

  // useEffect runs code when the component is mounted (shown), and
  // every time the value of [id] changes.
  // Why here and not during render? Because fetch is ASYNCHRONOUS:
  // you cannot wait for its result while painting.
  // So the request is started here, and state is updated when it ends.
  useEffect(() => {
    // getPokemon(id) fetches https://pokeapi.co/api/v2/pokemon/{id}
    // (see services/pokeApi.js). It returns a Promise:
    //   .then()  → runs if the request succeeds (data = full pokémon)
    //   .catch() → runs if the API is unreachable / returns an error
    getPokemon(id)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err))
  }, [id])

  // While we have not received data (and no error): we are loading.
  if (error) return <p>Error: {error.message}</p>
  if (!pokemon) return <p>Loading...</p>

  // primaryType = first type of the pokémon, used to choose the CSS
  // class applying the background gradient (e.g. pokemon-card--fire).
  const primaryType = pokemon.types[0].type.name

  return (
    // onClick calls onSelect with the full card pokémon.
    // The parent (Pokedex) stores it in its selectedPokemon state.
    <article
      className={`pokemon-card pokemon-card--${primaryType}`}
      onClick={() => onSelect(pokemon)}
    >
      {/* The sprite (official image) lives in sprites.front_default */}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {/* The id returned by the API (#001, ...) */}
      <p># {pokemon.id}</p>
      {/* capitalize makes the name readable: "bulbasaur" -> "Bulbasaur" */}
      <h2>{capitalize(pokemon.name)}</h2>
      {/* Each type becomes a colored badge */}
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