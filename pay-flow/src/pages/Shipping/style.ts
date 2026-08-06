import styled from "styled-components";
import { colors } from "../../components/Style/theme";
import type { StyleThemeProps } from "../../types/type";

export const GridButton = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin: 20px 0 20px 0;
`;

export const Title = styled.h1<StyleThemeProps>`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;
