import styled from "styled-components";
import { colors } from "../Style/theme";

interface CodeInputProps {
  theme: "light" | "dark";
  hasError?: boolean;
}

export const CodeContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CodeInput = styled.input<CodeInputProps>`
  width: 48px;
  height: 56px;
  padding: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  border-radius: 14px;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid
    ${({ hasError, theme }) =>
      hasError
        ? colors.error
        : theme === "dark"
        ? colors.darkBorder
        : colors.lightBorder};

  color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "#000000")};

  outline: none;
  transition: all 0.25s ease;

  &::placeholder {
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "#000000")};
    opacity: 0.4;
  }

  &:focus {
    border-color: ${({ hasError, theme }) =>
      hasError
        ? colors.error
        : theme === "dark"
        ? colors.darkBorder
        : colors.lightBorder};

    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 0 0 4px rgba(255,255,255,0.06)"
        : "0 0 0 4px rgba(0,0,0,0.05)"};
  }
`;
