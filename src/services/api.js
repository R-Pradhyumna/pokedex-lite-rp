const API_BASE = "https://pokeapi.co/api/v2";

// Shared fetch helper
async function safeFetch(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const message = `Request failed: ${res.status} ${res.statusText}`;
    if (import.meta.env.DEV) {
      // Only log in dev to avoid noisy consoles in prod
      console.error(message);
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * Get a paginated list of Pokémon for the main grid.
 * Priority:
 * 1) If `search` is set → fetch single Pokémon by name/id.
 * 2) Else if `type` !== "all" → fetch by type and paginate on client.
 * 3) Else → default /pokemon list with limit+offset.
 */
export async function fetchPokemonList({
  page = 1,
  limit = 21,
  search = "",
  type = "all",
}) {
  // 1) SEARCH: /pokemon/{name}
  if (search) {
    const pokemon = await safeFetch(
      `${API_BASE}/pokemon/${encodeURIComponent(search.toLowerCase())}`
    );

    // Normalize into list-like shape
    return {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: pokemon.name,
          url: `${API_BASE}/pokemon/${pokemon.name}`,
        },
      ],
    };
  }

  // 2) TYPE FILTER: /type/{type} (client-side pagination)
  if (type && type !== "all") {
    const typeData = await safeFetch(
      `${API_BASE}/type/${encodeURIComponent(type.toLowerCase())}`
    ); // contains `pokemon: [{ pokemon: { name, url }, slot }, ...]` [file:1]

    const fullList = typeData.pokemon.map((entry) => entry.pokemon);

    const start = (page - 1) * limit;
    const end = page * limit;
    const slice = fullList.slice(start, end);

    return {
      count: fullList.length,
      next: end < fullList.length ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
      results: slice, // [{ name, url }]
    };
  }

  // 3) DEFAULT LIST: /pokemon?limit=&offset=
  const offset = (page - 1) * limit;
  return safeFetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`); // returns count, next, previous, results[] [web:19]
}

/**
 * Get full details for a single Pokémon (for cards and modal).
 * Includes sprites, stats, abilities, types, etc.
 */
export async function fetchPokemonDetails(name) {
  return safeFetch(
    `${API_BASE}/pokemon/${encodeURIComponent(name.toLowerCase())}`
  );
}

/**
 * Fetch all types, useful if you later want dynamic type chips
 * instead of a hardcoded list.
 */
export async function fetchPokemonTypes() {
  const data = await safeFetch(`${API_BASE}/type`);
  return data.results; // [{ name, url }, ...]
}
