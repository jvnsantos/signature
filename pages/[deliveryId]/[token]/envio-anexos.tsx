"use client";
import { API_GET_ATTACHMENTS } from "@/pages/api/delivery";
import { useGlobalContext } from "@/shared/context/global-context";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import CameraModal from "./camera-moda";
import CustomButton from "@/shared/components/custom-button";
import { PicSvgElement } from "@/shared/svg-component";

// Tipos
type Photo = {
  id: number;
  image: string;
  description: string;
  type: string;
  observations?: string;
};

type Props = {
  handleNext: () => void;
  deliveryId: string; // usado para buscar anexos
};

const PhotoCollector = ({ handleNext, deliveryId }: Props) => {
  const { token } = useGlobalContext()
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState("");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Buscar anexos do backend ao montar
  useEffect(() => {
    async function loadAttachments() {
      try {
        const response = await API_GET_ATTACHMENTS({ deliveryId, token });
        const mappedPhotos: Photo[] = response.map((att: any) => ({
          id: Number(att.deliveryAttachmentId),
          image: att.urlAttachment,
          description: att.description,
          type: att.name || "",
          observations: att.observations || "",
        }));
        setPhotos(mappedPhotos);
      } catch (error) {
        console.error("Erro ao carregar anexos:", error);
      }
    }
    loadAttachments();
  }, [deliveryId, API_GET_ATTACHMENTS]);

  // Tirar foto pela câmera
  const handleCameraCapture = (photoDataUrl: string) => {
    if (photos.length >= 6) return;
    setCurrentPhoto(photoDataUrl);
    setPhotoType("");
    setObservations("");
    setShowCamera(false);
    setShowModal(true);
  };



  // Salvar ou atualizar foto
  const handleSavePhoto = () => {
    if (!photoType || !currentPhoto) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    const description = photoType + (observations ? ` - ${observations}` : "");
    const existingIndex = photos.findIndex((p) => p.image === currentPhoto);

    if (existingIndex !== -1) {
      // Atualiza
      const updated = [...photos];
      updated[existingIndex] = {
        ...updated[existingIndex],
        description,
        type: photoType,
        observations,
      };
      setPhotos(updated);
    } else {
      // Adiciona
      setPhotos((prev) => [
        ...prev,
        {
          id: Date.now(),
          image: currentPhoto,
          description,
          type: photoType,
          observations,
        },
      ]);
    }

    handleCloseModal();
  };

  // Abrir modal para edição de foto existente
  const handleOpenEdit = (photo: Photo) => {
    setCurrentPhoto(photo.image);
    setPhotoType(photo.type);
    setObservations(photo.observations || "");
    setShowModal(true);
  };

  // Remover foto
  const handleRemovePhoto = (photoId: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPhoto(null);
    setPhotoType("");
    setObservations("");
    setError(null);
  };

  const canProceed = photos.length >= 2;

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-start gap-3">
            <PicSvgElement className="w-25" />
            <div className="w-100">
              <h3 className="m-0 mt-2">Anexos</h3>
              <span className="text-muted mb-0">
                Mínimo 2 fotos obrigatórias <span className="mandatory" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade de fotos */}
      <div >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
            onClick={() => handleOpenEdit(photo)}
          >
            <div className="relative aspect-[4/4]">
              <img
                src={photo.image}
                alt="Foto"
                className="w-50  object-contain"
              />
              <span onClick={(e) => {
                e.stopPropagation();
                handleRemovePhoto(photo.id);
              }}
                className="close-miniature" />

            </div>
            <div className="p-2">
              <p className="text-xs text-gray-600 leading-tight">
                {photo.description}
              </p>
            </div>
          </div>
        ))}

        {/* Botão adicionar */}
        {photos.length < 6 && (
          <CustomButton
            className="py-4"
            icon={<i className="bi bi-image"></i>}
            theme="secundary"
            label='Adicionar Foto'
            handleClick={() => setShowCamera(true)}
          />
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex justify-between mt-4">
        <CustomButton
          className="py-4"
          handleClick={handleNext}
          disable={!canProceed}
          label='Próximo'
        />
      </div>

      {/* Modal da câmera */}
      <CameraModal
        show={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      {/* Modal para edição/nova foto */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPhoto && photos.find((p) => p.image === currentPhoto)
              ? "Editar Foto"
              : "Nova Foto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {currentPhoto && (
            <img
              src={currentPhoto}
              alt="Foto capturada"
              className="w-full h-auto mb-3 rounded"
            />
          )}

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Foto *</Form.Label>
            <Form.Control
              as="select"
              value={photoType}
              onChange={(e) => setPhotoType(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Foto 1">Foto 1</option>
              <option value="Foto 2">Foto 2</option>
              <option value="Foto 3">Foto 3</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite observações (opcional)"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSavePhoto}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default PhotoCollector;
