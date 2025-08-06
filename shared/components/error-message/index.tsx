import { FC } from "react";

interface ErrorMessageProps {
  msg: string | JSX.Element;
  className?: string;
  onClose?: () => void;
  variant?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ msg, className, variant='warning' }) => {

  const message = msg || msg !== '' ? msg : 'Ops.. houve um problema, tente novamente mais tarde ou entre em contato com o suporte.'
  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show d-flex position-relative  ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
