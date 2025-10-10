import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceFieldsProps {
  boughtPrice?: number;
  averageMarketPrice?: number;
  targetSellingPrice?: number;
}

export const PriceFields = ({ boughtPrice, averageMarketPrice, targetSellingPrice }: PriceFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="boughtPrice">Bought Price ($)</Label>
        <Input
          id="boughtPrice"
          name="boughtPrice"
          type="number"
          step="0.01"
          min="0"
          defaultValue={boughtPrice || ""}
          className="h-11"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="averageMarketPrice">Average Market Price ($)</Label>
        <Input
          id="averageMarketPrice"
          name="averageMarketPrice"
          type="number"
          step="0.01"
          min="0"
          defaultValue={averageMarketPrice || ""}
          className="h-11"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="targetSellingPrice">Target Selling Price ($)</Label>
        <Input
          id="targetSellingPrice"
          name="targetSellingPrice"
          type="number"
          step="0.01"
          min="0"
          defaultValue={targetSellingPrice || ""}
          className="h-11"
          required
        />
      </div>
    </>
  );
};
