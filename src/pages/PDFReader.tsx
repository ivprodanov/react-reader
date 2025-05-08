import React, { useCallback, useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

type PDFReaderProps = {
  speed: number; // in ms per word
};

export const PDFReader: React.FC<PDFReaderProps> = ({ speed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [sentenceDuration, setSentenceDuration] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const getTextFromPdf = async (pdf: PDFDocumentProxy) => {
    const textByPage: string[][] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const textItems = content.items.map((item: any) => item.str);
      const fullText = textItems.join(" ");
      const sentences = fullText.match(/[^\.!\?]+[\.!\?]+/g) || [fullText];
      textByPage.push(sentences);
    }

    return textByPage; // string[][] -> sentences per page
  };

  useEffect(() => {
    if (!sentences.length || currentSentenceIndex >= sentences.length || !speed) return;
  
    const currentSentence = sentences[currentSentenceIndex];
    if (!currentSentence) return;
  
    const wordCount = currentSentence.trim().split(/\s+/).length;
    const duration = wordCount * speed;
  
    const timeout = setTimeout(() => {
      setCurrentSentenceIndex((prev) => {
        const next = prev + 1;
        const el = document.getElementById(`sentence-${next}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        if (next >= sentences.length) {
          clearTimeout(timeout);
          return prev;
        }
        return next;
        
      });
    }, duration);
  
    return () => clearTimeout(timeout);
  }, [currentSentenceIndex, speed, sentences]);
  
  
  
  

  async function onDocumentLoadSuccess(pdf: PDFDocumentProxy): Promise<void> {
    setNumPages(pdf.numPages);
    const textByPage = await getTextFromPdf(pdf);
    const allSentences = textByPage.flat(); // Flatten into one long array
    setSentences(allSentences);
    setCurrentSentenceIndex(0); // reset on new file
  }

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} />

      <div className="sentence-container">
        {sentences.map((sentence, index) => (
          <p
            key={index}
            id={`sentence-${index}`}
            className={index === currentSentenceIndex ? "highlight" : ""}
          >
            {sentence}
          </p>
        ))}
      </div>
      <label htmlFor="file">Please upload your PDF File here</label>
      <input
        name="file"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="custom-file-input"
      />
      <DropdownComponent setFile={setFile} />
    </div>
  );
};

type DropdownComponentProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function DropdownComponent({ setFile }: DropdownComponentProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="drag-and-drop-text">Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
