type SelectFieldProps = {
  label: string;
  name: string;
  options: Record<string, string>;
  defaultValue?: string;
};

export default function SelectField({
  label,
  name,
  options,
  defaultValue,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <select
        name={name}
        required
        defaultValue={defaultValue}
        className="input"
      >
        <option value="">Bitte wählen</option>
        {Object.entries(options).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
