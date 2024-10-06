/* "use client";

import { UseSessionOptions } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { IProduct } from "../../types/productInterface";
import styled from "styled-components";
import { GET } from '../api/products/route';
import { Session } from "next-auth";

// Estilos
const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 40px;
`;

const H2 = styled.h2`
  margin-top: 25px;
  text-align: center;
  color: black;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;

interface SessionAuthenticate extends Session {
  accessToken?: string; 
  refreshToken?: string;  
}

// Componente ProductsPage
const ProductsPage: React.FC= () => {
  const { data: session, status }: { data: SessionAuthenticate | null; status: "loading" | "authenticated" | "unauthenticated" } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.accessToken) return;

      const token = session.accessToken;

      // Crea un objeto Request para pasar a la función GET
      const request = new Request('/api/products', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        const response = await GET(request); 
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data: IProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <LoadingMessage>Verificando sesión...</LoadingMessage>;
  }

  return (
    <div>
      <H2>Productos</H2>
      <Div>
        {loadingProducts ? (
          <LoadingMessage>Cargando productos...</LoadingMessage>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <LoadingMessage>No hay productos disponibles</LoadingMessage>
        )}
      </Div>
    </div>
  );
};

export default ProductsPage; */

"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { IProduct } from "../../types/productInterface";
import styled from "styled-components";
import { Session } from "next-auth";
import ProductFilter from "../../components/Filter"; // Importar el nuevo componente

// Estilos
const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 40px;
`;

const H2 = styled.h2`
  margin-top: 25px;
  text-align: center;
  color: black;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;

// Interfaz para la sesión
interface SessionAuthenticate extends Session {
  accessToken?: string; 
  refreshToken?: string;  
}

export interface IResponse<T> {
  status: number;         // Código de estado HTTP
  data?: T;              // Datos devueltos (puede ser un array de productos, etc.)
  error?: string;        // Mensaje de error (opcional)
}

// Componente ProductsPage
const ProductsPage: React.FC = () => {
  const { data: session, status }: { data: SessionAuthenticate | null; status: "loading" | "authenticated" | "unauthenticated" } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [filter, setFilter] = useState(''); // Estado para el filtro

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
    
        // Parsear la respuesta JSON, ya que es lo que recibimos en el cliente
        const data: IResponse<IProduct[]> = await response.json(); 
    
        // Verificar el estado y manejar los datos o errores
        if (response.ok) {
          setProducts(data.data || []); // Asignar los productos al estado
          console.log(data.data); // Aquí tienes el array de productos
        } else {
          console.error('Error:', data.error || 'Error desconocido'); // Manejo del error
        }
      } catch (error) {
        console.error('Error de la API:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <LoadingMessage>Verificando sesión...</LoadingMessage>;
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <H2>Productos</H2>
      <ProductFilter filter={filter} setFilter={setFilter} />
      <Div>
        {loadingProducts ? (
          <LoadingMessage>Cargando productos...</LoadingMessage>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <LoadingMessage>No hay productos disponibles</LoadingMessage>
        )}
      </Div>
    </div>
  );
};

export default ProductsPage;
