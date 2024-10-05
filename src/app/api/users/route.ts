// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { IResponseCreateUser, IUser } from '../../../types/userInterface';

// Simulando una base de datos o llamando a un backend externo
// Esta función puede reemplazarse con la lógica que llame a tu base de datos o servicio
async function fetchUsersFromBackend(token: string): Promise<IResponseCreateUser[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }

  return res.json();
}

export async function createUser(userData: IUser): Promise<IResponseCreateUser> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!res.ok) {
      throw new Error('Error al crear el usuario');
    }
  
    return res.json();
  }
  
// Función para manejar la petición GET
export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const products = await fetchUsersFromBackend(token);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}
