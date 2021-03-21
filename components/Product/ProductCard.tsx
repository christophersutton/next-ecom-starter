import Image from 'next/image'
import Link from 'next/link'
import { useDisplayPrice, makeSlug } from '@utils'

export const ProductCard = (props) => {

    const { product } = props
    const href = '/shop/p/' + makeSlug(product.name)

    return (
        <div className="bg-white overflow-hidden shadow sm:rounded-lg mr-8 mt-8">
            <Link href={href}><a>
                <div className="px-4 py-5 sm:p-6">
                    <Image
                        src={product.images[0]}
                        alt="Product image"
                        width={300}
                        height={300}
                    />
                    <h2 className="text-2xl">{product.name}</h2>
                    {useDisplayPrice(product.price)}

                </div>
            </a>
            </Link>
        </div>
    )
}

export default ProductCard