import { Container, StyledInput, ErrorIcon } from "./style";
import type { InputHTMLAttributes } from "react";
import { XCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useTheme } from "../../contexts/Theme/useTheme";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  text: string;
  center?: boolean;
  uppercase?: boolean;
  error?: string;
}

function Input({
  label,
  placeholder,
  text,
  center,
  uppercase = true,
  error,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      {label && <label htmlFor={label}>{label}</label>}
      <StyledInput
        theme={theme}
        hasError={!!error}
        placeholder={placeholder}
        title={text}
        center={center}
        uppercase={uppercase}
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
