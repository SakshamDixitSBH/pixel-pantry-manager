import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onAddClick: () => void;
}

export const PageHeader = ({ title, description, buttonText, onAddClick }: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onAddClick} className="gap-2 w-full sm:w-auto">
        <Plus className="w-4 h-4" />
        {buttonText}
      </Button>
    </div>
  );
};
