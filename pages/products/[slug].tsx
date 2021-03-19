const Stripe = require('stripe')(process.env.STRIPE_SK);
import { makeSlug, slugToName } from '../../utils/useSlugs'
import { useCart } from '../../components/Cart/useCart'
import { useUI } from '../../components/UI'

type Product = {
    id: string
    active: boolean
    name: string
    description: string
    metadata: any
    images: string[]
    price: number
    price_id: string
}

export const getStaticPaths = async () => {

    const resp = await Stripe.products.list();
    const paths = resp.data.map((p) => ({
        params: { slug: makeSlug(p.name) }
    }))

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async ({ params }) => {

    const resp = await Stripe.products.list();
    const p = resp.data.filter(p => p.name == slugToName(params.slug))[0]
    const priceResp = await Stripe.prices.list({ product: p.id })

    const product: Product = {
        id: p.id,
        active: p.active,
        name: p.name,
        description: p.description,
        metadata: p.metadata,
        images: p.images,
        price: priceResp.data[0].unit_amount,
        price_id: priceResp.data[0].id
    }

    return {
        props: {
            product,
        },
    }
}

export const Slug = ({ product }) => {

    const { addToCart } = useCart();
    const { openSidebar } = useUI();

    const newCartItem = {
        product_id: product.id,
        price_id: product.price_id,
        item_price: product.price,
        name: product.name,
        quantity: 1
    }

    const handleAdd = () => {
        addToCart(newCartItem)
        openSidebar()
    }

    return (
        <>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.price_id}</p>
            <button onClick={()=> handleAdd()}>ADD TO CART</button>
        </>
    )
}
export default Slug