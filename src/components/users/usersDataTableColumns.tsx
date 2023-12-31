import type { ColumnDef, Row } from "@tanstack/react-table";
import type { UserFromAllUsers } from "~/utils/types";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { EditUserForm } from "./editUserForm";
import { DeleteUserModal } from "./deleteUserModal";

export const usersDataTableColumns: Array<ColumnDef<UserFromAllUsers>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    maxSize: 5,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    // minSize: 50,
  },
  {
    accessorKey: "lastName",
    // header: "Last Name",
    header: () => <p className="">Last Name</p>,
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <div className="r items-cente flex">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="resize"
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => <ActionDropDown row={row} />,
    enableResizing: false,
    enableHiding: false,
    // header: ({}) => <span>Actions</span>,
  },
];

type ActionDropDownProps = {
  row: Row<UserFromAllUsers>;
};

const ActionDropDown = ({ row }: ActionDropDownProps) => {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const user = row.original;

  const handleShowEditUser = () => {
    setOpenEditUserModal(true);
  };

  if (openEditUserModal)
    return (
      <EditUserForm
        user={user}
        openDialog={openEditUserModal}
        setOpenDialog={setOpenEditUserModal}
      />
    );

  if (openDeleteUserModal)
    return (
      <DeleteUserModal
        openModal={openDeleteUserModal}
        setOpenModal={setOpenDeleteUserModal}
        userId={user.id}
      />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center">
          <Button variant="ghost" className=" ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => void navigator.clipboard.writeText(user.id.toString())}
        >
          Copy User Id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View User Card</DropdownMenuItem>
        <DropdownMenuItem onClick={() => void handleShowEditUser()}>
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void setOpenDeleteUserModal(true)}>
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
