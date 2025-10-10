import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Color,
  Brands,
} from "@/types/inventory";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const formatBrand = (brand: string) => {
  return brand
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

interface AddEditItemModalProps {
  item: Console | Game | Accessory | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<Console | Game | Accessory, "photos">, photoFiles: File[]) => void;
  type: "console" | "game" | "accessory";
}

export const AddEditItemModal = ({ item, isOpen, onClose, onSave, type }: AddEditItemModalProps) => {
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>(item?.photos || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photoFiles.length + files.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    const newFiles = Array.from(files);
    setPhotoFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

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
        photoFiles,
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
        photoFiles,
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
        photoFiles,
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
            <div className="p-4 rounded-lg border bg-muted/20">
              <Label className="text-base font-semibold">Photos (Max 5)</Label>
              <div className="mt-3 space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoFiles.length >= 5}
                  className="w-full h-24 border-2 border-dashed hover:border-primary transition-colors"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">Upload Photos ({photoFiles.length}/5)</span>
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
                          onClick={() => removePhoto(index)}
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

            {/* Dynamic Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type === "console" && (
                <>
                  <div>
                    <Label htmlFor="name">Console Name</Label>
                    <Select name="name" defaultValue={item ? (item as Console).name : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select console" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(ConsoleName).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select name="brand" defaultValue={item ? (item as Console).brand : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Brands).map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Select name="version" defaultValue={item ? (item as Console).version : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(ConsoleVersion).map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select name="color" defaultValue={item ? (item as Console).color : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-[300px]">
                        {Object.values(Color).map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select name="condition" defaultValue={item ? (item as Console).condition : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Condition).map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {type === "game" && (
                <>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={item ? (item as Game).title : ""}
                      className="h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select name="brand" defaultValue={item ? (item as Game).brand : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Brands).map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="consoleName">Console</Label>
                    <Select name="consoleName" defaultValue={item ? (item as Game).consoleName : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select console" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(ConsoleName).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select name="platform" defaultValue={item ? (item as Game).platform : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Platform).map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select name="condition" defaultValue={item ? (item as Game).condition : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Condition).map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {type === "accessory" && (
                <>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={item ? (item as Accessory).name : ""}
                      className="h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessoryType">Type</Label>
                    <Select name="accessoryType" defaultValue={item ? (item as Accessory).type : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(AccessoryType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select name="brand" defaultValue={item ? (item as Accessory).brand : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Brands).map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="consoleName">Console</Label>
                    <Select
                      name="consoleName"
                      defaultValue={item ? (item as Accessory).consoleName : undefined}
                      required
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select console" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(ConsoleName).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select name="color" defaultValue={item ? (item as Accessory).color : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-[300px]">
                        {Object.values(Color).map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select name="condition" defaultValue={item ? (item as Accessory).condition : undefined} required>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {Object.values(Condition).map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="boughtPrice">Bought Price</Label>
                <Input
                  id="boughtPrice"
                  name="boughtPrice"
                  type="number"
                  step="0.01"
                  defaultValue={item?.boughtPrice || ""}
                  className="h-11"
                  required
                />
              </div>
              <div>
                <Label htmlFor="averageMarketPrice">Market Price</Label>
                <Input
                  id="averageMarketPrice"
                  name="averageMarketPrice"
                  type="number"
                  step="0.01"
                  defaultValue={item?.averageMarketPrice || ""}
                  className="h-11"
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetSellingPrice">Target Price</Label>
                <Input
                  id="targetSellingPrice"
                  name="targetSellingPrice"
                  type="number"
                  step="0.01"
                  defaultValue={item?.targetSellingPrice || ""}
                  className="h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea 
                id="comments" 
                name="comments" 
                placeholder="Add any additional notes or comments..."
                defaultValue={item?.comments}
                rows={4}
              />
            </div>

            <DialogFooter className="pt-4 border-t mt-6 gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 sm:flex-none">
                Save Item
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
