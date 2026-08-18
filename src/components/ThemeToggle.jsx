import PropTypes from 'prop-types'

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      onClick={() => onToggle(!dark)}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

ThemeToggle.propTypes = {
  dark: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}