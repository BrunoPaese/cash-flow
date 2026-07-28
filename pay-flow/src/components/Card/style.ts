import styled from "styled-components";
import { colors } from "../Style/theme";

interface CardStyleProps {
  theme: "light" | "dark";
  clickable?: boolean;
  titlePadding?: number;
}

export const CardContainer = styled.div<CardStyleProps>`
  position: relative;
  width: 100%;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border-radius: 16px;
  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};

  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0 12px 32px rgba(0,0,0,0.45)"
      : "0 12px 32px rgba(0,0,0,0.12)"};

  display: flex;
  flex-direction: column;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  ${({ clickable, theme }) =>
    clickable &&
    `
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${
          theme === "dark"
            ? "0 16px 36px rgba(0,0,0,0.55)"
            : "0 16px 36px rgba(0,0,0,0.18)"
        };
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

export const CardTitle = styled.h3<CardStyleProps>`
  margin: 0;
  padding: 16px 16px ${({ titlePadding = 0 }) => titlePadding}px 16px;

  text-align: center;

  font-size: 16px;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const CardContent = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AddButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkBorder : colors.lightBorder};

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CardActions = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;

  display: flex;
  gap: 8px;
`;
