import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProfile } from "../../services/profileService";
import { getTagsFromUser } from "../../services/tagService";
import { getMyFollow, unfollowForo } from "../../services/followService";
import { getForosFromUser } from "../../services/createForoService";
import { updateProfile } from "../../services/profileService";

export const useProfileView = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [userTags, setUserTags] = useState([]);
  const [followForos, setFollowForos] = useState([]);

  const [editingSection, setEditingSection] = useState(null);
  const [myForos, setMyForos] = useState([]);

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

      const createdForos = await getForosFromUser(id);

      setMyForos(createdForos);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (foroId) => {
    try {
      await unfollowForo(foroId);

      setFollowForos((prev) => prev.filter((foro) => foro.id !== foroId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async () => {
    try {

        if (!selectedImage) return;

        console.log(selectedImage);

        await updateProfile(id, {
            firstName: profile.first_name,
            lastName: profile.last_name,
            birthDate: profile.date_birth,
            description: profile.description,
            profileImg: selectedImage
        });

        await loadProfile();

        setEditingSection(null);

    } catch (error) {
        console.log(error);
    }
};



return {
    profile,
    loading,
    userTags,
    followForos,
    myForos,
    editingSection,
    setEditingSection,
    handleUnfollow,
    loadProfile,
    selectedImage,
    setSelectedImage,
    handleUpdateAvatar
};
};
