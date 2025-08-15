// /shared/components/map-modal.tsx
'use client';

import { Modal } from "react-bootstrap";

interface MapModalProps {
  show: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: number;
  height?: number;
}

const MapModal = ({
  show,
  onClose,
  latitude,
  longitude,
  zoom = 16,
  width = 800,
  height = 450
}: MapModalProps) => {
  const apiKey = process.env.SECRETS_SCAN_OMIT_PATHS as string;

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red|${latitude},${longitude}&key=${apiKey}`;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Localização no Mapa</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <img
          src={staticMapUrl}
          alt="Mapa estático com marcador"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
