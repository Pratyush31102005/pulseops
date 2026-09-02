"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, AlertCircle } from "lucide-react";

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "error";
}

let toastListeners: ((msg: ToastMessage) => void)[] = [];

export function showToast(message: string, type: "success" | "error" = "success") {
  const msg: ToastMessage = { id: Math.random().toString(36).slice(2), message, type };
  toastListeners.forEach((l) => l(msg));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 3000);
    };
    toastListeners.push(listener);
    return () => { toastListeners = toastListeners.filter((l) => l !== listener); };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 neu-float"
          >
            {toast.type === "error" ? (
              <AlertCircle className="h-4 w-4 shrink-0 text-error" />
            ) : (
              <CheckCircle className="h-4 w-4 shrink-0 text-success" />
            )}
            <span className="text-sm text-foreground">{toast.message}</span>
            <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} className="ml-2 text-muted hover:text-foreground transition-colors cursor-pointer">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
