"use client";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

export function EmptyCatalog() {
    return (
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-0">
                <Empty className="border-0 py-20">
                    <EmptyHeader>
                        <Music className="size-10 text-gray-500" />
                        <EmptyTitle className="text-xl text-gray-300">
                            Nenhuma obra-prima ainda
                        </EmptyTitle>
                        <EmptyDescription className="text-gray-500 mt-2">
                            Adicione sua primeira obra-prima e comece a construir seu império musical.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </CardContent>
        </Card>
    );
}