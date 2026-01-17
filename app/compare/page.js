"use client";
import { useState } from "react";
import { useFavorites } from "../components/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import ComparisonChart from "../components/ComparisonChart";

export default function ComparePage() {
  const [selectedPokemon, setSelectedPokemon] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavorites();

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

  const allPokemon = favorites.length > 0 ? favorites : [];

  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectPokemon = (pokemon, slot) => {
    const newSelected = [...selectedPokemon];
    newSelected[slot] = pokemon;
    setSelectedPokemon(newSelected);
  };

  const clearSelection = (slot) => {
    const newSelected = [...selectedPokemon];
    newSelected[slot] = null;
    setSelectedPokemon(newSelected);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl pixel-font text-center text-yellow-300 mb-8 drop-shadow-lg uppercase">
        POKÉMON COMPARISON ⚔️
      </h1>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((slot) => (
            <div key={slot} className="bg-white/10 backdrop-blur-sm rounded-none p-4 md:p-6 border-4 border-yellow-400 pixel-border">
              <h3 className="text-lg pixel-font text-yellow-300 mb-4 uppercase">
                POKÉMON {slot + 1}
                <button
                  onClick={() => clearSelection(slot)}
                  className="ml-2 text-red-400 hover:text-red-300 text-sm"
                >
                  ✕
                </button>
              </h3>

            {selectedPokemon[slot] ? (
              <div className="text-center">
                <img
                  src={selectedPokemon[slot].sprites.front_default}
                  alt={selectedPokemon[slot].name}
                  className="h-20 md:h-24 mx-auto mb-2"
                />
                <h4 className="text-white pixel-font capitalize">
                  #{selectedPokemon[slot].id.toString().padStart(4, '0')} {selectedPokemon[slot].name}
                </h4>
                <div className="flex justify-center space-x-1 mt-1">
                  {selectedPokemon[slot].types.map(t => (
                    <span key={t.type.name} className={`px-2 py-1 ${getTypeColor(t.type.name)} text-white border border-gray-600 pixel-font text-xs font-bold uppercase rounded`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-white/60 text-center">No Pokemon selected</p>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Chart */}
      {selectedPokemon[0] && selectedPokemon[1] && (
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl pixel-font text-center text-yellow-300 mb-6 drop-shadow-lg uppercase">
            STATS COMPARISON
          </h2>
          <ComparisonChart pokemon1={selectedPokemon[0]} pokemon2={selectedPokemon[1]} />

          {/* Stats Table */}
          <div className="mt-6 bg-white border-4 border-gray-800 p-4 md:p-6 pixel-border shadow-lg">
            <h3 className="text-lg pixel-font text-center mb-4 text-gray-800 uppercase">DETAILED STATS COMPARISON</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs pixel-font">
                <thead>
                  <tr className="border-b-4 border-gray-800">
                    <th className="text-left py-2 px-4 font-bold text-gray-700 uppercase">STAT</th>
                    <th className="text-center py-2 px-4 font-bold text-blue-600 uppercase">{selectedPokemon[0].name}</th>
                    <th className="text-center py-2 px-4 font-bold text-red-600 uppercase">{selectedPokemon[1].name}</th>
                    <th className="text-center py-2 px-4 font-bold text-gray-700 uppercase">DIFFERENCE</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPokemon[0].stats.map((stat, index) => {
                    const stat2 = selectedPokemon[1].stats[index];
                    const diff = stat.base_stat - stat2.base_stat;
                    return (
                      <tr key={stat.stat.name} className="border-b-2 border-gray-400">
                        <td className="py-2 px-4 uppercase font-bold">{stat.stat.name}</td>
                        <td className="text-center py-2 px-4 font-bold text-blue-600">{stat.base_stat}</td>
                        <td className="text-center py-2 px-4 font-bold text-red-600">{stat2.base_stat}</td>
                        <td className={`text-center py-2 px-4 font-bold ${
                          diff > 0 ? 'text-green-600' :
                          diff < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {diff > 0 ? '+' : ''}{diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Pokemon Selection Grid */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Select Pokemon to Compare</h2>
        <input
          type="text"
          placeholder="SEARCH YOUR FAVORITES..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border-4 border-gray-800 bg-white pixel-font text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg mb-4"
        />

        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white text-xl mb-4">No favorite Pokemon yet!</p>
            <p className="text-white/80">Add some Pokemon to your favorites first to compare them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPokemon.map((pokemon) => (
              <div key={pokemon.id} className="bg-white border-4 border-gray-800 p-2 md:p-3 shadow-lg pixel-border hover:shadow-xl transition-shadow">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="h-12 md:h-16 mx-auto mb-2 pixelated"
                />
                <h4 className="text-xs pixel-font text-center text-gray-800 mb-2 uppercase">
                  #{pokemon.id.toString().padStart(4, '0')} {pokemon.name}
                </h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => selectPokemon(pokemon, 0)}
                    disabled={selectedPokemon[0]?.id === pokemon.id}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white pixel-font text-xs py-1 px-2 border-2 border-gray-800 transition-colors"
                  >
                    1
                  </button>
                  <button
                    onClick={() => selectPokemon(pokemon, 1)}
                    disabled={selectedPokemon[1]?.id === pokemon.id}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white pixel-font text-xs py-1 px-2 border-2 border-gray-800 transition-colors"
                  >
                    2
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}