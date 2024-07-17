import SignOutButton from "@/components/sign-out-button";
import Greeting from '@/components/greeting';
import UserInfo from "@/components/user-info";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <Greeting />
      <UserInfo />
      <SignOutButton />
    </main>
  );
}
