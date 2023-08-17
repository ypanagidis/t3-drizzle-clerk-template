import { AddNewUserFormDialog } from "~/components/addNewUserForn";
import { api } from "~/utils/api";

export default function Home() {
  const users = api.users.getAll.useQuery();

  if (!users.data) return <h1>No Data</h1>;
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
      <div className="flex flex-col items-start justify-center space-y-5">
        {users.data.map((user) => (
          <h1 key={user.id}>
            {user.firstName} {user.lastName}
          </h1>
        ))}
        <div>{/* <AddNewUserForm /> */}</div>
        <AddNewUserFormDialog />
      </div>
    </div>
  );
}
