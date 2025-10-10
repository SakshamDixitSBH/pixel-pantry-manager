import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useInventoryManager } from "@/hooks/useInventoryManager";
import { PageHeader } from "@/components/inventory/PageHeader";
import { SearchBar } from "@/components/inventory/SearchBar";

const Consoles = () => {
  const {
    items: consoles,
    searchQuery,
    setSearchQuery,
    selectedItem,
    isDetailsOpen,
    isAddEditOpen,
    editingItem,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleRowClick,
    closeDetailsModal,
    closeAddEditModal,
  } = useInventoryManager<Console>("console");

  const filteredConsoles = consoles.filter((console) =>
    console.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <PageHeader
        title="Consoles"
        description="Manage your gaming consoles"
        buttonText="Add Console"
        onAddClick={handleAdd}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-lg sm:text-xl">All Consoles</span>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search consoles..."
            />
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
        onClose={closeDetailsModal}
        type="console"
      />

      <AddEditItemModal
        item={editingItem}
        isOpen={isAddEditOpen}
        onClose={closeAddEditModal}
        onSave={handleSave}
        type="console"
      />
    </div>
  );
};

export default Consoles;
