import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "~/utils/utils";
import { Button } from "./button";

type FromComboBoxProps<TOption, TFieldValues extends FieldValues> = {
  mapper: (item: TOption) => string;
  options: Array<TOption>;
  FormLabel?: React.ReactNode;
} & UseControllerProps<TFieldValues>;

export function FromComboBox<TOption, TFieldValues extends FieldValues>({
  control,
  options,
  mapper,
  name,
  FormLabel,
}: FromComboBoxProps<TOption, TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <FormItem className="flex flex-col">
            {FormLabel}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      " justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? options.find(
                          (option) => mapper(option) === field.value,
                        ) && field.value
                      : "Select gender"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search gender" />
                  <CommandEmpty className="flex w-full items-center justify-center py-2">
                    <Button
                      role="form"
                      variant="outline"
                      onClick={() => onChange(value)}
                    >
                      Add New Gender
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const optionData = mapper(option);
                      return (
                        <CommandItem
                          value={optionData}
                          key={optionData}
                          onSelect={() => onChange(value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              optionData === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {optionData}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              This is the language that will be used in the dashboard.
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
