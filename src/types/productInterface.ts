export interface IProduct {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    images:      string[];
}

export interface Category {
    id:    number;
    name:  string;
    image: string;
}

export interface CardProps{
    product: IProduct;
}

export interface TableRowProducts {
    product : IProduct,
    setDataToEdit: (product: IProduct | null) => void;
    deleteData: (id: number) => void;
}

export interface TableData {
    data : IProduct[],
    setDataToEdit: (product: IProduct | null) => void;
    deleteData: (id: number) => void;
}

export interface IResponse<T> {
    status: number; // Código de estado HTTP
    data?: T;      // Datos devueltos (puede ser un array de productos, etc.)
    error?: string; // Mensaje de error (opcional)
  }