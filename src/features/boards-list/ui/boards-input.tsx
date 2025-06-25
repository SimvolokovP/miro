import { Input } from "@/shared/ui/kit/input";

interface BoardsInputProps {
  value: string;
  onValueChange: (v: string) => void;
}

export function BoardsInput({ onValueChange, value }: BoardsInputProps) {
  return (
    <Input
      id="search"
      placeholder="Введите название доски..."
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full"
    />
  );
}
