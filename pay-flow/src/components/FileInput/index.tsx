import {
  Container,
  ErrorIcon,
  HiddenInput,
  Placeholder,
  Preview,
  UploadArea,
} from "./style";
import { XCircle, type LucideIcon } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useTheme } from "../../contexts/Theme/useTheme";

interface FileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  text: string;
  error?: string;
  preview?: string;
  icon: LucideIcon;
}

function FileInput({
  label,
  text,
  error,
  preview,
  icon: Icon,
  ...props
}: FileInputProps) {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      {label && <label>{label}</label>}
      <UploadArea theme={theme} hasError={!!error}>
        <HiddenInput type="file" accept="image/*" {...props} />
        {preview ? (
          <Preview src={preview} />
        ) : (
          <Placeholder theme={theme}>
            <Icon size={42} />
            <span>{text}</span>
          </Placeholder>
        )}
      </UploadArea>
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

export default FileInput;
