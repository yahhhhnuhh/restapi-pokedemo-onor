"use client";
import { useState } from "react";

export default function Search({ onSearch }) {
  const [value, setValue] = useState("");

  return (
    <input
      placeholder="🔍 SEARCH POKÉMON..."
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value.toLowerCase());
      }}
      className="w-full p-3 border-4 border-gray-800 bg-white pixel-font text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg"
    />
  );
}