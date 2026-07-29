import type { ReactNode, MouseEvent } from "react";
import {
  CardContainer,
  CardTitle,
  CardContent,
  AddButton,
  CardActions,
} from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Plus, Search } from "lucide-react";

interface CardProps {
  title?: string;
  titlePadding?: number;
  onSearch?: (e: MouseEvent<HTMLButtonElement>) => void;
  onAdd?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

function Card({ title, titlePadding, children, onSearch, onAdd }: CardProps) {
  const { theme } = useTheme();

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSearch?.(event);
  };

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAdd?.(event);
  };

  return (
    <CardContainer theme={theme} clickable={!!onSearch}>
      {(onSearch || onAdd) && (
        <CardActions>
          {onSearch && (
            <AddButton type="button" onClick={handleSearch} theme={theme}>
              <Search size={16} />
            </AddButton>
          )}
          {onAdd && (
            <AddButton type="button" onClick={handleAdd} theme={theme}>
              <Plus size={16} />
            </AddButton>
          )}
        </CardActions>
      )}
      {title && (
        <CardTitle theme={theme} titlePadding={titlePadding}>
          {title}
        </CardTitle>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
