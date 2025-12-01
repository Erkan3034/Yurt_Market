# Stitch.ai UI/UX Design Prompt - Yurt Market v1

## Proje Özeti

**Yurt Market**, yurt içinde yaşayan öğrenciler için tasarlanmış bir e-ticaret platformudur. Öğrenciler, yurt içindeki satıcılardan atıştırmalık, içecek ve diğer ürünleri sipariş edebilir. Platform iki ana kullanıcı tipine hizmet eder:
- **Öğrenciler/Müşteriler**: Ürünleri keşfeder, sepete ekler ve sipariş verir
- **Satıcılar**: Ürün ekler, siparişleri yönetir, analitik görür ve abonelik yönetir

## Teknik Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3.x
- **UI Components**: Custom components (Modal, Spinner, etc.)
- **Icons**: Lucide React
- **State Management**: Zustand (auth), TanStack Query (data fetching)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion (landing page için)

## Tasarım Sistemi

### Renk Paleti

**Primary Brand Colors (Sky Blue)**
- `brand-50`: #f0f9ff
- `brand-100`: #e0f2fe
- `brand-200`: #bae6fd
- `brand-300`: #7dd3fc
- `brand-400`: #38bdf8
- `brand-500`: #0ea5e9
- `brand-600`: #0284c7 (Primary action buttons)
- `brand-700`: #0369a1
- `brand-800`: #075985
- `brand-900`: #0c4a6e

**Neutral Colors (Slate)**
- `slate-50` to `slate-950`: Text, backgrounds, borders

