declare module 'react-pdf' {
  export interface PDFDocumentProxy {
    numPages: number;
  }
  
  export interface DocumentProps {
    file: string | File | Blob;
    onLoadSuccess?: (pdf: PDFDocumentProxy) => void;
    onLoadError?: (error: Error) => void;
    loading?: React.ReactNode;
    children?: React.ReactNode;
  }

  export interface PageProps {
    pageNumber: number;
    scale?: number;
    renderAnnotationLayer?: boolean;
    renderTextLayer?: boolean;
  }

  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;
  
  export const pdfjs: {
    version: string;
    GlobalWorkerOptions: {
      workerSrc: string;
    };
  };
}