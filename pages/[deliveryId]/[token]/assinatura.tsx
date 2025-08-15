"use client";
import { API_CREATE_SIGNATURE } from "@/pages/api/signature/create-signature.api";
import CustomButton from "@/shared/components/custom-button";
import { useGlobalContext } from "@/shared/context/global-context";
import { ChangeOrietationSvgComponent } from "@/shared/svg-component";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

type Props = {
  handleNext: () => void;
};

const SignatureCollectStep = ({ }: Props) => {
  const { token, delivery, setFinalDocumentUrl } = useGlobalContext();
  const { setShowHeader } = useGlobalContext();
  const sigRef = useRef<SignatureCanvas>(null);
  const router = useRouter()
  const [load, setLoad] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Detecta orientação e tamanho da tela
  const updateDimensions = () => {
    if (typeof window !== "undefined") {
      setIsLandscape(window.innerWidth > window.innerHeight);
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    setShowHeader(false);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const clear = () => sigRef.current?.clear();

  const save = async () => {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      console.error("Nenhuma assinatura capturada");
      return;
    }

    try {
      setLoad(true);
      const base64Image = sigRef.current.toDataURL("image/png");
      const blob = await fetch(base64Image).then(res => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "signature.png");

      const response = await API_CREATE_SIGNATURE({
        formData,
        token,
        deliveryId: delivery.id,
      });

      trativeResponseUtils({
        response,
        callBackError: console.error,
        callBackSuccess: (res) => {
          setFinalDocumentUrl(res?.data?.urlSignatureCompleted);

          router.replace("/finalizada");
          // handleNext();
        },
      });
    } catch (err) {
      console.error("Erro ao salvar assinatura:", err);
    } finally {
      setLoad(false);
    }
  };

  if (!isLandscape) {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center vh-100 text-center p-3">
        <ChangeOrietationSvgComponent className="w-25 mb-3" />
        <h4>Vire o celular para assinar</h4>
      </div>
    );
  }

  // Calcula altura do canvas considerando header e botões
  const headerHeight = 40;
  const buttonsHeight = 100;
  const canvasHeight = windowHeight - headerHeight - buttonsHeight; // margem extra 40px
  const canvasWidth = windowWidth - 40;

  return (
    <div
      className="d-flex flex-column align-items-center justify-between"
      style={{ height: windowHeight - headerHeight }}
    >
      <div className="d-flex align-items-center mb-1 w-100">
        {/* <SignatureSvgComponent style={{ height: 50 }} /> */}
        <div className="ms-0">
          {/* <h3 className="m-0">Assinatura</h3> */}
          <span className="text-muted">Assinatura do recebedor</span>
        </div>
      </div>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: canvasWidth,
          height: canvasHeight,
          className: "sigCanvas border rounded",
        }}
      />

      <div className="d-flex justify-content-center   gap-3 mt-3 w-100">
        <CustomButton icon={<i className="bi bi-eraser-fill"></i>} theme="secundary" label="Limpar" handleClick={clear} />
        <CustomButton
          loading={load}
          label="Próximo"
          handleClick={() => {
            save();
            setShowHeader(true);
          }}
        />
      </div>
    </div>
  );
};

export default SignatureCollectStep;
