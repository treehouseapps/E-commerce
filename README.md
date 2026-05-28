# E-commerce Frontend

This is the frontend application for a custom e-commerce project. It is built with React, Vite, and Material UI, and connects to a separate backend API for authentication, products, and messaging.

## Overview

The app provides a simple shopping experience with the following flows:

- Browse product categories and product listings
- View product details and add items to the cart
- Open the cart panel to update quantities or remove items
- Login or register as a user
- Admin login or registration for product management
- Submit contact messages to the backend
- Add new products using the admin product form

The cart is managed with React context and stored in browser localStorage while the user is logged in.

## Main Pages

- `Home` - landing page with brand and featured sections
- `Products` - product list page
- `Product Detail` - detailed product view with quantity selection and add-to-cart
- `Cart` - interactive cart panel with quantity updates and total price
- `Auth` - user login and registration page
- `Admin` - admin login and registration page
- `Product Form` - admin page to add new products
- `Contact` - submit messages to the backend
- `Messages` - view received user messages (admin only)

## Technologies

- React 19
- Vite
- Material UI
- React Router DOM
- JWT authentication support
- Local storage for cart persistence

## Backend Integration

This frontend is designed to work with a separate backend API built by the same author. The app uses the backend for:

- user login and signup
- admin actions
- product data
- contact messages
- product creation and management

## Notable Details

- The project currently does not implement a real payment gateway.
- The checkout action in the cart is a placeholder that can be replaced with a demo payment or order confirmation page later.
- Admin users can add products and manage product details if a valid backend token is available.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the app in development mode:

   ```bash
   npm run dev
   ```

3. Open the local development URL shown by Vite.

## Build

To prepare the app for production:

```bash
npm run build
```

## Notes

- Make sure the backend API is running and accessible before using the app.
- The frontend expects the backend to support authentication and product endpoints.
- Future improvements can include a demo payment page or an order confirmation screen.
