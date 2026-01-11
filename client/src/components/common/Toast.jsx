import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { create } from 'zustand';

// Toast Store
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-400" />;
      case 'error':
        return <FiXCircle className="text-red-400" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-400" />;
      case 'info':
      default:
        return <FiInfo className="text-blue-400" />;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-500/50 bg-green-500/10';
      case 'error':
        return 'border-red-500/50 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info':
      default:
        return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`glass-effect-strong rounded-xl p-4 border ${getColors(
              toast.type
            )} shadow-2xl`}
          >
            <div className="flex items-start gap-3">
              <div className="text-xl mt-0.5">{getIcon(toast.type)}</div>
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <h4 className="font-semibold text-white mb-1">{toast.title}</h4>
                )}
                <p className="text-sm text-gray-300">{toast.message}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Helper function to show toast
export const showToast = (message, type = 'info', title = '') => {
  const { addToast } = useToastStore.getState();
  addToast({ message, type, title });

  // Auto remove after 5 seconds
  setTimeout(() => {
    const { toasts, removeToast } = useToastStore.getState();
    if (toasts.length > 0) {
      removeToast(toasts[0].id);
    }
  }, 5000);
};

export default Toast;
