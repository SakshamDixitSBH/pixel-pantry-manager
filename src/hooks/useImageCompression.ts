import { useState, useRef, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

export const useImageCompression = (initialPhotos: string[] = [], maxPhotos: number = 5) => {
  const [photoBase64, setPhotoBase64] = useState<string[]>(initialPhotos);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>(initialPhotos);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photoBase64.length + files.length > maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    setIsCompressing(true);
    const newFiles = Array.from(files);

    try {
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      for (const file of newFiles) {
        const compressedFile = await imageCompression(file, compressionOptions);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setPhotoBase64((prev) => [...prev, base64]);
          setPhotoPreviews((prev) => [...prev, base64]);
        };
        reader.readAsDataURL(compressedFile);
      }
      
      toast.success(`${newFiles.length} image(s) compressed and uploaded`);
    } catch (error) {
      console.error("Error compressing images:", error);
      toast.error("Failed to compress images");
    } finally {
      setIsCompressing(false);
    }
  }, [photoBase64.length, maxPhotos]);

  const removePhoto = useCallback((index: number) => {
    setPhotoBase64((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetPhotos = useCallback(() => {
    setPhotoBase64([]);
    setPhotoPreviews([]);
  }, []);

  return {
    photoBase64,
    photoPreviews,
    isCompressing,
    fileInputRef,
    handlePhotoUpload,
    removePhoto,
    resetPhotos,
  };
};
