import { useEffect, useState } from "react";
import { env } from "../../config/env";
import { Product } from "../../types";
import { authStore } from "../../store/auth";
import { LandingNavbar } from "../../components/landing/LandingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { FeatureSection } from "../../components/landing/FeatureSection";
import { CTASection } from "../../components/landing/CTASection";
import { HeroSection } from "../../components/landing/HeroSection";
import { LimitedProducts } from "../../components/landing/LimitedProducts";

export const LandingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const accessToken = authStore((state) => state.accessToken);

  useEffect(() => {
      const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
          const response = await fetch(`${env.apiUrl}/api/products?dorm=1`, {
            headers: accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : undefined,
          });
          if (!response.ok) {
            throw new Error("Ürünler şu anda gösterilemiyor.");
          }
          const data = await response.json();
          setProducts(accessToken ? data : data.slice(0, 5));
        } catch (err) {
          setProducts([]);
        } finally {
          setLoadingProducts(false);
        }
      };

    fetchProducts();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="flex flex-col">
        <HeroSection />
        <FeatureSection />
        <LimitedProducts
          products={products}
          loading={loadingProducts}
          limited={!accessToken}
        />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};
