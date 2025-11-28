import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex h-screen flex-row bg-gradient-to-b from-[#18181b] to-[#0f0f11]">
      <Sidebar />
      <div className="flex flex-1 items-start justify-center min-h-screen pt-16 overflow-auto">
        <main className="w-full max-w-[1280px] animate-fadeSlideIn p-4">
          {children}
        </main>
      </div>
    </div>
  );
}