import styled from "styled-components";
import { colors } from "../Style/theme";
import type { StyleThemeProps } from "../../type/type";

export const RowItem = styled.div<StyleThemeProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const Label = styled.span`
  flex: 1;
  font-size: 14px;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;
