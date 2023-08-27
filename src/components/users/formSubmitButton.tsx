import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

type FormSubmitButtonProps = {
  submitHandler: () => void;
  inDialog: boolean | undefined;
  isFormValid: boolean;
};

export const FormSubmitButton = ({
  inDialog,
  isFormValid,
  submitHandler,
}: FormSubmitButtonProps) => {
  return inDialog && isFormValid ? (
    <DialogClose className="w-full" asChild={true}>
      <Button onClick={() => void submitHandler()} className="w-full">
        Submit
      </Button>
    </DialogClose>
  ) : (
    <Button onClick={() => void submitHandler()} className="w-full ">
      Submit
    </Button>
  );
};
