"use client";
import CustomButton from "@/shared/components/custom-button";
import { DeliverySvgComponent } from "@/shared/svg-component";
import { useState } from "react";
import { Alert, Button, Carousel, Form, Modal } from "react-bootstrap";
import CameraModal from "./camera-moda";
import inputCpfMaskUtils from "@/shared/utils/input-cpf-mask.utils";
import { API_CREATE_ATTACHMENTS, API_UPDATE_RECEIVER } from "@/pages/api/delivery";
import { useGlobalContext } from "@/shared/context/global-context";
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
};

const ReceiverStep = ({ handleNext }: Props) => {
  const { token, delivery } = useGlobalContext()
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleProccess = async () => {
    try {
      await handleCrateAttachment()
      await handleUpdateReceiver()
    } catch (error) {
      console.error(error)
    }
  }

  const initialValues = {
    fullName: '',
    document: '',
    observation: ''
  }

  const [formControll, setFormControll] = useState(initialValues)

  const updateFormCOntroll = (value: any, accessor: string) => {
    setFormControll((prev) => ({
      ...prev,
      [accessor]: value
    }))
  }

  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState("receiver_delivery");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCameraCapture = (photoDataUrl: string) => {
    if (photos.length >= 6) return;
    setCurrentPhoto(photoDataUrl);
    setPhotoType("");
    setObservations("");
    setShowCamera(false);
    setShowModal(true);
  };


  const handleSavePhoto = () => {
    setPhotos([])
    if (!currentPhoto) {
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
        type: 'receiver_delivery',
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
          type: 'receiver_delivery',
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

  const handleUpdateReceiver = async () => {
    try {

      const response = await API_UPDATE_RECEIVER({
        deliveryId: delivery.id,
        payload: {
          receiverName: formControll.fullName,
          receiverTaxIdentifier: formControll.document
        },
        token: token
      })

      trativeResponseUtils({
        response,
        callBackSuccess: () => {handleNext()},
        callBackError: (message) => console.error(message)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleCrateAttachment = async () => {
    try {
      const base64Image = photos[0].image; // "data:image/jpeg;base64,...."
      const nomeArquivo = "receiver_delivery.jpg";

      const blob = await fetch(base64Image).then(res => res.blob());

      const formData = new FormData();
      formData.append("image", blob, nomeArquivo);
      formData.append("name", "receiver_delivery"); // identificador vai no FormData

      await API_CREATE_ATTACHMENTS({
        formData,
        token,
        deliveryId: delivery.id
      });

      console.log({ photos });
    } catch (error) {
      console.error(error);
    }
  };




  const canProceed = photos.length >= 1;

  return (
    <div className="container-fluid p-3">

      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-start gap-3">
            <DeliverySvgComponent className="w-25" />
            <div className="w-100">
              <h3 className="m-0 mt-2">Recebedor</h3>
              <span className="text-muted mb-0">
                Informações do recebedor
              </span>
            </div>
          </div>
        </div>
      </div>


      <div>

        <Form.Group className="mb-3">
          <Form.Label>Nome completo <span className="mandatory" /></Form.Label>
          <Form.Control required value={formControll.fullName} onChange={(e) => updateFormCOntroll(e.currentTarget.value, 'fullName')} />
        </Form.Group>

        <Form.Group>
          <Form.Label>CPF <span className="mandatory" /></Form.Label>
          <Form.Control required maxLength={14} value={formControll.document} onChange={(e) => updateFormCOntroll(inputCpfMaskUtils(e.currentTarget.value), 'document')} />
        </Form.Group>

      </div>


      {/* Grade de fotos */}
      <Carousel
        variant="dark"
        interval={null}
        indicators={true}
        nextLabel=""
        prevLabel=""
        style={{ maxWidth: "400px", margin: "0 auto" }}
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
              <p>{photo.description}</p>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePhoto(photo.id);
                }}
              >
                Remover
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Botão adicionar foto */}

      <div className="text-center mt-3">
        <CustomButton
          disable={formControll?.document?.length < 14 || formControll?.fullName?.length < 6}
          className="py-4"
          icon={<i className="bi bi-image"></i>}
          theme="secundary"
          label="Adicionar Foto"
          handleClick={() => setShowCamera(true)}
        />
      </div>

      {/* Botões de ação */}
      <div className="flex justify-between mt-4">
        <CustomButton
          className="py-4"
          handleClick={handleProccess}
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
              <option value="receiver_delivery">Foto do recebedor</option>
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

export default ReceiverStep;
