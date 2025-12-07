"use client";

import { PitcheCard } from "@/components/pages/pitches/Pitche";
import { SectionHeader } from "@/components/common/Header";
import { EmptySection } from "@/components/common/Empty";
import { NewPitchForm } from "@/components/forms/Pitche";
import { pitcheService } from '@/services/pitches';
import { catalogService } from '@/services/catalog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const initialData = {
    music: "",
    contact: "",
    email: "",
    shipping_date: "",
    status: "aguardando",
    type_of_opportunity: "sync",
    observation: "",
};

export default function Pitches() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const queryClient = useQueryClient();

    const { data: pitches, isLoading } = useQuery({
        queryKey: ['pitches'],
        queryFn: pitcheService.getPitche
    });

    const { data: musicas = [] } = useQuery({
        queryKey: ['catalog'],
        queryFn: catalogService.getCatalog
    });

    const { mutate, isPending } = useMutation({
        mutationFn: pitcheService.createPitche,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pitches'] });
            setOpen(false);
            setFormData(initialData);
        }
    });

    const handleSetInput = (campo, valor) => {
        setFormData(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSalvar = () => {
        mutate(formData);
    };

    const handleCancelar = () => {
        setOpen(false);
        setFormData(initialData);
    };

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
                    <PitcheCard key={pitch.id} pitch={pitch} />
                ))
            ) : (
                <EmptySection
                    title="Nenhum pitch encontrado"
                    description="Comece adicionando seu primeiro pitch para acompanhar seus envios."
                />
            )}

            <NewPitchForm
                open={open}
                onOpenChange={setOpen}
                data={formData}
                setInput={handleSetInput}
                onCancelar={handleCancelar}
                onSalvar={handleSalvar}
                loading={isPending}
                musicaOptions={musicas}
            />
        </div>
    );
}