"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-60 justify-center items-center flex mx-auto"
      variant="outline"
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        <>
          <Image
            src="/images/google.png"
            alt="Google"
            width={25}
            height={25}
            className="mr-2"
          />
          <span>Masuk dengan Google</span>
        </>
      )}
    </Button>
  );
}
