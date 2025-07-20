import prisma from "@/lib/prisma";
import FarmerPortfolio from "@/components/FarmerPortofolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const getPetaniData = async (username: string) => {
  try {
    const petani = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true, // URL of the profile picture
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
            status: true,
            updates: {
              select: {
                id: true,
                fotoUrl: true, // array of image URLs
              },
            },
            produk: {
              select: {
                id: true,
                namaProduk: true,
                harga: true,
                unit: true,
                fotoUrl: true, // array of image URLs
              },
            },
          },
        },
      },
    });

    if (!petani) {
      throw new Error("Petani tidak ditemukan");
    }

    return petani;
  } catch (error) {
    console.error("Error fetching petani data:", error);
    throw error;
  }
};

export default async function ProfilPetaniPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const petani = await getPetaniData(username);

  return (
    <>
      <Navbar />
      <FarmerPortfolio petani={petani} />
      <Footer />
    </>
  );
}
