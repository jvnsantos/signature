"use client";
import { API_CREATE_ATTACHMENTS } from "@/pages/api/attachments/create-attachment.api";
import { API_DELETE_ATTACHMENTS } from "@/pages/api/attachments/delete-attachments.api";
import { API_GET_ATTACHMENTS } from "@/pages/api/attachments/get-attachments.api";
import { API_CANCEL_DELIVERY } from "@/pages/api/delivery/cancel-delivary.api";
import CustomButton from "@/shared/components/custom-button";
import StepsIndicator from "@/shared/components/step-marker";
import { useGlobalContext } from "@/shared/context/global-context";
import { PicSvgElement } from "@/shared/svg-component";
import trativeResponseUtils from "@/shared/utils/trative-response.utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import CameraModal from "./camera-moda";

// Tipos
type Photo = {
  id: string;
  image: string;
  description: string;
  type: string;
  observations?: string;
};

type Props = {
  steps: string[];
  currentStep: number;
  handleNext: () => void;
  deliveryId: string; // usado para buscar anexos
};

const PhotoCollector = ({ handleNext, deliveryId, currentStep, steps }: Props) => {
  const { token, delivery, reasonToCancel } = useGlobalContext()
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const [load, setLoad] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState("");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  // Função para traduzir os tipos de foto
  const getPhotoTypeLabel = (type: string) => {
    switch (type) {
      case "ITEMS_DAMAGED_DELIVERY":
        return "Produto avariado";
      case "STORE_DELIVERY":
        return "Estabelecimento";
      case "OTHERS_DELIVERY":
        return "Outros";
      default:
        return type;
    }
  };

  async function loadAttachments() {
    try {
      const response = await API_GET_ATTACHMENTS({ deliveryId, token });
      const mappedPhotos: Photo[] = response.filter(e => e.name !== 'RECEIVER_DELIVERY').map((att: any) => {
        return ({
          id: att.deliveryAttachmentId,
          image: att.urlAttachment,
          description: att.description || "",
          type: att.name || "",
        })
      }
      );
      setPhotos(mappedPhotos);
    } catch (error) {
      console.error("Erro ao carregar anexos:", error);
    }
  }

  const _handleNext = async () => {
    if (reasonToCancel.reasonNotDelivery) {
      const response = await API_CANCEL_DELIVERY({ deliveryId: delivery.id, token, payload: { reasonNotDelivery: reasonToCancel.reasonNotDelivery, observation: reasonToCancel.observation } })

      trativeResponseUtils({
        response,
        callBackError: (msg) => { setError(msg) },
        callBackSuccess: () => {
          router.replace("/cancelada");
        }
      })
    } else {
      handleNext()
    }
  }

  useEffect(() => {
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
      const base64Image = currentPhoto;
      const file_name = `${photoType}.jpg`;

      const blob = await fetch(base64Image).then(res => res.blob());

      const formData = new FormData();
      formData.append("image", blob, file_name);
      formData.append("name", photoType);

      if (observations) {
        formData.append("description", observations);
      }


      const response = await API_CREATE_ATTACHMENTS({
        formData,
        token,
        deliveryId: delivery.id
      });

      trativeResponseUtils({
        response,
        callBackError: (message) => { setError(message) },
        callBackSuccess: (response) => {
          const data = response.data
          console.log('DATAAA', data)
          setPhotos((prev) => [
            ...prev,
            {
              id: data?.deliveryAttachmentId || data?.id,
              image: currentPhoto,
              description: observations,
              type: photoType,
            },
          ]);
        }
      })

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
    setObservations(photo.description || "");
    setShowModal(true);
  };

  // Abrir modal de confirmação de exclusão
  const handleOpenDeleteModal = (photo: Photo) => {
    setPhotoToDelete(photo);
    setShowDeleteModal(true);
  };

  // Confirmar remoção de foto
  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;

    try {
      setLoad(true);
      await API_DELETE_ATTACHMENTS({ token, deliveryAttachmentId: photoToDelete.id });
      await loadAttachments();
      setShowDeleteModal(false);
      setPhotoToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPhoto(null);
    setPhotoType("");
    setObservations("");
    setError(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPhotoToDelete(null);
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
                {photos.length - 1}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de fotos */}
      <div className="mb-4">
        {photos.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-image fs-1"></i>
            <p className="mt-2">Nenhuma foto adicionada ainda</p>
          </div>
        ) : (
          <div className="list-group">
            {photos.map((photo) => (
              <div key={photo.id} className="list-group-item d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  {/* Miniatura */}
                  <img
                    src={photo.image}
                    alt={photo.description || "Foto"}
                    className="rounded"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "1px solid #dee2e6"
                    }}
                    onClick={() => handleOpenEdit(photo)}
                  />

                  {/* Informações da foto */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">{getPhotoTypeLabel(photo.type)}</h6>
                    {photo.description && (
                      <p className="mb-0 text-muted small">{photo.description}</p>
                    )}
                  </div>
                </div>

                {/* Botão deletar */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleOpenDeleteModal(photo)}
                  className="ms-2"
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botão adicionar foto */}
      {photos.length < 6 && (
        <div className="text-center mt-3 mb-5">
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

      <StepsIndicator steps={steps} currentStep={currentStep} />
      {/* Botões de ação */}
      <div className="flex justify-between mt-5">
        <CustomButton
          loading={load}
          className="py-4"
          handleClick={_handleNext}
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
              <option value="ITEMS_DAMAGED_DELIVERY">Imagem de produto avariado</option>
              <option value="STORE_DELIVERY">Imagem do estabelecimento</option>
              <option value="OTHERS_DELIVERY">Outros</option>
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

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photoToDelete && (
            <div>
              <p>Tem certeza que deseja excluir esta foto?</p>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                <img
                  src={photoToDelete.image}
                  alt="Foto a ser excluída"
                  className="rounded"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover"
                  }}
                />
                <div>
                  <h6 className="mb-1">{getPhotoTypeLabel(photoToDelete.type)}</h6>
                  {photoToDelete.description && (
                    <p className="mb-0 text-muted small">{photoToDelete.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            theme="tertiary"
            label='Cancelar'
            handleClick={handleCloseDeleteModal}
            disable={load}
          />
          <CustomButton
            theme="red"
            variant="soft"
            label='Excluir'
            handleClick={handleConfirmDelete}
            loading={load}
          />
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default PhotoCollector;