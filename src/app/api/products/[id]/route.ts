import { NextResponse } from "next/server";
import { IProduct } from '../../../../types/productInterface';

// Obtener producto por ID
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
                'Authorization': `Bearer ${token}`,
            },
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

// Actualizar producto
export async function UPDATE(request: Request, { params }: { params: { id: string } }) {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    try {
        const productData = await request.json(); // Parsear el cuerpo de la solicitud

        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${idNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to update product' }, { status: response.status });
        }

        const updatedProduct: IProduct = await response.json();
        return NextResponse.json(updatedProduct, { status: response.status });
    } catch (error: unknown) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

// Eliminar producto
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${idNumber}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Failed to delete product' }, { status: response.status });
        }

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
