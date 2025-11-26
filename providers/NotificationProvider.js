"use client";

import { createContext, useState, useCallback } from "react";
import { Notification } from "@/components/common/Notification";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };

        setNotifications((prev) => [...prev, newNotification]);

        if (notification.duration !== 0) {
            setTimeout(() => {
                removeNotification(id);
            }, notification.duration || 5000);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const success = useCallback((title, description, options = {}) => {
        return addNotification({
            variant: "success",
            title,
            description,
            ...options,
        });
    }, [addNotification]);

    const error = useCallback((title, description, options = {}) => {
        return addNotification({
            variant: "error",
            title,
            description,
            ...options,
        });
    }, [addNotification]);

    const warning = useCallback((title, description, options = {}) => {
        return addNotification({
            variant: "warning",
            title,
            description,
            ...options,
        });
    }, [addNotification]);

    const info = useCallback((title, description, options = {}) => {
        return addNotification({
            variant: "info",
            title,
            description,
            ...options,
        });
    }, [addNotification]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {notifications.map((notification) => (
                    <div key={notification.id} className="pointer-events-auto animate-in slide-in-from-top-2 fade-in">
                        <Notification
                            variant={notification.variant}
                            title={notification.title}
                            description={notification.description}
                            action={notification.action}
                            onClose={() => removeNotification(notification.id)}
                        />
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}