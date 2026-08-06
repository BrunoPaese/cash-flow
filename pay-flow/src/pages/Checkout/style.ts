import styled from "styled-components";
import { colors } from "../../components/Style/theme";
import type { StyleThemeProps } from "../../types/type";

export const CardProduct = styled.div<StyleThemeProps>`
  display: flex;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkBackground : colors.lightBackground};

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont;
`;

export const ImageProduct = styled.img`
  width: 250px;
  max-width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
`;

export const Body = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;
