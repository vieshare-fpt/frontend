import * as React from "react";
import { Navigation } from "../common";
import { Footer } from "./components";

export function MainLayout({ children }) {
  return (
    <Navigation>
      {children}
    
      <Footer />
    </Navigation>
  );
}
