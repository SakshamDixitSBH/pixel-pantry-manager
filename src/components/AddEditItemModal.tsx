import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Console, Game, Accessory, ConsoleName, ConsoleVersion, Condition, Platform, AccessoryType } from "@/types/inventory";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
    };

    if (type === "console") {
      onSave({
        ...baseItem,
        name: formData.get("name") as ConsoleName,
        brand: formData.get("brand") as string,
        version: formData.get("version") as ConsoleVersion,
        color: formData.get("color") as string,
        releaseYear: parseInt(formData.get("releaseYear") as string),
      } as Console, photoFiles);
    } else if (type === "game") {
      onSave({
        ...baseItem,
        title: formData.get("title") as string,
        genre: formData.get("genre") as string,
        releaseYear: parseInt(formData.get("releaseYear") as string),
        condition: formData.get("condition") as Condition,
        consoleName: formData.get("consoleName") as ConsoleName,
        platform: formData.get("platform") as Platform,
      } as Game, photoFiles);
    } else {
      onSave({
        ...baseItem,
        name: formData.get("name") as string,
        type: formData.get("accessoryType") as AccessoryType,
        color: formData.get("color") as string,
        model: formData.get("model") as string,
        condition: formData.get("condition") as Condition,
        consoleName: formData.get("consoleName") as ConsoleName,
      } as Accessory, photoFiles);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit" : "Add"} {type === "console" ? "Console" : type === "game" ? "Game" : "Accessory"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photos Upload */}
          <div>
            <Label>Photos (Max 5)</Label>
            <div className="mt-2 space-y-3">
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
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos ({photoFiles.length}/5)
              </Button>

              {photoPreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {photoPreviews.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group">
                      <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            {type === "console" && (
              <>
                <div>
                  <Label htmlFor="name">Console Name</Label>
                  <Select name="name" defaultValue={item ? (item as Console).name : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select console" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ConsoleName).map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" name="brand" defaultValue={item ? (item as Console).brand : ""} required />
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Select name="version" defaultValue={item ? (item as Console).version : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ConsoleVersion).map((version) => (
                        <SelectItem key={version} value={version}>{version}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" defaultValue={item ? (item as Console).color : ""} required />
                </div>
                <div>
                  <Label htmlFor="releaseYear">Release Year</Label>
                  <Input id="releaseYear" name="releaseYear" type="number" defaultValue={item ? (item as Console).releaseYear : ""} required />
                </div>
              </>
            )}

            {type === "game" && (
              <>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={item ? (item as Game).title : ""} required />
                </div>
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Input id="genre" name="genre" defaultValue={item ? (item as Game).genre : ""} required />
                </div>
                <div>
                  <Label htmlFor="consoleName">Console</Label>
                  <Select name="consoleName" defaultValue={item ? (item as Game).consoleName : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select console" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ConsoleName).map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select name="platform" defaultValue={item ? (item as Game).platform : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Platform).map((platform) => (
                        <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select name="condition" defaultValue={item ? (item as Game).condition : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Condition).map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="releaseYear">Release Year</Label>
                  <Input id="releaseYear" name="releaseYear" type="number" defaultValue={item ? (item as Game).releaseYear : ""} required />
                </div>
              </>
            )}

            {type === "accessory" && (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={item ? (item as Accessory).name : ""} required />
                </div>
                <div>
                  <Label htmlFor="accessoryType">Type</Label>
                  <Select name="accessoryType" defaultValue={item ? (item as Accessory).type : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(AccessoryType).map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="consoleName">Console</Label>
                  <Select name="consoleName" defaultValue={item ? (item as Accessory).consoleName : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select console" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ConsoleName).map((name) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" name="model" defaultValue={item ? (item as Accessory).model : ""} required />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" defaultValue={item ? (item as Accessory).color : ""} required />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select name="condition" defaultValue={item ? (item as Accessory).condition : undefined} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Condition).map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="boughtPrice">Bought Price</Label>
              <Input id="boughtPrice" name="boughtPrice" type="number" step="0.01" defaultValue={item?.boughtPrice || ""} required />
            </div>
            <div>
              <Label htmlFor="averageMarketPrice">Market Price</Label>
              <Input id="averageMarketPrice" name="averageMarketPrice" type="number" step="0.01" defaultValue={item?.averageMarketPrice || ""} required />
            </div>
            <div>
              <Label htmlFor="targetSellingPrice">Target Price</Label>
              <Input id="targetSellingPrice" name="targetSellingPrice" type="number" step="0.01" defaultValue={item?.targetSellingPrice || ""} required />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
