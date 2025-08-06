import { basePath } from "@/next.config";
import logoutService from "@/shared/services/logout.service";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/action";


const Header = ({ local_varaiable, ThemeChanger }: any) => {
  const searchRef = useRef(null);

  const handleClick = (event: { target: any }) => {
    const searchInput: any = searchRef.current;

    if (
      searchInput &&
      (searchInput === event.target || searchInput.contains(event.target))
    ) {
      document.querySelector(".header-search")?.classList.add("searchdrop");
    } else {
      // document.querySelector(".header-search")?.classList.remove("searchdrop");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const fullscreenChangeHandler = () => { };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        // ThemeChanger({ ...local_varaiable, "toggled": "close" })
      } else {
        // ThemeChanger({...local_varaiable,"toggled":""})
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const navbar = document?.querySelector(".header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky: any = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add("sticky-pin");
        navbar1?.classList.add("sticky-pin");
      } else {
        navbar?.classList.remove("sticky-pin");
        navbar1?.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);



  return (
    <header className="app-header">


      <div className="main-header-container container-fluid">
        <div className="header-content-right">


          <Dropdown className="header-element main-profile-user" align={"end"}>
            <Dropdown.Toggle
              as="a"
              href="#!"
              className="header-link dropdown-toggle no-caret"
              id="mainHeaderProfile"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <div className="d-flex align-items-center">
                <div className="me-xxl-2 me-0">
                  <img
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""
                      }/assets/images/faces/9.jpg`}
                    alt="img"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </div>
                <div className="d-xxl-block d-none my-auto">
                  <h6 className="fw-semibold mb-0 lh-1 fs-14">
                    João
                  </h6>
                  <span className="op-7 fw-normal d-block fs-11 text-muted">
                    jvnsantos@gmail.com
                  </span>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              as="ul"
              className="main-header-dropdown dropdown-menu pt-0 header-profile-dropdown dropdown-menu-end"
              aria-labelledby="mainHeaderProfile"
            >
              <Dropdown.Item className="drop-heading d-xxl-none d-block">
                <div className="text-center">
                  <h5 className="text-dark mb-0 fs-14 fw-semibold">
                    João
                  </h5>
                  <small className="text-muted">jvnsantos@outlook.com</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li" className="dropdown-item">
                <Link className="d-flex w-100" href="/portal/perfil">
                  <i className="fe fe-user fs-18 me-2 text-primary"></i>
                  Perfil
                </Link>
              </Dropdown.Item>

              <Dropdown.Item as="li" className="dropdown-item">
                <Link
                  className="d-flex w-100"
                  href="/portal/configuracao/regras-cobranca"
                >
                  <i className="fe fe-settings text-primary fs-18 me-2 text-primary"></i>
                  Configurações
                </Link>
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => logoutService({ href: "/" })}
                as="li"
                className="dropdown-item"
              >
                <Link className="d-flex w-100" href="/">
                  <i className="fe fe-info fs-18 me-2 text-primary"></i>Sair
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
