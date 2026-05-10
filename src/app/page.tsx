import { redirect } from "next/navigation";

export default function RootPage() {
  // For Wave 1 demo, root redirects directly into the candidate dashboard.
  // In production, this becomes the marketing landing page.
  redirect("/dashboard");
}
