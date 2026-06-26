const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getMyFollow = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BACKEND_URL}/api/myfollow`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
};

export const followForo = async (foroId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BACKEND_URL}/api/follow/${foroId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
};