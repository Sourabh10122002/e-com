Name - Sourabh Rawat
Date - 27 October 2025

# E-Commerce Web Application

A modern e-commerce web application built with Next.js 16, demonstrating different rendering strategies across various sections of the application.

## 🚀 Features

- **Product Catalog**: Browse and search through products with filtering and sorting
- **Product Details**: Detailed product pages with related products
- **Inventory Dashboard**: Real-time inventory statistics and management
- **Admin Panel**: Product management with CRUD operations
- **Recommendations**: AI-powered product recommendations
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Architecture & Rendering Strategies

This application demonstrates four different Next.js rendering methods:

### 1. Static Site Generation (SSG) - Home Page (`/`)
- **Implementation**: `src/app/page.tsx`
- **Strategy**: Pre-rendered at build time
- **Benefits**: Fastest loading, excellent SEO, cached by CDN
- **Use Case**: Product listing page that doesn't change frequently

### 2. Incremental Static Regeneration (ISR) - Product Details (`/products/[slug]`)
- **Implementation**: `src/app/products/[slug]/page.tsx`
- **Strategy**: Static generation with 60-second revalidation
- **Benefits**: Static performance with fresh content updates
- **Use Case**: Product pages that need periodic updates for inventory/pricing

### 3. Server-Side Rendering (SSR) - Dashboard (`/dashboard`)
- **Implementation**: `src/app/dashboard/page.tsx`
- **Strategy**: Rendered on each request
- **Benefits**: Always fresh data, good for dynamic content
- **Use Case**: Inventory dashboard requiring real-time data

### 4. Client-Side Rendering (CSR) - Admin Panel (`/admin`)
- **Implementation**: `src/app/admin/page.tsx`
- **Strategy**: Rendered in the browser with React hooks
- **Benefits**: Interactive UI, real-time updates, reduced server load
- **Use Case**: Admin interface with complex interactions

### 5. React Server Components (RSC) - Recommendations (`/recommendations`)
- **Implementation**: `src/app/recommendations/page.tsx`
- **Strategy**: Server components with zero client-side JavaScript
- **Benefits**: Reduced bundle size, server-side data fetching
- **Use Case**: Content-heavy pages with minimal interactivity

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: JSON file-based (mock database)
- **Authentication**: API key-based (demo purposes)
- **Build Tool**: Turbopack (Next.js 16 default)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   ADMIN_API_KEY=admin123
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 🎯 Usage Guide

### Browsing Products
- Visit the home page to see all products
- Use the search bar to find specific products
- Filter by category or sort by price/name
- Click on any product to view details

### Admin Operations
1. Navigate to `/admin`
2. Enter the admin API key: `admin123`
3. Add, edit, or view products
4. Changes are reflected immediately across the application

### Viewing Analytics
- Visit `/dashboard` to see real-time inventory statistics
- Monitor low stock and out-of-stock items
- View total inventory value and product counts

### Getting Recommendations
- Visit `/recommendations` for personalized product suggestions
- Browse featured products, category-based recommendations, and more

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel (CSR)
│   ├── api/               # API routes
│   │   ├── products/      # Product CRUD operations
│   │   └── inventory/     # Inventory statistics
│   ├── dashboard/         # Inventory dashboard (SSR)
│   ├── products/[slug]/   # Product details (ISR)
│   ├── recommendations/   # Recommendations (RSC)
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page (SSG)
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Site navigation
│   ├── ProductCard.tsx    # Product display card
│   └── SearchAndFilter.tsx # Search and filtering
├── lib/                   # Utility functions
│   └── data.ts           # Data management functions
└── types/                 # TypeScript type definitions
    └── product.ts        # Product-related types

data/
└── products.json         # Mock database file
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/[slug]` - Fetch product by slug
- `GET /api/inventory/stats` - Get inventory statistics

### Protected Endpoints (Require API Key)
- `POST /api/products` - Create new product
- `PUT /api/products/update/[id]` - Update existing product

### Authentication
Include the API key in request headers:
```javascript
headers: {
  'x-api-key': 'admin123'
}
```

## 🎨 Styling & Design

- **Framework**: Tailwind CSS for utility-first styling
- **Design System**: Consistent color palette and spacing
- **Responsive**: Mobile-first approach with breakpoints
- **Components**: Reusable styled components
- **Icons**: SVG icons for better performance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

## 🧪 Development

### Adding New Products
Products are stored in `data/products.json`. The structure:
```json
{
  "id": "unique-id",
  "name": "Product Name",
  "slug": "product-slug",
  "description": "Product description",
  "price": 99.99,
  "category": "Category",
  "inventory": 50,
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

### Extending the API
Add new routes in `src/app/api/` following the existing patterns.

### Adding New Pages
Create new pages in `src/app/` using the appropriate rendering strategy.

## 📊 Performance Considerations

### Rendering Strategy Selection
- **SSG**: Use for content that rarely changes (marketing pages, product catalogs)
- **ISR**: Use for content that changes periodically (product details, blog posts)
- **SSR**: Use for personalized or real-time content (dashboards, user profiles)
- **CSR**: Use for highly interactive interfaces (admin panels, complex forms)
- **RSC**: Use for content-heavy pages with minimal interactivity

### Optimization Features
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by route
- **Caching**: Appropriate caching strategies for each rendering method
- **Bundle Analysis**: Use `npm run build` to analyze bundle sizes

## 🔍 Monitoring & Analytics

### Built-in Monitoring
- Real-time inventory tracking
- Product performance metrics
- User interaction analytics (can be extended)

### Recommended Tools
- **Vercel Analytics**: For deployment analytics
- **Google Analytics**: For user behavior tracking
- **Sentry**: For error monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

## 🆘 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Getting Help
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
- Open an issue in the repository

---

Built with ❤️ using Next.js 16 and modern web technologies.
