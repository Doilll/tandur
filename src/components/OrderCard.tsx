"use client";

export default function OrderCard({produk}: {produk: any}) {
  return (
    <div className="sticky top-24 border p-4 rounded-lg bg-white shadow-md">
      <div className="text-2xl font-bold text-green-700 mb-2">
        Rp{produk.harga.toLocaleString("id-ID")}{" "}
        <span className="text-sm font-normal text-slate-500">
          / {produk.satuan}
        </span>
      </div>
      <button
        onClick={() => {
          // Bisa arahkan ke WhatsApp
          window.open(
            `https://wa.me/6281234567890?text=Saya tertarik dengan ${produk.nama}`,
            "_blank"
          );
        }}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        Pesan via WhatsApp
      </button>
    </div>
  );
}
