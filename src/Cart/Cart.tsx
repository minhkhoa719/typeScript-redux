import React from 'react'
import { useAppdispatch, useAppSelector } from '../store.hook'
import { getCartProduct, getTotalPrice, removeFromCart } from './cart.slice'

const Cart: React.FC = () => {

    const cartProducts = useAppSelector(getCartProduct)
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useAppdispatch()

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId))
    }
    return (
        <div>
            <h2>Cart</h2>
            <h5>Total Price : ${totalPrice}</h5>
            {cartProducts.map(product =>(
                <div key={product.id}>
                    <span>{product.title} </span>
                    <span>amount :{product.amount}</span>
                    <button onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
                </div>
            ))}
        </div>
    )
}

export default Cart