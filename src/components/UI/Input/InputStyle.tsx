// InputStyle.tsx
import styled from 'styled-components';

export const InputStyle = styled.input`
  width: 100%;           /* Ancho completo */
  padding: 10px;        /* Espaciado interno */
  font-size: 16px;      /* Tamaño de fuente */
  border: 1px solid #ccc; /* Borde */
  border-radius: 4px;   /* Bordes redondeados */
  margin-bottom: 16px;  /* Espacio inferior */
  
  &:focus {
    border-color: #007bff; /* Color del borde al enfocar */
    outline: none;          /* Quitar el borde de enfoque predeterminado */
  }
  
  &:disabled {
    background-color: #f5f5f5; /* Color de fondo al deshabilitar */
    cursor: not-allowed;       /* Cursor al deshabilitar */
  }
`;
