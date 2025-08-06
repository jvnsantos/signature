import { ReactNode, useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "../../redux/store";
import BacktoTop from "../backtotop/backtotop";
import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

interface ContentLayouttProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayouttProps) => {
  const [loading,] = useState(false);
  const [lateLoad, setlateLoad] = useState(false);
  const Add = () => {
    document.querySelector("body")?.classList.remove("error-1");
    document.querySelector("body")?.classList.remove("landing-body");
  };

  useEffect(() => {
    Add();
    setlateLoad(true);
  }, []);

  const [, setMyClass] = useState("");

  const Bodyclickk = () => {
    document.querySelector(".header-search")?.classList.remove("searchdrop");
    if (localStorage.getItem("sashverticalstyles") == "icontext") {
      setMyClass("");
    }
  };

  return (
    <>
      <Provider store={store}>
        <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
          <div className="page">
            <Header />
            <Sidebar />
            <div className="main-content app-content" onClick={Bodyclickk}>
              <div className="container-fluid">{loading ?
                <Row className="">
                  <Col className="mt-5 h-100 d-flex gap-2 align-items-center flex-column justify-content-center text-center">
                    <strong className="loading-text ">Carregando, por favor aguarde...</strong>
                    <br />
                    <ProgressBar className="progress bg-muted" animated now={100} />

                  </Col>
                </Row> : children}</div>
            </div>
            <BacktoTop />
            <Footer />
          </div>
        </div>
      </Provider>
    </>
  );
};

export default ContentLayout;
