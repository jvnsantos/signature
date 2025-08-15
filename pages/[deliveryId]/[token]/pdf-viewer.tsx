import CustomButton from "@/shared/components/custom-button"
import { useGlobalContext } from "@/shared/context/global-context"
import { Fragment, useEffect, useState } from "react"

type Props = {
  handleBack: () => void,
}
const RenderPdfViewer = ({ handleBack }: Props) => {
  const { invoice, selectedInvoice } = useGlobalContext()
  const [selectedPdf, setSelectedPdf] = useState<any>()
  const [isLoadingViewer, setIsLoadingViewer] = useState<boolean>(true)


  useEffect(() => {
    const _selectedPdf = invoice.find(pdf => pdf.invoice === selectedInvoice)
    setSelectedPdf(_selectedPdf)
  }, [])


  if (!selectedPdf) {
    return (
      <div className="text-center py-5">
        <h2>
          {selectedInvoice} {selectedPdf}
        </h2>
        <i className="bi bi-file-earmark-x mb-3 text-danger" style={{ fontSize: '3rem' }}></i>
        <h4 className="text-danger">PDF não encontrado</h4>
        <p className="text-muted mb-3">O documento selecionado não está disponível</p>
        <button
          className="btn btn-outline-primary"
          onClick={handleBack}
        >
          <i className="bi bi-arrow-left me-1"></i>
          Voltar à lista
        </button>
      </div>
    )
  }

  return (
    <Fragment>
      {/* Visualizador */}
      <div
        className="pdf-viewer-container"
        style={{
          height: 'calc(100vh - 100px)',
          border: '1px solid #dee2e6',
          borderRadius: '0.375rem',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {isLoadingViewer && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="d-flex flex-column align-items-center">
              <div className="spinner-border text-primary mb-2" role="status"></div>
              <span>Carregando PDF...</span>
            </div>
          </div>
        )}

        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
          width="100%"
          height="100%"
          style={{
            border: 'none',
            display: 'block'
          }}
          title={`PDF: ${selectedPdf.invoice}`}
          onLoad={() => setIsLoadingViewer(false)}
        />
      </div>

      <div className="px-3 py-2">
        {/* Informações adicionais */}
        <div className="mt-3">
          <div className="row">
            <div className="d-flex flex-column">
              <strong className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Documento: {selectedPdf.invoice}
              </strong>
              <small className="text-muted ps-3">{selectedPdf.description}</small>
            </div>
          </div>
        </div>

        <div>
          <div className="my-3">
            <CustomButton
              theme="secundary"
              handleClick={handleBack}
              label={'Voltar à lista'}
              title="Voltar à lista"
              icon={<i className="bi bi-arrow-left me-1"></i>}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RenderPdfViewer