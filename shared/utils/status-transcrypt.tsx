import { useI18n } from "../i18n";

export const StatusTranscript = (
  status: "PAID" | "PENDING" | "CANCELED" | string,
  isSchedule?: boolean
) => {
  const { t } = useI18n();

  switch (status) {
    case "PAID":
      return <strong className="text-success ">{t("STATUS.SINGULAR.PAID")}</strong>;
    case "PENDING":
      return <strong className="text-warning">{t("STATUS.SINGULAR.PENDING")}</strong>;
    case "CANCELED":
      return <strong className="text-danger">{t("STATUS.SINGULAR.CANCELED")}</strong>;
    case "BLOCK":
      return <strong className="text-danger">{t("STATUS.SINGULAR.BLOCK")}</strong>;
    case "EXPIRED":
      return <strong className="text-danger">{t("STATUS.SINGULAR.EXPIRED")}</strong>;
    case "STOPED":
      return <strong className="text-warning">{t("STATUS.SINGULAR.STOP")}</strong>;
    case "GROUPED":
      return <strong style={{ color: "#FF7514" }}>{t("STATUS.SINGULAR.GROUPED")}</strong>;
    case "RETURNED":
      return <strong style={{ color: "#FF7514" }}>{t("STATUS.SINGULAR.RETURNED")}</strong>;
    case "ACTIVE":
      return <strong className="text-success">{t("STATUS.SINGULAR.ACTIVE")}</strong>;
    case "INACTIVE":
      return <strong className="text-success">{t("STATUS.SINGULAR.INACTIVE")}</strong>;
    case "FINISHED":
      return <strong style={{ color: "#008000" }}>{t("STATUS.SINGULAR.FINISHED")}</strong>;
    case "SUCCESS":
      return <strong style={{ color: "#008000" }}>{t("STATUS.SINGULAR.FINISHED")}</strong>;
    case "PROTESTED":
      return <strong style={{ color: "#FF7514" }}>{t("STATUS.SINGULAR.PROTESTED")}</strong>;
    case "SEND_TO_PROTEST":
      return <strong style={{ color: "#FF7514" }}>{t("STATUS.SINGULAR.SENT_TO_PROTEST")}</strong>;
    default:
      return isSchedule ? "Não disponivel" : "Não disponivel";
  }
};
