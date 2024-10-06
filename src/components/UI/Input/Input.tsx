// Input.tsx
import React from 'react';
import { InputStyle } from './InputStyle'; // Asegúrate de que la ruta sea correcta

// Definir los tipos de input permitidos
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'checkbox' | 'radio'; // Agrega más tipos si es necesario

interface InputProps {
  type?: InputType;        // Tipo del input, por defecto es "text"
  placeholder?: string;
  name: string; // Texto de marcador de posición
  value: string;        // Valor del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Manejador de cambio
  label?: string;       // Etiqueta opcional para el input
  id?: string;          // ID opcional para el input
  disabled?: boolean;   // Estado deshabilitado
}

// Componente Input funcional
const Input: React.FC<InputProps> = ({ 
  type = 'text', // Establecer 'text' como valor predeterminado
  placeholder, 
  value,
  name,
  onChange, 
  label, 
  id, 
  disabled = false 
}) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>} {/* Renderizar la etiqueta si existe */}
      <InputStyle 
        type={type} 
        placeholder={placeholder} 
        name={name}  // Añade el nombre al input
        value={value} 
        onChange={onChange} 
        id={id} 
        disabled={disabled}
      />
    </div>
  );
};

export default Input;

