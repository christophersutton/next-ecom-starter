import { useCart } from "../useCart";
import { useDisplayPrice } from "@utils";
import { TrashCan } from "@components/UI/Icons";
import Image from "next/image";

const CartItem = ({ item }) => {
  const { removeFromCart, updateItem } = useCart();

  const handleIncrement = () => {
    updateItem({ ...item, quantity: item.quantity + 1 })
  }

  const handleDecrement = () => {
    updateItem({ ...item, quantity: item.quantity - 1 })
  }
  return (
    <div className="flex pt-4 mt-4 border-t border-t-1 border-color-gray-100">
      <Image
        src={item.img}
        alt="Product image"
        width={75}
        height={75}
        className="border-gray-500"
      />
      <div className="flex-grow px-4">
        <p className="text-lg">{item.name}</p>
        <div className="mt-4">
          
            <button disabled={item.quantity <= 0}onClick={() => handleDecrement()}>-</button>
          
          <span className="px-3">{item.quantity}</span>
          <button onClick={() => handleIncrement()}>+</button>
        </div>
      </div>
      <div className="text-right">
        <p>{useDisplayPrice(item.item_price * item.quantity)}</p>
        <button className="mt-4" onClick={() => removeFromCart(item)}>
          <TrashCan />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
