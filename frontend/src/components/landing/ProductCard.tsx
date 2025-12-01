interface ProductCardProps {
  image: string;
  title: string;
  price: number;
}

export const ProductCard = ({ image, title, price }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="h-32 sm:h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop";
          }}
        />
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-1 sm:mb-2 line-clamp-2">{title}</h3>
        <p className="text-base sm:text-lg font-bold text-slate-900">₺{Number(price || 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

