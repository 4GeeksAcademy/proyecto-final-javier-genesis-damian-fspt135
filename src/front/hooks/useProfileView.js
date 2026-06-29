import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../services/profileService";
import { getTagsFromUser } from "../../services/tagService";
import { getMyFollow } from "../../services/followService";

export const useProfileView = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTags, setUserTags] = useState([]);
  const [followForos, setFollowForos] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile(id);

      setProfile(data);

      const tags = await getTagsFromUser(id);

      setUserTags(tags);

      const follows = await getMyFollow();

      setFollowForos(follows);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    followForos,
    userTags,
    loading,
  };
};
