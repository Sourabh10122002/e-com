import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600">
          The product you're looking for doesn't exist or may have been removed.
        </p>
      </div>
      
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All Products
        </Link>
        
        <div>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Check Inventory Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}