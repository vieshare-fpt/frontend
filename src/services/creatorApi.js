import axiosClient from "./axiosClient";

const creatorApi = {
    createPost: (params) => {
        const url = '/posts'
        return axiosClient.get(url, {params})
    },
}

export default creatorApi