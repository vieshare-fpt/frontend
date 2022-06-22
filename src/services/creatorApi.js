import axiosClient from "./axiosClient";

export const creatorApi = {
    createPost: (params) => {
        const url = '/posts'
        return axiosClient.get(url, {params})
    },
}

