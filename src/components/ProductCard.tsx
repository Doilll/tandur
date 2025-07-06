import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const ProductCard = ({ product }: { product: any }) => (
  <div className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
    <Link href={`/produk/${product.id}`} className="block">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
        <p className="text-sm text-slate-500">
          oleh {product.petani.name} - {product.petani.lokasi}
        </p>
        <p className="mt-2 text-lg font-bold text-green-600">
          Rp{product.price.toLocaleString("id-ID")} / {product.unit}
        </p>
      </div>
    </Link>
    <div className="px-4 pb-4">
      <Button asChild className="w-full">
        <Link href={`/produk/${product.id}`}>Lihat Detail</Link>
      </Button>
    </div>
  </div>
);

export default ProductCard;