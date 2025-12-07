import { useLocalStorageState } from "./useLocalStorage";

const STORAGE_KEY = "pokedex-lite-favorites";

function useFavorites() {
  const [favorites, setFavorites] = useLocalStorageState([], STORAGE_KEY);

  function toggleFavorite(name) {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function isFavorite(name) {
    return favorites.includes(name);
  }

  return {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
  };
}

export default useFavorites;
