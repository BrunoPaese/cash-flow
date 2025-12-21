import type { ButtonHTMLAttributes, ElementType } from "react";
import { Content, IconWrapper, StyledButton } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  text: string;
  icon?: ElementType;
}

function Button({
  children,
  theme = "light",
  icon,
  text,
  ...props
}: ButtonProps) {
  const Icon = icon;

  return (
    <StyledButton theme={theme} title={text} {...props}>
      <Content>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <span>{children}</span>
      </Content>
    </StyledButton>
  );
}

export default Button;
