import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Console,
  Game,
  Accessory,
  ConsoleName,
  ConsoleVersion,
  Condition,
  Platform,
  AccessoryType,
} from "@/types/inventory";
import { useImageCompression } from "@/hooks/useImageCompression";
import { PhotoUploadSection } from "./inventory/PhotoUploadSection";
import { ConsoleFormFields } from "./inventory/form-fields/ConsoleFormFields";
import { GameFormFields } from "./inventory/form-fields/GameFormFields";
import { AccessoryFormFields } from "./inventory/form-fields/AccessoryFormFields";
import { PriceFields } from "./inventory/PriceFields";

interface AddEditItemModalProps {
  item: Console | Game | Accessory | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<Console | Game | Accessory, "photos">, photoBase64: string[]) => void;
  type: "console" | "game" | "accessory";
}

export const AddEditItemModal = ({ item, isOpen, onClose, onSave, type }: AddEditItemModalProps) => {
  const [commentsLength, setCommentsLength] = useState(item?.comments?.length || 0);
  
  const {
    photoBase64,
    photoPreviews,
    isCompressing,
    fileInputRef,
    handlePhotoUpload,
    removePhoto,
  } = useImageCompression(item?.photos || [], 5);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const baseItem = {
      id: item?.id || Date.now().toString(),
      boughtPrice: parseFloat(formData.get("boughtPrice") as string),
      averageMarketPrice: parseFloat(formData.get("averageMarketPrice") as string),
      targetSellingPrice: parseFloat(formData.get("targetSellingPrice") as string),
      createdAt: item?.createdAt || new Date(),
      comments: formData.get("comments") as string || "",
    };

    if (type === "console") {
      onSave(
        {
          ...baseItem,
          name: formData.get("name") as ConsoleName,
          brand: formData.get("brand") as string,
          version: formData.get("version") as ConsoleVersion,
          color: formData.get("color") as string,
          condition: formData.get("condition") as Condition,
        } as Console,
        photoBase64,
      );
    } else if (type === "game") {
      onSave(
        {
          ...baseItem,
          title: formData.get("title") as string,
          brand: formData.get("brand") as string,
          condition: formData.get("condition") as Condition,
          consoleName: formData.get("consoleName") as ConsoleName,
          platform: formData.get("platform") as Platform,
        } as Game,
        photoBase64,
      );
    } else {
      onSave(
        {
          ...baseItem,
          name: formData.get("name") as string,
          type: formData.get("accessoryType") as AccessoryType,
          brand: formData.get("brand") as string,
          color: formData.get("color") as string,
          condition: formData.get("condition") as Condition,
          consoleName: formData.get("consoleName") as ConsoleName,
        } as Accessory,
        photoBase64,
      );
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">
            {item ? "Edit" : "Add"} {type === "console" ? "Console" : type === "game" ? "Game" : "Accessory"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-1">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* SKU Display - only show when editing */}
            {item && (
              <div className="p-4 rounded-lg border bg-muted/10">
                <Label className="text-sm text-muted-foreground">SKU (Auto-generated)</Label>
                <p className="mt-1 text-base font-mono font-semibold text-primary">{(item as any).sku}</p>
              </div>
            )}

            {/* Photos Upload */}
            <PhotoUploadSection
              photoBase64={photoBase64}
              photoPreviews={photoPreviews}
              isCompressing={isCompressing}
              fileInputRef={fileInputRef}
              onPhotoUpload={handlePhotoUpload}
              onRemovePhoto={removePhoto}
            />

            {/* Dynamic Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type === "console" && <ConsoleFormFields item={item as Console} />}
              {type === "game" && <GameFormFields item={item as Game} />}
              {type === "accessory" && <AccessoryFormFields item={item as Accessory} />}
              
              {/* Pricing Fields */}
              <PriceFields
                boughtPrice={item?.boughtPrice}
                averageMarketPrice={item?.averageMarketPrice}
                targetSellingPrice={item?.targetSellingPrice}
              />
            </div>

            {/* Comments */}
            <div className="p-4 rounded-lg border bg-muted/20">
              <Label htmlFor="comments" className="text-base font-semibold">
                Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                name="comments"
                defaultValue={item?.comments || ""}
                placeholder="Add any additional notes or comments..."
                className="mt-2 min-h-[100px] resize-none"
                maxLength={500}
                onChange={(e) => setCommentsLength(e.target.value.length)}
              />
              <p className="mt-2 text-xs text-muted-foreground text-right">
                {commentsLength}/500
              </p>
            </div>

            <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {item ? "Update" : "Add"} {type === "console" ? "Console" : type === "game" ? "Game" : "Accessory"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
