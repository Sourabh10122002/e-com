import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.inventory > 0 && product.inventory <= 10;
  const isOutOfStock = product.inventory === 0;

  const getProductImage = (category: string, name: string) => {
    const categoryImages: { [key: string]: string } = {
      'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Clothing': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Home & Garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Books': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Food & Beverage': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format&q=80'
    };
    
    return categoryImages[category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center&auto=format&q=80';
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="aspect-square overflow-hidden">
        <img
          src={getProductImage(product.category, product.name)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
          
          <div className="flex items-center">
            {isOutOfStock ? (
              <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-orange-600 text-xs font-semibold bg-orange-50 px-2 py-1 rounded-full">
                Low Stock ({product.inventory})
              </span>
            ) : (
              <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">
                In Stock ({product.inventory})
              </span>
            )}
          </div>
        </div>
        
        <Link
          href={`/products/${product.slug}`}
          className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}