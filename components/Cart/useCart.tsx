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
}

const getCartItems = () => {
  if (typeof window !== 'undefined' && localStorage.getItem("CART_ITEMS")) {
    return JSON.parse(localStorage.getItem("CART_ITEMS"))
  }
  else return []
}
const init = {
  sessionId: "",
  lineItems: getCartItems(),
  isLoading: false,
}

type Action =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; product_id: string }
  | { type: "UPDATE_ITEM"; item: CartItem }
  | { type: "EMPTY_CART" }
  | { type: "CHECKOUT" };

export const CartContext = React.createContext(init);
CartContext.displayName = "Cart";

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        lineItems: [...state.lineItems, action.item],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        lineItems: state.lineItems.filter(li => li.product_id != action.product_id)
      };
    }
    case "EMPTY_CART": {
      return {
        ...state,
        lineItems: [],
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
  const [state, dispatch] = React.useReducer(cartReducer, init);

  useEffect(() => {
    localStorage.setItem("CART_ITEMS", JSON.stringify(state.lineItems));
  }, [state.lineItems]);

  const addToCart = (item) => dispatch({ type: "ADD_ITEM", item });
  const removeFromCart = (product_id) => dispatch({ type: "REMOVE_ITEM", product_id });
  const updateItem = (item) => dispatch({ type: "UPDATE_ITEM", item });

  const value = useMemo(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateItem,
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
