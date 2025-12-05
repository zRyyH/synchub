"use client";

import { CatalogMusic } from "@/components/pages/catalog/Catalog";
import { SectionHeader } from "@/components/common/Header";
import { NewTrackForm } from "@/components/forms/Catalog";
import { EmptySection } from "@/components/common/Empty";
import { catalogService } from "@/services/catalog";
import { useQuery } from '@tanstack/react-query';
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
            <SectionHeader
                title="Catalogos"
                description="Veja seus catalogos"
                buttonText="Adicionar Catalogo"
                onButtonClick={() => setIsModalOpen(true)}
            />


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