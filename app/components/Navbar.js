"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg border-b-4 border-yellow-400 pixel-border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain pixelated" />
          </div>
          <h1 className="text-sm sm:text-lg pixel-font text-yellow-300 drop-shadow-lg">
            POKÉMON DASHBOARD
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
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

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-yellow-300 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-yellow-400 pt-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>

            <Link
              href="/compare"
              className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
              onClick={() => setIsMenuOpen(false)}
            >
              ⚔️ COMPARE
            </Link>

            <Link
              href="/favorites"
              className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
              onClick={() => setIsMenuOpen(false)}
            >
              ❤️ FAVORITES
            </Link>

            <Link
              href="/about"
              className="hover:text-yellow-300 transition-colors duration-200 pixel-font text-xs"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}