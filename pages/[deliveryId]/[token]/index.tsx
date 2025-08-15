// /pages/[deliveryId]/[token]/index.tsx
'use client'
import CustomButton from "@/shared/components/custom-button";
import LoadingPage from "@/shared/components/loading-page";
import MapModal from "@/shared/components/map-modal";
import { useGlobalContext } from "@/shared/context/global-context";
import RedirectUnauthorized from "@/shared/utils/redirect-unauthorized.util";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import DriverGeolocalization from "./localizacao-motorista";
import ListPdfDocument from "./listagem-pdf";
import DropAttachments from "./envio-anexos";
import SignatureCollect from "./assinatura";
import RenderPdfViewer from "./pdf-viewer";
import ReceiverStep from "./recebedor";
import { API_GET_DELIVERY } from "@/pages/api/delivery/get-delivery.api";
import FinishViwer from "./finish";

const DeliveryPage = () => {
  const router = useRouter();
  const { setClient, setCompany, setDelivery, setInvoice, client, company, setShowHeader, currentStep, setCurrentStep, setToken } = useGlobalContext()
  const { deliveryId, token } = router.query;
  const [showMap, setShowMap] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [stepKey, setStepKey] = useState(0);

  const validate = async () => {
    try {
      setShowHeader(false)
      if (!deliveryId || !token) {
        RedirectUnauthorized({ router })
        return
      }
      setToken(token as string)
      const response = await API_GET_DELIVERY({ deliveryId: deliveryId as string, token: token as string })

      trativeResponseUtils({
        response,
        callBackError: () => { router.replace("/unauthorized"); },
        callBackSuccess: (response) => {
          const data = response.data
          setInvoice(data.invoices)
          setCompany(data.company)
          setDelivery(data.delivery)
          setClient(data.client)
          setAuthorized(true)
          setShowHeader(true)
        }
      })

    } catch (err) {
      console.error("Erro ao validar:", err);
      router.replace("/unauthorized");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="shadow-light">
            <Card.Body>
              <Row className="text-center">
                <Col>
                  <h4 className="fs-4 ">Bem-vindo!</h4>
                  <span className="fs-6 text-muted">Vamos iniciar o processo de entrega</span>
                </Col>
              </Row>

              <Row className="my-4">
                <Col>
                  <div className="after-green px-3 py-2">
                    <h5 className="m-0">{company?.name?.toUpperCase()}</h5>
                    <span className="text-muted">Empresa responsável</span>
                  </div>
                </Col>
              </Row>

              <Row className="my-4">
                <Col>
                  <div className="after-blue px-3 py-2">
                    <h5 className="m-0">{client?.name}</h5>
                    <span className="text-muted">Cliente destinatário</span>
                  </div>
                </Col>
              </Row>

              <div className="d-flex flex-row gap-2">
                <i className="bi bi-geo-alt fs-5 text-primary"></i>
                <Row>
                  <h5 className="pt-1">Endereço da entrega</h5>
                  <span className="text-muted">{client?.address?.street}, {client?.address?.number ?? 'S/N'}</span>
                  <span className="text-muted">{client?.address?.neighborhood}, {client?.address?.city}/{client?.address?.state}</span>
                  <span className="text-muted">CEP: {client?.address?.postalCode}</span>
                </Row>
              </div>

              <div className="mt-4 d-flex w-100 justify-content-center align-items-center gap-3">
                <CustomButton
                  className="shadow-light"
                  size="l"
                  handleClick={() => setShowMap(true)}
                  label={'Ver no mapa'}
                  title="Ver no mapa"
                  icon={<i className=" fs-6 bi bi-geo"></i>}
                  theme="secundary"
                />

                <CustomButton
                  className="shadow-light"
                  size="l"
                  handleClick={() => setCurrentStep(1)}
                  label={'Continuar'}
                  title="Continuar"
                />
              </div>
            </Card.Body>
          </Card>
        );




      case 1:
        return (
          <Card className="shadow-light">
            <Card.Body>
              <ListPdfDocument handleNext={() => setCurrentStep(3)} />
            </Card.Body>
          </Card>
        );


      case 2:
        return (
          <Card className="shadow-light p-0">
            <Card.Body className="p-0">
              {/* Volta para o 2*** */}
              <RenderPdfViewer handleBack={() => setCurrentStep(1)} />
            </Card.Body>
          </Card>
        );


      case 3:
        return (
          <Card className="shadow-light ">
            <Card.Body className="">
              {/* Volta para o 2*** */}
              <ReceiverStep handleNext={() => setCurrentStep(4)} />
            </Card.Body>
          </Card>
        );


      case 4:
        return (
          <Card className="shadow-light p-0">
            <Card.Body className="p-0">
              <DropAttachments deliveryId={deliveryId as string} handleNext={() => setCurrentStep(5)} />
            </Card.Body>
          </Card>
        );



      case 5:
        return (
          <Card className="shadow-light">
            <Card.Body>
              <DriverGeolocalization handleNext={() => setCurrentStep(6)} />
            </Card.Body>
          </Card>
        );


      case 6:
        return (
          <Card className="shadow-light">
            <Card.Body>
              <SignatureCollect handleNext={() => setCurrentStep(7)} />
            </Card.Body>
          </Card>
        );


      case 7:
        return (
          <Card className="shadow-light p-0">
            <Card.Body className="p-0">
              <FinishViwer />
            </Card.Body>
          </Card>
        );
      default:
        return null;
    }
  };


  useEffect(() => {
    // toda vez que o step mudar, atualiza a key para resetar a animação
    setStepKey(prev => prev + 1);
  }, [currentStep]);



  useEffect(() => {
    if (!deliveryId || !token) return;
    validate();
  }, [deliveryId, token]);

  if (authorized === null) {
    return <LoadingPage />;
  }

  return (
    <Fragment>
      <div key={stepKey} className="step-transition">
        {renderStepContent()}
      </div>
      <MapModal
        show={showMap}
        onClose={() => setShowMap(false)}
        latitude={parseFloat(client?.address?.latitude)}
        longitude={parseFloat(client?.address?.longitude)}
      />
    </Fragment>
  );
};
DeliveryPage.layout = "Contentlayout";
export default DeliveryPage;
