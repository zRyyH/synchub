"use client";

import { useState } from "react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CatalogMusic } from "@/components/common/Catalog";
import AddTrackModal from "@/components/common/Modal";

export default function Catalog() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

            <div className="grid grid-cols-2 gap-6">
                <CatalogMusic />
                <CatalogMusic />
                <CatalogMusic />
            </div>

            {/* Empty State Card */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-0">
                    <Empty className="border-0 py-20">
                        <EmptyHeader>
                            <Music className="size-10 text-gray-500" />
                            <EmptyTitle className="text-xl text-gray-300">
                                Nenhuma obra-prima ainda
                            </EmptyTitle>
                            <EmptyDescription className="text-gray-500 mt-2">
                                Adicione sua primeira obra-prima e comece a construir seu império musical.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-medium px-6 h-10 rounded-md mt-6"
                            >
                                Adicionar Primeira Faixa
                            </Button>
                        </EmptyContent>
                    </Empty>
                </CardContent>
            </Card>

            {/* Modal de Adicionar Faixa */}
            <AddTrackModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={"Faixa"}
                description={"Adicione sua nova faixa"}

            />
        </div>
    );
}