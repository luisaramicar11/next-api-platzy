"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { createUser } from "../api/users/route"
import { IUser, IResponseCreateUser } from "../../types/userInterface"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Label from "../../components/UI/Label/Label"

// Estilos usando styled-components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  list-style: none;
`;

const ErrorItem = styled.li`
  margin-bottom: 0.5rem;
`;

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const router: AppRouterInstance = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const newUser: IUser = {
      email,
      password,
      name,
      avatar
    }

    const res:IResponseCreateUser = await createUser(newUser)

    const responseNextAuth: SignInResponse | undefined = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      toast.error("Ocurrio un error");
      return;
    }
    
    toast.success("Registro exitoso");
    router.push("/login");
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="Name" text="Name"/>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(event) =>
            setName(event.target.value )
          }
        />

        <Label htmlFor="lastname" text="Email"/>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value )
          }
        />

        <Label htmlFor="password" text="Password"/>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Label htmlFor="avatar" text="Avatar"/>
        <Input
          type="text"
          placeholder="Avatar"
          name="avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />

        <Button type="submit">Register</Button>
      </Form>

      {errors.length > 0 && (
        <ErrorList>
          {errors.map((error) => (
            <ErrorItem key={error}>{error}</ErrorItem>
          ))}
        </ErrorList>
      )}
    </Container>
  );
};

export default RegisterPage;
