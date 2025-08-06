import React from 'react';
import GlobalProvider from './global-context';


export const ContextProvider = ({ children }: any) => {
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
};
