import React, { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import NavBarTop from './NavBarTop'
import NavBottom from './NavBottom'
import { useRouter } from 'next/router';
import NextBreadcrumbs from "./Breadcrumbs";
import { useDispatch, useSelector } from 'react-redux';
import { getCookieData } from '../app/cookies'
const NAVBAR_TEXTS = [
  { page: "/landing", text: "Landing" },
  { page: "/trendingPage", text: "Trending" },
  { page: "/suggestPage", text: "Suggestion" },
  { page: "/", text: "Login" },
]
import { requestUserInfoLimit } from '../app/apiRequest'
export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookieData('token')
   requestUserInfoLimit(token, dispatch)
  }, [])
  return (
    <div>
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
