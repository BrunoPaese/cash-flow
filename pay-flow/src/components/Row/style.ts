import styled from "styled-components";

interface StyledRowProps {
  align: string;
  justify: string;
}

export const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;

  margin-bottom: 16px;

  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;
