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
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Nama Produk dan Harga */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          {produk.namaProduk}
        </h1>
        <p className="text-slate-600 mt-1 text-sm">
          oleh {petani.name} - {petani.lokasi}
        </p>
        <p className="text-2xl font-semibold text-green-600 mt-2">
          Rp{produk.harga.toLocaleString("id-ID")} / {produk.unit}
        </p>
      </div>

      {/* Galeri Gaya Airbnb */}
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 overflow-hidden rounded-lg mb-8 h-[400px]">
        {/* Foto utama */}
        <div className="sm:col-span-2 sm:row-span-2 relative">
          <img
            src={produk.fotoUrl[0]}
            alt="Foto utama"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Foto tambahan */}
        {produk.fotoUrl.slice(1, 5).map((url: string, i: number) => (
          <div className="relative" key={i}>
            <img
              src={url}
              alt={`Foto ${i + 2}`}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Deskripsi & Detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Deskripsi Produk</h2>
          <p className="text-slate-700 leading-relaxed">{produk.deskripsi}</p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm space-y-4 h-fit">
          <p className="text-sm text-slate-500">
            Stok tersedia: {produk.stokTersedia} {produk.unit}
          </p>

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
  );
}
