// api/farming-update/route.ts

import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const updates = await prisma.farmingUpdate.findMany({
      select: {
        id: true,
        createdAt: true,
        judul: true,
        deskripsi: true,
        fotoUrl: true,
        proyekTani: {
          select: {
            id: true,
            namaProyek: true,
            petani: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error("Error fetching farming updates:", error);
    return NextResponse.json(
      { message: "Gagal mengambil pembaruan pertanian" },
      { status: 500 }
    );
  }
}
