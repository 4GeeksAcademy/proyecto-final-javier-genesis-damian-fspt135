const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(
            `${BACKEND_URL}/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error en login:", error);
        return null;
    }
};