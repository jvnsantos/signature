import { Fragment, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Header from "../header/header";

interface ContentLayouttProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayouttProps) => {
  return (
    <Fragment>
      <Provider store={store}>
        <div>
          <div className="">
            <Header />
            <div>
              <div className={`container-fluid`}>
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
