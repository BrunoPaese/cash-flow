import type { ReactNode, MouseEvent } from "react";
import { CardContainer, CardTitle, CardContent, AddButton } from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Plus } from "lucide-react";

interface CardProps {
  title?: string;
  titlePadding?: number;
  onClick?: () => void;
  onAdd?: () => void;
  children: ReactNode;
}

function Card({ title, titlePadding, children, onClick, onAdd }: CardProps) {
  const { theme } = useTheme();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const interactiveElements = [
      "INPUT",
      "BUTTON",
      "SELECT",
      "TEXTAREA",
      "A",
      "LABEL",
    ];
    if (interactiveElements.includes((event.target as HTMLElement).tagName)) {
      event.stopPropagation();
      return;
    }
    onClick?.();
  };

  return (
    <CardContainer theme={theme} onClick={handleClick} clickable={!!onClick}>
      {title && (
        <CardTitle theme={theme} titlePadding={titlePadding}>
          {title}
        </CardTitle>
      )}
      {onAdd && (
        <AddButton type="button" onClick={onAdd} theme={theme}>
          <Plus size={16} />
        </AddButton>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
