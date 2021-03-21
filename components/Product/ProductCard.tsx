import Image from 'next/image'
import Link from 'next/link'
import { useDisplayPrice } from '@utils'

export const ProductCard = (props) => {

    const { product } = props

    return(
        <>
        {product.name}
        {useDisplayPrice(product.price)}
        {product.description}
        </>
    )
}

export default ProductCard