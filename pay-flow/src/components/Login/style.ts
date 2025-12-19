import styled from "styled-components";

interface PageProps {
  theme: "light" | "dark";
}

const darkBackground = "linear-gradient(135deg, #0a0a0a, #1c1c1e)";
const lightBackground = "linear-gradient(135deg, #f2f2f7, #e5e5ea)";

const darkText = "rgba(255, 255, 255, 0.9)";
const lightText = "rgba(0, 0, 0, 0.88)";

export const Page = styled.div<PageProps>`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) =>
    theme === "dark" ? darkBackground : lightBackground};

  font-family: system-ui, -apple-system, BlinkMacSystemFont;
`;

export const StyledLink = styled.a<PageProps>`
  text-decoration: none;
  color: ${({ theme }) => (theme === "dark" ? darkText : lightText)};

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
