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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { catalogService } from "@/services/catalog"
import { photosService } from "@/services/files"

export function NewTrackForm({ open, setOpen, idCatalog, trackData }) {
    const queryClient = useQueryClient()
    const fileInputRef = React.useRef(null)
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [formData, setFormData] = React.useState({
        title: "",
        gender: "",
        mood: "",
        bpm: "",
        duration: "",
        suggested_price: "",
        status: "disponivel",
        external_link: "",
        is_public: true
    })

    React.useEffect(() => {
        if (trackData) {
            setFormData({
                title: trackData.title || "",
                gender: trackData.gender || "",
                mood: trackData.mood || "",
                bpm: trackData.bpm || "",
                duration: trackData.duration || "",
                suggested_price: trackData.suggested_price || "",
                status: trackData.status || "disponivel",
                external_link: trackData.external_link || "",
                is_public: trackData.is_public !== false
            })
        } else {
            setFormData({
                title: "",
                gender: "",
                mood: "",
                bpm: "",
                duration: "",
                suggested_price: "",
                status: "disponivel",
                external_link: "",
                is_public: true
            })
        }
        setSelectedFile(null)
    }, [trackData, open])

    const createMutation = useMutation({
        mutationFn: (data) => catalogService.createCatalog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['catalog'] })
            setOpen(false)
        }
    })

    const updateMutation = useMutation({
        mutationFn: (data) => catalogService.updateCatalog(idCatalog, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['catalog'] })
            setOpen(false)
        }
    })

    const handleSubmit = async () => {
        try {
            let dataToSend = { ...formData }

            if (selectedFile) {
                const fileId = await photosService.upload(selectedFile)
                dataToSend.audio_file = fileId
            }

            if (idCatalog) {
                updateMutation.mutate(dataToSend)
            } else {
                createMutation.mutate(dataToSend)
            }
        } catch (error) {
            console.error('Erro ao fazer upload:', error)
        }
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
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
                            {idCatalog ? "Editar Faixa" : "Nova Faixa"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">
                            {idCatalog ? "Atualize as informações da faixa" : "Adicione uma nova faixa ao seu catálogo"}
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
                    <div className="space-y-2">
                        <Label htmlFor="titulo" className="text-white text-sm">
                            Título <span className="text-[#f0b100]">*</span>
                        </Label>
                        <Input
                            id="titulo"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="bg-transparent border-2 border-gray-800 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                            placeholder=""
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="genero" className="text-white text-sm">
                                Gênero
                            </Label>
                            <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                                <SelectTrigger
                                    id="genero"
                                    className="bg-[#18181b] border-gray-700 text-gray-400 h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                                >
                                    <SelectValue placeholder="Selecione o gênero" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-gray-700">
                                    <SelectItem value="rock" className="text-white">Rock</SelectItem>
                                    <SelectItem value="pop" className="text-white">Pop</SelectItem>
                                    <SelectItem value="jazz" className="text-white">Jazz</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mood" className="text-white text-sm">
                                Mood
                            </Label>
                            <Select value={formData.mood} onValueChange={(value) => handleChange("mood", value)}>
                                <SelectTrigger
                                    id="mood"
                                    className="bg-[#18181b] border-gray-700 text-gray-400 h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                                >
                                    <SelectValue placeholder="Selecione o mood" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-gray-700">
                                    <SelectItem value="happy" className="text-white">Feliz</SelectItem>
                                    <SelectItem value="sad" className="text-white">Triste</SelectItem>
                                    <SelectItem value="energetic" className="text-white">Energético</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bpm" className="text-white text-sm">
                                BPM
                            </Label>
                            <Input
                                id="bpm"
                                type="number"
                                value={formData.bpm}
                                onChange={(e) => handleChange("bpm", e.target.value)}
                                className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                                placeholder=""
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duracao" className="text-white text-sm">
                                Duração (segundos)
                            </Label>
                            <Input
                                id="duracao"
                                type="number"
                                value={formData.duration}
                                onChange={(e) => handleChange("duration", e.target.value)}
                                className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="preco" className="text-white text-sm">
                                Preço Sugerido (R$)
                            </Label>
                            <Input
                                id="preco"
                                type="text"
                                value={formData.suggested_price}
                                onChange={(e) => handleChange("suggested_price", e.target.value)}
                                className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-white h-12 rounded-lg"
                                placeholder=""
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-white text-sm">
                                Status
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                                <SelectTrigger
                                    id="status"
                                    className="bg-[#18181b] border-gray-700 text-white h-12 rounded-lg focus:ring-[#f0b100] focus:border-[#f0b100]"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#18181b] border-gray-700">
                                    <SelectItem value="disponivel" className="text-white">Disponível</SelectItem>
                                    <SelectItem value="vendido" className="text-white">Vendido</SelectItem>
                                    <SelectItem value="rascunho" className="text-white">Rascunho</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link" className="text-white text-sm">
                            Link Externo
                        </Label>
                        <Input
                            id="link"
                            type="url"
                            value={formData.external_link}
                            onChange={(e) => handleChange("external_link", e.target.value)}
                            className="bg-[#18181b] border-gray-700 focus:border-[#f0b100] focus:ring-[#f0b100] text-gray-400 h-12 rounded-lg"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="audio" className="text-white text-sm">
                            Arquivo de Áudio
                        </Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center bg-[#18181b]">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="bg-gray-800 text-white hover:bg-gray-700"
                                    onClick={handleFileSelect}
                                >
                                    Escolher arquivo
                                </Button>
                                <span className="text-gray-400 text-sm">
                                    {selectedFile ? selectedFile.name : "Nenhum arquivo escolhido"}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            O arquivo será usado para gerar a prova de autoria (hash SHA-256). (Armazenamento local simulado)
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="publica"
                            checked={formData.is_public}
                            onCheckedChange={(checked) => handleChange("is_public", checked)}
                            className="border-[#f0b100] data-[state=checked]:bg-[#f0b100] data-[state=checked]:border-[#f0b100]"
                        />
                        <Label
                            htmlFor="publica"
                            className="text-white text-sm font-normal cursor-pointer"
                        >
                            Tornar pública no portfólio
                        </Label>
                    </div>

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
                            {createMutation.isPending || updateMutation.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}