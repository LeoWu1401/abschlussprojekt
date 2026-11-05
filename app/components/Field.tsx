type FieldProps = {
  label: string;
  name: string;
  type?: string;
};

export default function Field({ label, name, type = "text" }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input name={name} type={type} className="input" />
    </label>
  );
}
