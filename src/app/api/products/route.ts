// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { IProduct } from '../../../types/productInterface';

// Simulando una base de datos o llamando a un backend externo
// Esta función puede reemplazarse con la lógica que llame a tu base de datos o servicio
async function fetchProductsFromBackend(token: string): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }

  return res.json();
}

// Función para manejar la petición GET (Obtener productos)
export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const products: IProduct[] = await fetchProductsFromBackend(token);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}

// Función para manejar la petición POST (Agregar un producto)
export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Parsear los datos del producto desde el cuerpo de la solicitud
    const productData: IProduct = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData), // Enviar los datos del nuevo producto en formato JSON
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || 'Error al agregar el producto' }, { status: res.status });
    }

    const createdProduct: IProduct = await res.json();
    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al agregar el producto' }, { status: 500 });
  }
}
