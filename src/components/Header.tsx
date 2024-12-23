import { useEffect, useState } from "react";
import { cartType } from "../App"

type HeaderProps = {
  carts: cartType[];
  decreaseToCart: (item: cartType) => void
  increaseToCart: (item: cartType) => void
  deleteToCart: (item: cartType) => void
  cartTotal: (item: cartType[]) => number
  savingCartLocalStorage: (item: cartType[]) => void
}

export default function Header(
  {
    carts,
    decreaseToCart,
    increaseToCart,
    deleteToCart,
    cartTotal,
    savingCartLocalStorage
  }: HeaderProps) {
    
    const [total, setTotal] = useState(0)

    useEffect(() => {
      savingCartLocalStorage(carts)
      setTotal(cartTotal(carts))
    }, [carts])

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div
              className="carrito"
            >
              <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {
                  <>
                    {
                      carts.length === 0 ?
                        <p className="text-center">El carrito esta vacio</p>
                        :
                        <>
                          <table className="w-100 table">
                            <thead>
                              <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                carts.map(item => (
                                  <tr key={item.id}>
                                    <td>
                                      <img className="img-fluid" src={`./public/img/${item.image}.jpg`} alt="imagen guitarra" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="fw-bold">
                                      ${item.price}
                                    </td>
                                    <td className="flex align-items-start gap-4">
                                      <button
                                        onClick={() => decreaseToCart(item)}
                                        type="button"
                                        className="btn btn-dark"
                                      >
                                        -
                                      </button>
                                      {item.quantity}
                                      <button
                                        onClick={() => increaseToCart(item)}
                                        type="button"
                                        className="btn btn-dark"
                                      >
                                        +
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => deleteToCart(item)}
                                        className="btn btn-danger"
                                        type="button"
                                      >
                                        X
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <p className="text-end">Total pagar: <span className="fw-bold">${total}</span></p>
                          <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                        </>
                    }

                  </>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>

  )
}
