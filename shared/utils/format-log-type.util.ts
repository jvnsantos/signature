const formatLogTypeUtils = (logtype: string) => {
  switch (logtype) {
    case "PROCESS-APPLY-INTEGRATION":
      return "Integração de baixa";
    default:
      return "N/A";
  }
};

export default formatLogTypeUtils;
