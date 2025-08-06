import { Col, Modal, Row } from "react-bootstrap";
import CustomButton from "../custom-button";

export type FeedBackStateType = {
  show: boolean;
  isSuccess: boolean;
  message: string | JSX.Element
}

type Props = {
  isVisible: boolean,
  message: string | JSX.Element,
  isSuccess: boolean,
  callBackSuccess?: () => void
  callBackFail?: () => void
  onClose: () => void
  centered?: boolean
}
const CustomFeedback = ({ isVisible, message, isSuccess, centered = true, callBackSuccess, callBackFail, onClose }: Props) => {

  const onClickSuccess = () => {
    if (callBackSuccess) {
      callBackSuccess()
    } else {
      onClose()
    }
  }
  const onClickFail = () => {
    if (callBackFail) {
      callBackFail()
    } else {
      onClose()
    }
  }
  return (
    <Modal centered={centered} show={isVisible} onExit={onClose} className="modal-sm drop-shadow">
      <Modal.Body>
        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            <i className={`fs-4 custom-feedback-icon-${isSuccess ? 'success' : 'fail'} ${isSuccess ? 'bi bi-check-all' : 'bi bi-exclamation-triangle'}`} />
          </Col>
        </Row>
        <Row>
          <Col className='text-gray-700 mx-3'>
            {message}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {isSuccess ?
          <CustomButton
            handleClick={onClickSuccess}
            label={'Entendi'}
            title="Fechar dialago"
            theme="secundary"
            variant="fill"
            size="s"
          /> :
          <CustomButton
            handleClick={onClickFail}
            label={'Tentar novamente'}
            title="Fechar dialago"
            theme="secundary"
            variant="fill"
            size="s"
          />}
      </Modal.Footer>
    </Modal>)
}

export default CustomFeedback