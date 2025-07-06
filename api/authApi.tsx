import Axi from "@/services/interceptors/Axi";

export const authApi ={
    // login: async (data: { username: string; password: string }) => {
    login: async () => {
        // const response = await Axi.post(`/login`, data);
        // return response;
        return true
    },
    logout: async () => {
        const response = await Axi.get(`/logout`);
        return response;
    },
}

