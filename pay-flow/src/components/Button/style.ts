import styled from "styled-components";
import { colors } from "../Style/theme";

interface StyledButtonProps {
  color?: string;
  variant?: "solid" | "outline" | "ghost";
  fullWidth?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  height: 48px;
  border-radius: 14px;
  padding: 10px 14px;

  border: ${({ variant, color }) =>
    variant === "outline" ? `1px solid ${color ?? colors.primary}` : "none"};

  background: ${({ variant, color }) =>
    variant === "solid" ? (color ?? colors.primary) : "transparent"};

  color: ${({ variant, color }) =>
    variant === "solid" ? colors.white : (color ?? colors.primary)};

  font-size: 15px;
  font-weight: 500;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    ${({ variant, color }) =>
      variant === "ghost"
        ? `
          background: ${color ?? colors.primary}15;
        `
        : `
          filter: brightness(0.96);
        `}
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(91, 198, 245, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    color: inherit;
  }
`;
