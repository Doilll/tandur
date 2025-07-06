import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, Leaf, ShieldCheck, Users, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FarmerCard from "@/components/FarmerCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const dummyProduk = [
    {
      id: "1",
      name: "Cabai Rawit Merah",
      price: 55000,
      unit: "kg",
      imageUrl: "/images/cabai.jpg",
      petani: { name: "Pak Budi", lokasi: "Lembang" },
    },
    {
      id: "2",
      name: "Tomat Ceri Organik",
      price: 25000,
      unit: "kg",
      imageUrl: "/images/tomat.jpg",
      petani: { name: "Ibu Siti", lokasi: "Pangalengan" },
    },
    {
      id: "3",
      name: "Bayam Hidroponik",
      price: 15000,
      unit: "ikat",
      imageUrl: "/images/bayam.jpg",
      petani: { name: "Mas Agung", lokasi: "Ciwidey" },
    },
    {
      id: "4",
      name: "Kentang Dieng",
      price: 18000,
      unit: "kg",
      imageUrl: "/images/kentang.jpg",
      petani: { name: "Kang Ujang", lokasi: "Dieng" },
    },
  ];

  const dummyPetani = [
    {
      id: "1",
      name: "Pak Budi Santoso",
      lokasi: "Lembang, Jawa Barat",
      imageUrl: "/images/petani1.jpg",
      bio: "Menanam dengan hati, untuk hasil tani yang menyehatkan.",
    },
    {
      id: "2",
      name: "Ibu Siti Aminah",
      lokasi: "Pangalengan, Jawa Barat",
      imageUrl: "/images/petani2.jpg",
      bio: "Kualitas adalah janji dari lahan kami kepada Anda.",
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-background.jpg"
              alt="Lahan pertanian yang subur"
              fill
              style={{ objectFit: "cover" }}
              className="scale-110"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <div className="relative z-20 text-center text-white px-4 max-w-5xl">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Dari Lahan, Langsung ke Tangan Anda.
            </h1>
            <p
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed"
              style={{ fontFamily: "mona-sans" }}
            >
              Dukung petani lokal mendapatkan harga yang adil. Nikmati hasil
              tani segar berkualitas dengan cerita yang transparan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                asChild
              >
                <Link href="#produk">
                  Jelajahi Hasil Tani <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#tentang">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="tentang"
          className="py-20 bg-slate-50"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mewujudkan Kesejahteraan Petani
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
              Kami memotong rantai pasok yang tidak adil, menghubungkan Anda
              langsung dengan pahlawan pangan Indonesia.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Harga Adil</h3>
                <p className="mt-2 text-slate-500">
                  Petani menentukan harganya sendiri. Keuntungan maksimal
                  kembali ke mereka, bukan tengkulak.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  Kualitas Terjamin
                </h3>
                <p className="mt-2 text-slate-500">
                  Dapatkan produk paling segar langsung dari sumbernya, dipanen
                  sesaat sebelum dikirim.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  Transparansi Penuh
                </h3>
                <p className="mt-2 text-slate-500">
                  Ikuti perjalanan tanam lewat update rutin dari petani. Anda
                  tahu persis apa yang Anda konsumsi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="produk"
          className="py-20 bg-white"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl">
              Panen Terbaru dari Petani Hebat
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-slate-600">
              Pesan sekarang atau pre-order untuk panen berikutnya. Kesegaran
              terjamin!
            </p>
            <div className="relative mt-8 max-w-md mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dummyProduk.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/semua-produk">Lihat Semua Produk</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-slate-50"
          style={{ fontFamily: "mona-sans" }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl">
              Kenali Pahlawan Pangan Kita
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {dummyPetani.map((farmer) => (
                <FarmerCard key={farmer.id} farmer={farmer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
