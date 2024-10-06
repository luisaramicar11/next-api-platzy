// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { IProduct } from '../../../types/productInterface';

export interface IResponse<T> {
  status: number;         // Código de estado HTTP
  data?: T;              // Datos devueltos (puede ser un array de productos, etc.)
  error?: string;        // Mensaje de error (opcional)
}
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
// Función para manejar la petición GET (Obtener productos)
export async function GET(request: Request): Promise<IResponse<IProduct[]>> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ status: 401, error: 'No autorizado' });
  }

  try {
    const products: IProduct[] = await fetchProductsFromBackend(token);
    return NextResponse.json({ status: 200, data: products }); // Usando la interfaz
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Error al obtener los productos' });
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
      return NextResponse.json({ status: res.status, error: errorData.message || 'Error al agregar el producto'  });
    }

    const createdProduct: IProduct = await res.json();
    console.log(createdProduct)
    return NextResponse.json( { status: 201, data: createdProduct });
  } catch (error) {
    return NextResponse.json({ status: 500, error: 'Error al agregar el producto'});
  }
}
