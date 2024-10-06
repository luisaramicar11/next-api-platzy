import React from 'react';
import styled from 'styled-components';

const FilterInput = styled.input`
  margin: 20px auto;
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

interface ProductFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filter, setFilter }) => {
  return (
    <FilterInput
      type="text"
      placeholder="Buscar productos..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default ProductFilter;
