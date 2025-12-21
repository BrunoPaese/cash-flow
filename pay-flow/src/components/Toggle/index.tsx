import type { Options } from "../Select/type";
import { Container, Thumb, ToggleButton } from "./style";

interface ToggleProps<T> {
  value: T;
  options: Options<T>[];
  text: string;
  onChange?: (value: T) => void;
}

function Toggle<T>({ value, options, text, onChange }: ToggleProps<T>) {
  const activeIndex = options.findIndex((opt) => opt.value === value);

  const handleClick = (optionValue: T) => {
    if (optionValue !== value) {
      onChange?.(optionValue);
    }
  };

  return (
    <Container>
      {options.map((option, index) => (
        <ToggleButton
          key={index}
          active={option.value === value}
          title={text}
          onClick={() => handleClick(option.value)}
        >
          {option.icon}
        </ToggleButton>
      ))}

      <Thumb index={activeIndex} />
    </Container>
  );
}

export default Toggle;
