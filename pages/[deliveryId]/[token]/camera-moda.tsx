import React, { useRef, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

type CameraModalProps = {
  show: boolean;
  onClose: () => void;
  onCapture: (imageBase64: string) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ show, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  // Inicia câmera ao abrir modal
  useEffect(() => {
    if (show) {
      startCamera();
    } else {
      stopCamera();
      setCaptured(null);
    }
    return () => stopCamera();
  }, [show]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setCaptured(imageData);
      }
    }
  };

  const handleConfirm = () => {
    if (captured) {
      onCapture(captured);
      onClose();
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
            <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
          </>
        ) : (
          <img src={captured} alt="Prévia" className="w-100 rounded" />
        )}
      </Modal.Body>
      <Modal.Footer>
        {!captured ? (
          <Button variant="primary" onClick={takePhoto}>
            Capturar
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setCaptured(null)}>
              Retirar outra
            </Button>
            <Button variant="success" onClick={handleConfirm}>
              Usar foto
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CameraModal;
