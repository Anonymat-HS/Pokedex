import PropTypes from 'prop-types'

// Bouton de bascule clair/sombre.
// dark = état actuel du thème (true = sombre).
// onToggle = fonction appelée au clic (reçoit dark ? false : true).
// L'icône montre le thème vers lequel on bascule : 🌙 en clair
// (clic → sombre), ☀️ en sombre (clic → clair).
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