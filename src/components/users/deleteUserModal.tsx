import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";

type DeleteUserModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  userId: number;
};

export const DeleteUserModal = ({
  openModal,
  setOpenModal,
  userId,
}: DeleteUserModalProps) => {
  const contex = api.useContext();
  const deleteUser = api.users.deleteUser.useMutation({
    onSettled: async () => {
      setOpenModal(false);
      await contex.users.getAll.invalidate();
    },
  });

  const handleDeleteUser = () => {
    deleteUser.mutate({ userId: userId });
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this user
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Continue
          </AlertDialogAction> */}
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => void handleDeleteUser()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
