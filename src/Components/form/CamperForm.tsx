/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";

type TCamperFormProps = {
  children: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
};

const CamperForm = ({ children, onSubmit }: TCamperFormProps) => {
  const methods = useForm(); // React Hook Form instance

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CamperForm;
