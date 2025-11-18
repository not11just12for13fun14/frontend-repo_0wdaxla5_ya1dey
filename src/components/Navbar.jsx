import { ShoppingCart, Search } from "lucide-react";

export default function Navbar({ cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <a href="#" className="text-xl font-bold tracking-tight">BlueShop</a>
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="relative inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">السلة</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] px-1 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
