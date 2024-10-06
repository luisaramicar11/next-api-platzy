// Input.tsx
import React from 'react';
import { InputStyle } from './InputStyle'; // Asegúrate de que la ruta sea correcta

interface InputProps {
  type?: string;        // Tipo del input, por defecto es "text"
  placeholder?: string; // Texto de marcador de posición
  value: string;        // Valor del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Manejador de cambio
  label?: string;       // Etiqueta opcional para el input
  id?: string;          // ID opcional para el input
  disabled?: boolean;   // Estado deshabilitado
}

// Componente Input funcional
const Input: React.FC<InputProps> = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  label, 
  id, 
  disabled = false 
}) => {
  return (
      <InputStyle 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        id={id} 
        disabled={disabled}
      />
  );
};

export default Input;
