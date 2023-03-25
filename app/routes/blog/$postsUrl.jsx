import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/data/posts.server.js";
import { formatearFecha } from "~/utils/helpers";
import styles from "~/styles/blog.css";

export async function loader({ params }) {
  const { postsUrl } = params;
  const post = await getPost(postsUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada No Encontrada",
    });
  }

  return post;
}

export function meta(data) {
  if (!data.data) {
    return {
      title: "GuitarLA - Entrada No Encontrada",
      description: `Guitarras, Venta de guitarras, Entrada No encontrada`,
    };
  }

  return {
    title: `GuitarLA - ${data?.data.data[0].attributes.titulo}`,
    descripcion: `Guitarras, Blog de guitarras, Venta de guitarras, ${data?.data.data[0].attributes.titulo}`,
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

const Post = () => {
  const post = useLoaderData();
  const { titulo, imagen, contenido, publishedAt } = post.data[0].attributes;

  return (
    <article className="contenedor post mt-3">
      <div className="contenido">
        <img
          className="imagen"
          src={imagen.data.attributes.url}
          alt={`Imagen blog ${titulo}`}
        />
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
};

export default Post;
