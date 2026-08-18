import PropTypes from 'prop-types'

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="search"
      className="my-4 w-full max-w-[400px] rounded-full border-2 border-(--border) bg-(--panel) px-4 py-2.5 text-(--text) outline-none transition-colors duration-200 focus:border-(--poke-red)"
      placeholder="Rechercher un pokémon..."
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}
