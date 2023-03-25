import { Outlet } from "react-router";
import styles from "~/styles/blog.css";

export function meta() {
  return {
    meta: "GuitarLA - Nuestro Blog",
    description: "GuitarLA, Blog de música y venta de guitarras",
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

const Blog = () => {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
};

export default Blog;
