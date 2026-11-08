type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

export default function Field({ 
  label, 
  name, 
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input name={name} type={type} required={required} className="input" />
    </label>
  );
}
