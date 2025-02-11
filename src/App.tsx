import { useReducer, useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db, dbTypes } from './data/db'
import { cartReducer, initialState } from './reducers/cart-reducer'

export type cartType = {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

function App() {
    
    const [data] = useState<dbTypes[]>(db)
    
    const [state, dispatch] = useReducer(cartReducer, initialState)
 
    return (
        <>
            <Header
                carts={state.cart}
                dispatch={dispatch} 
                total={state.total}            
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <Guitar
                    data={data}
                    dispatch={dispatch}
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
