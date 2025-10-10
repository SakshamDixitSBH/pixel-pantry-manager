import { Condition } from "@/types/inventory";

export const getConditionColor = (condition: Condition): string => {
  switch (condition) {
    case Condition.New:
      return "bg-success/20 text-success border-success/30";
    case Condition.LikeNew:
      return "bg-success/10 text-success border-success/20";
    case Condition.Good:
      return "bg-warning/20 text-warning border-warning/30";
    case Condition.Fair:
      return "bg-accent/20 text-accent border-accent/30";
    case Condition.Poor:
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export const getVersionBadgeColor = (version: string): string => {
  switch (version) {
    case "Pro":
      return "bg-primary/20 text-primary border-primary/30";
    case "Slim":
      return "bg-secondary/20 text-secondary border-secondary/30";
    case "Standard":
      return "bg-muted/50 text-foreground border-border";
    case "Mini":
      return "bg-accent/20 text-accent border-accent/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};
