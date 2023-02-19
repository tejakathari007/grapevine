import React from "react";
import "./header.scss";
import { MoreOutlined } from '@ant-design/icons';
export default function Header({ username }) {
  return (
    <div className="post-header">
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
        />
        <p className="text-1">{`@ ${username}`}</p>
      </div>
      <MoreOutlined style={{ fontSize: "30px", fontWeight: "bolder"}}/>
    </div>
  );
}
