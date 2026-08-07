import { useEffect, useState } from 'react'
import { getPokemons } from '../services/pokeApi'

export function usePokemon(limit = 20, offset = 0) {
  const [pokemons, setPokemons] = useState([])
  const [error, setError] = useState(null)
  const [requestKey, setRequestKey] = useState(null)

  const key = `${limit}-${offset}`
  const loading = requestKey !== key

  useEffect(() => {
    let cancelled = false

    getPokemons(limit, offset)
      .then((data) => {
        if (!cancelled) {
          setPokemons(data.results)
          setError(null)
          setRequestKey(key)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setRequestKey(key)
        }
      })

    return () => {
      cancelled = true
    }
  }, [limit, offset, key])

  return { pokemons, loading, error }
}
