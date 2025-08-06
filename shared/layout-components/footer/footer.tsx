import React, { Fragment } from 'react';
import Link from 'next/link';

const Footer = () => {

  return (
    <Fragment>
      <footer className="footer mt-auto py-3 bg-white text-center">
        <div className="container">
          <span className=""> Copyright © 2024<span id="year"></span>
          {' '} Payip Pagamentos Todos os Direitos Reservados
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
