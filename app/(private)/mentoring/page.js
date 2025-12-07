"use client";

import { Upload, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Mentoring() {
    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6 animate-fadeSlideIn">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold text-white">Mentoria Rápida</h1>
                    <Badge
                        variant="default"
                        className="bg-yellow-500 text-[#0f0f11] hover:bg-yellow-500 font-semibold px-3 py-1"
                    >
                        ✨ NOVO
                    </Badge>
                </div>

                <p className="text-gray-400 text-lg max-w-3xl">
                    Obtenha uma análise instantânea da nossa Curadoria. Envie um trecho de sua música e receba insights valiosos sobre o Potencial dela
                </p>
            </div>

            {/* Card de Análise de Áudio */}
            <Card className="bg-[#18181b] border-yellow-500/30 border-2">
                <CardContent className="p-8 space-y-6">
                    {/* Título do Card */}
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-yellow-500 w-6 h-6" />
                        <h2 className="text-2xl font-bold text-white">Análise de Áudio</h2>
                    </div>

                    <p className="text-gray-400">
                        Envie um trecho de até 60 segundos (MP3/WAV) e receba feedback instantâneo sobre sua música.
                    </p>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-yellow-500/40 rounded-lg p-16 bg-[#0f0f11] hover:border-yellow-500/60 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                            <Upload className="w-16 h-16 text-yellow-500" strokeWidth={1.5} />
                            <div className="space-y-2">
                                <p className="text-xl font-semibold text-white">
                                    Clique para enviar seu áudio
                                </p>
                                <p className="text-sm text-gray-400">
                                    MP3 ou WAV • Máximo 60 segundos
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card de Dica Profissional */}
            <Card className="bg-[#0f0f11] border-gray-800">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="text-yellow-500 w-6 h-6" />
                        <h3 className="text-xl font-bold text-white">Dica de Profissional</h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                        Para uma análise mais precisa em diferentes contextos, experimente enviar versões de 60, 30 e 15 segundos da sua música. Se possível, envie também os stems (pistas separadas), como instrumental e vocal, para um feedback ainda mais detalhado sobre o arranjo e a mixagem.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}