import React from "react";
import { MainLayout } from "src/components/layouts";
import { convert } from "src/utils/convertClassName";

export default function About() {
  return (
    <>
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
                      </strong> <br/>
                      Nền tảng chia sẻ thông tin <br/> dành cho người Việt
                    </h1>
                    <div className={convert("container px-5")}>
                      <p className={convert("lead  mb-4 textColor p")}>
                        Nền tảng chia sẻ nội dung giữa người viết và người đọc.
                        <br />
                        Đọc giả sẽ nhận được các bài báo chất lượng cao. Người sáng tạo
                        sẽ nhận được tiền dựa trên lượng người đã đọc bài viết.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

     
      <section className={convert("py-5 bg-light")}>
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
            <div className={convert("col mb-5 mb-5 mb-xl-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="/que.jpg"
                  alt="Võ Văn Quế"
                  width={250}
                  height={250}
                />
                <h5 className={convert("fw-bolder")}> Võ Văn Quế</h5>
                <div className={convert("fst-italic text-muted")}>Member</div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-xl-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="/huybec.jpg"
                  alt="Lương Nguyễn Hải Huy"
                  width={250}
                  height={250}
                />
                <h5 className={convert("fw-bolder")}>Lương Nguyễn Hải Huy</h5>
                <div className={convert("fst-italic text-muted")}>Member</div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-sm-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="/khoa.jpg"
                  alt="Nguyễn Anh Khoa"
                  width={250}
                  height={250}
                />
                <h5 className={convert("fw-bolder")}>Nguyễn Anh Khoa</h5>
                <div className={convert("fst-italic text-muted")}>Leader</div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-sm-0")}>
              <div className={convert("text-center")}>
                <picture>
                  
                  <img
                    className={convert("img-fluid rounded-circle mb-4 px-4")}
                    src="/chu.jpg"
                    alt="Đỗ Trần Minh Chu"
                    width={250}
                    height={250}
                  />
                </picture>
                <h5 className={convert("fw-bolder")}>Đỗ Trần Minh Chu</h5>
                <div className={convert("fst-italic text-muted")}>Member</div>
              </div>
            </div>
            <div className={convert("col mb-5")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="/huy.jpg"
                  alt="Triệu Quang Huy"
                  width={250}
                  height={250}
                />
                <h5 className={convert("fw-bolder")}>Triệu Quang Huy</h5>
                <div className={convert("fst-italic text-muted")}>Member</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
About.getLayout = MainLayout;
