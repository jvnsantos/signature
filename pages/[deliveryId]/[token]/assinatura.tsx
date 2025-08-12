"use client";
import CustomButton from "@/shared/components/custom-button";
import { useGlobalContext } from "@/shared/context/global-context";
import { ChangeOrietationSvgComponent, SignatureSvgComponent } from "@/shared/svg-component";
import { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

type Props = {
  handleNext: () => void;
};

const SignatureCollectStep = ({ handleNext }: Props) => {
  const { setShowHeader } = useGlobalContext()
  const sigRef = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLandscape, setIsLandscape] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 150 });

  const checkOrientation = () => {
    if (typeof window !== "undefined") {
      const landscape = window.innerWidth > window.innerHeight;
      setIsLandscape(landscape);


      // Calcula tamanho do canvas baseado no container
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        if (landscape) {
          // ocupa quase toda a tela no horizontal
          setCanvasSize({
            width: containerWidth - 20,
            height: containerHeight * 0.6, // 60% da altura
          });
        } else {
          // tamanho padrão no vertical
          setCanvasSize({ width: containerWidth - 20, height: 200 });
        }
      }
    }
  };

  useEffect(() => {
    setShowHeader(false)
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, [isLandscape]);

  const clear = () => sigRef.current?.clear();
  const save = () => {
    const dataUrl = sigRef.current?.toDataURL("image/png");
    console.log(dataUrl);
    handleNext();
  };

  if (!isLandscape) {
    return (
      <div className="d-flex justify-content-center flex-column align-items-center vh-100 text-center p-3">
        <ChangeOrietationSvgComponent className="w-25 mb-3"/>
        <h4>Vire o celular para assinar</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid p-3" ref={containerRef}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex h-25 align-items-start gap-3">
            <SignatureSvgComponent style={{ height: '50px' }} />
            <div className="w-100">
              <h3 className="m-0 mt-2">Assinatura</h3>
              <span className="text-muted mb-0">Assinatura do recebedor</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            width: canvasSize.width,
            height: canvasSize.height,
            className: "sigCanvas border rounded",
          }}
        />
        <div className="mt-2">
          <CustomButton theme="secundary" label="Limpar" handleClick={clear} />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <CustomButton
          className="py-4"
          handleClick={() => {
            save();
            handleNext();
            setShowHeader(true)
          }}
          label="Próximo"
        />
      </div>
    </div>
  );
};

export default SignatureCollectStep;
