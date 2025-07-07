import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const produk = await prisma.produk.findMany({
        select: {
            id: true,
            namaProduk: true,
            deskripsi: true,
            harga: true,
            fotoUrl: true,
            proyekTani: {
                select: {
                    lokasiLahan: true,
                    petani: {
                        select: {
                            name: true,
                        }
                    }
                },
            },
        }
    })
    return NextResponse.json({
        message: "Berhasil mengambil data produk",
        data: produk,
    }, {status: 200});
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 });
    }

    const body = await request.json();
    const { namaProduk, deskripsi, harga, fotoUrl, proyekTaniId, unit, stokTersedia } = body;

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

    return NextResponse.json({produk}, { status: 201 });
}

