import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export type BoardsSortOption =
  | "createdAt"
  | "updatedAt"
  | "lastOpenedAt"
  | "name";

interface BoardsSelectProps {
  value: BoardsSortOption;
  onValueChange: (v: BoardsSortOption) => void;
}

const BoardsSelect = ({ value, onValueChange }: BoardsSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id="sort" className="w-full">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
        <SelectItem value="createdAt">По дате создания</SelectItem>
        <SelectItem value="updatedAt">По дате обновления</SelectItem>
        <SelectItem value="name">По имени</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default BoardsSelect;
