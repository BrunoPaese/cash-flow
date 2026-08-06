import type { ReactNode, MouseEvent } from "react";
import {
  CardContainer,
  CardTitle,
  CardContent,
  AddButton,
  CardActions,
} from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Plus, Search, Trash } from "lucide-react";

interface CardProps {
  title?: string;
  titlePadding?: number;
  onSearch?: (e: MouseEvent<HTMLButtonElement>) => void;
  onAdd?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

function Card({
  title,
  titlePadding,
  children,
  onSearch,
  onAdd,
  onDelete,
}: CardProps) {
  const { theme } = useTheme();

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSearch?.(event);
  };

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAdd?.(event);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.(event);
  };

  return (
    <CardContainer theme={theme} clickable={!!onSearch}>
      {(onSearch || onAdd || onDelete) && (
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
          {onDelete && (
            <AddButton type="button" onClick={handleDelete} theme={theme}>
              <Trash size={16} />
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
