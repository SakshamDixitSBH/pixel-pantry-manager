import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
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
import { sampleConsoles } from "@/data/sampleData";
import { Console } from "@/types/inventory";
import { getVersionBadgeColor } from "@/utils/conditionColors";
import { toast } from "sonner";

const Consoles = () => {
  const [consoles] = useState<Console[]>(sampleConsoles);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConsoles = consoles.filter((console) =>
    console.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    console.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    toast.info("Add Console feature - Connect to your backend API");
  };

  const handleEdit = (id: string) => {
    toast.info(`Edit console ${id} - Connect to your backend API`);
  };

  const handleDelete = (id: string) => {
    toast.info(`Delete console ${id} - Connect to your backend API`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Consoles</h1>
          <p className="text-muted-foreground">Manage your gaming consoles</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Console
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Consoles</span>
            <div className="relative w-64">
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
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Console</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Bought</TableHead>
                  <TableHead className="text-right">Market</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsoles.map((console) => (
                  <TableRow key={console.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-semibold">{console.name}</TableCell>
                    <TableCell>{console.brand}</TableCell>
                    <TableCell>
                      <Badge className={getVersionBadgeColor(console.version)}>
                        {console.version}
                      </Badge>
                    </TableCell>
                    <TableCell>{console.color}</TableCell>
                    <TableCell>{console.releaseYear}</TableCell>
                    <TableCell className="text-right">${console.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${console.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${console.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
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
    </div>
  );
};

export default Consoles;
