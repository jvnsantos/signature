import React, { useRef, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";

type FotoInfo = {
  id: number;
  url: string;
  descricao: string;
  observacao: string;
};

const tiposFoto = [
  "Fachada de estabelecimento",
  "Fotografia do recebedor (solicitante)",
  "Fotografia da carga",
  "Fotografia recebedor (Não solicitante)",
  "Outros motivos",
];

type Props = {
  handleNext: () => void
}
const ColetaFotos = ({ }: Props) => {
  const [fotos, setFotos] = useState<FotoInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [observacao, setObservacao] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  const abrirModal = () => {
    setTipoSelecionado("");
    setObservacao("");
    setShowModal(true);
  };

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraAtiva(true);
      }
    } catch (err) {
      alert("Erro ao acessar a câmera: " + err);
    }
  };

  const capturarFoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const url = canvasRef.current.toDataURL("image/jpeg");

    const novaFoto: FotoInfo = {
      id: Date.now(),
      url,
      descricao: tipoSelecionado,
      observacao,
    };
    setFotos((prev) => [...prev, novaFoto]);

    pararCamera();
    setShowModal(false);
  };

  const pararCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraAtiva(false);
  };

  const removerFoto = (id: number) => {
    setFotos((prev) => prev.filter((foto) => foto.id !== id));
  };

  const podeAvancar = fotos.length >= 2;

  return (
    <div className="p-3">
      <h5>TESTE DE CAMERA</h5>

      <Row>
        {fotos.map((foto) => (
          <Col xs={6} key={foto.id} className="mb-3 position-relative">
            <Card>
              <Card.Img variant="top" src={foto.url} />
              <Button
                variant="danger"
                size="sm"
                style={{ position: "absolute", top: "5px", right: "5px", borderRadius: "50%" }}
                onClick={() => removerFoto(foto.id)}
              >
                X
              </Button>
              <Card.Body>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                  {foto.descricao} - {foto.observacao}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {fotos.length < 6 && (
        <Button variant="primary" onClick={abrirModal}>
          Adicionar Foto
        </Button>
      )}

      <div className="mt-3">
        <Button variant="success" disabled={!podeAvancar} onClick={() => alert("Enviar fotos")}>
          Prosseguir
        </Button>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          pararCamera();
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Foto</Form.Label>
            <Form.Select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              <option value="">Selecione...</option>
              {tiposFoto.map((tipo, idx) => (
                <option key={idx} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Observação</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </Form.Group>

          {!cameraAtiva && (
            <Button variant="secondary" onClick={iniciarCamera}>
              Abrir Câmera
            </Button>
          )}

          {cameraAtiva && (
            <div>
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
              <Button className="mt-2" variant="primary" onClick={capturarFoto}>
                Capturar Foto
              </Button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ColetaFotos