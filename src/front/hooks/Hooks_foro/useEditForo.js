import { useState } from "react";
import { updateForo } from "../../../services/foroService";
 
export const useEditForo = (foro, onSuccess) => {
    const [title, setTitle] = useState(foro?.title || "");
    const [description, setDescription] = useState(foro?.description || "");
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
 
        if (!title.trim()) {
            setError("El título es obligatorio.");
            return;
        }
 
        setLoading(true);
        try {
            const data = await updateForo(foro.id, { title, description, img });
            if (onSuccess) onSuccess(data.forum);
        } catch (err) {
            setError(err.message || "Error al editar el foro.");
        } finally {
            setLoading(false);
        }
    };
 
    return {
        title, setTitle,
        description, setDescription,
        img, setImg,
        loading,
        error,
        handleSubmit
    };
};