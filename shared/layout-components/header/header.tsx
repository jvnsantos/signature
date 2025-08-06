import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/action";
import { useGlobalContext } from "@/shared/context/global-context";


const Header = () => {
  const { showHeader } = useGlobalContext()

  if (!showHeader) return
  return (
    <header className="app-header linear-header-bg">
      <div className="main-header-container container-fluid">
        <div className="d-flex flex-column text-center w-100 py-4">
          <h2 className="mb-1 f2f2f2">Assinatura Digital</h2>
          <span className="f2f2f2"> Sistema de entrega</span>
        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
