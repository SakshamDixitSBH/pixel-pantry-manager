import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Console, ConsoleName, ConsoleVersion, Condition, Color, Brands } from "@/types/inventory";

interface ConsoleFormFieldsProps {
  item: Console | null;
}

export const ConsoleFormFields = ({ item }: ConsoleFormFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Console Name</Label>
        <Select name="name" defaultValue={item?.name} required>
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
        <Label htmlFor="version">Version</Label>
        <Select name="version" defaultValue={item?.version} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select version" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {Object.values(ConsoleVersion).map((version) => (
              <SelectItem key={version} value={version}>
                {version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="color">Color</Label>
        <Select name="color" defaultValue={item?.color} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent className="bg-popover max-h-[300px]">
            {Object.values(Color).map((color) => (
              <SelectItem key={color} value={color}>
                {color}
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
