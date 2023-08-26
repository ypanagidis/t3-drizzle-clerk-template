import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormLabel,
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
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const age = parseInt(data.age);
      await addUser.mutateAsync({ ...data, age: age });
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
      <Button onClick={() => void onSubmit()} className="w-full">
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
          name="gender"
          rules={{
            required: {
              message: "You have to provide an age",
              value: true,
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Gender" {...field} />
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
