const Stripe = require('stripe')(process.env.STRIPE_SK);
import ProductCard from '@components/Product/ProductCard'
import { slugToName } from '@utils'


export const getStaticProps = async () => {

    const resp = await Stripe.products.list();
    const priceResp = await Stripe.prices.list();
    let products = []

    resp.data.forEach(async (p) => {
        
        const price = priceResp.data.filter(price => price.product === p.id)
        const prod = {
            id: p.id,
            active: p.active,
            name: p.name,
            description: p.description,
            metadata: p.metadata,
            images: p.images,
            price: price[0].unit_amount,
            price_id: price[0].id
        }
        products.push(prod)
    })
    
    return {
        props: {
            products,
        },
    }
}

export const Category = ({ products }) => {

    return (
        <>
        <h1 className="text-4xl">Shop</h1>
        <div className="flex flex-wrap">
            {products.map(p => <ProductCard product={p} key={p.id}/>)}
        </div>
        </>
    )
}
export default Category