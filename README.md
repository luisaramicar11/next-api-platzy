# Next.js Product Management App

This is a product management project developed with Next.js, TypeScript, and NextAuth, which includes functionality to handle CRUD operations for products and support for internationalization (i18n) in English and Spanish.

## Features

- **Product CRUD**: Allows you to create, read, update, and delete products.
- **Authentication**: Support for user authentication using NextAuth.
- **User Interface**: Utilizes styled-components for custom styling.
- **Internationalization**: Support for switching between English and Spanish.

## Technologies Used

- **Next.js**: React framework for web applications.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **NextAuth**: A library for authentication in Next.js applications.
- **Styled-components**: A library for CSS in JavaScript styling.
- **React Toastify**: A library for toast notifications.
- **Redux Toolkit**: Global state management.
- **i18n**: Internationalization.

## Installation

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd <REPOSITORY_NAME>

2. Install the dependencies:

   ```bash
   npm install

3. Set up environment variables by creating the .env.local file and adding the following variables:

   ```bash
   NEXT_PUBLIC_BACKEND_URL=<URL_DE_TU_BACKEND>
   NEXTAUTH_SECRET=no-utilizar-esta-apalabra-en-produccion 

4. Start the development server:

   ```bash
   npm run dev 

5.  Open your browser and visit http://localhost:3000. 

## Usage

- Upon opening the application, you can manage products from the interface.
- You can change the application's language using the language selector in the upper right corner.
