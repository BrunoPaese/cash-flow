import styled from "styled-components";
import { colors } from "../Style/theme";
import type { StyleThemeProps } from "../../types/type";

export const RowItem = styled.div<StyleThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
  width: 100%;
  box-sizing: border-box;
  word-break: break-word;
`;

export const Label = styled.span`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
  max-width: 50%;
  word-break: break-word;
  white-space: normal;
  overflow: visible;
  text-align: right;
`;
