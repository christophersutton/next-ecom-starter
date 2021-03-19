import { useState, useContext } from "react";
import axios from "axios";
import getStripe from "../../utils/getStripe";
import { useCart } from "./useCart";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cart = useCart();

  const checkout = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/checkout`, lineItems)
      .then(async (res) => {
        const Stripe = await getStripe();
        Stripe.redirectToCheckout({ sessionId: res.data.id });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="relative flex-1 px-4 sm:px-6">My Cart</div>
      <div>
        {cart.lineItems.length > 0 ? (
          cart.lineItems.map((item) => <CartItem item={item} />)
        ) : (
          <p>No items in your cart</p>
        )}
      </div>
      <div className="flex-shrink-0 px-4  py-5 sm:px-6">
        <div className="border-t border-accents-3">
          <ul className="py-3">
            <li className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{cart.subTotal}</span>
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
            <span>{cart.total}</span>
          </div>
        </div>
        <button href="/checkout" onClick={() => checkout()}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
