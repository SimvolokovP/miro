import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ImagesIcon, ListIcon } from "lucide-react";

export type viewMode = "list" | "cards";

interface ViewModeToggleProps {
  value: viewMode;
  onChange: (v: viewMode) => void;
}

export function ViewModeToggle({ onChange, value }: ViewModeToggleProps) {
  return (
    <Tabs defaultValue={value} onValueChange={(v) => onChange(v as viewMode)}>
      <TabsList className="gap-2 flex">
        <TabsTrigger value="list">
          <div className="p-1 border-2 rounded-sm cursor-pointer">
            <ListIcon />
          </div>
        </TabsTrigger>
        <TabsTrigger value="cards">
          <div className="p-1 border-2 rounded-sm cursor-pointer">
            <ImagesIcon />
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
