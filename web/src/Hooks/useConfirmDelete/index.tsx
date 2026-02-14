import { useState, useCallback } from "react";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import type { IUseConfirmDeleteProps } from "./Types";

export function useConfirmDelete({
  onConfirm,
  title,
  message,
}: IUseConfirmDeleteProps) {
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const confirmDelete = useCallback((id: string, name: string) => {
    setItemToDelete({ id, name });
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!itemToDelete) return;
    onConfirm(itemToDelete.id);
  }, [itemToDelete, onConfirm]);

  const ConfirmDeleteModal = (
    <ConfirmDelete
      open={open}
      onOpenChange={setOpen}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      itemName={itemToDelete?.name}
    />
  );

  return { confirmDelete, ConfirmDeleteModal };
}
