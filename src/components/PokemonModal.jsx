import PropTypes from 'prop-types'
import { capitalize } from '../utils/capitalize'
import { TYPE_COLORS } from '../data/types'

const STAT_COLORS = {
  hp: '#ff5959',
  attack: '#f08030',
  defense: '#f8d030',
  'special-attack': '#6890f0',
  'special-defense': '#78c850',
  speed: '#f85888',
}

export default function PokemonModal({ pokemon, onClose }) {
  const primaryType = pokemon.types[0].type.name
  const sprite =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/60"
      onClick={onClose}
    >
      <div
        className="card-gradient relative flex w-[90%] max-w-[440px] flex-col items-center gap-3 rounded-[20px] border-2 border-(--card-border) p-8 text-center shadow-[0_12px_40px_var(--modal-shade)]"
        style={{ '--card-color': TYPE_COLORS[primaryType] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 z-10 h-8 w-8 cursor-pointer rounded-full bg-black/35 text-xl leading-none text-white transition-colors duration-200 hover:bg-black/60"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <img
          src={sprite}
          alt={pokemon.name}
          className="h-48 w-48 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
        />
        <p className="text-sm opacity-80">
          # {String(pokemon.id).padStart(3, '0')}
        </p>
        <h2 className="my-1 text-2xl font-bold capitalize">{capitalize(pokemon.name)}</h2>

        <div className="flex flex-wrap justify-center gap-1.5">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="rounded-full bg-(--type) px-2.5 py-0.5 text-xs capitalize text-white"
              style={{ '--type': TYPE_COLORS[t.type.name] }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="my-5 flex justify-center gap-8">
          <div>
            <p className="text-xl font-semibold">{pokemon.height / 10} m</p>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Height
            </span>
          </div>
          <div>
            <p className="text-xl font-semibold">{pokemon.weight / 10} kg</p>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Weight
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-sm uppercase tracking-wider">Abilities</h3>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {pokemon.abilities.map((a) => (
            <span
              key={a.ability.name}
              className="rounded-full border border-(--card-color) bg-[color-mix(in_srgb,var(--card-color)_12%,transparent)] px-2.5 py-0.5 text-xs capitalize text-(--text)"
            >
              {a.ability.name.replaceAll('-', ' ')}
            </span>
          ))}
        </div>

        <h3 className="mt-3 text-sm uppercase tracking-wider">Stats</h3>
        <div className="mt-2 flex w-full max-w-[320px] flex-col gap-1.5">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0 text-left capitalize">
                {s.stat.name.replaceAll('-', ' ')}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/20">
                <div
                  className="h-full rounded-full bg-(--stat-color) shadow-[0_0_8px_var(--stat-color)]"
                  style={{
                    '--stat-color': STAT_COLORS[s.stat.name],
                    width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-semibold">
                {s.base_stat}
              </span>
            </div>
          ))}
        </div>

        <h3 className="mt-3 text-sm uppercase tracking-wider">Moves</h3>
        <div className="mt-2 flex max-h-[180px] w-full max-w-[340px] flex-wrap justify-center gap-1.5 overflow-y-auto">
          {[...pokemon.moves]
            .sort((a, b) => a.move.name.localeCompare(b.move.name))
            .map((m) => (
              <span
                key={m.move.name}
                className="rounded-full border border-(--card-color) bg-[color-mix(in_srgb,var(--card-color)_20%,transparent)] px-2.5 py-0.5 text-xs capitalize text-(--text)"
              >
                {m.move.name.replaceAll('-', ' ')}
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
