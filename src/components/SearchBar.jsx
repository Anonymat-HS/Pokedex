import PropTypes from 'prop-types'

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Rechercher un pokémon..."
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}