import { SavedFrame } from '@/lib/frameStorage';

interface DownloadFrameImageOptions {
  frame: SavedFrame;
  userImage: string;
  userImgPos: { x: number; y: number };
  userScale: number;
  userRotate: number;
  frameId: string;
  onStart?: () => void;
  onFinish?: () => void;
}

export async function downloadFrameImage({
  frame,
  userImage,
  userImgPos,
  userScale,
  userRotate,
  frameId,
  onStart,
  onFinish,
}: DownloadFrameImageOptions) {
  if (!frame) return;
  onStart?.();
  try {
    const previewElement = document.getElementById('frame-preview');
    const previewSize = previewElement?.clientWidth || 620;
    
    // Find the wrapper div that contains the user image (using data attribute for reliability)
    const previewImageWrapper = previewElement?.querySelector(
      '[data-image-wrapper="true"]'
    ) as HTMLElement | null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    const size = 1200;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = frame.frameColor || '#1ED9C3'; // Arduino Day Teal
    ctx.fillRect(0, 0, size, size);
    if (userImage) {
      const userImg = new Image();
      userImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        userImg.onload = resolve;
        userImg.onerror = reject;
        userImg.src = userImage;
      });

      ctx.save();
      const scaleFactor = size / previewSize;

      // Use wrapper div dimensions (they're set explicitly in the style)
      const renderedWidth = previewImageWrapper?.clientWidth || previewSize;
      const renderedHeight = previewImageWrapper?.clientHeight || previewSize;
      
      // Get position from userImgPos prop, not from DOM
      const renderedLeft = userImgPos.x;
      const renderedTop = userImgPos.y;

      const drawWidth = renderedWidth * scaleFactor;
      const drawHeight = renderedHeight * scaleFactor;
      const centerX = (renderedLeft + renderedWidth / 2) * scaleFactor;
      const centerY = (renderedTop + renderedHeight / 2) * scaleFactor;

      ctx.translate(centerX, centerY);
      ctx.rotate((userRotate * Math.PI) / 180);
      ctx.scale(userScale / 100, userScale / 100);
      ctx.drawImage(userImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();
    }
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      frameImg.onload = resolve;
      frameImg.onerror = reject;
      frameImg.src = frame.imageUrl;
    });
    ctx.drawImage(frameImg, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) {
        alert('Failed to create image');
        onFinish?.();
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `frameit-${frameId}.png`;
      link.click();
      URL.revokeObjectURL(url);
      onFinish?.();
    }, 'image/png');
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download frame. Please try again.');
    onFinish?.();
  }
}
