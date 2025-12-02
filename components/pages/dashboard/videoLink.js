"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { synchubService } from "@/services/synchub";
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

export function VideoLink() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['synchub'],
        queryFn: synchubService.getSyncHub,
    });

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <>
            <Card className="bg-gradient-to-br from-[#18181b] to-[#0f0f11] border-yellow-500/20">
                <CardHeader>
                    <div className="flex items-start gap-3">
                        <PlayCircle className="size-5 text-yellow-500 mt-0.5" />
                        <div className="space-y-2 flex-1">
                            <CardTitle className="text-xl font-semibold text-white">
                                Ajuda: Como funciona essa ferramenta
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Assista ao vídeo explicativo e aprenda a usar todas as funcionalidades do SyncHub.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-[#0f0f11] font-semibold"
                    >
                        <PlayCircle className="size-4 mr-2" />
                        Assistir Vídeo Explicativo
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent
                    className="bg-[#18181b] border-yellow-500/30 p-6"
                    style={{ width: '800px', maxWidth: '90vw', height: '600px', maxHeight: '90vh' }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-white text-2xl">
                            Tutorial: Como usar o SyncHub
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Aprenda a utilizar todas as funcionalidades da ferramenta
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 w-full rounded-lg overflow-hidden bg-[#0f0f11] mt-4">
                        {data?.video_link_tutorial ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={getYoutubeEmbedUrl(data.video_link_tutorial)}
                                title="Tutorial SyncHub"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="border-0"
                                style={{ minHeight: '400px' }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Carregando vídeo...
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}