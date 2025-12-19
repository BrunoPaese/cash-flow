import styled from "styled-components";
import { colors } from "../Style/theme";

interface ToggleStyleProps {
  theme: "light" | "dark";
  active?: boolean;
  index?: number;
}

export const Container = styled.div<ToggleStyleProps>`
  position: relative;
  display: flex;
  width: 160px;
  height: 50px;

  border-radius: 999px;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};
`;

export const ToggleButton = styled.button<ToggleStyleProps>`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 2;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  opacity: ${({ active }) => (active ? 1 : 0.45)};
  transition: opacity 0.2s ease;

  svg {
    display: block;
  }

  &:focus {
    outline: none;
  }
`;

export const Thumb = styled.div<ToggleStyleProps>`
  position: absolute;

  width: 40px;
  height: 40px;
  border-radius: 999px;

  background: ${({ theme }) =>
    theme === "dark" ? "rgba(40,40,45,0.85)" : "rgba(255,255,255,0.75)"};

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18),
    inset 0 0 6px rgba(255, 255, 255, 0.7);

  top: calc((100% - 40px) / 2);

  left: ${({ index = 0 }) => `
    calc(
      (${index} * (100% / 2)) +
      ((100% / 2 - 40px) / 2)
    )
  `};

  transition: left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
`;
