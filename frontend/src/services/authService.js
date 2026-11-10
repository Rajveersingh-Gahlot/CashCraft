import api from "./api";

export async function registerUser(userData){
    const response = await api.post("/api/auth/register",userData);

    return response.data;
}