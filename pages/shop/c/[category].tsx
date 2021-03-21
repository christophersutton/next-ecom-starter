const Stripe = require('stripe')(process.env.STRIPE_SK);
import ProductCard from '@components/Product/ProductCard'

export const getStaticPaths = async () => {

    const resp = await Stripe.products.list({ limit: 100 });

    const categories = new Set(resp.data.map(p => p.metadata.category))
    const paths = [...categories].map((c) => {
        return { params: { category: c } }
    })

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps = async ({ params }) => {

    const resp = await Stripe.products.list();
    const priceResp = await Stripe.prices.list();
    let products = []

    const filtered = resp.data.filter(p => p.metadata.category === params.category)
    filtered.forEach(async (p) => {
        
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
        <div className="">
            {products.map(p => <ProductCard product={p} key={p.id}/>)}
        </div>
    )
}
export default Category