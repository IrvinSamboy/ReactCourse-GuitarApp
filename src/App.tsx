import { useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db, dbTypes } from './data/db'
import useCart from './hooks/useCart'

function App() {
    
    const [data, _setData] = useState<dbTypes[]>(db)
    
    const {
            carts, 
            addToCart, 
            decreaseToCart, 
            increaseToCart, 
            deleteToCart, 
            cartTotal, 
            savingCartLocalStorage
        } = useCart()

    return (
        <>
            <Header
                carts={carts}
                decreaseToCart={decreaseToCart}
                increaseToCart={increaseToCart}
                deleteToCart={deleteToCart}
                cartTotal={cartTotal}
                savingCartLocalStorage={savingCartLocalStorage}
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
