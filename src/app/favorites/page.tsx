"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';
import styled from 'styled-components';
import Card from '../../components/Card';
import { IProduct } from '@/types/productInterface';

const FavoritesContainer = styled.div`
  padding: 20px;
`;

const Favorites: React.FC = () => {
  const favoriteItems: IProduct[] = useSelector((state: RootState) => state.favorites.items);

  return (
    <FavoritesContainer>
      <h1>Mis Favoritos</h1>
      {favoriteItems.length > 0 ? (
        favoriteItems.map((product) => (
          <Card key={product.id} product={product} />
        ))
      ) : (
        <p>No tienes productos en favoritos.</p>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
