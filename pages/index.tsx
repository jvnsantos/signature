import { Fragment } from "react";
import {
  Col,
  Container,
  Row,
  Tab
} from "react-bootstrap";

const Home = () => {

  return (
    <Fragment>
      <Container className="container-lg">
        <Row className="justify-content-center authentication authentication-basic align-items-center h-100">
          <Col xxl={4} xl={5} lg={6} md={6} sm={8} className="col-12">
            <Tab.Container id="left-tabs-example" defaultActiveKey="nextjs">
              Bem vindo
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
