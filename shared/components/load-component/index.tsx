import { FC, Fragment } from "react"

const LoadComponent: FC<{ label?: string }> = ({ label }) => {

  return (
    <Fragment>
      <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary " style={{ width: '3rem', height: '3rem' }}
          role="status">
          <span className="text-mutedvisually-hidden"></span>
        </div>
        <p className="mt-3">{label ?? 'Aguarde um instante...'}</p>
      </div>
    </Fragment>
  )
}
export default LoadComponent