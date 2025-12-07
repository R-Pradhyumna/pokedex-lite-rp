import { useMemo, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

import styles from "../pages/Homepage.module.css";

import { useList } from "../hooks/usePokemonList.js";

function PokemonGrid({
  search,
  selectedType,
  showFavoritesOnly,
  favoritesCount,
  isFavorite,
  toggleFavorite,
  onToggleShowFavorites,
  onSelectPokemon,
}) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useList({
    page,
    search,
    type: selectedType,
  });

  const visiblePokemon = useMemo(() => {
    const allResults = data?.results || [];

    return showFavoritesOnly
      ? allResults.filter((p) => isFavorite(p.name))
      : allResults;
  }, [data?.results, showFavoritesOnly, isFavorite]);

  const isDefaultList = !search && selectedType === "all";

  return (
    <>
      {/* Grid header */}
      <section className={styles.gridHeaderSection}>
        <div className={styles.gridTitle}>
          <h2>Pokémon</h2>
          <p>Browse and filter Pokémon by type, search, and favorites.</p>
        </div>
        <div className={styles.gridToggles}>
          <label className={styles.favoritesToggle}>
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => onToggleShowFavorites(e.target.checked)}
            />
            <span>Show favorites only ({favoritesCount})</span>
          </label>
        </div>
      </section>

      {/* Grid section */}
      <section className={styles.gridSection}>
        {isLoading ? (
          <p>Loading..</p>
        ) : error ? (
          <p>Failed to load Pokémon: {error.message}</p>
        ) : visiblePokemon.length === 0 ? (
          <p>No Pokémon found.</p>
        ) : (
          <div className={styles.pokemonGrid}>
            {visiblePokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                isFavorite={isFavorite(pokemon.name)}
                onToggleFavorite={() => toggleFavorite(pokemon.name)}
                onSelect={() => onSelectPokemon(pokemon.name)}
              />
            ))}
          </div>
        )}

        <div className={styles.paginationRow}>
          <button
            className={styles.paginationButton}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            disabled={!data?.next && isDefaultList}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
          {isFetching && !isLoading && (
            <span className={styles.updatingBadge}>Updating…</span>
          )}
        </div>
      </section>
    </>
  );
}

export default PokemonGrid;
