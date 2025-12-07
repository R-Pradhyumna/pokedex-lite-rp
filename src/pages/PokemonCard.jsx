import { useDetails } from "../hooks/usePokemonList.js";
import styles from "../pages/Homepage.module.css";

function PokemonCard({ name, isFavorite, onToggleFavorite, onSelect }) {
  const { data, isLoading } = useDetails(name);

  const sprite = data?.sprites?.front_default;
  const types = data?.types ?? [];

  return (
    <div className={styles.pokemonCard} onClick={onSelect}>
      <div className={styles.pokemonCardHeader}>
        <h3 className={styles.pokemonName}>{name}</h3>
        <button
          type="button"
          className={
            isFavorite ? styles.favoriteButtonActive : styles.favoriteButton
          }
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className={styles.pokemonCardBody}>
        <div className={styles.pokemonImagePlaceholder}>
          {isLoading ? (
            "Loading…"
          ) : sprite ? (
            <img
              src={sprite}
              alt={name}
              className={styles.pokemonSprite}
              loading="lazy"
            />
          ) : (
            "Sprite"
          )}
        </div>
        <div className={styles.pokemonTypesPlaceholder}>
          {types.length > 0
            ? types.map((t) => t.type.name).join(", ")
            : "Types"}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
