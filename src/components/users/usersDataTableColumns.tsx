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
    // header: ({}) => <span>Actions</span>,
  },
];

type ActionDropDownProps = {
  row: Row<UserFromAllUsers>;
};

const ActionDropDown = ({ row }: ActionDropDownProps) => {
  const user = row.original;

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
        <DropdownMenuItem>Delete User</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
