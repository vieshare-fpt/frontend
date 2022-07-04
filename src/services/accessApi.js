import axiosClient from "./axiosClient";

export const accessApi = {
  login(payload) {
    return axiosClient.post("/auth/login", payload);
  },
  loginByGoogle(credential) {
    return axiosClient.post("/auth/google", credential);
  },
  logout(refreshToken) {
    return axiosClient.post(
      "/auth/logout",
      {
        "refreshToken": refreshToken,
        "notificationToken": "string",
      },
    );
  },
  register(payload) {
    return axiosClient.post("/users/register", payload);
  },
};

// export const loginUser = async (user, navigate) => {
//     try {
//         const res = await axiosClient.post('/auth/login', user)
//         const token = res.data.token
//         const refreshToken = res.data.refreshToken
//         if (typeof token === 'string' && typeof refreshToken === 'string') {
//             setCookieData('token', token)
//             setCookieData('refreshToken', refreshToken)
//         }
//         navigate.push('/')
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const googleUser = async (credential, navigate) => {
//     try {
//         const res = await axiosClient.post('/auth/google', credential)
//         const token = res.data.token
//         const refreshToken = res.data.refreshToken

//         if (typeof token === 'string' && typeof refreshToken === 'string') {
//             setCookieData('token', token)
//             setCookieData('refreshToken', refreshToken)
//         }
//         if (navigate) navigate.push('/')
//         else {
//             window.location.reload()
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const userLogout = async (refreshToken, token) => {
//     try {
//         console.log(token);
//         console.log(refreshToken);
//         const webApiUrl = '/auth/logout'
//         await axiosClient.post(webApiUrl ,{refreshToken},
//             { headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token} `}
//             }).then((res) => {
//                 console.log(res.data)
//               })
//               .catch((error) => {
//                 console.error(error)
//               })

//         window.location.reload()
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const requestUserInfoLimit = async (accessToken, dispatch) => {
//     dispatch(getUserInfoLimitStart());
//     try {
//         const response = await axiosClient.post('/auth/validate', {
//             token: accessToken
//         })
//         dispatch(getUserInfoLimitSuccess(response.data))
//     } catch (error) {
//         dispatch(getUserInfoLimitFalse())
//     }
// }

// export const registerUser = async (user, navigate) => {
//     await axiosClient.post('/users/register', user)
//     navigate.push('/login')
// }

// export const renewAccessToken = async (refreshToken) => {
//     const response = await axiosClient.post('/auth/token', {
//         refreshToken: refreshToken
//     })
//     return response.data.token
// }
