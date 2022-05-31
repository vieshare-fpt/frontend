import axiosClient from "./axiosClient";

const postApi = {
    getPostsSuggestLimit: (params) => {
        const url = '/posts/suggest'
        return axiosClient.get(url, {params})
    },
    getPostsTrendingLimit: (params) => {
     
        const url = '/posts'
        return axiosClient.get(url, {params})
    },
    get: (id) => {
        const url = '/posts/' + id;
        return axiosClient.get(url)
    }
}

export default postApi