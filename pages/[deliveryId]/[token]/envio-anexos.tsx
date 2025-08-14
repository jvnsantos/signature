"use client";
import { useGlobalContext } from "@/shared/context/global-context";
import { useEffect, useState } from "react";
import { Alert, Button, Carousel, Form, Modal } from "react-bootstrap";
import CameraModal from "./camera-moda";
import CustomButton from "@/shared/components/custom-button";
import { PicSvgElement } from "@/shared/svg-component";
import { API_GET_ATTACHMENTS } from "@/pages/api/attachments/get-attachments.api";
import { API_CREATE_ATTACHMENTS } from "@/pages/api/attachments/create-attachment.api";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";

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
  const { token, delivery } = useGlobalContext()
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState("");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);

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
  const handleSavePhoto = async () => {

    try {
      setLoad(true)
      if (!photoType || !currentPhoto) {
        setError("Preencha todos os campos obrigatórios");
        return;
      }

      const description = photoType + (observations ? ` - ${observations}` : "");
      const existingIndex = photos.findIndex((p) => p.image === currentPhoto);


      if (existingIndex !== -1) {
        const updated = [...photos];
        updated[existingIndex] = {
          ...updated[existingIndex],
          description,
          type: photoType,
          observations,
        };

        setPhotos(updated);
      } else {


        const base64Image = currentPhoto;
        const file_name = `${photoType}.jpg`;

        const blob = await fetch(base64Image).then(res => res.blob());

        const formData = new FormData();
        formData.append("image", blob, file_name);
        formData.append("name", photoType);
        formData.append("description", description);

        const response = await API_CREATE_ATTACHMENTS({
          formData,
          token,
          deliveryId: delivery.id
        });

        trativeResponseUtils({
          response,
          callBackError: (message) => { setError(message) },
          callBackSuccess: () => { }
        })

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
    } catch (error) {
      console.error(error)
    } finally {
      setLoad(false)
    }



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

  const canProceed = true;

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-start gap-3">
            <PicSvgElement className="w-25" />
            <div className="w-100">
              <h3 className="m-0 mt-2">Anexos</h3>
              <span className="text-muted mb-0">
                max: 5 fotos (opcional)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grade de fotos */}
      <Carousel
        variant="dark"
        interval={null}
        indicators={true}
        nextLabel=""
        prevLabel=""
        style={{ maxWidth: "400px", margin: "0 auto" }} // centraliza o carousel e limita largura
      >
        {photos.map((photo) => (
          <Carousel.Item key={photo.id}>
            <img
              className="d-block mx-auto"
              src={photo.image}
              alt={photo.description || "Foto"}
              style={{
                height: "300px",
                objectFit: "contain",
                width: "100%",
                cursor: "pointer",
                backgroundColor: "#f8f9fa",
              }}
              onClick={() => handleOpenEdit(photo)}
            />
            <Carousel.Caption>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePhoto(photo.id);
                }}
              >
                Deletar
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Botão adicionar foto */}
      {photos.length < 6 && (
        <div className="text-center mt-3">
          <CustomButton
            loading={load}
            className="py-4"
            icon={<i className="bi bi-image"></i>}
            theme="secundary"
            label="Adicionar Foto"
            handleClick={() => setShowCamera(true)}
          />
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex justify-between mt-4">
        <CustomButton
          loading={load}
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
              className="w-100 h-auto mb-3 rounded"
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
              <option value="items_damaged_delivery">Imagem de produto avariado</option>
              <option value="store_delivary">Imagem do estabelecimento</option>
              <option value="others_delivery">Outros</option>
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
          <CustomButton theme="secundary" label='Cancelar' handleClick={handleCloseModal} />
          <CustomButton theme="primary" label='Salvar' handleClick={handleSavePhoto} />
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default PhotoCollector;
