import Seo from '@/shared/layout-components/seo/seo';
import { Fragment } from 'react';
import { Card, Col, Row } from "react-bootstrap";

const PageTemplate = () => {

  return (
    <Fragment>
      <Seo title="Titulo da pagina" />
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>Titulo da página</Card.Title>
            </Card.Header>
            <Card.Body>
              <div>Conteudo</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

PageTemplate.layout = "Contentlayout";
export default PageTemplate;
