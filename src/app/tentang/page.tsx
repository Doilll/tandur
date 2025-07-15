import {
  Leaf,
  Target,
  Box,
  TrendingUp,
  Users,
  ShieldCheck,
  Heart,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Tentang Tandur
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Menghubungkan langsung petani dengan konsumen untuk menciptakan
            sistem pertanian yang lebih adil dan transparan
          </p>
        </div>

        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Tujuan Platform
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Tandur adalah platform digital revolusioner yang menghubungkan
                petani dengan konsumen akhir secara langsung, menghilangkan
                kebutuhan akan perantara tradisional seperti tengkulak atau
                koperasi konvensional.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <p className="text-gray-700">
                    <strong>Petani memperoleh harga lebih adil</strong> - Tanpa
                    potongan tengkulak yang bisa mencapai 40-60% dari harga jual
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <p className="text-gray-700">
                    <strong>Konsumen mendapatkan produk segar</strong> -
                    Langsung dari sumbernya dengan jejak produksi yang jelas
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">•</span>
                  <p className="text-gray-700">
                    <strong>Rantai pasok transparan</strong> - Dari kebun
                    langsung ke meja makan tanpa misteri di antaranya
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/farmer-market.jpg"
                alt="Petani menjual langsung ke konsumen"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <Box className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Cara Kerja Platform
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Kami menyediakan alat sederhana namun powerful bagi petani dan
                konsumen untuk berinteraksi langsung.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  icon={<Users className="w-6 h-6 text-green-600" />}
                  title="Untuk Petani"
                  features={[
                    "Buat profil usaha tani profesional",
                    "Upload produk dengan foto kualitas tinggi",
                    "Kelola harga dan stok secara real-time",
                    "Terima pesanan via WhatsApp langsung",
                    "Bangun reputasi dengan ulasan konsumen",
                  ]}
                />
                <FeatureCard
                  icon={<Heart className="w-6 h-6 text-green-600" />}
                  title="Untuk Konsumen"
                  features={[
                    "Telusuri produk lokal dari berbagai daerah",
                    "Lihat profil lengkap petani",
                    "Chat langsung via WhatsApp untuk order",
                    "Dapatkan produk segar tanpa perantara",
                    "Support petani lokal secara langsung",
                  ]}
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/hero-background.jpg"
                alt="Tampilan platform Tandur"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mb-20 bg-green-50 rounded-xl p-8">
          <div className="flex items-center mb-8">
            <ShieldCheck className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Solusi untuk Masalah Pertanian Tradisional
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Masalah yang Kami Temui
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✖</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Margint tengkulak terlalu besar
                    </h4>
                    <p className="text-gray-600">
                      Petani hanya menerima 40-60% dari harga jual konsumen
                      akhir
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✖</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Akses pasar terbatas
                    </h4>
                    <p className="text-gray-600">
                      Petani kecil kesulitan menjangkau pembeli langsung
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3">✖</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Rantai pasok tidak transparan
                    </h4>
                    <p className="text-gray-600">
                      Konsumen tidak tahu asal usul produk yang dibeli
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Solusi dari Tandur
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Jualan langsung tanpa perantara
                    </h4>
                    <p className="text-gray-600">
                      Petani bisa menetapkan harga dan berinteraksi langsung
                      dengan pembeli
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Pasar digital yang mudah diakses
                    </h4>
                    <p className="text-gray-600">
                      Antarmuka sederhana yang bisa digunakan petani dengan
                      berbagai tingkat literasi digital
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Transparansi penuh
                    </h4>
                    <p className="text-gray-600">
                      Konsumen bisa melihat lokasi kebun, metode tanam, dan
                      berkomunikasi langsung dengan petani
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Manfaat bagi Semua Pihak
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Tandur menciptakan ekosistem yang saling menguntungkan bagi petani
              dan konsumen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                Keuntungan untuk Petani
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Pendapatan meningkat 30-50% dari harga jual tradisional
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Membangun merek pribadi dan reputasi langsung dengan
                    konsumen
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Akses ke pasar yang lebih luas tanpa biaya distribusi tinggi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Kemampuan menetapkan harga sendiri berdasarkan biaya
                    produksi riil
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Interaksi langsung dengan konsumen untuk memahami preferensi
                    pasar
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Heart className="w-6 h-6 text-green-600 mr-3" />
                Keuntungan untuk Konsumen
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Produk lebih segar dengan masa simpan lebih panjang
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Harga lebih kompetitif karena tidak ada margin tengkulak
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Transparansi asal-usul produk dan metode pertanian
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Kesempatan mendukung petani lokal secara langsung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    Komunikasi langsung dengan produsen untuk pertanyaan khusus
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-green-800 text-white rounded-xl p-8 md:p-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-8 h-8 text-green-300 mr-3" />
            <h2 className="text-2xl font-bold">Visi Jangka Panjang Kami</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-green-100 mb-6">
                Kami membayangkan masa depan di mana teknologi memberdayakan
                petani kecil dan menengah untuk bersaing secara adil di pasar
                modern.
              </p>
              <ul className="space-y-4 text-green-100">
                <li className="flex items-start">
                  <Leaf className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>
                    Membangun ekosistem pertanian digital berbasis komunitas
                    yang saling mendukung
                  </span>
                </li>
                <li className="flex items-start">
                  <Leaf className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>
                    Menciptakan rantai pasok yang sepenuhnya transparan dari
                    produsen ke konsumen
                  </span>
                </li>
                <li className="flex items-start">
                  <Leaf className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span>
                    Meningkatkan kesejahteraan petani melalui akses pasar yang
                    lebih baik
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-green-700 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Target 2025</h3>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-center">
                    <span className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      1
                    </span>
                    <span>10.000 petani terdaftar di platform</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      2
                    </span>
                    <span>Mencakup 50% kabupaten di Indonesia</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      3
                    </span>
                    <span>Transaksi Rp100 miliar per tahun</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
