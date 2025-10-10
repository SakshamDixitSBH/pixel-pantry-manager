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
import { Console } from "@/types/inventory";
import { getVersionBadgeColor } from "@/utils/conditionColors";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";
import { AddEditItemModal } from "@/components/AddEditItemModal";
import { toast } from "sonner";
import { inventoryApi } from "@/services/inventoryApi";

const Consoles = () => {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Console | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Console | null>(null);

  useEffect(() => {
    setConsoles(inventoryApi.getConsoles());
  }, []);

  const filteredConsoles = consoles.filter((console) =>
    console.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (id: string) => {
    const item = consoles.find((c) => c.id === id);
    if (item) {
      setEditingItem(item);
      setIsAddEditOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    inventoryApi.deleteConsole(id);
    setConsoles(inventoryApi.getConsoles());
    toast.success("Console deleted successfully");
  };

  const handleSave = async (item: Omit<Console, "photos">, photoBase64: string[]) => {
    await inventoryApi.saveConsole(item, photoBase64);
    setConsoles(inventoryApi.getConsoles());
    toast.success(editingItem ? "Console updated successfully" : "Console added successfully");
  };

  const handleRowClick = (console: Console) => {
    setSelectedItem(console);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Consoles</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your gaming consoles</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Console
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-lg sm:text-xl">All Consoles</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search consoles..."
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
                  <TableHead className="min-w-[150px]">Console</TableHead>
                  <TableHead className="min-w-[100px]">Brand</TableHead>
                  <TableHead className="min-w-[100px]">Version</TableHead>
                  <TableHead className="min-w-[100px]">Color</TableHead>
                  <TableHead className="text-right min-w-[100px]">Bought</TableHead>
                  <TableHead className="text-right min-w-[100px]">Market</TableHead>
                  <TableHead className="text-right min-w-[100px]">Target</TableHead>
                  <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsoles.map((console) => (
                  <TableRow 
                    key={console.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(console)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                        {console.photos && console.photos.length > 0 ? (
                          <img src={console.photos[0]} alt="Console" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{console.sku}</TableCell>
                    <TableCell className="font-semibold">{console.name}</TableCell>
                    <TableCell>{console.brand}</TableCell>
                    <TableCell>
                      <Badge className={getVersionBadgeColor(console.version)}>
                        {console.version}
                      </Badge>
                    </TableCell>
                    <TableCell>{console.color}</TableCell>
                    <TableCell className="text-right">${console.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${console.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${console.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(console.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(console.id)}
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
        type="console"
      />

      <AddEditItemModal
        item={editingItem}
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSave}
        type="console"
      />
    </div>
  );
};

export default Consoles;
