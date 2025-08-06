import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface AuthenticationLayoutProps {
  children: ReactNode;
}

function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
  const [lateLoad, setLateLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const token = Cookies.get('auth_token');
    if (!token) {
     
      router.push('/');
    } else {
      setLateLoad(true); 
    }
  }, [router]);

  return (
    <Fragment>
      <Provider store={store}>
        <div style={{ display: `${lateLoad ? 'block' : 'none'}` }}>
          <div className="autentication-bg">
            <div className="container-lg">{children}</div>
          </div>
        </div>
      </Provider>
    </Fragment>
  );
}

export default AuthenticationLayout;
