import type { ReactNode } from "react";

export interface IPageProps {
  title: string;
  children: ReactNode;
  actionButtons?: ReactNode;
  classNameRoot?: string;
  classNameHeader?: string;
  classNameTitle?: string;
  classNameActions?: string;
  classNameContent?: string;
}
