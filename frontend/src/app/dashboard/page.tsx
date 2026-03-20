import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Task 2 MVP navigation: landing on /dashboard should show patient list.
  redirect("/dashboard/patients");
}

