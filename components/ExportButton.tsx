import React, { useState } from 'react';
import html2canvasLib from 'html2canvas';
import { Download, Loader2 } from 'lucide-react';

// Safely handle ESM default export vs CommonJS export
const getHtml2Canvas = () => {
  if (!html2canvasLib) return null;
  // If default exists, use it, otherwise use the library itself
  return (html2canvasLib as any).default || html2canvasLib;
};

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  sport: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetRef, sport }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current) return;
    setIsExporting(true);

    try {
      // Small delay to ensure any UI updates have processed
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvasFn = getHtml2Canvas();
      
      if (typeof canvasFn !== 'function') {
        throw new Error('html2canvas library not loaded correctly');
      }

      const canvas = await canvasFn(targetRef.current, {
        useCORS: true,
        scale: 2, // Retinas/High res
        backgroundColor: null, 
        logging: false
      });

      const link = document.createElement('a');
      link.download = `quickmatch-${sport}-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export image.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="w-full md:w-auto bg-lime-400 hover:bg-lime-500 disabled:bg-lime-200 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Processing...
        </>
      ) : (
        <>
          <Download size={20} />
          Export Lineup PNG
        </>
      )}
    </button>
  );
};

export default ExportButton;