// /api/auth/session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const role = session.user.role;

  return new Response(JSON.stringify({ role }), { status: 200 });
}
