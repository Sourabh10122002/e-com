import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/data';
import { ProductFormData } from '@/types/product';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'admin-secret-key';

function checkAdminAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
  return apiKey === ADMIN_API_KEY;
}

export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin API key required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const requiredFields = ['name', 'description', 'price', 'category', 'inventory'];
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (typeof body.price !== 'number' || body.price < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    if (typeof body.inventory !== 'number' || body.inventory < 0) {
      return NextResponse.json(
        { error: 'Inventory must be a non-negative number' },
        { status: 400 }
      );
    }

    const productData: ProductFormData = {
      name: body.name.trim(),
      description: body.description.trim(),
      price: body.price,
      category: body.category.trim(),
      inventory: body.inventory,
    };

    const newProduct = createProduct(productData);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.message === 'A product with this name already exists') {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}