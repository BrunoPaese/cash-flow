import styled from "styled-components";
import { colors } from "../Style/theme";
import { Row } from "../Row";

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FooterWrapper = styled(Row)`
  width: 100%;
  border-top: 1px solid ${colors.primary};
  padding-top: 16px;
  margin-top: 16px;
`;
