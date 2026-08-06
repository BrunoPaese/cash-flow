import styled from "styled-components";
import { colors } from "../../components/Style/theme";
import { Link } from "react-router-dom";
import type { StyleThemeProps } from "../../types/type";

export const Page = styled.div<StyleThemeProps>`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkBackground : colors.lightBackground};

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont;
`;

export const StyledLink = styled(Link)<StyleThemeProps>`
  text-decoration: none;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  &:hover {
    text-decoration: underline;
  }
`;

export const RightContainer = styled.div<StyleThemeProps>`
  align-self: flex-end;
  display: flex;
`;

export const Body = styled.div`
  flex: 1;

  width: 100%;
  max-width: 1400px;

  margin: 0 auto;

  padding: 24px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const Header = styled.div`
  margin: 10px 10px 0 0;
  align-self: flex-end;
  display: flex;
  gap: 10px;
  width: 240px;
`;

export const GridButton = styled.div`
  margin: 20px 0 20px 0;
  width: 400px;
`;

export const Footer = styled.footer<StyleThemeProps>`
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  opacity: 0.6;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;
