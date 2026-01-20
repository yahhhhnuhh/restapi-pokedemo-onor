"use client";
import { useState } from "react";
import { useFavorites } from "./FavoritesContext";
import Link from "next/link";
import StatsChart from "./StatsChart";

export default function PokemonCard({ pokemon }) {
  const [showStats, setShowStats] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300"
  };

  const getTypeColor = (typeName) => {
    return typeColors[typeName] || "bg-gray-400";
  };

  return (
    <div className="bg-white rounded-none shadow-lg p-4 sm:p-6 border-4 border-gray-800 pixel-border hover:shadow-xl transition-shadow duration-300 relative">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-lg sm:text-xl transition-colors duration-200 cursor-pointer z-10"
      >
        {isFavorite(pokemon.id) ? "❤️" : "🤍"}
      </button>
      <div className="bg-gradient-to-r from-red-600 to-red-700 -m-4 sm:-m-6 mb-4 p-4 sm:p-6 border-4 border-gray-800">
        <img src={pokemon.sprites.front_default} className="h-24 sm:h-32 mx-auto drop-shadow-lg pixelated" />
      </div>
      
      <h3 className="text-sm sm:text-lg pixel-font text-center text-gray-800 mb-2 uppercase">
        #{pokemon.id.toString().padStart(4, '0')} {pokemon.name}
      </h3>
      
      <div className="flex justify-center flex-wrap gap-1 sm:gap-2 mb-4">
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`px-2 sm:px-3 py-1 ${getTypeColor(t.type.name)} text-white border-2 border-gray-800 pixel-font text-xs font-bold uppercase`}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setShowStats(!showStats)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white pixel-font text-xs py-2 px-3 sm:px-4 border-2 border-gray-800 transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
        >
          {showStats ? "HIDE STATS" : "SHOW STATS"}
        </button>

        <Link
          href="/compare"
          className="bg-blue-600 hover:bg-blue-700 text-white pixel-font text-xs py-2 px-3 sm:px-4 border-2 border-gray-800 transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg text-center"
        >
          ⚔️ COMPARE
        </Link>
      </div>

      {showStats && (
        <div className="mt-4">
          <div className="bg-gray-100 border-2 border-gray-800 p-3 sm:p-4 mb-4">
            <h4 className="pixel-font text-xs text-gray-700 mb-2 uppercase">BASE STATS:</h4>
            <ul className="space-y-1">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name} className="flex justify-between text-xs">
                  <span className="pixel-font uppercase font-bold">{s.stat.name}:</span>
                  <span className="pixel-font font-bold text-blue-600">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
          <StatsChart pokemon={pokemon} />
        </div>
      )}
    </div>
  );
}