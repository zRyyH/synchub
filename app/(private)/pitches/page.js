"use client";

import { EmptyPitches } from "@/components/pages/pitches/empty";
import { PitcheCard } from "@/components/pages/pitches/Pitche";
import { NewPitch } from "@/components/forms/Pitche";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pitcheService } from '@/services/pitches';

export default function Pitches() {
    const [open, setOpen] = useState(false)

    const { data: pitches, isLoading } = useQuery({
        queryKey: ['pitches'],
        queryFn: pitcheService.getPitche
    })

    return (
        <div className="space-y-6 animate-fadeSlideIn">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl text-white font-bold tracking-tight">Pitches</h1>
                    <p className="text-muted-foreground">
                        Gerencie e acompanhe todos os seus envios de pitches musicais
                    </p>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium" onClick={() => setOpen(true)} >
                    <Plus />
                    Novo Pitch
                </Button>
            </div>

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
                <EmptyPitches />
            )}

            <NewPitch open={open} setOpen={setOpen} />
        </div>
    );
}