import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params : {id: string}}) {
    const { id } = params;
    const produk = await prisma.produk.findUnique({
        where: {
            id: id,
        },
    })
    if (!produk) {
        return NextResponse.json({
            message: "Produk tidak ditemukan",
        }, { status: 404 });
    }
    return NextResponse.json({
        message: "Berhasil mengambil data produk",
        data: produk,
    }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params : {id: string}}) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { namaProduk, deskripsi, harga, fotoUrl, proyekTaniId, unit, stokTersedia } = body;

    const produk = await prisma.produk.update({
        where: { id: id },
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

    return NextResponse.json({
        message: "Produk berhasil diperbarui",
        data: produk,
    }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params : {id: string}}) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { id } = params;

    const produk = await prisma.produk.delete({
        where: { id: id },
    });

    return NextResponse.json({
        message: "Produk berhasil dihapus",
        data: produk,
    }, { status: 200 });
}


