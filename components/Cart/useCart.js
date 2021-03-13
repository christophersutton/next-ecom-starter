import { useState } from 'react'

const init = {
    sessionId: '',
    lineItems: [],
    subTotal: 0.00,
    
}

const useCart = () => {
    const [cart, setCart] = useState(init)

}

export default useCart