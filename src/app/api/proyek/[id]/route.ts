import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const proyek = await prisma.proyekTani.findUnique({
            where: { id },
            include: {
                petani: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                produk: true,
            },
        });

        if (!proyek) {
            return NextResponse.json({ message: "Proyek tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ proyek }, { status: 200 });
    } catch (error) {
        console.error("Error GET /api/proyek/[id]:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { namaProyek, deskripsi, lokasiLahan } = body;

    try {
        const proyek = await prisma.proyekTani.update({
            where: { id },
            data: {
                namaProyek,
                deskripsi,
                lokasiLahan,
            },
        });

        return NextResponse.json({ proyek }, { status: 200 });
    } catch (error) {
        console.error("Error PUT /api/proyek/[id]:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    try {
        const proyek = await prisma.proyekTani.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Proyek berhasil dihapus", proyek }, { status: 200 });
    } catch (error) {
        console.error("Error DELETE /api/proyek/[id]:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

