import Link from "next/link";
import { FC } from "react";

type Props = {
  label: string | JSX.Element;
  title?: string;
  handleClick?: () => void;
  className?: string;
  icon?: JSX.Element;
  variant?: 'enable' | 'blue' | 'gray' | 'green';
  disable?: boolean;
  externalLink: boolean,
  href: string,
  size?: 's' | 'm' | 'l';
  target?: string
};

const CustomLink: FC<Props> = ({
  label,
  title,
  className = '',
  disable = false,
  handleClick,
  icon,
  externalLink = false,
  variant = 'enable',
  target = '_blank',
  href,
  size = 'm',
}) => {
  const baseClass = 'custom-link';
  const variantThemeClass = `custom-link-${variant}`;
  const sizeClass = `btn-size-${size}`;

  const onClick = () => {
    if (!disable && !!handleClick) {
      handleClick();
    }
  };

  if (externalLink) {
    return (
      <a
        className={`${baseClass} ${variantThemeClass} ${sizeClass} ${className}`}
        onClick={onClick}
        href={href}
        target={target}
        title={title ?? label as string}>
        {icon} {label}
      </a>
    )
  }

  return (
    <Link
      className={`${baseClass} ${variantThemeClass}  ${sizeClass} ${className}`}
      onClick={onClick}
      href={href}
      target={target}
      title={title ?? label as string}>
      {icon} {label}
    </Link>
  );
};

export default CustomLink;