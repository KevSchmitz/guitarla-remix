import Post from "./post";

const ListadoPosts = ({ posts }) => {
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map((post) => (
          <Post post={post.attributes} key={post?.id} />
        ))}
      </div>
    </>
  );
};

export default ListadoPosts;
