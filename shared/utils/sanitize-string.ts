const sanitizeString = (
  s: string
) => {
  try {
    return s.replace(
      /\D/g,
      ''
    );
  } catch (error) {
    console.error({
      message: `Não foi possivel sanitizar a string ${s}`,
      error,
    });
  }
};

export default sanitizeString;
