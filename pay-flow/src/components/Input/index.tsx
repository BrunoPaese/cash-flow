import { Container, StyledInput, ErrorIcon } from "./style";
import type { InputHTMLAttributes } from "react";
import { XCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  text: string;
  theme?: "light" | "dark";
  error?: string;
}

function Input({
  placeholder,
  text,
  theme = "light",
  error,
  ...props
}: InputProps) {
  return (
    <Container>
      <StyledInput
        theme={theme}
        hasError={!!error}
        placeholder={placeholder}
        title={text}
        {...props}
      />
      {error && (
        <ErrorIcon
          data-tooltip-id="input-error-tooltip"
          data-tooltip-content={error}
        >
          <XCircle size={16} />
        </ErrorIcon>
      )}
      <Tooltip id="input-error-tooltip" place="right" />
    </Container>
  );
}

export default Input;
