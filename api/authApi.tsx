import Axi from "@/services/interceptors/Axi";

export const authApi ={
    login: async (data: { username: string; password: string }) => {
        const response = await Axi.post(`/login`, data);
        return response;
    },
    logout: async () => {
        const response = await Axi.get(`/logout`);
        return response;
    },
}

