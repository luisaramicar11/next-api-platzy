import React from "react";
import styled from "styled-components";

const Th = styled.th`
  background-color: black;
  color: white;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableHeader: React.FC = () => {
    return (
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Precio</Th>
          <Th>Category</Th>
          <Th>Image</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
    );
  };
  
  export default TableHeader;