import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PostTypeSelectProps = {
  onValueChange: (value: string) => void;
  defaultValue?: string;
};

export function PostTypeSelect({
  onValueChange,
  defaultValue,
}: PostTypeSelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Тип записи" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ARTICLE">Статья</SelectItem>
        <SelectItem value="PORTFOLIO">Портфолио</SelectItem>
        <SelectItem value="SERVICE">Услуга</SelectItem>
      </SelectContent>
    </Select>
  );
}
