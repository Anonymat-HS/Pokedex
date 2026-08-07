import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getPokemon } from '../services/pokeApi'
import { capitalize } from '../utils/capitalize'

// Ce composant reçoit un id (ex: 1) et va chercher LUI-MÊME les données
// du pokémon correspondant sur l'API.
// onSelect = fonction appelée quand on clique sur la carte.
export default function PokemonCard({ id, onSelect }) {
  // useState sert à stocker des données qui changent dans le temps.
  // pokemon = les données reçues de l'API (null tant qu'on n'a rien).
  const [pokemon, setPokemon] = useState(null)
  // error = le message d'erreur éventuel (null = pas d'erreur).
  const [error, setError] = useState(null)

  // useEffect déclenche du code quand le composant est monté (affiché),
  // et à chaque fois que la valeur de [id] change.
  // Pourquoi ici et pas dans le render ? Parce que fetch est ASYNCHRONE :
  // on ne peut pas attendre son résultat pendant l'affichage.
  // On lance donc la requête ici, et on met à jour l'état quand elle finit.
  useEffect(() => {
    // getPokemon(id) fait le fetch vers https://pokeapi.co/api/v2/pokemon/{id}
    // (voir services/pokeApi.js). Il renvoie une Promesse :
    //   .then()  → exécuté si la requête réussit (data = le pokémon complet)
    //   .catch() → exécuté si l'API ne répond pas / renvoie une erreur
    getPokemon(id)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err))
  }, [id])

  // Tant qu'on a pas reçu de données (et pas d'erreur) : on est en chargement.
  if (error) return <p>Erreur : {error.message}</p>
  if (!pokemon) return <p>Chargement...</p>

  // primaryType = le premier type du pokémon, utilisé pour choisir
  // la classe CSS qui applique le dégradé de fond (ex: pokemon-card--fire).
  const primaryType = pokemon.types[0].type.name

  return (
    // onClick appelle onSelect avec le pokémon complet de la carte.
    // Le parent (Pokedex) le stocke dans son state selectedPokemon.
    <article
      className={`pokemon-card pokemon-card--${primaryType}`}
      onClick={() => onSelect(pokemon)}
    >
      {/* Le sprite (image officielle) se trouve dans sprites.front_default */}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {/* L'id retourné par l'API (#001, ...) */}
      <p># {pokemon.id}</p>
      {/* capitalize rend le nom lisible : "bulbasaur" -> "Bulbasaur" */}
      <h2>{capitalize(pokemon.name)}</h2>
      {/* Chaque type devient une pastille colorée (badge) */}
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
