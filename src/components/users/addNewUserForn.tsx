import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormLabel } from "../ui/form";
import { api } from "~/utils/api";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { type Dispatch, type SetStateAction, useState } from "react";
import { FormInput } from "../ui/formInput";
import { FromComboBox } from "../ui/ComboboxForm";

//Form Schema
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

//Form Schema Type
type FValues = z.infer<typeof formSchema>;

type AddNewUserFormProps = {
  inDialog?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  defaulValues?: FValues;
  userId?: number;
};

export const AddNewUserForm = ({
  setOpen,
  defaulValues,
  userId,
}: AddNewUserFormProps) => {
  //State and hooks
  const ctx = api.useContext();
  const [genders, setGenders] = useState(["Male", "Female", "Non-Binary"]);

  //API Mutation
  const addUser = api.users.addUser.useMutation({
    async onSuccess() {
      console.log("user added");
      await ctx.users.getAll.invalidate();
      form.reset();
      setOpen && setOpen(false);
    },
  });

  //Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaulValues ?? {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
    },
  });

  // Submit handler.
  const onSubmit = form.handleSubmit((data) => {
    try {
      const age = parseInt(data.age);
      addUser.mutate({ ...data, age: age, id: userId });
    } catch (_) {
      form.setError("age", { message: "Age needs to be a number" });
    }
  });

  return (
    <Form {...form}>
      <div className="space-y-5 text-gray-100">
        <FormInput<FValues>
          name="firstName"
          control={form.control}
          placeholder="First Name"
          label="First Name"
        />
        <FormInput<FValues>
          name="lastName"
          control={form.control}
          placeholder="Last Name"
          label="Last Name"
        />
        <FormInput<FValues>
          name="age"
          control={form.control}
          placeholder="Age"
          label="Age"
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
        <Button onClick={() => void onSubmit()} className="w-full">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export const AddNewUserFormDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full">Add A New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add A New User</DialogTitle>
        <DialogDescription>
          <AddNewUserForm inDialog={true} setOpen={setOpen} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
