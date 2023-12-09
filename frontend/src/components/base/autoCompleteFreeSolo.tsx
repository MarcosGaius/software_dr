import { useController } from "react-hook-form";
import { Autocomplete } from "@mui/lab";
import { TextField } from "@mui/material";

interface AutoCompleteFreeSoloProps {
  name: string;
  label: string;
  multiple?: boolean;
  options?: { id: string; name: string }[];
  required?: boolean;
  onChange?: (e: any, value: any) => void;
}

export const AutoCompleteFreeSolo = ({
  name,
  label,
  options,
  multiple,
  required = false,
  onChange,
}: AutoCompleteFreeSoloProps) => {
  const { field } = useController({ name });

  return (
    <Autocomplete
      {...field}
      options={options || [{ name: "", id: "" }]}
      multiple={multiple}
      freeSolo
      getOptionLabel={(option) => {
        return option.name ? option.name : option;
      }}
      getOptionKey={(option) => {
        return option.id ? option.id : option;
      }}
      value={field.value}
      onChange={(e, value) => {
        const newValue = multiple
          ? value.map((v: any) => v?.id || v)
          : value?.id || value;
        field.onChange(newValue);
        onChange && onChange(e, newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          id={name}
          name={name}
          label={label}
        />
      )}
    />
  );
};
