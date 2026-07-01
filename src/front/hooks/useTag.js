import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTags } from "react-icons/bs";
import {
  selectTagFromUser,
  selectTagFromForo,
  getTags,
  getTagsUser,
} from "../../services/tagService.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const useTag = () => {
  const { store, dispatch } = useGlobalReducer();
  const [selectedTag, setSelectedTag] = useState([]);
  const [error, setError] = useState("");

  const chargeTagsToCreateForo = async () => {
    try {
      await getTags(dispatch)
      dispatch({ type: 'get_tags_user', payload:[] });
    }catch (err) {
      setError(err.message || "Error al cargas tags");
    }
  }

  const chargeTagsToUserSelect = async () => {
    try{
      await getTags(dispatch)
      if (localStorage.getItem("token")) {
           const res = await getTagsUser(dispatch);
           if (res && res.tags){
            
            const idTags = res.tags.map(tag => tag.tag.id);
            setSelectedTag(idTags);
          }
          }
    }catch (err) {
      setError(err.message || "Error al cargas tags");
    }
  }

  

  const onSelectedTag = async (tag) => {
    try {
      if (selectedTag.includes(tag.id)) {
        setSelectedTag(selectedTag.filter((id) => id !== tag.id));
      } else {
        setSelectedTag([...selectedTag, tag.id]);
      }
    } catch (err) {
      setError(err.message || "Error seleccionar tags");
    }
  };

  const handleSave = async () => {
    try {
      if (selectedTag.length === 0) {
        setError("No hay tags seleccionadas");
        return;
      }
      console.log(selectedTag);

      const res = await selectTagFromUser(selectedTag);
      console.log(res);
    } catch (err) {
      setError(err.message || "Error seleccionar tags");
    }
  };

  const handleSaveForo = async (foroId) => {
    try {
      if (selectedTag.length === 0) {
        return;
      }
      console.log(selectedTag);

      const res = await selectTagFromForo(foroId, selectedTag);
      console.log(res);
    } catch (err) {
      setError(err.message || "Error seleccionar tags");
    }
  };

  return {
    onSelectedTag,
    handleSave,
    selectedTag,
    handleSaveForo,
    chargeTagsToCreateForo,
    chargeTagsToUserSelect
  };
};
