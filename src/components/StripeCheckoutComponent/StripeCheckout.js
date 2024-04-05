import React from 'react';
import { Button } from "@mui/material"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import * as PaymentIntetnService from '../../services/PaymentIntentService'
import axios from "axios"

const StripeCheckoutForm = ({ cart, handleClose, setSnackSuccessOpen, setSnackFailedOpen }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    try {
      const res = await PaymentIntetnService.createPaymentIntent(cart, 'usd');
      console.log(res.data);
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });

      console.log(paymentMethod);

      const data = {
        clientSecret: res.data.client_secret,
        paymentMethodId: paymentMethod.paymentMethod.id
      };

      console.log(data);

      const confirmRes = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: data.paymentMethodId
      });

      const confirmPayment = await PaymentIntetnService.confirmPayment(data.clientSecret);

      console.log(confirmPayment, 'payment succeeded');
      // handleClose();
      // setSnackSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setSnackFailedOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "10px",
        backgroundColor: '#F07F7F'
      }}>
        <CardElement options={{
          style: {
            base: {
              color: "white",
              "::placeholder": {
                color: 'white'
              }
            }
          }
        }} />
      </div>

      <Button type="submit"
        sx={{
          marginTop: '20px',
          width: '100%',
          backgroundColor: '#F07F7F',
          color: 'white',
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        disabled={!stripe || !elements}>Pay</Button>
    </form>

  )
}

export default StripeCheckoutForm


// {id: "pi_3KpReuIG3H3VZzXI1VpGm4Ug", object: "payment_intent", amount: 10059, amount_capturable: 0,…}
// amount: 10059
// amount_capturable: 0
// amount_details: {tip: {amount: null}}
// tip: {amount: null}
// amount_received: 0
// application: null
// application_fee_amount: null
// automatic_payment_methods: null
// canceled_at: null
// cancellation_reason: null
// capture_method: "automatic"
// charges: {object: "list", data: [], has_more: false, total_count: 0,…}
// client_secret: "pi_3KpReuIG3H3VZzXI1VpGm4Ug_secret_nLJREy0MHN0Zes4yETzFUMo0w"
// confirmation_method: "automatic"
// created: 1650177152
// currency: "usd"
// customer: null
// description: null
// id: "pi_3KpReuIG3H3VZzXI1VpGm4Ug"
// invoice: null
// last_payment_error: null
// livemode: false
// metadata: {}
// next_action: null
// object: "payment_intent"
// on_behalf_of: null
// payment_method: null
// payment_method_options: {,…}
// payment_method_types: ["card"]
// processing: null
// receipt_email: null
// review: null
// setup_future_usage: null
// shipping: null
// source: null
// statement_descriptor: null
// statement_descriptor_suffix: null
// status: "requires_payment_method"
// transfer_data: null
// transfer_group: null