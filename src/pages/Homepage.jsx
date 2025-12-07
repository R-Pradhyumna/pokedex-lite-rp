import { useEffect, useState } from "react";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import styles from "./Homepage.module.css";

import PokemonGrid from "./PokemonGrid.jsx";
import PokemonModal from "./PokemonModal.jsx";

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
    title: "Unleash Mewtwo’s power",
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

const typeLabels = {
  all: "All types",
  fire: "🔥 Fire",
  water: "💧 Water",
  grass: "🌿 Grass",
  electric: "⚡ Electric",
};

function Homepage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { favoritesCount, toggleFavorite, isFavorite } = useFavourites();

  // Hero carousel auto-advance
  useEffect(() => {
    const id = setInterval(
      () => setActiveSlide((prev) => (prev + 1) % heroSlides.length),
      4000
    );
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
                      ? `${styles.typeChip} ${styles.typeChipActive} ${
                          styles[`typeChip-${type}`] || ""
                        }`
                      : `${styles.typeChip} ${styles[`typeChip-${type}`] || ""}`
                  }
                  onClick={() => setSelectedType(type)}
                >
                  {typeLabels[type]}
                </button>
              ))}
              <button
                type="button"
                className={
                  showFavoritesOnly
                    ? `${styles.typeChip} ${styles.typeChipActive}`
                    : styles.typeChip
                }
                onClick={() => setShowFavoritesOnly((prev) => !prev)}
              >
                {showFavoritesOnly
                  ? "Showing favorites"
                  : "Show favorites only"}{" "}
                ({favoritesCount})
              </button>
            </div>
          </section>

          {/* Grid + pagination */}
          <PokemonGrid
            search={search}
            selectedType={selectedType}
            showFavoritesOnly={showFavoritesOnly}
            favoritesCount={favoritesCount}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onToggleShowFavorites={setShowFavoritesOnly}
            onSelectPokemon={setSelectedPokemon}
          />

          {/* Detail modal */}
          {selectedPokemon && (
            <PokemonModal
              name={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
