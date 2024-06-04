import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./components/CheckoutForm"
import "./App.css"

const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(apiKey)

const App = () => {
  return (
    <div className="App">
      <h1>Stripe Payment Integration</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default App
