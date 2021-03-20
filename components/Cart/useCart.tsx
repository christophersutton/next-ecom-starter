import React, { FC, useMemo, useEffect } from "react";

export interface State {
  sessionId: string;
  lineItems: any;
  isLoading: boolean;
}

export interface CartItem {
  product_id: string;
  price_id: string;
  item_price: number;
  name: string;
  quantity: number;
};;

const cartLocalStorage = () => {
  // only return localstorage cart object if we're on client and certain it exists
  if (typeof window !== 'undefined' && localStorage.getItem("CART")) {
    return JSON.parse(localStorage.getItem("CART"))
  }
  else return {
    sessionId: "",
    lineItems: [],
    isLoading: false,
  }
}

type Action =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; item: CartItem }
  | { type: "UPDATE_ITEM"; item: CartItem }
  | { type: "EMPTY_CART" }
  | { type: "CHECKOUT_START" };

export const CartContext = React.createContext(cartLocalStorage());
CartContext.displayName = "Cart";

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        lineItems: [...state.lineItems, action.item]
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        lineItems: state.lineItems.filter(li => li.product_id != action.item.product_id)
      };
    }
    case "EMPTY_CART": {
      return {
        ...state,
        lineItems: [],
        subTotal: 0,
        total: 0,
      };
    }
    case "UPDATE_ITEM": {
      return {
        ...state,
        lineItems: state.lineItems.map((li) => {
          return li.product_id === action.item.product_id ? action.item : li
        })
      }
    }

  }
};

export const CartProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(cartReducer, cartLocalStorage());

  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => dispatch({ type: "ADD_ITEM", item });
  const removeFromCart = (item) => dispatch({ type: "REMOVE_ITEM", item });
  const updateItem = (item) => dispatch({ type: "UPDATE_ITEM", item });
  const subTotal = state.lineItems.length > 0 
    ? state.lineItems.reduce((a,li) => a + li.quantity * li.item_price,0) 
    : 0
  const total = state.lineItems.length > 0 
    ? state.lineItems.reduce((a,li) => a + li.quantity * li.item_price,0) 
    : 0

  const value = useMemo(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateItem,
      subTotal,
      total
    }),
    [state]
  )

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const _CartContext: FC = ({ children }) => (
  <CartProvider>
    {children}
  </CartProvider>
);
