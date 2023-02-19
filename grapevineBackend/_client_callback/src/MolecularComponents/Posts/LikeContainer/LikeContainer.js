import React from "react";
import "./likeContainer.scss";
import {MessageOutlined, HeartOutlined} from '@ant-design/icons';
export default function LikeContainer({ timeStamp }) {
  return (
    <div className="like-container">
      <div className="icons-wrapper">
        <MessageOutlined className="icon"  style={{ fontSize: '22px', margin: "2px" }}/>
        <HeartOutlined className="icon" style={{ fontSize: '22px', margin: "2px" }}/>
        <img
          className="icon"
          src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/000000/external-share-basic-ui-anggara-basic-outline-anggara-putra.png"
        />
      </div>
      <p className="text-1">{timeStamp}</p>
    </div>
  );
}
