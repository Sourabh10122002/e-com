export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string; // ISO datetime
  imageUrl?: string; // Optional field for product images
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

export interface InventoryStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
}