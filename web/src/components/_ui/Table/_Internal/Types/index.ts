import type { ReactNode, ComponentProps } from "react";

export interface ITableRootProps extends ComponentProps<"table"> {
  children: ReactNode;
}

export interface ITableHeaderProps extends ComponentProps<"thead"> {
  children: ReactNode;
}

export interface ITableBodyProps extends ComponentProps<"tbody"> {
  children: ReactNode;
}

export interface ITableFooterProps extends ComponentProps<"tfoot"> {
  children: ReactNode;
}

export interface ITableRowProps extends ComponentProps<"tr"> {
  children: ReactNode;
}

export type ISortDirection = "asc" | "desc" | undefined;

export interface ITableHeadProps extends ComponentProps<"th"> {
  children: ReactNode;
  sortable?: boolean | undefined;
  sortDirection?: ISortDirection;
  onSort?: (() => void) | undefined;
}

export interface ITableCellProps extends ComponentProps<"td"> {
  children: ReactNode;
}
