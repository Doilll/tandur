// app/api/produk/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    const produks = await prisma.produk.findMany({
      where: {
        namaProduk: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 30,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        namaProduk: true,
        harga: true,
        unit: true,
        fotoUrl: true,
        proyekTani: {
          select: {
            petani: {
              select: {
                name: true,
                lokasi: true,
                linkWhatsapp: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(produks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
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
  const {
    namaProduk,
    deskripsi,
    harga,
    fotoUrl,
    proyekTaniId,
    unit,
    stokTersedia,
  } = body;

  const produk = await prisma.produk.create({
    data: {
      namaProduk,
      deskripsi,
      harga,
      fotoUrl,
      unit,
      stokTersedia,
      proyekTani: {
        connect: { id: proyekTaniId },
      },
    },
  });

  return NextResponse.json({ produk }, { status: 201 });
}
