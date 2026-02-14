import { Modal } from "@/components/_ui/Modal";
import { Button } from "@/components/_ui/Button";
import type { IConfirmDeleteProps } from "./Types";

export function ConfirmDelete({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirmar exclusão",
  message,
  itemName,
}: IConfirmDeleteProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const defaultMessage = itemName
    ? `Tem certeza que deseja excluir "${itemName}"?`
    : "Tem certeza que deseja excluir este item?";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={message || defaultMessage}
    >
      <div className="flex  gap-3 justify-end mt-6">
        <Button variant="danger" onClick={handleConfirm}>
          Excluir
        </Button>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
