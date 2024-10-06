// Label.tsx
import React from 'react';
import { LabelStyle } from './LabelStyle'; // Asegúrate de que la ruta sea correcta

interface LabelProps {
  text: string; // El texto que se mostrará en la etiqueta
  htmlFor?: string; // Asocia el label con un input mediante el id
  className?: string; // Clases adicionales para personalizar estilos
}

// Componente Label funcional
const Label: React.FC<LabelProps> = ({ text, htmlFor, className }) => {
  return (
    <LabelStyle htmlFor={htmlFor} className={className}>
      {text}
    </LabelStyle>
  );
};

export default Label;

