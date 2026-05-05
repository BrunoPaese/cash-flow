import { type LucideIcon } from "lucide-react";
import { ActionButton, InputWrapper } from "./style";
import Input from "../Input";
import { useTheme } from "../../contexts/Theme/useTheme";

export interface InputButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  text: string;
  error?: string;
  icon: LucideIcon;
  onClick: () => void;
}

function InputButton({
  label,
  text,
  error,
  icon: Icon,
  onClick,
  ...rest
}: InputButtonProps) {
  const { theme } = useTheme();

  return (
    <InputWrapper>
      <Input label={label} text={text} error={error} {...rest} />
      <ActionButton type="button" onClick={onClick} theme={theme}>
        <Icon size={16} />
      </ActionButton>
    </InputWrapper>
  );
}

export default InputButton;
