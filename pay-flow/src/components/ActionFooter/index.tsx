import { useNavigate } from "react-router-dom";
import { CheckCircle, Eraser, Undo } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import { colors } from "../Style/theme";
import { Col } from "../Col";
import { ButtonGroup, FooterWrapper } from "./style";

interface ActionFooterProps {
  confirmText: string;
  disabled?: boolean;
  onClear: () => void;
}

export function ActionFooter({
  confirmText,
  disabled,
  onClear,
}: ActionFooterProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClear();
  };

  return (
    <FooterWrapper>
      <Col xs={8}>
        <ButtonGroup>
          <Button
            text={t("common.cancel")}
            icon={Undo}
            onClick={() => navigate("/checkout")}
          />
          <Button
            text={t("common.remove")}
            icon={Eraser}
            color={colors.red}
            onClick={handleClear}
          />
        </ButtonGroup>
      </Col>
      <Col xs={4}>
        <Button
          text={confirmText}
          icon={CheckCircle}
          type="submit"
          disabled={disabled}
          fullWidth
          onClick={(e) => e.stopPropagation()}
        >
          {confirmText}
        </Button>
      </Col>
    </FooterWrapper>
  );
}
