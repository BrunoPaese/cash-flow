import styled from "styled-components";
import { colors } from "../Style/theme";
import type { StyleThemeProps } from "../../types/type";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 44px 10px 12px;
`;

export const ActionButton = styled.button<StyleThemeProps>`
  position: absolute;
  right: 10px;
  top: calc(50% + 12px);
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;
