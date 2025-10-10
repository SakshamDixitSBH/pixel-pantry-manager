import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Console, Game, Accessory } from "@/types/inventory";
import { getConditionColor, getVersionBadgeColor } from "@/utils/conditionColors";
import { Image as ImageIcon } from "lucide-react";
import { ImageViewerModal } from "@/components/ImageViewerModal";

interface ItemDetailsModalProps {
  item: Console | Game | Accessory | null;
  isOpen: boolean;
  onClose: () => void;
  type: "console" | "game" | "accessory";
}

export const ItemDetailsModal = ({ item, isOpen, onClose, type }: ItemDetailsModalProps) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!item) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageViewerOpen(true);
  };

  const renderDetails = () => {
    if (type === "console") {
      const console = item as Console;
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Console</p>
              <p className="font-semibold">{console.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="font-semibold">{console.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Version</p>
              <Badge className={getVersionBadgeColor(console.version)}>{console.version}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Color</p>
              <p className="font-semibold">{console.color}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Release Year</p>
              <p className="font-semibold">{console.releaseYear}</p>
            </div>
          </div>
        </>
      );
    } else if (type === "game") {
      const game = item as Game;
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="font-semibold">{game.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-semibold">{game.genre}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Console</p>
              <p className="font-semibold">{game.consoleName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platform</p>
              <Badge variant="outline">{game.platform}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Condition</p>
              <Badge className={getConditionColor(game.condition)}>{game.condition}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Release Year</p>
              <p className="font-semibold">{game.releaseYear}</p>
            </div>
          </div>
        </>
      );
    } else {
      const accessory = item as Accessory;
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{accessory.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <Badge variant="outline">{accessory.type}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Console</p>
              <p className="font-semibold">{accessory.consoleName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-semibold">{accessory.model}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Color</p>
              <p className="font-semibold">{accessory.color}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Condition</p>
              <Badge className={getConditionColor(accessory.condition)}>{accessory.condition}</Badge>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* SKU Section */}
          <div>
            <p className="text-sm text-muted-foreground">SKU</p>
            <p className="font-mono text-sm font-semibold text-primary">{item.sku}</p>
          </div>
          {/* Photos Section */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Photos</p>
            {item.photos && item.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {item.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg border overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 border rounded-lg bg-muted">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No photos</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Details</p>
            {renderDetails()}
          </div>

          {/* Pricing Section */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Pricing</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bought Price</p>
                <p className="font-semibold">${item.boughtPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Price</p>
                <p className="font-semibold text-primary">${item.averageMarketPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Price</p>
                <p className="font-semibold">${item.targetSellingPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <ImageViewerModal
          images={item.photos || []}
          currentIndex={selectedImageIndex}
          isOpen={imageViewerOpen}
          onClose={() => setImageViewerOpen(false)}
          onNavigate={setSelectedImageIndex}
        />
      </DialogContent>
    </Dialog>
  );
};
