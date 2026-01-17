"use client";

import { useState, useMemo } from "react";
import Search from "./Search";
import PokemonCard from "./PokemonCard";
import StatsChart from "./StatsChart";

export default function ClientWrapper({ data }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("number-asc");

  const filteredAndSorted = useMemo(() => {
    let filtered = data.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

    switch (sortBy) {
      case "number-asc":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "number-desc":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [data, query, sortBy]);

  return (
    <>
      <Search onSearch={setQuery} />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
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

      <h2 className="text-2xl pixel-font text-center text-yellow-300 mb-6 drop-shadow-lg uppercase">
        POKÉMON COLLECTION
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredAndSorted.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {filteredAndSorted.length === 1 && (
        <>
          <h3 className="text-xl pixel-font text-center text-yellow-300 mt-8 mb-4 drop-shadow-lg uppercase">STATS CHART</h3>
          <StatsChart pokemon={filteredAndSorted[0]} />
        </>
      )}
    </>
  );
}