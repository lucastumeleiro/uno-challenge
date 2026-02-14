import { FormProvider, type FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Grid } from "@/components/GridSystem";
import type { IFormProps } from "./Types";

function Form<T extends FieldValues>({
  id,
  form,
  onSubmit,
  children,
  className,
}: IFormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge("w-full overflow-hidden", className)}
      >
        <Grid>{children}</Grid>
      </form>
    </FormProvider>
  );
}

export { Form };
