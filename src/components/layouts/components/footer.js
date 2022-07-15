import Link from "next/link";
import React from "react";
import { convert } from "src/utils/convertClassName";

export function Footer() {
  return (
    <footer className={convert("bg-dark py-4 mt-auto bg-white")}>
      <div className={convert("container px-5")}>
        <div
          className={convert(
            "row align-items-center justify-content-between flex-column flex-sm-row"
          )}
        >
          <div className={convert("col-auto")}>
            <div className={convert("small m-0 text-white")}>
              Copyright &copy; VieShare 2022
            </div>
          </div>
          <div className={convert("col-auto")}>
            <Link href="/">
              <a>Privacy</a>
            </Link>
            <span className={convert("text-white mx-1")}>&middot;</span>
            <Link href="/">
              <a href="#!">Terms</a>
            </Link>
            <span className={convert("text-white mx-1")}>&middot;</span>
            <Link href="/">
              <a href="#!">Contact</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
