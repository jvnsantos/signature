'use client'
import CustomButton from "@/shared/components/custom-button"
import { useGlobalContext } from "@/shared/context/global-context"
import { Fragment, useState } from "react"

type Props = {
  handleNext: () => void
}

interface PdfDocument {
  invoice: string
  description: string
  ordering: number
  url: string
}

const ListPdfDocument = ({ handleNext }: Props) => {
  const { invoice, setCurrentStep, setSelectedInvoice } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Estados do visualizador
  const [, setErrorViewer] = useState<string | null>(null)

  // Ordenar PDFs por ordering
  const sortedPdfs = invoice ? [...invoice].sort((a, b) => a.ordering - b.ordering) : []

  // Filtrar PDFs baseado no termo de busca
  const filteredPdfs = sortedPdfs.filter(pdf =>
    pdf.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pdf.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectPdf = (invoiceNumber: string) => {
    setSelectedInvoice(invoiceNumber)
    setErrorViewer(null)
    setSelectedInvoice(invoiceNumber)
    setCurrentStep(3)
  }

  // const handleBackToList = () => {
  //   setCurrentView('list')
  //   setSelectedInvoice('')
  //   setIsLoadingViewer(true)
  //   setErrorViewer(null)
  // }

  const handleQuickView = (pdf: PdfDocument) => {
    window.open(pdf.url, '_blank')
  }

  const handleDownload = (pdf: PdfDocument) => {
    const link = document.createElement('a')
    link.href = pdf.url
    link.download = `${pdf.invoice}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  return (
    <Fragment>
      <div className="container-fluid">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">
                  <i className="bi bi-file-earmark-pdf me-2 text-primary"></i>
                  Documentos PDF
                </h4>
                <p className="text-muted mb-0">
                  {filteredPdfs.length} documento{filteredPdfs.length !== 1 ? 's' : ''}
                  {searchTerm && ` encontrado${filteredPdfs.length !== 1 ? 's' : ''} para "${searchTerm}"`}
                </p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '2.5rem', minWidth: '250px' }}
                  />
                  <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de PDFs */}
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
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body d-flex flex-column">
                        {/* Header do card */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <h5 className="card-title mb-1 text-primary">
                              <i className="bi bi-file-earmark-pdf me-2"></i>
                              {pdf.invoice}
                            </h5>
                            <p className="card-text text-muted mb-0 small">
                              {pdf.description}
                            </p>
                          </div>
                          <span className="badge bg-secondary ms-2">
                            #{pdf.ordering}
                          </span>
                        </div>

                        {/* Preview placeholder */}
                        <div
                          className="bg-light border rounded d-flex align-items-center justify-content-center mb-3"
                          style={{ height: '120px' }}
                        >
                          <div className="text-center">
                            <i className="bi bi-file-earmark-pdf text-primary" style={{ fontSize: '2.5rem' }}></i>
                            <div className="small text-muted mt-1">Documento PDF</div>
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="mt-auto">
                          <div className="d-flex gap-2 mb-3">
                            <button
                              className="btn btn-primary btn-sm flex-grow-1"
                              onClick={() => handleSelectPdf(pdf.invoice)}
                              title="Visualizar documento"
                            >
                              <i className="bi bi-eye me-1"></i>
                              Visualizar
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleQuickView(pdf)}
                              title="Abrir em nova aba"
                            >
                              <i className="bi bi-box-arrow-up-right"></i>
                            </button>
                            <button
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleDownload(pdf)}
                              title="Baixar PDF"
                            >
                              <i className="bi bi-download"></i>
                            </button>
                          </div>

                          {/* Info adicional */}
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <i className="bi bi-info-circle me-1"></i>
                              Ordem: {pdf.ordering}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {filteredPdfs.length > 0 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="d-flex justify-content-end p-3">
                <CustomButton
                  handleClick={handleNext}
                  label={<>Avançar</>}
                  title="Próximo passo"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default ListPdfDocument