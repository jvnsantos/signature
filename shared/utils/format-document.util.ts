import formatCNPJ from "./format-cnpj.utls";
import formatCPF from "./format-cpf.utils";

const formatDocumentUtil = (document: string) => {
  try {
    const cleanDocument = document.replace(/\D/g, "");

    if (cleanDocument.length === 11) {
      return formatCPF(cleanDocument);
    }

    if (cleanDocument.length === 14) {
      return formatCNPJ(cleanDocument);
    }

    return document;
  } catch {
    return document;
  }
};

export default formatDocumentUtil;
