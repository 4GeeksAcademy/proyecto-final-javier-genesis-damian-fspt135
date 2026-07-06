import { useState, useEffect } from "react";
import {
  disLikePost,
  likePost,
} from "../../../services/postService";

export const usePostLikes = (post) => {

const [error, setError] = useState(null);
const [isLiked, setIsLiked] = useState(post.like_by_user || false);
const [likeCount, setLikeCount] = useState(post.likes_count || 0);

useEffect(() => {
    if (post) {
      setIsLiked(post.like_by_user || false);
      setLikeCount(post.likes_count || 0);
    }
  }, [post]);

  const handleLikePost = async (postId) => {
    console.log("Enviando like para el ID:", postId);
    try {
        if(isLiked) {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
            await disLikePost(postId)
        } else {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
            await likePost(postId)
        }
    } catch (err) {
      setError(err.message || "Error dar like");
    }
  };

  return {
    handleLikePost,
    isLiked,
    likeCount,
    error
  };

}
