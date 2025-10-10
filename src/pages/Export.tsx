import { useEffect, useState } from "react";
import { Download, Gamepad2, Package, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { exportConsolesToCSV, exportGamesToCSV, exportAccessoriesToCSV } from "@/utils/exportToCSV";
import { inventoryApi } from "@/services/inventoryApi";
import { Console, Game, Accessory } from "@/types/inventory";
import { toast } from "sonner";

const Export = () => {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  useEffect(() => {
    setConsoles(inventoryApi.getConsoles());
    setGames(inventoryApi.getGames());
    setAccessories(inventoryApi.getAccessories());
  }, []);

  const handleExportConsoles = () => {
    exportConsolesToCSV(consoles);
    toast.success("Consoles exported to CSV successfully!");
  };

  const handleExportGames = () => {
    exportGamesToCSV(games);
    toast.success("Games exported to CSV successfully!");
  };

  const handleExportAccessories = () => {
    exportAccessoriesToCSV(accessories);
    toast.success("Accessories exported to CSV successfully!");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Export Data</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Download your inventory data as CSV files</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle>Consoles</CardTitle>
            <CardDescription>
              Export all console data including brand, version, prices, and specifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Records:</span>
                <span className="font-semibold text-foreground">{consoles.length}</span>
              </div>
              <Button onClick={handleExportConsoles} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Export Consoles
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle>Games</CardTitle>
            <CardDescription>
              Export all game data including title, genre, condition, platform, and prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Records:</span>
                <span className="font-semibold text-foreground">{games.length}</span>
              </div>
              <Button onClick={handleExportGames} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Export Games
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle>Accessories</CardTitle>
            <CardDescription>
              Export all accessory data including type, model, condition, and prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Records:</span>
                <span className="font-semibold text-foreground">{accessories.length}</span>
              </div>
              <Button onClick={handleExportAccessories} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Export Accessories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CSV Format Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            The exported CSV files include all fields for each category and can be opened in any spreadsheet application like Microsoft Excel, Google Sheets, or LibreOffice Calc.
          </p>
          <p>
            All price fields are formatted with two decimal places, and dates are in local format.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Note: In a production environment, connect these export functions to your backend API to export real-time data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Export;
