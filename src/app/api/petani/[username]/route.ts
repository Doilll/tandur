import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;

    try {
        const petani = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                image: true,
                bio: true,
                lokasi: true,
                linkWhatsapp: true,
                role: true,
                proyekTani: {
                    select: {
                        id: true,
                        namaProyek: true,
                        deskripsi: true,
                        lokasiLahan: true,
                    }
                }
            },
        });

        if (!petani) {
            return NextResponse.json({ message: "Petani tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ data: petani }, { status: 200 });
    } catch (err) {
        console.error("GET /api/petani/[username] error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
    
}

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'PETANI') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { username } = params;
    const body = await request.json();
    const { name, bio, lokasi, linkWhatsapp } = body;

    try {
        const petani = await prisma.user.update({
            where: { username },
            data: {
                name,
                bio,
                lokasi,
                linkWhatsapp,
            },
        });

        return NextResponse.json({ data: petani }, { status: 200 });
    } catch (error) {
        console.error("Error PUT /api/petani/[username]:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}