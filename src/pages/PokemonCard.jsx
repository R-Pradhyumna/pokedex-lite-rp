import styles from "./PokemonCard.module.css";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useDetails } from "../hooks/usePokemonList.js";

function PokemonCard({ name, isFavorite, onToggleFavorite, onSelect }) {
  const { data, isLoading } = useDetails(name);

  const sprite = data?.sprites?.front_default;
  const types = data?.types ?? [];
  const id = data?.id;

  const primaryType = types[0]?.type?.name;

  const hpStat = data?.stats?.find((s) => s.stat?.name === "hp");
  const hp = hpStat?.base_stat;

  return (
    <div className={styles.pokemonCard} onClick={onSelect}>
      <div className={styles.pokemonCardHeader}>
        <h3 className={styles.pokemonName}>
          {id ? `${id.toString().padStart(3, "0")} ` : ""}
          {name}
        </h3>
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
          {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
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

        <div className={styles.pokemonMetaRow}>
          <span
            className={`${styles.typeChip} ${
              primaryType ? styles[`typeChip-${primaryType}`] || "" : ""
            }`}
          >
            {types.length > 0
              ? types.map((t) => t.type.name).join(", ")
              : "Types"}
          </span>

          {hp && <span className={styles.hpChip}>HP {hp}</span>}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
