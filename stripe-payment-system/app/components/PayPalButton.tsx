'use client';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from 'react';

interface PayPalButtonProps {
  amount: string;
}

export default function PayPalButton({ amount }: PayPalButtonProps) {
  const [success, setSuccess] = useState(false);
  const [orderID, setOrderID] = useState("");

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      setSuccess(true);
      setOrderID(data.orderID);
    });
  };

  return (
    <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      {success ? (
        <div>
          <h4>Your payment has been successful!</h4>
          <p>Order ID: {orderID}</p>
        </div>
      ) : (
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </PayPalScriptProvider>
  );
}