import React, { useMemo } from "react";
import "./post.scss";
import Header from "./Header/Header";
import LikeContainer from "./LikeContainer/LikeContainer";
export default function Post({ post }) {
  const time = useMemo(() => {
    const date1 = new Date(post.created_at);
    const date2 = new Date();

    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return "few moments ago";
    else if (diffInMin < 60) return diffInMin + " min ago";
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + " hour ago";
    return diffInDays + " days ago";
  }, [post]);
  return (
    <div className="post">
      <Header username={post.username} />
      <p className="body-caption">{post.post}</p>
      <LikeContainer timeStamp={time} />
    </div>
  );
}
