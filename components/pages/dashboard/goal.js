"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Lightbulb, Pencil, Check, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userService } from "@/services/user";

export function GoalSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [goalValue, setGoalValue] = useState("");
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe,
    });

    const mutation = useMutation({
        mutationFn: userService.updateGoal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setIsEditing(false);
        }
    });

    const handleEdit = () => {
        setGoalValue(data?.goal?.toString() || "0");
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log("a")
        mutation.mutate({ id: data?.id, goal: goalValue });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setGoalValue("");
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    };

    return (
        <Card className="bg-gradient-to-br from-[#18181b] to-[#0f0f11] border-[#333333]">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <DollarSign className="size-5 text-yellow-500 mt-0.5" />
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-semibold text-white">
                                Sua Meta Financeira Mensal
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Defina um objetivo para guiar seus esforços e acompanhar seu progresso.
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-yellow-500">R$</span>
                            <Input
                                value={goalValue}
                                onChange={(e) => setGoalValue(e.target.value)}
                                className="text-3xl font-bold text-yellow-500 bg-[#18181b] border-yellow-500/50 w-48 h-14"
                                placeholder="0,00"
                                autoFocus
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleSave}
                                disabled={mutation.isPending}
                                className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                            >
                                <Check className="size-5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleCancel}
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                                <X className="size-5" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="text-5xl font-bold text-yellow-500">
                                {formatCurrency(data?.goal)}
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleEdit}
                                className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10"
                            >
                                <Pencil className="size-4" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <Lightbulb className="size-5 text-yellow-500 mt-0.5 shrink-0" />
                        <p className="text-white font-semibold">Dicas para alcançar sua meta:</p>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm ml-7">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500">•</span>
                            <span>Adicione mais músicas ao seu catálogo para aumentar as chances de licenciamento.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500">•</span>
                            <span>Use o Radar de Oportunidades diariamente para não perder nenhum briefing.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-500">•</span>
                            <span>Crie um portfólio público e compartilhe seu trabalho com supervisores musicais.</span>
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}