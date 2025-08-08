import { FC, Fragment } from "react";

type Props = {
  label: string | JSX.Element;
  title?: string;
  handleClick: () => void;
  className?: string;
  icon?: JSX.Element;
  variant?: 'fill' | 'outline' | 'soft';
  theme?: 'primary' | 'secundary' | 'tertiary' | 'red';
  size?: 's' | 'm' | 'l';
  type?: 'submit'
  disable?: boolean;
  loading?: boolean
};

const CustomButton: FC<Props> = ({
  label,
  title,
  className = '',
  icon,
  variant = 'fill',
  theme = 'primary',
  size = 'm',
  handleClick,
  disable = false,
  loading = false
}) => {
  const baseClass = 'custom-btn';
  const variantThemeClass = `btn-${variant}-${theme}`;
  const sizeClass = `btn-size-${size}`;
  const disableClass = disable ? 'btn-disabled' : '';
  const loadingeClass = loading ? 'btn-disabled' : '';

  const onClick = () => {
    if (!disable && !loading) {
      handleClick();
    }
  };

  return (
    <div
      title={title ? title : label as string}
      className={`${baseClass} ${variantThemeClass} ${sizeClass} ${loadingeClass} ${disableClass} ${className}`.trim()}
      onClick={onClick}
      style={{
        // DEBUG: Forçar estilos inline para testar
        ...(loading && {
          backgroundColor: '#e9ecef !important',
          color: '#adb5bd !important',
          cursor: 'not-allowed',
          pointerEvents: 'none'
        }),
        ...(disable && {
          backgroundColor: '#e9ecef !important',
          color: '#adb5bd !important',
          cursor: 'not-allowed',
          pointerEvents: 'none'
        })
      }}
    >
      {loading ? <Fragment>
        <span className="spinner-border spinner-border-sm align-middle" role="status"
          aria-hidden="true"></span>
        <span >Processando</span>

      </Fragment> : <Fragment>  {icon}
        {label}</Fragment>}

    </div>
  );
};

export default CustomButton;