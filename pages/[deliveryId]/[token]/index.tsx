// /pages/[deliveryId]/[token]/index.tsx
'use client'
import { API_GET_DELIVERY } from "@/pages/api/delivery/get-delivery.api";
import CustomButton from "@/shared/components/custom-button";
import LoadingPage from "@/shared/components/loading-page";
import MapModal from "@/shared/components/map-modal";
import { useGlobalContext } from "@/shared/context/global-context";
import RedirectUnauthorized from "@/shared/utils/redirect-unauthorized.util";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import SignatureCollect from "./assinatura";
import DropAttachments from "./envio-anexos";
import FinishViwer from "./finish";
import ListPdfDocument from "./listagem-pdf";
import DriverGeolocalization from "./localizacao-motorista";
import RenderPdfViewer from "./pdf-viewer";
import ReceiverStep from "./recebedor";
import JustificativaCancelamento from "./justificativa-cancelamento";

const DeliveryPage = () => {
  const router = useRouter();
  const { setClient, setCompany, setDelivery, setInvoice, client, company, setShowHeader, currentStep, setCurrentStep, setToken } = useGlobalContext()
  const { deliveryId, token } = router.query;
  const [showMap, setShowMap] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [stepKey, setStepKey] = useState(0);



  const steps = [
    "Documentos",
    "Recebedor",
    "Anexos",
    "Assinatura",
  ];


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

          if (data.delivery.status === 'COMPLETED') {
            router.replace("/finalizada");
            return
          }

          if (data.delivery.status !== 'PENDING') {
            router.replace("/invalida");
            return
          }

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
          <div className="content-holder">
            <div className="text-center bg-white">
              <Col>
                <h4 className="fs-4 ">Bem-vindo!</h4>
                <span className="fs-6 text-muted">Vamos iniciar o processo de entrega</span>
              </Col>
            </div>

            <div className="my-4">
              <Col>
                <div className="after-green px-3 py-2">
                  <h5 className="m-0">{company?.name?.toUpperCase()}</h5>
                  <span className="text-muted">Empresa responsável</span>
                </div>
              </Col>
            </div>

            <div className="my-4">
              <Col>
                <div className="after-blue px-3 py-2">
                  <h5 className="m-0">{client?.name}</h5>
                  <span className="text-muted">Cliente destinatário</span>
                </div>
              </Col>
            </div>

            <div className="d-flex flex-div gap-2">
              <i className="bi bi-geo-alt fs-5 text-primary"></i>
              <div>
                <h5 className="pt-1">Endereço da entrega</h5>
                <span className="text-muted">{client?.address?.street}, {client?.address?.number ?? 'S/N'}</span>
                <span className="text-muted">{client?.address?.neighborhood}, {client?.address?.city}/{client?.address?.state}</span>
                <span className="text-muted">CEP: {client?.address?.postalCode}</span>
              </div>
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
            <div className="mt-5">
              <CustomButton
                theme="tertiary"
                label='Cliente não localizado?'
                handleClick={() => setCurrentStep(8)}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="content-holder">
            <ListPdfDocument steps={steps} currentStep={currentStep} handleNext={() => setCurrentStep(3)} />
          </div>
        );


      case 2:
        return (
          <div className="content-holder">
            <RenderPdfViewer handleBack={() => setCurrentStep(1)} />
          </div>
        );


      case 3:
        return (
          <div className="content-holder">
            <ReceiverStep currentStep={currentStep} steps={steps} handleNext={() => setCurrentStep(4)} />
          </div>
        );


      case 4:
        return (
          <div className="content-holder">
            <DropAttachments currentStep={currentStep} steps={steps} deliveryId={deliveryId as string} handleNext={() => setCurrentStep(5)} />
          </div>
        );



      case 5:
        return (
          <div className="content-holder">
            <DriverGeolocalization handleNext={() => setCurrentStep(6)} />
          </div>

        );


      case 6:
        return (
          <div className="content-holder">
            <SignatureCollect handleNext={() => setCurrentStep(7)} />
          </div>
        );


      case 7:
        return (
          <div className="content-holder">
            <FinishViwer />
          </div>
        );
      // Justificativa cancelamento
      case 8:
        return (
          <div className="content-holder">
            <JustificativaCancelamento handleBack={() => setCurrentStep(0)}/>
          </div>
        );

      case 9:
        return (
          <div className="content-holder">
          teste
          </div>
        );
      default:
        return null;
    }
  };


  useEffect(() => {
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
        <div className="content-holder">
          {renderStepContent()}



        </div>
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
