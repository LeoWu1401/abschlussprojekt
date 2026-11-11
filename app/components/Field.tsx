type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
};

export default function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="input"
      />
    </label>
  );
}
