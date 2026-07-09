import styled from "styled-components";
import { colors } from "../Style/theme";

interface InputStyleProps {
  theme: "light" | "dark";
  center?: boolean;
  hasError?: boolean;
  uppercase?: boolean;
}

export const Container = styled.div<InputStyleProps>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 6px;
  position: relative;

  label {
    font-size: 13px;
    color: ${({ theme }) =>
      theme === "dark" ? colors.darkText : colors.lightText};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadArea = styled.label<InputStyleProps>`
  width: 100%;
  height: 220px;

  border: 1px solid
    ${({ hasError, theme }) =>
      hasError
        ? colors.red
        : theme === "dark"
          ? colors.darkBorder
          : colors.lightBorder};

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ErrorIcon = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;

  color: ${colors.red};
  cursor: help;

  &:hover span {
    opacity: 1;
    transform: translateY(-6px);
    pointer-events: auto;
  }
`;

export const Placeholder = styled.div<{
  theme: "light" | "dark";
}>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 12px;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  span {
    font-size: 14px;
  }

  svg {
    color: inherit;
  }
`;
