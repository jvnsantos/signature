const validateDocumentUtils = (document: string): boolean => {
  const raw = document.replace(/\D/g, "");

  if (raw.length === 11) return isValidCPF(raw);
  if (raw.length === 14) return isValidCNPJ(raw);

  return false;
};

const isValidCPF = (cpf: string): boolean => {
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;

  // Primeiro dígito verificador
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let digit1 = (sum * 10) % 11;
  if (digit1 === 10 || digit1 === 11) digit1 = 0;
  if (digit1 !== parseInt(cpf[9])) return false;

  // Segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  let digit2 = (sum * 10) % 11;
  if (digit2 === 10 || digit2 === 11) digit2 = 0;

  return digit2 === parseInt(cpf[10]);
};

const isValidCNPJ = (cnpj: string): boolean => {
  if (/^(\d)\1+$/.test(cnpj)) return false; // todos os dígitos iguais

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calculateCheckDigit = (cnpjPart: string, weights: number[]): number => {
    const sum = cnpjPart
      .split("")
      .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cnpj.slice(0, 12);
  const digit1 = calculateCheckDigit(base, weights1);
  const digit2 = calculateCheckDigit(base + digit1, weights2);

  return cnpj === base + digit1.toString() + digit2.toString();
};

export default validateDocumentUtils;
