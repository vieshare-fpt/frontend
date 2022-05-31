import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './userSlice';

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try{
        const res = await axios.post('https://backend-vieshare-stg.vi-vu.vn/api/auth/login', user)
        dispatch(loginSuccess(res.data))
        navigate.push('/')
    }catch(err){
        dispatch(loginFailure(err));
    }
}