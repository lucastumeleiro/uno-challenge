import { InternalModal } from "./_Internal";
import type { IModalProps } from "./Types";

function Modal({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  classNameContent,
  classNameTitle,
  classNameDescription,
}: IModalProps) {
  return (
    <InternalModal.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <InternalModal.Trigger asChild>{trigger}</InternalModal.Trigger>}
      <InternalModal.Content className={classNameContent}>
        {title && <InternalModal.Title className={classNameTitle}>{title}</InternalModal.Title>}
        {description && (
          <InternalModal.Description className={classNameDescription}>
            {description}
          </InternalModal.Description>
        )}
        {children}
        <InternalModal.Close />
      </InternalModal.Content>
    </InternalModal.Root>
  );
}

export { Modal };
