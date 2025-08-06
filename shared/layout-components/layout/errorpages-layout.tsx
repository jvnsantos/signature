
import React, { Fragment, ReactNode, useEffect, useState,  } from 'react'
import store from '../../redux/store';
import { Provider } from 'react-redux';
interface ErrorPagesLayoutProps {
  children: ReactNode;
}

function ErrorPagesLayout({ children }:ErrorPagesLayoutProps) {
  
  const [lateLoad, setlateLoad] = useState(false);

  useEffect(() => {
	  setlateLoad(true);
	});

  return (
    <Fragment>
        <Provider store={store}>
        <div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
          
              {children}
        </div>
      </Provider>
    </Fragment>
  );
}

export default ErrorPagesLayout;
