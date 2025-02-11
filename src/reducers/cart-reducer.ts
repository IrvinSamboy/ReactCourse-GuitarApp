import { cartType } from "../types/CartTypes"

export type cartActions =
    {type: 'add-to-cart', payload: {newCart : cartType }} |
    {type: 'decrease-to-cart', payload: {item : cartType }} |
    {type: 'increase-to-cart', payload: {item : cartType }} |
    {type: 'delete-to-cart', payload: {item : cartType }} |
    {type: 'get-total'}


export type cartState = {
    cart: cartType[]
    total: number
}

export const initialState : cartState = {
    cart: JSON.parse(localStorage.getItem("cart") || '[]'),
    total: 0
}

export const cartReducer = (
    state: cartState,
    actions: cartActions
) => {
    const MAX_ITEMS = 10

    const {type} = actions
    const {cart} = state

    let returnState = state

    if(type === 'add-to-cart') {
        const index = cart.findIndex(item => item.id === actions.payload.newCart.id)
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
                cart: [...cart, { ...actions.payload.newCart}]
            }

        }
    }

    else if(type === 'increase-to-cart') {
        const index = cart.findIndex(item => item.id === actions.payload.item.id)
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
        const index = cart.findIndex(item => item.id === actions.payload.item.id)
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
        const index = cart.findIndex(item => item.id === actions.payload.item.id)
        if (index >= 0) {
            const cartDeleted = cart.filter(item => actions.payload.item.id !== item.id)
            returnState = {
                ...state,
                cart: cartDeleted
            }
        }
    }

    else if(type === 'get-total') {
        returnState = {
            ...state, 
            total: cart.reduce((acumulator, currentValue) => acumulator + (currentValue.price*currentValue.quantity), 0)
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    return returnState
}