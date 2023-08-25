import { AddNewUserFormDialog } from "~/components/addNewUserForn";
import { ModeToggle } from "~/components/ui/modeToggle";
// import { UsersDataTable } from "~/components/users/usersDataTable";
import { usersDataTableColumns } from "~/components/users/usersDataTableColumns";
import { UserDataTableResizable } from "~/components/users/usersResizableTable";
import { api } from "~/utils/api";

export default function Home() {
  const users = api.users.getAll.useQuery();

  if (!users.data) return <h1>No Data</h1>;
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-normal space-y-5">
      <div className="my-auto min-w-[70%] max-w-[70%] py-10">
        {/* <UsersDataTable columns={usersDataTableColumns} data={users.data} /> */}
        <UserDataTableResizable
          columns={usersDataTableColumns}
          data={users.data}
        />
      </div>

      <div className="">
        <AddNewUserFormDialog />
      </div>
      <ModeToggle />
    </div>
  );
}
