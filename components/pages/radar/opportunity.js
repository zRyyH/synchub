'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Music2, DollarSign, Calendar, Layers, Sparkles } from 'lucide-react'

export function OpportunityCard({
    title,
    style,
    usage,
    payment,
    deadline,
    platform,
    url,
    buttonText = "Ver Oportunidade",
    variant = "default"
}) {
    const handleButtonClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="group relative w-full max-w-sm">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-yellow-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />

            <Card className="relative w-full bg-gradient-to-br from-[#0f0f11] via-[#18181b] to-[#0f0f11] border border-zinc-800/50 text-white hover:border-yellow-500/30 transition-all duration-500 shadow-2xl overflow-hidden rounded-2xl">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />

                <CardHeader className="relative pb-3 pt-6 px-6">
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-xl font-bold leading-tight line-clamp-2 min-h-[2.5rem] bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-transparent">
                            {title}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="relative space-y-3 pb-4 px-6">
                    <div className="space-y-2">
                        <InfoItem
                            icon={<Music2 className="h-4 w-4" />}
                            label="Estilo Musical"
                            value={style}
                        />

                        <InfoItem
                            icon={<Layers className="h-4 w-4" />}
                            label="Tipo de Uso"
                            value={usage}
                        />

                        <InfoItem
                            icon={<DollarSign className="h-4 w-4" />}
                            label="Remuneração"
                            value={payment}
                        />

                        <InfoItem
                            icon={<Calendar className="h-4 w-4" />}
                            label="Prazo de Entrega"
                            value={deadline}
                        />

                        <InfoItem
                            icon={<ExternalLink className="h-4 w-4" />}
                            label="Plataforma"
                            value={platform}
                        />
                    </div>
                </CardContent>

                <CardFooter className="relative pt-2 pb-6 px-6">
                    <Button
                        onClick={handleButtonClick}
                        disabled={!url}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-[#0f0f11] font-bold h-12 text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group/button relative overflow-hidden"
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-2">
                            {buttonText}
                            <ExternalLink className="h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Button>
                </CardFooter>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            </Card>
        </div>
    )
}

function InfoItem({ icon, label, value, highlight = false }) {
    return (
        <div className={`group/item flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${highlight
            ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 hover:border-yellow-500/30'
            : 'bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-zinc-700/50'
            }`}>
            <div className={`${highlight ? 'text-yellow-500' : 'text-yellow-500/80'} group-hover/item:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    {label}
                </span>
                <span className={`text-sm font-medium truncate ${highlight ? 'text-yellow-500' : 'text-zinc-100'
                    }`}>
                    {value || '-'}
                </span>
            </div>
        </div>
    )
}