import prisma from "@/lib/prisma";

export async function getAllProduk() {
  return await prisma.produk.findMany();
}
