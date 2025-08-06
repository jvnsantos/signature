import { FC } from "react";

type Props = {
  title?: string;
  handleClick: () => void;
  className?: string;
  icon?: JSX.Element;
  theme?: 'primary' | 'secundary' | 'tertiary' | 'red';
  size?: 's' | 'm' | 'l';
  disable?: boolean;
  type?: 'submit'
};

const CustomButtonIcon: FC<Props> = ({
  title,
  className = '',
  icon,
  theme = 'primary',
  size = 'm',
  disable = false,
  handleClick
}) => {
  const baseClass = 'custom-btn-icon';
  const variantThemeClass = `btn-icon-${theme}`;
  const sizeClass = `btn-size-${size}`;
  const disableClass = disable ? 'btn-disabled' : '';

  const onClick = () => {
    console.log('🖱️ Button clicked, disable:', disable);
    if (!disable) {
      handleClick();
    }
  };

  return (
    <div
      title={title}
      className={`${baseClass} ${variantThemeClass} ${sizeClass} ${disableClass} ${className}`.trim()}
      onClick={onClick}
      style={{
        // DEBUG: Forçar estilos inline para testar
        ...(disable && {
          backgroundColor: '#e9ecef !important',
          color: '#adb5bd !important',
          cursor: 'not-allowed',
          pointerEvents: 'none'
        })
      }}
    >
      {icon}
    </div>
  );
};

export default CustomButtonIcon;