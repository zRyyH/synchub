'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function OpportunityCard({
    title,
    style,
    usage,
    payment,
    deadline,
    platform,
    buttonText = "Ver Oportunidade",
    onButtonClick,
    variant = "default"
}) {
    return (
        <Card className="w-full max-w-sm bg-[#18181b] border-[#18181b] text-white">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold leading-tight">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 pb-4">
                <div className="space-y-2.5">
                    <InfoItem
                        label="Estilo:"
                        value={style}
                    />

                    <InfoItem
                        label="Uso:"
                        value={usage}
                    />

                    <InfoItem
                        label="Pagamento:"
                        value={payment}
                    />

                    <InfoItem
                        label="Prazo:"
                        value={deadline}
                    />

                    <InfoItem
                        label="Plataforma:"
                        value={platform}
                    />
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    onClick={onButtonClick}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#18181b] font-semibold h-12 text-base rounded-lg transition-all"
                >
                    {buttonText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function InfoItem({ label, value }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-gray-400">
                {label}
            </span>
            <span className="text-sm text-gray-300">
                {value}
            </span>
        </div>
    )
}