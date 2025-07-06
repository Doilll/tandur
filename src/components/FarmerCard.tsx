import Image from "next/image";


const FarmerCard = ({ farmer }: { farmer: any }) => (
  <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
    <div className="relative mx-auto mb-4 h-24 w-24">
      <Image
        src={farmer.imageUrl}
        alt={farmer.name}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-full"
      />
    </div>
    <h3 className="text-xl font-bold text-slate-900">{farmer.name}</h3>
    <p className="text-md text-slate-600">{farmer.lokasi}</p>
    <p className="mt-2 text-sm text-slate-500 italic">"{farmer.bio}"</p>
  </div>
);

export default FarmerCard;