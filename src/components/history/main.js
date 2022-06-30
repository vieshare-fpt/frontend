import React from "react";
import { Navigation } from "../common/navigation";
import { MainLayout } from "../layouts";

export default function Main(props) {
  const {CurrentComponent } = props;
  return (
    <Navigation>
      <MainLayout>
        <CurrentComponent />
      </MainLayout>
    </Navigation>
  );
}
