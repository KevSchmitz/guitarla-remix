import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/data/guitarras.server.js";
import ListadoGuitarras from "~/components/listadoGuitarras";

export function meta() {
  return {
    title: "GuitarLA - Tienda de Guitarras",
    description: "GuitarLA - Nuestra colección de guitarras",
  };
}

export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

const Tienda = () => {
  const guitarras = useLoaderData();

  return <ListadoGuitarras guitarras={guitarras} />;
};

export default Tienda;
