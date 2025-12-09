import { useState } from "react"; // 1. useState'i import ettik
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";

interface LimitedProductsProps {
  products: Product[];
  loading: boolean;
  limited?: boolean;
}

export const LimitedProducts = ({ products, loading }: LimitedProductsProps) => {
  // Hangi ürünün üzerinde uyarı gösterileceğini tutan state
  const [activeProductId, setActiveProductId] = useState<number | string | null>(null);

  // Demo ürün görselleri
  const productImages: Record<string, string> = {
    "Protein Bar": "https://images.unsplash.com/photo-1606312619070-d48b4b942fad?w=400&h=400&fit=crop",
    "Soğuk Kahve": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    "Cips Paketi": "https://images.unsplash.com/photo-1612929633736-8c8cb0c8a3e1?w=400&h=400&fit=crop",
    "Enerji İçeceği": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
  };

  // İlk 4 ürünü göster veya demo ürünler
  const displayProducts =
    products.slice(0, 4).length > 0
      ? products.slice(0, 4)
      : [
          { id: 1, name: "Protein Bar", price: 25.0, category_name: "Atıştırmalık", is_out_of_stock: false },
          { id: 2, name: "Soğuk Kahve", price: 20.0, category_name: "İçecek", is_out_of_stock: false },
          { id: 3, name: "Cips Paketi", price: 18.5, category_name: "Atıştırmalık", is_out_of_stock: false },
          { id: 4, name: "Enerji İçeceği", price: 30.0, category_name: "İçecek", is_out_of_stock: false },
        ];

  const formattedProducts = displayProducts.map((product) => ({
    ...product, // ID'ye erişebilmek için product'ı yayıyoruz
    image: productImages[product.name] || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    title: product.name,
    price: Number(product.price || 0),
  }));

  // Kartın üzerine tıklandığında çalışacak fonksiyon
  const handleCardClick = (id: number | string) => {
    if (activeProductId === id) {
      setActiveProductId(null); // Tekrar tıklanırsa kapat
    } else {
      setActiveProductId(id); // Aç
    }
  };

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Popüler Ürünler</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {formattedProducts.map((product, idx) => {
            const currentId = product.id ?? idx;
            const isActive = activeProductId === currentId;

            return (
              <div 
                key={currentId} 
                className="relative group rounded-xl overflow-hidden cursor-pointer" // Wrapper ekledik
                onClick={() => handleCardClick(currentId)}
              >
                {/* Mevcut Ürün Kartı */}
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />

                {/* --- Giriş Yap Overlay (Sadece aktifse görünür) --- */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center transition-all animate-in fade-in duration-200">
                    <p className="text-white font-medium mb-3 text-lg">
                      Satın almak için giriş yapmalısınız
                    </p>
                    <a
                      href="/auth/login" // Login sayfanızın yolu
                      className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Linke tıklayınca kartın kapanmasını engelle
                      }}
                    >
                      Giriş Yap
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};