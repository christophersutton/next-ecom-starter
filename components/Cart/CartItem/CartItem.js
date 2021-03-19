import { useCart } from '../useCart'

const CartItem = ({item}) => {

    const { removeFromCart } = useCart()
    return(
        <>
        <p>{item.name}</p>
        <p>{item.item_price}</p>
        <button onClick={()=>removeFromCart(item.product_id)}>REMOVE</button> 
        </>
    )
}

export default CartItem