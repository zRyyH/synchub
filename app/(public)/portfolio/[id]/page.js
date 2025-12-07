"use client";

import LoadingScreen from "@/components/common/LoadingScreen";
import { PlayIcon, MailIcon, MusicIcon } from "lucide-react";
import { portfolioService } from "@/services/portfolio";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function Portfolio() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['catalogs', id],
        queryFn: () => portfolioService.getCatalogs(id),
        enabled: !!id
    });

    const tracks = data || [];

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const totalDuration = tracks.reduce((acc, track) => acc + parseInt(track.duration || 0), 0);
    const uniqueGenres = new Set(tracks.map(t => t.gender)).size;

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-[#0f0f11] text-white">
            {/* Header/Navbar - Fixo no topo */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#18181b]/50 bg-[#0f0f11]/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <MusicIcon className="w-5 h-5 text-[#0f0f11]" />
                        </div>
                        <span className="text-xl font-semibold text-white">Ryan</span>
                    </div>

                    <Button className="bg-yellow-500 hover:bg-yellow-500/90 text-[#0f0f11] font-medium shadow-lg hover:shadow-yellow-500/20 transition-all">
                        <MailIcon className="w-4 h-4 mr-2" />
                        Contato
                    </Button>
                </div>
            </header>

            {/* Main Content - Com padding para compensar header e footer fixos */}
            <main className="container mx-auto px-6 pt-24 pb-32">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title Section */}
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Portfolio</h1>
                        <p className="text-gray-400 text-lg">Meus trabalhos musicais</p>
                        <div className="h-1 w-20 bg-yellow-500 rounded-full"></div>
                    </div>

                    {/* Tracks List */}
                    <div className="space-y-3">
                        {tracks.map((track) => (
                            <Card
                                key={track.id}
                                className="bg-[#18181b] border border-[#18181b] hover:border-yellow-500/30 hover:bg-[#18181b]/60 transition-all duration-300 cursor-pointer group overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        {/* Play Button */}
                                        <div className="relative">
                                            <Button
                                                size="icon"
                                                className="bg-yellow-500 hover:bg-yellow-500/90 text-[#0f0f11] rounded-full w-12 h-12 shadow-lg group-hover:scale-110 transition-transform"
                                            >
                                                <PlayIcon className="w-5 h-5 fill-current ml-0.5" />
                                            </Button>
                                        </div>

                                        {/* Track Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold mb-1.5 text-white group-hover:text-yellow-500 transition-colors">
                                                {track.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <span className="font-medium">{track.gender}</span>
                                                <span className="text-yellow-500">•</span>
                                                <span>{track.mood}</span>
                                                <span className="text-yellow-500">•</span>
                                                <span>{track.bpm} BPM</span>
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div className="text-gray-400 text-sm font-mono tabular-nums">
                                            {formatDuration(track.duration)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 pt-8">
                        <div className="bg-[#18181b] rounded-lg p-6 text-center border border-[#18181b] hover:border-yellow-500/30 transition-colors">
                            <div className="text-3xl font-bold text-yellow-500 mb-2">{tracks.length}</div>
                            <div className="text-sm text-gray-400">Faixas</div>
                        </div>
                        <div className="bg-[#18181b] rounded-lg p-6 text-center border border-[#18181b] hover:border-yellow-500/30 transition-colors">
                            <div className="text-3xl font-bold text-yellow-500 mb-2">{uniqueGenres}</div>
                            <div className="text-sm text-gray-400">Gêneros</div>
                        </div>
                        <div className="bg-[#18181b] rounded-lg p-6 text-center border border-[#18181b] hover:border-yellow-500/30 transition-colors">
                            <div className="text-3xl font-bold text-yellow-500 mb-2">{formatDuration(totalDuration)}</div>
                            <div className="text-sm text-gray-400">Duração Total</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Fixo na parte inferior, translúcido */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#18181b]/50 bg-[#0f0f11]/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-500 p-1.5 rounded">
                                <MusicIcon className="w-4 h-4 text-[#0f0f11]" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                Portfolio criado com{" "}
                                <span className="text-yellow-500 font-semibold">SyncHub</span>
                            </p>
                        </div>
                        <p className="text-gray-500 text-xs">© 2024 Ryan. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}