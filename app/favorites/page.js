"use client";
import { useState, useMemo } from "react";
import { useFavorites } from "../components/FavoritesContext";
import PokemonCard from "../components/PokemonCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [sortBy, setSortBy] = useState("number-asc");

  const sortedFavorites = useMemo(() => {
    let sorted = [...favorites];

    switch (sortBy) {
      case "number-asc":
        sorted.sort((a, b) => a.id - b.id);
        break;
      case "number-desc":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [favorites, sortBy]);

  return (
    <div>
      <h1 className="text-3xl pixel-font text-center text-yellow-300 mb-8 drop-shadow-lg uppercase">
        MY FAVORITE POKÉMON ❤️
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="text-yellow-300 text-xl mb-4 pixel-font">NO FAVORITE POKÉMON YET!</p>
          <p className="text-white/80 pixel-font text-xs">CLICK THE HEART ICON ON ANY POKÉMON CARD TO ADD THEM TO YOUR FAVORITES.</p>
        </div>
      ) : (
        <>
          {/* Sorting Controls for Favorites */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <span className="pixel-font text-xs text-yellow-300 uppercase">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pixel-font text-xs bg-white border-4 border-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="number-asc">NUMBER (LOW TO HIGH)</option>
                <option value="number-desc">NUMBER (HIGH TO LOW)</option>
                <option value="name-asc">NAME (A-Z)</option>
                <option value="name-desc">NAME (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedFavorites.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}