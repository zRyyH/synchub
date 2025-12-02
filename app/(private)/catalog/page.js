"use client";

import { CatalogMusic } from "@/components/pages/catalog/Catalog";
import { NewTrackForm } from "@/components/forms/Catalog";
import { EmptySection } from "@/components/common/Empty";
import { catalogService } from "@/services/catalog";
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Catalog() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrack, setEditingTrack] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['catalog'],
        queryFn: catalogService.getCatalog,
    })

    const handleEdit = (track) => {
        setEditingTrack(track);
        setIsModalOpen(true);
    };

    const handleCloseModal = (open) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingTrack(null);
        }
    };

    return (
        <div className="flex flex-col animate-fadeSlideIn gap-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl text-white font-bold">Meu Catálogo Musical</h1>
                    <p className="text-gray-400 text-base max-w-2xl">
                        Cadastre suas trilhas de forma organizada e profissional. Mantenha todo o seu
                        trabalho acessível e pronto para ser licenciado.
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-medium px-6 h-10 rounded-md"
                >
                    Nova Faixa
                </Button>
            </div>

            {data?.length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                    {data.map((track) => (
                        <CatalogMusic
                            key={track.id}
                            id={track.id}
                            title={track.title}
                            genre={track.gender}
                            mood={track.mood}
                            bpm={parseInt(track.bpm)}
                            status={track.status}
                            price={track.suggested_price}
                            duration={`${Math.floor(parseInt(track.duration) / 60)}:${(parseInt(track.duration) % 60).toString().padStart(2, '0')}`}
                            onViewPortfolio={() => console.log("Ver portfólio", track.id)}
                            onCopyLink={() => console.log("Copiar link", track.id)}
                            onEdit={() => handleEdit(track)}
                        />
                    ))}
                </div>
            ) : (
                <EmptySection
                    title={"Nenhuma obra-prima ainda"}
                    description={"Adicione sua primeira obra-prima e comece a construir seu império musical."}
                />
            )}

            <NewTrackForm
                setOpen={handleCloseModal}
                open={isModalOpen}
                idCatalog={editingTrack?.id}
                trackData={editingTrack}
            />
        </div>
    );
}