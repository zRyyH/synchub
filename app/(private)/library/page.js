"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { synchubService } from "@/services/synchub";
import { SectionHeader } from "@/components/common/Header";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

export default function Library() {
    const { data: synchub } = useQuery({
        queryKey: ["synchub"],
        queryFn: synchubService.getSyncHub,
    });

    const resources = [
        {
            title: "Templates de e-mails de pitch",
            description: "Modelos prontos e persuasivos para você apresentar suas músicas e aumentar suas chances de resposta.",
            icon: FileTextIcon,
            fileId: synchub?.emails,
        },
        {
            title: "Contratos testados e editáveis",
            description: "Modelos de contrato de licenciamento para proteger seu trabalho e garantir negociações seguras.",
            icon: FileTextIcon,
            fileId: synchub?.contracts,
        },
        {
            title: "PDFs com estratégias de venda de trilha",
            description: "Um guia completo com as melhores estratégias para encontrar clientes e vender suas trilhas sonoras.",
            icon: FileTextIcon,
            fileId: synchub?.pdfs,
        },
    ];

    const handleDownload = (fileId) => {
        if (fileId) {
            window.open(`${DIRECTUS_URL}/assets/${fileId}`, '_blank');
        }
    };

    return (
        <div className="min-h-screen animate-fadeSlideIn">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="Biblioteca de Recursos"
                    description="Acesse materiais exclusivos que vão acelerar suas vendas e profissionalizar sua carreira."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
                    {resources.map((resource, index) => (
                        <Card
                            key={index}
                            className="bg-[#18181b] border-gray-800 hover:border-yellow-500/50 transition-all duration-300"
                        >
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                                        <resource.icon className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <CardTitle className="text-white text-xl leading-tight">
                                        {resource.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CardDescription className="text-gray-400 text-sm leading-relaxed">
                                    {resource.description}
                                </CardDescription>
                                <Button
                                    onClick={() => handleDownload(resource.fileId)}
                                    disabled={!resource.fileId}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-2 h-11 disabled:opacity-50"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                    Baixar
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}