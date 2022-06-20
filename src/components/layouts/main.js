import React, { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import NavBarTop from 'src/components/NavBarTop'
import NavBottom from 'src/components/NavBottom'
import { useDispatch, useSelector } from 'react-redux';
import { getCookieData } from 'src/services/cookies'
const NAVBAR_TEXTS = [
  { page: "/landing", text: "Landing" },
  { page: "/trendingPage", text: "Trending" },
  { page: "/suggestPage", text: "Suggestion" },
  { page: "/", text: "Login" },
]
import { requestUserInfoLimit } from 'src/services/infoUserApi'
export  function MainLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookieData('token')
   requestUserInfoLimit(token, dispatch)
  }, []);

  return (
    <div>
      <header position="fixed">
        <NavBarTop />
      </header>
      <main >{children}</main>
      <footer>
        <NavBottom />
      </footer>

    </div>
  )
}
