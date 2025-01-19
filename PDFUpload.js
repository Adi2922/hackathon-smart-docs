





  




// PDFUpload.js
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import Chat from './Chat';
import QADoc from './QADoc';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

const PDFUpload = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const extractText = async () => {
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let extractedText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(' ');
          extractedText += `Page ${i}: ${pageText}\n\n`;
        }

        setPdfText(extractedText);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Failed to extract text from the PDF.');
    }
  };

  return (
    <div>
      <h3>Upload and Extract Text from PDF</h3>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={extractText}>Extract Text</button>

      {/* Only render Chat and QADoc if we have pdfText */}
      {pdfText && (
        <>
          <Chat pdfText={pdfText} />
          <QADoc pdfText={pdfText} />
        </>
      )}
    </div>
  );
};

export default PDFUpload;
