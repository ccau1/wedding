interface RadioButtonProps {
  text?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  checkedValue?: string;
  onChange?: (newVal: string) => void;
}

const RadioButton = ({
  text,
  name,
  value,
  checked,
  checkedValue,
  onChange,
}: RadioButtonProps) => {
  return (
    <a onClick={() => onChange?.(value)}>
      <label className="inline-flex items-center ml-6">
        <input
          type="radio"
          className="form-radio"
          name={name}
          value={value}
          checked={checked || checkedValue === value}
        />
        <span className="ml-2">{text}</span>
      </label>
    </a>
  );
};

export default RadioButton;
