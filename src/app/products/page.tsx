"use client";

import React, { useEffect, useState } from "react";
import { IProduct, Category } from "../../types/productInterface";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import CreateForm from "../../components/Form";
import Table from "../../components/Table";
import styled from "styled-components";
import { toast } from "react-toastify";

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  font-size: 15pt;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;

interface EditedProductState {
  category: Category;
  product: IProduct;
}

// Interfaz para la sesión
interface SessionAuthenticate extends Session {
  accessToken?: string;
  refreshToken?: string;
}

const Products: React.FC = () => {
  const { data: session, status }: { data: SessionAuthenticate | null; status: "loading" | "authenticated" | "unauthenticated" } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editedProduct, setEditedProduct] = useState<EditedProductState | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.accessToken) return;

      const token = session.accessToken;

      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Manejar la respuesta de la API de productos
        const responseData = await response.json();

        if (response.status === 200) {
          const data: IProduct[] = responseData.data; // Ajuste para usar la propiedad data
          setProducts(data);
        } else {
          console.error('Error al obtener los productos:', responseData);
          toast.error(`Error al obtener los productos: ${responseData.error || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error de la API al obtener productos:', error);
        toast.error('Error al obtener los productos');
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchCategories = async () => {
      if (!session?.accessToken) return;

      const token = session.accessToken;

      try {
        const response = await fetch('/api/categories', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Manejar la respuesta de la API de categorías
        const responseData = await response.json();

        if (response.status === 200) {
          const data: Category[] = responseData.data; // Ajuste para usar la propiedad data
          setCategories(data);
        } else {
          console.error('Error al obtener las categorías:', responseData);
          toast.error(`Error al obtener las categorías: ${responseData.error || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error de la API al obtener categorías:', error);
        toast.error('Error al obtener las categorías');
      }
    };

    // Iniciar las solicitudes si el usuario está autenticado
    if (status === 'authenticated') {
      fetchProducts();
      fetchCategories();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <LoadingMessage>Verificando sesión...</LoadingMessage>;
  }

  const handleCreateProduct = async (newProduct: IProduct) => {
    if (!session?.accessToken) return;
  
    const token = session.accessToken;
  
    try {
      // Validar las URLs de las imágenes
      const validImages = newProduct.images
        .map(image => image.trim())
        .filter(image => {
          try {
            new URL(image); // Verificar si la URL es válida
            return true;
          } catch {
            return false; // Si no es válida, la filtramos
          }
        });
  
      if (validImages.length === 0) {
        throw new Error("Debe proporcionar al menos una URL de imagen válida.");
      }
  
      // Preparar los datos del producto a enviar
      const productToSend = {
        title: newProduct.title,
        price: Number(newProduct.price),
        description: newProduct.description,
        categoryId: newProduct.category?.id, // Asignar solo el categoryId
        images: validImages,
      };
  
      console.log('Producto a enviar:', productToSend);
  
      // Hacer la solicitud al API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToSend), // Enviar solo las propiedades necesarias
      });
      console.log(response)
      // Manejar la respuesta de la creación del producto
      const responseData = await response.json();

      console.log(responseData)

      if (response.status === 201 && responseData.data) {
        const createdProduct: IProduct = responseData.data; // Ajuste para usar la propiedad data
        setProducts(prev => [...prev, createdProduct]); // Agregar el producto creado a la lista
        return createdProduct;
      }
      toast.success("Producto creado exitosamente!");
    } catch (error: unknown) {
      console.error('Error al enviar el producto:', error);
      toast.error("Error al crear el producto.");
    }
  };
  

  const handleUpdateProduct = async (updatedProduct: IProduct) => {
    if (!session?.accessToken) return;

    const token = session.accessToken;

    try {
      const productToUpdate = {
        title: updatedProduct.title,
        price: Number(updatedProduct.price),
        description: updatedProduct.description,
        categoryId: updatedProduct.category?.id, // Asignar solo el categoryId
        images: updatedProduct.images.map(cleanImageUrl),
      };
      console.log(updatedProduct)
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToUpdate),
      });

      const responseData = await response.json(); // Cambiado a fetch
      console.log(responseData)

      if (responseData.status === 200 && responseData.data) {
        const updatedProductData: IProduct = responseData.data; // Ajuste para usar la propiedad data
        setProducts((prev) =>
          prev.map((product) => (product.id === updatedProductData.id ? updatedProductData : product))
        );
        toast.success("Producto actualizado exitosamente!");
        setEditedProduct(null);
      } 
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("Error al actualizar el producto.");
    }
  };
  function cleanImageUrl(imageString: string): string {
    return imageString.replace(/^\["/, "").replace(/"\]$/, "").replace(/\\"/g, '"');
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!session?.accessToken) return;

    const token = session.accessToken;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json(); // Cambiado a fetch
      
      if (response.status === 200) {
        setProducts((prev) => prev.filter((product) => product.id !== productId));
        toast.success("Producto eliminado exitosamente!");
      } else {
        console.error("Error al eliminar el producto", responseData);
        toast.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast.error("Error al eliminar el producto.");
    }
  };

  return (
    <>
      <Title>Productos CRUD</Title>

      <CreateForm
        createData={handleCreateProduct}
        updateData={handleUpdateProduct}
        dataToEdit={editedProduct?.product || null}
        setDataToEdit={(product: IProduct | null) =>
          setEditedProduct(product ? { category: { id: 0, name: "", image: "" }, product } : null)
        }
        categories={categories}
      />
      <Table
        data={products}
        setDataToEdit={(product: IProduct | null) =>
          setEditedProduct(product ? { category: { id: 0, name: "", image: "" }, product } : null)
        }
        deleteData={handleDeleteProduct}
      />
    </>
  );
};



export default Products;
