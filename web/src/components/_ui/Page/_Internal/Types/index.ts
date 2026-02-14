import type { ReactNode, ComponentProps } from "react";

export interface IPageRootProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export interface IPageHeaderProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export interface IPageTitleProps extends ComponentProps<"h1"> {
  children: ReactNode;
}

export interface IPageActionsProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export interface IPageContentProps extends ComponentProps<"div"> {
  children: ReactNode;
}
