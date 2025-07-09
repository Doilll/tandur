import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

type ProdukDetail = {
  id: string;
  namaProduk: string;
  deskripsi: string;
  fotoUrl: string[];
  harga: number;
  unit: string;
  stokTersedia: number;
  proyekTani: {
    lokasiLahan: string;
    petani: {
      name: string;
      lokasi: string;
      linkWhatsapp: string;
    };
  };
};

function formatToPhone(linkWhatsapp: string): string {
  const match = linkWhatsapp.match(/(?:\+62|62|0)?(\d+)/);
  return match ? `62${match[1]}` : "";
}

// async function getProduk(id: string): Promise<ProdukDetail | null> {
//   try {
//     const res = await fetch(`http://localhost:3000/api/produk/${id}`, {
//       cache: "no-store",
//     });
//     const data = await res.json();
//     return data.data;
//   } catch {
//     return null;
//   }
// }

export default async function ProdukDetailPage(/**{
  params,
}: {
  params: { id: string };
}**/) {
//   const produk = await getProduk(params.id);

//   if (!produk) return notFound();

//   const petani = produk.proyekTani.petani;
    const produk: ProdukDetail = {
        id: "1",
        namaProduk: "Beras Organik",
        deskripsi: "Beras organik berkualitas tinggi tanpa pestisida.",
        fotoUrl: [
        "https://example.com/beras1.jpg",
        "https://example.com/beras2.jpg",
        ],
        harga: 150000,
        unit: "kg",
        stokTersedia: 100,
        proyekTani: {
        lokasiLahan: "Desa Tani, Jawa Barat",
        petani: {
            name: "Budi Santoso",
            lokasi: "Jawa Barat",
            linkWhatsapp: "+6281234567890",
        },
        },
    };
    
    const petani = produk.proyekTani.petani;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Foto Produk */}
        <div className="space-y-4">
          {produk.fotoUrl.map((url, i) => (
            <div
              key={i}
              className="relative w-full h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={url}
                alt={`Foto ${produk.namaProduk}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Info Produk */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {produk.namaProduk}
          </h1>
          <p className="text-slate-500 mt-1">
            oleh {petani.name} - {petani.lokasi}
          </p>

          <p className="text-2xl font-bold text-green-600 mt-4">
            Rp{produk.harga.toLocaleString("id-ID")} / {produk.unit}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Stok Tersedia: {produk.stokTersedia} {produk.unit}
          </p>

          <p className="text-slate-700 mt-6 leading-relaxed">
            {produk.deskripsi}
          </p>

          <div className="mt-8">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 w-full text-white"
            >
              <a
                href={`https://wa.me/${formatToPhone(
                  petani.linkWhatsapp
                )}?text=${encodeURIComponent(
                  `Halo ${petani.name}, saya tertarik dengan produk *${produk.namaProduk}*. Bisa dibantu proses pesanannya?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pesan via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
