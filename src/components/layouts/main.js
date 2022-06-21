import React, { useEffect, useLayoutEffect } from 'react'
import NavBarTop from 'src/components/NavBarTop'
import NavBottom from 'src/components/NavBottom'
import { useDispatch, useSelector } from 'react-redux';
import { getCookieData } from 'src/services/cookies'

import { requestUserInfoLimit } from 'src/services/infoUserApi'
export  function MainLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUserInfoLimit.userInfo?.jwtPayload);
  useEffect(() => {
    const token = getCookieData('token')
   requestUserInfoLimit(token, dispatch)
  }, []);
  return (
    <div>
      <header position="fixed">
        <NavBarTop profile={user}/>
      </header>
      
      <main >{children}</main>
      <footer>
        <NavBottom />
      </footer>
    </div>
  )
}
