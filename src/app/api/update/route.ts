// app/api/update/route.ts

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const farmingUpdate = await prisma.farmingUpdate.findMany({
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      fotoUrl: true,
      proyekTani: {
        select: {
          namaProyek: true,
          lokasiLahan: true,
          petani: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(
    {
      message: "Berhasil mengambil data update pertanian",
      data: farmingUpdate,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "PETANI") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { judul, deskripsi, fotoUrl, proyekTaniId } = body;

  const farmingUpdate = await prisma.farmingUpdate.create({
    data: {
      judul,
      deskripsi,
      fotoUrl,
      proyekTani: {
        connect: { id: proyekTaniId },
      },
    },
  });

  return NextResponse.json({ farmingUpdate }, { status: 201 });
}
