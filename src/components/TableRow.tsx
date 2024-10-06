import React from "react";
import { TableRowProducts } from "../types/productInterface";
import styled from "styled-components";

const Td = styled.td`
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
`;

// Estilos para las imágenes en la tabla
const Img = styled.img`
  width: 50%;
  height: 75px;
  object-fit: cover;
`;

const EditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid orange;
  margin: 5px;
  color: orange;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    background-color: orange;
    color: white;
}
`

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid red;
  margin: 5px;
  color: red;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    background-color: red;
    color: white;
}
`

const Tr = styled.tr`
  text-align: center;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
const TableRow: React.FC<TableRowProducts> = ({ product, setDataToEdit, deleteData }) => {
  const { id, title, description, price, category, images } = product;

  function cleanImageUrl(imageString: string): string {
    // Elimina los corchetes y comillas del string
    const cleanedString = imageString
      .replace(/^\["/, '') // Quita el inicio con [" 
      .replace(/"\]$/, '') // Quita el final con "]
      .replace(/\\\"/g, '"'); // Reemplaza las comillas escapadas por comillas normales
  
    return cleanedString;
  }

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{description}</Td>
      <Td>${price}</Td>
      <Td>{category.name}</Td>
      <Td>
        {images.length > 0 && (
          <img 
            src={ cleanImageUrl(images[0])} 
            alt={`Product image`} 
            style={{ width: "50px", height: "50px" }} 
          />
        )}
      </Td>
      <Td>
        <EditButton onClick={() => setDataToEdit(product)}>Editar</EditButton>
        <DeleteButton onClick={() => deleteData(id)}>Eliminar</DeleteButton>
      </Td>
    </Tr>
  );
};

export default TableRow;