import axiosClient from "./axiosClient";

export const categoryApi = {
    getCategory: (params) => {
        const url = '/categories'
        return axiosClient().get(url, {params})
    },
}

