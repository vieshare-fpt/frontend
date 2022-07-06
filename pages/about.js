import React from "react";
import { ReaderLayout } from "src/components/layouts";
import styles from "src/styles/About.module.css";

export default function About() {
  function convert(props) {
    const myArray = props.split(" ");
    let total = "";
    // Add each number to the total
    for (var i = 0; i < myArray.length; i++) {
      total += `${styles[`${myArray[i]}`]} `;
    }
    // Return to the total
    return total;
  }
  return (
    <>
      <header className={convert("py-5")}>
        <div className={convert("container px-5")}>
          <div className={convert("row justify-content-center")}>
            <div className={convert("col-lg-8 col-xxl-6")}>
              <div className={convert("text-center my-5")}>
                <h1 className={convert("fw-bolder mb-3")}>
                  Our mission is to make building websites easier for everyone.
                </h1>
                <p className={convert("lead fw-normal text-muted mb-4")}>
                  Start Bootstrap was built on the idea that quality, functional
                  website templates and themes should be available to everyone.
                  Use our open source, free products, or support us by
                  purchasing one of our premium products or services.
                </p>
                <a
                  className={convert("btn btn-primary btn-lg")}
                  href="#scroll-target"
                >
                  Read our story
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={convert("py-5 bg-light")} id="scroll-target">
        <div className={convert("container px-5 my-5")}>
          <div className={convert("row gx-5 align-items-center")}>
            <div className={convert("col-lg-6")}>
              <img
                className={convert("img-fluid rounded mb-5 mb-lg-0")}
                src="https://dummyimage.com/600x400/343a40/6c757d"
                alt="..."
              />
            </div>
            <div className={convert("col-lg-6")}>
              <h2 className={convert("fw-bolder")}>Our founding</h2>
              <p className={convert("lead fw-normal text-muted mb-0")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                est, ut esse a labore aliquam beatae expedita. Blanditiis
                impedit numquam libero molestiae et fugit cupiditate, quibusdam
                expedita, maiores eaque quisquam.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={convert("py-5")}>
        <div className={convert("container px-5 my-5")}>
          <div className={convert("row gx-5 align-items-center")}>
            <div className={convert("col-lg-6 order-first order-lg-last")}>
              <img
                className={convert("img-fluid rounded mb-5 mb-lg-0")}
                src="https://dummyimage.com/600x400/343a40/6c757d"
                alt="..."
              />
            </div>
            <div className={convert("col-lg-6")}>
              <h2 className={convert("fw-bolder")}>Growth &amp; beyond</h2>
              <p className={convert("lead fw-normal text-muted mb-0")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                est, ut esse a labore aliquam beatae expedita. Blanditiis
                impedit numquam libero molestiae et fugit cupiditate, quibusdam
                expedita, maiores eaque quisquam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={convert("py-5 bg-light")}>
        <div className={convert("container px-5 my-5")}>
          <div className={convert("text-center")}>
            <h2 className={convert("fw-bolder")}>Our team</h2>
            <p className={convert("lead fw-normal text-muted mb-5")}>
              Dedicated to quality and your success
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
                  src="https://dummyimage.com/150x150/ced4da/6c757d"
                  alt="..."
                />
                <h5 className={convert("fw-bolder")}>Ibbie Eckart</h5>
                <div className={convert("fst-italic text-muted")}>
                  Founder &amp; CEO
                </div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-xl-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="https://dummyimage.com/150x150/ced4da/6c757d"
                  alt="..."
                />
                <h5 className={convert("fw-bolder")}>Lương Nguyễn Hải Huy</h5>
                <div className={convert("fst-italic text-muted")}>Front-end Deverloper</div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-sm-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="https://dummyimage.com/150x150/ced4da/6c757d"
                  alt="..."
                />
                <h5 className={convert("fw-bolder")}>Toribio Nerthus</h5>
                <div className={convert("fst-italic text-muted")}>
                  Operations Manager
                </div>
              </div>
            </div>
            <div className={convert("col mb-5 mb-5 mb-sm-0")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="https://dummyimage.com/150x150/ced4da/6c757d"
                  alt="..."
                />
                <h5 className={convert("fw-bolder")}>Malvina Cilla</h5>
                <div className={convert("fst-italic text-muted")}>CTO</div>
              </div>
            </div>
            <div className={convert("col mb-5")}>
              <div className={convert("text-center")}>
                <img
                  className={convert("img-fluid rounded-circle mb-4 px-4")}
                  src="https://dummyimage.com/150x150/ced4da/6c757d"
                  alt="..."
                />
                <h5 className={convert("fw-bolder")}>Malvina Cilla</h5>
                <div className={convert("fst-italic text-muted")}>CTO</div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      <footer className={convert("bg-dark py-4 mt-auto")}>
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
              <a href="#!">Privacy</a>
              <span className={convert("text-white mx-1")}>&middot;</span>
              <a href="#!">Terms</a>
              <span className={convert("text-white mx-1")}>&middot;</span>
              <a href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
About.getLayout = ReaderLayout;