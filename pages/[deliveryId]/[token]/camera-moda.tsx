import getCroppedImg from "@/shared/utils/get-cropped-img";
import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Cropper from "react-easy-crop";

type CameraModalProps = {
  show: boolean;
  onClose: () => void;
  onCapture: (imageBase64: string) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ show, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Crop state
  const [captured, setCaptured] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropping, setCropping] = useState(false);

  useEffect(() => {
    if (show) {
      startCamera();
    } else {
      stopCamera();
      setCaptured(null);
      setCropping(false);
    }
    return () => stopCamera();
  }, [show]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.log(error)
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error2) {
        console.error("Erro ao acessar câmera traseira:", error2);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Ajuste do canvas para o tamanho do vídeo
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setCaptured(imageData);
        setCropping(true);
        stopCamera();
      }
    }
  };

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(captured!, croppedAreaPixels);
      onCapture(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Tirar Foto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {!captured ? (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-100 rounded" />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        ) : cropping ? (
          <div style={{ position: "relative", width: "100%", height: 400, background: "#333" }}>
            <Cropper
              image={captured}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3} // proporção que desejar
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <img src={captured} alt="Prévia" className="w-100 rounded" />
        )}
      </Modal.Body>
      <Modal.Footer>
        {!captured ? (
          <Button variant="primary" onClick={takePhoto}>
            Capturar
          </Button>
        ) : cropping ? (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setCaptured(null);
                setCropping(false);
                startCamera();
              }}
            >
              Retirar outra
            </Button>
            <Button variant="success" onClick={showCroppedImage}>
              Usar foto
            </Button>
          </>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default CameraModal;
