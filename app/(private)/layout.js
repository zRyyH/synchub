import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({ children }) {
    return (
        <div className="flex h-screen flex-row">
            <Sidebar />
            <div className="flex items-start justify-center min-h-screen pt-16">
                <main className="w-[1280px] animate-fadeSlideIn p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}