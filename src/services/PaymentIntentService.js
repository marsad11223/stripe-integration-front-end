import axios from "axios"

export const createPaymentIntent = (cart, currency) => {
  const products = cart.map(item => {
    return {
      item: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity
    }
  })
  return axios.post("http://localhost:3000/payment/create", {
    amount: 20,
    currency: currency,
    orderId: '660e9e5bcefd9d6a7e75a856'
  })
}

export const confirmPayment = (clientSecret) => {
  return axios.post("http://localhost:3000/payment/confirm", {
    clientSecret,
  })
}
