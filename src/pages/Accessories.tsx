import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Accessory } from "@/types/inventory";
import { getConditionColor } from "@/utils/conditionColors";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";
import { AddEditItemModal } from "@/components/AddEditItemModal";
import { toast } from "sonner";
import { inventoryApi } from "@/services/inventoryApi";

const Accessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Accessory | null>(null);

  useEffect(() => {
    setAccessories(inventoryApi.getAccessories());
  }, []);

  const filteredAccessories = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accessory.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accessory.consoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (id: string) => {
    const item = accessories.find((a) => a.id === id);
    if (item) {
      setEditingItem(item);
      setIsAddEditOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    inventoryApi.deleteAccessory(id);
    setAccessories(inventoryApi.getAccessories());
    toast.success("Accessory deleted successfully");
  };

  const handleSave = async (item: Omit<Accessory, "photos">, photoBase64: string[]) => {
    await inventoryApi.saveAccessory(item, photoBase64);
    setAccessories(inventoryApi.getAccessories());
    toast.success(editingItem ? "Accessory updated successfully" : "Accessory added successfully");
  };

  const handleRowClick = (accessory: Accessory) => {
    setSelectedItem(accessory);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Accessories</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your gaming accessories</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Accessory
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-lg sm:text-xl">All Accessories</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[80px]">Photo</TableHead>
                  <TableHead className="min-w-[100px]">SKU</TableHead>
                  <TableHead className="min-w-[180px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Type</TableHead>
                  <TableHead className="min-w-[120px]">Brand</TableHead>
                  <TableHead className="min-w-[150px]">Console</TableHead>
                  <TableHead className="min-w-[100px]">Color</TableHead>
                  <TableHead className="min-w-[100px]">Condition</TableHead>
                  <TableHead className="text-right min-w-[100px]">Bought</TableHead>
                  <TableHead className="text-right min-w-[100px]">Market</TableHead>
                  <TableHead className="text-right min-w-[100px]">Target</TableHead>
                  <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccessories.map((accessory) => (
                  <TableRow 
                    key={accessory.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(accessory)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                        {accessory.photos && accessory.photos.length > 0 ? (
                          <img src={accessory.photos[0]} alt="Accessory" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{accessory.sku}</TableCell>
                    <TableCell className="font-semibold">{accessory.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{accessory.type}</Badge>
                    </TableCell>
                    <TableCell>{accessory.brand}</TableCell>
                    <TableCell>{accessory.consoleName}</TableCell>
                    <TableCell>{accessory.color}</TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(accessory.condition)}>
                        {accessory.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${accessory.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${accessory.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${accessory.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(accessory.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(accessory.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ItemDetailsModal
        item={selectedItem}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        type="accessory"
      />

      <AddEditItemModal
        item={editingItem}
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSave}
        type="accessory"
      />
    </div>
  );
};

export default Accessories;
