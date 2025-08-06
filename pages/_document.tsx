import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <link href="https://cdn.jsdelivr.net/npm/dragula@3.7.3/dist/dragula.min.css" rel="stylesheet"></link>
      
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
      />
      <Head title="Pay IP meios e pagamentos" >
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <body>
        <Main />
        <Script src="https://cdn.jsdelivr.net/npm/dragula@3.7.3/dist/dragula.min.js"></Script>
        <NextScript />
      </body>
    </Html>
  );
}
