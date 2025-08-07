'use client'
import CustomButton from "@/shared/components/custom-button"
import { Fragment } from "react"

type Props = {
  handleNext: () => void
}

const SignatureCollect = ({ handleNext }: Props) => {
  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center justify-content-center text-center ">
        <i className="bi bi-gear spinning-icon mb-3"></i>
        <h3>Coletor de assinatura</h3>
        <span className="text-muted">Estamos trabalhando nisso, em breve será disponibilizado para testes</span>

        <div className="mt-4">
          <CustomButton
            handleClick={handleNext}
            label={<>Avançar</>}
            title="Próximo"
          />
        </div>
      </div>
    </Fragment>
  )
}

export default SignatureCollect
