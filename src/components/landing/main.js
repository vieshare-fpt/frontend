import React from "react";
import { Navigation } from "../common";
import { MainLayout } from "../layouts";
import { CategoryBar } from "./components";

export default function Main(props) {
  const { prop, CurrentComponent } = props;
  const { categories } = prop;

  return (
    <Navigation>
      <div
        style={{
          width: "100%",
          backgroundColor: "red",
          position: "fixed",
          zIndex: 2,
          margin: "64px 0 0 0",
        }}
      >
        <CategoryBar categories={categories} />
      </div>
      <MainLayout>
        <CurrentComponent props={prop} />
      </MainLayout>
    </Navigation>
  );
}
