"use client"
import { X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ReusableModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    primaryButtonText = "Confirmar",
    secondaryButtonText = "Cancelar",
    onPrimaryAction,
    onSecondaryAction,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-[#18181b] border-[#27272a] text-white max-w-2xl"
                showCloseButton={false}
            >
                {/* Botão X no canto superior direito */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#18181b]"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
                </button>

                {/* Header do Modal */}
                {(title || description) && (
                    <DialogHeader className="pr-8">
                        {title && (
                            <DialogTitle className="text-xl font-semibold text-white">
                                {title}
                            </DialogTitle>
                        )}
                        {description && (
                            <DialogDescription className="text-zinc-400">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}

                {/* Conteúdo do Modal */}
                <div className="py-4">{children}</div>

                {/* Footer com os dois botões */}
                <DialogFooter className="flex flex-row justify-end gap-3">
                    {/* Botão Cinza (Secundário) */}
                    <Button
                        variant="outline"
                        onClick={onSecondaryAction}
                        className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white hover:border-zinc-500"
                    >
                        {secondaryButtonText}
                    </Button>

                    {/* Botão Amarelo (Primário) */}
                    <Button
                        onClick={onPrimaryAction}
                        className="bg-yellow-500 text-black font-medium hover:bg-yellow-600 hover:text-black"
                    >
                        {primaryButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}