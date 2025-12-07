"use client";

import { MusicIcon } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center relative overflow-hidden">
            {/* Background animated circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo animado */}
                <div className="relative">
                    {/* Anel externo pulsante */}
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping"></div>

                    {/* Anel rotativo */}
                    <div className="relative w-24 h-24 rounded-full border-4 border-[#18181b] border-t-yellow-500 animate-spin"></div>

                    {/* Ícone central */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-yellow-500 p-4 rounded-full shadow-lg shadow-yellow-500/30 animate-bounce">
                            <MusicIcon className="w-8 h-8 text-[#0f0f11]" />
                        </div>
                    </div>
                </div>

                {/* Texto */}
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">Carregando</h2>

                    {/* Pontos animados */}
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

                {/* Barra de progresso animada */}
                <div className="w-64 h-1 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 animate-pulse"></div>
                </div>

                {/* Texto secundário */}
                <p className="text-gray-400 text-sm animate-pulse">
                    Preparando seu portfólio...
                </p>
            </div>

            {/* Partículas decorativas */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            </div>
        </div>
    );
}