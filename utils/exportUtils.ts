import html2canvasLib from 'html2canvas';

// Safely handle ESM default export vs CommonJS export
const getHtml2Canvas = () => {
  if (!html2canvasLib) return null;
  // If default exists, use it, otherwise use the library itself
  return (html2canvasLib as any).default || html2canvasLib;
};

export const exportToPNG = async (
  element: HTMLElement | null,
  fileName: string,
  transparent: boolean = false
) => {
  if (!element) return;

  try {
    const canvasFn = getHtml2Canvas();
    
    if (typeof canvasFn !== 'function') {
      console.error('html2canvas library not loaded correctly', html2canvasLib);
      return false;
    }

    const canvas = await canvasFn(element, {
      useCORS: true,
      scale: 3, // High resolution
      backgroundColor: transparent ? null : undefined,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return true;
  } catch (err) {
    console.error("Export failed", err);
    return false;
  }
};