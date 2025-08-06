import { Button, Modal } from "react-bootstrap"

interface FeedbackModalProps {
  hidden?: boolean
  success?: boolean
  successMessage?: string | JSX.Element,
  errorMessage?: string | JSX.Element,
  onClose: () => void,
  bootstrapIconCode?: string,
  hasButtonClose?: boolean
}

const FeedbackModal = ({ hasButtonClose = true, hidden, success, successMessage, errorMessage, onClose, bootstrapIconCode }: FeedbackModalProps) => {
  return <Modal
    backdrop="static"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
      borderRadius: '8px', // Opcional
    }}

    centered
    show={!hidden} >
    <Modal.Body>
      {success ?
        <p className="fs-6 d-flex align-items-center">
          {bootstrapIconCode ? <i className={`${bootstrapIconCode} fs-1 pe-4`}></i> : <i style={{ color: '#61833a' }} className="fs-1  bi bi-check-circle-fill pe-4"></i>}
          {successMessage ?? 'Operação realizada com sucesso'}</p>
        : <p className="fs-6 d-flex align-items-center">
          {bootstrapIconCode ? <i className={`${bootstrapIconCode} fs-1 pe-4`}></i> : <i style={{ color: '#e91e63' }} className="fs-1 bi bi-exclamation-octagon-fill pe-4"></i>}
          {errorMessage ?? 'Parece que algo deu errado.'}
        </p>}
    </Modal.Body>

    {hasButtonClose && <Modal.Footer>
      <Button variant="light" onClick={onClose}>Fechar</Button>
    </Modal.Footer>}

  </Modal>

}

export default FeedbackModal