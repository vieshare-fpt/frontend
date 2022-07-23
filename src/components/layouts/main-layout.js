import * as React from "react";
import { useDispatch } from "react-redux";
import useLoginByGoogle from "src/hook/useLoginByGoogle";
import { Navigation } from "../common";
import { Footer } from "./components";

export function MainLayout({ children }) {
  const dispatch = useDispatch();
  useLoginByGoogle(dispatch);

  return (
    <Navigation>
      {children}
    
      <Footer />
    </Navigation>
  );
}
