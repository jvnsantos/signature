

type props = {
  dataObject: any
  downloadName: string
  message: string
  className?: string
}

const messageDownloadUtils = ({ className, dataObject, downloadName, message }: props) => {
  return <strong className={`text-dark pointer ${className}`} onClick={() => {
    const blob = new Blob([typeof dataObject === 'string' ? dataObject : JSON.stringify(dataObject)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }}> {message}</strong>
}

export default messageDownloadUtils