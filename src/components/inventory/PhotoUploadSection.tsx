import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PhotoUploadSectionProps {
  photoBase64: string[];
  photoPreviews: string[];
  isCompressing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: (index: number) => void;
  maxPhotos?: number;
}

export const PhotoUploadSection = ({
  photoBase64,
  photoPreviews,
  isCompressing,
  fileInputRef,
  onPhotoUpload,
  onRemovePhoto,
  maxPhotos = 5,
}: PhotoUploadSectionProps) => {
  return (
    <div className="p-4 rounded-lg border bg-muted/20">
      <Label className="text-base font-semibold">Photos (Max {maxPhotos})</Label>
      <div className="mt-3 space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPhotoUpload}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={photoBase64.length >= maxPhotos || isCompressing}
          className="w-full h-24 border-2 border-dashed hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6" />
            <span className="text-sm">
              {isCompressing ? "Compressing..." : `Upload Photos (${photoBase64.length}/${maxPhotos})`}
            </span>
          </div>
        </Button>

        {photoPreviews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {photoPreviews.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border-2 overflow-hidden group hover:border-primary transition-colors"
              >
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(index)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
