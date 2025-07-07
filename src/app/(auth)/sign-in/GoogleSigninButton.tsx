"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

// Komponen Ikon Google (SVG) agar tidak perlu install library ikon tambahan
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.93 0 3.38.73 4.4 1.69l2.5-2.5C18.16 3.13 15.66 2 12.48 2 7.43 2 3.23 6.19 3.23 11.23s4.2 9.23 9.25 9.23c2.97 0 5.42-1 7.2-2.73 1.79-1.73 2.5-4.25 2.5-6.82 0-.54-.05-.99-.12-1.42H12.48z" />
  </svg>
);

// Komponen Ikon Spinner untuk loading
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
    // Redirect ke halaman dashboard setelah berhasil login
    await signIn("google", { callbackUrl: "/" });
    // Tidak perlu setIsLoading(false) karena halaman akan redirect
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className="w-full"
      variant="outline"
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        <>
          <GoogleIcon className="mr-2 h-4 w-4" />
          <span>Masuk dengan Google</span>
        </>
      )}
    </Button>
  );
}
