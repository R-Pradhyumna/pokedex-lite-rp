import { useEffect, useState } from "react";
import Footer from "../pages/Footer.jsx";
import Header from "../pages/Header.jsx";
import styles from "./Homepage.module.css";

import useFavourites from "../hooks/useFavourites.js";

const heroSlides = [
  {
    id: 1,
    imageUrl: "/Hero-1.png",
    title: "Pikachu in the spotlight",
    subtitle: "Start your journey with the series’ most beloved partner.",
  },
  {
    id: 2,
    imageUrl: "/Hero-2.png",
    title: "Unleash Mewtwo's power",
    subtitle: "Explore legendary stats, abilities, and battle potential.",
  },
  {
    id: 3,
    imageUrl: "/Hero-3.png",
    title: "Charizard takes flight",
    subtitle: "Filter by Fire type to build a blazing offensive team.",
  },
  {
    id: 4,
    imageUrl: "/Hero-4.png",
    title: "Snorlax stands guard",
    subtitle: "Find tanky Pokémon to anchor your defensive lineup.",
  },
];

const types = ["all", "fire", "water", "grass", "electric"];

function Homepage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { favorites, favoritesCount, toggleFavorite, isFavorite } =
    useFavourites();

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="appRoot">
      <Header onSearchChange={setSearch} />

      <main className="appMain">
        {/* Hero with carousel */}
        <section className={styles.heroFull}>
          <div
            className={styles.heroCarousel}
            style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>{currentSlide.title}</h1>
            <p className={styles.heroSubtitle}>{currentSlide.subtitle}</p>
            <div className={styles.heroButtons}>
              <a
                type="button"
                href="https://www.pokemon.com/us/pokemon-episodes/"
                target="_blank"
                rel="noreferrer"
                className={styles.heroPrimary}
              >
                Watch Pokémon
              </a>
              <a
                type="button"
                href="https://pokeapi.co/docs/v2"
                target="_blank"
                rel="noreferrer"
                className={styles.heroSecondary}
              >
                Learn about PokéAPI
              </a>
            </div>
          </div>
        </section>

        <div className={styles.page}>
          {/* Type filter buttons */}
          <section className={styles.typesSection}>
            <div className={styles.typesRow}>
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={
                    type === selectedType
                      ? `${styles.typeChip} ${styles.typeChipActive}`
                      : styles.typeChip
                  }
                  onClick={() => setSelectedType(type)}
                >
                  {type === "all"
                    ? "All types"
                    : type[0].toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </section>

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
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                />
                <span>Show favorites only ({favoritesCount})</span>
              </label>
            </div>
          </section>

          {/* Grid skeleton (replace with real grid + React Query later) */}
          <section className={styles.gridSection}>
            <div className={styles.pokemonGrid}>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className={styles.pokemonCardSkeleton} />
              ))}
            </div>

            <div className={styles.paginationRow}>
              <button className={styles.paginationButton} disabled>
                Previous
              </button>
              <button className={styles.paginationButton}>Next</button>
            </div>
          </section>

          {/* Detail modal (to be wired later) */}
          {selectedPokemon && <dialog open>TODO: Detail modal</dialog>}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
