"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Componente Select Reutilizável
 * 
 * @param {Object} props
 * @param {string} props.label - Label do select
 * @param {string} props.placeholder - Texto placeholder
 * @param {Array} props.options - Array de opções [{value: string, label: string, group?: string, disabled?: boolean}]
 * @param {string} props.value - Valor selecionado
 * @param {function} props.onValueChange - Callback quando valor mudar
 * @param {boolean} props.disabled - Se o select está desabilitado
 * @param {string} props.size - Tamanho do select ("sm" | "default")
 * @param {string} props.className - Classes CSS adicionais
 * @param {string} props.error - Mensagem de erro
 * @param {string} props.helperText - Texto de ajuda
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.id - ID do select
 */
export function ReusableSelect({
    label,
    placeholder = "Selecione uma opção",
    options = [],
    value,
    onValueChange,
    disabled = false,
    size = "default",
    className,
    error,
    helperText,
    required = false,
    id,
    ...props
}) {
    // Agrupa opções se houver propriedade 'group'
    const groupedOptions = React.useMemo(() => {
        const groups = {}
        const ungrouped = []

        options.forEach((option) => {
            if (option.group) {
                if (!groups[option.group]) {
                    groups[option.group] = []
                }
                groups[option.group].push(option)
            } else {
                ungrouped.push(option)
            }
        })

        return { groups, ungrouped }
    }, [options])

    const hasGroups = Object.keys(groupedOptions.groups).length > 0
    const selectId = id || React.useId()

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {/* Label */}
            {label && (
                <Label htmlFor={selectId} className={cn(error && "text-destructive")}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}

            {/* Select */}
            <Select
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                {...props}
            >
                <SelectTrigger
                    id={selectId}
                    size={size}
                    className={cn(error && "border-destructive")}
                    aria-invalid={!!error}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {/* Opções sem grupo */}
                    {groupedOptions.ungrouped.length > 0 && (
                        <>
                            {groupedOptions.ungrouped.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                            {hasGroups && <SelectSeparator />}
                        </>
                    )}

                    {/* Opções agrupadas */}
                    {Object.entries(groupedOptions.groups).map(
                        ([groupName, groupOptions], index) => (
                            <React.Fragment key={groupName}>
                                <SelectGroup>
                                    <SelectLabel>{groupName}</SelectLabel>
                                    {groupOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            disabled={option.disabled}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                {index < Object.keys(groupedOptions.groups).length - 1 && (
                                    <SelectSeparator />
                                )}
                            </React.Fragment>
                        )
                    )}
                </SelectContent>
            </Select>

            {/* Helper Text ou Error */}
            {(helperText || error) && (
                <p
                    className={cn(
                        "text-sm",
                        error ? "text-destructive" : "text-muted-foreground"
                    )}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    )
}

/**
 * Exemplo de uso:
 * 
 * <ReusableSelect
 *   label="Escolha uma fruta"
 *   placeholder="Selecione..."
 *   value={selectedFruit}
 *   onValueChange={setSelectedFruit}
 *   options={[
 *     { value: "apple", label: "Maçã" },
 *     { value: "banana", label: "Banana", group: "Frutas Tropicais" },
 *     { value: "orange", label: "Laranja", group: "Cítricos" },
 *     { value: "lemon", label: "Limão", group: "Cítricos", disabled: true }
 *   ]}
 *   required
 *   helperText="Escolha sua fruta favorita"
 * />
 */