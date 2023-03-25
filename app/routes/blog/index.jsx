import { useLoaderData } from "react-router";
import { getPosts } from "~/data/posts.server.js";
import ListadoPosts from "~/components/listadoPosts";

export function meta() {
  return {
    meta: "GuitarLA - Nuestro Blog",
    description: "GuitarLA, Blog de música y venta de guitarras",
  };
}

export async function loader() {
  const posts = await getPosts();
  return posts?.data;
}

const Blog = () => {
  const posts = useLoaderData();
  return <ListadoPosts posts={posts} />;
};

export default Blog;
