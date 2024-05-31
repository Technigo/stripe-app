import express from "express"
import Stripe from "stripe"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 8080
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, productName, productDescription } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: "sek",
      description: productName, // Use product name as description
      metadata: {
        productDescription: productDescription, // Add product description to metadata
      },
    })

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/", (req, res) => {
  res.json("Hello World!")
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
