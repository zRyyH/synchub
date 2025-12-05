"use client";

import { PitcheCard } from "@/components/pages/pitches/Pitche";
import { EmptySection } from "@/components/common/Empty";
import { NewPitch } from "@/components/forms/Pitche";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pitcheService } from '@/services/pitches';
import { SectionHeader } from "@/components/common/Header";

export default function Pitches() {
    const [open, setOpen] = useState(false)

    const { data: pitches, isLoading } = useQuery({
        queryKey: ['pitches'],
        queryFn: pitcheService.getPitche
    })

    return (
        <div className="space-y-6 animate-fadeSlideIn">
            <SectionHeader
                title="Pitches"
                description="Gerencie e acompanhe todos os seus envios de pitches musicais."
                buttonText="Adicionar Pitche"
                onButtonClick={() => setOpen(true)}
            />

            {isLoading ? (
                <div className="text-white">Carregando...</div>
            ) : pitches && pitches.length > 0 ? (
                pitches.map((pitch) => (
                    <PitcheCard
                        key={pitch.id}
                        pitch={pitch}
                    />
                ))
            ) : (
                <EmptySection
                    title={"Nenhum pitch encontrado"}
                    description={"Comece adicionando seu primeiro pitch para acompanhar seus envios."}
                />
            )}

            <NewPitch open={open} setOpen={setOpen} />
        </div>
    );
}