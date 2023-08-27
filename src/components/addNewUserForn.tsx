import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { api } from "~/utils/api";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FromComboBox } from "./ui/ComboboxForm";
import { useState } from "react";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least two characters" })
    .max(50, { message: "First Name cannot be more than fifty characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least two characters" })
    .max(50, { message: "Last Name cannot be more than fifty characters" }),
  gender: z
    .string()
    .min(2, { message: "Gender must be at least two characters" })
    .max(50, { message: "Gender cannot be more than fifty characters" }),
  age: z
    .string()
    .min(1, { message: "Age must be at least one characters" })
    .max(3, { message: "Age cannot be more than three characters" }),
});

type FValues = z.infer<typeof formSchema>;

type AddNewUserFormProps = {
  inDialog?: boolean;
};

export const AddNewUserForm = ({ inDialog }: AddNewUserFormProps) => {
  // 1. Define your form.
  const ctx = api.useContext();
  const addUser = api.users.addUser.useMutation({
    async onSuccess() {
      console.log("user added");
      await ctx.users.getAll.invalidate();
      form.reset();
    },
  });
  const [genders, setGenders] = useState(["Male", "Female", "Non-Binary"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = form.handleSubmit((data) => {
    try {
      const age = parseInt(data.age);
      addUser.mutate({ ...data, age: age, gender: "male" });
      // form.setError("root", {});
    } catch (_) {
      form.setError("age", { message: "Age needs to be a number" });
    }
  });

  const submitButton = () => {
    return inDialog && form.formState.isValid ? (
      <DialogClose className="w-full" asChild={true}>
        <Button onClick={() => void onSubmit()} className="w-full">
          Submit
        </Button>
      </DialogClose>
    ) : (
      <Button onClick={() => void onSubmit()} className="w-full bg-slate-50">
        Submit
      </Button>
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-5 text-gray-100">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Username</FormLabel>
              <div className="">
                <FormControl>
                  <Input placeholder="First Name" className="" {...field} />
                </FormControl>
                {/* <FormDescription>This is your first name.</FormDescription> */}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              {/* <FormDescription>This is your last name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Age" {...field} />
              </FormControl>
              {/* <FormDescription>This is your last name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FromComboBox<string, FValues>
          control={form.control}
          name="gender"
          FormLabel={<FormLabel>Gender</FormLabel>}
          options={genders}
          setOptions={setGenders}
          mapper={(item) => item}
          methods={form}
        />

        {submitButton()}
      </div>
    </Form>
  );
};

export const AddNewUserFormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full">Add New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add A New User</DialogTitle>
        <DialogDescription>
          <AddNewUserForm inDialog={true} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

// const combo = (
//   <FormField
//     control={form.control}
//     name="gender"
//     render={({ field }) => (
//       <FormItem className="flex flex-col justify-start">
//         <FormLabel>Gender</FormLabel>
//         <Popover>
//           <PopoverTrigger asChild>
//             <FormControl>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 className={cn(
//                   " justify-start",
//                   !field.value && "text-muted-foreground",
//                 )}
//               >
//                 {field.value
//                   ? genders.find((gender) => gender === field.value)
//                   : "Select gender"}
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//               </Button>
//             </FormControl>
//           </PopoverTrigger>
//           <PopoverContent className="justify-start p-0" align="start">
//             <Command>
//               <CommandInput
//                 placeholder="Select Gender"
//                 value={gender}
//                 onValueChange={setGender}
//               />
//               <CommandEmpty>
//                 <div className="flex items-center justify-start">
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       form.setValue("gender", gender);
//                       setGenders((prev) => [...prev, gender]);
//                     }}
//                     className="w-full text-start"
//                   >
//                     Add {gender}
//                   </Button>
//                 </div>
//               </CommandEmpty>
//               {/* What we see in the dropdown */}
//               <CommandGroup>
//                 {genders.map((gender) => (
//                   <CommandItem
//                     value={gender}
//                     key={gender}
//                     onSelect={() => {
//                       form.setValue("gender", gender);
//                     }}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         gender === field.value ? "opacity-100" : "opacity-0",
//                       )}
//                     />
//                     {gender}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </Command>
//           </PopoverContent>
//         </Popover>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// );
