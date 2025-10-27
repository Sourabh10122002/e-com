import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductFormData, InventoryStats } from '@/types/product';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export function readProductsFromFile(): Product[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
}

export function writeProductsToFile(products: Product[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing products file:', error);
    throw new Error('Failed to save products');
  }
}

export function getAllProducts(): Product[] {
  return readProductsFromFile();
}

export function getProductBySlug(slug: string): Product | null {
  const products = readProductsFromFile();
  return products.find(product => product.slug === slug) || null;
}

export function getProductById(id: string): Product | null {
  const products = readProductsFromFile();
  return products.find(product => product.id === id) || null;
}

export function createProduct(productData: ProductFormData): Product {
  const products = readProductsFromFile();
  
  const slug = productData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const existingProduct = products.find(p => p.slug === slug);
  if (existingProduct) {
    throw new Error('A product with this name already exists');
  }
  
  const newProduct: Product = {
    id: uuidv4(),
    ...productData,
    slug,
    lastUpdated: new Date().toISOString(),
  };
  
  products.push(newProduct);
  writeProductsToFile(products);
  
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<ProductFormData>): Product | null {
  const products = readProductsFromFile();
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return null;
  }
  
  if (updates.name) {
    const newSlug = updates.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const existingProduct = products.find(p => p.slug === newSlug && p.id !== id);
    if (existingProduct) {
      throw new Error('A product with this name already exists');
    }
    
    updates = { ...updates, slug: newSlug } as any;
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  
  writeProductsToFile(products);
  return products[productIndex];
}

export function deleteProduct(id: string): boolean {
  const products = readProductsFromFile();
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length === products.length) {
    return false; // Product not found
  }
  
  writeProductsToFile(filteredProducts);
  return true;
}

export function getInventoryStats(): InventoryStats {
  const products = readProductsFromFile();
  
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.inventory > 0 && p.inventory <= 10).length;
  const outOfStockProducts = products.filter(p => p.inventory === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0);
  
  return {
    totalProducts,
    lowStockProducts,
    outOfStockProducts,
    totalValue,
  };
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}