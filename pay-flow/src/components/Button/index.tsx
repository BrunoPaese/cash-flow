import type { ButtonHTMLAttributes, ElementType } from "react";
import { Content, IconWrapper, StyledButton } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
  variant?: "solid" | "outline" | "ghost";
  icon?: ElementType;
  fullWidth?: boolean;
}

function Button({
  children,
  icon,
  text,
  color,
  variant = "solid",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Icon = icon;

  return (
    <StyledButton
      title={text}
      color={color}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      {...props}
    >
      <Content>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        {children && <span>{children}</span>}
      </Content>
    </StyledButton>
  );
}

export default Button;
