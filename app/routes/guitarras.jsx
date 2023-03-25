import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/guitarras.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

const Tienda = () => {
  return (
    <main className="contenedor">
      <Outlet context={useOutletContext()} />
      {/* Hay que pasar el context por prop ya que no se puede pasar el context a las routes hijas (las que están dentro de las carpetas de rutas) */}
    </main>
  );
};

export default Tienda;
