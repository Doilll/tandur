import OrderCard from "@/components/OrderCard";

export default function DetailProdukPage() {

  // Dummy data
  const produk = {
    id: "1",
    nama: "Vanili Kering Premium",
    harga: 120000,
    satuan: "100 gram",
    deskripsi: `Vanili kering berkualitas tinggi hasil panen dari petani lokal di kawasan Lembang. Dikeringkan secara alami selama 3 bulan.`,
    gambar: [
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    proyek: {
      id: "p001",
      namaProyek: "Curing Vanili Lembang",
      petani: {
        nama: "Pak Darmuji Snarek",
        lokasi: "Lembang, Jawa Barat",
        foto: "https://placehold.co/600x400.png",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Judul dan Gambar */}
      <h1 className="text-3xl font-bold text-slate-800">{produk.nama}</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {produk.gambar.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gambar ${idx + 1}`}
            width={600}
            height={400}
            className="rounded-xl object-cover w-full h-64"
          />
        ))}
      </div>

      {/* Konten utama */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kiri - Deskripsi */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Deskripsi Produk</h2>
          <p className="text-slate-600 leading-relaxed">{produk.deskripsi}</p>

          {/* Proyek Asal */}
          <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-slate-800 text-lg mb-2">
              Dari Proyek:
            </h3>
            <p className="text-slate-700 font-medium">{produk.proyek.namaProyek}</p>

            {/* Info Petani */}
            <div className="mt-3 flex items-center gap-4">
              <img
                src={produk.proyek.petani.foto}
                alt="Petani"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-slate-800 font-semibold">{produk.proyek.petani.nama}</p>
                <p className="text-slate-500 text-sm">{produk.proyek.petani.lokasi}</p>
              </div>
            </div>
          </div>
        </div>

        <OrderCard produk={produk} />
      </div>
    </div>
  );
}
