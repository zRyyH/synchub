"use client"

import { Edit2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function PitcheCard({
    title = "teste 5",
    subtitle = "543654756 • zryyh.br@gmail.com",
    sendDate = "23/01/2026",
    status = "Rejeitado",
    statusVariant = "destructive",
    notes = "Sempre aqui",
    onEdit,
    onDelete,
    className
}) {
    return (
        <Card className={cn("bg-[#18181b] border-[#0f0f11]", className)}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-none text-white">{title}</h3>
                    <p className="text-sm text-zinc-400">{subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="default"
                        size="icon"
                        className="size-8 hover:bg-yellow-500/10 hover:text-yellow-500"
                        onClick={onEdit}
                    >
                        <Edit2 className="size-4" />
                    </Button>
                    <Button
                        variant="default"
                        size="icon"
                        className="size-8 hover:bg-yellow-500/10 hover:text-yellow-500"
                        onClick={onDelete}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">Data de Envio:</span>
                        <span className="text-sm text-yellow-500 font-medium">{sendDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">Status:</span>
                        <Badge
                            variant={statusVariant}
                            className="font-normal bg-yellow-500 text-[#0f0f11] hover:bg-yellow-500/90"
                        >
                            {status}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Notas:</p>
                    <p className="text-sm text-zinc-400">{notes}</p>
                </div>
            </CardContent>
        </Card>
    )
}