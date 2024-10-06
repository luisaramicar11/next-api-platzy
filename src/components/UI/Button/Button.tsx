import { ButtonStyle } from "./ButtonStyle";

// Definir las props que el botón aceptará
interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean; 
  label: string;
  onClick: () => void; 
}

// Componente Button funcional
const Button: React.FC<ButtonProps> = ({ children, disabled = false, onClick, label }) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick}>
      {label}
      {children}
    </ButtonStyle>
  );
};

export default Button;
