const GetFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export default GetFileExtension;
