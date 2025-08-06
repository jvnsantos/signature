import { Toast } from "react-bootstrap";

type Props = {
  show: boolean;
  variant: 'success' | 'danger' | 'warning';
  // eslint-disable-next-line no-unused-vars
  handleClose: (status: boolean) => void;
  message?: string | JSX.Element;
  icon?: JSX.Element;
  className?: string
}

const CustomToast = ({
  variant,
  show,
  message,
  className,
  icon,
  handleClose }: Props) => {
  let _variant
  switch (variant) {
    case 'success':
      _variant = 'custom-toast-success'
      break
  }

  return <Toast
    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
    className={`m-5 toast-container position-fixed top-0 end-0  p-2  ${_variant} ${className}`}
    onClose={() => handleClose(false)}
    show={show}
    delay={1500}
    autohide
  >
    <Toast.Body className="toast-body toast-bg-success">
      {icon} {message}
    </Toast.Body>
  </Toast>
}

export default CustomToast