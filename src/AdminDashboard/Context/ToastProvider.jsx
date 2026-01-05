import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, description, variant = "default" }) => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, title, description, variant },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}

        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={`rounded-xl p-4 shadow-lg bg-white border ${
              toast.variant === "error"
                ? "border-red-500"
                : toast.variant === "success"
                ? "border-green-500"
                : "border-gray-200"
            }`}
          >
            <Toast.Title className="font-semibold text-sm">
              {toast.title}
            </Toast.Title>
            {toast.description && (
              <Toast.Description className="text-sm text-gray-600 mt-1">
                {toast.description}
              </Toast.Description>
            )}
          </Toast.Root>
        ))}

        <Toast.Viewport className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[360px]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
