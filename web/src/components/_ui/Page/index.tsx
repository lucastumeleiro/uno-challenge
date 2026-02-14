import { InternalPage } from "./_Internal";
import type { IPageProps } from "./Types";

function Page({
  title,
  children,
  actionButtons,
  classNameRoot,
  classNameHeader,
  classNameTitle,
  classNameActions,
  classNameContent,
}: IPageProps) {
  return (
    <InternalPage.Root className={classNameRoot}>
      <InternalPage.Header className={classNameHeader}>
        {title && (
          <InternalPage.Title className={classNameTitle}>
            {title}
          </InternalPage.Title>
        )}
        {actionButtons && (
          <InternalPage.Actions className={classNameActions}>
            {actionButtons}
          </InternalPage.Actions>
        )}
      </InternalPage.Header>

      <InternalPage.Content className={classNameContent}>
        {children}
      </InternalPage.Content>
    </InternalPage.Root>
  );
}

export { Page };
