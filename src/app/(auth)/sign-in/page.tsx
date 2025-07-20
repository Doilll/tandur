import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GoogleSignInButton } from "./GoogleSigninButton";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-50">
      {/* Opsional: Tambahkan sentuhan visual yang berhubungan dengan pertanian */}
      <div className="absolute inset-0 z-0 opacity-32">
        <Image
          src="/favicon.png" // Ganti dengan gambar pattern/ilustrasi
          alt="Pattern Pertanian"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="shadow-lg bg-white border-slate-200">
          <CardHeader className="text-center space-y-2">
            <Link href="/" className="inline-block mx-auto">
              <Image
                src="/favicon.png"
                alt="Logo Tandur"
                width={48}
                height={48}
              />
            </Link>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Selamat Datang!
            </CardTitle>
            <CardDescription>
              Masuk untuk mulai mendukung petani lokal kita.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <GoogleSignInButton />
          </CardContent>
          <CardFooter className="flex justify-center text-center text-sm">
            <p className="text-slate-500">
              Dengan masuk, Anda menyetujui
              <br />
              <Link
                href="/syarat-ketentuan"
                className="underline hover:text-green-600"
              >
                Syarat & Ketentuan
              </Link>{" "}
              kami.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
