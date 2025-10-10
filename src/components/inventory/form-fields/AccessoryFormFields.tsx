import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accessory, AccessoryType, ConsoleName, Color, Condition, Brands } from "@/types/inventory";

interface AccessoryFormFieldsProps {
  item: Accessory | null;
}

export const AccessoryFormFields = ({ item }: AccessoryFormFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={item?.name || ""}
          className="h-11"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="accessoryType">Type</Label>
        <Select name="accessoryType" defaultValue={item?.type} required>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {Object.values(AccessoryType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
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
