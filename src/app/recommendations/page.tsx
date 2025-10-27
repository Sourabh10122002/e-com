import { getAllProducts } from '@/lib/data';
import Link from 'next/link';

export default function RecommendationsPage() {
  const products = getAllProducts();
  
  const getRecommendations = () => {
    const categories = [...new Set(products.map(p => p.category))];
    const recommendations = [];
    
    const featured = products
      .filter(p => p.inventory > 20 && p.price >= 50 && p.price <= 500)
      .sort((a, b) => b.inventory - a.inventory)
      .slice(0, 3);
    
    const popularByCategory = categories.map(category => {
      const categoryProducts = products
        .filter(p => p.category === category)
        .sort((a, b) => b.inventory - a.inventory);
      return {
        category,
        products: categoryProducts.slice(0, 2)
      };
    }).filter(cat => cat.products.length > 0);
    
    const budgetFriendly = products
      .filter(p => p.price < 100 && p.inventory > 0)
      .sort((a, b) => a.price - b.price)
      .slice(0, 4);
    
    const premium = products
      .filter(p => p.price > 200 && p.inventory > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);
    
    return {
      featured,
      popularByCategory,
      budgetFriendly,
      premium
    };
  };
  
  const recommendations = getRecommendations();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recommendations</h1>
        <p className="text-gray-600">Discover products tailored for you</p>
        <div className="text-sm text-gray-500 mt-2">
          Powered by React Server Components
        </div>
      </div>

      {recommendations.featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">✨ Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.featured.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-green-600 font-medium">
                      {product.inventory} in stock
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recommendations.popularByCategory.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular by Category</h2>
          <div className="space-y-8">
            {recommendations.popularByCategory.map((categoryGroup) => (
              <div key={categoryGroup.category}>
                <h3 className="text-xl font-medium text-gray-800 mb-4">{categoryGroup.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryGroup.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{product.inventory} available</span>
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Product →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recommendations.budgetFriendly.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Budget-Friendly Picks
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.budgetFriendly.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      Budget Pick
                    </span>
                  </div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors text-center block"
                  >
                    Great Deal!
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recommendations.premium.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Premium Collection
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.premium.map((product) => (
              <div key={product.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                      Premium
                    </span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-600">
                      {product.inventory} available
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center block"
                  >
                    Explore Premium
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How We Make Recommendations</h3>
        <div className="text-blue-800 text-sm space-y-2">
          <p>• <strong>Featured Products:</strong> High-quality items with good availability and balanced pricing</p>
          <p>• <strong>Popular by Category:</strong> Best-selling items in each product category</p>
          <p>• <strong>Budget-Friendly:</strong> Great value products under $100</p>
          <p>• <strong>Premium Collection:</strong> High-end products for discerning customers</p>
        </div>
        <div className="mt-4 text-xs text-blue-600">
          This page is rendered using React Server Components for optimal performance
        </div>
      </div>
    </div>
  );
}