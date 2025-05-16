"use client";

interface PdfRendererProps {
  url: string;
}

const PdfViewerRenderer = () => {
  return (
    <div
      style={{
        margin: 0,
      }}>
      <iframe src="/monsfinance-deck.pdf" title="PDF Viewer"></iframe>
    </div>
  );
};

export default PdfViewerRenderer;
