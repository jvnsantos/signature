const copyClipBoardUtil = (
  text: string,
  onSuccess?: () => void
) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (onSuccess) {
        onSuccess(); 
      }
    })
    .catch(error => {
      console.error(
        'Erro ao copiar o texto: ',
        error
      );
    });
};

export default copyClipBoardUtil;
