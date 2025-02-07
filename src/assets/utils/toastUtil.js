import { useRef } from 'react';

export const useToast = () => {
    const toast = useRef(null);

    const showToast = (msg, severity = 'success') => {
        if (toast.current) {
            toast.current.show({
                severity: severity,
                summary: '',
                detail: msg,
                life: 3000,
                style: {
                    width: '300px',
                    background: severity === 'error' ? '#ffe6e6' : '#e6ffe6',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                },
                contentStyle: {
                    padding: '8px 16px',
                    fontWeight: 'bold',
                },
                closable: false,
            });
        }
    };

    return { toast, showToast };
};
