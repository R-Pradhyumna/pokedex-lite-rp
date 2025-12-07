import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails, fetchPokemonList } from "../services/api";

export function useList({ page, search, type }) {
  return useQuery({
    queryKey: ["pokemon-list", { page, search, type }],
    queryFn: () => fetchPokemonList({ page, search, type }),
    keepPreviousData: true,
  });
}

export function useDetails(name) {
  return useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemonDetails(name),
    enabled: !!name,
  });
}
