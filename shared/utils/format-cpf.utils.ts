function formatCPF(
  cpf: string
) {
  const cleanCPF =
    cpf.replace(/\D/g, '');

  return cleanCPF.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );
}

export default formatCPF