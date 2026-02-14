import type { ReactNode } from "react";

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IGridProps {
  children: ReactNode;
  className?: string;
}

export interface IColProps {
  children: ReactNode;
  className?: string;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}
