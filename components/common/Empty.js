"use client";

import { Card } from "@/components/ui/card";
import { Music2 } from "lucide-react";

export function EmptySection({ title, description }) {
    return (
        <Card className="bg-[#18181b] border-gray-800 p-16">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-6 text-gray-500">
                    <Music2 className="h-20 w-20 mx-auto" strokeWidth={1.5} />
                </div>

                <h2 className="text-2xl font-semibold text-gray-400 mb-3">
                    {title}
                </h2>

                <p className="text-gray-500 max-w-md">
                    {description}
                </p>
            </div>
        </Card>
    );
}