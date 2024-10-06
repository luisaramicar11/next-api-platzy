import { NextResponse } from "next/server";
import { IProduct } from '../../../../types/productInterface';
import { IResponse } from '../../../../types/productInterface'; // Asegúrate de importar la interfaz

// Obtener producto por ID
export async function GET(request: Request, { params }: { params: { id: string } }): Promise<IResponse<IProduct>> {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ status: 401, error: 'Authorization token is missing' });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    // Manejo de errores de la conversión del ID
    if (isNaN(idNumber)) {
        return NextResponse.json({ status: 400, error: 'Invalid product ID' });
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
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Failed to fetch product' });
        }

        const data: IProduct = await response.json();
        return NextResponse.json({ status: 200, data }); // Ajuste a la interfaz
    } catch (error: unknown) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ status: 500, error: 'An unexpected error occurred' });
    }
}

// Actualizar producto
export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<IResponse<IProduct>> {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ status: 401, error: 'Authorization token is missing' });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ status: 400, error: 'Invalid product ID' });
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

        console.log(response)

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Failed to update product' });
        }

        const updatedProduct: IProduct = await response.json();
        return NextResponse.json({ status: 200, data: updatedProduct }); // Ajuste a la interfaz
    } catch (error: unknown) {
        console.error('Error updating product:', error);
        return NextResponse.json({ status: 500, error: 'An unexpected error occurred' });
    }
}

// Eliminar producto
export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<IResponse<null>> {
    const token: string | null = request.headers.get('Authorization');

    // Verifica si el token está presente
    if (!token) {
        return NextResponse.json({ status: 401, error: 'Authorization token is missing' });
    }

    const { id } = params;
    const idNumber: number = parseInt(id, 10);

    if (isNaN(idNumber)) {
        return NextResponse.json({ status: 400, error: 'Invalid product ID' });
    }

    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${idNumber}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            return NextResponse.json({ status: response.status, error: errorData.message || 'Failed to delete product' });
        }

        return NextResponse.json({ status: 200, data: null }); // Ajuste a la interfaz
    } catch (error: unknown) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ status: 500, error: 'An unexpected error occurred' });
    }
}
