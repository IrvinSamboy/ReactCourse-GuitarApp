import { dbTypes } from "../data/db"

type GuitarProps = {
    data: dbTypes[]
}

export default function Guitar({data} : GuitarProps) {
    return (
        <div className="row mt-5">
            
            {
                data.map(guitar => (
                    <div className="col-md-6 col-lg-4 my-4 row align-items-center" id={guitar.id.toString()}>
                    <div className="col-4">
                        <img className="img-fluid" src={`./public/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                    </div>
                    <div className="col-8">
                        <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                        <p>{guitar.description}</p>
                        <p className="fw-black text-primary fs-3">${guitar.price}</p>
                        <button
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
