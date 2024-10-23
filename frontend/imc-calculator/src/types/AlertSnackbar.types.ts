export interface AlertSnackbarProps {
    open: boolean;
    message: string | null;
    severity: 'success' | 'error';
    onClose: () => void;
  }
  