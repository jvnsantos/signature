"use client";

import CustomButton from "@/shared/components/custom-button";
import { useGlobalContext } from "@/shared/context/global-context";
import { useState } from "react";
import { Form, Container } from "react-bootstrap";

type JustificativaCancelamentoProps = {
  handleBack: () => void;
};

const JustificativaCancelamento = ({ handleBack }: JustificativaCancelamentoProps) => {
  const { setReasonToCancel, setCurrentStep } = useGlobalContext();
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState("");

  const motivos = [
    { value: "", label: "Selecione" },
    { value: "ADDRESS_INCORRECT", label: "Endereço incorreto ou incompleto" },
    { value: "RECEIVER_ABSENT", label: "Destinatário ausente no momento da entrega" },
    { value: "CUSTOMER_NOT_ANSWERED", label: "Cliente não atendeu à chamada de aviso" },
    { value: "LOGISTICS_FAILURE", label: "Falha na prestação do serviço de logística" },
    { value: "WEATHER_ISSUE", label: "Problemas climáticos ou condições adversas" },
    { value: "PAYMENT_CONFIRMATION_FAILED", label: "Problemas na confirmação de pagamento" },
    { value: "DOCUMENTATION_MISSING", label: "Documentação necessária não disponível" },
    { value: "ACCESS_RESTRICTION", label: "Restrição de acesso ao local de entrega" },
    { value: "DAMAGED_OR_UNAVAILABLE_PRODUCT", label: "Produto danificado ou indisponível" },
    { value: "ROUTE_ERROR", label: "Erro na programação ou na rota de entrega" },
    { value: "UNAUTHORIZED_RECEIVER", label: "Ausência de pessoa autorizada na entrega" },
    { value: "TECHNICAL_ISSUE", label: "Problemas técnicos no sistema de rastreamento" },
    { value: "ORDER_CANCELED", label: "Pedido cancelado pelo cliente" },
    { value: "DELIVERY_TIME_OUTSIDE", label: "Horário de entrega fora do previsto" },
    { value: "STOCK_ISSUE", label: "Problemas de estoque ou disponibilidade" },
  ];

  const _handleNext = () => {
    if (!motivo) {
      setErro("Selecione um motivo para prosseguir.");
      return;
    }
    setErro("");
    setReasonToCancel({ reasonNotDelivery: motivo, observation: observacoes });
    setCurrentStep(5);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Justificativa de Cancelamento</h3>

      <Form.Group className="mb-3">
        <Form.Label>Motivo <span className="mandatory" /></Form.Label>
        <Form.Control
          as="select"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
          isInvalid={!!erro}
        >
          {motivos.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Form.Control>
        {erro && <Form.Control.Feedback type="invalid">{erro}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Observações</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Digite observações (opcional)"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={3}
        />
      </Form.Group>

      <div className="d-flex w-100 justify-content-center gap-3">
        <CustomButton
          theme="tertiary"
          className="mt-4"
          label="Voltar"
          handleClick={handleBack}
        />
        <CustomButton
          className="mt-4"
          label="Avançar"
          handleClick={_handleNext}
        />
      </div>
    </Container>
  );
};

export default JustificativaCancelamento;
