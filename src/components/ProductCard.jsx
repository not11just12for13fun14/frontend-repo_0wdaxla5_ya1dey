export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/70 backdrop-blur hover:shadow-xl transition overflow-hidden">
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image_url || `https://picsum.photos/seed/${product._id || product.title}/600/600`}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-1 mb-1">{product.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{product.description || ""}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd?.(product)}
            className="rounded-xl bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}
