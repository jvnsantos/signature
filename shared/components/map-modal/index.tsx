import React from "react";
import { Modal } from "react-bootstrap";

interface MapModalProps {
  show: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
}

const MapModal: React.FC<MapModalProps> = ({ show, onClose, latitude, longitude }) => {
  const bboxOffset = 0.005; // margem ao redor do marcador

  const bbox = [
    longitude - bboxOffset,
    latitude - bboxOffset,
    longitude + bboxOffset,
    latitude + bboxOffset,
  ]
    .map(coord => coord.toFixed(6))
    .join("%2C");

  const marker = `${latitude.toFixed(6)}%2C${longitude.toFixed(6)}`;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <Modal show={show} onHide={onClose}  centered>
      <Modal.Header closeButton>
        <Modal.Title>Localização da Entrega</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0 }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: "none", minHeight: "400px" }}
          loading="lazy"
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
