"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NewPitchForm } from "@/components/forms/Pitche"
import { pitcheService } from '@/services/pitches'
import { catalogService } from '@/services/catalog'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function PitcheCard({ pitch, className }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [formData, setFormData] = useState({})
    const queryClient = useQueryClient()

    const { data: musicas = [] } = useQuery({
        queryKey: ['catalog'],
        queryFn: catalogService.getCatalog,
    })

    const deleteMutation = useMutation({
        mutationFn: pitcheService.deletePitche,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pitches'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: (data) => pitcheService.updatePitche(pitch.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pitches'] })
            setOpenEdit(false)
        }
    })

    const handleEdit = () => {
        setFormData({
            music: String(pitch.music?.id || pitch.music || ""),
            contact: pitch.contact || "",
            email: pitch.email || "",
            shipping_date: pitch.shipping_date?.split('T')[0] || "",
            status: pitch.status || "Aguardando",
            type_of_opportunity: pitch.type_of_opportunity || "Sync (TV/Filme)",
            observation: pitch.observation || "",
        })
        setOpenEdit(true)
    }

    const handleDelete = () => {
        if (confirm('Tem certeza que deseja excluir este pitch?')) {
            deleteMutation.mutate(pitch.id)
        }
    }

    const handleSetInput = (campo, valor) => {
        setFormData(prev => ({ ...prev, [campo]: valor }))
    }

    const handleSalvar = () => {
        updateMutation.mutate(formData)
    }

    const title = pitch?.music?.title || "Sem música"
    const subtitle = `${pitch.contact} • ${pitch.email}`
    const sendDate = new Date(pitch.shipping_date).toLocaleDateString('pt-BR')
    const status = pitch.status
    const statusVariant = pitch.status === 'Aprovado' ? 'success' : pitch.status === 'Rejeitado' ? 'destructive' : 'default'
    const notes = pitch.observation

    return (
        <>
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
                            onClick={handleEdit}
                        >
                            <Edit2 className="size-4" />
                        </Button>
                        <Button
                            variant="default"
                            size="icon"
                            className="size-8 hover:bg-yellow-500/10 hover:text-yellow-500"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
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

            <NewPitchForm
                open={openEdit}
                onOpenChange={setOpenEdit}
                data={formData}
                setInput={handleSetInput}
                onCancelar={() => setOpenEdit(false)}
                onSalvar={handleSalvar}
                loading={updateMutation.isPending}
                musicaOptions={musicas}
            />
        </>
    )
}