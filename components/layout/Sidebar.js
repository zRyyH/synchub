"use client"

import { Music, LayoutDashboard, Music2, Send, Target, BarChart3, BookOpen, Headphones, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { userService } from "@/services/user"
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export default function SyncHubSidebar() {
    const [isVisible, setIsVisible] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe,
    })

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

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
        // {
        //     icon: Headphones,
        //     label: "Mentoria Rápida",
        //     badge: "Novo",
        //     href: "/mentoring"
        // },
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
        <div
            className={cn(
                "flex h-screen w-80 flex-col border-r border-white/10 bg-[#18181b] transition-all duration-700 ease-out",
                isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "border-b border-white/10 p-8 transition-all duration-700 ease-out delay-100",
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                        <Music className="h-6 w-6 text-yellow-500" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">SyncHub</span>
                </div>
            </div>

            {/* Menu Items */}
            <ScrollArea className="flex-1 px-4 py-8">
                <div className="space-y-2">
                    {menuItems.map((item, index) => {
                        const active = isActive(item.href)

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "transition-all duration-700 ease-out",
                                    isVisible
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-8 opacity-0"
                                )}
                                style={{
                                    transitionDelay: `${200 + (index * 50)}ms`
                                }}
                            >
                                <Button
                                    variant="ghost"
                                    onClick={() => handleNavigation(item.href)}
                                    className={cn(
                                        "group relative w-full justify-start gap-4 rounded-xl px-4 py-4 text-left font-normal transition-all duration-200",
                                        active
                                            ? "bg-yellow-500/10 text-white shadow-sm"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    {/* Indicador lateral */}
                                    <div
                                        className={cn(
                                            "absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-yellow-500 transition-opacity duration-200",
                                            active ? "opacity-100" : "opacity-0"
                                        )}
                                    />

                                    <item.icon className={cn(
                                        "h-5 w-5 shrink-0 transition-colors duration-200",
                                        active ? "text-yellow-500" : "text-white/50 group-hover:text-yellow-500"
                                    )} />

                                    <span className="flex-1 text-[15px]">{item.label}</span>

                                    {item.badge && (
                                        <Badge
                                            className={cn(
                                                "rounded-lg border-0 px-2 py-0.5 text-[11px] font-medium",
                                                active
                                                    ? "bg-yellow-500/20 text-yellow-500"
                                                    : "bg-white/10 text-white/70"
                                            )}
                                        >
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

            {/* Separador */}
            <Separator
                className={cn(
                    "bg-white/10 transition-all duration-700 ease-out delay-700",
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                )}
            />

            {/* Footer */}
            <div
                className={cn(
                    "p-5 transition-all duration-700 ease-out delay-[800ms]",
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                )}
            >
                {/* User Info com fade in */}
                <div
                    className={cn(
                        "mb-4 overflow-hidden transition-all duration-500 ease-out",
                        isLoading
                            ? "h-0 opacity-0"
                            : "h-auto opacity-100"
                    )}
                >
                    <div
                        className={cn(
                            "transform transition-all duration-500 ease-out",
                            isLoading
                                ? "translate-y-4 opacity-0"
                                : "translate-y-0 opacity-100"
                        )}
                    >
                        {data && (
                            <div className="rounded-xl bg-white/5 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-semibold text-yellow-500">
                                        {data.first_name?.[0]}{data.last_name?.[0]}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-sm font-medium text-white">
                                            {data.first_name} {data.last_name}
                                        </p>
                                        <p className="truncate text-xs text-white/50">
                                            {data.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botão de Logout */}
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 rounded-xl px-4 py-3 text-left font-normal text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-[15px]">Sair</span>
                </Button>
            </div>
        </div>
    )
}