import PropTypes from 'prop-types'
import { capitalize } from '../utils/capitalize'

// Detailed pokémon profile, displayed in a modal above the grid.
// pokemon = the clicked pokémon (received from the parent Pokedex)
// onClose  = parent function that resets selectedPokemon to null
export default function PokemonModal({ pokemon, onClose }) {
  // primaryType = same logic as in the card: used for the modal
  // background gradient, to stay consistent with the grid.
  const primaryType = pokemon.types[0].type.name

  return (
    // The overlay is the dark semi-transparent backdrop covering the
    // whole screen. Why does it close on click? It is the expected
    // behavior of a modal: clicking "outside" = cancel. Since the
    // modal content lives INSIDE the overlay, onClose is triggered on
    // the overlay...
    <div className="modal-overlay" onClick={onClose}>
      {/* ...but the click propagation is stopped on the content
          (stopPropagation), otherwise clicking inside the modal
          would close it! */}
      <div
        className={`modal-content pokemon-card--${primaryType}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button: triggers onClose → selectedPokemon = null */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* Image bigger than in the grid */}
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        {/* Id, padded to 3 digits: 1 -> 001 */}
        <p># {String(pokemon.id).padStart(3, '0')}</p>
        <h2>{capitalize(pokemon.name)}</h2>

        {/* Same type badges as in the cards → same colors */}
        <div className="pokemon-types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>

        {/* ── Height and weight ──
            PokeAPI returns height in DECIMETERS and weight in
            HECTOGRAMS. Those units are not user-friendly, so we
            convert them:
            • 1 dm = 0.1 m  → height / 10
            • 1 hg = 0.1 kg → weight / 10 */}
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

        {/* ── Abilities ──
            pokemon.abilities is an array: [{ ability: { name }, ... }].
            .map() turns each item into a <span> tag — same pattern as
            for types. We only keep ability.name (not .is_hidden or
            .slot). */}
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