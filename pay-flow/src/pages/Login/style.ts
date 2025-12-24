import styled from "styled-components";
import { colors } from "../../components/Style/theme";

interface PageProps {
  theme: "light" | "dark";
}

export const Page = styled.div<PageProps>`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkBackground : colors.lightBackground};

  font-family: system-ui, -apple-system, BlinkMacSystemFont;
`;

export const StyledLink = styled.a<PageProps>`
  text-decoration: none;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  &:hover {
    text-decoration: underline;
  }
`;

export const RightContainer = styled.div<PageProps>`
  align-self: flex-end;
  display: flex;
`;

export const Body = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;
  margin: 0 auto;
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

export const Footer = styled.footer<PageProps>`
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  opacity: 0.6;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;
