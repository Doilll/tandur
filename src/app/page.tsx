import HasilTanamSection from "@/components/HasilTanamSection";
export default function Home() {
  return (
    <div>
      <div className="bg-[#4CAF50] flex flex-col items-center justify-center text-center h-64">
        <h1 className="text-5xl text-gray-100 font-bold mb-4">Bertani. Berbagi. Berdaya</h1>
        <h1 className="text-2xl text-gray-100">Platform untuk petani berbagi aktivitas bertani dan hasil panen dengan dunia</h1>
      </div>
      <HasilTanamSection />
    </div>
  );
}
