const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createPost = async (formData, token) => {
  const response = await fetch(`${BASE_URL}/api/post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
};

export const getPostsByForo = async (foroId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/foro/${foroId}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg || "Error al obtener comentarios");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTopPosts = async (forumId) => {
  const response = await fetch(`${BASE_URL}/api/foro/${forumId}/posts/top`);

  return await response.json();
};

export const getPostById = async (postId) => {
  const response = await fetch(`${BASE_URL}/api/post/${postId}`);

  return await response.json();
};

export const editPost = async (postId, content) => {
  if (!postId) {
    throw new Error("El ID del post es obligatorio para actualizarlo.");
  }
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "No se encontró el token de autorización. Por favor, inicia sesión.",
    );
  }

  try {
    const formData = new FormData();
    const appendIfPresent = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    };
    appendIfPresent("title", content.title);
    appendIfPresent("content", content.content);

    if (content.img) {
      formData.append("img", content.img);
    }

    const response = await fetch(`${BASE_URL}/api/post/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const textData = await response.text();
    const data = textData ? JSON.parse(textData) : {};

    if (!response.ok) {
      const errorMessage =
        data.msg || `Error en la actualización (Estado: ${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/post/like/${postId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const disLikePost = async (postId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/post/like/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
