# React Vite Stripe Payment Integration

This project demonstrates how to integrate Stripe payment processing into a React Vite application. Users can view product details and make payments using their credit cards.

## Features

- Display product details.
- Handle credit card payments with Stripe.
- Display payment status messages.

## Prerequisites

- Node.js (v14 or higher)
- Stripe account and API keys

## Getting Started

### Backend Setup

1. Clone the repository and navigate to the backend directory:
    ```bash
    git clone https://github.com/yourusername/react-vite-stripe.git
    cd react-vite-stripe/backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your Stripe secret key:
    ```
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. Start the backend server:
    ```bash
    node index.js
    ```

### Frontend Setup

1. With the backend server running, navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your Stripe publishable key:
    ```
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```
    
4. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. View the product details.
3. Enter test card info such as 4242 4242 4242 4242. Enter the card number.
    Use a valid future date, such as 12/34.
    Use any three-digit CVC (four digits for American Express cards).
    Use any value you like for other form fields.

4. Check the payment status message to see if the payment was successful.

## Code Overview

### Backend (`backend/index.js`)

- Handles the creation of payment intents using Stripe's API.
- Defines an endpoint (`/create-payment-intent`) to receive payment requests from the frontend.

### Frontend (`frontend/src/components/CheckoutForm.jsx`)

- Displays product details.
- Integrates Stripe's `CardElement` for secure credit card input.
- Handles form submission to create a payment intent and confirm the payment.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Stripe Documentation](https://stripe.com/docs) for comprehensive guides and examples.
- [Stripe API keys](https://docs.stripe.com/keys)
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for providing the tools to build this application.
