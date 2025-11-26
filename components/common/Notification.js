"use client";

import { XIcon, CheckCircleIcon, AlertCircleIcon, InfoIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const notificationVariants = {
    success: {
        icon: CheckCircleIcon,
        className: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
        iconClassName: "text-green-600 dark:text-green-400",
    },
    error: {
        icon: AlertCircleIcon,
        className: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900",
        iconClassName: "text-red-600 dark:text-red-400",
    },
    warning: {
        icon: AlertTriangleIcon,
        className: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900",
        iconClassName: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
        icon: InfoIcon,
        className: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
        iconClassName: "text-blue-600 dark:text-blue-400",
    },
};

function Notification({
    variant = "info",
    title,
    description,
    onClose,
    action,
    className,
    ...props
}) {
    const variantConfig = notificationVariants[variant];
    const Icon = variantConfig.icon;

    return (
        <div
            className={cn(
                "relative flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg transition-all",
                variantConfig.className,
                className
            )}
            {...props}
        >
            <Icon className={cn("size-5 shrink-0 mt-0.5", variantConfig.iconClassName)} />

            <div className="flex-1 space-y-1">
                {title && (
                    <div className="font-semibold text-sm leading-none">
                        {title}
                    </div>
                )}
                {description && (
                    <div className="text-sm text-muted-foreground leading-snug">
                        {description}
                    </div>
                )}
                {action && (
                    <div className="pt-2">
                        {action}
                    </div>
                )}
            </div>

            {onClose && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-6 shrink-0 -mt-1 -mr-1"
                    onClick={onClose}
                >
                    <XIcon className="size-4" />
                </Button>
            )}
        </div>
    );
}

export { Notification };