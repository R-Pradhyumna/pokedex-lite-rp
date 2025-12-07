import Searchbar from "../ui/Searchbar";
import styles from "./Header.module.css";

function Header({ onSearchChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoBadge}>
            <span className={styles.logoEmoji}>⚡</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.title}>
              Pokedex <span className={styles.highlight}>Lite</span>
            </span>
            <span className={styles.subtitle}>
              Search, filter & favorite Pokémon
            </span>
          </div>
        </div>

        <div className={styles.spacer} />

        {/* Search only */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchLabel}>Search</span>
          <Searchbar onSearchChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
}

export default Header;
