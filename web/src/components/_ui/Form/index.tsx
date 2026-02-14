import { FormProvider, type FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Grid } from "@/components/GridSystem";
import { Spinner } from "@/components/_ui/Spinner";
import type { IFormProps } from "./Types";

function Form<T extends FieldValues>({
  id,
  form,
  onSubmit,
  children,
  className,
}: IFormProps<T>) {
  const { isLoading } = form.formState;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

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
