import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const CURRENCY = 'USD';
const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' ? '/payments/stripe/' : '/payments/stripe/';
const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production' ? 'pk_test_TrhkR0IYq5UE3tsvU5NON1r5' : 'pk_test_TrhkR0IYq5UE3tsvU5NON1r5';

console.log({ PAYMENT_SERVER_URL });

const fromDollarToCent = amount => Math.floor(amount * 100);

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios
    .post(
      PAYMENT_SERVER_URL,
      {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromDollarToCent(amount),
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    )
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
