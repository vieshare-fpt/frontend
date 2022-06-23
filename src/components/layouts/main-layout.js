import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessAPI } from "src/services";
import { getCookieData, removeCookieData } from "src/services/cookies";
import style from "../../styles/Layout.module.css";
import { infoUserApi, requestUserInfoLimit } from "src/services/infoUserApi";
import { NavBarTop } from "./components/NavBarTop";
import { NavBottom } from "./components/NavBottom";
import { getUserInfoLimitFalse, getUserInfoLimitStart, getUserInfoLimitSuccess } from "src/stores/userSlice";
import { NavScrollExample } from "./components";
export function MainLayout({ children }) {
  const dispatch = useDispatch();


  const user = useSelector(
    (state) => state.user.currentUserInfoLimit?.userInfo
  );
  useEffect(() => {
    const token = getCookieData("token");
    console.log("a");
    (async () => {
      dispatch(getUserInfoLimitStart());
      
      await infoUserApi
        .info(token)
        .then((response) => {
          dispatch(getUserInfoLimitSuccess(response.data));
        })
        .catch(function (error) {
          dispatch(getUserInfoLimitFalse());
        });
    })();
  }, []);

  const handleLogout = () => {
    const token = getCookieData("token");
    const refreshToken = getCookieData("refreshToken");
    (async () => {
      await accessAPI
        .logout(refreshToken, token)
        .then(function (response) {
          console.log(response);
          removeCookieData("token");
          removeCookieData("refreshToken");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    })();
  };

  return (
    <div>
      <header position="fixed">
        <NavScrollExample profile={user} logout={handleLogout}/>
        {/* <NavBarTop profile={user} logout={handleLogout} /> */}
      </header>
      <div className={style["content"]}>
        <main>{children}</main>
      </div>
      <div className={style["footer"]}>
        <NavBottom />
      </div>
    </div>
  );
}
