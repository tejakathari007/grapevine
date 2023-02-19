import React from "react";
import Post from "../../../MolecularComponents/Posts/Post";
import "./tabcontainer.scss";
export default function PostContainer({ posts }) {
  return (
    <div className="post-container">
      <div className="container">
        {posts.map((_post) => (
          <Post key={_post.uuid} post={_post}  />
        ))}
      </div>
    </div>
  );
}
