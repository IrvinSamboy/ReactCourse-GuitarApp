import { useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db, dbTypes } from './data/db'

export type cartType = {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

function App() {

    const [data, _setData] = useState<dbTypes[]>(db)
    const [carts, setCart] = useState<cartType[]>([])

    const MAX_ITEMS = 10

    const addToCart = (item: dbTypes) => {
        const index = carts.findIndex(cart => cart.id === item.id)
        if (index >= 0) {
            if (carts[index].quantity < MAX_ITEMS) {
                const updatedCart = [...carts]
                updatedCart[index].quantity++
                setCart(updatedCart)
                console.log(carts)
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
            if (cartDecreased[index].quantity === 0) {
                const cartDelete = carts.filter(item => item.quantity >= 1)
                console.log(cartDelete)
                setCart(cartDelete)
            }
            else {
                setCart(cartDecreased)
            }
        }
    }


    return (
        <>
            <Header
                carts={carts}
                decreaseToCart={decreaseToCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <Guitar
                    data={data}
                    addToCart={addToCart}
                />

            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
