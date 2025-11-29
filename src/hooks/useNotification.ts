import { useState } from 'react';

interface UseNotificationReturn {
  isOpen: boolean;
  message: string;
  show: (message: string) => void;
  hide: () => void;
}

/**
 * Custom hook to manage snackbar notifications
 */
export function useNotification(): UseNotificationReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const show = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  return { isOpen, message, show, hide };
}
