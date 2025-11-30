"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon } from "lucide-react";

export default function Library() {
    const resources = [
        {
            title: "Templates de e-mails de pitch",
            description: "Modelos prontos e persuasivos para você apresentar suas músicas e aumentar suas chances de resposta.",
            icon: FileTextIcon,
        },
        {
            title: "Contratos testados e editáveis",
            description: "Modelos de contrato de licenciamento para proteger seu trabalho e garantir negociações seguras.",
            icon: FileTextIcon,
        },
        {
            title: "PDFs com estratégias de venda de trilha",
            description: "Um guia completo com as melhores estratégias para encontrar clientes e vender suas trilhas sonoras.",
            icon: FileTextIcon,
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Biblioteca de Recursos
                    </h1>
                    <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                        Acesse materiais exclusivos que vão acelerar suas vendas e profissionalizar sua
                        carreira. Encontre modelos de contrato, templates de pitch, checklists e guias
                        práticos, sempre atualizados para ajudar você a fechar mais licenciamentos.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        (TODOS OS MESES ATUALIZAMOS OS MATERIAIS AQUI, COM NOVAS TENDÊNCIAS)
                    </p>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-2 h-11">
                                    <DownloadIcon className="w-4 h-4" />
                                    Baixar PDF
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}