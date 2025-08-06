import { Container } from "react-bootstrap";

const MobileOnlyPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h3>Este site está disponível apenas para dispositivos móveis</h3>
      <p>Tente acessar pelo seu celular.</p>
    </Container>
  );
};

export default MobileOnlyPage;
