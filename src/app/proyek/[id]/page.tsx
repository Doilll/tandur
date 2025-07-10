import prisma from "@/lib/prisma";

const getProyekDetail = async (id: string) => {
  try {
    const proyek = await prisma.proyekTani.findUnique({
      where: { id },
      select: {
        id: true,
        namaProyek: true,
        deskripsi: true,
        lokasiLahan: true,
        status: true, // default: "PERSIAPAN"
        petani: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true, // URL of the profile picture
            lokasi: true,
            linkWhatsapp: true,
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
        fase: {
            select: {
                id: true,
                nama: true,
                cerita: true,
                gambar: true, // array of image URLs
                urutan: true,
                slug: true,
            },
        },
        updates: {
          select: {
            id: true,
            judul: true,
            fotoUrl: true, // array of image URLs
            deskripsi: true,
            createdAt: true,
          },
        },
      },
    });

    if (!proyek) {
      throw new Error("Proyek tidak ditemukan");
    }

    return proyek;
  } catch (error) {
    console.error("Error fetching proyek data:", error);
    throw error;
  }
}


export default async function ProyekDetail({params}: {params: {id: string}}) {

}