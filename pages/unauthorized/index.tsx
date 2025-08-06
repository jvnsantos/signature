import React from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import { Col, Row } from 'react-bootstrap';

const Unauthorized = () => {

  return (
    <div >
      <Seo title="Não autorizado" />
      <Row className="authentication coming-soon mx-0 justify-content-center">
        <span className="sprite sprite-1" />
        <span className="sprite sprite-2" />
        <span className="sprite sprite-4" />
        <Col xxl={8} xl={8} lg={8} className="col-12">
          <div className="authentication-cover text-fixed-white">
            <div className="aunthentication-cover-content text-center py-5 px-sm-5 px-0">
              <div className="row justify-content-center align-items-center h-100">
                <Col xxl={6} xl={8} lg={8} md={12} sm={12} className="col-12">
                  <h1 className="display-1 text-fixed-white">
                    <i className="text-gray-900 bi bi-clock-history"></i>
                  </h1>
                  <div className="m-4">
                    <span className="text-gray-900 fs-20 fw-semibold">
                      Essa sessão expirou
                    </span>
                    <p className="fs-16 text-grey-600">Solicite um novo link de acesso.</p>
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

Unauthorized.layout = "ErrorPagesLayout";

export default Unauthorized;
