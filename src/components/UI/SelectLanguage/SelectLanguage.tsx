import React from 'react';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styled from 'styled-components';

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  
  &:hover {
    border-color: #aaa;
  }
`;

export default function SelectLanguage(): React.ReactElement {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        Cookies.set("locale", e.target.value);
        router.refresh();
    };

    return (
        <Dropdown onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
        </Dropdown>
    );
}

