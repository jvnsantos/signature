import React from 'react';
import Link from 'next/link';
import Seo from '@/shared/layout-components/seo/seo';
import { Col, Row } from 'react-bootstrap';

const Error400 = () => {

  return (

    <div >
      <Seo title="error-404" />
      <Row className="authentication coming-soon mx-0 justify-content-center">
        <Col xxl={8} xl={8} lg={8} className="col-12">
          <div className="authentication-cover text-fixed-white">
            <div className="aunthentication-cover-content text-center py-5 px-sm-5 px-0">
              <div className="row justify-content-center align-items-center h-100">
                <Col xxl={6} xl={8} lg={8} md={12} sm={12} className="col-12">
                  <h1 className="display-1 text-fixed-white">404
                  </h1>
                  <div className="m-4">
                    <span className="fs-20 fw-semibold">
                      OOPS! Página não encontrada
                    </span>
                    <p className="fs-16">Desculpe, a pagina informada não pode ser acessada!</p>
                  </div>
                  <div className="text-center">
                    <Link className="btn btn-info d-inline-flex gap-1" href="/portal/dashboard"> <i className="ri-arrow-left-line my-auto "></i> Voltar para o inicio. </Link>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Col>

      </Row>
    </div>

  );
};

Error400.layout = "ErrorPagesLayout";

export default Error400;
