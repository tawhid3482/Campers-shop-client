/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";

type TCamperFormProps = {
  children: React.ReactNode;
  onsubmit: (data: any) => Promise<void>;
};

const CamperForm = ({ children, onsubmit }: TCamperFormProps) => {
  const methods = useForm(); // React Hook Form instance

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onsubmit(data))}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CamperForm;
