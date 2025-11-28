"use client";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { PitcheCard } from "@/components/common/Pitche";
import { Music, Plus } from "lucide-react";

export default function Pitches() {
    return (
        <div className="space-y-6 animate-fadeSlideIn">
            {/* Cabeçalho da Página */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl text-white font-bold tracking-tight">Pitches</h1>
                    <p className="text-muted-foreground">
                        Gerencie e acompanhe todos os seus envios de pitches musicais
                    </p>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                    <Plus />
                    Novo Pitch
                </Button>
            </div>

            <PitcheCard
                title="teste 5"
                subtitle="543654756 • zryyh.br@gmail.com"
                sendDate="23/01/2026"
                status="Rejeitado"
                statusVariant="destructive"
                notes="Sempre aqui"
                onEdit={() => console.log('Editar')}
                onDelete={() => console.log('Excluir')}
            />

            {/* Estado Vazio */}
            <Empty className="min-h-[400px] border-dashed border-2 border-gray-700">
                <EmptyContent>
                    <EmptyMedia variant="icon" className="bg-white">
                        <Music className="text-black" />
                    </EmptyMedia>
                    <EmptyTitle className="text-gray-400">Nenhum pitch encontrado</EmptyTitle>
                    <EmptyDescription className="text-gray-500">
                        Comece adicionando seu primeiro pitch para acompanhar seus envios.
                    </EmptyDescription>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium mt-4">
                        <Plus />
                        Adicionar Primeiro Pitch
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    );
}