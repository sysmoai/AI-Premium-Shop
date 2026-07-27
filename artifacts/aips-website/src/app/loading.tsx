export default function Loading() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#f4b942]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#f4b942] animate-spin"></div>
      </div>
      <p className="text-slate-400 text-lg animate-pulse">Loading AI Premium Shop...</p>
    </main>
  );
}
