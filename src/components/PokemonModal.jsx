import PropTypes from 'prop-types'
import { capitalize } from '../utils/capitalize'

export default function PokemonModal({ pokemon, onClose }) {

  const primaryType = pokemon.types[0].type.name

  return (

    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content pokemon-card--${primaryType}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p># {String(pokemon.id).padStart(3, '0')}</p>
        <h2>{capitalize(pokemon.name)}</h2>

        <div className="pokemon-types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="modal-stats">
          <div>
            <p>{pokemon.height / 10} m</p>
            <span>Height</span>
          </div>
          <div>
            <p>{pokemon.weight / 10} kg</p>
            <span>Weight</span>
          </div>
        </div>

        <h3>Abilities</h3>
        <div className="ability-list">
          {pokemon.abilities.map((a) => (
            <span key={a.ability.name} className="ability-tag">
              {a.ability.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

PokemonModal.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}