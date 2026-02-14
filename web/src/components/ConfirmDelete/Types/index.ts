export interface IConfirmDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}
