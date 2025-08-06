
type Props = {
  theme: 'attention' | 'error',
  message: string | JSX.Element
  icon?: JSX.Element,
  className?: string
}
const CustomAlert = ({ message, theme, icon, className }: Props) => {

  return <div
    className={`custom-alert alert-theme-${theme} mb-3 ${className}`}
    role="alert">
    {icon}{message}
  </div>
}

export default CustomAlert