import React, { useEffect } from "react";
import style from "../../styles/Layout.module.css";
import { Footer } from "./components";
export function MainLayout({ children }) {


  return (
    <div>

      <div className={style["content"]}>
        <main>{children}</main>
      </div>
      <div className={style["footer"]}>
        <Footer />
      </div>
    </div>
  );
}
