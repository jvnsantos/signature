import { Fragment } from "react"
import { Col, Modal, ProgressBar, Row } from "react-bootstrap"

type Props = {
  show: boolean,
  message?: string
}

const CustomLoadModalComponent = ({
  show,
  message = 'Por favor aguarde'
}: Props) => {

  return <Fragment>
    <Modal centered show={show}>
      <Modal.Body>

        <Row className="d-flex align-items-center">
          <Col md='auto' sm='auto'>
            <i className="bi bi-cloud-arrow-down-fill fs-2" />
          </Col>
          <Col>
            {message}
          </Col>
        </Row>
        <Row>
          <ProgressBar className="progress bg-muted" animated now={100} />
        </Row>
      </Modal.Body>
    </Modal>
  </Fragment>
}

export default CustomLoadModalComponent