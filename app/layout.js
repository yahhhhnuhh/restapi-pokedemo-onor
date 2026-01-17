import "./globals.css";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./components/FavoritesContext";
import { Press_Start_2P } from 'next/font/google';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Pokémon Dashboard",
  description: "Educational demo for Web Programming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pixelFont.className}>
        <FavoritesProvider>
          <Navbar />
          <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 p-6 relative scanlines">
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-yellow-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-yellow-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-400"></div>
            {children}
          </main>
        </FavoritesProvider>
      </body>
    </html>
  );
}

