// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/actions/auth";
// import ProfileClient from "@/components/profile-client.tsx";

export default async function ProfilePage() {
  // This is a server component that fetches the user data
  // const user = await getCurrentUser();

  // // If there's no authenticated user, redirect to login
  // if (!user) {
  //   redirect("/login");
  // }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* Pass user data to the client component */}
      {/* <ProfileClient user={user} /> */}
    </div>
  );
}
