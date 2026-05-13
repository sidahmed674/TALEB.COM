import { redirect } from "next/navigation";

// Taleb AI is served as static HTML from the /public directory.
// The root path simply redirects to the static homepage.
export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/index.html");
}
