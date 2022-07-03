import React from "react";
import { Navigation } from "../common/navigation";

export default function Main(props) {
  const { CurrentComponent } = props;
  return (
    <>
      <Navigation>
        <CurrentComponent />
      </Navigation>
    </>
  );
}
