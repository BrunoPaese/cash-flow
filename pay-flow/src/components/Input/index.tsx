import { Container, StyledInput } from "./style";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  theme?: "light" | "dark";
}

function Input({ placeholder, theme = "light", ...props }: InputProps) {
  return (
    <Container>
      <StyledInput theme={theme} placeholder={placeholder} {...props} />
    </Container>
  );
}

export default Input;
