import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ToolTiping = (text: string) => (
  <OverlayTrigger
    placement="right"
    overlay={<Tooltip className="tooltip-light right">{text}</Tooltip>}
  >
    <i className="bi bi-info-circle ms-2" />
  </OverlayTrigger>
);

export const ProtestTranscript = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <>
          <strong className="text-success">Pago</strong>
          {ToolTiping(
            "Título pago no cartório. Conforme o tipo de fatura informado na remessa, o sistema gerará um arquivo no formato CNAB 150, 240 ou 400."
          )}
        </>
      );
    case "PROTESTED":
      return (
        <>
          <strong className="text-danger">Protestado</strong>
          {ToolTiping(
            "O devedor não pagou o título dentro do prazo e terá seu nome publicado nos serviços de proteção ao crédito."
          )}
        </>
      );
    case "WITHDRAWN":
      return (
        <>
          <strong className="text-warning">Retirado</strong>
          {ToolTiping(
            "O devedor pagou as custas ou o apresentante desistiu dentro do prazo. Verificar também a tag: custas_cartorio."
          )}
        </>
      );
    case "SUSPENDED":
      return (
        <>
          <strong className="text-secondary">Sustado</strong>
          {ToolTiping(
            "O devedor ajuizou ação judicial por não concordar com a dívida. Informar o departamento jurídico."
          )}
        </>
      );
    case "IRREGULAR":
      return (
        <>
          <strong className="text-danger">Irregular</strong>
          {ToolTiping(
            "O cartório identificou irregularidade. Verifique a tag: codigo_irregular."
          )}
        </>
      );
    case "IRREGULAR_WITH_COSTS":
      return (
        <>
          <strong className="text-danger">Irregular com Custas</strong>
          {ToolTiping("No estado de São Paulo esta ocorrência não é utilizada.")}
        </>
      );
    case "CONDITIONAL_SETTLEMENT":
      return (
        <>
          <strong className="text-info">Liquidação em Condicional</strong>
          {ToolTiping("No estado de São Paulo esta ocorrência não é utilizada.")}
        </>
      );
    case "TITLE_ACCEPTED":
      return (
        <>
          <strong className="text-primary">Título Aceito</strong>
          {ToolTiping("Esta ocorrência não é utilizada.")}
        </>
      );
    case "NOTICE":
      return (
        <>
          <strong className="text-info">Edital</strong>
          {ToolTiping("Esta ocorrência não é utilizada.")}
        </>
      );
    case "CANCELLED":
      return (
        <>
          <strong className="text-muted">Protestado Cancelado</strong>
          {ToolTiping(
            "Anuência eletrônica confirmada ou cancelamento pelo apresentante com pagamento das custas. Verifique a tag: custas_cartorio."
          )}
        </>
      );
    case "PROTESTED_ALREADY_DONE":
      return (
        <>
          <strong className="text-danger">Protestado Já Efetuado</strong>
          {ToolTiping("Mesmo tratamento da ocorrência 2 (Protestado).")}
        </>
      );
    case "PROTESTED_BY_NOTICE":
      return (
        <>
          <strong className="text-danger">Protestado por Edital</strong>
          {ToolTiping(
            "O cartório não conseguiu intimar o devedor ou este recusou o recebimento."
          )}
        </>
      );
    case "WITHDRAWN_BY_NOTICE":
      return (
        <>
          <strong className="text-warning">Retirada por Edital</strong>
          {ToolTiping("Pedido de desistência com título em edital.")}
        </>
      );
    case "THIRD_PARTY_PROTEST_CANCELLED":
      return (
        <>
          <strong className="text-muted">Protesto de Terceiro Cancelado</strong>
          {ToolTiping("Esta ocorrência não é utilizada.")}
        </>
      );
    case "FINAL_SUSPENSION":
      return (
        <>
          <strong className="text-secondary">Sustado Definitivo</strong>
          {ToolTiping(
            "Título sustado liminarmente com definição de sucumbência. Verifique tag: custas_cartorio."
          )}
        </>
      );
    case "SECOND_COPY_OF_PROTEST_INSTRUMENT":
      return (
        <>
          <strong className="text-info">2ª Via do Instrumento</strong>
          {ToolTiping("Esta ocorrência não é utilizada.")}
        </>
      );
    case "CANCELLATION_ALREADY_DONE":
      return (
        <>
          <strong className="text-muted">Cancelamento Já Efetuado</strong>
          {ToolTiping(
            "Cancelamento duplicado, já havia sido realizado anteriormente."
          )}
        </>
      );
    case "CONSENT_CONFIRMED":
      return (
        <>
          <strong className="text-info">Anuência Confirmada</strong>
          {ToolTiping(
            "Confirmação de recebimento do arquivo de anuência. Aguardando comparecimento do devedor."
          )}
        </>
      );
    case "TO_PROTEST_CRITICIZED_OPEN":
      return (
        <>
          <strong className="text-dark">A Protestar / Criticado / Em Aberto</strong>
          {ToolTiping(
            "Título importado e aguardando envio ao cartório. Status provisório até a comunicação com a CRA."
          )}
        </>
      );
    default:
      return (
        <>
          <strong className="text-muted">Não disponível</strong>
          {ToolTiping("Status não reconhecido.")}
        </>
      );
  }
};
