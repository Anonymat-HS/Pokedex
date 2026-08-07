import PropTypes from 'prop-types'
import PokemonCard from './PokemonCard'

// Displays the list of pokémons.
// count = how many pokémons to display (default 50).
// onSelect = function called when a card is clicked (passed to each one).
export default function PokemonList({ count = 50, onSelect }) {
  // Array.from creates an array of `count` slots.
  // The 2nd argument transforms each slot: index goes from 0 to count-1,
  // so index + 1 gives ids from 1 to count.
  // Result: [1, 2, 3, ..., 50]
  const ids = Array.from({ length: count }, (_, index) => index + 1)

  return (
    <div className="pokemon-list">
      {/* .map() renders one PokemonCard per id. Each card does its own
          fetch, so each one handles its own "Loading..." state.
          onSelect is forwarded to every card. */}
      {ids.map((id) => (
        <PokemonCard key={id} id={id} onSelect={onSelect} />
      ))}
    </div>
  )
}

PokemonList.propTypes = {
  count: PropTypes.number,
  onSelect: PropTypes.func,
}