"use client"

import { Music, LayoutDashboard, Music2, Send, Target, BarChart3, BookOpen, Headphones, User, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { userService } from "@/services/user";
import { useQuery } from '@tanstack/react-query'

export default function SyncHubSidebar() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe(),
    })

    console.log(data)

    const router = useRouter()
    const pathname = usePathname()

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            icon: Music2,
            label: "Catálogo",
            href: "/catalog"
        },
        {
            icon: Send,
            label: "Pitches",
            href: "/pitches"
        },
        {
            icon: Target,
            label: "Radar",
            badge: "Novo",
            badgeVariant: "default",
            href: "/radar"
        },
        {
            icon: BarChart3,
            label: "Estatísticas",
            href: "/statistics"
        },
        {
            icon: BookOpen,
            label: "Biblioteca",
            href: "/library"
        },
        {
            icon: Headphones,
            label: "Mentoria Rápida",
            badge: "Novo",
            badgeVariant: "default",
            href: "/mentoring"
        },
    ]

    const handleNavigation = (href) => {
        router.push(href)
    }

    const handleLogout = () => {
        router.push("/")
    }

    const isActive = (href) => {
        return pathname === href || pathname.startsWith(href + "/")
    }

    return (
        <div className="flex h-screen w-64 flex-col bg-[#18181b] text-white">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-gray-800 p-4">
                <Music className="h-6 w-6 text-yellow-500" />
                <span className="text-xl font-bold">SyncHub</span>
            </div>

            {/* Menu Items */}
            <ScrollArea className="flex-1 px-3 py-4 animate-fadeSlideIn">
                <div className="space-y-1">
                    {menuItems.map((item, index) => {
                        const active = isActive(item.href)

                        return (
                            <div key={index} className="transition-all duration-200 ease-in-out">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleNavigation(item.href)}
                                    className={cn(
                                        "w-full justify-start gap-3 rounded-lg px-3 py-6 text-left font-normal transition-all duration-200 ease-in-out",
                                        active
                                            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400 hover:text-gray-900"
                                            : "text-white hover:bg-gray-800/70 hover:text-white hover:scale-[1.02]"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span className="flex-1 text-sm">{item.label}</span>
                                    {item.badge && (
                                        <Badge
                                            variant={item.badgeVariant === "destructive" ? "destructive" : "default"}
                                            className={cn(
                                                "text-xs font-bold transition-transform duration-200",
                                                item.badgeVariant === "destructive"
                                                    ? "bg-red-600 text-white hover:bg-red-600"
                                                    : "bg-orange-600 text-white hover:bg-orange-600"
                                            )}
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Button>
                                {item.subtitle && active && (
                                    <p className="ml-11 mt-1 text-xs text-gray-400 transition-opacity duration-200">
                                        {item.subtitle}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-gray-800">
                <div className="p-4">
                    <div className="mb-3">
                        <p className="text-sm font-medium text-white">{data?.id}</p>
                        <p className="text-xs text-gray-400">ryan-carlos-gadelha</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-2 rounded-lg px-3 py-2 text-left font-normal text-white transition-all duration-200 ease-in-out hover:bg-gray-800/70 hover:text-white hover:scale-[1.02]"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Sair</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}