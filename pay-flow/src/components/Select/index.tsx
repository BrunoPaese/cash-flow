import { Arrow, Container, StyledSelect } from "./style";
import type { Options } from "./type";

interface SelectProps<T>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: Options<T>[];
  theme?: "light" | "dark";
  text: string;
  onChange?: (value: T) => void;
}

function Select<T>({
  theme = "light",
  options,
  text,
  onChange,
  ...props
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find(
      (opt) => String(opt.value) === e.target.value
    );
    if (selected) {
      onChange?.(selected.value);
    }
  };

  return (
    <Container>
      <StyledSelect theme={theme} onChange={handleChange} {...props}>
        {options.map((option) => (
          <option
            key={String(option.value)}
            value={String(option.value)}
            title={text}
          >
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <Arrow theme={theme} />
    </Container>
  );
}

export default Select;
