import { AddNewUserFormDialog } from "~/components/users/addNewUserForn";
import { ModeToggle } from "~/components/ui/modeToggle";
import { usersDataTableColumns } from "~/components/users/usersDataTableColumns";
import { UserDataTableResizable } from "~/components/users/usersResizableTable";
import { api } from "~/utils/api";
import { Nav } from "~/components/nav/Nav";

export default function Home() {
  const users = api.users.getAll.useQuery();

  if (!users.data) return <h1>No Data</h1>;
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-between space-y-5 ">
      <Nav />
      <div className="my-auto min-w-[70%] max-w-[70%] py-10">
        {/* <UsersDataTable columns={usersDataTableColumns} data={users.data} /> */}
        <UserDataTableResizable
          columns={usersDataTableColumns}
          data={users.data}
        />
      </div>

      <div className="flex flex-col items-center justify-between space-y-5">
        <AddNewUserFormDialog />
        <ModeToggle />
      </div>
    </div>
  );
}
