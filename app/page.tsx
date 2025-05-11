"use server";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/ironSession";

export default async function HomePage() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  } else {
    redirect('/login')
  }
}
