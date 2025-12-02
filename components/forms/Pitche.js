"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pitcheService } from '@/services/pitches'
import { catalogService } from '@/services/catalog'

export function NewPitch({ open, setOpen, pitchData }) {
    const queryClient = useQueryClient()

    const { data: catalog } = useQuery({
        queryKey: ['catalog'],
        queryFn: catalogService.getCatalog
    })

    const [formData, setFormData] = React.useState({
        music: "",
        contact: "",
        email: "",
        shipping_date: "",
        status: "aguardando",
        type_of_opportunity: "sync",
        observation: ""
    })

    const createMutation = useMutation({
        mutationFn: pitcheService.createPitche,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pitches'] })
            setOpen(false)
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => pitcheService.updatePitche(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pitches'] })
            setOpen(false)
        }
    })

    React.useEffect(() => {
        if (pitchData) {
            setFormData({
                music: pitchData.music || "",
                contact: pitchData.contact || "",
                email: pitchData.email || "",
                shipping_date: pitchData.shipping_date ? new Date(pitchData.shipping_date).toISOString().split('T')[0] : "",
                status: pitchData.status || "aguardando",
                type_of_opportunity: pitchData.type_of_opportunity || "sync",
                observation: pitchData.observation || ""
            })
        } else {
            setFormData({
                music: "",
                contact: "",
                email: "",
                shipping_date: "",
                status: "aguardando",
                type_of_opportunity: "sync",
                observation: ""
            })
        }
    }, [pitchData, open])

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        if (pitchData?.id) {
            updateMutation.mutate({ id: pitchData.id, data: formData })
        } else {
            createMutation.mutate(formData)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[680px] border-gray-800 bg-[#0f0f11] text-white"
                showCloseButton={false}
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <DialogTitle className="text-xl font-bold text-white mb-1">
                            {pitchData?.id ? "Editar Pitch" : "Novo Pitch"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            {pitchData?.id ? "Atualize as informaÃ§Ãµes do pitch" : "Preencha os dados do pitch que vocÃª enviou"}
                        </DialogDescription>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6 mt-6">
                    {/* MÃºsica */}
                    <div className="space-y-2">
                        <Label htmlFor="music" className="text-white text-sm">
                            MÃºsica <span className="text-[#f0b100]">*</span>
                        </Label>
                        <Select value={formData.music} onValueChange={(value) => handleChange("music", value)}>
                            <SelectTrigger
                                id="music"
                                className="bg-[#18181b] border-gray-700 text-gray-400 h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                            >
                                <SelectValue placeholder="Selecione uma música" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b] border-gray-700">
                                {catalog?.map((item) => (
                                    <SelectItem key={item.id} value={item.id} className="text-white">
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Contato e Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact" className="text-white text-sm">
                                Contato <span className="text-[#f0b100]">*</span>
                            </Label>
                            <Input
                                id="contact"
                                value={formData.contact}
                                onChange={(e) => handleChange("contact", e.target.value)}
                                className="bg-transparent border-2 border-gray-800 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                                placeholder="Nome da pessoa/empresa"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white text-sm">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-gray-400 h-12 rounded-lg"
                                placeholder="contato@exemplo.com"
                            />
                        </div>
                    </div>

                    {/* Data de Envio e Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="shipping_date" className="text-white text-sm">
                                Data de Envio <span className="text-[#f0b100]">*</span>
                            </Label>
                            <Input
                                id="shipping_date"
                                type="date"
                                value={formData.shipping_date}
                                onChange={(e) => handleChange("shipping_date", e.target.value)}
                                className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-white text-sm">
                                Status <span className="text-[#f0b100]">*</span>
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                                <SelectTrigger
                                    id="status"
                                    className="bg-[#18181b] border-gray-700 text-white h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-gray-700">
                                    <SelectItem value="aguardando" className="text-white">Aguardando</SelectItem>
                                    <SelectItem value="aprovado" className="text-white">Aprovado</SelectItem>
                                    <SelectItem value="rejeitado" className="text-white">Rejeitado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Tipo de Oportunidade */}
                    <div className="space-y-2">
                        <Label htmlFor="type_of_opportunity" className="text-white text-sm">
                            Tipo de Oportunidade
                        </Label>
                        <Select value={formData.type_of_opportunity} onValueChange={(value) => handleChange("type_of_opportunity", value)}>
                            <SelectTrigger
                                id="type_of_opportunity"
                                className="bg-[#18181b] border-gray-700 text-gray-400 h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#18181b] border-gray-700">
                                <SelectItem value="sync" className="text-white">Sync (TV/Filme)</SelectItem>
                                <SelectItem value="playlist" className="text-white">Playlist</SelectItem>
                                <SelectItem value="radio" className="text-white">RÃ¡dio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ObservaÃ§Ãµes */}
                    <div className="space-y-2">
                        <Label htmlFor="observation" className="text-white text-sm">
                            ObservaÃ§Ãµes
                        </Label>
                        <Textarea
                            id="observation"
                            value={formData.observation}
                            onChange={(e) => handleChange("observation", e.target.value)}
                            className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-gray-400 h-32 rounded-lg resize-none"
                            placeholder="Adicione observaÃ§Ãµes sobre este pitch..."
                        />
                    </div>

                    {/* BotÃµes */}
                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="text-white hover:bg-gray-800"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="bg-[#f0b100] text-black hover:bg-[#d99f00] font-semibold px-8"
                        >
                            {createMutation.isPending || updateMutation.isPending
                                ? "Salvando..."
                                : pitchData?.id ? "Atualizar Pitch" : "Criar Pitch"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}