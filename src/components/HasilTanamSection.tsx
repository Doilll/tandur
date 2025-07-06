import HasilTanamCard from './HasilTanamCard'

const dummyData = [
  {
    fotoUrl: '/panen-cabe.jpg',
    deskripsi: 'Cabe rawit organik dari lahan pegunungan',
    jenisTanam: 'Cabe Rawit',
    jumlahKg: 34,
    tanggalPanen: '2025-06-12T00:00:00.000Z',
    petaniName: 'Pak Budi',
  },
  {
    fotoUrl: '/panen-sawi.jpg',
    deskripsi: 'Sawi hijau bebas pestisida',
    jenisTanam: 'Sawi Hijau',
    jumlahKg: 20,
    tanggalPanen: '2025-06-25T00:00:00.000Z',
    petaniName: 'Bu Rini',
  },
  {
    fotoUrl: '/panen-tomat.jpg',
    deskripsi: 'Tomat merah segar siap jual',
    jenisTanam: 'Tomat',
    jumlahKg: 15,
    tanggalPanen: '2025-07-01T00:00:00.000Z',
    petaniName: 'Mas Joko',
  },
]

export default function HasilTanamSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-earth">Hasil Panen Petani</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {dummyData.map((hasil, i) => (
          <HasilTanamCard key={i} {...hasil} />
        ))}
      </div>
    </section>
  )
}
