import type { ReactElement } from "react";
import type { ControllerProps, FieldValues, Path } from "react-hook-form";
import type { GridSize } from "@/components/GridSystem/Types";

export interface IFieldProps<T extends FieldValues>
  extends Omit<ControllerProps<T>, "render"> {
  name: Path<T>;
  children: ReactElement;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  className?: string;
}
