import PropTypes from 'prop-types'
import { capitalize } from '../utils/capitalize'

// Profil détaillé du pokémon, affiché en modal par-dessus la grille.
// pokemon = le pokémon cliqué (reçu du parent Pokedex)
// onClose  = fonction du parent qui remet selectedPokemon à null
export default function PokemonModal({ pokemon, onClose }) {
  // primaryType = même logique que dans la carte : sert pour le dégradé
  // de fond du modal, pour rester cohérent avec la grille.
  const primaryType = pokemon.types[0].type.name

  return (
    // L'overlay est le fond sombre semi-transparent qui couvre tout l'écran.
    // Pourquoi il ferme au clic ? C'est le comportement attendu d'un modal :
    // cliquer "à côté" = annuler. Comme le contenu du modal est DANS
    // l'overlay, on déclenche onClose sur l'overlay...
    <div className="modal-overlay" onClick={onClose}>
      {/* ...mais on stoppe la propagation du clic sur le contenu
          (stopPropagation), sinon cliquer dans le modal le fermerait ! */}
      <div
        className={`modal-content pokemon-card--${primaryType}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture : ramène onClose → selectedPokemon = null */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        {/* Image plus grande que dans la grille */}
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        {/* L'id, formaté sur 3 chiffres : 1 -> 001 */}
        <p># {String(pokemon.id).padStart(3, '0')}</p>
        <h2>{capitalize(pokemon.name)}</h2>

        {/* Mêmes badges de types que dans les cartes → mêmes couleurs */}
        <div className="pokemon-types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type-badge type-badge--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>

        {/* ── Taille et poids ──
            PokeAPI renvoie height en DÉCIMÈTRES et weight en HECTOGRAMMES.
            Ces unités ne parlent à personne, on les convertit :
            • 1 dm = 0,1 m  → height / 10
            • 1 hg = 0,1 kg → weight / 10
            (toFixed(1) pour afficher une décimale propre, ex "0,7 m") */}
        <div className="modal-stats">
          <div>
            <p>{pokemon.height / 10} m</p>
            <span>Taille</span>
          </div>
          <div>
            <p>{pokemon.weight / 10} kg</p>
            <span>Poids</span>
          </div>
        </div>

        {/* ── Capacités (abilities) ──
            pokemon.abilities est un tableau : [{ ability: { name }, ... }].
            .map() transforme chaque élément en un <span>:tag> — même
            principe que pour les types. On garde uniquement
            ability.name (pas .is_hidden ni .slot). */}
        <h3>Capacités</h3>
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