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

    const {type, payload} = actions
    const {cart} = state

    let returnState = state



    return returnState
}