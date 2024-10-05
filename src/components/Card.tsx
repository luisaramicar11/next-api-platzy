import { useDispatch } from 'react-redux';
import { addItem } from '../app/redux/slices/cartSlice';
import { CardProps } from '../types/productInterface';
import styled from 'styled-components';
import { AppDispatch } from '../app/redux/store';
import { AiOutlineHeart } from 'react-icons/ai'; 
import ModalDetails from "../components/DetailsModal";
import { useState } from 'react'; // Asegúrate de importar useState

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 15px;
  width: 20%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
`;

const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 12px;
  font-weight: bold;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ViewDetailsButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FavoriteIcon = styled(AiOutlineHeart)`
  color: #ff0000;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    color: #cc0000;
  }
`;

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const [selectedProduct, setSelectedProduct] = useState(product); // Estado para almacenar el producto seleccionado

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleViewDetails = () => {
    setSelectedProduct(product); // Establece el producto seleccionado
    setModalOpen(true); // Abre el modal
  };

  const handleAddToFavorites = () => {
    console.log('Añadido a favoritos');
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  return (
    <>
      <CardContainer>
        <ProductImage src={product.images[0]} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <ButtonContainer>
          <AddToCartButton onClick={handleAddToCart}>Agregar al carrito</AddToCartButton>
          <ViewDetailsButton onClick={handleViewDetails}>Ver detalles</ViewDetailsButton>
          <FavoriteIcon onClick={handleAddToFavorites} />
        </ButtonContainer>
      </CardContainer>

      {/* Renderiza el ModalDetails y pasa las props necesarias */}
      <ModalDetails 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </>
  );
};

export default Card;

