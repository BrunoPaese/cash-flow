import { Container, StyledInput } from "./style";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  text: string;
  theme?: "light" | "dark";
}

function Input({ placeholder, text, theme = "light", ...props }: InputProps) {
  return (
    <Container>
      <StyledInput
        theme={theme}
        placeholder={placeholder}
        title={text}
        {...props}
      />
    </Container>
  );
}

export default Input;
