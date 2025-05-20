import { auth } from "@/auth/auth";
import Link from "next/link";

async function Admin() {
  const session = await auth();
  return (
    <div>
      <h2>Admin</h2>
      <div>
        {session ? (
          <p>Hola, {session.user?.email}</p>
        ) : (
          <p>No has iniciado sesión</p>
        )}
      </div>
      <Link
        className="bg-slate-400 p-3 rounded-lg text-white hover:bg-slate-500 inline-block"
        href="/dashboard/customers"
      >
        customers
      </Link>
    </div>
  );
}

export default Admin;
