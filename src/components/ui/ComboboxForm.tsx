import type {
  FieldValues,
  UseControllerProps,
  UseFormReturn,
  FieldPath,
  PathValue,
  Path,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
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
import { type Dispatch, type SetStateAction, useState } from "react";

type FromComboBoxProps<TOption, TFieldValues extends FieldValues> = {
  mapper: (item: TOption) => string;
  options: Array<string>;
  setOptions: Dispatch<SetStateAction<Array<string>>>;
  name: FieldPath<TFieldValues>;
  FormLabel?: React.ReactNode;
  methods: UseFormReturn<TFieldValues>;
} & UseControllerProps<TFieldValues>;

export function FromComboBox<TOption, TFieldValues extends FieldValues>({
  control,
  options,
  // mapper,
  name,
  FormLabel,
  methods,
  setOptions,
}: FromComboBoxProps<TOption, TFieldValues>) {
  const [option, setOption] = useState<string>("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start">
          {FormLabel}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    " flex justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? options.find((option) => option === field.value)
                    : "Select gender"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="justify-start p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Select Gender"
                  value={option}
                  onValueChange={setOption}
                />
                <CommandEmpty className="">
                  <div className="flex items-center justify-start ">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        methods.setValue(
                          name,
                          option as PathValue<TFieldValues, Path<TFieldValues>>,
                        );
                        setOptions((prev) => [...prev, option]);
                      }}
                      className="w-full text-left"
                    >
                      Add {option}
                    </Button>
                  </div>
                </CommandEmpty>
                {/* What we see in the dropdown */}
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option}
                      key={option}
                      onSelect={() => {
                        methods.setValue(
                          name,
                          option as PathValue<TFieldValues, Path<TFieldValues>>,
                        );
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          option === field.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
