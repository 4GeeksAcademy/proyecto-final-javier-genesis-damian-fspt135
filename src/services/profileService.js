const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateProfile = async (userId, profileData) => {
  if (!userId) {
    throw new Error("El ID de usuario es obligatorio para actualizar el perfil.");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró el token de autorización. Por favor, inicia sesión.");
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/profile/eddit/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        date_birth: profileData.birthDate,
        img: profileData.profileImg,
        description: profileData.description
      }),
    });

    const textData = await response.text();
    const data = textData ? JSON.parse(textData) : {};

    if (!response.ok) {
      const errorMessage = data.msg || `Error en la actualización (Estado: ${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error en updateProfile:", error.message);
    throw error;
  }
};