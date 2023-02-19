import React from 'react';
import Post from '../Posts/Post';
import { PrimaryButton } from '../../AtomicComponent';
import { updatePost } from '../../API/UpdatePost/UpdatePost';

const PostCard = ({ post }) => {
    const update = () => {
        updatePost({ post_uuid: post.uuid, data: { featured: !post.featured } })
          .then((data) => window.location.reload(false))
          .catch((err) => console.log(err));
      };
    
  return (
    <div>
        <Post post = {post}/>
        <div style={{ display : "flex", flexDirection: "row", marginTop: "5px"}}>
        <p style={{ width : "70%"}} >
          Status:{" "}
          {post.featured ? (
            <label style={{ color: "green", fontWeight: "600" }}>
              Featured
            </label>
          ) : (
            <label style={{ color: "red", fontWeight: "600" }}>
              Not Featured
            </label>
          )}
        </p>
        <div style={{ width: "30%" }}>
        {post.featured ? (
          <PrimaryButton text="Remove" onClick={update} />
        ) : (
          <PrimaryButton text="Add" onClick={update} />
        )}
      </div>
      </div>
    </div>
  )
}

export default PostCard;