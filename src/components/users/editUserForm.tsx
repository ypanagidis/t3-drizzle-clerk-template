import { type Dispatch, type SetStateAction } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";

import { AddNewUserForm } from "./addNewUserForn";
import type { UserFromAllUsers } from "~/utils/types";

type EditUserFormProps = {
  user: Omit<UserFromAllUsers, "createdAt" | "updatedAt">;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export const EditUserForm = ({
  user,
  openDialog,
  setOpenDialog,
}: EditUserFormProps) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent onPointerDownOutside={() => void setOpenDialog(false)}>
        <DialogTitle>Edit A User</DialogTitle>
        {/* <DialogTrigger className="w-full"></DialogTrigger> */}
        <DialogDescription>
          <AddNewUserForm
            inDialog={true}
            setOpen={setOpenDialog}
            defaulValues={{ ...user, age: user.age.toString() }}
            userId={user.id}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
