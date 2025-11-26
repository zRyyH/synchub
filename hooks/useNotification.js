import { NotificationContext } from "@/providers/NotificationProvider";
import { useContext } from "react";

export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }

    return context;
}