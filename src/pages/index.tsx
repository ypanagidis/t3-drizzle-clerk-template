import { api } from "~/utils/api";

export default function Home() {
  const users = api.users.getAll.useQuery();

  if (!users.data) return <h1>No Data</h1>;
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {users.data.map((user) => (
        <h1 key={user.id}>
          {user.firstName} {user.lastName}
        </h1>
      ))}
    </div>
  );
}
