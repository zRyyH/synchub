"use client";

import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Music } from "lucide-react";

export function EmptyPitches() {
    return (
        <Empty className="min-h-[400px] border border-gray-700">
            <EmptyContent>
                <EmptyMedia variant="icon" className="bg-white">
                    <Music className="text-black" />
                </EmptyMedia>
                <EmptyTitle className="text-gray-400">Nenhum pitch encontrado</EmptyTitle>
                <EmptyDescription className="text-gray-500">
                    Comece adicionando seu primeiro pitch para acompanhar seus envios.
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    );
}