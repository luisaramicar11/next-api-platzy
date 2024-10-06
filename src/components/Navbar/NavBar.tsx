"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import SelectLanguage from '@/components/UI/SelectLanguage/SelectLanguage';
import CartModal from '../CardModal';

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const SignoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1rem;
  margin-left: 1rem;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const FavoritesLink = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const Navbar = () => {
  const { data: session } = useSession();
  const traduction = useTranslations('Navbar');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteCount = useSelector((state: RootState) => state.favorites.items.length);
  // Estado para el modal
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const handleCartClick = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <NavbarContainer>
      <Container>
        <NavLink href="/">{traduction('home')}</NavLink>
        
        {session?.user ? (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <FavoritesLink href="/favorites">
          Favoritos ({favoriteCount})
        </FavoritesLink>
        <FavoritesLink href="/products">
          Productos
        </FavoritesLink>
            <NavLink href="#" onClick={handleCartClick}>🛒 Carrito ({cartItems.length})</NavLink>
            <SelectLanguage />
            <SignoutButton onClick={() => signOut()}>Signout</SignoutButton>
          </>
        ) : (
          <>
            <NavLink href="/login">{traduction('login')}</NavLink>
            <NavLink href="/register">{traduction('register')}</NavLink>
            <SelectLanguage />
          </>
        )}
      </Container>
      {isCartModalOpen && <CartModal onClose={closeCartModal} />} {/* Mostrar el modal */}
    </NavbarContainer>
  );
};

export default Navbar;
