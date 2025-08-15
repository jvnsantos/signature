import { useGlobalContext } from "@/shared/context/global-context"
import { Fragment, useState } from "react"

const FinishViwer = () => {
  const { finalDocumentUrl} = useGlobalContext()
  const [isLoadingViewer, setIsLoadingViewer] = useState<boolean>(true)

  if (!finalDocumentUrl) {
    return (
      <div className="text-center py-5">
        <h2>
          Atenção
        </h2>
        <i className="bi bi-file-earmark-x mb-3 text-danger" style={{ fontSize: '3rem' }}></i>
        <h4 className="text-danger">PDF não encontrado</h4>
        <p className="text-muted mb-3">O documento não está disponível</p>
      </div>
    )
  }

  return (
    <Fragment>
      <div
        className="pdf-viewer-container"
        style={{
          height: 'calc(100vh)',
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
              <span>Carregando PDF ...</span>
            </div>
          </div>
        )}

        <iframe
          src={`${finalDocumentUrl}#zoom=${1}&toolbar=1&navpanes=1&scrollbar=1`}
          width="100%"
          height="100%"
          style={{
            border: 'none',
            display: 'block'
          }}
          title={`PDF: Documento finalizado`}
          onLoad={() => setIsLoadingViewer(false)}
          onError={() => {
            setIsLoadingViewer(false)
          }}
        />
      </div>

      <div className="px-3 py-2">
        {/* Informações adicionais */}
        <div className="mt-3">
          <div className="row">
            <div className="d-flex flex-column">
              <strong className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Comprovante de entrega
              </strong>
              {/* <small className="text-muted ps-3">Relatório com as informações e anexos referente a entrega  </small> */}
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default FinishViwer