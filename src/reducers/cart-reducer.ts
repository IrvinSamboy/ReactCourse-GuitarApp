import { cartType } from "../hooks/useCart"

export type cartActions =
    {type: 'add-to-cart', payload: {newCart : cartType }} |
    {type: 'decrease-to-cart', payload: {item : cartType }} |
    {type: 'increase-to-cart', payload: {item : cartType }} |
    {type: 'delete-to-cart', payload: {item : cartType }}


export type cartState = {
    cart: cartType[]
}

export const initialState : cartState = {
    cart: JSON.parse(localStorage.getItem("cart") || '[]')
}

export const cartReducer = (
    state: cartState,
    actions: cartActions
) => {
    const MAX_ITEMS = 10

    const {type, payload} = actions
    const {cart} = state

    let returnState = state

    if(type === 'add-to-cart') {
        const index = cart.findIndex(item => item.id === payload.newCart.id)
        if (index >= 0) {
            if (cart[index].quantity < MAX_ITEMS) {
                const updatedCart = [...cart]
                updatedCart[index].quantity++
                returnState = {
                    ...state,
                    cart: updatedCart
                }
            }
        }
        else {
            returnState = {
                ...state,
                cart: [...cart, { ...payload.newCart, quantity: 1 }]
            }

        }
    }

    else if(type === 'increase-to-cart') {
        const index = cart.findIndex(item => item.id === payload.item.id)
        if (index >= 0) {
            const cartDecreased = [...cart]
            if(cartDecreased[index].quantity < 10){
                cartDecreased[index].quantity++
                returnState = {
                    ...state,
                    cart: cartDecreased
                }
            }
        }
    }

    else if(type === 'decrease-to-cart') {
        const index = cart.findIndex(item => item.id === payload.item.id)
        if (index >= 0) {
            const cartDecreased = [...cart]
            cartDecreased[index].quantity--
            if (cartDecreased[index].quantity === 0) {
                const cartDelete = cart.filter(item => item.quantity >= 1)
                returnState = {
                    ...state,
                    cart: cartDelete
                }
            }
            else {
                returnState = {
                    ...state,
                    cart: cartDecreased
                }
            }
        }
    }
    
    else if(type === 'delete-to-cart') {
        const index = cart.findIndex(item => item.id === payload.item.id)
        if (index >= 0) {
            const cartDeleted = cart.filter(item => payload.item.id !== item.id)
            returnState = {
                ...state,
                cart: cartDeleted
            }
        }
    }

    return returnState
}