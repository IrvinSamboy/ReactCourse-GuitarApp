import { useState } from "react";
import { dbTypes } from '../data/db'

export type cartType = {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

const useCart = () => {
    
    const getData = () => {
        return JSON.parse(localStorage.getItem("cart")!) || []
    }
    
    const [carts, setCart] = useState<cartType[]>(getData)
    
    const MAX_ITEMS = 10

    const addToCart = (item: dbTypes) => {
            const index = carts.findIndex(cart => cart.id === item.id)
            if (index >= 0) {
                if (carts[index].quantity < MAX_ITEMS) {
                    const updatedCart = [...carts]
                    updatedCart[index].quantity++
                    setCart(updatedCart)
                }
            }
            else {
                setCart([...carts, { ...item, quantity: 1 }])
            }
    
        }
    
        const decreaseToCart = (item: cartType) => {
            const index = carts.findIndex(cart => cart.id === item.id)
            if (index >= 0) {
                const cartDecreased = [...carts]
                cartDecreased[index].quantity--
                console.log(cartDecreased[index])
                if (cartDecreased[index].quantity === 0) {
                    const cartDelete = carts.filter(item => item.quantity >= 1)
                    setCart(cartDelete)
                }
                else {
                    setCart(cartDecreased)
                }
            }
        }
    
        const increaseToCart = (item: cartType) => {
            const index = carts.findIndex(cart => cart.id === item.id)
            if (index >= 0) {
                const cartDecreased = [...carts]
                if(cartDecreased[index].quantity < 10){
                    cartDecreased[index].quantity++
                    setCart(cartDecreased)
                }
            }
        }
    
        const deleteToCart = (item: cartType) => {
            const index = carts.findIndex(cart => cart.id === item.id)
            if (index >= 0) {
                const cartDeleted = carts.filter(cart => item.id !== cart.id)
                setCart(cartDeleted)
            }
        }
    
        const cartTotal = (carts : cartType[]) : number => {
            return carts.reduce((acumulator, currentValue) => acumulator + (currentValue.price*currentValue.quantity), 0)
        }
    
        const savingCartLocalStorage = (carts : cartType[]) => {
            localStorage.setItem('cart', JSON.stringify(carts))
        }

        return {
            carts,
            addToCart,
            increaseToCart,
            decreaseToCart,
            deleteToCart,
            cartTotal,
            savingCartLocalStorage
        }

}

export default useCart