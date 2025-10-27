import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '@/lib/data';
import { Product } from '@/types/product';
import { formatDistanceToNow } from 'date-fns';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - ModernShop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isLowStock = product.inventory > 0 && product.inventory <= 10;
  const isOutOfStock = product.inventory === 0;
  const lastUpdated = formatDistanceToNow(new Date(product.lastUpdated), { addSuffix: true });

  const getProductImage = (category: string, productName: string) => {
    const categoryMap: { [key: string]: string } = {
      'Electronics': 'technology',
      'Clothing': 'fashion',
      'Home & Garden': 'home',
      'Sports': 'sports',
      'Books': 'books',
      'Beauty': 'beauty',
      'Toys': 'toys',
      'Food': 'food'
    };
    
    const searchTerm = categoryMap[category] || 'product';
    return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <span className="text-slate-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src={getProductImage(product.category, product.name)}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-800 text-sm px-4 py-2 rounded-full font-medium shadow-lg">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-4 mb-6">
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-slate-500 line-through text-xl">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Availability</h3>
              <div className="flex items-center space-x-4">
                {isOutOfStock ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                    Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></span>
                    Only {product.inventory} left!
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                    In Stock ({product.inventory} available)
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                disabled={isOutOfStock}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isOutOfStock
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button className="w-full py-4 px-8 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                Add to Wishlist
              </button>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Product Information</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <dt className="text-slate-600 font-medium">Product ID:</dt>
                  <dd className="text-slate-900 font-mono text-sm bg-slate-100 px-3 py-1 rounded-lg">{product.id}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <dt className="text-slate-600 font-medium">Last Updated:</dt>
                  <dd className="text-slate-900">{lastUpdated}</dd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <dt className="text-slate-600 font-medium">Category:</dt>
                  <dd className="text-slate-900 font-semibold">{product.category}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* ISR Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-900 mb-4 flex items-center">
            Incremental Static Regeneration (ISR)
          </h2>
          <p className="text-emerald-800 text-lg leading-relaxed">
            This page was statically generated at build time but automatically regenerates every 60 seconds 
            when there's traffic. This ensures fresh data (like inventory levels and prices) while maintaining 
            the performance benefits of static generation. Last updated: {lastUpdated}
          </p>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">You Might Also Like</h2>
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 3);

  const getProductImage = (category: string) => {
    const images = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center&auto=format&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No related products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={getProductImage(product.category)}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg mb-2">
              {product.name}
            </h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}