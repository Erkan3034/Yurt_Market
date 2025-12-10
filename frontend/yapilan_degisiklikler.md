LimitedProducts.tsx klasöründe yapılan değişiklikler;

State Eklendi: Hangi kartın seçili olduğunu takip etmek için useState tanımlandı.
Kapsayıcı Div: ProductCard bileşeni, üzerine katman gelebilmesi için relative pozisyonlu bir div içine alındı.
Overlay (Katman): Seçili kartın üzerinde beliren siyah arka plan, uyarı yazısı ve "Giriş Yap" butonu eklendi.
Tıklama Kontrolü: Karta tıklandığında uyarıyı açan, tekrar tıklandığında kapatan fonksiyon yazıldı.

Hamburger menü entegrasyonu sürecinde yapılan tüm değişiklikler:

1. src/layouts/SellerLayout.tsx (Kontrol Merkezi)
-Değişiklik: Sidebar'ın açık/kapalı durumunu yöneten state (isSidebarOpen) burada tanımlandı.
Amaç: Menüyü açma fonksiyonunu (onOpen) buradan DashboardShell bileşenine aktardık.

2. src/components/layout/DashboardShell.tsx (Görünüm ve Yerleşim)
-Değişiklik 1: Mobil Sidebar (Drawer) kodları, karartma efekti (backdrop) ve animasyonlar eklendi.
-Değişiklik 2: Sayfanın en üstündeki mobil başlık (Header) kısmına, kullanıcı isminin soluna Hamburger Menü butonu (<Menu />) eklendi.
-Değişiklik 3: z-index değeri en yükseğe (z-[9999]) çekilerek menünün her şeyin üstünde görünmesi sağlandı.

3. src/pages/seller/DashboardPage.tsx (İçerik Sayfası)
-Değişiklik: Daha önce sayfanın içine koyduğumuz geçici menü butonu ve ilgili kodlar (useOutletContext) silindi. Artık burası sadece grafik ve veri gösteriyor.


