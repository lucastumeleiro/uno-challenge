import { cloneElement } from "react";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import { Col } from "@/components/GridSystem";
import type { IFieldProps } from "./Types";

function Field<T extends FieldValues>({
  name,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  ...controllerProps
}: IFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={className}>
      <Controller
        name={name}
        control={control}
        {...controllerProps}
        render={({ field, fieldState }) =>
          cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            ...field,
            onValueChange: field.onChange,
            error: fieldState.error?.message,
          })
        }
      />
    </Col>
  );
}

export { Field };
