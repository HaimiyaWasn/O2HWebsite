import RegisterContent from "./client";
import getUsers from "./data";

export const metadata = {
  title: "Register | O2H Official Site",
}

export default async function RegisterPage() {
  const users = await getUsers();

  return <RegisterContent users={users} />
}