**Semantic Colors**
- Success: `success-500` (#22c55e), `success-600` (#16a34a)
- Danger: `danger-500` (#ef4444), `danger-600` (#dc2626)

### Tipografi

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large sizes (text-3xl, text-2xl, text-xl)
- **Body**: Regular weight, text-sm to text-base
- **Labels**: text-sm, font-semibold
- **Uppercase Labels**: text-xs, font-semibold, tracking-wide

### Spacing & Layout

- **Container Padding**: 1.5rem (mobile), 2rem (sm), 3rem (lg)
- **Card Padding**: p-5 to p-8
- **Gap Between Elements**: space-y-4 to space-y-6
- **Border Radius**: 
  - Cards: rounded-2xl, rounded-3xl
  - Buttons: rounded-full, rounded-2xl
  - Inputs: rounded-2xl

### Shadows

- **Soft**: `0 10px 40px -15px rgba(15, 23, 42, 0.2)`
- **Card**: `0 20px 50px -30px rgba(15, 23, 42, 0.35)`
- **Button**: `shadow-lg shadow-brand-500/30`

## Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (md:)
- **Desktop**: > 1024px (lg:, xl:)

**Mobile-First Approach**: Tüm tasarımlar önce mobil için yapılmalı, sonra tablet ve desktop için genişletilmeli.

## Sayfalar ve Bileşenler

### 1. Landing Page (`/`)

**Amaç**: Ziyaretçileri platform hakkında bilgilendirir, kayıt olmaya teşvik eder.

**Bileşenler**:
- **LandingNavbar**: Logo, "Giriş Yap" ve "Kayıt Ol" butonları
- **HeroSection**: Büyük başlık, açıklama, CTA butonları
- **FeatureSection**: Platform özellikleri (3-4 kart)
- **LimitedProducts**: Anonim kullanıcılar için 10 ürün önizlemesi
- **StatsSection**: İstatistikler (Aylık sipariş, Aktif satıcı, vb.)
- **PricingSection**: Satıcı planları (Başlangıç, Pro, Enterprise)
  - "SATICI OLARAK BAŞLA" butonu (büyük, vurgulu)
  - Plan kartları (3 sütun grid)
  - "Satıcı Olmak İster misin?" bilgi bölümü
- **TestimonialsSection**: Müşteri yorumları
- **CTASection**: Son çağrı (kayıt ol)
- **LandingFooter**: Linkler, sosyal medya, copyright

**Tasarım Gereksinimleri**:
- Modern, temiz, profesyonel görünüm
- Gradient arka planlar (brand colors)
- Smooth scroll animasyonları (Framer Motion)
- Mobile'da tek sütun, desktop'ta grid layout
- CTA butonları vurgulu (brand-600, beyaz text)

### 2. Login Page (`/auth/login`)

**Amaç**: Mevcut kullanıcıların giriş yapması.

**Form Alanları**:
- E-posta input
- Şifre input (gizli)
- "Şifremi unuttum" linki
- "Giriş yap" butonu
- "Hesabın yok mu? Hemen kayıt ol" linki

**Tasarım Gereksinimleri**:
- Merkezi, kartlı layout (max-w-md)
- Rounded-3xl kart, shadow-xl
- Input'lar: rounded-2xl, border-slate-200
- Primary button: brand-600, rounded-2xl, full width
- Error mesajları: kırmızı text, küçük font
- Mobile: padding-4, desktop: padding-8

### 3. Register Page (`/auth/register`)

**Amaç**: Yeni kullanıcı kaydı (öğrenci veya satıcı).

**Form Alanları**:
- E-posta
- Şifre
- Yurt adı (datalist ile autocomplete)
- Yurt adresi (yurt listede yoksa gösterilir)
- Rol seçimi (Öğrenci/Satıcı)
- Satıcı için: Telefon, IBAN (opsiyonel)

**Tasarım Gereksinimleri**:
- 2 sütun grid (md:grid-cols-2)
- Yurt adı için datalist dropdown
- Rol değiştiğinde satıcı alanları gösterilir
- Validation error mesajları
- "Kaydı tamamla" butonu
- Mobile: tek sütun, tablet+: 2 sütun

### 4. Customer Explore Page (`/app/explore`)

**Amaç**: Öğrencilerin ürünleri keşfetmesi, arama, filtreleme, sepete ekleme.

**Özellikler**:
- **Arama Bar**: Ürün adı, açıklama, kategori arama
- **Filtre Butonu**: Kategoriler ve sıralama seçenekleri
- **Kategori Filtreleri**: Pill butonlar (tümü + kategori listesi)
- **Sıralama**: İsme göre, Fiyat (artan/azalan), En yeni
- **Ürün Grid**: 3 sütun (xl:grid-cols-3), kartlar
- **Sepet**: Sticky bottom bar, ürün listesi, toplam fiyat
- **Sepet İçi Miktar Kontrolü**: + / - butonları

**Ürün Kartı İçeriği**:
- Kategori badge (üstte, küçük, uppercase)
- Ürün adı (büyük, bold)
- Fiyat (sağ üst, brand-600)
- Açıklama (line-clamp-3)
- Stok durumu (yeşil/kırmızı badge)
- "Sepete ekle" butonu veya miktar kontrolü

**Tasarım Gereksinimleri**:
- Modern e-ticaret görünümü (Trendyol/Hepsiburada tarzı)
- Filtre paneli açılır/kapanır
- Aktif filtreler vurgulu (brand-600)
- Ürün kartları: hover effect, shadow
- Sticky sepet: bottom-4, z-10, shadow-xl
- Mobile: 1 sütun, tablet: 2 sütun, desktop: 3 sütun

### 5. Customer Orders Page (`/app/orders`)

**Amaç**: Öğrencilerin sipariş geçmişini görüntülemesi.

**İçerik**:
- Sipariş kartları (ID, tarih, durum, toplam)
- Sipariş öğeleri listesi
- Durum badge'leri (Pending, Onay, Red, İptal)
- Boş durum: "Henüz siparişin yok" mesajı

**Tasarım Gereksinimleri**:
- Timeline benzeri görünüm (isteğe bağlı)
- Durum renkleri: Pending (amber), Onay (green), Red (red), İptal (gray)
- Kartlar: rounded-3xl, border, shadow-sm
- Mobile: tek sütun, desktop: 2 sütun grid

### 6. Seller Products Page (`/seller/products`)

**Amaç**: Satıcıların ürün eklemesi, düzenlemesi, silmesi.

**Layout**: 2 sütun grid (md:grid-cols-2)

**Sol Panel - Ürün Ekleme Formu**:
- Ürün adı
- Açıklama (textarea)
- Fiyat, Stok, Kategori ID (grid-cols-2)
- "Ürün ekle" butonu

**Sağ Panel - Ürün Listesi**:
- Ürün kartları (ad, fiyat, stok)
- "Sil" butonu (her kartta)
- Boş durum mesajı

**Modal - Abonelik Uyarısı**:
- Ürün limiti dolduğunda açılır
- "Plan Yükselt" butonu → `/seller/subscription`
- "İptal" butonu

**Tasarım Gereksinimleri**:
- Form: rounded-3xl, border, shadow-sm
- Ürün listesi: compact kartlar
- Modal: merkezi, overlay, rounded-3xl
- Error handling: toast notifications

### 7. Seller Orders Page (`/seller/orders`)

**Amaç**: Satıcıların gelen siparişleri yönetmesi.

**İçerik**:
- Sipariş kartları
- Sipariş öğeleri
- Aksiyon butonları: "Onayla", "Reddet", "İptal"
- Durum badge'leri

**Tasarım Gereksinimleri**:
- Aksiyon butonları: küçük, rounded-full, renkli (green, amber, red)
- Sipariş kartları: detaylı bilgi, hover effect
- Mobile: tek sütun, desktop: grid layout

### 8. Seller Analytics Page (`/seller/analytics`)

**Amaç**: Satıcıların satış istatistiklerini görüntülemesi.

**İçerik**:
- Toplam sipariş sayısı
- Toplam gelir
- Grafikler (chart.js veya recharts kullanılabilir)
- Popüler ürünler
- Zaman bazlı trendler

**Tasarım Gereksinimleri**:
- Dashboard görünümü
- İstatistik kartları (grid layout)
- Grafikler: responsive, modern
- Mobile: tek sütun, desktop: grid

### 9. Seller Subscription Page (`/seller/subscription`)

**Amaç**: Satıcıların abonelik durumunu görüntülemesi ve yeni abonelik başlatması.

**İçerik**:
- Abonelik durumu kartı (Aktif/Aktif değil, son kullanma)
- Plan kartları (Pro Satıcı: 199 ₺/ay)
- "Aboneliği başlat" butonu
- Özellikler listesi

**Tasarım Gereksinimleri**:
- Durum kartı: vurgulu, rounded-3xl
- Plan kartı: highlight border (brand-200), shadow-lg
- Buton: brand-600, rounded-full
- Mobile: tek sütun, desktop: grid

### 10. Layout Components

#### DashboardShell (Sidebar Layout)

**Özellikler**:
- Sol sidebar (sabit, mobile'da hamburger menü)
- Ana içerik alanı
- Logo ve menü öğeleri
- Çıkış butonu (altta)

**Menü Öğeleri**:
- İkon + Label
- Aktif sayfa vurgulu (brand-50 background, brand-600 text)
- Hover effect

**Tasarım Gereksinimleri**:
- Sidebar: fixed, w-64 (desktop), hidden (mobile)
- Mobile: hamburger menü, drawer/sheet
- Ana içerik: padding, responsive

#### Modal Component

**Özellikler**:
- Overlay (bg-black/50)
- Merkezi kart (max-w-md)
- Kapat butonu (X ikonu)
- İçerik alanı

**Tasarım Gereksinimleri**:
- Backdrop blur (isteğe bağlı)
- Smooth open/close animation
- Rounded-3xl kart
- Shadow-xl

#### Spinner Component

**Özellikler**:
- Loading animasyonu
- Opsiyonel label
- Merkezi konumlandırma

**Tasarım Gereksinimleri**:
- Circular spinner (brand-500)
- Text: text-slate-500, text-sm

## UI/UX Prensipleri

### Genel Prensipler

1. **Consistency**: Tüm sayfalarda tutarlı spacing, typography, colors
2. **Accessibility**: 
   - Yeterli kontrast oranları
   - Focus states (outline, ring)
   - ARIA labels
   - Keyboard navigation
3. **Feedback**: 
   - Loading states (Spinner)
   - Success/Error toasts
   - Button disabled states
   - Form validation messages
4. **Progressive Disclosure**: 
   - Filtreler açılır/kapanır
   - Modal'lar gerektiğinde açılır
   - Detaylar expandable
5. **Mobile-First**: 
   - Touch-friendly butonlar (min 44x44px)
   - Büyük yazı boyutları
   - Adequate spacing
   - Swipe gestures (isteğe bağlı)

### Animasyonlar

- **Transitions**: 200-300ms, ease-in-out
- **Hover Effects**: scale, shadow, color change
- **Loading**: Skeleton screens veya spinner
- **Page Transitions**: Fade in (isteğe bağlı)

### Form Tasarımı

- **Inputs**: 
  - Rounded-2xl
  - Border: border-slate-200
  - Focus: border-brand-500, ring-2 ring-brand-500/20
  - Placeholder: text-slate-400
- **Labels**: 
  - text-sm, font-medium, text-slate-600
  - Input'un üstünde
- **Error States**: 
  - Border: border-red-300
  - Text: text-red-500, text-xs
  - Input altında gösterilir
- **Success States**: 
  - Border: border-green-300
  - Checkmark icon (isteğe bağlı)

### Button Tasarımı

**Primary Button**:
- bg-brand-600, text-white
- rounded-2xl veya rounded-full
- font-semibold
- px-6 py-2.5 (default)
- hover: bg-brand-700
- disabled: opacity-50, cursor-not-allowed

**Secondary Button**:
- border border-slate-300, bg-white
- text-slate-700
- hover: bg-slate-50

**Danger Button**:
- bg-red-500, text-white
- hover: bg-red-600

**Ghost Button**:
- Transparent background
- text-slate-600
- hover: bg-slate-100

### Card Tasarımı

- **Background**: bg-white
- **Border**: border border-slate-200
- **Radius**: rounded-2xl veya rounded-3xl
- **Shadow**: shadow-sm (default), shadow-lg (hover)
- **Padding**: p-5 to p-8
- **Spacing**: space-y-4 to space-y-6 içeride

### Badge/Status Tasarımı

- **Rounded**: rounded-full
- **Padding**: px-3 py-1
- **Font**: text-xs, font-semibold
- **Colors**: 
  - Success: bg-emerald-50, text-emerald-600
  - Danger: bg-red-50, text-red-600
  - Warning: bg-amber-50, text-amber-600
  - Info: bg-brand-50, text-brand-600
  - Neutral: bg-slate-100, text-slate-600

## Özel Gereksinimler

### Landing Page

- **Hero Section**: 
  - Büyük, vurgulu başlık
  - Gradient background (isteğe bağlı)
  - CTA butonları (büyük, vurgulu)
  - Hero image veya illustration (isteğe bağlı)

- **Feature Cards**: 
  - 3-4 kart, grid layout
  - İkon + başlık + açıklama
  - Hover effect

- **Pricing Section**: 
  - "SATICI OLARAK BAŞLA" butonu (büyük, merkezi)
  - Plan kartları (3 sütun)
  - Highlight plan (border-brand-200, shadow-2xl)
  - "Satıcı Olmak İster misin?" bilgi bölümü (brand-50 background)

### Explore Page

- **Search Bar**: 
  - Full width
  - Search icon (sol)
  - Clear button (sağ, sadece doluysa)
  - Rounded-2xl

- **Filter Panel**: 
  - Açılır/kapanır
  - Kategori pill butonları
  - Sıralama dropdown
  - "Filtreleri temizle" linki

- **Product Grid**: 
  - Responsive: 1 (mobile) → 2 (tablet) → 3 (desktop) sütun
  - Kartlar: hover:shadow-lg, hover:-translate-y-1
  - Sepet butonu: rounded-full, compact

- **Sticky Cart**: 
  - Bottom-4, fixed
  - Rounded-3xl, shadow-xl
  - Ürün listesi (scrollable, max-height)
  - Toplam fiyat
  - "Siparişi oluştur" butonu (büyük, vurgulu)

### Seller Pages

- **Products Page**: 
  - 2 sütun grid (form + list)
  - Form: compact, clear labels
  - List: minimal kartlar, sil butonu

- **Orders Page**: 
  - Aksiyon butonları: küçük, renkli, rounded-full
  - Sipariş detayları: expandable (isteğe bağlı)

- **Analytics Page**: 
  - Dashboard layout
  - İstatistik kartları (grid)
  - Grafikler: responsive, modern

## Responsive Tasarım Detayları

### Mobile (< 640px)

- **Padding**: px-4 (container)
- **Typography**: 
  - H1: text-2xl
  - H2: text-xl
  - Body: text-sm
- **Grids**: Tek sütun
- **Sidebar**: Hamburger menü, drawer
- **Buttons**: Full width (primary actions)
- **Cards**: Minimal padding (p-4)

### Tablet (640px - 1024px)

- **Padding**: px-6
- **Typography**: 
  - H1: text-3xl
  - H2: text-2xl
- **Grids**: 2 sütun (ürünler, formlar)
- **Sidebar**: Fixed, görünür
- **Buttons**: Auto width

### Desktop (> 1024px)

- **Padding**: px-8
- **Typography**: 
  - H1: text-4xl (landing), text-3xl (dashboard)
  - H2: text-2xl
- **Grids**: 3 sütun (ürünler), 2 sütun (formlar)
- **Sidebar**: Fixed, geniş
- **Max Width**: Container max-w-7xl

## Test Senaryoları

Tasarım aşağıdaki durumlarda test edilmelidir:

1. **Empty States**: Boş liste, boş sepet, boş sipariş geçmişi
2. **Loading States**: Spinner, skeleton screens
3. **Error States**: Form validation, API errors
4. **Success States**: Başarılı işlemler, toast notifications
5. **Responsive**: Mobile, tablet, desktop görünümleri
6. **Dark Mode**: (İsteğe bağlı, şu an gerekli değil)

## Sonuç

Tüm sayfalar modern, temiz, kullanıcı dostu ve tam responsive olmalıdır. Tasarım sistemi tutarlı olmalı, brand colors ve typography tüm sayfalarda aynı şekilde kullanılmalıdır. Mobile-first yaklaşım benimsenmeli, tüm interaktif elementler touch-friendly olmalıdır.

**Öncelik**: 
1. Landing Page (en önemli, ilk izlenim)
2. Explore Page (ana kullanım alanı)
3. Auth Pages (Login/Register)
4. Seller Pages (Products, Orders, Analytics, Subscription)
5. Customer Orders Page

Her sayfa için detaylı mockup'lar ve component breakdown'ları oluşturulmalıdır.

