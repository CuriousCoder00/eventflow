import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
  } from "@/components/ui/form";
  import { PasswordInput } from "../percept-ui/password-input";
  
  interface PasswordAuthInputProps {
    form: any;
    label: string;
    name: string;
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
  }
  
  export const AuthPasswordInput = ({
    form,
    label,
    name,
    placeholder,
    disabled,
    required,
  }: PasswordAuthInputProps) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <PasswordInput
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-600" />
          </FormItem>
        )}
      />
    );
  };