import { useEffect } from "react";
import { cartType } from "../App"
import { cartActions } from "../reducers/cart-reducer";

type HeaderProps = {
  carts: cartType[];
  total: number;
  dispatch: React.Dispatch<cartActions>
}

export default function Header(
  {
    carts,
    total,
    dispatch
  }: HeaderProps) {
    
    useEffect(() => {
      dispatch({type: 'get-total'})
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
                                        onClick={() => dispatch({type: 'decrease-to-cart', payload: {item: item}})}
                                        type="button"
                                        className="btn btn-dark"
                                      >
                                        -
                                      </button>
                                      {item.quantity}
                                      <button
                                        onClick={() => dispatch({type: 'increase-to-cart', payload: {item: item}})}
                                        type="button"
                                        className="btn btn-dark"
                                      >
                                        +
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => dispatch({type: 'delete-to-cart', payload: {item: item}})}
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
