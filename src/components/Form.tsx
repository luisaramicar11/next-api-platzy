import React, { FormEvent, MouseEvent, useState, useEffect } from 'react';
import { IProduct, Category } from "../types/productInterface";
import Button from "../components/UI/Button/Button"
import styled from "styled-components";

const Form = styled.form`
  padding: 15px;
  border-radius: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  color: #333;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 10px;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Option = styled.option`
  padding: 0.5em;
  font-size: 1em;
  color: #333;
  background-color: #fff;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const Div = styled.div`
  margin: 15px;
  display: flex;
  gap:1rem;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  font-size: 15pt;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px #ccc solid;
  padding: 7px;
  font-size: small;
  color: black;
`;

interface CreateFormProps { 
    createData: (product: IProduct) => void;
    updateData: (product: IProduct) => void;
    dataToEdit: IProduct | null;
    setDataToEdit: (data: IProduct | null) => void;
    categories: Category[];
}

const initialForm: IProduct = {
    id: 0,  
    title: "",
    description: "",
    price: 0,
    images: [],  
    category: { id: 0, name: "", image: "" }
};

const CreateForm: React.FC<CreateFormProps> = ({ createData, updateData, dataToEdit, setDataToEdit, categories }) => {
    const [form, setForm] = useState<IProduct>(initialForm);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
      if (dataToEdit) {
        setForm(dataToEdit);
        setSelectedCategory(dataToEdit.category.name || "");
      } else {
        setForm(initialForm);
        setSelectedCategory("");
      }
    }, [dataToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newImages = [...form.images];
      newImages[index] = e.target.value;
      setForm(prevForm => ({ ...prevForm, images: newImages }));
    };
    
    const handleAddImage = () => {
      setForm(prevForm => ({ ...prevForm, images: [...prevForm.images, ""] }));
    };
    
    const handleRemoveImage = (index: number) => {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm(prevForm => ({ ...prevForm, images: newImages }));
    };
    

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categoryName = e.target.value;
      const selectedCategory = categories.find(cat => cat.name === categoryName);
      
      if (selectedCategory) {
          setSelectedCategory(categoryName);
          setForm(prevForm => ({
              ...prevForm,
              category: selectedCategory
          }));
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!form.id) {
          form.id = Date.now();
          createData(form);
      } else {
          updateData(form);
      }
      handleReset(e);
    };

    const handleReset = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setForm(initialForm);
      setDataToEdit(null);
      setSelectedCategory("");
    };

    function cleanImageUrl(imageString: string): string {
      // Elimina los corchetes y comillas del string
      const cleanedString = imageString
        .replace(/^\["/, '') // Quita el inicio con [" 
        .replace(/"\]$/, '') // Quita el final con "]
        .replace(/\\\"/g, '"'); // Reemplaza las comillas escapadas por comillas normales
    
      return cleanedString;
    }

    return (
      <main>
        <Title>{dataToEdit ? "Editar Producto" : "Agregar Producto"}</Title>
        <Div>
          <Form onSubmit={handleSubmit}>
            <Input   
              type="text"
              name="title"
              placeholder="Escribe el nombre del producto"
              onChange={handleChange}
              value={form.title}
              required
            />
            <Input
              type="text"
              name="description"
              placeholder="Escribe la descripción del producto"
              onChange={handleChange}
              value={form.description}
              required
            />
            <Input
              type="number"
              name="price"
              placeholder="Precio"
              onChange={handleChange}
              value={form.price}
              required
            />
            {form.images.map((image, index) => (
              <div key={index}>
                <Input
                  type="text"
                  name={`image-${index}`}
                  placeholder="URL de la imagen"
                  onChange={(e) => handleImageChange(index, e)}
                  value={cleanImageUrl(image)}
                />
                <Button type="button" onClick={() => handleRemoveImage(index)}>Eliminar Imagen</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddImage}>Añadir Imagen</Button>
            <br />
            <Select name="category" value={selectedCategory} onChange={handleCategoryChange}>
              <Option value="">Seleccione una categoría</Option>
              {categories.map(category => (
                <Option key={category.id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
            <Div>
              <Button type="submit">Enviar</Button>
              <Button type="reset" onClick={handleReset}>Limpiar</Button>
            </Div>
          </Form>
        </Div>
      </main>
    );
  };

export default CreateForm;