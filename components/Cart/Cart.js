import { useState, useContext } from "react";
import axios from "axios";
import { getStripe, useDisplayPrice } from "@utils";
import { useCart } from "./useCart";
import CartItem from "./CartItem/CartItem";
import { Button } from '@components/UI/Button'
import { Lock } from '@components/UI/Icons'


const Cart = (props) => {
  const { lineItems, subTotal, total } = useCart();

  const checkout = () => {
    const stripe_line_items = lineItems.map((li) => {
      return { price: li.price_id, quantity: li.quantity };
    });
    axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/checkout`, stripe_line_items)
      .then(async (res) => {
        const Stripe = await getStripe();
        Stripe.redirectToCheckout({ sessionId: res.data.id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="px-4 sm:px-6 flex-1">
        {lineItems.length > 0 ? (
          lineItems.map((item) => (
            <CartItem item={item} key={item.product_id} />
          ))
        ) : (
          <p>No items in your cart</p>
        )}
      </div>
      <div className="flex-shrink-0 px-4  py-5 sm:px-6">
        <div className="border-t border-accents-3">
          <ul className="py-3">
            <li className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{useDisplayPrice(subTotal)}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Estimated Shipping</span>
              <span className="font-bold tracking-wide">FREE</span>
            </li>
          </ul>
          <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
            <span>Total</span>
            <span>{useDisplayPrice(total)}</span>
          </div>
        </div>
        <Button size={'XL'} onClick={checkout} size={"FULL"} shape={"PILL"}>
          <Lock/>Continue to Checkout
        </Button>
      </div>
    </>
  );
};

export default Cart;
