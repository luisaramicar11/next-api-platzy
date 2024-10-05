import { NextResponse } from "next/server";
import { IProduct } from '../../../../types/productInterface';

export async function GETBYID(request: Request, { params }: { params: { id: string } }) {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    // Manejo de errores de la conversión del ID
    if (isNaN(idNumber)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${idNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Manejo de la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to fetch product' }, { status: response.status });
        }

        const data: IProduct = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error: unknown) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

