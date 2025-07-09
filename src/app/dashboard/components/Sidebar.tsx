// src/app/(dashboard)/components/Sidebar.tsx
"use client"; // Diperlukan untuk usePathname (mendeteksi halaman aktif)

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Leaf, Package, Settings, LogOut } from "lucide-react";

type UserProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Proyek Saya", href: "/dashboard/proyek", icon: Leaf },
  { label: "Produk", href: "/dashboard/produk", icon: Package },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
];

export default function Sidebar({ user }: UserProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      {/* Header Sidebar: Logo/Nama Aplikasi */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-slate-800"
        >
          <Leaf className="h-6 w-6 text-green-600" />
          <span>TaniMaju</span>
        </Link>
      </div>

      {/* Profil Petani */}
      <div className="flex flex-col items-center gap-4 p-6">
        <Image
          src={user.image}
          alt={`Foto profil ${user.name}`}
          width={200}
          height={200}
          className="rounded-4xl"
        />
        <div>
          <h3 className="font-semibold text-xl text-slate-800">{user.name}</h3>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex-grow px-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Sidebar: Logout */}
      <div className="mt-auto p-4 border-t border-slate-200">
        <button className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
