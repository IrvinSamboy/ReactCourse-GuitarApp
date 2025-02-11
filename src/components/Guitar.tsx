import { dbTypes } from "../data/db"
import { cartActions } from "../reducers/cart-reducer"

type GuitarProps = {
    data: dbTypes[]
  dispatch: React.Dispatch<cartActions>
}

export default function Guitar({ data, dispatch }: GuitarProps) {
    return (
        <div className="row mt-5">

            {
                data.map(guitar => (
                    <div className="col-md-6 col-lg-4 my-4 row align-items-center" key={guitar.id}>
                        <div className="col-4">
                            <img className="img-fluid" src={`./public/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                        </div>
                        <div className="col-8">
                            <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                            <p>{guitar.description}</p>
                            <p className="fw-black text-primary fs-3">${guitar.price}</p>
                            <button
                                onClick={() => dispatch({type: 'add-to-cart', payload: {newCart: {...guitar, quantity: 1}}})}
                                type="button"
                                className="btn btn-dark w-100"
                            >Agregar al Carrito</button>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}
