"use client"

import { useRef } from "react"
import { X, Upload, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const defaultData = {
    titulo: "",
    genero: "",
    mood: "",
    bpm: "120",
    duracao: "180",
    status: "disponivel",
    preco: "0,00",
    linkExterno: "",
    arquivoNome: "",
    publicoPortfolio: true,
}

export function NewTrackForm({
    open = true,
    onOpenChange,
    data = defaultData,
    setInput,
    onCancelar,
    onSalvar,
    onFileSelect,
    loading = false,
}) {
    const formData = { ...defaultData, ...data }
    const fileInputRef = useRef(null)

    const handleChange = (campo, valor) => {
        if (setInput) {
            setInput(campo, valor)
        }
    }

    const handleUploadClick = () => {
        if (loading) return
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            handleChange("arquivoNome", file.name)
            if (onFileSelect) {
                onFileSelect(file)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
            <DialogContent
                className="max-w-[560px] border-[#18181b] bg-[#0f0f11] p-6"
                showCloseButton={false}
            >
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-[#0f0f11]/80 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                            <span className="text-sm text-zinc-400">Salvando...</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <DialogHeader className="space-y-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl font-semibold text-white">
                                Nova Faixa
                            </DialogTitle>
                            <DialogDescription className="text-sm text-zinc-400">
                                Adicione uma nova faixa ao seu catálogo
                            </DialogDescription>
                        </div>
                        <button
                            className="text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
                            onClick={() => onOpenChange && onOpenChange(false)}
                            disabled={loading}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </DialogHeader>

                {/* Form */}
                <div className="mt-6 space-y-5">
                    {/* Linha 1: Título e Gênero */}
                    <div className="grid grid-cols-[1fr_140px] gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">
                                Título <span className="text-yellow-500">*</span>
                            </Label>
                            <Input
                                placeholder="Digite o título"
                                value={formData.titulo}
                                onChange={(e) => handleChange("titulo", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Gênero</Label>
                            <Select
                                value={formData.genero}
                                onValueChange={(valor) => handleChange("genero", valor)}
                                disabled={loading}
                            >
                                <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="border-[#18181b] bg-[#18181b]">
                                    <SelectItem value="Rock" className="text-white focus:bg-yellow-500/20 focus:text-white">Rock</SelectItem>
                                    <SelectItem value="Pop" className="text-white focus:bg-yellow-500/20 focus:text-white">Pop</SelectItem>
                                    <SelectItem value="Eletrônica" className="text-white focus:bg-yellow-500/20 focus:text-white">Eletrônica</SelectItem>
                                    <SelectItem value="Hip Hop" className="text-white focus:bg-yellow-500/20 focus:text-white">Hip Hop</SelectItem>
                                    <SelectItem value="Jazz" className="text-white focus:bg-yellow-500/20 focus:text-white">Jazz</SelectItem>
                                    <SelectItem value="Classical" className="text-white focus:bg-yellow-500/20 focus:text-white">Classical</SelectItem>
                                    <SelectItem value="Folk" className="text-white focus:bg-yellow-500/20 focus:text-white">Folk</SelectItem>
                                    <SelectItem value="Blues" className="text-white focus:bg-yellow-500/20 focus:text-white">Blues</SelectItem>
                                    <SelectItem value="Country" className="text-white focus:bg-yellow-500/20 focus:text-white">Country</SelectItem>
                                    <SelectItem value="Reggae" className="text-white focus:bg-yellow-500/20 focus:text-white">Reggae</SelectItem>
                                    <SelectItem value="Funk" className="text-white focus:bg-yellow-500/20 focus:text-white">Funk</SelectItem>
                                    <SelectItem value="Soul" className="text-white focus:bg-yellow-500/20 focus:text-white">Soul</SelectItem>
                                    <SelectItem value="Ambient" className="text-white focus:bg-yellow-500/20 focus:text-white">Ambient</SelectItem>
                                    <SelectItem value="Cinematic" className="text-white focus:bg-yellow-500/20 focus:text-white">Cinematic</SelectItem>
                                    <SelectItem value="Outro" className="text-white focus:bg-yellow-500/20 focus:text-white">Outro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha 2: Mood, BPM, Duração, Status */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Mood</Label>
                            <Select
                                value={formData.mood}
                                onValueChange={(valor) => handleChange("mood", valor)}
                                disabled={loading}
                            >
                                <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="border-[#18181b] bg-[#18181b]">
                                    <SelectItem value="Energético" className="text-white focus:bg-yellow-500/20 focus:text-white">Energético</SelectItem>
                                    <SelectItem value="Relaxante" className="text-white focus:bg-yellow-500/20 focus:text-white">Relaxante</SelectItem>
                                    <SelectItem value="Melancólico" className="text-white focus:bg-yellow-500/20 focus:text-white">Melancólico</SelectItem>
                                    <SelectItem value="Alegre" className="text-white focus:bg-yellow-500/20 focus:text-white">Alegre</SelectItem>
                                    <SelectItem value="Dramático" className="text-white focus:bg-yellow-500/20 focus:text-white">Dramático</SelectItem>
                                    <SelectItem value="Romântico" className="text-white focus:bg-yellow-500/20 focus:text-white">Romântico</SelectItem>
                                    <SelectItem value="Misterioso" className="text-white focus:bg-yellow-500/20 focus:text-white">Misterioso</SelectItem>
                                    <SelectItem value="Épico" className="text-white focus:bg-yellow-500/20 focus:text-white">Épico</SelectItem>
                                    <SelectItem value="Nostálgico" className="text-white focus:bg-yellow-500/20 focus:text-white">Nostálgico</SelectItem>
                                    <SelectItem value="Outro" className="text-white focus:bg-yellow-500/20 focus:text-white">Outro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">BPM</Label>
                            <Input
                                type="number"
                                value={formData.bpm}
                                onChange={(e) => handleChange("bpm", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Duração (s)</Label>
                            <Input
                                type="number"
                                value={formData.duracao}
                                onChange={(e) => handleChange("duracao", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(valor) => handleChange("status", valor)}
                                disabled={loading}
                            >
                                <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="border-[#18181b] bg-[#18181b]">
                                    <SelectItem value="Disponível" className="text-white focus:bg-yellow-500/20 focus:text-white">Disponível</SelectItem>
                                    <SelectItem value="Licenciado" className="text-white focus:bg-yellow-500/20 focus:text-white">Licenciado</SelectItem>
                                    <SelectItem value="Negociando" className="text-white focus:bg-yellow-500/20 focus:text-white">Negociando</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha 3: Preço e Link Externo */}
                    <div className="grid grid-cols-[140px_1fr] gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Preço (R$)</Label>
                            <Input
                                type="text"
                                value={formData.preco}
                                onChange={(e) => handleChange("preco", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Link Externo</Label>
                            <Input
                                type="url"
                                placeholder="https://exemplo.com"
                                value={formData.linkExterno}
                                onChange={(e) => handleChange("linkExterno", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Linha 4: Arquivo de Áudio */}
                    <div className="space-y-2">
                        <Label className="text-sm text-zinc-300">Arquivo de Áudio</Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={loading}
                        />
                        <div
                            onClick={handleUploadClick}
                            className={`flex h-16 items-center gap-3 rounded-md border border-[#18181b] bg-[#18181b] px-4 transition-colors ${loading
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:border-zinc-700"
                                }`}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-zinc-600">
                                <Upload className="h-5 w-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {formData.arquivoNome || "Escolher arquivo"}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    {formData.arquivoNome ? "Arquivo selecionado" : "Nenhum arquivo selecionado"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="portfolio"
                            checked={formData.publicoPortfolio}
                            onCheckedChange={(checked) => handleChange("publicoPortfolio", checked)}
                            disabled={loading}
                            className="h-5 w-5 border-zinc-600 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-[#0f0f11] disabled:opacity-50"
                        />
                        <Label
                            htmlFor="portfolio"
                            className={`text-sm font-normal text-zinc-300 ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            Tornar pública no portfólio
                        </Label>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onCancelar}
                        disabled={loading}
                        className="h-10 px-4 text-zinc-300 hover:bg-[#18181b] hover:text-white disabled:opacity-50"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onSalvar}
                        disabled={loading}
                        className="h-10 bg-yellow-500 px-6 font-medium text-[#0f0f11] hover:bg-yellow-400 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            "Salvar"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}