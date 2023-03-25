import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import styles from "~/styles/carrito.css";
import { ClientOnly } from "remix-utils";

export function meta() {
  return {
    title: "GuitarLA - Carrito de Compras",
    description: "Venta de guitarras, música, blog, carrito de compras, tienda",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

const Carrito = () => {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    // Solucion el error de la hidratación, este error se da porque los datos que recibe el cliente no coinciden con los que están en el servidor, ya que obtiene los datos desde el localStorage.
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0
                ? "Carrito Vacío"
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen de guitarra ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>Cantidad:</p>
                        <select
                          value={producto.cantidad}
                          className="select"
                          onChange={(e) =>
                            actualizarCantidad({
                              id: producto.id,
                              cantidad: Number(e.target.value), // Los valores de un formulario siempre van a venir como un string
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">
                          $<span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: $
                          <span>{producto.precio * producto.cantidad}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn_eliminar"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;
