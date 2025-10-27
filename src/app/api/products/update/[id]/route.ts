import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, getProductById } from '@/lib/data';
import { ProductFormData } from '@/types/product';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'admin-secret-key';

function checkAdminAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
  return apiKey === ADMIN_API_KEY;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin API key required.' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const existingProduct = getProductById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    const updates: Partial<ProductFormData> = {};
    
    if (body.name !== undefined) {
      if (typeof body.name !== 'string' || !body.name.trim()) {
        return NextResponse.json(
          { error: 'Name must be a non-empty string' },
          { status: 400 }
        );
      }
      updates.name = body.name.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== 'string') {
        return NextResponse.json(
          { error: 'Description must be a string' },
          { status: 400 }
        );
      }
      updates.description = body.description.trim();
    }

    if (body.price !== undefined) {
      if (typeof body.price !== 'number' || body.price < 0) {
        return NextResponse.json(
          { error: 'Price must be a positive number' },
          { status: 400 }
        );
      }
      updates.price = body.price;
    }

    if (body.category !== undefined) {
      if (typeof body.category !== 'string' || !body.category.trim()) {
        return NextResponse.json(
          { error: 'Category must be a non-empty string' },
          { status: 400 }
        );
      }
      updates.category = body.category.trim();
    }

    if (body.inventory !== undefined) {
      if (typeof body.inventory !== 'number' || body.inventory < 0) {
        return NextResponse.json(
          { error: 'Inventory must be a non-negative number' },
          { status: 400 }
        );
      }
      updates.inventory = body.inventory;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const updatedProduct = updateProduct(id, updates);
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error('Error updating product:', error);
    
    if (error.message === 'A product with this name already exists') {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}