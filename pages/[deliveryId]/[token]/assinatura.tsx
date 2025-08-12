"use client";
import CustomButton from "@/shared/components/custom-button";
import { SignatureSvgComponent } from "@/shared/svg-component";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
type Props = {
  handleNext: () => void;
};

const SignatureCollectStep = ({ handleNext }: Props) => {


  const sigRef = useRef<SignatureCanvas>(null);

  const clear = () => sigRef.current?.clear();
  const save = () => {
    const dataUrl = sigRef.current?.toDataURL("image/png");
    console.log(dataUrl);
    handleNext();
  };

  return (
    <div className="container-fluid p-3">

      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-start gap-3">
            <SignatureSvgComponent className="w-25" />
            <div className="w-100">
              <h3 className="m-0 mt-2">Assinatura</h3>
              <span className="text-muted mb-0">
                Assinatura do recebedor
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ width: 300, height: 200, className: "sigCanvas" }}
        />

          <CustomButton
            theme="secundary"
            label='Limpar'
            handleClick={clear} />


      </div>


      {/* Botões de ação */}
      <div className="flex justify-between mt-4">
        <CustomButton
          className="py-4"
          handleClick={() => { save(); handleNext() }}
          label='Próximo'
        />
      </div>
    </div >
  )
};

export default SignatureCollectStep;
