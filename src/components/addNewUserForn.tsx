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
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
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
    },
  });

  // 2. Define a submit handler.
  const onSubmit = form.handleSubmit((data) => {
    addUser.mutate({ ...data });
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
      <div className="space-y-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="">
              {/* <FormLabel>Username</FormLabel> */}
              <div className="">
                <FormControl>
                  <Input placeholder="First Name" {...field} />
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
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input placeholder="Last Name" {...field} />
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
