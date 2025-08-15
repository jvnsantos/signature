import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/action";
import { useGlobalContext } from "@/shared/context/global-context";


const Header = () => {
  const { showHeader } = useGlobalContext()

  if (!showHeader) return
  return (
    <header className="linear-header-bg shadow-light">
      <div className="main-header-container container-fluid">
        <div className="d-flex flex-column align-items-center justify-content-center text-center w-100 py-4">
          <img
            src="/assets/images/brand-logos/logo-header.svg"
            alt=""
            className="img-fluid mx-auto"
            style={{ maxWidth: "200px" }}
          />
        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
