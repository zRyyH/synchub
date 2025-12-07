"use client"

import { X, Loader2 } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const defaultData = {
    music: "",
    contact: "",
    email: "",
    shipping_date: "",
    status: "aguardando",
    type_of_opportunity: "sync",
    observation: "",
}

export function NewPitchForm({
    open = true,
    onOpenChange,
    data = defaultData,
    setInput,
    onCancelar,
    onSalvar,
    loading = false,
    musicaOptions = [],
}) {
    const formData = { ...defaultData, ...data }

    const handleChange = (campo, valor) => {
        if (setInput) {
            setInput(campo, valor)
        }
    }

    return (
        <Dialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
            <DialogContent
                className="max-w-[560px] border-[#18181b] bg-[#0f0f11] p-6"
                showCloseButton={false}
            >
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-[#0f0f11]/80 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                            <span className="text-sm text-zinc-400">Salvando...</span>
                        </div>
                    </div>
                )}

                <DialogHeader className="space-y-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl font-semibold text-white">
                                Novo Pitch
                            </DialogTitle>
                            <DialogDescription className="text-sm text-zinc-400">
                                Registre um novo pitch enviado
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

                <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                        <Label className="text-sm text-zinc-300">
                            Música <span className="text-yellow-500">*</span>
                        </Label>
                        <Select
                            value={formData.music}
                            onValueChange={(valor) => handleChange("music", valor)}
                            disabled={loading}
                        >
                            <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                <SelectValue placeholder="Selecione uma música" />
                            </SelectTrigger>
                            <SelectContent className="border-[#18181b] bg-[#18181b]">
                                {musicaOptions.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={String(item.id)}
                                        className="text-white focus:bg-yellow-500/20 focus:text-white"
                                    >
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">
                                Contato <span className="text-yellow-500">*</span>
                            </Label>
                            <Input
                                placeholder="Nome da pessoa/empresa"
                                value={formData.contact}
                                onChange={(e) => handleChange("contact", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">Email</Label>
                            <Input
                                type="email"
                                placeholder="contato@exemplo.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">
                                Data de Envio <span className="text-yellow-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                value={formData.shipping_date}
                                onChange={(e) => handleChange("shipping_date", e.target.value)}
                                disabled={loading}
                                className="h-10 border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-zinc-300">
                                Status <span className="text-yellow-500">*</span>
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(valor) => handleChange("status", valor)}
                                disabled={loading}
                            >
                                <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="border-[#18181b] bg-[#18181b]">
                                    <SelectItem value="Aguardando" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                        Aguardando
                                    </SelectItem>
                                    <SelectItem value="Aceito" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                        Aceito
                                    </SelectItem>
                                    <SelectItem value="Rejeitado" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                        Rejeitado
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-zinc-300">Tipo de Oportunidade</Label>
                        <Select
                            value={formData.type_of_opportunity}
                            onValueChange={(valor) => handleChange("type_of_opportunity", valor)}
                            disabled={loading}
                        >
                            <SelectTrigger className="h-10 w-full border-[#18181b] bg-[#18181b] text-white focus:border-yellow-500 focus:ring-yellow-500/20 disabled:opacity-50 [&>span]:text-zinc-400 [&[data-state=open]>span]:text-white [&>span:not([data-placeholder])]:text-white">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="border-[#18181b] bg-[#18181b]">
                                <SelectItem value="Sync (TV/Filme)" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                    Sync (TV/Filme)
                                </SelectItem>
                                <SelectItem value="Biblioteca Musical" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                    Biblioteca Musical
                                </SelectItem>
                                <SelectItem value="Editora" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                    Editora
                                </SelectItem>
                                <SelectItem value="Gravadora" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                    Gravadora
                                </SelectItem>
                                <SelectItem value="Outro" className="text-white focus:bg-yellow-500/20 focus:text-white">
                                    Outro
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-zinc-300">Observações</Label>
                        <Textarea
                            placeholder="Adicione observações sobre este pitch..."
                            value={formData.observation}
                            onChange={(e) => handleChange("observation", e.target.value)}
                            disabled={loading}
                            className="min-h-[100px] resize-none border-[#18181b] bg-[#18181b] text-white placeholder:text-zinc-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20 disabled:opacity-50"
                        />
                    </div>
                </div>

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
                        disabled={
                            loading ||
                            !formData.music ||
                            !formData.contact ||
                            !formData.email ||
                            !formData.shipping_date ||
                            !formData.status ||
                            !formData.type_of_opportunity ||
                            !formData.observation
                        }
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