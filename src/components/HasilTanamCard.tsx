
type Props = {
  fotoUrl: string
  deskripsi: string
  jenisTanam: string
  jumlahKg: number
  tanggalPanen: string
  petaniName?: string
}

export default function HasilTanamCard({
  fotoUrl,
  deskripsi,
  jenisTanam,
  jumlahKg,
  tanggalPanen,
  petaniName,
}: Props) {
  const formattedDate = new Date(tanggalPanen).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-soil shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition w-full">
      <img
        src={fotoUrl}
        alt={jenisTanam}
        className="h-32 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-leaf capitalize">{jenisTanam}</h2>
        <p className="text-gray-600 text-sm">{deskripsi}</p>

        <div className="flex justify-between text-sm text-gray-500 pt-2 border-t mt-2">
          <span>{jumlahKg} kg</span>
          <span>{formattedDate}</span>
        </div>

        {petaniName && (
          <p className="text-xs text-right text-gray-400 italic mt-1">
            oleh {petaniName}
          </p>
        )}
      </div>
    </div>
  )
}
