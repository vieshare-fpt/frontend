import React from 'react'
import Head from 'next/head'
import NavBarTop from './NavBarTop'
import NavBottom from './NavBottom'
import { useRouter } from 'next/router';
import NextBreadcrumbs from "./Breadcrumbs";

const NAVBAR_TEXTS = [
  { page: "/landing", text: "Landing" },
  { page: "/trendingPage", text: "Trending" },
  { page: "/suggestPage", text: "Suggestion" },
  { page: "/", text: "Login" },
]

export default function Layout({ children }) {
  const router = useRouter()
  const textToShow = NAVBAR_TEXTS.find(el => el.page === router.asPath)

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
