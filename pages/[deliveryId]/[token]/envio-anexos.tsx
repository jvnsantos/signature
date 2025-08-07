import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import CustomButton from '@/shared/components/custom-button';

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
    "Fachada de estabelecimento",
    "Fotografia do recebedor (solicitante)",
    "Fotografia da carga",
    "Fotografia recebedor (Não solicitante)",
    "Outros motivos"
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Configurar Foto</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
                type="button"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              {currentPhoto && (
                <div className="mb-4">
                  <img
                    src={currentPhoto}
                    alt="Preview da foto"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo da Foto *
                </label>
                <select
                  value={photoType}
                  onChange={(e) => setPhotoType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione o tipo da foto</option>
                  {photoTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
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
              </div>

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

            <div className="flex gap-2 p-4 border-t">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePhoto}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                type="button"
              >
                Salvar Foto
              </button>
            </div>
          </div>
        </div>
      )}

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