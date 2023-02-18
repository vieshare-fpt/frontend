import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Seo } from "src/components/common";
import { MainLayout } from "src/components/layouts";
import { authorization } from "src/utils/authorization";
import { convert } from "src/utils/convertClassName";

export default function About() {
  const router = useRouter();
  const user = useSelector(
    (state) => state.persistedReducer.user.currentUserInfoFull.userInfo
  );
  let page = (
    <div>
      <Seo
        data={{
          title: "VieShare",
          description: "Nền tảng chia sẻ kiến thức tiếng Việt",
          url: "https://vieshare-stg.vi-vu.vn/about",
          thumbnail:
            "https://cdnb.artstation.com/p/assets/images/images/040/129/561/large/ric-pastor-3.jpg?1627952777",
        }}
      />
      <header className={convert("bgHeader")}>
        <div className={convert("bg-img")}>
          <div className={convert("blur")}>
            <div className={convert("container px-6")}>
              <div className={convert("row justify-content-center")}>
                <div className={convert("col-lg-8 col-xxl-6 marginY")}>
                  <div className={convert("text-center my-5")}>
                    <h1 className={convert("fw-bolder mb-3 textColor h1")}>
                      <strong style={{ color: "#62c667", fontSize: "33px" }}>
                        VieShare
                      </strong>{" "}
                      <br />
                      Nền tảng chia sẻ kiến thức <br /> dành cho người Việt
                    </h1>
                    <div className={convert("container px-5")}>
                      <p className={convert("lead  mb-4 textColor p")}>
                        Nền tảng chia sẻ nội dung giữa người viết và người đọc.
                        <br />
                        Đọc giả sẽ nhận được các bài báo chất lượng cao. Người
                        sáng tạo sẽ nhận được tiền dựa trên lượng người đã đọc
                        bài viết.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={convert("py-5 bg-light views")}>
        <div className={convert("container px-5 my-5")}>
          <div className={convert("text-center")}>
            <h2 className={convert("fw-bolder green")}>Nhóm chúng tôi</h2>
            <p className={convert("lead fw-normal text-muted mb-5")}>
              Tận tâm với chất lượng bài viết của bạn
            </p>
          </div>
          <div
            className={convert(
              "row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-5 justify-content-center"
            )}
          >
            
          </div>
        </div>
      </section>
    </div>
  );

  return page
}
About.getLayout = MainLayout;
