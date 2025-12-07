import { useEffect, useRef } from "react";
import styles from "../pages/Homepage.module.css";

import { useDetails } from "../hooks/usePokemonList";

function PokemonModal({ name, onClose }) {
  const { data, isLoading, error } = useDetails(name);
  const dialogRef = useRef(null);

  // Open dialog when mounted
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  if (!name) return null;

  const sprite = data?.sprites?.front_default;
  const types = data?.types ?? [];
  const stats = data?.stats ?? [];
  const abilities = data?.abilities ?? [];

  return (
    <dialog ref={dialogRef} className={styles.pokemonDialog}>
      <div className={styles.pokemonDialogContent}>
        <button
          type="button"
          className={styles.pokemonDialogClose}
          onClick={onClose}
        >
          ✕
        </button>

        {isLoading && <p>Loading details…</p>}
        {error && <p>Failed to load details.</p>}

        {data && (
          <>
            <header className={styles.pokemonDialogHeader}>
              {sprite && (
                <img
                  src={sprite}
                  alt={name}
                  className={styles.pokemonDialogSprite}
                />
              )}
              <div>
                <h2 className={styles.pokemonDialogTitle}>{data.name}</h2>
                <p className={styles.pokemonDialogTypes}>
                  {types.map((t) => t.type.name).join(", ")}
                </p>
              </div>
            </header>

            <section className={styles.pokemonDialogSection}>
              <h3>Stats</h3>
              <ul className={styles.pokemonDialogStats}>
                {stats.map((s) => (
                  <li key={s.stat.name}>
                    <span>{s.stat.name}</span>
                    <span>{s.base_stat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.pokemonDialogSection}>
              <h3>Abilities</h3>
              <ul>
                {abilities.map((a) => (
                  <li key={a.ability.name}>{a.ability.name}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </dialog>
  );
}

export default PokemonModal;
