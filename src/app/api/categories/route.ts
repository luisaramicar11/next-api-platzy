// app/api/products/route.ts
import { NextResponse } from 'next/server';
import {Category } from '../../../types/productInterface';

// Simulando una base de datos o llamando a un backend externo
// Esta función puede reemplazarse con la lógica que llame a tu base de datos o servicio
async function fetchCategoriesFromBackend(token: string): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`, {
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
    return NextResponse.json({ status: 401, error: 'No autorizado'  });
  }

  try {
    const categories: Category[] = await fetchCategoriesFromBackend(token);
    console.log("categorias", categories);
    return NextResponse.json({ status: 200, data: categories });
  } catch (error) {
    return NextResponse.json({ status: 500 , error: 'Error al obtener los productos'  });
  }
}