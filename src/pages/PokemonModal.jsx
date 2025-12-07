import { useEffect, useRef } from "react";
import styles from "./PokemonModal.module.css";

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
        {error && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>⚠️</p>
            <p className={styles.emptyText}>Failed to load details.</p>
          </div>
        )}

        {data && (
          <>
            <header className={styles.pokemonDialogHeader}>
              <img
                src={data.sprites?.front_default}
                alt={name}
                className={styles.pokemonDialogSprite}
              />
              <div>
                <h2 className={styles.pokemonDialogTitle}>{data.name}</h2>
                <p className={styles.pokemonDialogTypes}>
                  {data.types.map((t) => t.type.name).join(", ")}
                </p>
              </div>
            </header>

            <section className={styles.pokemonDialogSection}>
              <h3>Stats</h3>
              <ul className={styles.pokemonDialogStats}>
                {data.stats.map((s) => (
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
                {data.abilities.map((a) => (
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
