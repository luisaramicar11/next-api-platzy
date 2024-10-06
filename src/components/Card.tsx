import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../app/redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../app/redux/slices/favoritesSlice';
import { RootState, AppDispatch } from '../app/redux/store';
import { CardProps } from '../types/productInterface';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Usa el corazón relleno para favoritos
import ModalDetails from "../components/DetailsModal";
import { useState } from 'react';

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

// Botón de favorito, que alterna entre vacío y relleno
const FavoriteIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal

  // Revisa si el producto ya está en favoritos
  const isFavorite = useSelector((state: RootState) => 
    state.favorites.items.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleViewDetails = () => {
    setModalOpen(true); // Abre el modal
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
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

          {/* Alterna entre los íconos de corazón según el estado */}
          <FavoriteIcon onClick={handleAddToFavorites}>
            {isFavorite ? <AiFillHeart color="#ff0000" /> : <AiOutlineHeart color="#ff0000" />}
          </FavoriteIcon>
        </ButtonContainer>
      </CardContainer>

      {/* Renderiza el ModalDetails y pasa las props necesarias */}
      <ModalDetails 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={product} 
      />
    </>
  );
};

export default Card;
