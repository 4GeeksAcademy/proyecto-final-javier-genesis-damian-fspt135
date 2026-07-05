import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getPostsByForo,
  editPost
} from "../../../services/postService";
import { IoHeartDislikeSharp } from "react-icons/io5";

export const usePost = () => {
  const location = useLocation();
  const initialPost = location.state?.post;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title || "");
      setContent(initialPost.content || "");
      setImg(initialPost.img || null);
    }
  }, [initialPost]);


  const loadPosts = async () => {
    try {
      setLoading(true);

      const data = await getPostsForum(forumId);

      console.log("Datos recibidos:", data);

      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };  

  // useEffect(() => {
  //   if (forumId) {
  //     loadPosts();
  //   }
  // }, [forumId]);

  const handleEditPost = async (postId, navigate) => {
  setLoading(true);
  try {
   
    const postData = { 
      title, 
      content, 
      img
    };

    await editPost(postId, postData);
    
    navigate(`/foro/${initialPost.foro_id}`);
  }catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }}

  return {
    posts,
    loading,
    loadPosts,
    title,
    setTitle,
    content,
    setContent,
    img,
    setImg,
    handleEditPost,
    initialPost
  };

  console.log("Posts en estado:", posts);
};

