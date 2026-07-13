import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getForos } from "../../services/foroService";
import { getMyFollow } from "../../services/followService";
import { getTagsFromUser } from "../../services/tagService";

export const useFeed = () => {
  const location = useLocation();
  const { dispatch } = useGlobalReducer();
  const queryParams = new URLSearchParams(location.search);

  const searchFromUrl = queryParams.get("search") || "";

  const [foros, setForos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedForo, setSelectedForo] = useState(null);
  const [foroPosts, setForoPosts] = useState([]);
  const [followForos, setFollowForos] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadForos();
    loadFollowForos();
    loadUserTags();
  }, []);

  const loadForos = async () => {
    try {
      const data = await getForos();

      console.log("FOROS:", data);

      dispatch({
        type: "all_foros",
        payload: data,
      });

      setForos(data);


      if (data.length > 0) {
  const firstForo = data[0];

    setSelectedForo(firstForo);

  const lastPosts = [...(firstForo.posts || [])]
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 3);

  setForoPosts(lastPosts);
}
      const allPosts = data

        .flatMap((foro) => foro.posts)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setPosts(allPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowForos = async () => {
    try {
      const data = await getMyFollow();

      setFollowForos([...data].reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserTags = async () => {
  try {
    const data = await getTagsFromUser(user?.id);
    setUserTags(data);
  } catch (error) {
    console.log(error);
  }
};

const changeForo = (foro) => {
  setSelectedForo(foro);

  const lastPosts = [...(foro.posts || [])]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  setForoPosts(lastPosts);
};

const allTags = [...new Set(foros.flatMap((foro) => foro.tags ?? []))];
const filteredForos = foros.filter((foro) => {
const matchSearch = foro.title.toLowerCase().includes(searchFromUrl.toLowerCase());

const matchTag = activeTag === "" || (foro.tags ?? []).includes(activeTag);

    return matchSearch && matchTag;
  });

  const myForos = foros
    .filter((foro) => Number(foro.user_id) === Number(user?.id))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))


  return {
    loading,
    posts,
    filteredForos,
    myForos,
    followForos,
    selectedForo,
    setSelectedForo,
    foroPosts,
    changeForo,
    userTags,
    loadFollowForos,
    allTags,
    activeTag,
    setActiveTag,
  };
};
