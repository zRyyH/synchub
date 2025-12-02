"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones } from "lucide-react";


export function MentoringSection() {
    const router = useRouter()

    return (
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] border-[#333333]">
            <CardHeader>
                <div className="flex items-start gap-3">
                    <Headphones className="size-5 text-yellow-500 mt-0.5" />
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl font-semibold text-white">
                                Mentoria Rápida com IA
                            </CardTitle>
                            <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                                🔥 NOVO
                            </Badge>
                        </div>
                        <CardDescription className="text-gray-300">
                            Receba feedback instantâneo sobre o potencial de sua música.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                    Nossa curadoria inteligente analisa sua faixa em segundos, oferecendo insights sobre melodia,
                    arranjo, mixagem e potencial comercial.
                </p>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold" onClick={() => router.push("/mentoring")} >
                    Analisar minha música
                    <span className="ml-2">→</span>
                </Button>
            </CardContent>
        </Card>
    );
}