// Este es el Archivo equivalente a Main.jsx

import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useCatch,
  Link,
} from "@remix-run/react";
import Header from "~/components/header"; // la '~' lleva directamente a la carpeta de app, para no tener que estar saliendo de las carpetas '../../component' en un árbol mas complejo
import Footer from "~/components/footer";
import styles from "~/styles/index.css";
import { useEffect, useState } from "react";

export function meta() {
  return {
    charset: "utf-8",
    title: "GuitarLA - Remix",
    viewport: "width=device-width, initial-scale=1",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@700;900&family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : null;

  const [carrito, setCarrito] = useState(carritoLS);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar sobre el arreglo y verificar si está duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          // Reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />{" "}
        {/* Evita que recargue la página al entrar en otro 'link' del 'nav' para aumentar la performance */}
        <LiveReload />
      </body>
    </html>
  );
}

// Manejo de Errores

export function CatchBoundary() {
  const error = useCatch();
  return (
    <Document>
      <p className="error">
        {error.status + " "}
        {error.statusText}
      </p>
      <Link to="/" className="error-enlace">
        Click acá para ir a la página principal
      </Link>
    </Document>
  );
}

export function errorBoundary({ error }) {
  return (
    <Document>
      <p className="error">
        {error.status}
        {error.statusText}
      </p>
      <Link to="/" className="error-enlace">
        Click acá para ir a la página principal
      </Link>
    </Document>
  );
}
