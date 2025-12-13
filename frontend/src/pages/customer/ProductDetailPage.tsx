import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProductById } from "../../services/products";
import { Spinner } from "../../components/ui/Spinner";
import { ShoppingCart, ArrowLeft, Package, MapPin, Phone } from "lucide-react";
import { useCartStore } from "../../store/cart";
import toast from "react-hot-toast";

const getProductImage = (productName: string) => {
  const images: Record<string, string> = {
    "Protein Bar": "https://images.unsplash.com/photo-1606312619070-d48b4b942fad?w=400&h=400&fit=crop",
    "Soğuk Kahve": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    "Cips Paketi": "https://images.unsplash.com/photo-1612929633736-8c8cb0c8a3e1?w=400&h=400&fit=crop",
    "Enerji İçeceği": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
  };
  return images[productName] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop";
};

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addItem);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.is_out_of_stock) {
      toast.error("Bu ürün stokta yok");
      return;
    }
    
    if (product.seller_store_is_open === false) {
      toast.error("Mağaza şu anda kapalı");
      return;
    }

    addToCart(product.id, 1);
    toast.success("Ürün sepete eklendi");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Spinner label="Ürün yükleniyor..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ürün bulunamadı</h2>
          <p className="text-slate-600 mb-4">Aradığınız ürün mevcut değil veya erişilemiyor.</p>
          <Link
            to="/app/explore"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Get image URL - try image_url first, then images array, then fallback
  const mainImageUrl = 
    (product.image_url && product.image_url.trim() !== '') ? product.image_url : 
    (product.images && product.images.length > 0 && product.images[0].image ? product.images[0].image : null) ||
    getProductImage(product.name);

  const canAddToCart = !product.is_out_of_stock && product.seller_store_is_open !== false;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
              <div className="h-6 w-6 rounded bg-brand-500" />
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block">Yurt Market</span>
          </Link>
          <button
            onClick={() => navigate("/app/explore")}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Geri
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img
                src={mainImageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getProductImage(product.name);
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white"
                  >
                    <img
                      src={img.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Category Badge */}
            {product.category_name && (
              <div className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
                {product.category_name}
              </div>
            )}

            {/* Product Name */}
            <h1 className="mb-4 text-3xl font-bold text-slate-900">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-brand-600">₺{Number(product.price || 0).toFixed(2)}</p>
            </div>

            {/* Stock Status */}
            {product.is_out_of_stock ? (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-semibold text-red-700">Stok Tükendi</p>
              </div>
            ) : (
              <div className="mb-6 flex items-center gap-2 text-slate-600">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">Stokta {product.stock_quantity} adet var</span>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Ürün Açıklaması</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{product.description || "Açıklama bulunmuyor."}</p>
            </div>

            {/* Seller Info */}
            <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Satıcı Bilgileri</h3>
              <div className="space-y-2 text-sm text-slate-600">
                {product.seller_room && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{product.seller_room}</span>
                  </div>
                )}
                {product.seller_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{product.seller_phone}</span>
                  </div>
                )}
                {product.seller_store_is_open === false && (
                  <div className="rounded bg-amber-50 border border-amber-200 p-2">
                    <p className="text-xs font-medium text-amber-800">Mağaza şu anda kapalı</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition-colors ${
                canAddToCart
                  ? "bg-brand-600 text-white hover:bg-brand-700 active:scale-95 transform duration-100"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.is_out_of_stock
                ? "Stokta Yok"
                : product.seller_store_is_open === false
                ? "Mağaza Kapalı"
                : "Sepete Ekle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

