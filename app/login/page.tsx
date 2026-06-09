import LoginContent from "./loginContent"
import getUsers from "./data"

export const metadata = {
  title: "Login | O2H Official Site",
}

export default async function LoginPage() {
  const users = await getUsers();

  return <LoginContent users={users} />
}