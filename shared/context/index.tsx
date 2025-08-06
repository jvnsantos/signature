import React from 'react';
import UserProvider from './UserContext';


export const ContextProvider = ({ children }: any) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};
