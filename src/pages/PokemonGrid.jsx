import { useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

import styles from "./PokemonGrid.module.css";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
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
  const [pageInput, setPageInput] = useState("1");

  const { data, error, isFetching } = useList({
    page,
    search,
    type: selectedType,
  });

  const allResults = data?.results || [];

  const pageSize = 21;
  const isDefaultList = !search && selectedType === "all";
  const paginationDisabled = showFavoritesOnly;
  const totalCount = isDefaultList ? data?.count ?? 0 : 0;
  const totalPages =
    isDefaultList && totalCount ? Math.ceil(totalCount / pageSize) : page;

  const filteredByFavorites = showFavoritesOnly
    ? allResults.filter((p) => isFavorite(p.name))
    : allResults;

  const paginatedResults = showFavoritesOnly
    ? filteredByFavorites
    : filteredByFavorites;

  const visiblePokemon = paginatedResults;

  return (
    <>
      <section className={styles.gridSection}>
        <div className={styles.paginationRowTop}>
          <button
            type="button"
            className={styles.paginationButton}
            disabled={paginationDisabled || page === 1}
            aria-label="Go to previous page"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <span className={styles.paginationIcon}>
              <HiArrowLeft />
            </span>
            <span>Previous</span>
          </button>

          {isDefaultList && !paginationDisabled && totalPages > 1 && (
            <div className={styles.pageSelectWrapper}>
              <span className={styles.pageSelectLabel}>Page</span>
              <input
                type="number"
                className={styles.pageInput}
                min={1}
                max={totalPages}
                value={pageInput}
                aria-label="Current page number"
                onChange={(e) => {
                  const raw = e.target.value;
                  setPageInput(raw);
                  const val = Number(raw);
                  if (!Number.isNaN(val) && val >= 1 && val <= totalPages) {
                    setPage(val);
                  }
                }}
                onBlur={(e) => {
                  const raw = e.target.value;
                  const val = Number(raw);

                  if (!raw || Number.isNaN(val) || val < 1) {
                    setPage(1);
                    setPageInput("1");
                  } else if (val > totalPages) {
                    setPage(totalPages);
                    setPageInput(String(totalPages));
                  } else {
                    // valid value, normalise
                    setPage(val);
                    setPageInput(String(val));
                  }
                }}
              />

              <span className={styles.pageSelectLabel}>of {totalPages}</span>
            </div>
          )}

          <button
            type="button"
            className={styles.paginationButton}
            disabled={paginationDisabled || (!data?.next && isDefaultList)}
            aria-label="Go to next page"
            onClick={() => setPage((p) => p + 1)}
          >
            <span>Next</span>
            <span className={styles.paginationIcon}>
              <HiArrowRight />
            </span>
          </button>
        </div>

        {isFetching ? (
          <p>Loading..</p>
        ) : error ? (
          <p>Failed to load Pokémon: {error.message}</p>
        ) : visiblePokemon.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>🔍</p>
            <p className={styles.emptyText}>
              {showFavoritesOnly
                ? "No favorites yet! Tap the ❤️ on any Pokémon to save it."
                : search
                ? `No Pokémon named "${search}" found.`
                : selectedType !== "all"
                ? `No ${selectedType} Pokémon available.`
                : "No Pokémon found."}
            </p>
          </div>
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
      </section>
    </>
  );
}

export default PokemonGrid;
