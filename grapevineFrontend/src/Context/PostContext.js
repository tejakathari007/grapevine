import React, { useState } from "react";
export const Posts = React.createContext(null);
import { getConnectedPost, getForYouPost } from "../API/Posts/fetchAllPost";
import { useInfiniteQuery } from "react-query";
import { Pressable, Text } from "react-native";
const PostContext = (props) => {
  const forYouPosts = useInfiniteQuery(["fetchForYouPost"], getForYouPost, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return lastPage.next.page;
      }
    },
  });
  const connectedPosts = useInfiniteQuery(
    ["fetchConnectedPost"],
    getConnectedPost,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return lastPage.next.page;
        }
      },
    }
  );

  return (
    <Posts.Provider value={{ forYouPosts, connectedPosts }}>
      {props.children}
    </Posts.Provider>
  );
};

export default PostContext;
