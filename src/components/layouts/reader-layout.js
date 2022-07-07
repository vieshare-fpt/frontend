import React from "react";
import { Navigation } from "../common";
import { Footer } from "./components";
export function ReaderLayout({ children }) {
  return (<Navigation>
    {children}
  </Navigation>)
}
