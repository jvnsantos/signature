import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 99;
        }
        return prev + 5; // incrementa de 5 em 5
      });
    }, 200); // a cada 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <Row className="authentication coming-soon m-0 justify-content-center">
      <span className="sprite sprite-1" />
      <span className="sprite sprite-2" />
      <span className="sprite sprite-4" />
      <Col xxl={8} xl={8} lg={8} className="col-12">
        <div className="authentication-cover text-fixed-white">
          <div className="aunthentication-cover-content text-center py-5 px-sm-5 px-0">
            <div className="row justify-content-center align-items-center h-100">
              <Col xxl={6} xl={8} lg={8} md={12} sm={12} className="col-12">
                <ProgressBar
                  animated
                  striped
                  variant="primary"
                  now={progress}
                  className="progress mb-3 mx-5"
                />
                <div className="m-4">
                  <span className="text-gray-900 fs-20 fw-semibold">
                    Carregando {progress}%
                  </span>
                  <p className="fs-16 text-grey-600">Por favor, aguarde.</p>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoadingPage;
