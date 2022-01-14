import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default function TakeMoney(props) {
  const onToken = (token) => {
    console.log(token);
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  }

  // ...

    return (
      // ...
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51HFoQIGghZcUsgCYkuCLhLMhM8WgKczTDWPXqhd2ie7DYzrwpKjOUNVgsjdIvkhaTqPeIgguFB4bqfud6mzy93lT00otdEn38s"
        currency="CAD"
        amount={props.amount}
      >
        <button className="btn btn-primary">
          credit card
        </button>
      </StripeCheckout>
    )
}