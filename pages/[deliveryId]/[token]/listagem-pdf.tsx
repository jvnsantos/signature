'use client'
import CustomButton from "@/shared/components/custom-button"
import { useGlobalContext } from "@/shared/context/global-context"
import { DocumentSvgElement } from "@/shared/svg-component"
import { Fragment, useEffect, useState } from "react"
import LoadingPage from "./loading"

type Props = {
  handleNext: () => void
}
const ListPdfDocument = ({ handleNext }: Props) => {
  const { invoice, setCurrentStep, setSelectedInvoice, setShowHeader } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)


  const [, setErrorViewer] = useState<string | null>(null)

  const sortedPdfs = invoice ? [...invoice].sort((a, b) => a.ordering - b.ordering) : []

  const filteredPdfs = sortedPdfs.filter(pdf =>
    pdf.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pdf.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectPdf = (invoiceNumber: string) => {
    setSelectedInvoice(invoiceNumber)
    setErrorViewer(null)
    setSelectedInvoice(invoiceNumber)
    setCurrentStep(2)
  }

  useEffect(() => {
    setShowHeader(false)
    setTimeout(() => { setLoading(false); setShowHeader(true) }, 2500)
  }, [])


  if (loading) {
    return <LoadingPage />
  }

  if (!invoice || invoice.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '400px' }}>
        <i className="bi bi-file-earmark-pdf mb-3" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
        <h3>Nenhum PDF encontrado</h3>
        <p className="text-muted mb-4">Não há documentos PDF disponíveis para visualização</p>
        <CustomButton
          handleClick={handleNext}
          label={<>Continuar</>}
          title="Próximo passo"
        />
      </div>
    )
  }

  if (!loading) {
    return (
      <Fragment>
        <div className="container-fluid">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex align-items-start gap-3">
                <DocumentSvgElement className="w-25" />
                <div className="w-100">
                  <h3 className="m-0">Documentos</h3>
                  <span className="text-muted mb-0">
                    {filteredPdfs.length} documento{filteredPdfs.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {filteredPdfs.length === 0 && searchTerm ? (
                <div className="text-center py-5">
                  <i className="bi bi-search mb-3" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <h4>Nenhum resultado encontrado</h4>
                  <p className="text-muted">Tente buscar por outro termo ou limpe o filtro</p>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <div className="row">
                  {filteredPdfs.map((pdf) => (
                    <div key={pdf.invoice} className="col-lg-4 col-md-6 mb-4">
                      <div className="card h-100 shadow-sm border-0 drop-shadow">
                        <div className="card-body d-flex flex-column">
                          {/* Header do card */}
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="flex-grow-1">
                              <h5 className="card-title mb-1 text-gray-900">
                                <i className="bi bi-file-earmark-pdf me-2"></i>
                                {pdf.invoice}
                              </h5>
                              <p className="card-text text-muted mb-0 small">
                                {pdf.description}
                              </p>
                            </div>
                            <span className="badge text-muted ms-2">
                              #{pdf.ordering}
                            </span>
                          </div>

                          <div
                            className="bg-light border rounded d-flex align-items-center justify-content-center mb-3"
                            style={{ height: '120px' }}
                          >
                            <div className="text-center">
                              <i className="bi bi-file-earmark-pdf text-muted" style={{ fontSize: '2.5rem' }}></i>
                              <div className="small text-muted mt-1">Documento PDF</div>
                            </div>
                          </div>

                          <div className="mt-auto">
                            <CustomButton
                              handleClick={() => handleSelectPdf(pdf.invoice)}
                              title="Visualizar documento"
                              label="Visualizar documento"
                              theme="secundary"
                              icon={<i className="bi bi-eye me-1"></i>}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filteredPdfs.length > 0 && (
            <div className="row mt-4">
              <div className="col-12">
                <CustomButton
                  handleClick={handleNext}
                  label={<>Avançar</>}
                  title="Próximo passo"
                />
              </div>
            </div>
          )}
        </div>
      </Fragment>
    )
  }


}

export default ListPdfDocument