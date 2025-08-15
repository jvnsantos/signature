"use client";

import CustomButton from "@/shared/components/custom-button";
import { useGlobalContext } from "@/shared/context/global-context";
import { useState } from "react";
import { Form, Container } from "react-bootstrap";


type JustificativaCancelamentoProps = {
  handleBack: () => void
}

const JustificativaCancelamento = ({ handleBack }: JustificativaCancelamentoProps) => {
  const { setReasonToCancel, setCurrentStep } = useGlobalContext()
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const motivos = [
    { value: "", label: "Selecione" },
    { value: "MOTIVO_1", label: "Motivo 1" },
    { value: "MOTIVO_2", label: "Motivo 2" },
    { value: "MOTIVO_3", label: "Motivo 3" },
  ];

  const _handleNext = () => {
    setReasonToCancel({ reasonNotDelivery: motivo, observation: observacoes })
    setCurrentStep(5)
  }


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
        >
          {motivos.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Form.Control>
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
          label='Voltar'
          handleClick={handleBack}
        />
        <CustomButton
          className="mt-4"
          label='Avançar'
          handleClick={_handleNext}
        />

      </div>

    </Container>
  );
};

export default JustificativaCancelamento;
