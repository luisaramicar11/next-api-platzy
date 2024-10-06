// InputStyle.tsx
import styled from 'styled-components';

export const InputStyle = styled.input`
  background-color: #fff; /* Color de fondo */
  width: 100%;           /* Ancho completo */
  padding: 10px;        /* Espaciado interno */
  font-size: 16px;      /* Tamaño de fuente */
  border: 1px solid #ccc; /* Borde */
  border-radius: 10px;   /* Bordes redondeados */
  margin-bottom: 16px;  /* Espacio inferior */
  
  
  &:focus {
    outline: none;          /* Quitar el borde de enfoque predeterminado */
  }
  
  &:disabled {
    background-color: #f5f5f5; /* Color de fondo al deshabilitar */
    cursor: not-allowed;       /* Cursor al deshabilitar */
  }
`;
