'use client'

import { useState } from "react";
import { useCookies } from "react-cookie";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = ({ className }: { className?: string }) => {
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const [, , removeCookie] = useCookies(['token']);
  const router = useRouter()

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSigningOut(true);
    removeCookie('token');
    router.push('/signin')
  };

  return (
    <Button onClick={handleSignOut} className={className}>
      {signingOut ? <Spinner /> : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;
