import { useState } from "react"
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import "./CheckoutForm.css"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Define the product details
  const product = {
    name: "Awesome T-Shirt",
    description: "High-quality cotton t-shirt",
    price: 200, // Price in dollars
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.")
      return
    }

    const cardElement = elements.getElement(CardElement)
    setIsLoading(true)

    try {
      const response = await fetch(
        "http://localhost:8080/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: product.price * 100, // Convert price to cents
            productName: product.name,
            productDescription: product.description,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Response from server:", data)

      const { clientSecret } = data

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (result.error) {
        console.error(result.error.message)
        setPaymentStatus(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!")
          setPaymentStatus("Payment successful!")
        } else {
          console.error(
            "Unexpected payment status:",
            result.paymentIntent.status
          )
          setPaymentStatus(
            `Unexpected payment status: ${result.paymentIntent.status}`
          )
        }
      }
    } catch (error) {
      console.error("Error during payment:", error)
      setPaymentStatus(`Error: ${error.message}`)
    }

    setIsLoading(false)
  }

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Product details */}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: SEK {product.price}</p>
      <CardElement options={cardElementOptions} />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : "Buy Now"}
      </button>

      <div
        className={`payment-status ${
          paymentStatus === "Payment successful!" ? "success" : ""
        }`}
      >
        {paymentStatus}
      </div>
    </form>
  )
}

export default CheckoutForm
