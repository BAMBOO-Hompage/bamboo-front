import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../App.css";

// external CDN에서 호출
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;

const PDFPreviewComponent = ({ pdfUrl, width }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      <div className="relative border border-gray-300 bg-white overflow-hidden">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} style={{ marginBottom: "16px" }}>
                <Page pageNumber={index + 1} width={width} />
              </div>
            ))}
        </Document>
      </div>
    </div>
  );
};

// const PDFPreviewComponent = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < numPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="p-4">
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         <div className="my-4">
//           <Page pageNumber={currentPage} />
//         </div>
//       </Document>

//       <div className="flex items-center justify-between mt-4">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className="bg-gray-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
//         >
//           Previous
//         </button>

//         <span>
//           Page {currentPage} of {numPages}
//         </span>

//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === numPages}
//           className="bg-gray-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

export default PDFPreviewComponent;
