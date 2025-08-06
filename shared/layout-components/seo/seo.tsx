import React from 'react';
import Head from "next/head";
import favicon from "../../../public/favicon.ico";


const Seo = ({ title }: any) => {
  const i = `Pay IP - ${title}`;
  return (
    <Head>
      <title>{i}</title>
      <link rel="icon" href={favicon.src}></link>
      <meta name="description" content="Pay IP - Portal de gerencimento de titulos de pagamentos" />
      <meta name="author" content="Pay IP Pagamentos" />
    </Head >
  );
};

export default Seo;
