import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  height: 48px;

  border-radius: 14px;
  border: none;

  background: #5bc6f5;
  color: #ffffff;

  font-size: 15px;
  font-weight: 500;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: brightness(0.96);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(0.92);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(91, 198, 245, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    color: inherit;
  }
`;
