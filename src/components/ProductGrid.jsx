import ProductCard from "./ProductCard";

export default function ProductGrid({ items, onAdd }) {
  if (!items?.length) {
    return (
      <div className="text-center text-slate-500 py-16">لا توجد منتجات بعد</div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p._id || p.title} product={p} onAdd={onAdd} />)
      )}
    </div>
  );
}
