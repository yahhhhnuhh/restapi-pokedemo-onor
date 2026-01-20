import Navbar from "./components/Navbar";
import ClientWrapper from "./components/ClientWrapper";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

async function fetchPokemon(limit = 20) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, {
    next: { revalidate: 3600 }
  });
  const list = await res.json();

  const batchSize = 50;
  const detailed = [];

  for (let i = 0; i < list.results.length; i += batchSize) {
    const batch = list.results.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (p) => {
        try {
          const res = await fetch(p.url, {
            next: { revalidate: 3600 }
          });
          if (!res.ok) {
            console.warn(`Failed to fetch ${p.url}: ${res.status}`);
            return null;
          }
          return res.json();
        } catch (error) {
          console.warn(`Error fetching ${p.url}:`, error);
          return null;
        }
      })
    );

    detailed.push(...batchResults.filter(result => result !== null));

    if (i + batchSize < list.results.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return detailed;
}

export default async function Page() {
  const data = await fetchPokemon(50);

  return (
    <ClientWrapper data={data} />
  );
}