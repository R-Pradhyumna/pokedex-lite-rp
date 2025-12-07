import {
  HiArrowTopRightOnSquare,
  HiCommandLine,
  HiHeart,
  HiStar,
} from "react-icons/hi2";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* About */}
        <div>
          <div className={styles.brandRow}>
            <span>⚡</span>
            <span className={styles.brandName}>
              Pokedex <span className={styles.brandAccent}>Lite</span>
            </span>
          </div>
          <p className={styles.description}>
            A modern Pokémon encyclopedia powered by PokéAPI. Browse, search,
            filter by type, and mark your favorite Pokémon in a single,
            responsive view.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className={styles.sectionTitle}>Links</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                <HiArrowTopRightOnSquare size={14} />
                PokéAPI Documentation
              </a>
            </li>
            <li className={styles.linkItem}>
              <a
                href="https://github.com/R-Pradhyumna/pokedex-lite-rp"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                <HiCommandLine size={14} />
                View Source Code
              </a>
            </li>
          </ul>
        </div>

        {/* Tech stack */}
        <div>
          <h3 className={styles.sectionTitle}>Built with</h3>
          <div className={styles.techChips}>
            {[
              "React 18",
              "React Query",
              "React Hook Form",
              "Vite",
              "Bun",
              "CSS Modules",
            ].map((label) => (
              <span key={label} className={styles.chip}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span>
          © 2025 Pokedex Lite • Made with{" "}
          <HiHeart size={12} style={{ marginBottom: -1 }} /> by{" "}
          <a
            href="https://r-pradhyumna.github.io/My-portfolio/"
            target="_blank"
            rel="noreferrer"
            className={styles.inlineLink}
          >
            R Pradhyumna
          </a>
        </span>

        <div className={styles.bottomRight}>
          <a
            href="https://github.com/R-Pradhyumna/pokedex-lite-rp"
            target="_blank"
            rel="noreferrer"
            className={styles.inlineLink}
          >
            <HiStar size={12} style={{ marginBottom: -1 }} /> Star on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
