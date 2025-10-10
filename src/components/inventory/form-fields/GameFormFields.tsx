import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Game, ConsoleName, Platform, Condition, Brands } from "@/types/inventory";

interface GameFormFieldsProps {
  item: Game | null;
}

export const GameFormFields = ({ item }: GameFormFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title || ""}
          className="h-11"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand" defaultValue={item?.brand} required>
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
        <Select name="consoleName" defaultValue={item?.consoleName} required>
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
        <Select name="platform" defaultValue={item?.platform} required>
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
        <Select name="condition" defaultValue={item?.condition} required>
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
  );
};
