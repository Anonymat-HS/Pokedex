import PropTypes from 'prop-types'

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      className="h-9 w-9 cursor-pointer rounded-full bg-(--toggle-bg) text-lg leading-none transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-(--toggle-bg-hover)"
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
