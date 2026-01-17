"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gradient-to-r from-red-800 to-red-900 text-white flex justify-between shadow-lg border-b-4 border-yellow-400 pixel-border">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain pixelated" />
        </div>
        <h1 className="text-lg pixel-font text-yellow-300 drop-shadow-lg">
          POKÉMON DASHBOARD
        </h1>
      </div>
      <div className="space-x-6 flex items-center">
        <Link
          href="/"
          className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
        >
          HOME
        </Link>

        <Link
          href="/compare"
          className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
        >
          ⚔️ COMPARE
        </Link>

        <Link
          href="/favorites"
          className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
        >
          ❤️ FAVORITES
        </Link>

        <Link
          href="/about"
          className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
        >
          ABOUT
        </Link>
      </div>
    </nav>
  );
}