import axiosClient from "./axiosClient";


export const bankApi = {
    getListBank:() => {
        const url = '/bank';
        return axiosClient().get(url);
    }

}