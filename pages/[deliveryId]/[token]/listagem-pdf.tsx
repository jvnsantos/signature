'use client'
import CustomButton from "@/shared/components/custom-button"
import { useGlobalContext } from "@/shared/context/global-context"
import { DocumentSvgElement } from "@/shared/svg-component"
import { Fragment, useEffect, useState } from "react"
import LoadingPage from "./loading"
import StepsIndicator from "@/shared/components/step-marker"

type Props = {
  steps: string[];
  currentStep: number;
  handleNext: () => void
}

const ListPdfDocument = ({ handleNext, currentStep, steps }: Props) => {
  const { invoice, setCurrentStep, setSelectedInvoice, setShowHeader } = useGlobalContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [, setErrorViewer] = useState<string | null>(null)

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
    setCurrentStep(2)
  }

  useEffect(() => {
    setShowHeader(false)
    setTimeout(() => {
      setLoading(false);
      setShowHeader(true)
    }, 2500)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  if (!invoice || invoice.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center" 
           style={{ minHeight: '400px' }}>
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

          {/* Search Bar */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control mt-0"
                  placeholder="Pesquisar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-5">
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
                <div className="border rounded bg-white">
                  {/* Header da lista - estilo Windows Explorer */}
                  <div className="border-bottom bg-light px-3 py-2">
                    <div className="row align-items-center fw-semibold text-muted small g-0">
                      <div className="col-11">
                        <i className="bi bi-list-ul me-2"></i>Nome
                      </div>
                      <div className="col-1 text-center">Ações</div>
                    </div>
                  </div>

                  {/* Lista de documentos - estilo Windows Explorer */}
                  <div className="list-group list-group-flush">
                    {filteredPdfs.map((pdf, index) => (
                      <div
                        key={pdf.invoice}
                        className={`list-group-item list-group-item-action border-0 px-3 py-2 ${
                          index % 2 === 0 ? 'bg-light bg-opacity-25' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                        onDoubleClick={() => handleSelectPdf(pdf.invoice)}
                      >
                        <div className="row align-items-center g-0">
                          {/* Ícone + Nome do arquivo */}
                          <div className="col-11 d-flex align-items-center">
                            <div className="d-flex align-items-center flex-shrink-0 me-3">
                              <i 
                                className="bi bi-file-earmark-pdf text-danger" 
                                style={{ fontSize: '1.5rem' }}
                              ></i>
                            </div>
                            <div className="flex-grow-1 min-width-0">
                              <div className="fw-medium text-dark text-truncate">
                                {pdf.invoice}
                              </div>
                              <div className="small text-muted text-truncate">
                                {pdf.description}
                              </div>
                            </div>
                          </div>

                          {/* Ícone de detalhes/ações */}
                          <div className="col-1 text-center">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPdf(pdf.invoice);
                              }}
                              title="Ver detalhes"
                              style={{ minWidth: '32px', minHeight: '32px' }}
                            >
                              <i className="bi bi-eye" style={{ fontSize: '0.9rem' }}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <StepsIndicator steps={steps} currentStep={currentStep} />
          
          {filteredPdfs.length > 0 && (
            <div className="row mt-4 mt-5">
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