'use client'

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

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

  useEffect(() => {
    const message = sessionStorage.getItem('loginMessage');
    if (message) {
        toast({
            title: "Success",
            description: message,
          })
        sessionStorage.removeItem('loginMessage');
      }
    }, []);

  return (
    <Button onClick={handleSignOut} className={className}>
      {signingOut ? <Spinner /> : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;
