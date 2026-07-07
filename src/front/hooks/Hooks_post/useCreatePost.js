import { useState } from "react";
import { createPost } from "../../../services/postService";

export const useCreatePost = (forumId) => {

    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async () => {

        console.log("BOTÓN PUBLICAR PRESIONADO");

       const token = localStorage.getItem("token");

        console.log("TOKEN:", token);
    

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("foro_id", forumId);

        if(!title.trim() || !content.trim()) {
            alert("Error: El título y el contenido son obligatorios.");
            return false;
        }

        if (img) {
            formData.append("img", img);
        }

        try {

            const data = await createPost(
                formData,
                token
            );

            console.log(data);


            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setContent("");
            setImg(null);

            return true;

        } catch (error) {

            console.log(error);
            return false;
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        img,
        setImg,
        preview,
        setPreview,
        success,
        handleSubmit
    };
};