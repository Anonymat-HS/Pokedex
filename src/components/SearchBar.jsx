import PropTypes from 'prop-types'

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="search"
      placeholder="Search a Pokémon..."
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}