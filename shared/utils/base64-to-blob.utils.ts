export default function base64ToBlob(
  base64: string,
  contentType = "image/jpeg"
): Blob {
  // Remove espaços ou quebras de linha
  const cleanedBase64 = base64.replace(/\s/g, "");

  // Remove prefixo "data:image/...;base64," se existir
  const base64Data = cleanedBase64.includes(",")
    ? cleanedBase64.split(",")[1]
    : cleanedBase64;

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Cria o Blob direto
  return new Blob([byteNumbers.buffer], { type: contentType });
}
