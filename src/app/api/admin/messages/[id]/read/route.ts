import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.csMessage.update({
      where: { id: params.id },
      data: { status: "READ" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark as read error:", error);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}
