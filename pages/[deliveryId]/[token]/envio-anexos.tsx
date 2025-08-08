import CustomButton from '@/shared/components/custom-button';
import { Camera, X } from 'lucide-react';
import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Select from "react-select";

type Photo = {
  id: number;
  image: string;
  description: string;
  type: string;
  observations: string;
};

type Props = {
  handleNext: () => void;
};

const PhotoCollector = ({ handleNext }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState('');
  const [observations, setObservations] = useState('');
  const [error, setError] = useState('');

  const photoTypes = [
    { value: "Fachada de estabelecimento", label: "Fachada de estabelecimento" },
    { value: "Fotografia do recebedor (solicitante)", label: "Fotografia do recebedor (solicitante)" },
    { value: "Fotografia recebedor (Não solicitante)", label: "Fotografia recebedor (Não solicitante)" },
    { value: "Fotografia da carga", label: "Fotografia da carga" },
    { value: "Outros motivos", label: "Outros motivos" },
  ];

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setCurrentPhoto(event.target.result as string);
          setShowModal(true);
        }
      };
      reader.readAsDataURL(file);
    }
    // Limpa o input para permitir selecionar a mesma foto novamente se necessário
    e.target.value = '';
  };

  const handleSavePhoto = () => {
    if (!photoType) {
      setError('Por favor, selecione o tipo da foto');
      return;
    }

    if (!currentPhoto) {
      setError('Erro ao processar a foto');
      return;
    }

    const description = photoType + (observations ? ` - ${observations}` : '');

    const newPhoto: Photo = {
      id: Date.now(),
      image: currentPhoto,
      description: description,
      type: photoType,
      observations: observations
    };

    setPhotos([...photos, newPhoto]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPhoto(null);
    setPhotoType('');
    setObservations('');
    setError('');
  };

  const handleRemovePhoto = (photoId: number) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  const canAddPhoto = photos.length < 6;
  const hasMinimumPhotos = photos.length >= 2;

  const handleContinue = () => {
    if (hasMinimumPhotos) {
      handleNext();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold text-center mb-4">Captura de Fotos</h2>

        {!hasMinimumPhotos && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-4 text-sm">
            ⚠️ Mínimo de 2 fotos obrigatórias com descrição
          </div>
        )}

        {/* Grid de Fotos */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={photo.image}
                  alt="Foto capturada"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  type="button"
                  aria-label="Remover foto"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-600 leading-tight">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}

          {/* Botão para adicionar nova foto */}
          {canAddPhoto && (
            <div className="relative">
              <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <Camera size={32} className="text-gray-400 mb-2" />
                <span className="text-xs text-gray-500 text-center px-2">Adicionar Foto</span>
              </div>
              <input
                type="file"
                accept="image/*"
                capture={true}
                onChange={handleCameraCapture}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Capturar foto"
              />
            </div>
          )}
        </div>

        {/* Contador de fotos */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">
            {photos.length} de 6 fotos • {hasMinimumPhotos ? '✅ Mínimo atingido' : 'Mín. 2 fotos'}
          </span>
        </div>
      </div>


      {/* Modal para configurar a foto */}
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body className='p-3'>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-sm w-full overflow-y-auto">
              <div className="">
                {currentPhoto && (
                  <div className="mb-4">
                    <img
                      src={currentPhoto}
                      alt="Preview da foto"
                      className="w-100 h-48 object-contain rounded-lg"
                    />
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                    {error}
                  </div>
                )}


                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Tipo da Foto <span className='mandatory' /></Form.Label>

                  <Select
                    options={photoTypes}
                    placeholder={'Selecione um tipo'}
                    classNamePrefix="custom-select"
                    onChange={(e: any) => { console.log(e.value); setPhotoType(e.value as string) }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Por favor, forneça o valor da cobrança.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Adicione observações sobre a foto (opcional)"
                  />

                  <Form.Control.Feedback type="invalid">
                    Por favor, forneça o valor da cobrança.
                  </Form.Control.Feedback>
                </Form.Group>


                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Adicione observações sobre a foto (opcional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div> */}

                {photoType && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      <strong>Descrição final:</strong>
                    </div>
                    <div className="text-sm text-gray-800 mt-1">
                      {photoType}{observations ? ` - ${observations}` : ''}
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center gap-5 w-100">
                <CustomButton
                  size='l'
                  theme='secundary'
                  handleClick={handleCloseModal}
                  label={'Cancelar'}
                  title='Cancelar'
                />
                <CustomButton
                  size='l'
                  handleClick={handleSavePhoto}
                  label={'Salvar foto'}
                  title='Salvar foto'
                />

              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Botão customizado para continuar */}
      <div className="mt-4">
        <CustomButton
          title="Próximo"
          label="próximo"
          handleClick={handleContinue}
          disable={!hasMinimumPhotos}
        />
      </div>
    </div>
  );
};

export default PhotoCollector;