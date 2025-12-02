"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Edit, Trash2, Eye, Share2 } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { catalogService } from "@/services/catalog"

export function CatalogMusic({
    id,
    title,
    genre,
    mood,
    bpm,
    status,
    price,
    duration,
    onViewPortfolio,
    onCopyLink,
    onEdit
}) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => catalogService.deleteCatalog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['catalog'] })
        }
    })

    const handleEdit = () => {
        if (onEdit) {
            onEdit()
        }
    }

    const handleDelete = () => {
        deleteMutation.mutate()
    }

    return (
        <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                        <Music className="h-5 w-5 text-emerald-500" />
                        <h2 className="text-xl font-semibold text-white">{title}</h2>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>{genre}</span>
                        <span>•</span>
                        <span>{mood}</span>
                        <span>•</span>
                        <span>{bpm} BPM</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={handleEdit}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 text-red-500 hover:text-red-400 hover:bg-red-950/50"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-400">Status:</span>
                        <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/30">
                            {status}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>Preço:</span>
                        <span className="text-white font-medium">R$ {price}</span>
                    </div>
                </div>

                <div className="text-sm text-zinc-400">
                    <span>Duração: </span>
                    <span className="text-white">{duration}</span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <Button variant="ghost" className="justify-start h-auto py-2 text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={onViewPortfolio}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver no Portfólio
                    </Button>

                    <Button variant="ghost" className="justify-start h-auto py-2 text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={onCopyLink}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Copiar Link Público
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}