import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/data/guitarras.server.js";
import { getPosts } from "~/data/posts.server.js";
import { getCurso } from "~/data/cursos.server.js";
import ListadoGuitarras from "../components/listadoGuitarras";
import stylesGuitarras from "~/styles/guitarras.css";
import ListadoPosts from "~/components/listadoPosts";
import stylesPosts from "~/styles/blog.css";
import Cursos from "~/components/cursos.jsx";
import stylesCursos from "~/styles/cursos.css";

export function meta() {}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
    {
      rel: "stylesheet",
      href: stylesPosts,
    },
    {
      rel: "stylesheet",
      href: stylesCursos,
    },
  ];
}

export async function loader() {
  const [guitarras, posts, cursos] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]); // Permite que todos las consultas inicien al mismo tiempo

  const data = {
    guitarras: guitarras.data,
    posts: posts.data,
    cursos: cursos.data,
  };

  // const guitarras = getGuitarras(); se inicia primero esta,
  // const posts = getPosts(); y luego esta
  return data;
}

const Index = () => {
  const data = useLoaderData();
  const { guitarras, posts, cursos } = data;
  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>
      <section
        style={{
          backgroundImage: `linear-gradient( to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7) ), url(${cursos.attributes.imagen.data.attributes.url});`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          padding: "10rem 0",
          marginTop: "10rem",
        }}
      >
        <Cursos cursos={cursos} />
      </section>
      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  );
};

export default Index;
