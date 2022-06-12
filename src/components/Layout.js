import React, { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import NavBarTop from 'src/components/NavBarTop'
import NavBottom from 'src/components/NavBottom'
import { useRouter } from 'next/router';
import NextBreadcrumbs from "src/components/Breadcrumbs";
import { useDispatch, useSelector } from 'react-redux';
import { getCookieData } from 'src/services/cookies'
const NAVBAR_TEXTS = [
  { page: "/landing", text: "Landing" },
  { page: "/trendingPage", text: "Trending" },
  { page: "/suggestPage", text: "Suggestion" },
  { page: "/", text: "Login" },
]
import { requestUserInfoLimit } from 'src/services/apiRequest'
export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookieData('token')
   requestUserInfoLimit(token, dispatch)
  }, []);
  return (
    <div>
      <Head>
        <title>VieShare</title>
      </Head>
      <header>
        <NavBarTop />
      </header>

      <main>{children}</main>
      <footer>
        <NavBottom />
      </footer>

    </div>
  )
}
