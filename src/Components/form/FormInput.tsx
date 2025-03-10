/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Control,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Path,
  PathValue,
} from "react-hook-form";

type TInputProps<T extends FieldValues> = {
  control?: Control<T>;
  type: string;
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  rules?: object;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const FormInput = <T extends FieldValues>({
  control,
  type,
  name,
  label,
  placeholder,
  className,
  rules,
  error,
}: TInputProps<T>) => {
  return (
    <div className="mb-4">
      <label htmlFor={name as string} className="block text-sm font-semibold">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={"" as PathValue<T, Path<T>>}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={name as string}
            type={type}
            className={`border p-2 rounded w-full ${className} ${
              error ? "border-red-500" : ""
            }`}
            placeholder={placeholder}
          />
        )}
      />
      {error && (
        <span className="text-red-500 text-sm">
          {typeof error === "string"
            ? error
            : (error as FieldError).message || "Invalid input"}
        </span>
      )}
    </div>
  );
};

export default FormInput;
