import { useState } from 'react'
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db, dbTypes } from './data/db'

function App() {

    const [data, setData] = useState<dbTypes[]>(db) 

  return (
    <>
    <Header />       
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <Guitar 
            data={data}
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
