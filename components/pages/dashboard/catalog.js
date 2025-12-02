"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function CatalogSection() {
    const router = useRouter()

    return (
        < Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 border-0" >
            <CardContent className="py-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-black">
                        Pronto para o próximo hit?
                    </h2>
                    <p className="text-black/80 text-base">
                        Adicione uma nova música ao seu catálogo e prepare-se para as melhores oportunidades de sync.
                    </p>
                    <Button
                        className="bg-black hover:bg-black/90 text-white font-semibold"
                        size="lg"
                        onClick={() => router.push("/catalog")}
                    >
                        Ir para o Catálogo
                        <ArrowRight className="size-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
}