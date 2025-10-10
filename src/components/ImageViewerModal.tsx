import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageViewerModal = ({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose,
  onNavigate 
}: ImageViewerModalProps) => {
  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 border-0 bg-black/95">
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-4 z-50 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 z-50 text-white hover:bg-white/20"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          <img
            src={images[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full">
              <p className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
