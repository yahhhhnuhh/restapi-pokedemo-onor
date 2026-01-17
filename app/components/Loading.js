export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mb-4"></div>
      <p className="text-white text-xl font-semibold">Loading Pokémon...</p>
      <p className="text-white/80 text-sm mt-2">This may take a moment</p>
    </div>
  );
}