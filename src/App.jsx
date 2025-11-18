import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cart, setCart] = useState([]);

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const url = new URL("/api/products", API || window.location.origin.replace(":3000", ":8000"));
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url.toString());
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) => (p._id === product._id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const subtotal = useMemo(() => cart.reduce((s, p) => s + p.price * p.qty, 0), [cart]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cart.length} onSearch={(v) => { setQ(v); fetchProducts(v); }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">المنتجات</h2>
            {loading && <span className="text-slate-500 text-sm">جار التحميل...</span>}
          </div>
          <ProductGrid items={items} onAdd={onAdd} />
        </div>

        <aside className="lg:col-span-1 sticky top-20 h-fit space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-3">سلة المشتريات</h3>
            {!cart.length && <p className="text-sm text-slate-500">السلة فارغة</p>}
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item._id} className="flex items-center gap-3">
                  <img src={item.image_url || `https://picsum.photos/seed/${item._id || item.title}/60/60`} className="h-10 w-10 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.qty} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCart((c)=> c.map(p=> p._id===item._id?{...p, qty: Math.max(1,p.qty-1)}:p))} className="px-2 py-1 rounded border">-</button>
                    <button onClick={() => setCart((c)=> c.map(p=> p._id===item._id?{...p, qty: p.qty+1}:p))} className="px-2 py-1 rounded border">+</button>
                    <button onClick={() => setCart((c)=> c.filter(p=> p._id!==item._id))} className="px-2 py-1 rounded border text-rose-600">حذف</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-3 flex items-center justify-between">
              <span className="text-sm text-slate-600">المجموع</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <button
              disabled={!cart.length}
              onClick={async () => {
                const order = {
                  customer_name: "زبون",
                  customer_email: "customer@example.com",
                  customer_address: "العنوان",
                  items: cart.map((c) => ({
                    product_id: c._id,
                    title: c.title,
                    price: c.price,
                    quantity: c.qty,
                    image_url: c.image_url,
                  })),
                  subtotal: subtotal,
                  shipping: 0,
                  total: subtotal,
                  status: "pending",
                };
                try {
                  const res = await fetch((API||window.location.origin.replace(":3000", ":8000"))+"/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(order),
                  });
                  const data = await res.json();
                  alert(`تم إنشاء الطلب بنجاح. رقم الطلب: ${data.id}`);
                  setCart([]);
                } catch (e) {
                  console.error(e);
                  alert("حدث خطأ أثناء إنشاء الطلب");
                }
              }}
              className="w-full mt-3 rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              إتمام الشراء
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-2">أضف بيانات تجريبية</h3>
            <button
              onClick={async () => {
                const samples = [
                  { title: "قميص قطني", description: "قميص مريح وعالي الجودة", price: 19.99, category: "ملابس", image_url: "https://images.unsplash.com/photo-1520975922284-7b683cdd8707?w=800&q=80" },
                  { title: "حذاء رياضي", description: "أداء عالي للتمارين اليومية", price: 59.9, category: "أحذية", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
                  { title: "ساعة أنيقة", description: "مظهر كلاسيكي عملي", price: 120, category: "إكسسوارات", image_url: "https://images.unsplash.com/photo-1517583106829-61b7191f1c87?w=800&q=80" },
                  { title: "سماعات لاسلكية", description: "صوت نقي وعزل ممتاز", price: 79, category: "إلكترونيات", image_url: "https://images.unsplash.com/photo-1518440933141-85a18a6e08a0?w=800&q=80" },
                ];
                for (const s of samples) {
                  await fetch((API||window.location.origin.replace(":3000", ":8000"))+"/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(s),
                  });
                }
                fetchProducts(q);
              }}
              className="w-full rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              إضافة منتجات تجريبية
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
