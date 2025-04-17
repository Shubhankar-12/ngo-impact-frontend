"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboBoxOption = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  options: ComboBoxOption[];
  onSelect?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  onSelect,
  onSearch,
  placeholder = "Select an option...",
  defaultValue = "",
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            onValueChange={(input: string) => onSearch?.(input)}
          />
          <CommandList>
            {options.length === 0 && (
              <CommandEmpty>No option found.</CommandEmpty>
            )}

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue: any) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onSelect?.(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
