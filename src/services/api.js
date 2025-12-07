const API_BASE = "https://pokeapi.co/api/v2";

/**
 * Get a paginated list of Pokémon for the main grid.
 * Priority A:
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
  try {
    // 1) SEARCH: /pokemon/{name}
    if (search) {
      const res = await fetch(
        `${API_BASE}/pokemon/${encodeURIComponent(search.toLowerCase())}`
      );

      if (!res.ok) {
        throw new Error("Pokémon not found");
      }

      const pokemon = await res.json();

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
      const res = await fetch(
        `${API_BASE}/type/${encodeURIComponent(type.toLowerCase())}`
      );

      if (!res.ok) {
        throw new Error(`Type "${type}" not found`);
      }

      const typeData = await res.json(); // contains `pokemon: [{ pokemon: { name, url }, slot }, ...]`
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
    const res = await fetch(
      `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
    ); // returns count, next, previous, results[] [web:13][web:19]

    if (!res.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }

    return await res.json();
  } catch (error) {
    console.error("PokéAPI list error:", error);
    throw error;
  }
}

/**
 * Get full details for a single Pokémon (for cards and modal).
 * Includes sprites, stats, abilities, types, etc. [web:16]
 */
export async function fetchPokemonDetails(name) {
  try {
    const res = await fetch(
      `${API_BASE}/pokemon/${encodeURIComponent(name.toLowerCase())}`
    );

    if (!res.ok) {
      throw new Error(`Pokémon "${name}" not found`);
    }

    return await res.json();
  } catch (error) {
    console.error("PokéAPI details error:", error);
    throw error;
  }
}

/**
 * (Optional) Fetch all types, useful if you later want dynamic type chips
 * instead of a hardcoded list. [web:10][web:19]
 */
export async function fetchPokemonTypes() {
  try {
    const res = await fetch(`${API_BASE}/type`);

    if (!res.ok) {
      throw new Error("Failed to fetch Pokémon types");
    }

    const data = await res.json();
    return data.results; // [{ name, url }, ...]
  } catch (error) {
    console.error("PokéAPI types error:", error);
    throw error;
  }
}
