const Stripe = require('stripe')(process.env.STRIPE_SK);
import Image from 'next/image'
import { makeSlug, slugToName, useDisplayPrice } from '@utils'
import { useCart } from '@components/Cart/useCart'
import { useUI, Button } from '@components/UI'

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

    const { addToCart, lineItems, updateItem } = useCart();
    const { openSidebar } = useUI();

    const newCartItem = {
        product_id: product.id,
        price_id: product.price_id,
        item_price: product.price,
        name: product.name,
        quantity: 1,
        img: product.images[0]
    }

    const handleAdd = () => {
        
        if (lineItems.length == 0 || lineItems.find(i => i.product_id == product.id) == undefined) {
            addToCart(newCartItem)
        } else {
            const orderItem = lineItems.find(i => i.product_id == product.id)
            updateItem({ ...orderItem, quantity: orderItem.quantity + 1 })
        }

        openSidebar()
    }

    return (
        <div className="">
            
            <h1 className="text-3xl">{product.name}</h1>
            <Image
                src={product.images[0]}
                alt="Product image"
                width={400}
                height={400}
            />

            <p>{product.description}</p>
            <p>{useDisplayPrice(product.price)}</p>
            <Button onClick={handleAdd} size={'XL'} shape={"PILL"}>
                Add to Cart
            </Button>
            
        </div>
    )
}
export default Slug