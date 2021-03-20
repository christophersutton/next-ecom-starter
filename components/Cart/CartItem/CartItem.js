import { useCart } from "../useCart";
import { useDisplayPrice } from "@utils";
import { TrashCan } from "@components/UI/Icons";
import Image from "next/image";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  return (
    <div className="flex pt-4 mt-4 border-t border-t-1 border-color-gray-100">
      <Image src={item.img} alt="Product image" width={75} height={75} className="border-gray-500" />
      <div className="flex-grow px-4">
        <p className="text-lg">{item.name}</p>
      </div>
      <div className="text-right">
        <p>{useDisplayPrice(item.item_price * item.quantity)}</p>
        <button onClick={() => removeFromCart(item)}>
          <TrashCan />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
