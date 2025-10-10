import { Gamepad2, Package, Wrench, TrendingUp } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleConsoles, sampleGames, sampleAccessories } from "@/data/sampleData";
import { getConditionColor } from "@/utils/conditionColors";

const Dashboard = () => {
  const totalConsoles = sampleConsoles.length;
  const totalGames = sampleGames.length;
  const totalAccessories = sampleAccessories.length;

  const totalValue = [
    ...sampleConsoles.map(c => c.averageMarketPrice),
    ...sampleGames.map(g => g.averageMarketPrice),
    ...sampleAccessories.map(a => a.averageMarketPrice),
  ].reduce((sum, price) => sum + price, 0);

  // Get recent items (sorted by createdAt, take last 6)
  const recentItems = [
    ...sampleConsoles.map(c => ({ ...c, type: "Console" as const })),
    ...sampleGames.map(g => ({ ...g, type: "Game" as const, name: g.title })),
    ...sampleAccessories.map(a => ({ ...a, type: "Accessory" as const })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Overview of your retro gaming inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Consoles"
          value={totalConsoles}
          icon={<Gamepad2 className="w-6 h-6 text-primary-foreground" />}
          description="Active systems"
        />
        <StatsCard
          title="Total Games"
          value={totalGames}
          icon={<Package className="w-6 h-6 text-primary-foreground" />}
          description="In collection"
        />
        <StatsCard
          title="Accessories"
          value={totalAccessories}
          icon={<Wrench className="w-6 h-6 text-primary-foreground" />}
          description="Controllers, cables, etc."
        />
        <StatsCard
          title="Total Value"
          value={`$${totalValue.toFixed(2)}`}
          icon={<TrendingUp className="w-6 h-6 text-primary-foreground" />}
          description="Market value"
        />
      </div>

      {/* Recently Added */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recently Added Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="p-4 rounded-lg border border-border bg-gradient-card hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type === "Console" && `${item.brand} ${item.version}`}
                      {item.type === "Game" && item.genre}
                      {item.type === "Accessory" && item.type}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    {item.type}
                  </Badge>
                </div>
                
                {"condition" in item && (
                  <Badge className={getConditionColor(item.condition)}>
                    {item.condition}
                  </Badge>
                )}
                
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Market Value</span>
                  <span className="font-semibold text-primary">${item.averageMarketPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
