import { useQuery } from "@tanstack/react-query";
import { fetchDormProducts } from "../../services/products";
import { authStore } from "../../store/auth";
import { useMemo, useState } from "react";
import { createOrder } from "../../services/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../components/ui/Spinner";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../lib/errors";
import { Search, Filter, X, ShoppingCart } from "lucide-react";

type SortOption = "name" | "price_asc" | "price_desc" | "newest";

export const ExplorePage = () => {
  const user = authStore((state) => state.user);
  const dormId = user?.dorm_id;
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["products", dormId],
    queryFn: () => fetchDormProducts(dormId),
    enabled: Boolean(dormId),
  });

  // Kategorileri ürünlerden çıkar
  const categories = useMemo(() => {
    if (!data) return [];
    const categorySet = new Set<string>();
    data.forEach((product) => {
      if (product.category_name) {
        categorySet.add(product.category_name);
      }
    });
    return Array.from(categorySet).sort();
  }, [data]);

  // Filtrelenmiş ve sıralanmış ürünler
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    let filtered = [...data];

    // Arama filtresi
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category_name?.toLowerCase().includes(query)
      );
    }

    // Kategori filtresi
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category_name === selectedCategory);
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name, "tr");
        case "newest":
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, searchQuery, selectedCategory, sortBy]);

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
    toast.success("Sepete eklendi");
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => ({ ...prev, [productId]: quantity }));
  };

  const cartItems = useMemo(() => {
    if (!data) return [];
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = data.find((p) => p.id === Number(id));
        return product
          ? {
              product_id: product.id,
              name: product.name,
              price: product.price,
              quantity,
            }
          : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [cart, data]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const orderMutation = useMutation({
    mutationFn: () =>
      createOrder({
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      }),
    onSuccess: () => {
      setCart({});
      toast.success("Siparişin oluşturuldu!");
      queryClient.invalidateQueries({ queryKey: ["orders", "customer"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error) || "Sipariş oluşturulamadı");
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">Ürünler</h1>
        <p className="text-sm text-slate-500">
          {user?.dorm_id}. yurt satıcılarının ürünlerini keşfet
        </p>
      </div>

      {/* Arama ve Filtreler */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Ürün, kategori veya açıklama ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors ${
              showFilters || selectedCategory || sortBy !== "name"
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </button>
        </div>

        {/* Filtre Paneli */}
        {showFilters && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Kategori Filtresi */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Kategori</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      !selectedCategory
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Tümü
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        selectedCategory === category
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sıralama */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Sırala</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="name">İsme göre (A-Z)</option>
                  <option value="price_asc">Fiyat (Düşük → Yüksek)</option>
                  <option value="price_desc">Fiyat (Yüksek → Düşük)</option>
                  <option value="newest">En yeni</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Sonuç Sayısı */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {filteredProducts.length} ürün bulundu
            {selectedCategory && ` (${selectedCategory})`}
          </span>
          {(selectedCategory || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="text-brand-600 hover:text-brand-700 font-semibold"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      </div>

      {/* Ürün Listesi */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner label="Ürünler yükleniyor..." />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">Ürün bulunamadı</p>
          <p className="mt-2 text-sm text-slate-500">
            {searchQuery || selectedCategory
              ? "Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin."
              : "Henüz bu yurtta ürün bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {product.category_name ?? "Kategori"}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{product.name}</p>
                </div>
                <p className="ml-3 text-lg font-bold text-brand-600">{product.price} ₺</p>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-slate-500">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    product.is_out_of_stock ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {product.is_out_of_stock ? "Tükendi" : `${product.stock_quantity} adet`}
                </span>
                {!product.is_out_of_stock && (
                  <div className="flex items-center gap-2">
                    {cart[product.id] ? (
                      <div className="flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-2">
                        <button
                          onClick={() => updateCartQuantity(product.id, (cart[product.id] || 0) - 1)}
                          className="rounded-full p-1 text-brand-600 hover:bg-brand-100"
                        >
                          <span className="text-xs font-bold">−</span>
                        </button>
                        <span className="min-w-[2ch] text-center text-xs font-semibold text-brand-700">
                          {cart[product.id]}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, (cart[product.id] || 0) + 1)}
                          className="rounded-full p-1 text-brand-600 hover:bg-brand-100"
                        >
                          <span className="text-xs font-bold">+</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Sepete ekle
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sepet */}
      {cartItems.length > 0 && (
        <div className="sticky bottom-4 z-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">Sepetin</p>
              <p className="text-sm text-slate-500">
                {cartItems.length} ürün · {cartTotal.toFixed(2)} ₺
              </p>
            </div>
            <button
              onClick={() => orderMutation.mutate()}
              disabled={orderMutation.isPending}
              className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700 disabled:opacity-50"
            >
              {orderMutation.isPending ? (
                <>
                  <Spinner />
                  <span>Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Siparişi oluştur</span>
                </>
              )}
            </button>
          </div>
          <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto text-sm">
            {cartItems.map((item) => (
              <li key={item.product_id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.quantity} x {item.price} ₺ = {(item.quantity * item.price).toFixed(2)} ₺
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="ml-3 rounded-full p-1 text-red-500 hover:bg-red-50"
                  aria-label="Kaldır"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
