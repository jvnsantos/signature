import { Fragment, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Header from "../header/header";
import { useGlobalContext } from "@/shared/context/global-context";

interface ContentLayouttProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayouttProps) => {
  const { showHeader } = useGlobalContext()
  return (
    <Fragment>
      <Provider store={store}>
        <div>
          <div className="">
            <Header />
            <div
              style={{ marginTop: showHeader ? '120px' : '0' }}

            >
              <div className={`container-fluid ${showHeader ? 'mt-3' : 'mt-0'}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </Fragment>
  );
};

export default ContentLayout;
