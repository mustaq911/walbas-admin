import Axi from "@/services/interceptors/Axi";

export const userApi ={
    get: async (data: any) => {
        const response = await Axi.get(`/devices?paginate=${data.paginate}&page=${data.page}&keyword=${data.keyword}`);
        return response;
    }
}