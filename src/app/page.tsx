import Link from "next/link";


export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="space-x-48 text-2xl font-semibold text-black">
        <Link href="/client" className="hover:underline">Client</Link>
        <Link href="/doctor" className="hover:underline">Doctor</Link>
      </div>
    </div>
    
  );
}
