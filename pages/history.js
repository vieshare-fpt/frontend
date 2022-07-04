import React from "react";
import DislayHistory from "src/components/history/pages/history";
import NotLogin from "src/components/history/pages/not-login";
import { ReaderLayout } from "src/components/layouts";
import { getCookieData } from "src/services/cookies";
import Page from "../src/components/history/main";
export default function History() {
  if(!getCookieData('token')) {
    return <Page CurrentComponent={NotLogin}/>
  }
  return <Page CurrentComponent={DislayHistory} />;
}
History.getLayout = ReaderLayout